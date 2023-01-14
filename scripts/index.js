import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { config } from './config.js';
import { FormValidator } from './FormValidator.js';

const popupNameElement = document.querySelector('.popup-name'),
  popupNameForm = popupNameElement.querySelector('.popup__form'),
  popupNameOpenButton = document.querySelector('.profile__edit-button'),
  nameInput= popupNameElement.querySelector('.popup-name__input-name'),
  jobInput= popupNameElement.querySelector('.popup-name__input-job'),



  profileName = document.querySelector('.profile__name'),
  profileJob = document.querySelector('.profile__job'),
  //
  popupPlaceElement = document.querySelector('.popup-place'),
  popupPlaceForm = popupPlaceElement.querySelector('.popup__form'),
  popupPlaceOpenButton = document.querySelector('.profile__add-button'),
  elementsContainer = '.elements',
  placeInput = popupPlaceElement.querySelector('.popup-place__input-place'),
  linkInput = popupPlaceElement.querySelector('.popup-place__input-link'),
  //
  popupImageElement = document.querySelector('.popup-image'),
  popupImagePic = popupImageElement.querySelector('.popup-image__pic'),
  popupImageTitle = popupImageElement.querySelector('.popup-image__title'),
  //все попапы на странице
  popupList = Array.from(document.querySelectorAll('.popup'));

const popupElement = document.querySelector('.popup');

const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};

// Добавление карточки в верстку
const renderCard = (data) => {
  const card = new Card(data, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#element-template', handleCardClick);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },

  elementsContainer
);

cardList.renderItems();


class UserInfo {
  constructor({ profileName, profileJob }) {
    this._profileName = profileName;
    this._profileJob = profileJob;
  }

  getUserInfo() {
    const userInfoFields = {
      profileName: this._profileName.textContent,
      profileJob: this._profileJob.textContent,
    };
    return userInfoFields;
  }

  setUserInfo(data) {
    console.log(data)
    profileName.textContent = data.name;
    profileJob.textContent = data.job;
  }
}

const userData = new UserInfo({ profileName, profileJob});

// Класс Popup
class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this.setEventListeners();
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (event) => {
      const targetClassList = event.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon')) {
        this.close();
      }
    });
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    popupImageTitle.textContent = name;
    popupImagePic.src = link;
    popupImagePic.alt = name;
  }
  setEventListeners() {
    super.setEventListeners();
  }
}

const popupImage = new PopupWithImage(popupImageElement);

class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
    formValidatorPopupName.clearValidation();
    formValidatorPopupName.clearFormInput();

    formValidatorPopupPlace.clearValidation();
    formValidatorPopupPlace.clearFormInput();
  }


  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

const popupName = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      userData.setUserInfo(data)
      popupName.close();
    },
  },
  popupNameElement
);

popupNameOpenButton.addEventListener('click', () => {
  popupName.open();
  nameInput.value = userData.getUserInfo().profileName
  jobInput.value = userData.getUserInfo().profileJob
});


const popupPlace = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      let card = {
        name: data.place,
      };
      renderCard(card);
      popupPlace.close();
    },
  },
  popupPlaceElement
);

popupPlaceOpenButton.addEventListener('click', () => {
  popupPlace.open();
});

// Вызов валидации

const formValidatorPopupName = new FormValidator(config, popupNameForm);
formValidatorPopupName.enableValidation();
const formValidatorPopupPlace = new FormValidator(config, popupPlaceForm);
formValidatorPopupPlace.enableValidation();
