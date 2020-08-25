#!/bin/sh
cd ./src
mkdir config
cp ../docker_config.json ./config/config.json
npx sequelize-cli db:migrate

cd ..
npm run dev