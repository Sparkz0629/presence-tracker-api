#!/bin/bash

docker build --file=presence-tracker-db-api-docker/Dockerfile -t presence-tracker-db-api:latest . || exit
