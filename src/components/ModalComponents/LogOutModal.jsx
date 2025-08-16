import React from "react";
import Modal from "../modalLayouts/Modal";
import useAuthStore from "../../store/authStore";

const LogoutModal = ({ open, onClose }) => {
  const { logout } = useAuthStore();
  const handleLogout = () => {
    logout()
    onClose();
  };

  return (
    <Modal isOpen={open} onClose={onClose} title="Log Out">
      <div style={{ padding: '24px' }}>
        <p style={{ 
          color: '#4B5563', 
          textAlign: 'center', 
          marginBottom: '32px',
          fontSize: '16px'
        }}>
          Are you sure you want to log out?
        </p>
        
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          justifyContent: 'center' 
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 32px',
              backgroundColor: '#4d007d',
              color: 'white',
              borderRadius: '50px',
              border: 'none',
              fontWeight: '500',
              minWidth: '100px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4d007d'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4d007d'}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 32px',
              backgroundColor: 'white',
              color: '#EF4444',
              border: '2px solid #EF4444',
              borderRadius: '50px',
              fontWeight: '500',
              minWidth: '100px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#FEF2F2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
          >
            Logout
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;