/* 
   FinTrack Pro
   Authentication
*/

const USER_KEY = "fintrack_user";

const loginForm = document.getElementById("loginForm");

const registerForm = document.getElementById("registerForm");

/* 
   Password Toggle
 */

const togglePassword = document.getElementById("togglePassword");

if(togglePassword){

    togglePassword.addEventListener("click",()=>{

        const input=document.getElementById("loginPassword");

        if(input.type==="password"){

            input.type="text";

            togglePassword.classList.replace("fa-eye","fa-eye-slash");

        }else{

            input.type="password";

            togglePassword.classList.replace("fa-eye-slash","fa-eye");

        }

    });

}

const toggleRegister=document.getElementById("toggleRegisterPassword");

if(toggleRegister){

    toggleRegister.addEventListener("click",()=>{

        const input=document.getElementById("registerPassword");

        if(input.type==="password"){

            input.type="text";

            toggleRegister.classList.replace("fa-eye","fa-eye-slash");

        }else{

            input.type="password";

            toggleRegister.classList.replace("fa-eye-slash","fa-eye");

        }

    });

}

//    Register 

if(registerForm){

    registerForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const username=document
        .getElementById("registerUsername")
        .value.trim();

        const password=document
        .getElementById("registerPassword")
        .value.trim();

        if(username==="" || password===""){

            Utils.showToast("Please fill all fields." , "error");

            return;

        }

        const user={

            username,

            password

        };

        localStorage.setItem(

            USER_KEY,

            JSON.stringify(user)

        );
        
        Utils.showToast("Registration Successful!");

        window.location.href="index.html";

    });

}

/*
   Login 
*/

if(loginForm){

    loginForm.addEventListener("submit",(e)=>{

        e.preventDefault();

        const username=document
        .getElementById("loginUsername")
        .value.trim();

        const password=document
        .getElementById("loginPassword")
        .value.trim();

        const user=JSON.parse(

            localStorage.getItem(USER_KEY)

        );

        if(!user){

            Utils.showToast("No account found. Please register.");

            window.location.href="register.html";

            return;

        }

        if(

            username===user.username &&

            password===user.password

        ){

            localStorage.setItem(

                "loggedIn",

                "true"

            );

            localStorage.setItem(

                "profile",

                JSON.stringify({

                    name:user.username,

                    currency:"USD"

                })

            );

            window.location.href="dashboard.html";

        }else{

            Utils.showToast("Invalid username or password.");

        }

    });

}

/* 
   Protect Dashboard
*/

if(

    location.pathname.includes("dashboard") ||

    location.pathname.includes("settings")

){

    if(

        localStorage.getItem("loggedIn")!=="true"

    ){

        location.href="index.html";

    }

}

/*
   Logout
*/

const logout=document.getElementById("logoutBtn");

if(logout){

    logout.addEventListener("click",()=>{

        localStorage.removeItem("loggedIn");

        location.href="index.html";

    });

}