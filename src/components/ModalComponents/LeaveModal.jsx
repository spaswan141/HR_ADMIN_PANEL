// EmployeeModal.jsx - Updated with React Hook Form
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal";
import Input from "../InputField";
import api from "../../axios/axiosInterceptor";
import SearchInput from "../SearchInput";
import { toast } from "react-toastify";

const LeaveModal = ({ open, onClose, employeeId, onSuccess }) => {
  const [employees, setEmployees] = useState([]);
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onSubmit", // Validate on submit
    reValidateMode: "onChange", // Re-validate on change after first validation
    defaultValues: {
      employeeId: "",
      reason: "",
      designation: "",
      leaveDate: "",
      document: "",
    },
  });
  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append all form fields to FormData
      formData.append("employeeId", data.employeeId);
      formData.append("designation", data.designation);
      formData.append("leaveDate", data.leaveDate);
      formData.append("reason", data.reason);

      // Validate and append the resume file
      if (!data.document) {
        toast.error("Please upload a document");
        return;
      }

      const file = data.document;
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a PDF or Word document");
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size must be less than 5MB");
        return;
      }

      formData.append("document", file);

      // Make the API request using axios interceptor
      const response = await api.post("/leave/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API response:", response.data);

      // Show success notification
      toast.success("Leave has been added successfully!");

      // Call the onSuccess callback
      if (onSuccess) {
        onSuccess(response.data);
      }

      onSuccess(true);
      reset();
      onClose();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  const onError = (errors) => {
    console.log("Form validation errors:", errors);
    // Optionally trigger validation for all fields to show errors
    trigger();
  };

  const handleClose = () => {
    reset(); // Reset form to default values
    onClose();
  };
  const fetchEmployees = async () => {
    try {
      const response = await api.get(`/employee`);
      if (response.status == 200) {
        let result = response.data.data.map((item) => {
          return {
            name: item.fullName,
            id: item._id,
            designation:item.position
          };
        });
        setEmployees(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, [employeeId]);

  return (
    <Modal isOpen={open} onClose={handleClose} title="Add New Leave">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-grid">
          <SearchInput
            label="Search Employee Name"
            placeholder="Type to search users..."
            data={employees}
            searchKey="name" // for object arrays
            onSelect={(selectedUser) =>{
                setValue("employeeId",selectedUser.id);
                setValue("designation",selectedUser.designation)
            }}
            onSearch={(searchTerm) => console.log(searchTerm)}
            maxResults={10}
            required={true}
          />
          <Input
            name="designation"
            control={control}
            label="Designation"
            type="text"
            placeholder="Designation"
            required
            rules={{
              required: "Designation is required",
            }}
          />

          <Input
            name="leaveDate"
            control={control}
            label="Leave Date"
            type="date"
            required
            rules={{
              required: "Leave Date is required",
            }}
          />

          <Input
            name="document"
            control={control}
            label="document"
            placeholder={"Document"}
            type="file"
            required
            rules={{
              required: "Document is Required",
            }}
          />

          <Input
            name="reason"
            control={control}
            label="Reason"
            type="text"
            placeholder="Reason"
            required
            rules={{
              required: "Reason is required",
            }}
          />
        </div>

        <div className="save-button-container">
          <button type="submit" className="save-button">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default LeaveModal;
