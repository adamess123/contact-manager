document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("authForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        window.location.href = "second.html"; // Redirect to second.html
    });
});

function toggleForm() {
    const formTitle = document.getElementById("formTitle");
    const toggleText = document.querySelector(".toggle");
    const loginFields = document.getElementById("loginFields");
    const signupFields = document.getElementById("signupFields");

    if (formTitle.innerText === "Login") {
        formTitle.innerText = "Sign Up";
        toggleText.innerText = "Already have an account? Login";
        loginFields.style.display = "none";
        signupFields.style.display = "block";
    } else {
        formTitle.innerText = "Login";
        toggleText.innerText = "Don't have an account? Sign up";
        loginFields.style.display = "block";
        signupFields.style.display = "none";
    }
}
