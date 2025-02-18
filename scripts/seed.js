import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

// Employee seed data
const employees = [
  {
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    phone_number: '1234567890',
    date_of_birth: '1990-05-15',
    job_title: 'Developer',
    department: 'IT',
    salary: 600,
    start_date: '2022-03-01',
    employee_photo: null, // No photo uploaded
    document_upload: null, // No document uploaded
  },
  {
    full_name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone_number: '0987654321',
    date_of_birth: '1985-08-20',
    job_title: 'Manager',
    department: 'HR',
    salary: 800,
    start_date: '2019-07-15',
    employee_photo: null,
    document_upload: null,
  },
  {
    full_name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone_number: '1122334455',
    date_of_birth: '1995-11-10',
    job_title: 'Designer',
    department: 'Marketing',
    salary: 550,
    start_date: '2021-06-10',
    employee_photo: null,
    document_upload: null,
  },
];

// Timesheet seed data
const timesheets = [
  {
    employee_id: 1,
    start_time: '2025-02-10 08:00:00',
    end_time: '2025-02-10 17:00:00',
    summary: 'Worked on project development tasks',
  },
  {
    employee_id: 2,
    start_time: '2025-02-11 12:00:00',
    end_time: '2025-02-11 17:00:00',
    summary: 'Conducted HR interviews and meetings',
  },
  {
    employee_id: 3,
    start_time: '2025-02-12 07:00:00',
    end_time: '2025-02-12 16:00:00',
    summary: 'Designed new social media assets',
  },
];

// Function to insert data into tables
const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});
