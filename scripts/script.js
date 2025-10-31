const filterItems = document.querySelectorAll('.cars-filter li');
const carItems = document.querySelectorAll('.car');
const carsContent = document.getElementById('cars-content');

filterItems.forEach((item) => {
  item.onclick = () => {
    filterItems.forEach((el) => el.classList.remove('active'));
    item.classList.add('active');

    const filterText = item.textContent.toLowerCase();

    carItems.forEach((car) => {
      if (
        filterText === 'все марки' ||
        car.querySelector('h4').textContent.toLowerCase().includes(filterText)
      ) {
        car.style.display = 'flex';
      } else {
        car.style.display = 'none';
      }
    });

    carsContent.scrollIntoView({ behavior: 'instant' });
  };
});

document.addEventListener('DOMContentLoaded', function () {
  // Предварительно находим все элементы
  const orderButton = document.getElementById('order-action');
  const formFields = [
    { element: document.getElementById('car'), validator: validateCar },
    { element: document.getElementById('name'), validator: validateName },
    { element: document.getElementById('phone'), validator: validatePhone },
  ];

  // Правила валидации
  function validateCar(value) {
    return value.trim().length >= 2;
  }

  function validateName(value) {
    const trimmed = value.trim();
    return trimmed.length >= 2 && /^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(trimmed);
  }

  function validatePhone(value) {
    const cleanedPhone = value.replace(/[\s\-\+\(\)]/g, '');
    return cleanedPhone.length >= 10 && /^\d+$/.test(cleanedPhone);
  }

  // Функция валидации одного поля
  function validateField(field) {
    const value = field.element.value;
    return field.validator(value);
  }

  // Функция для подсветки поля
  function highlightField(field, isValid) {
    field.element.style.borderColor = isValid ? 'white' : 'red';
  }

  // Обработчик клика
  orderButton.addEventListener('click', function () {
    const validationResults = [];

    // Валидируем все поля и собираем результаты
    formFields.forEach((field) => {
      const isValid = validateField(field);
      validationResults.push(isValid);
      highlightField(field, isValid);
    });

    // Проверяем, все ли поля валидны
    const isFormValid = validationResults.every((result) => result === true);

    if (isFormValid) {
      alert('Спасибо за заявку! Мы скоро свяжемся с вами');

      // Очищаем все поля циклом
      formFields.forEach((field) => {
        field.element.value = '';
        field.element.style.borderColor = '#ccc';
      });
    }
  });

  // Live validation при вводе и потере фокуса
  formFields.forEach((field) => {
    field.element.addEventListener('input', () => {
      const isValid = validateField(field);
      highlightField(field, isValid);
    });

    field.element.addEventListener('blur', () => {
      const isValid = validateField(field);
      highlightField(field, isValid);
    });
  });
});

