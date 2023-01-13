import O from "../O/O";
import X from "../X/X";

const GridItem = ({position, myTurn, boardPositions, tempBoardPositions, setTempBoardPositions, isGameOn})=>{
    const XIcon = () =>  <X width={16.2} height={72.89} dimension={105} />;
    const OIcon = () => <O />;
      
    const getIcon = (position) => {
      switch (tempBoardPositions[position]) {
        case 0:
          return <XIcon />;
        case 1:
          return <OIcon />;
        default:
          return "";
      }
    };

    const placeIcon = (position) => {
      if (!myTurn || tempBoardPositions[position] !== 2 || isGameOn === false) return;
      // to undo previous unsaved changed
      setTempBoardPositions(new Array(...boardPositions));
      //place icon on temp board
      setTempBoardPositions((prev) => {
        let arr = new Array(...prev);
        arr[position] = 0;
        return arr;
      });
    };

    return (
      <div className="grid-item" onClick={() => placeIcon(position)}>
        {getIcon(position)}
      </div>
    )
  };

  export default GridItem