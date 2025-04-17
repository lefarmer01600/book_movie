document.getElementById('submitRegister').addEventListener('click', async () => {
    const form = document.getElementById('registerForm');
    const formData = new FormData(form);
    const warningPopup = document.getElementById('warningPopup');

    const email = formData.get('email');

    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        
        warningPopup.classList.remove('hidden');
        setTimeout(() => {
            warningPopup.classList.add('hidden');
        }, 3000);
        return;
    }

    const data = {
        name: formData.get('name'),
        email: email,
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
            alert(`Erreur: ${error.message}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de l\'inscription.');
    }
});