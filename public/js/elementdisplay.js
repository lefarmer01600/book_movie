document.addEventListener("DOMContentLoaded", () => {
  const movieDisplay = document.getElementById("movieDisplay");
  const bookDisplay = document.getElementById("bookDisplay");

  async function fetchMovies() {
    const res = await fetch("/api/movies");
    const movies = await res.json();

    movieDisplay.innerHTML = "";

    movies.forEach(movie => {
      movieDisplay.innerHTML += `
          <div class="card bg-white shadow-xl">
            <div class="card-body">
              <h2 class="card-title">${movie.title}</h2>
              <p><strong>Réalisateur :</strong> ${movie.director}</p>
              <p><strong>Acteurs :</strong> ${movie.actors.join(', ')}</p>
              <p><strong>Catégorie :</strong> ${movie.category}</p>
              <p><strong>Commentaires :</strong> ${movie.comments?.join('<br>') || 'Aucun commentaire'}</p>
              <p><strong>Note Moyenne :</strong> ⭐ ${movie.averageRating.toFixed(1)} (${movie.totalRatings} notes)</p>
              <button onclick="openCommentModal('movie', '${movie._id}')" class="btn btn-sm btn-outline btn-success mt-2">Ajouter un avis</button>
            </div>
          </div>
        `;
    });
  }

  async function fetchBooks() {
    const res = await fetch("/api/books");
    const books = await res.json();

    bookDisplay.innerHTML = "";

    books.forEach(book => {
      bookDisplay.innerHTML += `
          <div class="card bg-white shadow-xl">
            <div class="card-body">
              <h2 class="card-title">${book.title}</h2>
              <p><strong>Auteur :</strong> ${book.author}</p>
              <p><strong>Éditeur :</strong> ${book.publisher}</p>
              <p><strong>Catégorie :</strong> ${book.category}</p>
              <p><strong>Commentaires :</strong> ${book.comments?.join('<br>') || 'Aucun commentaire'}</p>
              <p><strong>Note Moyenne :</strong> ⭐ ${book.averageRating.toFixed(1)} (${book.totalRatings} notes)</p>
              <button onclick="openCommentModal('book', '${book._id}')" class="btn btn-sm btn-outline btn-success mt-2">Ajouter un avis</button>
            </div>
          </div>
        `;
    });
  }

  fetchMovies();
  fetchBooks();
});