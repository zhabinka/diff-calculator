# Makefile
install:
	install-dep

install-dep:
	npm i

run:
	npx babel-node -- src/bin/gendiff.js ./__tests__/__fixtures__/beforeDeep.json ./__tests__/__fixtures__/afterDeep.json

plain:
	gendiff --format plain ./__tests__/__fixtures__/beforeDeep.json ./__tests__/__fixtures__/afterDeep.json

plainshort:
	gendiff -f plain ./__tests__/__fixtures__/beforeDeep.json ./__tests__/__fixtures__/afterDeep.json

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
