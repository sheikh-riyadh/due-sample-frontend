import { useState } from "react";
import Table from "../../common/Table";
import Pagination from "../../common/Pagination";
import PropTypes from "prop-types";
import { useGetPopulartestQuery } from "../../../store/services/popularApi/popularApi";
import UpdatePopular from "./UpdatePopular";
import DeletePopular from "./DeletePopular";
import Spinner from "../../common/Spinner";
import CountDown from "./Countdown";

const PopularTable = ({ search }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const query = new URLSearchParams({
    search,
    limit,
    page: currentPage,
  }).toString();

  const { data, isLoading } = useGetPopulartestQuery(query);

  const pages = Math.ceil(Math.abs(data?.total ?? 0) / parseInt(limit));

  return (
    <div className="rounded-md shadow-md">
      {!isLoading ? (
        <div>
          <Table
            className="font-normal"
            tableData={data?.data}
            columns={[
              {
                name: "Invoice",
                dataIndex: "invoice",
                key: "invoice",
              },
              {
                name: "Test Name",
                dataIndex: "test",
                key: "test",
              },
              {
                name: "Status",
                render: ({ item }) => {
                  return (
                    <span
                      className={`capitalize ${
                        item?.status == "Collected"
                          ? "bg-green-500 px-5 rounded-full py-1 font-medium"
                          : "bg-amber-200 px-5 rounded-full py-1 font-medium text-black"
                            
                      }`}
                    >
                      {item?.status}
                    </span>
                  );
                },
              },
              {
                name: "Remaining time",
                render: ({ item }) => {
                  return <CountDown data={item} />;
                },
              },
              {
                name: "Collected By",
                render: ({ item }) => {
                  return <CountDown data={item} />;
                },
              },

              {
                name: "Actions",
                render: ({ item }) => {
                  return (
                    <div className="flex items-center gap-2">
                      <UpdatePopular item={item} />
                      <DeletePopular deleteId={item?._id} />
                    </div>
                  );
                },
              },
            ]}
          />

          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setLimit={setLimit}
            pages={pages}
            key={"popular"}
          />
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};
PopularTable.propTypes = {
  search: PropTypes.string,
};
export default PopularTable;
