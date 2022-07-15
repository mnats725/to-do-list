let allTasks = [];
let input = "";
let valueInput = "";
let renameValue = "";
let editOpened = false;

window.onload = async function init() {
  input = document.getElementById("text_input");
  input.addEventListener("change", updateValue);
  const resp = await fetch("http://localhost:8000/allTasks", {
    method: "GET",
  });
  let result = await resp.json();
  allTasks = result.data;

  render();
};

onClickButton = async () => {
  if (valueInput !== "" && valueInput !== " ") {
    const resp = await fetch("http://localhost:8000/createTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        text: valueInput,
        isCheck: false,
      }),
    });
    const result = await resp.json();
    allTasks = result.data;
  }
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
    imageEdit.onclick = () => onEdit(index);

    const imageRename = document.createElement("img");
    imageRename.src = "img/done.svg";
    imageRename.onclick = () => onRename(index);

    const imageDelete = document.createElement("img");
    imageDelete.src = "img/delete.svg";
    imageDelete.onclick = () => onDelete(index);

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
  allTasks.forEach((elem) => {
    if (!editOpened) {
      allTasks[index].isEdit = true;
      renameValue = renameValue.value;
      editOpened = true;
      render();
    }
    if (elem.isEdit) return 0;
  });
};

onRename = async (index) => {
  if (valueInput !== "" && valueInput !== " ") {
    const resp = await fetch(
      `http://localhost:8000/updateTask?id=${allTasks[index].id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          id: allTasks[index].id,
          text: renameValue,
          isCheck: allTasks[index].isCheck,
        }),
      }
    );
    editOpened = false;
    const result = await resp.json();
    allTasks = result.data;
    render();
  }
};

onDelete = async (index) => {
  const resp = await fetch(
    `http://localhost:8000/deleteTask?id=${allTasks[index].id}`,
    {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  const result = await resp.json();
  allTasks = result.data;

  render();
};

onChangeCheckBox = async (index) => {
  const resp = await fetch(
    `http://localhost:8000/updateTask?id=${allTasks[index].id}`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: allTasks[index].id,
        isCheck: !allTasks[index].isCheck,
      }),
    }
  );
  const result = await resp.json();
  allTasks = result.data;
  render();
};
