# Makefile
install:
	install-dep

install-dep:
	npm i

start:
	npx babel-node -- src/bin/gendiff.js ./__tests__/__fixtures__/beforeDeep.json ./__tests__/__fixtures__/afterDeep.json

run:
	gendiff ./__tests__/__fixtures__/beforeDeep.json ./__tests__/__fixtures__/afterDeep.json

plain:
	gendiff --format plain ./__tests__/__fixtures__/beforeDeep.yml ./__tests__/__fixtures__/afterDeep.yml

json:
	npx babel-node -- src/bin/gendiff.js -f json ./__tests__/__fixtures__/beforeDeep.ini ./__tests__/__fixtures__/afterDeep.ini

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
