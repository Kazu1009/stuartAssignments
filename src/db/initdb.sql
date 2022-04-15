-- Drops couriers table
DROP TABLE IF EXISTS "couriers";

-- Creates couriers table
CREATE TABLE IF NOT EXISTS "couriers" (
    "id" INT NOT NULL PRIMARY KEY
    , "max_capacity" INT NOT NULL
);