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
    //var inputs = form.getElementsByTagName("input");
    //for (var i = 0; i < inputs.length; i++) {
    //    if (inputs[i].value === "") {
    //        alert("Please fill out all fields.");
    //        event.preventDefault(); // Prevent form submission
    //        return false;
    //    }
    //}
    // Submit the form to the next page
    form.action = "search.html"; // Redirect to next page
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
    form.action = "search.html"; // Redirect to next page
}
function doLogin(event) {
    event.preventDefault(); // Prevent page refresh

    // Retrieve field values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create the data object
    const data = { username, password };

    // Send request to PHP endpoint
    fetch("api/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.error) {
            console.error("Login error:", result.error);
            // Show the error in the UI
        } else {
            console.log("Login successful:", result);
            // Handle successful login
		sessionStorage.setItem("userData", JSON.stringify(result));
		window.location.href = "search.html";
		// Redirect to next page
        }
    })
    .catch(error => console.error("Fetch error:", error));
}

