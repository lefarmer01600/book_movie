document.addEventListener("DOMContentLoaded", () => {
    const movieForm = document.getElementById("addMovieForm");
    const bookForm = document.getElementById("addBookForm");
    const movieList = document.getElementById("movieList");
    const bookList = document.getElementById("bookList");

    const editModalCheckbox = document.getElementById("editModal");
    const editForm = document.getElementById("editForm");
    const editId = document.getElementById("editId");
    const editTitle = document.getElementById("editTitle");
    const editField1 = document.getElementById("editField1");
    const editField2 = document.getElementById("editField2");
    const editCategory = document.getElementById("editCategory");
    const editType = document.getElementById("editType");
    const editModalTitle = document.getElementById("editModalTitle");

    // Show toast notification
    function showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toastContainer');
        const colorMap = {
            success: 'alert-success',
            error: 'alert-error',
            info: 'alert-info',
            warning: 'alert-warning'
        };

        const toast = document.createElement('div');
        toast.className = `alert ${colorMap[type]} shadow-lg my-1`;
        toast.innerHTML = `
        <span>${message}</span>
      `;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    async function fetchMovies() {
        const res = await fetch('/api/movies');
        const movies = await res.json();
        movieList.innerHTML = '';
        movies.forEach(movie => {
            const div = document.createElement('div');
            div.className = 'p-4 bg-base-200 rounded shadow';
            div.innerHTML = `
          <h3 class="font-bold">${movie.title}</h3>
          <p><strong>Réalisateur:</strong> ${movie.director}</p>
          <p><strong>Acteurs:</strong> ${movie.actors.join(', ')}</p>
          <p><strong>Catégorie:</strong> ${movie.category}</p>
          <div class="mt-2 flex gap-2">
            <button class="btn btn-sm btn-outline" onclick="openEditModal('movie', '${movie._id}', '${movie.title}', '${movie.director}', '${movie.actors.join(', ')}', '${movie.category}')">Modifier</button>
            <button class="btn btn-sm btn-error text-white" onclick="deleteMovie('${movie._id}')">Supprimer</button>
          </div>
        `;
            movieList.appendChild(div);
        });
    }

    async function fetchBooks() {
        const res = await fetch('/api/books');
        const books = await res.json();
        bookList.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = 'p-4 bg-base-200 rounded shadow';
            div.innerHTML = `
          <h3 class="font-bold">${book.title}</h3>
          <p><strong>Auteur:</strong> ${book.author}</p>
          <p><strong>Éditeur:</strong> ${book.publisher}</p>
          <p><strong>Catégorie:</strong> ${book.category}</p>
          <div class="mt-2 flex gap-2">
            <button class="btn btn-sm btn-outline" onclick="openEditModal('book', '${book._id}', '${book.title}', '${book.author}', '${book.publisher}', '${book.category}')">Modifier</button>
            <button class="btn btn-sm btn-error text-white" onclick="deleteBook('${book._id}')">Supprimer</button>
          </div>
        `;
            bookList.appendChild(div);
        });
    }

    movieForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {
            title: movieForm.movieTitle.value,
            actors: movieForm.movieActors.value.split(',').map(a => a.trim()),
            director: movieForm.movieDirector.value,
            category: movieForm.movieCategory.value
        };
        await fetch('/api/movies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        movieForm.reset();
        fetchMovies();
        showToast("Film ajouté avec succès");
    });

    bookForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const body = {
            title: bookForm.bookTitle.value,
            author: bookForm.bookAuthor.value,
            publisher: bookForm.bookPublisher.value,
            category: bookForm.bookCategory.value
        };
        await fetch('/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        bookForm.reset();
        fetchBooks();
        showToast("Livre ajouté avec succès");
    });

    window.deleteMovie = async (id) => {
        await fetch(`/api/movies/${id}`, { method: 'DELETE' });
        fetchMovies();
        showToast("Film supprimé", "warning");
    };

    window.deleteBook = async (id) => {
        await fetch(`/api/books/${id}`, { method: 'DELETE' });
        fetchBooks();
        showToast("Livre supprimé", "warning");
    };

    window.openEditModal = (type, id, title, f1, f2, category) => {
        editId.value = id;
        editTitle.value = title;
        editField1.value = f1;
        editField2.value = f2;
        editCategory.value = category;
        editType.value = type;
        editModalTitle.textContent = `Modifier un ${type === 'book' ? 'livre' : 'film'}`;
        editModalCheckbox.checked = true;
    };

    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const id = editId.value;
        const type = editType.value;
        const body = {
            title: editTitle.value,
            category: editCategory.value,
            ...(type === 'book'
                ? { author: editField1.value, publisher: editField2.value }
                : { director: editField1.value, actors: editField2.value.split(',').map(a => a.trim()) })
        };

        await fetch(`/api/${type === 'book' ? 'books' : 'movies'}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        editModalCheckbox.checked = false;
        if (type === 'book') {
            fetchBooks();
        } else {
            fetchMovies();
        }
        showToast("Modification enregistrée", "info");
    });

    fetchMovies();
    fetchBooks();
});