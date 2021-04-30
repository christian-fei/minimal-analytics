# minimal-analytics

[![minimal analytics dashboard](https://github.com/christian-fei/minimal-analytics/blob/main/.github/assets/dashboard.png?raw=true)](https://cri.dev/posts/2021-04-28-fullstack-nodejs-preact-minimal-web-analytics-introduction/)

Read more about the project at [cri.dev - "Making Minimal Analytics"](https://cri.dev/posts/2021-04-28-fullstack-nodejs-preact-minimal-web-analytics-introduction/)

See [Minimal Analytics in action](https://s.cri.dev)

## installation

create the `data` directory with 

```
mkdir data
```

create an empty `data/data.ljson` file with

```
touch data/data.ljson
```

### running with docker-compose

configure the environment variables in `docker-compose.yml` regarding `STATS_BASE_URL` and `SITE_BASE_URL`.

`STATS_BASE_URL` is the location where the minimal-analytics is running, e.g. `https://stats.example.com`

`SITE_BASE_URL` is the location of the site you want to allow tracking, e.g. `https://example.com`

Run the service with

```
docker-compose up -d --build --remove-orphans --renew-anon-volumes
```

### running with npm

Install the dependencies for the server with `npm i`.

`cd client` and install the dependencies for the client with `npm i`.

Run `npm run build` in the client directory, to build the static frontend.

Set the environment variables `STATS_BASE_URL` and `SITE_BASE_URL` and run it, e.g.

```bash
SITE_BASE_URL=http://0.0.0.0:8081 STATS_BASE_URL=http://127.0.0.1:8080 npm start
```

If you want to develop on the client, run `npm run dev -- --port 8081`
