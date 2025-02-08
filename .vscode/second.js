// Toggle dropdown menu for filtering
function toggleDropdown() {
    document.getElementById("filter-content").classList.toggle("show");
}

// Add event listener to the filter button
document.querySelector(".filter-button").addEventListener("click", function(event) {
    event.stopPropagation(); // Prevents the click from closing the dropdown immediately
    toggleDropdown();
});


// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    let dropdown = document.querySelector(".filter-container");
    if (!dropdown.contains(event.target)) {
        document.getElementById("filter-content").classList.remove("show");
    }
});

// Logout function
document.querySelector(".logoutBtn").addEventListener("click", function() {
    window.location.href = "first.html";
});

// Filter table based on search input
document.getElementById("search").addEventListener("keyup", function() {
    let input = this.value.toLowerCase();
    let rows = document.querySelectorAll("table tr:not(:first-child)");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
});

//---------------------------------
// Toggle the Add Contact form
document.querySelector(".addContact").addEventListener("click", function() {
    document.querySelector(".add-contact-form").style.display = "flex";
});

// Function to add contact to the table
document.getElementById("saveContact").addEventListener("click", function() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;

    if (firstName === "" || lastName === "" || email === "") {
        alert("Please fill all fields.");
        return;
    }

    let table = document.querySelector("table");
    let newRow = table.insertRow(-1); // Add row at the end

    newRow.innerHTML = `
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${email}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td><button class="editBtn"><i class="fa fa-pencil"></i></button></td>
        <td><button class="deleteBtn"><i class="fa fa-trash-o"></i></button></td>
    `;

    // Clear input fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";

    // Hide form after adding
    document.querySelector(".add-contact-form").style.display = "none";
});