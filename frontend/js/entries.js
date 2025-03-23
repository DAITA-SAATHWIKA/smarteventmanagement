document.addEventListener("DOMContentLoaded", function () {
    loadEntries();
});

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    let entriesContainer = document.getElementById("entries-list");
    entriesContainer.innerHTML = "";

    if (entries.length === 0) {
        entriesContainer.innerHTML = "<p>No events registered yet.</p>";
        return;
    }

    let upcomingEvents = [];
    let liveEvents = [];
    let completedEvents = [];

    let currentTime = new Date();

    entries.forEach(event => {
        let eventDateTime = new Date(`${event.date} ${event.time}`);

        if (eventDateTime > currentTime) {
            upcomingEvents.push(event);
        } else {
            let eventEndTime = new Date(eventDateTime);
            eventEndTime.setHours(eventEndTime.getHours() + 2); // Assuming event lasts 2 hours

            if (currentTime < eventEndTime) {
                liveEvents.push(event);
            } else {
                completedEvents.push(event);
            }
        }

        let entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `
            <h3>Event: ${event.eventName || "N/A"}</h3>
            <p><strong>Date:</strong> ${event.date || "N/A"}</p>
            <p><strong>Time:</strong> ${event.time || "N/A"}</p>
            <p><strong>Venue:</strong> ${event.venue || "N/A"}</p>
            <p><strong>Seating Area:</strong> ${event.seatingArea || "N/A"}</p>
        `;
        entriesContainer.appendChild(entryDiv);
    });

    // Redirect if no events exist
    document.getElementById("upcoming-events").addEventListener("click", function () {
        if (upcomingEvents.length === 0) {
            window.location.href = "no-upcoming.html";
        } else {
            window.location.href = "upcoming-events.html";
        }
    });

    document.getElementById("live-events").addEventListener("click", function () {
        if (liveEvents.length === 0) {
            window.location.href = "no-live.html";
        } else {
            window.location.href = "live-events.html";
        }
    });

    document.getElementById("completed-events").addEventListener("click", function () {
        if (completedEvents.length === 0) {
            window.location.href = "no-completed.html";
        } else {
            window.location.href = "completed-events.html";
        }
    });
}

function toggleMenu() {
    let menu = document.getElementById("menu");
    menu.style.left = menu.style.left === "0px" ? "-250px" : "0px";
}

document.addEventListener("click", function (event) {
    let menu = document.getElementById("menu");
    let menuIcon = document.querySelector(".menu-icon");

    if (!menu.contains(event.target) && !menuIcon.contains(event.target)) {
        menu.style.left = "-250px";
    }
});
