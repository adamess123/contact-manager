// Toggle dropdown menu for filtering
function toggleDropdown() {
    document.getElementById("filter-content").classList.toggle("show");
}

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
