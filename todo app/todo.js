// document.querySelector('button').addEventListener("click", function(event) {
//     event.preventDefault();

//     // Get input value
//     let ta = document.getElementById("fname").value;
//     if(ta=="")
//     {
//         alert("task cannot be null")
//     }
//     // Create list item and set text
//     else{
//     let l = document.createElement('li');
//     l.textContent = ta;

//     // Create remove button and style it
//     let bt = document.createElement('button');
//     bt.innerHTML = "remove";
//     // Append button to list item
//     l.appendChild(bt);

//     // Append list item to ul
//     let hold = document.querySelector('ul');
//     hold.appendChild(l);

//     }
// });

// document.querySelector('ul').addEventListener("click", function(event) {
//     event.preventDefault();
//     let hold = document.getElementById("tasks");
//     let ele = event.target.parentElement;
//     let el = event.target;

//     if (event.target.matches('button')) {
//         // Remove the list item
//         hold.removeChild(ele);
//     } else if (event.target.matches('li')) {
//         // Strikethrough list item text
//         el.style.textDecoration = el.style.textDecoration === "line-through" ? "none" : "line-through";
//         console.log(el.innerText);
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("fname");
  const addbt = document.getElementById("ab");
  const todolist = document.getElementById("tasks");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => rendertasks(task));
  addbt.addEventListener("click", () => {
    let te = todoInput.value.trim();
    if (te == "") return;
    let ta = { id: Date.now(), text: te, completed: false };
    tasks.push(ta);
    savetasks();
    rendertasks(ta);
    todoInput.value = "";
  });

  todolist.addEventListener("click", (event) => {
    const target = event.target;
    const listItem = target.closest("li");

    if (!listItem) return;

    const taskId = parseInt(listItem.getAttribute("list-id"));

    // Remove button click handling
    if (target.matches("button")) {
      tasks = tasks.filter((task) => task.id !== taskId);
      listItem.remove();
      savetasks();
    }
    // List item click handling (toggling completed state)
    else if (target.matches("li")) {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        task.completed = !task.completed;
        listItem.classList.toggle("completed");
        savetasks();
      }
    }
  });

  function rendertasks(task) {
    let l = document.createElement("li");
    l.textContent = task.text;

    // Create remove button and style it
    let bt = document.createElement("button");
    bt.innerHTML = "remove";
    // Append button to list item
    l.appendChild(bt);
    l.setAttribute("list-id", task.id);
    if (task.completed) l.classList.add("completed");
    // Append list item to ul
    todolist.appendChild(l);
  }
  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
