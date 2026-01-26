import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../../modals/DeleteModal";
import { useDeleteIbnsinatestMutation } from "../../../store/services/ibnsinaApi/ibnsinaApi";
import PropTypes from "prop-types";

const DeleteIbn = ({ deleteId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIbnsina, { isLoading }] = useDeleteIbnsinatestMutation();

  return (
    <>
      <span
        className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full bg-rose-500 duration-300"
        title="Delete"
        onClick={()=>setIsModalOpen(prev=>!prev)}
      >
        <FaTrash className="text-white" />
      </span>

      {isModalOpen && (
        <DeleteModal
          deleteId={deleteId}
          handleDeleteFunction={deleteIbnsina}
          isLoading={isLoading}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          key={"delete"}
        />
      )}
    </>
  );
};

DeleteIbn.propTypes = {
  deleteId: PropTypes.string,
};

export default DeleteIbn;
