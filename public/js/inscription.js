document.getElementById('submitRegister').addEventListener('click', async () => {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const warningPopup = document.getElementById('warningPopup');

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        passwordHash: CryptoJS.SHA256(formData.get('password')).toString(CryptoJS.enc.Base64),
    };

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Inscription réussie !');
            form.reset();
        } else {
            const error = await response.json();
            warningPopup.textContent = error.message; // Affiche le message d'erreur du serveur
            warningPopup.classList.remove('hidden');
            setTimeout(() => {
                warningPopup.classList.add('hidden');
            }, 3000);
        }
    } catch (error) {
        console.error('Erreur:', error);
        warningPopup.textContent = 'Erreur lors de l\'inscription.';
        warningPopup.classList.remove('hidden');
        setTimeout(() => {
            warningPopup.classList.add('hidden');
        }, 3000);
    }
});