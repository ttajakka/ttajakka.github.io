export const createBoard = (box) => {
  const maintable = document.createElement("table");
  maintable.id = "maintable";
  box.appendChild(maintable);

  for (let i = 0; i < 3; i++) {
    const maintr = document.createElement("tr");
    maintable.appendChild(maintr);
    for (let j = 0; j < 3; j++) {
      const maintd = document.createElement("td");
      maintd.classList.add("maintd");
      maintd.id = "maintd" + i.toString() + j.toString();
      maintr.appendChild(maintd);

      const bg = document.createElement("div");
      maintd.appendChild(bg);
      bg.classList.add("bg");
      bg.id = "bg" + i.toString() + j.toString();

      const square = document.createElement("div");
      square.classList.add("square");
      maintd.appendChild(square);

      const tdborder = document.createElement("div");
      tdborder.classList.add("tdborder");
      maintd.appendChild(tdborder);

      const table = document.createElement("table");
      table.classList.add("table");
      square.appendChild(table);

      for (let k = 0; k < 3; k++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (let l = 0; l < 3; l++) {
          const td = document.createElement("td");
          td.classList.add("td");
          if (k === 0) {
            td.classList.add("td-top");
          } else if (k === 2) {
            td.classList.add("td-bottom");
          }
          if (l === 0) {
            td.classList.add("td-left");
          } else if (l === 2) {
            td.classList.add("td-right");
          }
          td.id = "td" + (3 * i + k).toString() + (3 * j + l).toString();
          tr.appendChild(td);

          const tddiv = document.createElement("div");
          tddiv.classList.add("tddiv");
          tddiv.id = "tddiv" + (3 * i + k).toString() + (3 * j + l).toString();
          td.appendChild(tddiv);

          const tdbg = document.createElement("div");
          tdbg.classList.add("tdbg");
          tdbg.id = "tdbg" + (3 * i + k).toString() + (3 * j + l).toString();
          td.appendChild(tdbg);
        }
      }
    }
  }

  const overlaytable = document.createElement("table");
  overlaytable.classList.add("overlaytable");
  box.appendChild(overlaytable);

  for (let i = 0; i < 3; i++) {
    const oltr = document.createElement("tr");
    overlaytable.appendChild(oltr);
    for (let j = 0; j < 3; j++) {
      const oltd = document.createElement("td");
      oltd.classList.add("oltd");
      oltd.id = "oltd" + i.toString() + j.toString();
      oltr.appendChild(oltd);
    }
  }
};
