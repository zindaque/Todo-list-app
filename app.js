// selectors
const todoInput=document.querySelector(".todo-input");
const todoButton=document.querySelector(".todo-button");
const todoList=document.querySelector(".todo-list");
const filterOption=document.querySelector(".todo-filter");

// eventlisteners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click",filterTodo);
// functions

function addTodo(event){
    event.preventDefault();
// creat new div
    const todoDiv=document.createElement("div");
    todoDiv.classList.add("todo");
// create li
    const newTodo=document.createElement("li");
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // save to localstorage
    saveLocalTodos(todoInput.value);
// created a checkbtn
    const completedButton=document.createElement('button');
    completedButton.innerHTML='<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);
// created trash btn
    const trashButton=document.createElement('button');
    trashButton.innerHTML='<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
// appent the newdiv to the ul
    todoList.appendChild(todoDiv);

    todoInput.value='';

}


function deleteCheck(e){
    const item=e.target;
    if(item.classList[0]==="trash-btn"){
        const todo=item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
        
    }
    if(item.classList[0]==="completed-btn"){
        const todo=item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos= todoList.childNodes;
    todos.forEach(function(todo){
      switch(e.target.value){
        case "all":
            todo.style.display='flex';
            break;
        case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display='flex';
            }else{
                todo.style.display='none';
            }
            break;
        case "uncomplete":
            if(!todo.classList.contains("completed")){
                todo.style.display='flex';
            }else{
                todo.style.display='none';
            }
            break;
      }
    })
        
}

function saveLocalTodos(todo){
    // chech wheather it already contain the file
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));

}

function getTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
   
    todos.forEach(function(todo){
            // / creat new div
        const todoDiv=document.createElement("div");
        todoDiv.classList.add("todo");
    // create li
        const newTodo=document.createElement("li");
        newTodo.innerText=todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        
    // created a checkbtn
        const completedButton=document.createElement('button');
        completedButton.innerHTML='<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
    // created trash btn
        const trashButton=document.createElement('button');
        trashButton.innerHTML='<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
    // appent the newdiv to the ul
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));

}