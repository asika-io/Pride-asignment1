document.getElementById('applicationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous errors
    document.querySelectorAll('.error').forEach(error => error.textContent = '');

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const department = document.getElementById('department').value;

    // Validation flags
    let valid = true;

    // Name validation
    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        valid = false;
    }

    // Email validation
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required.';
        valid = false;
    }

    // Phone validation
    if (!/^\d{10}$/.test(phone)) {
        document.getElementById('phoneError').textContent = 'Phone number must be 10 digits.';
        valid = false;
    }

    // Department validation
    if (department === '') {
        document.getElementById('departmentError').textContent = 'Please select a department.';
        valid = false;
    }

    // If valid, submit data to MockAPI
    if (valid) {
        const formData = {
            name,
            email,
            phone,
            department
        };

        try {
            const response = await fetch('https://635d9f3b91f8a6db1e2b99c2.mockapi.io/api/v1/applications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                alert('Failed to submit the application.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the application.');
        }
    }
});

function displayResults(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Application Submitted:</h3>
        <table>
            <tr>
                <th>Name</th>
                <td>${data.name}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${data.email}</td>
            </tr>
            <tr>
                <th>Phone Number</th>
                <td>${data.phone}</td>
            </tr>
            <tr>
                <th>Department</th>
                <td>${data.department}</td>
            </tr>
        </table>
    `;
}
