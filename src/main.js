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


/// the enter date pop up ///

document.addEventListener('DOMContentLoaded', function() {
    const today = formatDate(new Date());
    updateMessage(today); // Initialize with today's formatted date
    setInterval(updateCurrentTime, 1000);
    setInterval(updateDays, 1000); // Refresh every second
    updateTitleWithDate();
});

document.addEventListener('keydown', function(event) {
    // Handle the Escape key
    if (event.key === 'Escape' && document.getElementById('PromptForDate').style.display === 'block') {
        closePrompt();
    }
});

function updateDays() {
    const enteredDate = document.getElementById('dateDisplay').textContent.split(': ')[1] || formatDate(new Date());
    updateMessage(enteredDate);
}

function updateMessage(enteredDate) {
    const daysSince = calculateDaysSince(enteredDate);
    document.querySelector('.DayCounter').innerText = daysSince;
    document.getElementById('dateDisplay').innerText = `Date of last injury: ${enteredDate}`;
}

function promptForDate() {
    var dateInputField = document.getElementById('dateInput');
    var existingDate = document.getElementById('dateDisplay').textContent.split(': ')[1];
    dateInputField.value = existingDate || formatDate(new Date()); // Set the value to existing or today's date

    dateInputField.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9-]/g, ''); // Restrict to numbers and hyphens
    });

    dateInputField.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submitDate();
        }
    });

    document.getElementById('PromptForDate').style.display = 'block';
    dateInputField.focus(); // Automatically focus the input field
}


function submitDate() {
    var enteredDate = document.getElementById('dateInput').value;
    if (!enteredDate) return; // Ensure a date is entered

    updateMessage(enteredDate);
    closePrompt();
}

function closePrompt() {
    document.getElementById('PromptForDate').style.display = 'none';
}


//////////////////

document.getElementById('changeDateButton').addEventListener('click', promptForDate);




// Initialize with today's date
const today = formatDate(new Date());
updateMessage(today); // Use today's date as the default

/// cookies ///
// to do, add a option for cookies for the stupid EU users if there are any ever ///

document.cookie = "cookieName=cookieValue; expires=date; path=/;";

function submitDate() {
    var enteredDate = document.getElementById('dateInput').value;
    if (!enteredDate) return;

    // Set cookie that expires in 7 days
    let d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "lastEnteredDate=" + enteredDate + ";" + expires + ";path=/";

    updateMessage(enteredDate);
    closePrompt();
}


document.addEventListener('DOMContentLoaded', function() {
    const lastEnteredDate = getCookie('lastEnteredDate');
    const today = formatDate(new Date());
    const initialDate = lastEnteredDate || today;
    updateMessage(initialDate);
    setInterval(updateCurrentTime, 1000);
    setInterval(updateDays, 1000);
    updateTitleWithDate();
});



