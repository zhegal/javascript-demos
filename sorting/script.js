const list = document.getElementById("draggable-list");
const addItemBtn = document.getElementById("add-item-btn");

addItemBtn.addEventListener("click", () => {
  const newItemText = prompt("Enter the value for the new item:");
  if (newItemText) {
    const newItem = document.createElement("li");
    newItem.setAttribute("draggable", "true");
    newItem.innerHTML = `<div>${newItemText}</div><div class="move">+</div>`;
    list.appendChild(newItem);
    addDragAndDropHandlers(newItem);
  }
});

const listItems = document.querySelectorAll("#draggable-list li");

listItems.forEach((item) => {
  addDragAndDropHandlers(item);
});

let dragSrcEl = null;

function addDragAndDropHandlers(item) {
  const moveHandle = item.querySelector(".move");

  moveHandle.addEventListener("mousedown", () => {
    item.draggable = true;
  });

  moveHandle.addEventListener("mouseup", () => {
    item.draggable = false;
  });

  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragover", handleDragOver);
  item.addEventListener("dragleave", handleDragLeave);
  item.addEventListener("drop", handleDrop);
  item.addEventListener("dragend", handleDragEnd);
}

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);

  this.classList.add("dragging");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }

  this.classList.add("over");
  e.dataTransfer.dropEffect = "move";

  return false;
}

function handleDragLeave() {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  if (dragSrcEl !== this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");

    addDragAndDropHandlers(dragSrcEl);
    addDragAndDropHandlers(this);
  }

  this.classList.remove("over");
  return false;
}

function handleDragEnd(e) {
  this.classList.remove("dragging");

  listItems.forEach((item) => {
    item.classList.remove("over");
  });
}
