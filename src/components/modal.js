const keyCodeEscButton = 27;

export function openModal(modal) {
  modal.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleCloseByKey);
}

export function closeModal(modal) {
  modal.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleCloseByKey);
}

function handleCloseByKey(evt) {
  if (evt.keyCode === keyCodeEscButton) {
    const popup = document.querySelector('.popup_is-opened');

    closeModal(popup);
  }
}
