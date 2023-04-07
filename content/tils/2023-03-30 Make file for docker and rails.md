---
title: "TIL: Makefile for docker and rails"
tags:
- til
---

```sh {title="Makefile"}
build:
  docker compose build

setup:
  docker compose run --rm app bin/rails db:setup

up:
  docker compose up

stop:
  docker compose stop

restart_db:
  docker compose run --rm app bin/rails db:drop
  docker compose run --rm app bin/rails db:create
  docker compose run --rm app bin/rails db:migrate
  docker compose run --rm app bin/rails db:seed

migrate:
  docker compose exec app bin/rails db:migrate

rollback:
  docker compose exec app bin/rails db:rollback

seed:
  docker compose exec app bin/rails db:seed

c:
  docker compose exec app bin/rails c

t:
  docker compose exec app bin/rails t

routes:
  docker compose exec app bin/rails routes
```

```sh
$ make build
$ make setup
$ make up
```

https://moviendo.me/makefile-for-docker-rails-applications.html