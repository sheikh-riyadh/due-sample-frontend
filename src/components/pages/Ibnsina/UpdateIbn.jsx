import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import SubmitButton from "../../common/SubmitButton";
import Modal from "../../modals/Modal";
import { useUpdateIbnsinatestMutation } from "../../../store/services/ibnsinaApi/ibnsinaApi";
import toast from "react-hot-toast";
import IbnFormBody from "./IbnFormBody";

const UpdateIbn = ({ item }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [updateIbn, { isLoading }] = useUpdateIbnsinatestMutation();

  useEffect(() => {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        if (key === "_id") {
          continue;
        } else {
          setValue(key, item[key]);
        }
      }
    }
  }, [setValue, item]);

  const handleUpdateIbnsinatest = async (data) => {
    const query = {
      id: item?._id,
      data,
    };

    const result = await updateIbn(query);
    if (result?.data?.acknowledged) {
      toast.success("Updated test successfully 😀", { id: "success" });
    } else {
      toast.error("Something went wrong 😥");
    }
  };

  return (
    <>
      <span
        className="text-danger cursor-pointer border border-danger text-center p-2 rounded-full bg-blue-600 duration-300"
        title="Delete"
        onClick={() => setIsFormOpen((prev) => !prev)}
      >
        <FaEdit className="text-white" />
      </span>

      {isFormOpen && (
        <Modal
          title={"Update"}
          className="w-[350px]"
          onClose={setIsFormOpen}
          isOpen={isFormOpen}
        >
          <div>
            <form
              onSubmit={handleSubmit(handleUpdateIbnsinatest)}
              className="flex flex-col gap-5"
            >
              <IbnFormBody register={register} />
              <SubmitButton isLoading={isLoading}>Update</SubmitButton>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

UpdateIbn.propTypes = {
  item: PropTypes.object,
};

export default UpdateIbn;
