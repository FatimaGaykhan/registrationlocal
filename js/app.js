 const form = document.getElementById('form');
 const username = document.getElementById('username');
 const email = document.getElementById('email');
 const password = document.getElementById('password');
 const password2 = document.getElementById('password2');

if(localStorage.getItem('users') === null){
    localStorage.setItem('users',JSON.stringify([]))
}
function signUp(){
// let form_ = document.getElementById('form').value;
let user_name = document.getElementById('username').value;
let e_mail = document.getElementById('email').value;
let password_ = document.getElementById('password').value;
// const password2_ = document.getElementById('password2').value;

if(user_name===null || e_mail===null || password_===null){
    return;
}else{
       let user_info={
        Username:user_name,
        Email:e_mail,
        Password:password_
       }

       let user_info_str=JSON.stringify(user_info)

       let clientArr=JSON.parse(localStorage.getItem('users')) || [];

       const userExist=clientArr.find(user=> JSON.stringify(user)===user_info_str);

        if(userExist){
        return alert('Bu adda istifadəçi artıq qeydiyyatdan keçmişdir')
        }
        clientArr.push(user_info);
         localStorage.setItem('users', JSON.stringify(clientArr));
    }
}


 form.addEventListener('submit', e => {
     e.preventDefault();

     validateInputs();
 });

 const setError = (element, message) => {
     const inputControl = element.parentElement;
     const errorDisplay = inputControl.querySelector('.error');

     errorDisplay.innerText = message;
     inputControl.classList.add('error');
     inputControl.classList.remove('success')
 }

 const setSuccess = element => {
     const inputControl = element.parentElement;
     const errorDisplay = inputControl.querySelector('.error');

     errorDisplay.innerText = '';
     inputControl.classList.add('success');
     inputControl.classList.remove('error');
 };

 const isValidEmail = email => {
     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required')
    }else if(!(usernameValue[0].toUpperCase()=== usernameValue[0]))
    {
        setError(username,'Username must start with Uppercase');
    } 
    else{
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 6 && passwordValue>10 ) {
        setError(password, 'Password must be at least 6 character and maximum 10 character .')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};