# Makefile
install:
	install-dep

install-dep:
	npm i

run:
	npx babel-node -- src/bin/gendiff.js ./__tests__/__fixtures__/before.json ./__tests__/__fixtures__/after.json

json:
	npx babel-node -- src/bin/gendiff.js ./__tests__/__fixtures__/beforeDeep.json ./__tests__/__fixtures__/afterDeep.json

yaml:
	npx babel-node -- src/bin/gendiff.js ./__tests__/__fixtures__/beforeDeep.yaml ./__tests__/__fixtures__/afterDeep.yaml

ini:
	npx babel-node -- src/bin/gendiff.js ./__tests__/__fixtures__/beforeDeep.ini ./__tests__/__fixtures__/afterDeep.ini

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
