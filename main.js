const requestUrl = 'https://jsonplaceholder.typicode.com/users';
const toDoWrapper = document.getElementById('to-do-wrapper');
const users = document.querySelectorAll('.data-item');
const St = document.querySelectorAll('Status1');
let index = 0;
let inProcessAllow = true;
let isDoneAllow = true;
let arr = [];
const inProcessWrapper = document.createElement('div');
const isDoneWrapper = document.createElement('div');
const createTemplate = (data) => {
  return `
        <div class="data-item" data-btn="${index}">
            <div><span>Id:</span>${data.id}</div>
            <div><span>Name:</span>${data.name}</div>
            <div><span>Username:</span>${data.username}</div>
            <div><span>Address:</span>${data.address.city}</div>
            <div><span>Company:</span>${data.company.name}</div>
        </div>
  
    `;
};

//получение даних із сервера
fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data) {
      data.forEach((items) => {
        index++;
        toDoWrapper.innerHTML += createTemplate(items);
        //arr.push(items);
      });
    }
  });
//-----**************************************----

//смена класа на *** In process ***
const changeClassInProcess = (el, e) => {
  if (e) {
    inProcessWrapper.id = 'in-process-wrapper';
    toDoWrapper.after(inProcessWrapper);
    inProcessWrapper.appendChild(document.createElement('span'));
    inProcessWrapper.firstChild.innerHTML = 'in process';
    inProcessWrapper.firstChild.classList.add('name-section');
  }
  inProcessWrapper.appendChild(el);
};
//-----**************************************----

//смена класа на *** Done ***
const changeClassIsDone = (el, e) => {
  if (e) {
    isDoneWrapper.id = 'is-done-wrapper';
    inProcessWrapper.after(isDoneWrapper);
    isDoneWrapper.appendChild(document.createElement('span'));
    isDoneWrapper.firstChild.innerHTML = 'Done';
    isDoneWrapper.firstChild.classList.add('name-section');
  }
  isDoneWrapper.appendChild(el);
};
//-----**************************************----

toDoWrapper.addEventListener('click', (e) => {
  changeClassInProcess(e.target, inProcessAllow);
  inProcessAllow = false;
});

inProcessWrapper.addEventListener('click', (e) => {
  changeClassIsDone(e.target, e);
  isDoneAllow = false;
});
