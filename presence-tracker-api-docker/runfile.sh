#!/bin/sh

docker-compose pull && docker-compose -p sbg-gateway-version-tracker-api-docker up -d
