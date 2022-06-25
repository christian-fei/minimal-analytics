#!/bin/bash

git stash
git pull --rebase
git stash pop
docker compose -f docker-compose.prod.yml stop
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans --renew-anon-volumes