import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cn from "../../utils/cn";
import NotFound from "./NotFound";
const Table = ({ columns, tableData, className }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (tableData) {
      setData(
        tableData?.map((item, index) => {
          return { ...item, key: index };
        })
      );
    }
  }, [tableData]);

  return (
    <div className="overflow-x-auto">
      {data?.length ? (
        <table
          className={cn(`min-w-full bg-widget rounded-lg shadow-md`, className)}
        >
          <thead className="bg-widget">
            <tr>
              <th className="p-4 text-left text-primary">
                <div className="flex items-center justify-between">
                  <span className="whitespace-nowrap">SR No</span>{" "}
                </div>
              </th>
              {columns?.map((column, index) => (
                <th key={index} className="p-4 text-left text-primary">
                  <div className="flex items-center justify-between">
                    <span className="whitespace-nowrap">{column.name}</span>{" "}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={cn(
              `text-primary text-sm font-light bg-widget`,
              className
            )}
          >
            {data?.map((item, index) => (
              <tr key={index} className="">
                <td className="p-4 border-t border-slate-300">{index+1}</td>
                {columns?.map((column, index) => (
                  <td key={index} className="p-4 border-t border-slate-300">
                    {column?.render ? (
                      <column.render item={item} />
                    ) : (
                      <span
                        className="whitespace-nowrap"
                        title={
                          item[column?.dataIndex]?.length > 30
                            ? item[column?.dataIndex]
                            : undefined
                        }
                      >
                        {item[column?.dataIndex]?.length > 30
                          ? item[column?.dataIndex]?.slice(0, 30) + "..."
                          : item[column?.dataIndex]
                          ? item[column?.dataIndex]
                          : "N/A"}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.array,
  columns: PropTypes.array,
  className: PropTypes.string,
};

export default Table;
