document.addEventListener("DOMContentLoaded", () => {
  const movieDisplay = document.getElementById("movieDisplay");
  const bookDisplay = document.getElementById("bookDisplay");

  async function fetchMovies() {
    const res = await fetch("/api/movies");
    const movies = await res.json();


    movieDisplay.innerHTML = "";

    movies.forEach(async movie => {
      const commentsRes = await fetch("api/movie-notes/comments/:" + movie._id);
      const comments = await commentsRes.json();

      let commentsHTML = "";
      if (comments.error !== undefined) {
        commentsHTML += 'Pas de commentaires'
      } else {
        comments.forEach(comment => {
          commentsHTML += `
            <div class="comment">
              <p><strong>${comment.userId}: </strong>${comment.comment}</p>
            </div>`;
        });
      }

      movieDisplay.innerHTML += `
  <div class="card bg-white shadow-xl">
    <div class="card-body">
      <h2 class="card-title">${movie.title}</h2>
      <p><strong>Réalisateur :</strong> ${movie.director}</p>
      <p><strong>Acteurs :</strong> ${movie.actors.join(', ')}</p>
      <p><strong>Catégorie :</strong> ${movie.category}</p>
      <p><strong>Note Moyenne :</strong> ⭐ ${movie.averageRating.toFixed(1)} (${movie.totalRatings} notes)</p>
      <button onclick="openCommentModal('movie', '${movie._id}', this)" class="btn btn-sm btn-outline btn-success mt-2">
        Ajouter un avis
      </button>
      <div id="commentDisplay-movie-${movie._id}" class="text-sm text-gray-600 mt-1"></div>
    </div>
    <div class="px-6 pb-4 flex justify-end">
      <details class="collapse collapse-arrow w-auto bg-base-200 rounded-lg">
        <summary class="collapse-title text-md font-semibold text-gray-700 hover:text-gray-800 cursor-pointer px-3 py-2">
          Voir les commentaires
        </summary>
        <div class="collapse-content text-left space-y-2 pt-2 text-sm">
          ${commentsHTML || '<p>Aucun commentaire pour ce film.</p>'}
        </div>
      </details>
    </div>
  </div>`;
    });
  }

  async function fetchBooks() {
    const res = await fetch("/api/books");
    const books = await res.json();

    bookDisplay.innerHTML = "";

    books.forEach(async book => {

      const commentsRes = await fetch("api/book-notes/comments/:" + book._id);
      const comments = await commentsRes.json();

      let commentsHTML = "";

      if (comments.error !== undefined) {
        commentsHTML += 'Pas de commentaires'
      } else {
        comments.forEach(comment => {
          commentsHTML += `
            <div class="comment">
              <p><strong>${comment.userId}: </strong>${comment.comment}</p>
            </div>`;
        });
      }



      bookDisplay.innerHTML += `
  <div class="card bg-white shadow-xl">
    <div class="card-body">
      <h2 class="card-title">${book.title}</h2>
      <p><strong>Auteur :</strong> ${book.author}</p>
      <p><strong>Catégorie :</strong> ${book.category}</p>
      <p><strong>Note Moyenne :</strong> ⭐ ${book.averageRating.toFixed(1)} (${book.totalRatings} notes)</p>
      <button onclick="openCommentModal('book', '${book._id}', this)" class="btn btn-sm btn-outline btn-success mt-2">
        Ajouter un avis
      </button>
      <div id="commentDisplay-book-${book._id}" class="text-sm text-gray-600 mt-1"></div>
    </div>
    <div class="px-6 pb-4 flex justify-end">
      <details class="collapse collapse-arrow w-auto bg-base-200 rounded-lg">
        <summary class="collapse-title text-md font-semibold text-gray-600 hover:text-gray-800 cursor-pointer px-3 py-2">
          Voir les commentaires
        </summary>
        <div class="collapse-content text-left space-y-2 pt-2 text-sm">
          ${commentsHTML || '<p>Aucun commentaire pour ce livre.</p>'}
        </div>
      </details>
    </div>
  </div>`;
    });
  }

  fetchMovies();
  fetchBooks();
});