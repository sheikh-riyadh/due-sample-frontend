import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../../modals/DeleteModal";
import PropTypes from "prop-types";
import { useDeletePopulartestMutation } from "../../../store/services/popularApi/popularApi";

const DeletePopular = ({ deleteId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePopularTest, { isLoading }] = useDeletePopulartestMutation();
  return (
    <>
      <span
        className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full bg-rose-500 duration-300"
        title="Delete"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <FaTrash className="text-white" />
      </span>

      {isModalOpen && (
        <DeleteModal
          deleteId={deleteId}
          handleDeleteFunction={deletePopularTest}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          key={"delete"}
        />
      )}
    </>
  );
};

DeletePopular.propTypes = {
  deleteId: PropTypes.string,
};

export default DeletePopular;
