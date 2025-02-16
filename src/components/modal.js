// 1. Функция открытия модального окна openModal
// 2. Функция закрытия модального окна closeModal
// Функции принимают в качестве аргумента DOM-элемент модального окна.
//
// 3. Функция-обработчик события нажатия Esc
// 4. Функция-обработчик события клика по оверлею

export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleClose);
  modal.addEventListener('click', handleClose);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleClose);
  modal.removeEventListener('click', handleClose);
}

function handleClose(evt) {
  const popup = document.querySelector('.popup_is-opened');
  const closeButton = popup.querySelector('.popup__close');
  if (
    evt.keyCode === 27 ||
    evt.target === popup ||
    evt.target === closeButton
  ) {
    closeModal(popup);
  }
}
