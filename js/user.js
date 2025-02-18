document.addEventListener("DOMContentLoaded", function () {
    let savedUsername = localStorage.getItem("username") || "User";
    let savedPassword = localStorage.getItem("password") || "password";
    let savedEmail = localStorage.getItem("email") || "user@example.com";

    document.getElementById("username").value = savedUsername;
    document.getElementById("password").value = savedPassword;
    document.getElementById("email").value = savedEmail;

    document.getElementById("accountForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let newUsername = document.getElementById("username").value;
        let newPassword = document.getElementById("password").value;
        let newEmail = document.getElementById("email").value;

        if (newUsername && newPassword && newEmail) {
            localStorage.setItem("username", newUsername);
            localStorage.setItem("password", newPassword);
            localStorage.setItem("email", newEmail);

            alert("Account updated successfully!");
            window.location.href = "second.html"; 
        } else {
            alert("Please fill out all fields.");
        }
    });
    
    function confirmDelete() {
        if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            // Add the logic to delete the account here (e.g., API call to backend)
            alert("Account deleted.");
            window.location.href = 'index.html'; // Redirect after deletion
        }
    }
});