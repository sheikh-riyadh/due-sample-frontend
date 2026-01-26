import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import { useCreatePopulartestMutation } from "../../../store/services/popularApi/popularApi";
import SubmitButton from "../../common/SubmitButton";
import PoFormBody from "./PoFormBody";

const PopularForm = ({ setIsModalOpen }) => {
  const [createPopularTest, { isLoading }] = useCreatePopulartestMutation();
  const { register, handleSubmit } = useForm();

  const handleCreatePopular = async (data) => {
    const result = await createPopularTest(data);
    if (result?.data?.acknowledged) {
      toast.success("Test added successfully", { id: "success" });
      setIsModalOpen(false);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleCreatePopular)}
        className="flex flex-col gap-5"
      >
        <PoFormBody register={register} />
        <SubmitButton isLoading={isLoading}>Save</SubmitButton>
      </form>
    </div>
  );
};

PopularForm.propTypes = {
  setIsModalOpen: PropTypes.func,
};

export default PopularForm;
