// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import { createCard, handleLike } from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getProfile,
  editProfile,
  editAvatar,
  checkImageLink,
  getCards,
  postNewCard,
  deleteCard,
  putLike,
  removeLike,
} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const profileImage = profile.querySelector('.profile__image');
const profileTitle = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileEditButton = profile.querySelector('.profile__edit-button');
const newCardButton = profile.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');

const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = document.forms['edit-avatar'];
const editAvatarFormInputLink = editAvatarForm.link;
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
const deleteCardPopup = document.querySelector('.popup__type_delete');
const deleteCardForm = document.forms['delete-card'];
const cardToDelete = {};

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
  popupImage.alt = name;
}

function openDeleteCardPopup(card, cardId) {
  openModal(deleteCardPopup);

  cardToDelete.card = card;
  cardToDelete.cardId = cardId;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = this.querySelector('.popup__button');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  editProfile(editInputName.value, editInputDescription.value)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
    })
    .then(() => {
      closeModal(profileEditPopup);
      setTimeout(() => {
        // Без таймаута текст кнопки меняется раньше, чем попап исчезнет.
        submitButton.textContent = buttonText;
      }, 500);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
      submitButton.textContent = buttonText;
    });
}

function handleNewCardFormSumbit(evt) {
  evt.preventDefault();
  const submitButton = this.querySelector('.popup__button');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  postNewCard(newCardInputPlace.value, newCardInputLink.value)
    .then((cardContent) => {
      placesList.prepend(
        createCard({
          cardTemplate,
          cardContent,
          openDeleteCardPopup,
          handleLike,
          openImagePopup,
          isOwner: true,
          ownerId: cardContent.owner._id,
          putLike,
          removeLike,
        })
      );
    })
    .then(() => {
      this.reset();
      closeModal(newCardPopup);
      clearValidation(newCardForm, validationOptions);
      setTimeout(() => {
        // Без таймаута текст кнопки меняется раньше, чем попап исчезнет.
        submitButton.textContent = buttonText;
      }, 500);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err.status}`);
      submitButton.textContent = buttonText;
    });
}

function handleDeleteCardFormSubmit(evt) {
  evt.preventDefault();

  deleteCard(cardToDelete.cardId)
    .then((res) => {
      cardToDelete.card.remove();
      closeModal(deleteCardPopup);
      console.log(res.message);
    })
    .catch((err) => console.log(err.status));
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = this.querySelector('.popup__button');
  const buttonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';

  const link = editAvatarFormInputLink.value;
  checkImageLink(link)
    .then((link) => {
      editAvatar(link).then((res) => {
        profileImage.style.backgroundImage = `url(${res.avatar})`;
      });
    })
    .then(() => {
      this.reset();
      clearValidation(editAvatarForm, validationOptions);
      closeModal(editAvatarPopup);
      setTimeout(() => {
        // Без таймаута текст кнопки меняется раньше, чем попап исчезнет.
        submitButton.textContent = buttonText;
      }, 500);
    })
    .catch((err) => {
      if (err.message === 'Failed to fetch') {
        console.log('Ссылка не доступна, попробуйте другую ссылку');
      } else {
        console.log(err.message);
      }
      submitButton.textContent = buttonText;
    });
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

profileImage.addEventListener('click', () => {
  openModal(editAvatarPopup);
});

editForm.addEventListener('submit', handleEditFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSumbit);
deleteCardForm.addEventListener('submit', handleDeleteCardFormSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatarFormSubmit);

enableValidation(validationOptions);

Promise.all([getProfile(), getCards()])
  .then((res) => {
    const [profile, cards] = res;

    profileImage.style.backgroundImage = `url('${profile.avatar}')`;
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;

    cards.forEach(function (cardContent) {
      const isOwner = profile._id === cardContent.owner._id;

      placesList.append(
        createCard({
          cardTemplate,
          cardContent,
          openDeleteCardPopup,
          handleLike,
          openImagePopup,
          isOwner,
          ownerId: profile._id,
          putLike,
          removeLike,
        })
      );
    });
  })
  .catch((err) => {
    console.log(`Ошибка: ${err.status}`);
  });
