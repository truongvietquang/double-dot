const dropdownEmail = document.querySelector(".dropdown-email")
const user = JSON.parse(sessionStorage.getItem("firebase:authUser:AIzaSyBTdzc-2cYuFwpEqsdwIY0VTPU6AaagFbY:[DEFAULT]"))
const logOut = document.querySelector(".header-dropdown-item:last-child")

if (!user){
    window.location.href = "../html/signIn.html";
}
dropdownEmail.textContent = user.email;
logOut.addEventListener("click",() => {
    firebase
        .auth()
        .signOut()
        .then(() => {
            window.location.href = "../html/signIn.html";
        })
        .catch((error) => {
        
        });
})