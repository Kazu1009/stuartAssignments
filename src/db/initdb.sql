-- Drops couriers table
DROP TABLE IF EXISTS "couriers";

-- Creates couriers table
CREATE TABLE IF NOT EXISTS "couriers" (
    "id" INT NOT NULL PRIMARY KEY
    , "max_capacity" INT NOT NULL
);

-- Drops packages table
DROP TABLE IF EXISTS "packages";

-- Creates packages table
CREATE TABLE IF NOT EXISTS "packages" (
    "id" INT NOT NULL PRIMARY KEY
    , "size" INT NOT NULL
    , "assignedcourier" INT
    , "origin" VARCHAR NOT NULL
    , "destination" VARCHAR NOT NULL
);