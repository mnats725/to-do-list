let allTasks = JSON.parse(localStorage.getItem("tasks")) || []; // то где мы храним таски

let input = ""; // глобальное пустое значение
let valueInput = ""; // глобальное пустое значение
let renameValue = ""; // глобальное пустое значение

window.onload = function init() {
  input = document.getElementById("text_input");
  input.addEventListener("change", updateValue);
  render();
  // localStorage.setItem("tasks", JSON.stringify(allTasks));
};

onClickButton = () => {
  //при нажатии на кнопку
  if (valueInput !== "" && valueInput !== " ") {
    allTasks.push({
      text: valueInput, //значение каких обьектов будет пушиться в массив
      isCheck: false,
      isEdit: false,
    });
  }
  localStorage.setItem("tasks", JSON.stringify(allTasks));
  valueInput = ""; //обнуление глобальных переменных
  input.value = ""; //обнуление глобальных переменных
  render(); // функция отображения всех элементов
};

updateValue = (event) => {
  valueInput = event.target.value; //
  renameValue = event.target.value;
};

//функция которая отрисовывает массив alltasks
render = () => {
  const content = document.getElementById("tasks_list"); // присваеиваем content наш блок с айди task-list
  while (content.firstChild) {
    //удаление первых дочерних элементов
    content.removeChild(content.firstChild); // до момента пока не остаётся не один дочерний элемент
  }

  allTasks.sort((a, b) =>
    a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0
  );

  allTasks.map((item, index) => {
    const container = document.createElement("div"); //создаём контейнер для нашего task

    const editForm = document.createElement("input"); //создаём инпут при изменении нашего значения isEdit
    editForm.value = item.text; //исходное значение нашего editForm
    editForm.addEventListener("change", updateValue); //слушатель на изменение

    container.id = `task=${index}`; //интедификатор нашего контейнера
    const checkbox = document.createElement("input"); //инпут типа чекбокс
    const text = document.createElement("p"); // создаём текст для наших тасок

    text.className = item.isCheck ? "text-task done-text" : "text-task"; //если его задача выполнена мы добавляем стиль, а иначе нет
    container.className = "task-container"; //создаём класс для нашего контейнера

    text.innerText = item.text; //добавляем название нашей задачи
    checkbox.type = "checkbox"; // тип инпута
    checkbox.checked = item.isCheck; // дефолтное свойство нашего чекбокса(false)

    const imageEdit = document.createElement("img"); //создаём элемент с тега img
    imageEdit.src = "img/edit.svg";
    imageEdit.onclick = () => {
      onEdit(index);
    };

    const imageRename = document.createElement("img"); //создаём элемент с тега img
    imageRename.src = "img/done.svg";
    imageRename.onclick = () => {
      onRename(index);
    };

    const imageDelete = document.createElement("img"); //создаём элемени с тега img
    imageDelete.src = "img/delete.svg";
    imageDelete.onclick = () => {
      onDelete(index);
    };

    content.appendChild(container); // добавляем контейнер, в наш блок "task-list"
    container.appendChild(checkbox); // добавляем наш созданный инпут типа "чекбокс", в наш контейнер
    container.appendChild(text); // добавляем наш текст в контейнер
    container.appendChild(imageEdit); // добавляем к контейнеру наш imageEdit
    container.appendChild(imageDelete); // добавляем к контейнеру наш imageDelete

    // изменение внешнего вида в зависимости от значения isEdit
    if (allTasks[index].isEdit) {
      container.appendChild(editForm);
      container.removeChild(checkbox);
      container.removeChild(text);
      container.appendChild(imageRename);
    }

    content.appendChild(container);

    checkbox.onchange = function () {
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
