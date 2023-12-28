function formatDate(date) {
    const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

function calculateDaysSince(dateEntered) {
    const enteredDate = new Date(dateEntered);
    enteredDate.setHours(0, 0, 0, 0); // Reset time to start of the day

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day

    const diffTime = Math.abs(currentDate - enteredDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

function updateMessage() {
    const today = formatDate(new Date());
    const enteredDate = prompt("Please enter a date (YYYY-MM-DD):", today);
    if (!enteredDate) return; // Exit if no date entered

    function displayMessage() {
        const daysSince = calculateDaysSince(enteredDate);
        const message = `${daysSince} days since last reportable injury`;
        document.getElementById("messageDisplay").innerText = message; // Placeholder for HTML element
    }

    displayMessage(); // Initial display
    setInterval(displayMessage, 60000); // Update every minute
}

updateMessage();

