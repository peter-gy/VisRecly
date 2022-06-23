format:
	poetry run black .
	poetry run isort .

lint:
	poetry run mypy
	poetry run pylint --jobs 0 src/rec_server

test:
	export PYTHONPATH=src && poetry run pytest

serve:
	cd src && poetry run uvicorn rec_server.main:app --reload

build:
	cd src && poetry build
