# Database Directory

This directory contains all the SQL scripts and migrations necessary for setting up and managing the database for our project.

## Structure

- `/Migrations` - Contains all the migration scripts. Each file is prefixed with a timestamp or version number for ordering.
- `/Scripts` - Includes utility scripts like data seeding scripts.

## Getting Started

### Applying Migrations

To set up your initial database schema and apply all subsequent migrations, you will need to run the migration scripts located in the `/Migrations` directory. This ensures that the necessary tables and relationships are created in your database.

A custom script `run_migrations.sh` is provided to automate this process. To use the script, follow these steps:

1. Ensure that you have the MySQL command-line tools installed on your system.
2. Open a terminal or command-line interface.
3. Navigate to the `database` directory of the project.
4. Run the script by typing `./run_migrations.sh` and pressing Enter.
5. When prompted, enter the required database credentials (username, password, and database name).

The script will execute each migration file in the correct order. If there is an error with any migration, the script will stop, allowing you to resolve the issue before continuing.

Here is an example of how to run the script:

```bash
cd vitamis/database
./run_migrations.sh
