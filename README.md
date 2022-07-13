# minimal-analytics

[![minimal analytics dashboard](https://github.com/christian-fei/minimal-analytics/blob/main/.github/assets/dashboard.png?raw=true)](https://cri.dev/posts/2021-04-28-fullstack-nodejs-preact-minimal-web-analytics-introduction/)

Read more about the project at [cri.dev - "Making Minimal Analytics"](https://cri.dev/posts/2021-04-28-fullstack-nodejs-preact-minimal-web-analytics-introduction/)

See [Minimal Analytics in action](https://s.cri.dev)

# Table of contents

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Usage](#usage)

# installation

## data

create the `data` directory with 

```
mkdir data
```

create an empty `data/data.ljson` file with

```
touch data/data.ljson
```

## dependencies

install the server dependencies with

```
npm i
```

and then install the client dependencies in the `dashboard` directory

```
cd dashboard
npm i
```

## build client

the client uses `parcel` as a asset bundler.

you can run a build of the dashboard, the output will be in `dashboard/dist` and served from `http://127.0.0.1:8080` when starting the server

```
cd dashboard
npm run build
```

# start minimal-analytics - with npm

Set the environment variables `STATS_BASE_URL` and `SITE_BASE_URL` and run `npm start`, e.g.

```bash
SITE_BASE_URL=http://127.0.0.1:8081 STATS_BASE_URL=http://127.0.0.1:8080 npm start
```

The configured site to track is running on `http://127.0.0.1:8081`, described by `SITE_BASE_URL` 

The minimal-analytics server runs at `STATS_BASE_URL` `http://127.0.0.1:8080`

# start minimal-analytics - with docker-compose

configure the environment variables in `docker-compose.yml` regarding `STATS_BASE_URL` and `SITE_BASE_URL`.

`STATS_BASE_URL` is the location where the minimal-analytics is running, e.g. `https://stats.example.com`

`SITE_BASE_URL` is the location of the site you want to allow tracking, e.g. `https://example.com`

Run the service with

```
docker-compose up -d --build --remove-orphans --renew-anon-volumes
```


# tests

Run `npm t` in the root of the project to run the server tests. 

If you want to run the client dashboard tests, `npm t` in the `dashboard` directory

# how to self-host

## 1. clone the repo

```
git clone https://github.com/christian-fei/minimal-analytics.git
```

## 2. create a production configuration for docker-compose

```
cp docker-compose.yml docker-compose.prod.yml
```

change the environment variable `STATS_BASE_URL` to your own domain for minimal-analytics, e.g. `https://stats.example.com`

change the environment variable `SITE_BASE_URL` to your own domain for the site you want to track, e.g. `https://example.com`

## 3. run the service

run the `update.sh` script to start the server

## optional: 4. configure nginx

configure the nginx reverse proxy like so:

```
sudo vim /etc/nginx/sites-available/minimal_analytics
```

with the following content, changing `YOUR_STATS_DOMAIN` to e.g. `stats.example.com`

```
upstream minimal {
    server 127.0.0.1:3008 max_fails=5 fail_timeout=60s;
}

server {
    server_name    YOUR_STATS_DOMAIN;

    listen         80;
    listen         [::]:80;

    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript application/activity+json application/atom+xml;

    client_max_body_size 16m;
    ignore_invalid_headers off;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    location / {
        proxy_pass http://minimal;
    }
}
```

link to the enabled sites

```
sudo ln -s /etc/nginx/sites-available/minimal_analytics /etc/nginx/sites-enabled/minimal_analytics
```

reload nginx

```
sudo systemctl reload nginx
# or
sudo nginx -s reload
```