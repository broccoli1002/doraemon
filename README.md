Doraemon
====
## Description
upload image & get image service.

The uploaded image shrinks like catching Small light.


## Overview
Consits of The following four components
  * datastore
  * webserver
  * worker
  * workqueue
  * datastore

### stack
[datastore]
  * redis

[webserver]
  * node.js
  * express
  * redis
  * amqp
    * https://www.npmjs.com/package/amqplib
  * jest
  * supertest
  * multer

[worker]
  * node.js
  * redis
  * amqp
    * https://www.npmjs.com/package/amqplib
  * jimp
    * https://www.npmjs.com/package/jimp

[workqueue]
  * Rabbitmq

[datastore]
  * use docker volume


## Usage
### setup
1. create network
    1. `docker network create --driver bridge doranet`
    1. `docker network ls`
1. create volume
    1. `docker volume create --name filestorage`
    1. `docker volume ls`
1. start service
    1. webserver
        1. `cd /webserver`
        1. `docker-compose up`
    1. workqueue
        1. `cd /workqueue`
        1. `docker-compose up`
        1. create queue
            1. Please enter in your browser http://localhost:15672/
                * ID/PASS guest/guest
            2. craete queue named `task_queue`
    1. worker
        1. `cd /worker`
        2. `docker-compose up`
    1. datastore
        1. `cd /datastore`
        2. `docker-compose up`
### upload image
* curl -X POST -F img=@[imagename] http://localhost:3000/image
  * e.g: `curl -X POST -F img=@/tmp/doraemon/download.jpg  http://localhost:3000/image`
### get image
GET http://localhost:3000/image/[imageID]
e.g: Please enter in your browser  `http://localhost:3000/image/15647575116480.07167631302903654`
### test
* `npm test [fileName]`
  * eg: `npm test app.test.js`


## Various Issues
### overall
* way to create random_id
* image name when save image
* common use of components redis client
* retry worker
* add test mock
* add asnapshot test
### webserver
* think of downning queue
* think of downning redis
* add test
  * multer test
  * get
    * target id image file is none
    * target id image file exist
* redis transaction
### worker
* add test
  * Failure to receive id
  * when target id file is none
* redis transaction
* way to convert image


## Memo
### docker volume
  * https://32imuf.com/docker/use-volumes-with-docker-compose/
  * https://docs.docker.com/storage/volumes/#share-data-among-machines
### failure
  * gcloud components install pubsub-emulator
    *  https://cloud.google.com/pubsub/docs/emulator?hl=ja
### rappidMQ
  * https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html
### jest
  * http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
  * http://luoxia.me/yohe_site/2017/09/7/RabbitMQ/index.html

### development manhour
  * 30 ~ 35h


## Author

[broccoli1002](https://github.com/broccoli1002)
