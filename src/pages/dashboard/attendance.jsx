// CandidatesPage.jsx

import { useEffect, useState } from "react";
import "./candidate.css";
import DynamicTable from "../../components/table/table";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import CustomSearch from "../../components/customSearch/customSearch";
import api from "../../axios/axiosInterceptor";
import { useDebounce } from "use-debounce";
import EmployeeModal from "../../components/ModalComponents/EmployeeModal";
import { toast } from "react-toastify";
export default function Attendance() {
  const [employeeId, setEmpployeeId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const columns = [
    { header: "Profile", accessor: "profile", type: "image" },
    { header: "Employee Name", accessor: "fullName" },
    { header: "Position", accessor: "employeeType" },
    { header: "Department", accessor: "employeeType" },
    { header: "Task", accessor: "tak" },
    {
      header: "Status",
      accessor: "employeeAttendanceStatus",
      type: "select",
      options: ["Present", "Absent", "Medical Leave", "Work From Home"],
    },
    { header: "Action", accessor: "action", type: "action" },
  ];
  const handleStatusChange = (rowIndex, accessor, value, id) => {
    updateEmployeeStatus(id, value);
    const updatedData = [...data];
    updatedData[rowIndex][accessor] = value;
    setData(updatedData);
  };
  const handleActionClick = (rowIndex, accessor, action) => {
    const row = data[rowIndex];

    // check if user clicked on "Download Resume"
    if (action === "Edit") {
      setOpenModal(true);
      setEmpployeeId(row._id);
    }

    if (action === "Delete") {
      deleteCandidate(row._id);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employee", {
        params: {
          search: search,
          attendanceStatus: status,
        },
      });
      console.log(response);
      if (response.status === 200) {
        const result = response?.data?.data?.map((item, index) => {
          // Format date (YYYY-MM-DD → e.g. 29/08/2025)
          const date = new Date(item.joiningDate);
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getFullYear()}`;

          return {
            ...item,
            joiningDate: item.joiningDate ? formattedDate : "", // <-- use formatted value here
            profile: "https://randomuser.me/api/portraits/men/34.jpg",
            id: index + 1,
          };
        });

        setData(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [status, debouncedSearch]);
  const onSuccess = (value) => {
    if (value == true) {
      toast.success("Employee has been updates successfully");
      fetchEmployees();
    }
  };
  const deleteCandidate = async (id) => {
    try {
      const response = await api.delete(`/candidate/${id}`);
      if (response.status == 200) {
        fetchEmployees();
        toast.success("Employee Deleted Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateEmployeeStatus = async (employeeId, status) => {
    try {
      let payload = {
        employeeAttendanceStatus: status,
      };
      const response = await api.patch(
        `/employee/update/${employeeId}`,
        payload
      );
      if (response.status === 200) {
        toast.success("Employee Status has been updated");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="main-container">
      <header>
        <div className="left-div">
          <CustomSelect
            label="Position"
            value={status}
            condition={status}
            options={["Present", "Absent", "Medical Leave", "Work From Home"]}
            onChange={(value) => setStatus(value)}
          />
        </div>

        <div className="right-div">
          <CustomSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
            }}
          />
        </div>
      </header>
      <div className="table-container">
        <DynamicTable
          columns={columns}
          data={data}
          onSelectChange={handleStatusChange}
          onActionClick={handleActionClick}
        />
      </div>
      <EmployeeModal
        onSuccess={onSuccess}
        employeeId={employeeId}
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
      />
    </div>
  );
}
