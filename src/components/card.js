export function createCard(
  cardTemplate,
  cardContent,
  deleteCard,
  handleLike,
  openImagePopup
) {
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');

  cardDeleteButton.addEventListener('click', () => {
    deleteCard(card);
  });
  cardLikeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', () => {
    openImagePopup(cardTitle.textContent, cardImage.src);
  });
  cardTitle.textContent = cardContent.name;
  cardImage.src = cardContent.link;
  cardImage.alt = cardContent.alt;

  return card;
}

export function deleteCard(card) {
  console.dir(card);
  card.remove();
}

export function handleLike(evt) {
  const likeButton = evt.target;

  likeButton.classList.toggle('card__like-button_is-active');
}
