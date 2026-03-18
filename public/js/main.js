var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

// Check maintenance status when page loads
fetch('http://localhost:5000/api/status')
    .then(res => res.json())
    .then(data => {
        if(data.maintenance) {
            document.body.innerHTML = "<div style='text-align:center; padding:100px;'><h1>Under Maintenance</h1><p>We'll be back shortly!</p></div>";
        }
    });

function opentab(tabname) {
    // Remove the active class from all links
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    // Hide all tab contents
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    // Add active class back to the clicked link and show content
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// FILE: js/main.js

const contactForm = document.querySelector('form[name="submit-to-google-sheet"]');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop the page from refreshing

    // Collect data from the form
    const formData = {
        name: contactForm.Name.value,
        email: contactForm.Email.value,
        message: contactForm.Message.value
    };

    // Send data to your Node.js backend
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert("Message sent successfully!");
            contactForm.reset(); // Clear the form
        } else {
            alert("Something went wrong. Please try again.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Server is currently offline.");
    });
});