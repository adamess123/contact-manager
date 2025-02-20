const urlBase = "https://sp.poosdisfun.xyz/api";
const extension = "php";

let userId = 0;
let firstname = "";
let lastname = "";

// Toggle between login and signup forms
function toggleForm() {
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

// Login function (Sends a POST request to login.php)
function doLogin(event) {
  event.preventDefault();

  userId = 0;
  firstname = "";
  lastname = "";

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill out all fields.");
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
            alert(jsonObject.error);
            return;
          }
          userId = jsonObject.id;
          if (userId < 1) {
            alert("Invalid username or password.");
            return;
          }
          firstname = jsonObject.firstname;
          lastname = jsonObject.lastname;

          saveCookie();
          window.location.href = "search.html";
        } catch (e) {
          alert("Error parsing server response.");
        }
      } else {
        alert("Login error: " + this.status);
      }
    }
  };

  xhr.onerror = function () {
    alert("An error occurred during the login request.");
  };

  xhr.send(jsonPayload);
}

// Signup function (Sends a POST request to signup.php)
function doSignup(event) {
  event.preventDefault();

  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  if (!firstName || !lastName || !username || !password) {
    alert("Please fill out all fields.");
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
            alert(jsonObject.error);
          } else {
            alert("Signup successful! You can now log in.");
            toggleForm();
          }
        } catch (e) {
          alert("Error parsing server response.");
        }
      } else {
        alert("Signup error: " + this.status);
      }
    }
  };

  xhr.onerror = function () {
    alert("An error occurred during the signup request.");
  };

  xhr.send(jsonPayload);
}

// Save user session in a cookie
function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "firstname=" +
    firstname +
    "; " +
    "lastname=" +
    lastname +
    "; " +
    "userId=" +
    userId +
    "; expires=" +
    date.toUTCString();
}

// Read session from cookie and redirect if necessary
function readCookie() {
  userId = -1;
  let data = document.cookie.split("; ");

  for (let i = 0; i < data.length; i++) {
    let [key, value] = data[i].split("=");
    if (key === "firstname") firstname = value;
    if (key === "lastname") lastname = value;
    if (key === "userId") userId = parseInt(value);
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
  document.cookie = "firstname=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "lastname=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}
