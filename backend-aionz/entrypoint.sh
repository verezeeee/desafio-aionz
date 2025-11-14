#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until nc -z postgres 5432; do
  sleep 1
done

echo "Waiting for PostgreSQL to accept connections..."
until pg_isready -h postgres -U postgres -d desafio_db; do
  sleep 1
done

echo "Running migrations..."
npx typeorm-ts-node-commonjs migration:run -d dist/data-source.js
MIGRATION_EXIT_CODE=$?

if [ $MIGRATION_EXIT_CODE -ne 0 ]; then
  echo "Migrations failed with exit code $MIGRATION_EXIT_CODE"
  exit 1
fi

echo "Starting NestJS application..."
node dist/main