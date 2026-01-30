import { useState } from "react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Modal from "../components/modals/Modal";
import { useSearchDelay } from "../hooks/useSearchDelay";
import PopularTable from "../components/pages/Popular/PopularTable";
import PopularForm from "../components/pages/Popular/PopularForm";

const Popular = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleChange, searchValue } = useSearchDelay();

  return (
    <div>
      <div className="p-5 flex flex-col gap-5">
        <div className="grid xl:grid-cols-2">
          <div className="flex items-center xl:flex-nowrap flex-wrap gap-10">
            <span className="font-bold text-xl text-primary uppercase">{`records`}</span>
            <div className="flex items-center justify-center xl:flex-nowrap flex-wrap gap-5 font-bold">
              <span className="bg-card text-primary px-5 py-1 rounded-full cursor-pointer">
                Due
              </span>
              <span className="bg-card text-primary px-5 py-1 rounded-full cursor-pointer">
                Collected
              </span>
              <Input
                type="date"
                title="Due date"
                className={"bg-card py-1 rounded-full"}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 justify-end mt-5 xl:mt-0">
            <Input
              maxLength="9"
              placeholder="Search..."
              className="bg-card"
              onChange={handleChange}
            />
            <Button
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="w-36"
            >
              Add test
            </Button>
          </div>
        </div>
        <div className="bg-card border border-border-primary rounded-sm overflow-hidden">
          <PopularTable search={searchValue} />
        </div>
      </div>
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
    </div>
  );
};

export default Popular;
