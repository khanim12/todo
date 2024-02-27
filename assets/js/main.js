let form = document.querySelector(".todo_form"),
  input = document.querySelector(".add-input"),
  todoList = document.querySelector(".todo-list"),
  todoArr = JSON.parse(localStorage.getItem("item")) || [];
let todoId;
if (localStorage.getItem("item") && todoArr.length > 0) {
  todoId = todoArr[todoArr.length - 1].id + 1;
} else {
  todoId = 0;
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  if (input.value != "") {
    todoArr.push({ id: todoId++, desc: input.value, checked: false });
    localStorage.setItem("item", JSON.stringify(todoArr));
    todoList.innerHTML += `
        <li class="list-item ${
          todoArr[todoArr.length - 1].checked ? "checked" : ""
        } "  data-id=${todoArr[todoArr.length - 1].id}>
        <div>
            <span class="checked-item"><i class="fa-solid fa-check"></i></span>
            <span class="item-description">${
              todoArr[todoArr.length - 1].desc
            }</span>
        </div>
        <span class="remove-item" data-id=${
          todoArr[todoArr.length - 1].id
        }><i class="fa-solid fa-xmark"></i></span>
    </li>
        `;
    input.value = "";
  }
  checked();
  removeTodo();
});
if (localStorage.getItem("item")) {
  todoArr.forEach((elem) => {
    todoList.innerHTML += `
        <li class="list-item  ${elem.checked ? "checked" : ""}" data-id =${
      elem.id
    }>
        <div>
            <span class="checked-item"><i class="fa-solid fa-check"></i></span>
            <span class="item-description">${elem.desc}
            </span>
        </div>
        <span class="remove-item" data-id=${
          elem.id
        }><i class="fa-solid fa-xmark"></i></span>
    </li>

        `;
  });
  checked();
  removeTodo();
}

function checked() {
  let checkedItem = document.querySelectorAll(".list-item");
  checkedItem.forEach((e) => {
    e.addEventListener("click", function () {
      todoArr = JSON.parse(localStorage.getItem("item"));
      let findId = e.getAttribute("data-id");
      console.log(findId);
      let todoIndex = todoArr.indexOf(
        todoArr.find((a) => a.id === parseInt(findId))
      );
      let findTodo = todoArr[todoIndex];
      findTodo.checked = !findTodo.checked;
      localStorage.setItem("item", JSON.stringify(todoArr));
      e.classList.toggle("checked");
    });
  });
}
function removeTodo() {
  let removeItem = document.querySelectorAll(".remove-item");
  removeItem.forEach((item) => {
    item.addEventListener("click", function (e) {
      let findId = item.getAttribute("data-id");
      todoArr = JSON.parse(localStorage.getItem("item"));
      let todoIndex = todoArr.indexOf(
        todoArr.find((t) => t.id === parseInt(findId))
      );
      todoArr.splice(todoIndex, 1);
      item.parentElement.remove();
      localStorage.setItem("item", JSON.stringify(todoArr));
      e.stopPropagation();
    });
  });
}
let modeIcon = document.querySelector('.mode-icon')
modeIcon.addEventListener('click',function(){
   let mode= localStorage.getItem('mode')
    if (mode === 'true') {
        localStorage.setItem('mode', false)
        modeIcon.innerHTML = ` <i class="fa-solid fa-moon"></i>`

    }
    else {
        localStorage.setItem('mode', true)
        modeIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`

    }
    document.body.classList.toggle('darkmode')
    

})
if (localStorage.getItem('mode') === 'true') {
    document.body.classList.add('darkmode')
    modeIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`
}


