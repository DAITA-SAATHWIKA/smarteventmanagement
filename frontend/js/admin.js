document.addEventListener("DOMContentLoaded", function () {
    loadEvents();
});

// Toggle Sidebar Menu
function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

// Show Selected Section
function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });
    document.getElementById(sectionId).classList.add("active");
}

// Add Event Function
function addEvent() {
    const name = document.getElementById("event-name").value;
    const capacity = document.getElementById("event-capacity").value;
    const date = document.getElementById("event-date").value;
    const time = document.getElementById("event-time").value;
    const venue = document.getElementById("event-venue").value;

    if (!name || !capacity || !date || !time || !venue) {
        alert("Please fill all fields!");
        return;
    }

    const events = JSON.parse(localStorage.getItem("events")) || [];
    events.push({ name, capacity, date, time, venue });
    localStorage.setItem("events", JSON.stringify(events));

    loadEvents();
    alert("Event Added Successfully!");
}

// Load Events into Manage Section
function loadEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";

    events.forEach((event, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${event.name}</strong> | ${event.date} | ${event.time} | ${event.venue} | ${event.capacity} people
            <button onclick="editEvent(${index})">Edit</button>
            <button onclick="deleteEvent(${index})">Delete</button>
        `;
        eventList.appendChild(listItem);
    });
}

// Edit Event Function
function editEvent(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    const newName = prompt("Enter new event name:", events[index].name);
    const newCapacity = prompt("Enter new capacity:", events[index].capacity);
    const newDate = prompt("Enter new date:", events[index].date);
    const newTime = prompt("Enter new time:", events[index].time);
    const newVenue = prompt("Enter new venue:", events[index].venue);

    if (newName && newCapacity && newDate && newTime && newVenue) {
        events[index] = { name: newName, capacity: newCapacity, date: newDate, time: newTime, venue: newVenue };
        localStorage.setItem("events", JSON.stringify(events));
        loadEvents();
    }
}

// Delete Event Function
function deleteEvent(index) {
    const events = JSON.parse(localStorage.getItem("events"));
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    loadEvents();
}

// Logout Function
function logout() {
    alert("Logged out successfully!");
    window.location.href = "index.html";
}
