#!/bin/sh
cd ./src

mkdir config

cp ../docker_config.json ./config/config.json

until PGPASSWORD=$POSTGRES_PASSWORD psql -U "postgres" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
  
>&2 echo "Postgres is up - executing command"
exec $cmd

npx sequelize-cli db:migrate

cd ..

npm run dev