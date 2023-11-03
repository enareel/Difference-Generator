# Makefile
install: # установка зависимостей
	npm ci
link: # линк
	sudo npm link
publish: # публикация пакета
	npm publish --dry-run
prettier: # prettier
	npx prettier --write "{bin, src, __tests__, __fixtures__}/**/*"
lint: # линтинг
	npx eslint .
test: # тесты
	npm test
test-coverage: # тесты с покрытием
	npm run test:coverage
