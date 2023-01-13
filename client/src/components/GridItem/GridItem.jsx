import "./GridItem.css"
import { useSelector } from "react-redux";
import O from "../O/O";
import X from "../X/X";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


const GridItem = ({
  position,
  myTurn,
  boardPositions,
  tempBoardPositions,
  setTempBoardPositions,
  isGameOn,
}) => {
  const { loading } = useSelector((state) => state.GameReducer);
  const XIcon = () => <X width={16.2} height={72.89} dimension={105} />;
  const OIcon = () => <O />;

  const getIcon = (position) => {
    const icon = loading
      ? boardPositions[position]
      : tempBoardPositions[position];
    switch (icon) {
      case 0:
        return <XIcon />;
      case 1:
        return <OIcon />;
      default:
        return "";
    }
  };

  const placeIcon = (position) => {
    if (!myTurn || tempBoardPositions[position] !== 2 || isGameOn === false)
      return;
    // to undo previous unsaved changed
    setTempBoardPositions(boardPositions);
    //place icon on temp board
    setTempBoardPositions((prev) => {
      let arr = new Array(...prev);
      arr[position] = 0;
      return arr;
    });
  };

  return (
    <div
      className={`grid-item ${loading ? "loading" : ""}`}
      onClick={() => placeIcon(position)}
    >
      {loading ? <LoadingSpinner width="18px" height="18px"/> : getIcon(position)}
    </div>
  );
};

export default GridItem;
