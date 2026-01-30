import { useState } from "react";
import Button from "../../common/Button";
import Modal from "../../modals/Modal";
import PopularForm from "./PopularForm";

const AddTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen((prev) => !prev)} className="w-36">
        Add test
      </Button>

      {isModalOpen && (
        <Modal
          title={"Add Test"}
          className="w-[350px]"
          onClose={setIsModalOpen}
          isOpen={isModalOpen}
        >
          <PopularForm setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}
    </>
  );
};

export default AddTest;
