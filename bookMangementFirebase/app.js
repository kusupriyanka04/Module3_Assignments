const BASE_URL = "https://book-management-68a4c-default-rtdb.asia-southeast1.firebasedatabase.app/books";

//----------------------------------
// POST (create)

async function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const price = document.getElementById("price").value.trim();
    const image = document.getElementById("image").value.trim();

    if(!title || !author) return alert("Title & Author required!");
    
    const newBook = {
      title, author, price,
      coverImageURL: image || "https://via.placeholder.com/200",
      createdAt: Date.now()
    };

    await fetch(`${BASE_URL}.json`,{
      method: "POST",
      body: JSON.stringify(newBook)
   });

    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
     
    loadBooks();
}

//----------------------------------
// GET (READ)
//----------------------------------

async function loadBooks() {
    //try{
        const response = await fetch(`${BASE_URL}.json`); // GET Request
        const data = await response.json();

        const container = document.getElementById("booksList");
        container.innerHTML = "";

        if(!data) return;

       const arrayData = Object.keys(data).forEach(id => {
            createBookCard(id, data[id]);
        });
        //createBookCard(arrayData);
    // }catch(error) {
    //     console.log(error);
    // }
}

//----------------------------------
// PATCH (UPDATE)
//----------------------------------

async function updateAuthor(id, currentAuthor) {
    const newAuthor = prompt("Enter new author", currentAuthor);
    if (!newAuthor) return;

    await fetch(`${BASE_URL}/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ author: newAuthor })
    });

    loadBooks();
}

//----------------------------------
// DELETE
//----------------------------------

async function deleteBook(id) {
    if (!confirm("Delete book?")) return;

    await fetch(`${BASE_URL}/${id}.json`, {
      method: "DELETE"
    });

    loadBooks();
}

//----------------------------------
// View Details
//----------------------------------

function viewDetails(book) {
    document.getElementById("modalTitle").innerText = book.title;
    document.getElementById("modalAuthor").innerText = book.author;
    document.getElementById("modalPrice").innerText = book.price;
    document.getElementById("modalImage").src = book.coverImageURL;

    document.getElementById("detailsModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("detailsModal").style.display = "none";
}

//----------------------------------
// Render Card
//----------------------------------

function createBookCard(id, book) {
    const card = document.createElement("div");
    card.className = "book-card";

    card.innerHTML = `
      <img src="${book.coverImageURL}" />
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p><b>Price:</b> ${book.price}</p>

      <div class="actions">
        <button class="update-btn" onclick="updateAuthor('${id}', '${book.author}')">Update</button>
        <button class="delete-btn" onclick="deleteBook('${id}')">Delete</button>
        <button class="details-btn" onclick='viewDetails(${JSON.stringify(book)})'>Details</button>
      </div>
    `;

    document.getElementById("booksList").appendChild(card);
  }

  // Load books on start
  loadBooks();


