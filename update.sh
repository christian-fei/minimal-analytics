#!/bin/bash

git stash
git pull --rebase
git stash pop
docker-compose stop; docker-compose up -d --build --remove-orphans --renew-anon-volumes