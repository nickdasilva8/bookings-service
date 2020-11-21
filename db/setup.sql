DROP DATABASE IF EXISTS bookings;

DROP ROLE IF EXISTS  bookings_user;

CREATE ROLE bookings_user LOGIN
  ENCRYPTED PASSWORD 'woodhouse1'
  SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION;

CREATE DATABASE bookings
  WITH OWNER = bookings_user
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'en_US.utf8'
       LC_CTYPE = 'en_US.utf8'
       CONNECTION LIMIT = -1;
