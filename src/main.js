function updateCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const dayOfWeek = now.toLocaleString('en-us', { weekday: 'long' });
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, add 1
    const year = now.getFullYear();

    const timeString = `${hours}:${minutes}:${seconds} \t\t ${dayOfWeek}, ${day}-${month}-${year}`;
    document.getElementById('timeNowDisplay').innerText = `Current Time: ${timeString}`;
}

document.addEventListener('DOMContentLoaded', function() {
    // Update the current time every second
    setInterval(updateCurrentTime, 1000);
});


function updateTitleWithDate() {
    document.title = `Safety Timer`;
}



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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) -1);
    

    return diffDays;
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize with today's formatted date
    const today = formatDate(new Date());
    updateMessage(today); // Use today's date as the default to avoid NaN
    setInterval(updateCurrentTime, 1000);
    // Refresh the page every 60 seconds
    setInterval(updateDays, 1000);
    updateTitleWithDate();
});

function updateDays() {
    const enteredDate = document.getElementById('dateDisplay').textContent.split(': ')[1] || formatDate(new Date());
    updateMessage(enteredDate);
}

function updateMessage(enteredDate) {
    const daysSince = calculateDaysSince(enteredDate);
    document.querySelector('.DayCounter').innerText = daysSince; // Dynamically update the DayCounter number
    document.getElementById('dateDisplay').innerText = `Date Entered: ${enteredDate}`; // Display the entered date
}

function promptForDate() {
    document.getElementById('PromptForDate').style.display = 'block';
}

function submitDate() {
    var enteredDate = document.getElementById('dateInput').value;
    if (!enteredDate) return; // Exit if no date entered

    updateMessage(enteredDate);
    closePrompt();
}

function closePrompt() {
    document.getElementById('PromptForDate').style.display = 'none';
}

document.getElementById('changeDateButton').addEventListener('click', promptForDate);




// Initialize with today's date
const today = formatDate(new Date());
updateMessage(today); // Use today's date as the default

