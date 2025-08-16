// EmployeeModal.jsx - Updated with React Hook Form
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modalLayouts/Modal";
import Input from "../modalLayouts/InputField";
import api from "../../axios/axiosInterceptor";

const EmployeeModal = ({ open, onClose, employeeId, onSuccess }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onSubmit", // Validate on submit
    reValidateMode: "onChange", // Re-validate on change after first validation
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      joiningDate: "",
    },
  });

  // Debug logging
  console.log("Form errors:", errors);
  console.log("Form isValid:", isValid);

  const positionOptions = [
    { value: "Intern", label: "Intern" },
    { value: "Full Time", label: "Full Time" },
    { value: "Junior", label: "Junior" },
    { value: "Senior", label: "Senior" },
    { value: "Manager", label: "Manager" },
  ];

  const onSubmit = async (data) => {
    // data contains:
    // { fullName, email, phone, department, employeeType, joiningDate }

    // 👉 map them to the fields your backend expects
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      position: data.department, // <— frontend "department" goes to backend "position"
      employeeType: data.employeeType, // <— stays the same
      joiningDate: data.joiningDate, // <— stays the same
    };

    try {
      const response = await api.patch(
        `/employee/update/${employeeId}`,
        payload
      );
      if (response.status === 200) {
        onSuccess(true);
        onClose();
      }
    } catch (err) {
      console.log(err);
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
  const fetchEmployee = async () => {
    try {
      const response = await api.get(`/employee/${employeeId}`);
      if (response.status == 200) {
        reset({
          fullName: response.data.fullName,
          email: response.data.email,
          phone: response.data.phone,
          department: response.data.position, // 🔁 position → department
          employeeType: response.data.employeeType, // 🔁 employeeType → employeeType
          joiningDate: response.data.joiningDate
            ? response.data.joiningDate.slice(0, 10)
            : "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);
  return (
    <Modal isOpen={open} onClose={handleClose} title="Edit Employee Details">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-grid">
          <Input
            name="fullName"
            control={control}
            label="Full Name"
            type="text"
            placeholder="Enter full name"
            required
            rules={{
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            }}
          />

          <Input
            name="email"
            control={control}
            label="Email Address"
            type="email"
            placeholder="Enter email address"
            required
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
          />

          <Input
            name="phone"
            control={control}
            label="Phone Number"
            type="number"
            placeholder="Enter phone number"
            required
            rules={{
              required: "Phone number is required",
              pattern: {
                message: "Please enter a valid phone number",
              },
            }}
          />

          <Input
            name="department"
            control={control}
            label="Department"
            type="text"
            placeholder="Enter department"
            required
            rules={{
              required: "Department is required",
            }}
          />

          <Input
            name="employeeType"
            control={control}
            label="Position"
            type="select"
            options={positionOptions}
            placeholder="Select position"
            required
            rules={{
              required: "Position is required",
            }}
          />

          <Input
            name="joiningDate"
            control={control}
            label="Date of Joining"
            type="date"
            required
            rules={{
              required: "Date of joining is required",
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

export default EmployeeModal;
