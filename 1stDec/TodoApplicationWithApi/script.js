const API_URL = "https://jsonplaceholder.typicode.com/todos";
const STORAGE_KEY = "myTodos";

//-------------------------------------
// Fetch first 20 todos from API
//-------------------------------------

async function fechTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();
    return todos.slice(0, 20);
}

//-------------------------------------
// fetched todos to save in localstorage
//-------------------------------------

function saveToLocalStorage(todos){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

//-------------------------------------
function getFromLocalStorage(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

//-------------------------------------
// Render Todos on screen
//-------------------------------------
function renderTodos(){
    const container = document.getElementById("todo-container");
    const todos = getFromLocalStorage();
    container.innerHTML = ""; // clear UI

    /// Show "No Todos Available"
    if(todos.length === 0){
        container.innerHTML = `<p class = "empty-message">No Todos Available</p>`;
        return;
    }

    todos.forEach(todo => {
        const item = document.createElement('div');
        item.className = "todo-item";
        if(todo.completed) item.classList.add("Completed");

        item.innerHTML = `
           <div class="todo-title">${todo.title}</div>
           <div class="todo-status">Status: <strong>${todo.completed ? "completed" : "NOt completed"}</strong></div>

           <button class="toggle-btn" onclick="toogleStatus(${todo.id})">
             ${todo.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>

          <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
        `;

        container.appendChild(item);
    });
}

//-------------------------------------
// Delete Todo
//-------------------------------------

function deleteTodo(id){
    let todos = getFromLocalStorage();
    todos = todos.filter(todo => todo.id !== id);
    saveToLocalStorage(todos);
    renderTodos();
}

//------------------------------------------
// Toggle Completed Status (Mark Completed)
//------------------------------------------

function toogleStatus(id){
    let todos = getFromLocalStorage();
    
    todos = todos.map(todo => {
        if (todo.id === id){
            return {...todo, completed: !todo.completed};
        }
        return todo;
    });

    saveToLocalStorage(todos);
    renderTodos();
}

//-------------------------------------
// Intialize App
//-------------------------------------

async function init() {
    if (!localStorage.getItem(STORAGE_KEY)){
        const todos = await fechTodos();
        saveToLocalStorage(todos);

    }
    renderTodos();
    
}
init();