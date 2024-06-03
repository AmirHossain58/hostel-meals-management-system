import PropTypes from "prop-types";
import Button from "../Shared/Button/Button";

const MealsRequest = ({ meal }) => {
  return (
    <div className="rounded-xl border-[1px] border-neutral-200 overflow-hidden bg-white">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {meal?.price}</div>
        <div className="font-light text-neutral-600"></div>
      </div>
      <hr />
      <div className="flex justify-center">{/* Calender */}</div>
      <hr />
      <div className="p-4">
        <Button label={"Request"} />
      </div>
      <hr />
      <div className="p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>${meal?.price}</div>
      </div>
    </div>
  );
};

MealsRequest.propTypes = {
  meal: PropTypes.object,
};

export default MealsRequest;
