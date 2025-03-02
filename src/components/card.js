export function createCard(options) {
  const card = options.cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardDeleteButton = card.querySelector('.card__delete-button');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardLikeCount = card.querySelector('.card__like-count');
  const cardContent = options.cardContent;
  const cardId = cardContent._id;
  const ownerId = options.ownerId;
  const isOwnerLike = cardContent.likes.some((like) => {
    return like._id === ownerId;
  });

  if (options.isOwner) {
    cardDeleteButton.addEventListener('click', () => {
      options.openDeleteCardPopup(card, cardId);
    });
  } else {
    cardDeleteButton.remove();
  }

  cardLikeButton.addEventListener('click', (evt) => {
    options.handleLike(evt, cardContent, ownerId, cardId, cardLikeCount, {
      putLike: options.putLike,
      removeLike: options.removeLike,
    });
  });
  cardImage.addEventListener('click', () => {
    options.openImagePopup(cardTitle.textContent, cardImage.src);
  });

  if (isOwnerLike) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  cardTitle.textContent = options.cardContent.name;
  cardImage.src = options.cardContent.link;
  cardImage.alt = options.cardContent.name;
  cardLikeCount.textContent = cardContent.likes.length;

  return card;
}

export function handleLike(
  evt,
  cardContent,
  ownerId,
  cardId,
  cardLikeCount,
  { putLike, removeLike }
) {
  const likeButton = evt.target;
  const isOwnerLike = cardContent.likes.some((like) => {
    return like._id === ownerId;
  });

  if (isOwnerLike) {
    removeLike(cardId)
      .then((card) => {
        cardContent.likes = card.likes;
        cardLikeCount.textContent = card.likes.length;
        likeButton.classList.remove('card__like-button_is-active');
      })
      .catch((err) => console.log(`Код ошибки: ${err.status}`));
  } else {
    putLike(cardId)
      .then((card) => {
        cardContent.likes = card.likes;
        cardLikeCount.textContent = card.likes.length;
        likeButton.classList.add('card__like-button_is-active');
      })
      .catch((err) => console.log(`Код ошибки: ${err.status}`));
  }
}
