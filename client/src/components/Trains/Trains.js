import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTrains } from "../../actions/trains";
import TrainItem from "./TrainItem";

const Trains = () => {
  const trains = useSelector((state) => state.trains);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getTrains());
  }, [dispatch]);

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const filt_trains = trains.filter((train) => {
    if (search !== "") {
      return String(train.name)
        .toLowerCase()
        .includes(String(search).toLowerCase());
    } else {
      return true;
    }
  });

  return (
    <div>
      <input onChange={onChangeSearch} type="text" />
      {filt_trains.map((train) => {
        return <TrainItem key={train._id} train={train} />;
      })}
    </div>
  );
};

export default Trains;