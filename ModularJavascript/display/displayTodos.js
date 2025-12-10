export function displayTodos(data){
    const container = document.getElementById("todos");
    container.innerHTML = "";

    data.forEach(todo =>{
        const div = document.createElement("div");
          div.style.border = "1px solid #ccc";
          div.style.margin = "8px 0";
          div.style.padding = "10px";
          div.innerHTML = `
             <strong>${todo.title}</strong>
             <p>Status: ${todo.completed ? "✔️ Completed" : "❌ Pending"} </p>
          `;
          container.appendChild(div);
    });
}