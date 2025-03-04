const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
  headers: {
    authorization: '30d15b6f-8764-4840-80dd-dfd56ffb46a5',
    'Content-Type': 'application/json',
  },
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}

export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(handleResponse);
}

export function editAvatar(link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: link }),
  }).then(handleResponse);
}

export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}

export function postNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link }),
  }).then(handleResponse);
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
}

export function putLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(handleResponse);
}

export function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
}

export function checkImageLink(link) {
  return fetch(link, {
    method: 'HEAD',
  }).then((res) => {
    if (res.ok) {
      const contentType = res.headers.get('Content-Type');

      if (contentType.startsWith('image')) {
        return res.url;
      } else {
        throw new Error('Ссылка не на изображение');
      }
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
}
