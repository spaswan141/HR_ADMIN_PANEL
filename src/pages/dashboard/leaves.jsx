// CandidatesPage.jsx

import { useEffect, useState } from "react";
import "./leaves.css";
import api from "../../axios/axiosInterceptor";
import { useDebounce } from "use-debounce";
import { TbWashDryP } from "react-icons/tb";
import { toast } from "react-toastify";
import LeaveModal from "../../components/ModalComponents/LeaveModal";
import LeaveCalendar from "../../components/LeaveCalendar";
import DynamicTable from "../../components/Table";
import CustomSelect from "../../components/CustomSelect";
import CustomSearch from "../../components/CustomSearch"
import CustomButton from "../../components/CustomButton"
export default function Leaves() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [status, setStatus] = useState("");
  const [openCandidateModal, setOpenCandidateModal] = useState(false);
  const [data, setData] = useState();
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const columns = [
    { header: "Profile", accessor: "profile", type: "image" },
    { header: "Name", accessor: "fullName" },
    { header: "Date", accessor: "leaveDate" },
    { header: "Reason", accessor: "reason" },
    {
      header: "Status",
      accessor: "status",
      type: "select",
      options: ["Approve", "Reject"],
    },
    { header: "Doc", accessor: "document", type: "doc" },
  ];
  const handleStatusChange = (rowIndex, accessor, value, id) => {
    changeStatus(id, value);
    const updatedData = [...data];
    updatedData[rowIndex][accessor] = value;
    setData(updatedData);
  };

  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leave", {
        params: {
          search: search,
          status: status,
        },
      });
      console.log(response);
      if (response.status == 200) {
        const result = response?.data?.data?.map((item, index) => {
          // Format date (YYYY-MM-DD → e.g. 29/08/2025)
          const date = new Date(item.leaveDate);
          const formattedDate = `${date
            .getDate()
            .toString()
            .padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${date.getFullYear()}`;

          return {
            _id: item._id,
            fullName: item?.employeeDetails?.fullName,
            reason: item?.reason,
            status: item?.status,
            document: item?.document,
            leaveDate: item?.leaveDate ? formattedDate : "", // <-- use formatted value here
            profile: "https://randomuser.me/api/portraits/men/34.jpg",
          };
        });

        setData(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchApprovedLeave = async () => {
    try {
      const response = await api.get("/leave/approved");
      console.log(response);
      if (response.status == 200) {
        const result = response?.data?.data?.map((item, index) => {
          const date = new Date(item.leaveDate);
          const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

          console.log(formattedDate);

          return {
            id: index + 1,
            name: item?.employeeDetails?.fullName,
            title:
              item?.employeeDetails?.employeeType +
              " " +
              item?.employeeDetails?.position,
            date: formattedDate, // <-- use formatted value here
            avatar: "https://randomuser.me/api/portraits/men/34.jpg",
          };
        });

        setApprovedLeaves(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, [status, debouncedSearch]);

  const onSuccess = (value) => {
    if (value == true) {
      fetchLeaves();
    }
  };
  useEffect(() => {
    fetchApprovedLeave();
  }, []);
  const downloadDocument = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}leave/download-doc/${id}`
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

  const changeStatus = async (id, status) => {
    try {
      const response = await api.patch(`/leave/update/${id}?status=${status}`);
      if (response.status == 200) {
        toast.success("Leave Status has been changed");
        fetchApprovedLeave();
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
            options={["Pending", "Approve", "Reject"]}
            onChange={(value) => {
              setStatus(value);
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
            label="Add Leave"
            onClick={() => {
              setOpenCandidateModal(true);
            }}
          />
        </div>
      </header>

      <div className="table-container">
        <div className="table-wrapper">
          <DynamicTable
            columns={columns}
            data={data}
            title="Applied Leaves"
            onDocumentClick={(row) => {
              downloadDocument(row._id);
            }}
            onSelectChange={handleStatusChange}
          />
        </div>
        <div className="calendar-wrapper">
          <LeaveCalendar leaves={approvedLeaves} />
        </div>
      </div>
      <LeaveModal
        open={openCandidateModal}
        onClose={() => setOpenCandidateModal(false)}
        onSuccess={onSuccess}
      />
    </div>
  );
}
