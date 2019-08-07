// express
const express = require("express");
const app = express();
// multer
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/src/images/original')
    },
    filename: function (req, file, cb) {
        cb(null, randomid())
    }
});
const upload = multer({ storage: storage });
// redis
const redis = require('redis');
// amqplib
const amqp = require('amqplib');


app.get('/image/:id', function(req, res, next) {
    const img = req.params.id + ".png";
    // redis
    const client = redis.createClient({host:"datastore"});
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    client.get(req.params.id, function (error, result) {
        if (error){
            console.log(error);
            throw error;
        }
        if(result == 'true') {
            return res.sendFile(`/src/images/resized/${img}`);
        }else {
            return res.json({ result: 'not prepared'});
        }
    });
    client.quit();
});

app.post('/image', upload.any(), function(req, res) {
    const fileId = req.files[0].filename.toString()
    // redis
    const client = redis.createClient({host:"datastore"});
    client.on("error", function (err) {
        console.log("Error " + err);
    });
    client.set(fileId, "false", redis.print);
    client.quit();
    // amqplib
    sendmsg(fileId);
    // response
    res.json({
        result: 'success!',
        fileId: fileId
    });
});

async function sendmsg(msg){
    const q = 'task_queue';
    try{
        const conn = await amqp.connect('amqp://guest:guest@workqueue:5672');
        const ch = await conn.createChannel();
        await ch.sendToQueue(q,  Buffer.from(msg), { presistent: true });
        ch.close();
        conn.close();
    } catch(err){
        console.log(err);
    }
}

//Random id generator
function randomid() {
    const id = new Date().getTime().toString() + Math.random().toString();
    return id;
}

module.exports = app;
