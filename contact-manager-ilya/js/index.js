const urlBase = "https://sp.poosdisfun.xyz/api";
const extension = "php";

let userId = 0;
let firstname = "";
let lastname = "";

// Display error message in an error container on the page
function displayError(message) {
  let errorElement = document.getElementById("errorMessage");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.id = "errorMessage";
    errorElement.style.color = "red";
    errorElement.style.marginBottom = "10px";
    // Insert at the top of the first container or body
    let container = document.querySelector(".container") || document.body;
    container.insertBefore(errorElement, container.firstChild);
  }
  errorElement.innerText = message;
}

// Clear error messages
function clearError() {
  let errorElement = document.getElementById("errorMessage");
  if (errorElement) {
    errorElement.innerText = "";
  }
}

// Toggle between login and signup forms
function toggleForm() {
  let loginContainer = document.getElementById("login-container");
  let signupContainer = document.getElementById("signup-container");

  clearError();

  if (loginContainer.style.display === "none") {
    loginContainer.style.display = "block";
    signupContainer.style.display = "none";
  } else {
    loginContainer.style.display = "none";
    signupContainer.style.display = "block";
  }
}

// Login function (Sends a POST request to login.php)
function doLogin(event) {
  event.preventDefault();
  clearError();

  userId = 0;
  firstname = "";
  lastname = "";

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!username || !password) {
    displayError("Please fill out all fields.");
    return;
  }

  let tmp = { username: username, password: password };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        try {
          let jsonObject = JSON.parse(xhr.responseText);
          if (jsonObject.error && jsonObject.error !== "") {
            displayError(jsonObject.error);
            return;
          }
          userId = jsonObject.id;
          if (userId < 1) {
            displayError("Invalid username or password.");
            return;
          }
          firstname = jsonObject.firstname;
          lastname = jsonObject.lastname;

          saveCookie();
          window.location.href = "search.html";
        } catch (e) {
          displayError("Error parsing server response.");
        }
      } else {
        displayError("Login error: " + this.status);
      }
    }
  };

  xhr.onerror = function () {
    displayError("An error occurred during the login request.");
  };

  xhr.send(jsonPayload);
}

// Signup function (Sends a POST request to signup.php)
function doSignup(event) {
  event.preventDefault();
  clearError();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  if (!firstName || !lastName || !username || !password) {
    displayError("Please fill out all fields.");
    return;
  }

  let tmp = {
    firstname: firstName,
    lastname: lastName,
    username: username,
    password: password,
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/signup." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        try {
          let jsonObject = JSON.parse(xhr.responseText);
          if (jsonObject.error) {
            displayError(jsonObject.error);
          } else {
            // Display a temporary success message and toggle to login form
            clearError();
            let successElement = document.getElementById("successMessage");
            if (!successElement) {
              successElement = document.createElement("div");
              successElement.id = "successMessage";
              successElement.style.color = "green";
              successElement.style.marginBottom = "10px";
              let container =
                document.querySelector(".container") || document.body;
              container.insertBefore(successElement, container.firstChild);
            }
            successElement.innerText = "Signup successful! You can now log in.";
            setTimeout(() => {
              successElement.innerText = "";
            }, 5000);
            toggleForm();
          }
        } catch (e) {
          displayError("Error parsing server response.");
        }
      } else {
        displayError("Signup error: " + this.status);
      }
    }
  };

  xhr.onerror = function () {
    displayError("An error occurred during the signup request.");
  };

  xhr.send(jsonPayload);
}

// Save user session in a cookie called "session" in format "firstname,lastname,userId"
function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  let cookieValue = encodeURIComponent(
    firstname + "," + lastname + "," + userId
  );
  document.cookie =
    "session=" + cookieValue + "; expires=" + date.toUTCString() + "; path=/";
}

// Read session from cookie and redirect if necessary
function readCookie() {
  userId = -1;
  let cookies = document.cookie.split("; ");
  let sessionCookie = cookies.find((row) => row.startsWith("session="));
  if (sessionCookie) {
    let value = sessionCookie.split("=")[1];
    value = decodeURIComponent(value);
    let parts = value.split(",");
    if (parts.length === 3) {
      firstname = parts[0];
      lastname = parts[1];
      userId = parseInt(parts[2]);
    }
  }
  if (userId < 0) {
    window.location.href = "index.html";
  }
}

// Logout function (Clears session and redirects to login)
function doLogout() {
  userId = 0;
  firstname = "";
  lastname = "";
  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  window.location.href = "index.html";
}
