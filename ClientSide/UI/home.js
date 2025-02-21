// Hardcoded data for emails
const emails = [
    {
        "id": 1,
        "sender": "john.doe@example.com",
        "message": "Congratulations on getting a role at Ekomi! We're excited to have you join the team and look forward to working with you.",
        "details": "John Doe is a Software Engineer at Ekomi. He specializes in backend development and has been with the company for 3 years."
    },
    {
        "id": 2,
        "sender": "jane.smith@example.com",
        "message": "Welcome to Ekomi! Your role is crucial, and we're thrilled to have you onboard.",
        "details": "Jane Smith is the Product Manager at Ekomi. She has been working in tech for 5 years and loves organizing teams."
    },
    {
        "id": 3,
        "sender": "alice.jones@example.com",
        "message": "Excited to see you joining the Ekomi family. We believe you'll do amazing things here!",
        "details": "Alice Jones is a Data Analyst at Ekomi. She's passionate about data science and machine learning."
    },
    {
        "id": 4,
        "sender": "bob.brown@example.com",
        "message": "Welcome to Ekomi! We're happy to have you as part of our team. Looking forward to seeing your contributions!",
        "details": "Bob Brown is a Senior Developer at Ekomi. He enjoys tackling complex problems and mentoring junior developers."
    },
    {
        "id": 5,
        "sender": "charlie.davis@example.com",
        "message": "We're delighted to have you on board at Ekomi! Let's make great things happen together.",
        "details": "Charlie Davis is a Marketing Manager at Ekomi. He has extensive experience in digital marketing and social media."
    },
    {
        "id": 6,
        "sender": "diana.wilson@example.com",
        "message": "Congratulations! You're joining an awesome team at Ekomi. Looking forward to collaborating with you.",
        "details": "Diana Wilson is an HR Specialist at Ekomi. She is responsible for recruitment and employee engagement."
    },
    {
        "id": 7,
        "sender": "eve.martin@example.com",
        "message": "Welcome to Ekomi! We are all looking forward to working with you and achieving great things together.",
        "details": "Eve Martin is the Chief Operating Officer at Ekomi. She manages operations and ensures smooth team collaboration."
    },
    {
        "id": 8,
        "sender": "frank.white@example.com",
        "message": "Welcome aboard! We’re thrilled you’re joining Ekomi. Let’s build something amazing.",
        "details": "Frank White is a Sales Manager at Ekomi. He’s focused on expanding the company’s reach and building customer relations."
    },
    {
        "id": 9,
        "sender": "grace.moore@example.com",
        "message": "Ekomi is lucky to have you! We are excited for your future here.",
        "details": "Grace Moore is a UX Designer at Ekomi. She has a passion for creating user-friendly and beautiful interfaces."
    },
    {
        "id": 10,
        "sender": "henry.clark@example.com",
        "message": "Welcome to the team at Ekomi! Together, we can accomplish great things.",
        "details": "Henry Clark is a Project Manager at Ekomi. He has years of experience in managing cross-functional teams."
    }
];

// Function to render email list
function renderEmails() {
    const emailsList = document.getElementById('emails-list');
    emails.forEach(email => {
        const emailItem = document.createElement('div');
        emailItem.classList.add('email-item');
        
        emailItem.innerHTML = `
            <div class="email-sender">${email.sender}</div>
            <div class="email-message">${email.message}</div>
            <a href="mailto:${email.sender}" class="view-more">View more about the sender</a>
        `;

        emailItem.addEventListener('click', () => {
            sessionStorage.setItem('userDetails', JSON.stringify(email));
            window.location.href = 'user-details.html';
        });

        emailsList.appendChild(emailItem);
}

// Initialize email list
renderEmails();
