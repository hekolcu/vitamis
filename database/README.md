# Database Directory

This directory contains all the SQL scripts and migrations necessary for setting up and managing the database for our project.

## Structure

- `/Migrations` - Contains all the migration scripts. Each file is prefixed with a timestamp or version number for ordering.
- `/Scripts` - Includes utility scripts like data seeding scripts.

## Getting Started

### Applying Migrations

To set up your initial database schema, run the migration scripts in the `/Migrations` directory in order. These scripts create the necessary tables and relationships in your database.

```bash
mysql -u username -p database_name < Migrations/0001_initial_schema.sql
mysql -u username -p database_name < Migrations/0002_add_users_table.sql
...
