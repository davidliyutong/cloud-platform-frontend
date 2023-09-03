# Cloud Platform Frontend

This is the frontend for the [Cloud Platform API Server](https://github.com/davidliyutong/cloud-platform-apiserver)Project

## Project setup

Recommended node version: `v16.18.1`

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## The Docker Image

The docker image of this frontend could be built by the following command:

```bash
make build.docker.buildx
```

> This requires the [Docker Buildx](https://docs.docker.com/engine/reference/commandline/buildx/) plugin to be installed.


The configuration is achieved by the following environment variables:

| Name               | Description                        | Default Value |
|--------------------|------------------------------------|---------------|
| CLPL_BACKEND_URL   | The URL of the backend API server  | `n/a`         |
| CLPL_DNS_RESOLVER  | The DNS list, seperated by `space` | 10.43.0.10    |


## TODO

- pod management
- template management
- user management
- ~~profile management~~
- ~~home~~
- ~~login~~