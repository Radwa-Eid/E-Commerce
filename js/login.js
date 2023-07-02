let forget =document.getElementById("forgetPassword");
let loginForm=document.getElementById("login");
let forgetForm=document.getElementById("forgetPassForm");
let cancel=document.getElementById("cancel");

forget.addEventListener("click",function(){
    loginForm.style.display="none";
    forgetForm.style.display="block";
})
cancel.addEventListener("click",function(){
    loginForm.style.display="block";
    forgetForm.style.display="none";
})