/**************************************************************************************************
 * MARS 2020
 * Author: M.H, Mctom Spdo
 * Project: MARS 2020
 * 
 * Page: Newsletter
 * Descripton: This is the Newsletter sign up JS.
 **************************************************************************************************/

let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let userNameInput = document.getElementById('userNameInput');

let nameError = document.getElementById('nameError');
let emailError = document.getElementById('emailError');
let userNameError = document.getElementById('userNameError');

let box = document.getElementById("box");


function checkNameInput() {
    let name = nameInput.value;
    if (name.length <= 3) {
        nameError.innerHTML = "The name must be at least 3 characters long!";
        nameError.style.display = "block";
        return false;
    }

    nameError.innerHTML = "";
    nameError.style.display = "none"
    return true;
}
nameInput.addEventListener("keyup", checkNameInput);

function checkEmailInput() {
    let mail = emailInput.value;

    if (!mail.includes('.') || !mail.includes('@')) {
        emailError.innerHTML = "The Email must be valid!"
        emailError.style.display = "block";
        return false;
    }

    emailError.innerHTML = "";
    emailError.style.display = "none";
    return true;
}
emailInput.addEventListener("keyup", checkEmailInput);

function checkUserName() {
    let username = userNameInput.value;

    if (username.length < 3) {
        userNameError.innerHTML = "The Username bust be at least 5 characters long!";
        userNameInput.style.display = "block";
        return false;
    }

    userNameError.innerHTML = "";
    userNameError.style.display = "none";
    return true;
}
userNameInput.addEventListener("keyup", checkUserName);

function sendInput() {
    if (checkEmailInput() && checkNameInput() && checkUserName()) {
        signUp();
    }
}

document.getElementById("sendButton").addEventListener('click', () => {
    sendInput();
    event.preventDefault();
});

function signUp() {
    let userc = new User(userNameInput.value, nameInput.value, emailInput.value);
    box.innerHTML = `<h1>Congrats!</h1><p>You signed up sucesssfully for the Newletter!</p><p>It will be sent to ${userc.email}.`
    console.log(userc);
}
class User {
    username;
    name;
    email;

    constructor(username, name, email) {
        this.username = username;
        this.name = name;
        this.email = email;
    }
}