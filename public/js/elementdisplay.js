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
      if (comments.error !== undefined ) {
        commentsHTML+= 'Pas de commentaires'
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
            <button onclick="openCommentModal('movie', '${movie._id}')" class="btn btn-sm btn-outline btn-success mt-2">Ajouter un avis</button>
          </div>
          <div class="text-center mt-4">
            <details class="collapse bg-base-100 rounded-lg shadow">
              <summary class="collapse-title btn btn-success text-white">
                Voir les commentaires
              </summary>
              <div class="collapse-content text-left space-y-2 pt-2">
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

      if (comments.error !== undefined ) {
        commentsHTML+= 'Pas de commentaires'
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
              <p><strong>Éditeur :</strong> ${book.publisher}</p>
              <p><strong>Catégorie :</strong> ${book.category}</p>
              <p><strong>Note Moyenne :</strong> ⭐ ${book.averageRating.toFixed(1)} (${book.totalRatings} notes)</p>
              <button onclick="openCommentModal('book', '${book._id}')" class="btn btn-sm btn-outline btn-success mt-2">Ajouter un avis</button>
            </div>
            <div class="text-center mt-4">
            <details class="collapse bg-base-100 rounded-lg shadow">
              <summary class="collapse-title btn btn-success text-white">
                Voir les commentaires
              </summary>
              <div class="collapse-content text-left space-y-2 pt-2">
                ${commentsHTML || '<p>Aucun commentaire pour ce film.</p>'}
              </div>
            </details>
          </div>
        </div>
        `;
    });
  }

  fetchMovies();
  fetchBooks();
});