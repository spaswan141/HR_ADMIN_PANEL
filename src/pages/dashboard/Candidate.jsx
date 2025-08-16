// CandidatesPage.jsx

import { useEffect, useState } from "react";
import "./candidate.css";
import DynamicTable from "../../components/Table";
import CustomSelect from "../../components/CustomSelect";
import CustomSearch from "../../components/CustomSearch";
import CustomButton from "../../components/CustomButton";
import EmployeeModal from "../../components/ModalComponents/EmployeeModal";
import AddCandidateModal from "../../components/ModalComponents/CandidateModal";
import api from "../../axios/axiosInterceptor";
import { useDebounce } from "use-debounce";
import { TbWashDryP } from "react-icons/tb";
import { toast } from "react-toastify";

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [openCandidateModal, setOpenCandidateModal] = useState(false);
  const [data, setData] = useState();
  const columns = [
    { header: "Sr no.", accessor: "id" },
    { header: "Candidate Name", accessor: "fullName" },
    { header: "Email Address", accessor: "email" },
    { header: "Phone Number", accessor: "phone" },
    { header: "Position", accessor: "position" },
    {
      header: "Status",
      accessor: "status",
      type: "select",
      options: ["Schedule", "Ongoing", "Selected", "Rejected"],
    },
    { header: "Experience", accessor: "experience" },
    {
      header: "Actions",
      accessor: "actions",
      type: "action",
      actions: ["Download Resume", "Delete Candidate"],
    },
  ];
  const handleStatusChange = (rowIndex, accessor, value, id) => {
    changeStatus(id, value);
    const updatedData = [...data];
    updatedData[rowIndex][accessor] = value;
    setData(updatedData);
  };

  const handleActionClick = (rowIndex, accessor, action) => {
    const row = data[rowIndex];

    // check if user clicked on "Download Resume"
    if (action === "Download Resume") {
      downloadResume(row._id);
    }

    if (action === "Delete Candidate") {
      deleteCandidate(row._id);
    }
  };
  const fetchCandidates = async () => {
    try {
      const response = await api.get("/candidate", {
        params: {
          search: search,
          position: position,
          status: status,
        },
      });
      console.log(response);
      if (response.status == 200) {
        let result = response?.data?.data?.map((item, index) => {
          return {
            ...item,
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
    fetchCandidates();
  }, [status, debouncedSearch, position]);

  const onSuccess = (value) => {
    if (value == true) {
      fetchCandidates();
    }
  };
  const downloadResume = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}candidate/resume/${id}`
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "document.pdf";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };
  const deleteCandidate = async (id) => {
    try {
      const response = await api.delete(`/candidate/${id}`);
      if (response.status == 200) {
        fetchCandidates();
        toast.success("Candidate Deleted Successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const changeStatus = async (id, status) => {
    try {
      let payload = {
        id: id,
        status: status,
      };
      const response = await api.patch("/candidate/status", payload);
      if (response.status == 200) {
        toast.success("Candidate Status has been changed");
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
            condition={status}
            label="Status"
            value={status}
            options={["Schedule", "Ongoing", "Selected", "Rejected"]}
            onChange={(value) => {
              setStatus(value);
            }}
          />
          <CustomSelect
            condition={position}
            label="Position"
            value={position}
            options={["Designer", "Developer", "Human Resource"]}
            onChange={(value) => {
              setPosition(value);
            }}
          />
        </div>

        <div className="right-div">
          <CustomSearch
            value={search}
            onChange={(value) => {
              setSearch(value);
            }}
          />
          <CustomButton
            label="Add Candidate"
            onClick={() => {
              setOpenCandidateModal(true);
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
      <AddCandidateModal
        open={openCandidateModal}
        onClose={() => setOpenCandidateModal(false)}
        onSuccess={onSuccess}
      />
    </div>
  );
}
