# Makefile

i:
	npm install

in:
	npm install

install:
	npm install

start:
	npm run babel-node -- src/bin/gendiff.js

publish:
	npm publish

lint:
	npm run eslint .

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
