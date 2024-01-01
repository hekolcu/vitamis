-- users_table_initial_scheme.sql

-- Use the appropriate database
USE vitamis;

-- Create Users table
CREATE TABLE Users (
   UserID INT AUTO_INCREMENT PRIMARY KEY,
   Username VARCHAR(50) NOT NULL,
   Password VARCHAR(255) NOT NULL,
   UserType ENUM('Advisee', 'Dietitian', 'Academician Dietitian', 'Admin') NOT NULL,
   Email VARCHAR(100) UNIQUE NOT NULL,
   Gender ENUM('Male', 'Female', 'Other') NOT NULL,
   DateOfBirth DATE NOT NULL,
   HealthConditions TEXT,
   CHECK (DateOfBirth >= '1900-01-01')
);

COMMIT;
