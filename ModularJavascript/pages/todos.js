import { Navbar } from "../components/navbar.js";
import { Footer } from "../components/footer.js";
import { displayTodos } from "../display/displayTodos.js";

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

// Access control
if (localStorage.getItem("loggedIn") !== "true") {
  alert("Please login first!");
  window.location.href = "login.html";
}

// Fetch Todos
fetch("https://jsonplaceholder.typicode.com/todos")
  .then(res => res.json())
  .then(data => {
    displayTodos(data);
  })
  .catch(err => console.error(err));
