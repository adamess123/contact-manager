// Toggle dropdown menu for filtering
function toggleDropdown() {
  document.getElementById("filter-content").classList.toggle("show");
}

// Add event listener to the filter button
document
  .querySelector(".filter-button")
  .addEventListener("click", function (event) {
    event.stopPropagation(); // Prevents the click from closing the dropdown immediately
    toggleDropdown();
  });

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  let dropdown = document.querySelector(".filter-container");
  if (!dropdown.contains(event.target)) {
    document.getElementById("filter-content").classList.remove("show");
  }
});

// Logout function
document.querySelector(".logoutBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});

// Filter table based on search input
document.getElementById("search").addEventListener("keyup", function () {
  let input = this.value.toLowerCase();
  let rows = document.querySelectorAll("table tr:not(:first-child)");

  rows.forEach((row) => {
    let text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
});

//---------------------------------
// Toggle the Add Contact form open and close
document.querySelector(".addContact").addEventListener("click", function () {
  let form = document.querySelector(".add-contact-form");
  form.style.display = form.style.display === "flex" ? "none" : "flex";
});

// Function to add contact to the table
document.getElementById("saveContact").addEventListener("click", function () {
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let email = document.getElementById("email").value;

  if (firstname === "" || lastname === "" || email === "") {
    alert("Please fill all fields.");
    return;
  }

  let table = document.querySelector("table");
  let newRow = table.insertRow(-1); // Add row at the end

  newRow.innerHTML = `
          <td>${firstname}</td>
          <td>${lastname}</td>
          <td>${email}</td>
          <td>${new Date().toLocaleDateString()}</td>
          <td><button class="editBtn"><i class="fa fa-pencil"></i></button></td>
          <td><button class="deleteBtn"><i class="fa fa-trash-o"></i></button></td>
      `;

  // Clear input fields
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";

  // Hide form after adding
  document.querySelector(".add-contact-form").style.display = "none";

  // Function to enable editing a contact
  function editContact(button) {
    let row = button.closest("tr");
    let cells = row.querySelectorAll("td");

    let firstnameVal = cells[0].innerText;
    let lastnameVal = cells[1].innerText;
    let emailVal = cells[2].innerText;

    // Convert cells into input fields
    cells[0].innerHTML = `<input type="text" value="${firstnameVal}">`;
    cells[1].innerHTML = `<input type="text" value="${lastnameVal}">`;
    cells[2].innerHTML = `<input type="email" value="${emailVal}">`;

    // Change edit button to save button
    button.innerHTML = `<i class="fa fa-save"></i>`;
    button.onclick = function () {
      saveContact(button);
    };
  }

  // Function to save edited contact
  function saveContact(button) {
    let row = button.closest("tr");
    let cells = row.querySelectorAll("td");

    let newFirstname = cells[0].querySelector("input").value;
    let newLastname = cells[1].querySelector("input").value;
    let newEmail = cells[2].querySelector("input").value;

    if (newFirstname === "" || newLastname === "" || newEmail === "") {
      alert("Please fill all fields.");
      return;
    }

    // Set new values
    cells[0].innerText = newFirstname;
    cells[1].innerText = newLastname;
    cells[2].innerText = newEmail;

    // Restore edit button
    button.innerHTML = `<i class="fa fa-pencil"></i>`;
    button.onclick = function () {
      editContact(button);
    };
  }

  // Function to delete a contact instantly
  function deleteContact(button) {
    let row = button.closest("tr");
    row.remove();
  }

  // Event listener for dynamically added buttons
  document.addEventListener("click", function (event) {
    if (event.target.closest(".editBtn")) {
      editContact(event.target.closest(".editBtn"));
    }
    if (event.target.closest(".deleteBtn")) {
      deleteContact(event.target.closest(".deleteBtn"));
    }
  });
});

// Filtering table
function filterTable() {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let firstNameEnabled = document.getElementById("fNameFilter").checked;
  let lastNameEnabled = document.getElementById("lNameFilter").checked;
  let emailEnabled = document.getElementById("emailFilter").checked;

  let table = document.getElementById("contactTable");
  let rows = table.getElementsByTagName("tr");

  for (let i = 1; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    if (cells.length > 0) {
      let firstnameText = cells[0].textContent.toLowerCase();
      let lastnameText = cells[1].textContent.toLowerCase();
      let emailText = cells[2].textContent.toLowerCase();

      let match =
        (firstNameEnabled && firstnameText.includes(searchValue)) ||
        (lastNameEnabled && lastnameText.includes(searchValue)) ||
        (emailEnabled && emailText.includes(searchValue));

      rows[i].style.display = match ? "" : "none";
    }
  }
}

// Attach event listeners to search bar and checkboxes
document.getElementById("search").addEventListener("input", filterTable);
document.getElementById("fNameFilter").addEventListener("change", filterTable);
document.getElementById("lNameFilter").addEventListener("change", filterTable);
document.getElementById("emailFilter").addEventListener("change", filterTable);
