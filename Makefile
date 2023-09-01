GIT_VERSION := $(shell git describe --abbrev=0 --tags --always)
GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
AUTHOR=davidliyutong

build.docker:
	docker build -t ${AUTHOR}/clpl-frontend:latest .

build.yarn:
	yarn install
	yarn build

build.docker.buildx: build.yarn
	docker buildx build --platform=linux/amd64,linux/arm64 -t ${AUTHOR}/clpl-frontend:${GIT_BRANCH}-latest -t ${AUTHOR}/clpl-frontend:${GIT_BRANCH}-${GIT_VERSION} -t ${AUTHOR}/clpl-frontend:latest -f manifests/docker/Dockerfile .
	docker buildx build --load -t ${AUTHOR}/clpl-frontend:latest -f manifests/docker/Dockerfile .

push.docker.buildx: build.yarn
	docker buildx build --push --platform=linux/amd64,linux/arm64 -t ${AUTHOR}/clpl-frontend:${GIT_BRANCH}-latest -t ${AUTHOR}/clpl-frontend:${GIT_BRANCH}-${GIT_VERSION} -t ${AUTHOR}/clpl-frontend:latest -f manifests/docker/Dockerfile .

test.docker:
	docker run --rm -it -p 8080:80 -e CLPL_BACKEND_URL=https://apiserver.speit.site -e CLPL_DNS_RESOLVER=10.43.0.10 ${AUTHOR}/clpl-frontend:latest

task.generate_client.javascript:
	openapi-generator-cli generate -g javascript -i http://127.0.0.1:8080/docs/openapi.json --skip-validate-spec -o src/client

task.update_branches:
	git checkout speit && git rebase main || git checkout main
	git checkout robotflow && git rebase main || git checkout main