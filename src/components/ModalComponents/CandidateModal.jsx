// EmployeeModal.jsx - Updated with React Hook Form
import React from "react";
import { useForm } from "react-hook-form";
import Modal from "../modalLayouts/Modal";
import Input from "../modalLayouts/InputField";
import api from "../../axios/axiosInterceptor";
import { toast } from "react-toastify";

const AddCandidateModal = ({ open, onClose, onSuccess }) => {
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
      experience: "",
      position: "",
      resume: "",
    },
  });

  // Debug logging
  console.log("Form errors:", errors);
  console.log("Form isValid:", isValid);

  const positionOptions = [
    { value: "Designer", label: "Designer" },
    { value: "Developer", label: "Developer" },
    { value: "Human Resource", label: "Human Resource" },
  ];

  const onSubmit = async (data) => {
    console.log("Form data:", data);
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append all form fields to FormData
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("experience", data.experience);
      formData.append("position", data.position);

      // Validate and append the resume file
      if (!data.Resume) {
        toast.error("Please upload a resume");
        return;
      }

      const file = data.Resume;
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

      formData.append("resume", file);

      // Make the API request using axios interceptor
      const response = await api.post("/candidate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API response:", response.data);

      // Show success notification
      toast.success("Candidate added successfully!");

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

  return (
    <Modal isOpen={open} onClose={handleClose} title="Add New Candidate">
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
            name="position"
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
            name="experience"
            control={control}
            label="Experience"
            type="text"
            placeholder="Experience"
            required
            rules={{
              required: "Experience is required",
            }}
          />
          <Input
            name="Resume"
            control={control}
            label="Resume"
            type="file"
            required
            rules={{
              required: "Resume is Required",
              validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                if (selectedDate > today) {
                  return "Date of joining cannot be in the future";
                }
                return true;
              },
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

export default AddCandidateModal;
