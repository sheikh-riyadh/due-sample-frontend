import PropTypes from "prop-types";
import Input from "../../common/Input";
import Select from "../../common/Select";

const PoFormBody = ({ register }) => {
  const classes = "";
  return (
    <>
      <Input
        {...register("ptName")}
        required
        placeholder="Name"
        className={classes}
      />
      <Input
        {...register("invoice")}
        maxlength="9"
        required
        placeholder="Invoice"
        className={classes}
      />
      <Input {...register("uhid")} placeholder="UHID" className={classes} />
      <Input
        {...register("test")}
        required
        placeholder="Test Name"
        className={classes}
      />
      <div className="grid grid-cols-2 gap-5">
        <Input
          {...register("sendingDate")}
          required
          type="date"
          className={classes}
          title="Sending date"
        />
        <Input
          {...register("time")}
          required
          type="time"
          className={classes}
          title="time"
        />
      </div>

      <Select
        {...register("status")}
        defaultValue="default"
        options={["default", "printed", "cancelled"]}
      />
    </>
  );
};

PoFormBody.propTypes = {
  register: PropTypes.func,
};
export default PoFormBody;
