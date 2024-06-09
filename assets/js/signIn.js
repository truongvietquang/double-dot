import Validation from "./Validation.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginButton = document.querySelector(".login-button");
const inputError = document.querySelectorAll(".input-error");
const successMessage = document.querySelector(".success-message");
const errorMessage = document.querySelector(".error-message");
const loader = document.querySelector(".loader");
const loginButtonText = document.querySelector(".login-button-text");

function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const emailValue = email.value;
  const psValue = password.value;
  const validation = new Validation(emailValue, psValue);
  const [nodeEmailErr, nodePwErr] = inputError;
  validation.toggleErr(nodeEmailErr, validation.error.email);
  validation.toggleErr(nodePwErr, validation.error.password);

  if (isEmpty(validation.error)) {
    let isSuccess = false;
    loginButton.style.pointerEvents = "none";
    loader.style.display = "block";
    loginButtonText.style.display = "none";

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth()
        .signInWithEmailAndPassword(emailValue, psValue)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          successMessage.style.display = "block";
          window.location.href = "../html/admin.html";
  
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000)
        })
        
        .catch((error) => {
          var errorCode = error.code;
          var errMsg = error.message;
          console.log(errorCode);
          console.log(errorMessage);
  
          if(errorCode === "auth/internal-error"){
            errorMessage.textContent = "Thông tin sai";
          } else if(errorCode = "auth/too-many-request"){
            errorMessage.textContent = "Có quá nhiều yêu cầu";
          } else if(errMsg){
            errorMessage.textContent = errMsg;
          }
  
          errorMessage.style.display = "block";
  
          setTimeout(() => {
            errorMessage.style.display = "none";
          }, 3000);
        })
        .finally(() => {
          loginButton.style.pointerEvents = "auto";
          loader.style.display = "none";
          loginButtonText.style.display = "block";
        });
      })


  }
});
