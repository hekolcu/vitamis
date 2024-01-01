#!/bin/bash

# Prompt for database credentials
echo "Please enter the database credentials:"
read -p "Database Username: " DB_USER
read -s -p "Database Password: " DB_PASS
echo
read -p "Database Name: " DB_NAME

# Define the directory containing migration files
MIGRATION_DIR="$(dirname "$0")/Migrations"

# Loop through each SQL file in the Migrations folder and execute it
echo "Running migration files..."
for sql_file in `ls $MIGRATION_DIR/*.sql | sort -V`; do
    echo "Processing $sql_file..."
    mysql -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" < "$sql_file"
    if [ $? -ne 0 ]; then
        echo "An error occurred with $sql_file - stopping migration."
        exit 1
    fi
done

echo "All migrations were applied successfully."
