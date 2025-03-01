// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const newCardButton = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');

const profileEditPopup = document.querySelector('.popup_type_edit');
const editForm = document.forms['edit-profile'];
const editInputName = editForm.elements.name;
const editInputDescription = editForm.elements.description;
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');
const newCardForm = document.forms['new-place'];
const newCardInputPlace = newCardForm.elements['place-name'];
const newCardInputLink = newCardForm.elements.link;

const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

function openImagePopup(name, link) {
  openModal(imagePopup);

  popupCaption.textContent = name;
  popupImage.src = link;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = editInputName.value;
  profileDescription.textContent = editInputDescription.value;

  closeModal(profileEditPopup);
}

function handleNewCardFormSumbit(evt) {
  evt.preventDefault();

  const newCardContent = {
    name: newCardInputPlace.value,
    alt: newCardInputPlace.value,
    link: newCardInputLink.value,
  };

  placesList.prepend(
    createCard(
      cardTemplate,
      newCardContent,
      deleteCard,
      handleLike,
      openImagePopup
    )
  );

  this.reset();
  closeModal(newCardPopup);
  clearValidation(newCardForm, validationOptions);
}

popups.forEach((popup) => {
  const popupContent = popup.querySelector('.popup__content');
  let mouseInsideContent = false;

  popupContent.addEventListener('mousedown', () => {
    mouseInsideContent = true;
  });

  popupContent.addEventListener('mouseup', () => {
    mouseInsideContent = true;
  });

  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    } else if (mouseInsideContent) {
      // Если клик начался или закончился не на оверлее,
      // закрытие попапа не сработает.
      mouseInsideContent = false;
      return;
    } else if (evt.target === evt.currentTarget) {
      closeModal(popup);
    }
  });
});

profileEditButton.addEventListener('click', () => {
  openModal(profileEditPopup);

  editInputName.value = profileTitle.textContent;
  editInputDescription.value = profileDescription.textContent;

  clearValidation(editForm, validationOptions);
});

newCardButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

editForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSumbit);

initialCards.forEach(function (cardContent) {
  placesList.append(
    createCard(
      cardTemplate,
      cardContent,
      deleteCard,
      handleLike,
      openImagePopup
    )
  );
});

enableValidation(validationOptions);
