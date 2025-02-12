import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import { useState } from "react";
import InputField from "~/components/InputField";
import SelectField from "~/components/SelectField";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const phone_number = formData.get("phone_number") as string;
  const date_of_birth = formData.get("date_of_birth") as string;
  const job_title = formData.get("job_title") as string;
  const department = formData.get("department") as string;
  const salary = formData.get("salary") as string;
  const start_date = formData.get("start_date") as string;
  const employee_photo = formData.get("employee_photo") as File;
  const document_upload = formData.get("document_upload") as File;

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name, email, phone_number, date_of_birth, job_title, department, salary, start_date, employee_photo, document_upload) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [full_name, email, phone_number, date_of_birth, job_title, department, salary, start_date, employee_photo?.name, document_upload?.name]
  );

  return redirect("/employees");
};

export default function NewEmployeePage() {
  const [formValues, setFormValues] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    date_of_birth: "",
    job_title: "",
    department: "",
    salary: "",
    start_date: "",
  });

  const [employeePhoto, setEmployeePhoto] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (e.target.name === "employee_photo") {
        setEmployeePhoto(file);
      } else if (e.target.name === "document_upload") {
        setDocumentFile(file);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-black text-center">Create New Employee</h1>
      <Form method="post" className="space-y-4" encType="multipart/form-data">
        <InputField label="Full Name" name="full_name" value={formValues.full_name} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={formValues.email} onChange={handleChange} />
        <InputField label="Phone Number" type="tel" name="phone_number" value={formValues.phone_number} onChange={handleChange} />
        <InputField label="Date of Birth" type="date" name="date_of_birth" value={formValues.date_of_birth} onChange={handleChange} />

        <SelectField 
          label="Job Title" 
          name="job_title" 
          value={formValues.job_title} 
          onChange={handleChange}
          options={[
            { value: "Manager", label: "Manager" },
            { value: "Developer", label: "Developer" },
            { value: "Designer", label: "Designer" },
          ]}
        />

        <SelectField 
          label="Department" 
          name="department" 
          value={formValues.department} 
          onChange={handleChange}
          options={[
            { value: "HR", label: "HR" },
            { value: "IT", label: "IT" },
            { value: "Finance", label: "Finance" },
          ]}
        />

        <InputField label="Salary" type="number" name="salary" value={formValues.salary} onChange={handleChange} />
        <InputField label="Start Date" type="date" name="start_date" value={formValues.start_date} onChange={handleChange} />

        {/* File Uploads */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Profile Photo</label>
          <input type="file" name="employee_photo" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full" />
          {employeePhoto && <p className="text-sm text-gray-500">Selected: {employeePhoto.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-gray-700">Upload Document</label>
          <input type="file" name="document_upload" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="mt-1 block w-full" />
          {documentFile && <p className="text-sm text-gray-500">Selected: {documentFile.name}</p>}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Employee
          </button>
        </div>
      </Form>

      <hr className="my-6" />

      <ul className="space-x-4 text-center flex">
        <li><a href="/employees" className="text-blue-600 hover:text-blue-800">Employees</a></li>
        <li><a href="/timesheets" className="text-blue-600 hover:text-blue-800">Timesheets</a></li>
      </ul>
    </div>
  );
}
