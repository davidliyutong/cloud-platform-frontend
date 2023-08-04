GIT_VERSION := $(shell git describe --tags --always)

build.docker.buildx:
	docker buildx build --platform=linux/amd64,linux/arm64 -t davidliyutong/clpl-frontend:${GIT_VERSION} -f manifests/docker/Dockerfile .
	docker buildx build --platform=linux/amd64,linux/arm64 -t davidliyutong/clpl-frontend:latest -f manifests/docker/Dockerfile .
	docker buildx build --load -t davidliyutong/clpl-frontend:latest -f manifests/docker/Dockerfile .

push.docker.buildx:
	docker buildx build --push --platform=linux/amd64,linux/arm64 -t davidliyutong/clpl-frontend:${GIT_VERSION} -f manifests/docker/Dockerfile .
	docker buildx build --push --platform=linux/amd64,linux/arm64 -t davidliyutong/clpl-frontend:latest -f manifests/docker/Dockerfile .

test.docker:
	docker run --rm -it --net=host -p 8080:80 davidliyutong/clpl-backend:latest

task.generate_client.javascript:
	openapi-generator-cli generate -g javascript -i http://127.0.0.1:8080/docs/openapi.json --skip-validate-spec -o src/client