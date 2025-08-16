import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import "./leavecalendar.css";

const LeaveCalendar = ({ leaves }) => {
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    if (leaves) {
      console.log(leaves);
      setApprovedLeaves(leaves);
    }
  }, [leaves]);
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  // 🔁 count how many leaves for this day
  const getLeavesCountForDate = (year, month, day) => {
    const dateKey = formatDateKey(year, month, day);
    return approvedLeaves.filter((leave) => leave.date === dateKey).length;
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-cell empty-cell"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // get the number of leaves on this date
      const leaveCount = getLeavesCountForDate(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );

      const isToday = day === 9 && currentDate.getMonth() === 8; // Highlighting 9th like in the image

      days.push(
        <div
          key={day}
          className={`calendar-cell ${leaveCount > 0 ? "cell-with-leave" : ""}`}
        >
          <span className={isToday ? "today-circle" : ""}>{day}</span>
          {leaveCount > 0 && !isToday && (
            <div className="event-indicator">{leaveCount}</div>
          )}
        </div>
      );
    }

    return days;
  };

  const formatLeaveDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <h2 className="header-title">Leave Calendar</h2>
      </div>

      {/* Calendar Navigation */}
      <div className="calendar-section">
        <div className="calendar-navigation">
          <button onClick={() => navigateMonth(-1)} className="nav-button">
            <ChevronLeft className="nav-icon" />
          </button>
          <h3 className="month-title">
            {monthNames[currentDate.getMonth()]}, {currentDate.getFullYear()}
          </h3>
          <button onClick={() => navigateMonth(1)} className="nav-button">
            <ChevronRight className="nav-icon" />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="days-header">
          {daysOfWeek.map((day, index) => (
            <div key={index} className="day-header">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">{renderCalendarDays()}</div>
      </div>

      {/* Approved Leaves Section */}
      <div className="leaves-section">
        <h3 className="leaves-title">Approved Leaves</h3>
        <div className="leaves-list">
          {approvedLeaves
            .filter((leave) => {
              const leaveDate = new Date(leave.date);
              return (
                leaveDate.getMonth() === currentDate.getMonth() &&
                leaveDate.getFullYear() === currentDate.getFullYear()
              );
            })
            .map((leave) => (
              <div key={leave.id} className="leave-item">
                <div className="leave-user">
                  <div className="user-avatar">
                    <User className="avatar-icon" />
                  </div>
                  <div className="user-info">
                    <p className="user-name">{leave.name}</p>
                    <p className="user-title">{leave.title}</p>
                  </div>
                </div>
                <span className="leave-date">
                  {formatLeaveDate(leave.date)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveCalendar;
