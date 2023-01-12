import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { config } from './config.js';
import { FormValidator } from './FormValidator.js';

const popupNameElement = document.querySelector('.popup-name'),
  popupNameForm = popupNameElement.querySelector('.popup__form'),
  popupNameOpenButton = document.querySelector('.profile__edit-button'),
  nameInput = popupNameElement.querySelector('.popup-name__input-name'),
  jobInput = popupNameElement.querySelector('.popup-name__input-job'),
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

const handleCardClick = () => {
  popupImage.open();
};


// Закрытие попапа по клику
// popupList.forEach((popup) => {
//   popup.addEventListener('mousedown', (event) => {
//     const targetClassList = event.target.classList;
//     if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon')) {
//       closePopup(popup);
//     }
//   });
// });

//   document.addEventListener('keydown', handleKeyDown);
// };

// // Закрытие попапа
// const closePopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleKeyDown);
// };

// // Открытие попапа профиля
// popupNameOpenButton.addEventListener('click', () => {
//   openPopup(popupNameElement);
//   // сброс инпутов и ошибки валидации
//   formValidatorPopupName.clearValidation();
//   formValidatorPopupName.clearFormInput();

//   // Перенос текстовых полей
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// });

// Открытие попапа добавления элементов
// popupPlaceOpenButton.addEventListener('click', () => {
//   openPopup(popupPlaceElement);
//   // сброс инпутов и ошибки валидации
//   formValidatorPopupPlace.clearValidation();
//   formValidatorPopupPlace.clearFormInput();
//   // переключение сабмита
//   formValidatorPopupPlace.toggleSubmitBtn();
// });

// Закрытие попапа по клавише Esc
// function handleKeyDown(e) {
//   if (e.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     closePopup(popup);
//   }
// }

// Увеличение картинки

// Добавление карточки в верстку
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

// const renderCard = (data, elementsContainer) => {
//   const card = new Card(data, '#element-template', handleCardOpen);
//   const cardElement = card.generateCard();
//   elementsContainer.prepend(cardElement);
// };

// initialCards.forEach((data) => {
//   renderCard(data, elementsContainer, handleCardOpen);
// });

// const addCard = (e) => {
//   e.preventDefault();
//   const card = {
//     name: placeInput.value,
//     link: linkInput.value,
//   };

//   renderCard(card, elementsContainer);

//   closePopup(popupPlaceElement);
//   e.target.reset();
// };

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
    this._userInfoFields = data;
    console.log(this._userInfoFields);
  }
}

const userData = new UserInfo({ profileName: profileName, profileJob: profileJob });

// Класс Popup
class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      const popup = document.querySelector('.popup_opened');
      close();
    }
  }

  setEventListeners() {

    this._popupSelector.addEventListener('mousedown', (event) => {

      const targetClassList = event.target.classList;
      if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon')) {
        close();
      }
    });
  }
}

// popupList.forEach((popup) => {
//   popup.addEventListener('mousedown', (event) => {
//     const targetClassList = event.target.classList;
//     if (targetClassList.contains('popup') || targetClassList.contains('popup__close-icon')) {
//       closePopup(popup);
//     }
//   });
// });

// popupNameOpenButton.addEventListener('click', () => {
//   openPopup(popupNameElement);
//     console.log(popupNameElement)
// })
// const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
// }

// Класс PopupWithImage


class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open() {
    super.open();

  console.log(cardList)
    // popupImageTitle.textContent = name;
    // popupImagePic.src = link;
    // popupImagePic.alt = name;
  }
  setEventListeners() {
    super.setEventListeners();
  }

}

const popupImage = new PopupWithImage(popupImageElement);
popupImage.setEventListeners()


class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
    const newuserData =  userData.getUserInfo()
    this._formValues = newuserData
    return this._formValues

  }

  close() {
    super.close();
    formValidatorPopupName.clearValidation();
    formValidatorPopupName.clearFormInput();
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
    this._popupSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

const popupName = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      const newuserData= userData.getUserInfo();
      console.log( userData.setUserInfo(data))
      popupName.close()
    },

  },
  popupNameElement

);

popupNameOpenButton.addEventListener('click', () => {
  popupName.open();
});
popupName.setEventListeners();
// Класс UserInfo

// Перенос текстовых полей
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;

// nameInput = popupNameElement.querySelector('.popup-name__input-name'),
//   jobInput = popupNameElement.querySelector('.popup-name__input-job'),

// const editProfileValue = (e) => {
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   closePopup(popupNameElement);
//   e.preventDefault();
// };

// Слушатели кнопок submit
// popupNameForm.addEventListener('submit', editProfileValue);
// popupPlaceForm.addEventListener('submit', cardList);

// Вызов валидации

const formValidatorPopupName = new FormValidator(config, popupNameForm);
formValidatorPopupName.enableValidation();
const formValidatorPopupPlace = new FormValidator(config, popupPlaceForm);
formValidatorPopupPlace.enableValidation();
