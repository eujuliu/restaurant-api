# Getting Started

## Fork and clone

For use this API, first you need to `fork` the repository and clone the project in your computer, for do this go to [Official Repository](https://github.com/eujuliu/restaurant-api) and `fork`, after clone the repository with the method that you prefer.

## Install modules

With the project in your computer, you need to install all modules, you can do this with one of the following commands.

With npm:

```bash
npm install
```

or with yarn

```bash
yarn
```

or with pnpm

```bash
pnpm install
```

## Database

This project use the ORM **Prisma** with **PostgreSQL** database, then for do something you need to install the postgresql and configure, here the [PostgreSQL Website](https://www.postgresql.org/) or if you have **Docker** installed, you can run the following command.

```bash
docker run --name postgres -p 5432:5433 -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=admin -d postgres:13
```

you can change the -e (Environment) values with something that you prefer

Then, you need to create a `.env` file and and the following key-values:

```
PORT= the post number of the server
DATABASE_URL= the database url, is like this: postgresql://johndoe:randompassword@localhost:5432/mydb
ACCESS_TOKEN_SECRET= the secret key for authentication
```

after install postgresql and create `.env`, you need to run `npm run migrate:deploy`, for create the tables.

## Testing

If you want to run the tests suits, first you need to run `npm run docker:up` for create the docker container and then run `npm run test`
