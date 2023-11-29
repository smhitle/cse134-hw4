let nameErrors = new Set();
let emailErrors = new Set();
let commentsErrors = new Set();
let nameError;
let emailError;
let commentsError;

window.onload = () => {
    let ls = localStorage;
    let body = document.querySelector("body");
    let main = document.querySelector("main");
    let toggleBtn = document.getElementById("toggle");

    if (!ls.getItem("theme")){
        ls.setItem("theme", "light");
        toggleBtn.textContent = "☀️";
    } else {
        if (ls.getItem("theme") === "light"){
            body.classList.remove("dark-mode-body");
            main.classList.remove("dark-mode-main");
            toggleBtn.textContent = "☀️";
            ls.setItem("theme", "light");
            body.classList.add("light-mode-body");
            main.classList.add("light-mode-main");
        } else {
            body.classList.remove("light-mode-body");
            main.classList.remove("light-mode-main");
            toggleBtn.textContent = "🌙";
            ls.setItem("theme", "dark");
            body.classList.add("dark-mode-body");
            main.classList.add("dark-mode-main");
        }
    }
    nameError = document.getElementById("name-error");
    emailError = document.getElementById("email-error");
    commentsError = document.getElementById("comments-error");

    nameError.addEventListener("animationend", () => {
        nameError.classList.remove("error");
    })

    emailError.addEventListener("animationend", () => {
        emailError.classList.remove("error");
    })

    commentsError.addEventListener("animationend", () => {
        commentsError.classList.remove("error");
    })
}

function formSubmit(e){
    e.preventDefault();

    let comments = document.getElementById("comments");
    let email = document.getElementById("email");
    let nameInput = document.getElementById("name");

    let form = e.target;

    let dict = {}

    let arr = [];

    let nameArr = [];
    let emailArr = [];
    let commentsArr = []

    nameErrors.forEach(err => {
        nameArr.push(err);
    });

    emailErrors.forEach(err => {
        emailArr.push(err);
    });

    commentsErrors.forEach(err => {
        commentsArr.push(err);
    });

    dict.nameErrors = nameArr;
    dict.emailErrors = emailArr;
    dict.commentsErrors = commentsArr;

    arr.push(dict);

    let errorField = document.createElement("input");
    errorField.type = "text";
    errorField.name = "form_errors";
    errorField.value = JSON.stringify(arr);
    errorField.style.display = "none";

    form.appendChild(errorField);

    if (comments.checkValidity() && email.checkValidity() && nameInput.checkValidity()){
        form.submit();
    } else {
        document.getElementById("submit-error").textContent = "Error: field(s) are invalid";
    }
}

function validateName(){
    let nameInput = document.getElementById("name");
    let nameError = document.getElementById("name-error");
    let nameInfo = document.getElementById("name-info");

    let input = nameInput.value.substr(0,nameInput.value.length - 1);

    if (!nameInput.checkValidity()){
        nameInfo.textContent = "";
        nameInput.style.backgroundColor = "#fcd2e0"
        if (nameInput.validity.patternMismatch){
            nameInput.value = input;
            nameInput.setCustomValidity("Entered invalid character, letters only");
            nameError.textContent = nameInput.validationMessage;
            nameErrors.add(nameInput.validationMessage)
        } else if (nameInput.validity.tooShort){
            nameInput.setCustomValidity("Minimum length requirement not met");
            nameError.textContent = nameInput.validationMessage;
            nameErrors.add(nameInput.validationMessage)
        } else if (nameInput.validity.valueMissing){
            nameInput.setCustomValidity("Missing value");
            nameError.textContent = nameInput.validationMessage;
            nameErrors.add(nameInput.validationMessage)
        } 
        else {
            nameInput.setCustomValidity("");
            nameError.textContent = nameInput.validationMessage;
        }
        nameError.classList.add("error");
    } else {
        nameInput.setCustomValidity("");
        nameError.textContent = "";
        nameInput.style.backgroundColor = "#dbffe5"
        nameInfo.textContent = "Name is valid";
    }
}

