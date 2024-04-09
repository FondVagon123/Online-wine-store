document.addEventListener('DOMContentLoaded', function() {
    // Додаємо обробник події для форми реєстрації
    document.querySelector('#registration form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Зупиняємо стандартну поведінку форми

        // Отримуємо дані форми
        const formData = new FormData(this);
        const username = formData.get('reg_username');
        const email = formData.get('reg_email');
        const password = formData.get('reg_password');
        const confirmPassword = formData.get('confirm_password');

        // Перевіряємо, чи паролі співпадають
        if (password !== confirmPassword) {
            alert('Паролі не співпадають');
            return;
        }

        // Відправляємо запит POST для реєстрації
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        // Перевіряємо статус відповіді
        if (response.ok) {
            alert('Реєстрація пройшла успішно');
            window.location.href = 'login.html'; // Перенаправляємо на сторінку авторизації після успішної реєстрації
        } else {
            const data = await response.json();
            alert(data.error || 'Сталася помилка під час реєстрації');
        }
    });

    // Отримуємо кнопку "Зареєструватися" за її id
    const registerButton = document.getElementById("registerButton");

    // Додаємо обробник подій для кнопки
    registerButton.addEventListener("click", function(event) {
        // Зупиняємо стандартну поведінку кнопки (відправку форми)
        event.preventDefault();

        // Виконуємо перенаправлення на сторінку авторизації
        window.location.href = "login.html";
    });
});



