export const changeInstruction = (message) => {
  document.getElementById("instruction").innerHTML = message;
};

export const toNodeId = ({x, y}) => "node" + x.toString() + y.toString();

export const toSquareId = ({xsmall, ysmall}) => "square" + xsmall.toString() + ysmall.toString();