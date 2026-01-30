import PropTypes from "prop-types";
import Input from "../../common/Input";
import Select from "../../common/Select";

const PoFormBody = ({ register }) => {
  const classes = "";
  return (
    <>
      <Input
        {...register("invoice")}
        maxLength="9"
        required
        placeholder="Invoice"
        className={classes}
      />
      <Input
        {...register("test")}
        required
        placeholder="Test Name"
        className={classes}
      />
      <div className="flex flex-col gap-2">
        <span className="text-primary">Due Time</span>
        <div className="grid grid-cols-2 gap-3">
          <Input
            {...register("collectedDate")}
            required
            type="date"
            className={classes}
            title="Due date"
          />
          <Input
            {...register("collectedTime")}
            required
            type="time"
            className={classes}
            title="Due time"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-primary">Collected Time</span>
        <div className="grid grid-cols-2 gap-3">
          <Input
            {...register("nextCollectionDate")}
            required
            type="date"
            className={classes}
            title="Collection date"
          />
          <Input
            {...register("nextCollectionTime")}
            required
            type="time"
            className={classes}
            title="Collection time"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 items-center">
        <Select
          {...register("drug")}
          defaultValue="No"
          options={["No", "Yes"]}
          label="Any diabetic drug?"
        />

        <Select
          {...register("status")}
          defaultValue="Due"
          options={["Due", "Collected"]}
          label="Sample Status"
        />
      </div>

      <Input
        {...register("phlebotomist_id")}
        required
        placeholder="phlebotomist code"
        className={classes}
      />
    </>
  );
};

PoFormBody.propTypes = {
  register: PropTypes.func,
};
export default PoFormBody;
