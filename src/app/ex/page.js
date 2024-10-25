"use client";
import { useMemo } from "react";
import {
  useMaterialReactTable,
  MRT_TableContainer,
  MRT_TableHeadCellFilterContainer,
} from "material-react-table";
import { Paper, Stack, useMediaQuery } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// ข้อมูลตัวอย่าง
const data = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    gender: "Male",
    age: 28,
    jobTitle: "Software Engineer",
    salary: 60000,
    startDate: "2022-01-15",
    endDate: "2023-05-20",
    isActive: true,
    department: "Engineering",
    address: "123 Main St",
    city: "New York",
    country: "USA",
    email: "john.doe@example.com",
    phoneNumber: "555-1234",
    createdAt: "2022-01-15T08:30:00Z",
    updatedAt: "2023-01-10T14:45:00Z",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    gender: "Female",
    age: 22,
    jobTitle: "Product Manager",
    salary: 75000,
    startDate: "2021-05-01",
    endDate: "2022-12-31",
    isActive: false,
    department: "Product",
    address: "456 Elm St",
    city: "San Francisco",
    country: "USA",
    email: "jane.smith@example.com",
    phoneNumber: "555-5678",
    createdAt: "2021-05-01T09:15:00Z",
    updatedAt: "2022-12-20T16:00:00Z",
  },
  {
    id: 3,
    firstName: "Alex",
    lastName: "Johnson",
    gender: "Other",
    age: 35,
    jobTitle: "Designer",
    salary: 50000,
    startDate: "2020-08-01",
    endDate: "2022-02-28",
    isActive: false,
    department: "Design",
    address: "789 Oak St",
    city: "Chicago",
    country: "USA",
    email: "alex.johnson@example.com",
    phoneNumber: "555-9101",
    createdAt: "2020-08-01T10:00:00Z",
    updatedAt: "2022-02-15T11:30:00Z",
  },
  {
    id: 4,
    firstName: "Emily",
    lastName: "Davis",
    gender: "Female",
    age: 30,
    jobTitle: "HR Specialist",
    salary: 45000,
    startDate: "2019-10-10",
    endDate: null,
    isActive: true,
    department: "HR",
    address: "135 Maple St",
    city: "Boston",
    country: "USA",
    email: "emily.davis@example.com",
    phoneNumber: "555-2323",
    createdAt: "2019-10-10T14:00:00Z",
    updatedAt: "2023-02-01T09:00:00Z",
  },
  {
    id: 5,
    firstName: "Michael",
    lastName: "Brown",
    gender: "Male",
    age: 40,
    jobTitle: "CEO",
    salary: 150000,
    startDate: "2018-01-01",
    endDate: null,
    isActive: true,
    department: "Executive",
    address: "246 Pine St",
    city: "Seattle",
    country: "USA",
    email: "michael.brown@example.com",
    phoneNumber: "555-3434",
    createdAt: "2018-01-01T07:00:00Z",
    updatedAt: "2023-03-05T12:15:00Z",
  },
  {
    id: 6,
    firstName: "Sara",
    lastName: "White",
    gender: "Female",
    age: 29,
    jobTitle: "QA Engineer",
    salary: 55000,
    startDate: "2021-04-15",
    endDate: null,
    isActive: true,
    department: "Quality Assurance",
    address: "357 Cedar St",
    city: "Los Angeles",
    country: "USA",
    email: "sara.white@example.com",
    phoneNumber: "555-4545",
    createdAt: "2021-04-15T08:45:00Z",
    updatedAt: "2023-02-20T14:30:00Z",
  },
  {
    id: 7,
    firstName: "Robert",
    lastName: "Green",
    gender: "Male",
    age: 33,
    jobTitle: "DevOps Engineer",
    salary: 80000,
    startDate: "2020-11-20",
    endDate: null,
    isActive: true,
    department: "DevOps",
    address: "468 Spruce St",
    city: "Denver",
    country: "USA",
    email: "robert.green@example.com",
    phoneNumber: "555-5656",
    createdAt: "2020-11-20T11:00:00Z",
    updatedAt: "2023-04-01T13:45:00Z",
  },
  {
    id: 8,
    firstName: "Laura",
    lastName: "King",
    gender: "Female",
    age: 26,
    jobTitle: "Marketing Manager",
    salary: 70000,
    startDate: "2019-06-05",
    endDate: null,
    isActive: true,
    department: "Marketing",
    address: "579 Birch St",
    city: "Austin",
    country: "USA",
    email: "laura.king@example.com",
    phoneNumber: "555-6767",
    createdAt: "2019-06-05T10:30:00Z",
    updatedAt: "2023-03-10T15:00:00Z",
  },
  {
    id: 9,
    firstName: "James",
    lastName: "Wilson",
    gender: "Male",
    age: 37,
    jobTitle: "Data Scientist",
    salary: 90000,
    startDate: "2022-02-10",
    endDate: null,
    isActive: true,
    department: "Data",
    address: "680 Willow St",
    city: "San Diego",
    country: "USA",
    email: "james.wilson@example.com",
    phoneNumber: "555-7878",
    createdAt: "2022-02-10T09:30:00Z",
    updatedAt: "2023-04-20T11:00:00Z",
  },
  {
    id: 10,
    firstName: "Sophia",
    lastName: "Taylor",
    gender: "Female",
    age: 27,
    jobTitle: "Frontend Developer",
    salary: 65000,
    startDate: "2021-07-15",
    endDate: null,
    isActive: true,
    department: "Engineering",
    address: "791 Ash St",
    city: "Portland",
    country: "USA",
    email: "sophia.taylor@example.com",
    phoneNumber: "555-8989",
    createdAt: "2021-07-15T08:00:00Z",
    updatedAt: "2023-04-10T12:30:00Z",
  },
];

const Example = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)");

  // กำหนด columns ของตาราง
  const columns = useMemo(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      {
        accessorKey: "gender",
        header: "Gender",
        filterFn: "equals",
        filterSelectOptions: ["Male", "Female", "Other"],
        filterVariant: "select",
      },
      { accessorKey: "age", header: "Age", filterVariant: "range" },
      { accessorKey: "jobTitle", header: "Job Title" },
      { accessorKey: "salary", header: "Salary", filterVariant: "range" },
      { accessorKey: "startDate", header: "Start Date" },
      { accessorKey: "endDate", header: "End Date" },
      {
        accessorKey: "isActive",
        header: "Active",
        filterVariant: "select",
        filterSelectOptions: [true, false],
      },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "country", header: "Country" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phoneNumber", header: "Phone Number" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        filterVariant: "date-range",
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        filterVariant: "date-range",
      },
    ],
    []
  );

  // สร้าง table instance
  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: "custom", // เราจะจัดการกับ UI ของฟิลเตอร์เอง
    enableFacetedValues: true,
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`, // ใช้ column.columnDef.header เพื่อดึงชื่อ header ที่ถูกต้อง
    }),
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction={isMobile ? "column-reverse" : "row"} gap="8px">
        <MRT_TableContainer table={table} />
        <Paper>
          <Stack p="8px" gap="8px">
            {table.getLeafHeaders().map((header) => (
              <MRT_TableHeadCellFilterContainer
                key={header.id}
                header={header}
                table={table}
                in
              />
            ))}
          </Stack>
        </Paper>
      </Stack>
    </LocalizationProvider>
  );
};

export default Example;