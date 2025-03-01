export function enableValidation(options) {
  const forms = document.querySelectorAll(options.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, options);
  });
}

export function clearValidation(formElement, options) {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];

  inputList.forEach((inputElement) => {
    isValid(formElement, inputElement, options);
    if (inputElement.value === '') {
      hideInputError(formElement, inputElement, options);
    }
  });
}

function setEventListeners(formElement, options) {
  const inputList = formElement.querySelectorAll(options.inputSelector);

  toggleButtonState(formElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, options);
    });
  });
}

function isValid(formElement, inputElement, options) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }

  toggleButtonState(formElement, options);
}

function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
  inputElement.classList.add(options.inputErrorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(options.errorClass);
  inputElement.classList.remove(options.inputErrorClass);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(formElement, options) {
  const inputList = [...formElement.querySelectorAll(options.inputSelector)];
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(options.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(options.inactiveButtonClass);
  }
}
