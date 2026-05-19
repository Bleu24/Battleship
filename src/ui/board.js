export const createBoard = () => {
  const container = document.createElement("div");
  container.className = "board";

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.x = i;
      cell.dataset.y = j;

      container.appendChild(cell);
    }
  }

  return container;
};
