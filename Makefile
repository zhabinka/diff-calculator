# Makefile
install:
	install-dep

install-dep:
	npm i

start:
	npx babel-node -- src/bin/gendiff.js -h

publish:
	npm publish

lint:
	npx eslint .

test:
	npm test

build:
	rm -rf dist
	npm run build

list:
	npm list -g --depth=0

up:
	npm install diff-config -g

out:
	npm uninstall diff-config -g

.PHONY: test
