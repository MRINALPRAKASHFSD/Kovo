-- KOVO — PostgreSQL database initialization
-- This script runs once on first postgres container start.

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- for full-text search
CREATE EXTENSION IF NOT EXISTS "btree_gin"; -- for composite GIN indexes

-- Create application role with limited privileges
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'kovo_app') THEN
    CREATE ROLE kovo_app LOGIN PASSWORD 'change_me_in_production';
  END IF;
END
$$;

GRANT CONNECT ON DATABASE kovo_db TO kovo_app;

-- Schema will be managed by Alembic migrations
-- See: apps/backend/infrastructure/database/migrations/
