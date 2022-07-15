let allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

let input = "";
let valueInput = "";
let renameValue = "";

window.onload = function init() {
  input = document.getElementById("text_input");
  input.addEventListener("change", updateValue);
  render();
};

onClickButton = () => {
  if (valueInput !== "" && valueInput !== " ") {
    allTasks.push({
      text: valueInput,
      isCheck: false,
      isEdit: false,
    });
  }
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  valueInput = "";
  input.value = "";
  render();
};

updateValue = (event) => {
  valueInput = event.target.value;
  renameValue = event.target.value;
};

render = () => {
  const content = document.getElementById("tasks_list");
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allTasks.sort((a, b) => a.isCheck - b.isCheck);

  allTasks.map((item, index) => {
    const container = document.createElement("div");

    const editForm = document.createElement("input");
    editForm.value = item.text;
    editForm.addEventListener("change", updateValue);

    container.id = `task=${index}`;
    const checkbox = document.createElement("input");
    const text = document.createElement("p");

    text.className = item.isCheck ? "text-task done-text" : "text-task";
    container.className = "task-container";

    text.innerText = item.text;
    checkbox.type = "checkbox";
    checkbox.checked = item.isCheck;

    const imageEdit = document.createElement("img");
    imageEdit.src = "img/edit.svg";
    imageEdit.onclick = () => {
      onEdit(index);
    };

    const imageRename = document.createElement("img");
    imageRename.src = "img/done.svg";
    imageRename.onclick = () => {
      onRename(index);
    };

    const imageDelete = document.createElement("img");
    imageDelete.src = "img/delete.svg";
    imageDelete.onclick = () => {
      onDelete(index);
    };

    content.appendChild(container);
    container.appendChild(checkbox);
    container.appendChild(text);
    container.appendChild(imageEdit);
    container.appendChild(imageDelete);

    if (allTasks[index].isEdit) {
      container.appendChild(editForm);
      container.removeChild(checkbox);
      container.removeChild(text);
      container.appendChild(imageRename);
    }

    content.appendChild(container);

    checkbox.onchange = () => {
      onChangeCheckBox(index);
    };
  });
};

onEdit = (index) => {
  allTasks[index].isEdit = !allTasks[index].isEdit;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

onRename = (index) => {
  if (valueInput !== "" && valueInput !== " ") {
    allTasks[index].text = renameValue;
    allTasks[index].isEdit = !allTasks[index].isEdit;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    render();
  }
};

onDelete = (index) => {
  delete allTasks[index];
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};

onChangeCheckBox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  render();
};
