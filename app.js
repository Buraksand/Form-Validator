const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const checkEmail = (input) => {
    /* return String(input)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ); */
    if (String(input.value.trim())
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        showSuccess(input)
    } else {
        showError(input, 'email is not valid')
    }
};

function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

function getFieldName(input) {
    console.log(input.id.charAt(0))
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must not be less than ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must not be more than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'passwords do not match');
    }
}

//event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(username.value);

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    checkEmail(email);
    checkPasswordMatch(password, password2);
})