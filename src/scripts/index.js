// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import '../pages/index.css';
import {initialCards} from './cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(cardTemplate, cardContent, deleteCard) {
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  
  cardDeleteButton.addEventListener('click', deleteCard);
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.alt;
  
  return card;
}

function deleteCard(event) {
  const card = event.target.closest('.card');

  card.remove();
}

initialCards.forEach(function (cardContent) {
  placesList.append(createCard(cardTemplate, cardContent, deleteCard));
});
