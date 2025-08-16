// CandidatesPage.jsx

import { useEffect, useState } from "react";
import "./candidate.css";
import DynamicTable from "../../components/Table";
import CustomSelect from "../../components/CustomSelect";
import CustomSearch from "../../components/CustomSearch";
import api from "../../axios/axiosInterceptor";
import { useDebounce } from "use-debounce";
import EmployeeModal from "../../components/ModalComponents/EmployeeModal";
import { toast } from "react-toastify";
export default function Employee() {
  const [employeeId, setEmpployeeId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const columns = [
    { header: "Profile", accessor: "profile", type: "image" },
    { header: "Employee Name", accessor: "fullName" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Position", accessor: "employeeType" },
    { header: "Department", accessor: "position" },
    { header: "Date Of Joining", accessor: "joiningDate" },
    {
      header: "Action",
      accessor: "action",
      type: "action",
      actions: ["Edit", "Delete"],
    },
  ];
  const handleStatusChange = (rowIndex, accessor, value) => {
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
          position: position,
          status: status,
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
  }, [status, debouncedSearch, position]);
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
  return (
    <div className="main-container">
      <header>
        <div className="left-div">
          <CustomSelect
            condition={position}
            label="Position"
            value={position}
            options={["Intern", "Full Time", "Junior", "Senior", "Manager"]}
            onChange={(value) => setPosition(value)}
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
