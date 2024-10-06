document.getElementById('applicationForm').addEventListener('submit', function(event) {
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

    // If valid, display results
    if (valid) {
        displayResults(name, email, phone, department);
    }
});

function displayResults(name, email, phone, department) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Entered Details:</h3>
        <table>
            <tr>
                <th>Name</th>
                <td>${name}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${email}</td>
            </tr>
            <tr>
                <th>Phone Number</th>
                <td>${phone}</td>
            </tr>
            <tr>
                <th>Department</th>
                <td>${department}</td>
            </tr>
        </table>
    `;
}
