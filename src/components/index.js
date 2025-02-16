// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// 1. объявления и инициализация глобальных констант
// и переменных с DOM-элементами страницы

// 2. обработчики событий (при открытии и закрытии попапов;
// при отправке форм; обработчик, открывающий попап при клике
// по изображению карточки)
//
// 3. вызовы других функций, подключённых из созданных модулей,
// которым нужно будет передавать объявленные здесь переменные
// и обработчики.
//
// в файле index.js описана инициализация приложения и основная
// логика страницы: поиск DOM-элементов на странице и навешивание
// на них обработчиков событий;
// обработчики отправки форм,
// функция-обработчик события открытия модального окна для
// редактирования профиля;
// функция открытия модального окна изображения карточки.
// Также в index.js находится код, который отвечает за
// отображение шести карточек при открытии страницы.

import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const newCardButton = profile.querySelector('.profile__add-button');

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

function openImagePopup(name, link) {
  openModal(imagePopup);

  popupCaption.textContent = name;
  popupImage.src = link;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = editInputName.value;
  profileDescription.textContent = editInputDescription.value;

  closeModal(this.closest('.popup_is-opened'));
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
  closeModal(this.closest('.popup_is-opened'));
}

profileEditButton.addEventListener('click', () => {
  openModal(profileEditPopup);

  editInputName.value = profileTitle.textContent;
  editInputDescription.value = profileDescription.textContent;
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
