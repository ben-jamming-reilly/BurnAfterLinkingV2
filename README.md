# BurnAfterLinking

One time links that disappear after viewing or by expiration

Follow the following steps below to emulate how I run this bad biddie

## Setup the Database

In a root terminal of your Unix based system of choice (Ubuntu for me)

Install Docker: https://docs.docker.com/get-docker/

Grab the docker image for postgres

```s
docker pull postgres
```

Run the docker container (leave this running)

```s
docker run --name pg -e POSTGRES_PASSWORD=SpikeTheBulldog -e POSTGRES_DB=app -p 5432:5432 postgres
```

## Setup your dependencies

Of course, clone the repo

```s
git clone git@github.com:Gonzaga-CPSC-Fall-2021-Olivares/cpsc-314-web-development-final-project-ben-jamming-reilly.git
```

Create a .env file in root

```s
DATABASE_URL="postgresql://postgres:SpikeTheBulldog@localhost:5432/app?schema=public"
JWT_SECRET="rE9xzbotqJHrU8vYfQUSsW5feH1qgJgF"
JWT_TTL="72000"
CAPTCHA_SITE_KEY="6LfkPCEaAAAAAErMd08ve2nZ48ZSqhMMuJurQxH3"
CAPTCHA_SECRET_KEY="6LfkPCEaAAAAAI2sFFQYZTtyG5ot1GjWIxzcau0_"
```

Install all dependencies

```s
npm run setup
```

## Map your database

To remap prisma schema to postgres schema (only for development) run...

```s
yarn prisma migrate dev
```

## Run the sucker

```s
yarn dev
```
