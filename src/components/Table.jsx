import React from "react";
import "./Table.css";
import { FiMoreVertical } from "react-icons/fi";
import CustomSelect from "./CustomSelect";
import ActionMenu from "../actionMenu/ActionMenu";

const DynamicTable = ({
  columns,
  data,
  onActionClick,
  onSelectChange,
  onDocumentClick,
  title,
}) => {
  return (
    <div className="table-wrapper">
      {title && (
        <div className="table-header">
          <h2 className="table-title">{title}</h2>
        </div>
      )}
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
                  if (col.type === "doc") {
                    return (
                      <td key={colIndex}>
                        <svg
                          className="doc-icon"
                          style={{ cursor: "pointer" }}
                          width="14"
                          height="18"
                          viewBox="0 0 14 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => {
                            onDocumentClick(row);
                          }}
                        >
                          <path
                            d="M7.83366 1.5H3.16699C2.06242 1.5 1.16699 2.39543 1.16699 3.5V14.5C1.16699 15.6046 2.06242 16.5 3.16699 16.5H10.8337C11.9382 16.5 12.8337 15.6046 12.8337 14.5V6.5M7.83366 1.5L12.8337 6.5M7.83366 1.5V5.5C7.83366 6.05228 8.28137 6.5 8.83366 6.5H12.8337"
                            stroke="#121212"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
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

export default DynamicTable;
