# Makefile

install:
	npm install

start:
	npm run babel-node -- src/bin/brain-progression.js

publish:
	npm publish

lint:
	npm run eslint .

test:
	npm test

build:
	rm -rf dist
	npm run-script build

list:
	npm list -g --depth=0

up:
	npm install braingames-start -g

out:
	npm uninstall braingames-start -g

.PHONY: test