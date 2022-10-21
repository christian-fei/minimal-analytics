#!/bin/bash

git pull --rebase
docker compose -f docker-compose.prod.yml stop
docker compose -f docker-compose.prod.yml up -d --build --force-recreate --remove-orphans --renew-anon-volumes