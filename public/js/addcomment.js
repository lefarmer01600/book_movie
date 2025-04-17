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
    toast.innerHTML = `<span>${message}</span>`;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    const commentModal = document.getElementById("commentModal");
    const commentForm = document.getElementById("commentForm");
    const commentText = document.getElementById("commentText");
    const noteScenario = document.getElementById("noteScenario");
    const noteMiddle = document.getElementById("noteMiddle");
    const noteEnd = document.getElementById("noteEnd");
    const commentType = document.getElementById("commentType");
    const itemId = document.getElementById("itemId");

    // Fonction pour ouvrir le modal avec les données
    window.openCommentModal = (type, id) => {
        commentType.value = type;
        itemId.value = id;
        commentModal.checked = true;
    };

    // Soumettre le commentaire et la note
    commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const body = {
            comment: commentText.value,
            scenario: parseInt(noteScenario.value),
            userId: "6800d2348beb20e27766e008",
        };
        console.log(body);
        if (commentType.value === "movie") {
            body.acting = parseInt(noteMiddle.value);
            body.audioVisualQuality = parseInt(noteEnd.value);
            body.movieId = itemId.value;

            await fetch('/api/movie-notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            showToast("Commentaire ajouté avec succès pour le film");
        } else {
            body.characters = parseInt(noteMiddle.value);
            body.writingQuality = parseInt(noteEnd.value);
            body.bookId = itemId.value;

            await fetch('/api/book-notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            showToast("Commentaire ajouté avec succès pour le livre");
        }

        commentModal.checked = false;
        commentText.value = '';
        noteScenario.value = '';
        noteMiddle.value = '';
        noteEnd.value = '';
    });
});