import { useState } from "react";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";
import Table from "../../common/Table";
import Pagination from "../../common/Pagination";
import { useGetPopulartestQuery } from "../../../store/services/popularApi/popularApi";
import UpdatePopular from "./UpdatePopular";
import DeletePopular from "./DeletePopular";
import Spinner from "../../common/Spinner";
import CountDown from "./Countdown";
import ViewDetails from "./ViewDetails";

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
            className="font-bold"
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
                          ? "bg-green-500 px-5 rounded-full py-1"
                          : "bg-[#F2A65A] px-5 rounded-full py-1 text-white"
                      }`}
                    >
                      {item?.status}
                    </span>
                  );
                },
              },
              {
                name: "Drug Status",
                render: ({ item }) => {
                  return <span>{item?.drug}</span>;
                },
              },
              {
                name: "",
                render: ({ item }) => {
                  return <CountDown data={item} />;
                },
              },
              {
                name: "Collected By",
                render: ({ item }) => {
                  return (
                    <div className="flex items-center">
                      <FaUser className="border text-xl rounded-full z-30" />
                      <FaUser className="border text-xl rounded-full -ml-2" />
                    </div>
                  );
                },
              },

              {
                name: "Actions",
                render: ({ item }) => {
                  return (
                    <div className="flex items-center gap-2">
                      <ViewDetails item={item} />
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
