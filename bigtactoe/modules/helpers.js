export const toid = (type, { x, y }) => {
  return type + x.toString() + y.toString();
};

export const changeInstruction = (message) => {
  document.getElementById("instruction").innerText = message;
};
