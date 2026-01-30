import PropTypes from "prop-types";
import { useState } from "react";
import { FaBinoculars } from "react-icons/fa";
import Modal from "../../modals/Modal";
import moment from "moment";
import CountDown from "./Countdown";

const ViewDetails = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <span
        className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full bg-blue-600 duration-300"
        title="Delete"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <FaBinoculars className="text-white" />
      </span>
      {isModalOpen && (
        <Modal
          title={"Overview"}
          className="w-[350px] xl:w-[500px]"
          onClose={setIsModalOpen}
          isOpen={isModalOpen}
        >
          <div className="flex flex-col gap-5">
            <div className="bg-background p-3 rounded-md flex flex-col gap-2">
              <span
                className={`px-5 rounded-md -mt-6 ${item?.status == "Due" ? "bg-[#F2A65A] w-20 text-xl" : "bg-green-500 w-32 text-xl"}`}
              >
                {item?.status}
              </span>
              <p className="text-2xl">Invoice: {item?.invoice} </p>

              {item.status == "Collected" ? (
                <>
                  <div className="flex items-center gap-2">
                    <span>
                      Fasting collected:{" "}
                      {moment(item?.collectedDate).format("ll")}
                    </span>
                    <span>
                      {moment(item?.collectedTime, "HH:mm").format("hh:mm A")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      2Hours collected:{" "}
                      {moment(item?.collectedDate).format("ll")}
                    </span>
                    <span>
                      {moment(item?.collectedTime, "HH:mm").format("hh:mm A")}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2">
                      <span>
                        Fasting collected:{" "}
                        {moment(item?.collectedDate).format("ll")}
                      </span>
                      <span>
                        {moment(item?.collectedTime, "HH:mm").format("hh:mm A")}
                      </span>
                    </div>
                    <div>
                      <CountDown data={item} />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="bg-background p-3 rounded-md flex items-center gap-3">
              <span>Test: {item?.test}</span>
              <span>Drug: {item?.drug}</span>
              <span>Collected: {item?.drug}</span>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

ViewDetails.propTypes = {
  item: PropTypes.object,
};

export default ViewDetails;
