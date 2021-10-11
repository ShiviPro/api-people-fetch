const mainContent = document.querySelector("#api-output");
const sortAsc = document.querySelector("#sort-asc");
const sortDes = document.querySelector("#sort-des");
let people = [];

const removePerson = (event) => {
  const person = event.target.parentNode;
  let currId = parseInt(person.querySelector("#person-id").innerText);
  people = people.filter((person) => person.id !== currId);
  person.remove();
};

const updatePeople = (person) => {
  let currPerson = {
    id: person.id,
    username: person.username,
    email: person.email,
    address: `${person.address.suite}, ${person.address.street}, ${person.address.city} - ${person.address.zipcode}`,
    coordinates: `${person.address.geo.lat}, ${person.address.geo.lng}`,
    phone: person.phone,
    website: person.website,
    company: person.company.name,
    cpCatchPhrase: person.company.catchPhrase,
    cpBs: person.company.bs,
  };
  people.push(currPerson);
  return currPerson;
};

const fetchPeople = (people, isAlreadyPopulated) => {
  people.forEach((person, index) => {
    if (!isAlreadyPopulated) {
      var currPerson = updatePeople(person);
    } else var currPerson = people[index];
    let personElem = document.createElement("article");
    personElem.classList.add("person");
    personElem.innerHTML = `
          <p><span class="info-label">Id:</span> <span id="person-id">${currPerson.id}</span></p>
          <p><span class="info-label">Username:</span> ${currPerson.username}</p>
          <p><span class="info-label">Email:</span> ${currPerson.email}</p>
          <details>
              <summary class="info-label">Address</summary>
              ${currPerson.address}
          </details>
          <p><span class="info-label">Coordinates:</span> ${currPerson.coordinates}<p>
          <p><span class="info-label">Phone:</span> ${currPerson.phone}</p>
          <p><span class="info-label">Website:</span> ${currPerson.website}</p>
          <details>
              <summary class="info-label">Company: ${currPerson.company}</summary>
              <p><em>${currPerson.cpCatchPhrase}</em></p>
              <p><strong>${currPerson.cpBs}</strong></p>
          </details>
          <button id="delete-btn" class="btn delete-btn">Delete</button>
      `;
    mainContent.appendChild(personElem);
    const deleteBtns = document.querySelectorAll(".delete-btn");
    const currDeleteBtn = deleteBtns[deleteBtns.length - 1];
    currDeleteBtn.addEventListener("click", removePerson);
  });
};

const populatePeopleData = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((people) => fetchPeople(people, false));
};

const compareInc = (firstEl, secondEl) => {
  if (firstEl.username < secondEl.username) {
    return -1;
  }
  if (firstEl.username > secondEl.username) {
    return 1;
  } else return 0;
};

const compareDes = (firstEl, secondEl) => {
  if (secondEl.username < firstEl.username) {
    return -1;
  }
  if (secondEl.username > firstEl.username) {
    return 1;
  } else return 0;
};

const sortAscending = () => {
  people.sort(compareInc);
  mainContent.innerHTML = ``;
  console.log(people);
  fetchPeople(people, true);
};

const sortDescending = () => {
  people.sort(compareDes);
  mainContent.innerHTML = ``;
  console.log(people);
  fetchPeople(people, true);
};

const enableSorting = () => {
  sortAsc.addEventListener("click", sortAscending);
  sortDes.addEventListener("click", sortDescending);
};

populatePeopleData();
enableSorting();
