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

document.addEventListener("DOMContentLoaded", async () => {
    const commentModal = document.getElementById("commentModal");
    const commentForm = document.getElementById("commentForm");
    const commentText = document.getElementById("commentText");
    const noteScenario = document.getElementById("noteScenario");
    const noteMiddle = document.getElementById("noteMiddle");
    const noteEnd = document.getElementById("noteEnd");
    const commentType = document.getElementById("commentType");
    const itemId = document.getElementById("itemId");

    let userId = null;

    // Fetch the connected user's ID
    try {
        const response = await fetch('/api/users/login', { method: 'GET' });
        if (response.ok) {
            const data = await response.json();
            userId = data.user.id; // Assuming the API returns the user ID in `data.user.id`
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur connecté:", error);
    }

    // Fonction pour ouvrir le modal avec les données
    window.openCommentModal = (type, id) => {
        commentType.value = type;
        itemId.value = id;
        commentModal.checked = true;
    };

    // Soumettre le commentaire et la note
    commentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!userId) {
            showToast("Utilisateur non connecté. Veuillez vous connecter.", "error");
            return;
        }

        // Vérifier si un avis existe déjà pour cet utilisateur et cet élément
        const checkUrl = commentType.value === "movie" 
            ? `/api/movie-notes?userId=${userId}&movieId=${itemId.value}` 
            : `/api/book-notes?userId=${userId}&bookId=${itemId.value}`;

        try {
            const checkResponse = await fetch(checkUrl, { method: 'GET' });
            if (checkResponse.ok) {
                const existingNotes = await checkResponse.json();
                if (existingNotes.length > 0) {
                    showToast("Vous avez déjà laissé un avis pour cet élément.", "error");
                    return;
                }
            }
        } catch (error) {
            console.error("Erreur lors de la vérification des avis existants:", error);
            showToast("Erreur lors de la vérification des avis existants.", "error");
            return;
        }

        const body = {
            comment: commentText.value,
            scenario: parseInt(noteScenario.value),
            userId: userId,
        };

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

        // Recharger la page pour afficher le nouveau commentaire
        location.reload();
    });
});