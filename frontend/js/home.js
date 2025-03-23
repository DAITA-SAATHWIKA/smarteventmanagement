document.addEventListener('DOMContentLoaded', function() {
    loadEvents();
});

function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.left = menu.style.left === "0px" ? "-250px" : "0px";
}

document.addEventListener('click', function(event) {
    const menu = document.getElementById("menu");
    const menuIcon = document.querySelector(".menu-icon");

    if (!menu.contains(event.target) && event.target !== menuIcon) {
        menu.style.left = "-250px";
    }
});

function loadEvents() {
    const eventsContainer = document.getElementById("events-container");
    const events = JSON.parse(localStorage.getItem("events")) || [];

    eventsContainer.innerHTML = "";
    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
            <button onclick="openSeatingOptions('${event.name}', '${event.date}', '${event.time}', '${event.venue}')">Register</button>
        `;
        eventsContainer.appendChild(eventDiv);
    });
}

function openSeatingOptions(eventName, date, time, venue) {
    document.getElementById("selected-event").textContent = `Registering for: ${eventName}`;
    document.getElementById("seating-modal").style.display = "block";

    document.getElementById("seating-modal").dataset.event = eventName;
    document.getElementById("seating-modal").dataset.date = date;
    document.getElementById("seating-modal").dataset.time = time;
    document.getElementById("seating-modal").dataset.venue = venue;
}

function closeModal() {
    document.getElementById("seating-modal").style.display = "none";
}

function confirmRegistration() {
    const selectedOption = document.querySelector('input[name="seating"]:checked');
    if (!selectedOption) {
        alert("Please select a seating area before registering.");
        return;
    }

    const seatingArea = selectedOption.value;
    const eventName = document.getElementById("seating-modal").dataset.event;
    const date = document.getElementById("seating-modal").dataset.date;
    const time = document.getElementById("seating-modal").dataset.time;
    const venue = document.getElementById("seating-modal").dataset.venue;

    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    entries.push({ eventName, date, time, venue, seatingArea });
    localStorage.setItem("entries", JSON.stringify(entries));

    alert(`You have successfully registered for ${eventName} in ${seatingArea}`);
    closeModal();
}

function logout() {
    alert("Logged out successfully!");
    window.location.href = "index.html";
}
