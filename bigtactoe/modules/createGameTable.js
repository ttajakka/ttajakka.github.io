export const createGameTable = (gamebox) => {
  const table = document.createElement("table");
  gamebox.appendChild(table);
  table.id = "bigtable";

  for (let i = 0; i < 3; i++) {
    const bigrow = document.createElement("tr");
    bigrow.classList.add("bigrow");
    table.appendChild(bigrow);

    for (let j = 0; j < 3; j++) {
      const squarebox = document.createElement("td");
      squarebox.classList.add("squarebox");
      squarebox.id = "square" + i.toString() + j.toString();
      bigrow.appendChild(squarebox);

      const square = document.createElement("table");
      
      square.classList.add("square");
      squarebox.appendChild(square);

      for (let k = 0; k < 3; k++) {
        const row = document.createElement("tr");
        row.classList.add("row");
        square.appendChild(row);

        for (let l = 0; l < 3; l++) {
          const node = document.createElement("td");
          node.id = "node" + (3 * i + k).toString() + (3 * j + l).toString();
          node.classList.add("node");

          node.classList.add((3 * i + 3 * j + k + l) % 2 ? "odd" : "even");

          row.appendChild(node);
        }
      }
    }
  }
};
