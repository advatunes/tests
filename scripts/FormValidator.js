class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  // Проверка валидности

  _hasValidInput = () => {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  };

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Переключение submit
  _toggleButtonState = () => {
    if (this._hasValidInput()) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  };

  // Включение submit
  _enableSubmitButton = () => {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = '';
  };
  // отключение submit
  _disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = 'disabled';
  };

  // Отображение ошибки
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  // Скрытие ошибки
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Добавление обработчиков
  _setEventListeners = () => {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

 // Очистка ошибок валидации
 clearValidation = () => {
  this._inputList.forEach((input) => {
    if (input.classList.contains(this._inputErrorClass)) {
      this._hideInputError(input);
    }
  });
};

  // Очистка инпутов
  clearFormInput = () => {
    this._inputList.forEach((input) => {
      input.value = '';
    });
  };

  toggleSubmitBtn = () => {
    this._toggleButtonState();
  }

  enableValidation = () => {
    // this._formElement.addEventListener('submit', (e) => e.preventDefault());
    this._setEventListeners();
  };
}

export { FormValidator };
