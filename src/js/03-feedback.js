import throttle from "lodash.throttle";

// Отримаємо доступ до нашої форми
const formRef = document.querySelector(".feedback-form");
const LOCALE_STORAGE_KEY = "feedback-form-state";

import { save, load, remove } from "./localStorage";

initPage();

const onFormInput = (event) => {
  const { name, value } = event.target;

  let saveData = load(LOCALE_STORAGE_KEY);
  saveData = saveData ? saveData : {};

  saveData[name] = value;
  save(LOCALE_STORAGE_KEY, saveData);
};

// const throttledOnFormInput = throttle(onFormInput, 300);

const throttledFormInput = throttle(onFormInput, 3000);
formRef.addEventListener("input", throttledFormInput);

/*
Пишемо функцію яка буде інтепритувати наш обʼєкт 
в JSON формат. Визивати будемо її на почтаку скрипта
*/

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);

  if (!saveData) {
    return;
  }

  Object.entries(saveData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}

const handleSubmit = (event) => {
  event.preventDefault();

  const {
    elements: { email, message },
  } = event.currentTarget;

  // Виводимо в консоль наш обʼєкт

  console.log({ email: email.value, message: message.value });

  event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
};

formRef.addEventListener("submit", handleSubmit);
