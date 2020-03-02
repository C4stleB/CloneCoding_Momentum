const form = document.querySelector(".js-form"), 
    input = document.querySelector("input"), 
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}    

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function deleteName(event){
    localStorage.removeItem(USER_LS);
    greeting.classList.remove(SHOWING_CN);
    form.classList.add(SHOWING_CN);
}

function paintGreeting(text) {
    const delBtn = document.createElement("button");
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`
    delBtn.innerText = "✘";
    delBtn.addEventListener("click", deleteName);
    delBtn.className = "delBtn";
    greeting.appendChild(delBtn);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        askForName();
    } else {
        paintGreeting(currentUser)
    }
}

function init() {
    loadName();
}

init(); 