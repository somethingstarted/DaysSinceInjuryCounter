function formatDate(date) {
    const d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

function calculateSecondsSince(dateEntered) {
    const enteredDate = new Date(dateEntered);
    enteredDate.setHours(0, 0, 0, 0); // Reset time to start of the day

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset time to start of the day

    const diffTime = Math.abs(currentDate - enteredDate);
    const diffSeconds = Math.floor(diffTime / 1000); // convert milliseconds to seconds

    return diffSeconds;
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize with today's formatted date
    const today = formatDate(new Date());
    updateMessage(today); // Use today's date as the default to avoid NaN

    // Refresh the display every second
    setInterval(function() {
        updateMessage(formatDate(new Date())); // Update with the current time
    }, 1000); // refresh every second
});

function updateMessage(enteredDate) {
    const secondsSince = calculateSecondsSince(enteredDate);
    document.querySelector('.clock-number').innerText = secondsSince; // Dynamically update the clock number
    document.getElementById('dateDisplay').innerText = `Date Entered: ${enteredDate}`; // Display the entered date
}

function promptForDate() {
    const today = formatDate(new Date());
    const enteredDate = prompt("Please enter a date (YYYY-MM-DD):", today);
    if (!enteredDate) return; // Exit if no date entered

    updateMessage(enteredDate);
}

document.getElementById('changeDateButton').addEventListener('click', promptForDate);




// Initialize with today's date
const today = formatDate(new Date());
updateMessage(today); // Use today's date as the default

