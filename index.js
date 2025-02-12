// toggle between login and signup
function toggleForm(){
    let loginContainer = document.getElementById("login-container");
            let signupContainer = document.getElementById("signup-container");
            
            if (loginContainer.style.display === "none") {
                loginContainer.style.display = "block";
                signupContainer.style.display = "none";
            } else {
                loginContainer.style.display = "none";
                signupContainer.style.display = "block";
            }
}

function login() {
    var form = document.getElementById("login-form");
    var inputs = form.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert("Please fill out all fields.");
            event.preventDefault(); // Prevent form submission
            return false;
        }
    }
    // Submit the form to the next page
    form.action = "second.html"; // Redirect to next page
}

function singup() {
    var form = document.getElementById("signup-form");
    var inputs = form.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            alert("Please fill out all fields.");
            event.preventDefault(); // Prevent form submission
            return false;
        }
    }
    // Submit the form to the next page
    form.action = "second.html"; // Redirect to next page
}