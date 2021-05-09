let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let userNameInput = document.getElementById('userNameInput');

let nameError = document.getElementById('nameError');
let emailError = document.getElementById('emailError');
let userNameError = document.getElementById('userNameError');


function checkNameInput() {
    let name = nameInput.value;
    if(name.length <= 3) {
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

    if(!mail.includes('.') || !mail.includes('@')) {
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

    if(username.length < 3) {
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
    if(checkEmailInput() && checkNameInput() && checkUserName()) {
        alert("This page is currently in Development!");
    }
}

class User {
    name;
    email;
}