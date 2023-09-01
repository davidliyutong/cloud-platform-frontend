GIT_VERSION := $(shell git describe --abbrev=0 --tags)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

build.docker:
	docker build -t davidliyutong/clpl-frontend:latest .

build.docker.buildx:
	docker buildx build --platform=linux/amd64,linux/arm64 -t davidliyutong/clpl-frontend:${GIT_VERSION} -t davidliyutong/clpl-frontend:${GIT_BRANCH}-${GIT_VERSION} -t davidliyutong/clpl-frontend:latest -f manifests/docker/Dockerfile .
	docker buildx build --load -t davidliyutong/clpl-frontend:latest -f manifests/docker/Dockerfile .

push.docker.buildx:
	docker buildx build --push --platform=linux/amd64,linux/arm64 -t davidliyutong/clpl-frontend:${GIT_VERSION} -t davidliyutong/clpl-frontend:${GIT_BRANCH}-${GIT_VERSION} -t davidliyutong/clpl-frontend:latest -f manifests/docker/Dockerfile .

test.docker:
	docker run --rm -it -p 8080:80 -e CLPL_BACKEND_URL=https://apiserver.speit.site -e CLPL_DNS_RESOLVER=10.43.0.10 davidliyutong/clpl-frontend:latest

task.generate_client.javascript:
	openapi-generator-cli generate -g javascript -i http://127.0.0.1:8080/docs/openapi.json --skip-validate-spec -o src/client