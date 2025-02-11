-- Drop existing tables
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS timesheets;

-- Create employees table with all required and bonus fields
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,  -- Ensuring emails are unique
    phone_number TEXT NOT NULL,  -- Storing as TEXT to handle different formats
    date_of_birth DATE NOT NULL, -- Ensuring employee is over 18 (validated in the application)
    job_title TEXT NOT NULL,     -- Example values: "Manager", "Developer", etc.
    department TEXT NOT NULL,    -- Example values: "HR", "IT", "Finance", etc.
    salary INTEGER NOT NULL CHECK (salary >= 500), -- Ensuring salary is above minimum wage
    start_date DATE NOT NULL,    -- Date of employment start
    employee_photo TEXT NULL,    -- File path for the employee's photo
    document_upload TEXT NULL    -- File path for CV, ID, etc.
);

-- Create timesheets table with all required and bonus fields
CREATE TABLE timesheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    employee_id INTEGER NOT NULL,
    summary TEXT NULL,  -- Summary of work done (bonus field)
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    CHECK (start_time < end_time) -- Ensuring start time is before end time
);