function validateEmail(){
    let email = document.getElementById("email");
    let emailInfo = document.getElementById("email-info");
    let emailError = document.getElementById("email-error");

    let input = email.value.substr(0,email.value.length - 1);

    if (!email.checkValidity()){
        emailInfo.textContent = "";
        email.style.backgroundColor = "#fcd2e0";
        if (email.validity.patternMismatch){
            email.value = input;
            email.setCustomValidity("Entered invalid character");
            emailError.textContent = email.validationMessage;
            emailErrors.add(email.validationMessage)
        } else if (email.validity.tooShort){
            email.setCustomValidity("Minimum length requirement not met");
            emailError.textContent = email.validationMessage;
            emailErrors.add(email.validationMessage)
        } else if (email.validity.valueMissing){
            email.setCustomValidity("Missing value");
            emailError.textContent = email.validationMessage;
            emailErrors.add(email.validationMessage)
        } else {
            email.setCustomValidity("");
            emailError.textContent = email.validationMessage;
        }
        emailError.classList.add("error");
    } else {
        email.setCustomValidity("");
        emailError.textContent = "";
        email.style.backgroundColor = "#dbffe5";
        emailInfo.textContent = "Email is valid";
    }
}

function validateComment(){
    let comments = document.getElementById("comments");
    let commentsInfo = document.getElementById("comments-info");
    let commentsError = document.getElementById("comments-error");

    commentsInfo.classList.remove("warning");
    commentsInfo.classList.remove("max");

    let input = comments.value.substr(0,comments.value.length - 1);

    let messageRegex = /^[A-Za-z0-9 !@#$%^&*,.:;`~]+$/

    if (comments.value.length > 0 && !messageRegex.test(comments.value)){
        comments.value = input;
        comments.style.backgroundColor = "#fcd2e0"
        commentsError.textContent = "Invalid character";
        commentsErrors.add("Invalid character")
        commentsError.classList.add("error");
    } else if (!comments.checkValidity()){
        comments.style.backgroundColor = "#fcd2e0"
        if (comments.validity.tooShort) {
            comments.setCustomValidity("Minimum length requirement not met");
            commentsError.textContent = comments.validationMessage;
            commentsErrors.add(comments.validationMessage)
        } else if (comments.validity.valueMissing){
            comments.setCustomValidity("Missing value");
            commentsError.textContent = comments.validationMessage;
            commentsErrors.add(comments.validationMessage)
        } else if (comments.validity.tooLong){
            comments.setCustomValidity("Max length reached");
            commentsError.textContent = comments.validationMessage;
            commentsErrors.add(comments.validationMessage)
        } else {
            comments.setCustomValidity("");
            commentsError.textContent = comments.validationMessage;
        }
        commentsError.classList.add("error");
    } else {
        comments.setCustomValidity("");
        commentsError.textContent = "";
        comments.style.backgroundColor = "#dbffe5"
    }

    let infoMsg = "";
    
    if (comments.value.length < comments.getAttribute("maxlength")){
        infoMsg = "";
        commentsInfo.classList.add("good");
    }
    if (comments.getAttribute("maxlength") - comments.value.length <= 20){
        infoMsg = "Warning: approaching max limit";
        commentsInfo.classList.add("warning");
    }
    if (comments.value.length == comments.getAttribute("maxlength")){
        infoMsg = "Max limit";
        commentsInfo.classList.add("max");
    }

    commentsInfo.innerHTML = `${comments.value.length}/${comments.getAttribute("maxlength")} ${infoMsg}`
}

function theme(){
    let ls = localStorage;
    let toggleBtn = document.getElementById("toggle");
    let main = document.querySelector("main");
    let body = document.querySelector("body");

    if (ls.getItem("theme") === "light"){
        body.classList.remove("light-mode-body");
        main.classList.remove("light-mode-main");
        toggleBtn.textContent = "🌙";
        ls.setItem("theme", "dark");
        body.classList.add("dark-mode-body");
        main.classList.add("dark-mode-main");
    } else {
        body.classList.remove("dark-mode-body");
        main.classList.remove("dark-mode-main");
        toggleBtn.textContent = "☀️";
        ls.setItem("theme", "light");
        body.classList.add("light-mode-body");
        main.classList.add("light-mode-main");
    }
}