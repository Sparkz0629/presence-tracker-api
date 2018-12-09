#!/bin/bash

docker build --file=presence-tracker-api-docker/Dockerfile -t presence-tracker--api:latest . || exit
