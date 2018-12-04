#!/bin/bash

#docker pull sbg-gateway-version-tracker-db-api

docker stop presence-tracker-api
docker run --rm \
    --name="presence-tracker-api" \
    -p 5100:5100 \
    presence-tracker-api:latest
