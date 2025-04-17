document.querySelector('form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = event.target[0].value;
    const password = event.target[1].value;

    if (!username || !password) {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const data = {
        email: username,
        passwordHash: CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64),
    };

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Connexion réussie !');
            window.location.href = '/';
        } else {
            const error = await response.json();
            alert(`Erreur: ${error.message}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la connexion.');
    }
});