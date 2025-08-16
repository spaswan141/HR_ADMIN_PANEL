import React from "react";
import "./LeaveTable.css";
import { FiMoreVertical } from "react-icons/fi";
import CustomSelect from "../customSelect/CustomSelect";
import ActionMenu from "../actionMenu/ActionMenu";

const LeaveTable = ({ columns, data, onActionClick, onSelectChange, title = "Applied Leaves" }) => {
  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h2 className="table-title">{title}</h2>
      </div>
      <table className="candidate-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => {
                  const cellValue = row[col.accessor];

                  if (col.type === "select") {
                    return (
                      <td key={colIndex}>
                        <CustomSelect
                          value={cellValue}
                          options={col.options}
                          condition={cellValue}
                          onChange={(newVal) =>
                            onSelectChange?.(
                              rowIndex,
                              col.accessor,
                              newVal,
                              row._id
                            )
                          }
                        />
                      </td>
                    );
                  }

                  if (col.type === "image") {
                    return (
                      <td key={colIndex}>
                        <img
                          src={cellValue}
                          alt="profile"
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </td>
                    );
                  }

                  if (col.type === "action") {
                    return (
                      <td key={colIndex}>
                        <ActionMenu
                          actions={col.actions || []}
                          onActionClick={(action) =>
                            onActionClick?.(rowIndex, col.accessor, action)
                          }
                        />
                      </td>
                    );
                  }

                  return <td key={colIndex}>{cellValue}</td>;
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "20px" }}
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveTable;