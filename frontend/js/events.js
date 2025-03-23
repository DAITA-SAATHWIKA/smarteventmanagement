document.addEventListener("DOMContentLoaded", function () {
    categorizeEvents();
});

function categorizeEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    let upcomingContainer = document.getElementById("upcoming-list");
    let liveContainer = document.getElementById("live-list");
    let completedContainer = document.getElementById("completed-list");

    let now = new Date();

    let upcomingEvents = [];
    let liveEvents = [];
    let completedEvents = [];

    events.forEach(event => {
        let eventStart = new Date(`${event.date} ${event.startTime}`);
        let eventEnd = new Date(`${event.date} ${event.endTime}`);

        if (now < eventStart) {
            upcomingEvents.push(event);
        } else if (now >= eventStart && now <= eventEnd) {
            liveEvents.push(event);
        } else {
            completedEvents.push(event);
        }
    });

    displayEvents(upcomingContainer, upcomingEvents);
    displayEvents(liveContainer, liveEvents);
    displayEvents(completedContainer, completedEvents);

    checkEmptyRedirect("upcoming-list", "no-upcoming.html");
    checkEmptyRedirect("live-list", "no-live.html");
    checkEmptyRedirect("completed-list", "no-completed.html");
}

function displayEvents(container, events) {
    if (!container) return;

    container.innerHTML = "";

    if (events.length === 0) {
        container.innerHTML = "<p>No events available.</p>";
        return;
    }

    events.forEach(event => {
        let eventDiv = document.createElement("div");
        eventDiv.classList.add("entry");
        eventDiv.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.startTime} - ${event.endTime}</p>
            <p><strong>Venue:</strong> ${event.venue}</p>
        `;
        container.appendChild(eventDiv);
    });
}

function checkEmptyRedirect(containerId, redirectPage) {
    let container = document.getElementById(containerId);
    if (container && container.innerHTML === "") {
        window.location.href = redirectPage;
    }
}

function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.left = menu.style.left === "0px" ? "-250px" : "0px";
}
