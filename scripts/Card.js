class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
   
    this._element.querySelector('.element__like').addEventListener('click', (e) => {
      this._handleLikeButton(e);
    });

    this._element.querySelector('.element__trash-icon').addEventListener('click', (e) => {
      this._handleDeleteButton(e);
    });
  }

  // Удаление карточки
  _handleDeleteButton = () => {
    this._element.remove();
  };

  // Лайки
  _handleLikeButton = (e) => {
    e.target.classList.toggle('element__like_active');
  };
}

export { Card };
