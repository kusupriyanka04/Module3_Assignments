import { Navbar } from '../components/navbar.js';
import { Footer } from '../components/footer.js';

document.getElementById("navbar").innerHTML = Navbar();
document.getElementById("footer").innerHTML = Footer();

const form = document.getElementById("loginForm");
form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const email = document.getElementById("email").value;
    const password =  document.getElementById("password").value;

    if(storedUser && storedUser.email === email && storedUser.password === password){
        localStorage.setItem("loggedIn", "true");
        window.location.href = "todos.html";
    }else{
        alert("Invalid credentials");
    }

});
