#!/bin/bash

IMAGE_NAME="empty-space-to-csv-comma"
CONTAINER_NAME="empty-space-to-csv-comma"

if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

docker pull node:20
docker pull busybox:1.35

if [ "$(docker images -q $IMAGE_NAME)" ]; then
    docker rmi $IMAGE_NAME
fi

docker build -t $IMAGE_NAME .

docker run -p 9274:8080 --name $CONTAINER_NAME $IMAGE_NAME

exit