import { useForm } from "react-hook-form";
import SubmitButton from "../../common/SubmitButton";
import { useCreateIbnsinatestMutation } from "../../../store/services/ibnsinaApi/ibnsinaApi";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import IbnFormBody from "./IbnFormBody";

const IbnForm = ({ setIsModalOpen }) => {
  const { register, handleSubmit } = useForm();
  const [createTest, { isLoading }] = useCreateIbnsinatestMutation();

  const handleCreateIbnsinatest = async (data) => {
    const result = await createTest(data);
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
        onSubmit={handleSubmit(handleCreateIbnsinatest)}
        className="flex flex-col gap-5"
      >
        <IbnFormBody register={register} />
        <SubmitButton isLoading={isLoading}>Save</SubmitButton>
      </form>
    </div>
  );
};

IbnForm.propTypes = {
  setIsModalOpen: PropTypes.func,
};

export default IbnForm;
