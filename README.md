# Backend (NodeJs) repository - WeDevelop WeRewards App

[![N|Solid](https://i.ibb.co/YQ4Xv7B/wedevelop-logo-f3beb597-1.png)](https://wedevelop.me/)

Project made for WeDevelop training program (Fullstack Developer - Javascript). It consists in 3 GitHub repositories.

- **Main (Docker)**: https://github.com/nicolasgoldman07/wedev-reward-docker
- **Backend**: https://github.com/nicolasgoldman07/wedev-reward-backend
- **Frontend**: https://github.com/nicolasgoldman07/wedev-reward-frontend

# Installation

For start using the application, you must:

```sh
$ git clone [GITHUB REPOSITORY] [PROJECT DIRECTORY]
$ cd [PROJECT DIRECTORY]
$ npm install -d
```

for each of the repositories (backend, frontent and docker).

Project structure must be:

```
PROJECT_DIR/
    |---- FRONTEND/
    |        |-- node_modules
    |        |-- [frontend-files]
    |---- BACKEND/
    |        |-- node_modules
    |        |-- [backend-files]
    |---- pg/(created by postgres container)
    |        |-- pg_data/..
    |---- docker-compose.yml
    |---- init.sql
    |---- README.md
```

# Running the application

Once you have the project structure ready with node modules installed, you're ready to start the project with:

```
docker-compose up
```

(You must already have docker and docker compose installed in order to start it)

# Stoping the application

To stop the container from running, you must:

```
docker-compose down
```

# Docker information

Docker compose will start 3 services.

- **_Postgres:_** Container with volume for data persistance, mapped in local port 5432 and with PostgreSQL official image. It will create `/pg` directory in root, and run `init.sql`for creating the database for the project.
- **_Backend:_** Image builded with Dockerfile (see backend project repository). Mapped to 3001 port locally. For testing, access to `localhost:3000/graphql`.
- **_Postgres:_** Image builded with Dockerfile (see frontend project repository). Mapped to 3000 port locally.
