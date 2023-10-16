#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  -- DROP ROLE IF EXISTS app_user;
  -- CREATE USER postgres;
	CREATE DATABASE employee-dev;
	GRANT ALL PRIVILEGES ON DATABASE employee-dev TO postrgres;

	CREATE DATABASE employee;
	GRANT ALL PRIVILEGES ON DATABASE employee TO postrgres;
EOSQL
