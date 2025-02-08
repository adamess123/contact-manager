document.getElementById("authForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    const formTitle = document.getElementById("formTitle").innerText;

    if (formTitle === "Sign Up") {
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const newUsername = document.getElementById("newUsername").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();

        if (!firstName || !lastName || !email || !newUsername || !newPassword) {
            alert("Please fill in all sign-up fields.");
            return;
        }

        console.log("Sign-up successful");
        window.location.href = "second.html"; 
    } else {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!username || !password) {
            alert("Please enter your username and password.");
            return;
        }

        console.log("Login successful");
        window.location.href = "second.html";
    }
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
