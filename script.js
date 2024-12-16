document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const submitButton = document.getElementById('submitButton');

    // Отримання всіх полів форми
    const fields = {
        surname: {
            element: document.getElementById('surname'),
            errorIndicator: document.getElementById('surname-indicator'),
            validator: validateTextField,
            touched: false
        },
        firstname: {
            element: document.getElementById('firstname'),
            errorIndicator: document.getElementById('firstname-indicator'),
            validator: validateTextField,
            touched: false
        },
        patronymic: {
            element: document.getElementById('patronymic'),
            errorIndicator: document.getElementById('patronymic-indicator'),
            validator: validateTextField,
            touched: false
        },
        age: {
            element: document.getElementById('age'),
            errorIndicator: document.getElementById('age-indicator'),
            validator: validateSelectField,
            touched: false
        },
        about: {
            element: document.getElementById('about'),
            errorIndicator: document.getElementById('about-indicator'),
            validator: validateTextareaField,
            touched: false
        }
    };

    // Функції валідації
    function validateTextField(value) {
        const regex = /^[A-Za-z]+$/;
        return regex.test(value);
    }

    function validateSelectField(value) {
        return value !== "";
    }

    function validateTextareaField(value) {
        return value.trim().length >= 10;
    }

    // Загальна функція валідації для окремого поля
    function validateField(field) {
        const value = field.element.value.trim();
        let isValid = false;

        if (field.element.tagName.toLowerCase() === 'select') {
            isValid = field.validator(value);
        } else if (field.element.tagName.toLowerCase() === 'textarea') {
            isValid = field.validator(value);
        } else {
            isValid = field.validator(value);
        }

        if (!isValid && field.touched) {
            field.errorIndicator.style.display = 'inline';
            field.element.classList.add('error');
        } else {
            field.errorIndicator.style.display = 'none';
            field.element.classList.remove('error');
        }

        return isValid;
    }

    // Функція перевірки всієї форми
    function validateForm() {
        let isFormValid = true;
        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {
                const fieldValid = validateField(fields[key]);
                if (!fieldValid) {
                    isFormValid = false;
                }
            }
        }
        submitButton.disabled = !isFormValid;
    }

    // Додаємо слухачів подій для кожного поля
    for (let key in fields) {
        if (fields.hasOwnProperty(key)) {
            const field = fields[key];

            field.element.addEventListener('input', function() {
                if (!field.touched) {
                    field.touched = true;
                }
                validateField(field);
                validateForm();
            });

            field.element.addEventListener('blur', function() {
                if (!field.touched) {
                    field.touched = true;
                }
                validateField(field);
                validateForm();
            });
        }
    }

    // Початкова перевірка форми
    validateForm();

    // Обробка подачі форми
    form.addEventListener('submit', function(event) {
        for (let key in fields) {
            if (fields.hasOwnProperty(key)) {
                fields[key].touched = true;
                validateField(fields[key]);
            }
        }

        validateForm();

        if (submitButton.disabled) {
            event.preventDefault();
            alert('Будь ласка, виправте помилки у формі перед відправкою.');
        }
    });

    // Анімація логотипу
    const logo = document.querySelector('.site-logo');
    let rotation = 0; // начальный угол вращения

    function startAnimation() {
        // Уменьшаем логотип
        logo.style.transition = 'transform 0.5s ease, scale 0.5s ease';
        logo.style.transform = 'scale(0.7)';

        setTimeout(() => {
            // Начинаем вращение
            logo.style.transition = 'transform 2s linear';
            rotation += 1080; // 3 круга (360 * 3)
            logo.style.transform = `rotate(${rotation}deg) scale(0.7)`;

            setTimeout(() => {
                // Останавливаем вращение и возвращаем логотип в исходное состояние
                logo.style.transition = 'transform 0.5s ease';
                logo.style.transform = 'rotate(0deg) scale(1)';
            }, 2000); // Время вращения 2 секунды
        }, 500); // Задержка перед началом вращения
    }

    // Запускаем анимацию каждые 5 секунд
    setInterval(startAnimation, 5000);
});
