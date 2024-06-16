var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var signUpArray = [];



function signUp() {
    if (!isEmpty()) {
        document.getElementById("signupError").innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };

    if (isEmailExist(signUp.email)) {
        document.getElementById("signupError").innerHTML = '<span class="text-danger m-3">Email already exists</span>';
    } else {
        signUpArray.push(signUp);
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById("signupError").innerHTML = '<span class="text-success m-3">Success</span>';
        location.replace('index.html');
    }
}

function isLoginEmpty() {
    return !(signinEmail.value === "" || signinPassword.value === "");
}

function login() {
    if (!isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }

    var email = signinEmail.value;
    var password = signinPassword.value;
    var users = JSON.parse(localStorage.getItem('users')) || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === email.toLowerCase() && users[i].password === password) {
            localStorage.setItem('sessionUsername', users[i].name);
            location.replace('home.html');
            return;
        }
    }
    document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
}

function isEmpty() {
    return !(signupName.value === "" || signupEmail.value === "" || signupPassword.value === "");
}

function isEmailExist(email) {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === email.toLowerCase()) {
            return true;
        }
    }
    return false;
}
function logout() {
    localStorage.removeItem('sessionUsername');
    location.replace('login.html');
}
