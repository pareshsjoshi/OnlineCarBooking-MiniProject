//Common for all .html files including main, pricing, faq, contact-us, book, mybookings pages.
function toggleTheme(mode) {
    if (mode == "light") {
        document.getElementById("main").setAttribute("data-bs-theme", "light");
        document.getElementById("theme-icon").setAttribute("src", "imgs/Theme/light-mode.png");
    }
    else if (mode == "dark") {
        document.getElementById("main").setAttribute("data-bs-theme", "dark");
        document.getElementById("theme-icon").setAttribute("src", "imgs/Theme/dark-mode.png");
    }
}

//Main.html
const controller = new AbortController();
function checkPassMatch(modalFunc) {
    if (modalFunc = "signup") {
        var pswd = document.getElementById("signup-modal-pass").value;
        var cnPswd = document.getElementById("signup-modal-cn-pass").value;
        if (pswd !== cnPswd) {
            document.getElementById("signup-warning").innerHTML = "Password is not matched!";
        }
        else {
            document.getElementById("signup-warning").innerHTML = "";
        }
    }
    if (modalFunc = "forgot") {
        var pswd = document.getElementById("frg-psw-modal-pass").value;
        var cnPswd = document.getElementById("frg-psw-modal-cn-pass").value;
        if (pswd !== cnPswd) {
            document.getElementById("forgot-warning").innerHTML = "Password is not matched!";
        }
        else {
            document.getElementById("forgot-warning").innerHTML = "";
        }
    }
}
function validate(pswd) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pswd);
}
function validatePassword(modalFunc) {
    var signUpPass = document.getElementById("signup-modal-pass").value;
    // var forgotPass = document.getElementById("frg-psw-modal-pass").value;
    if (modalFunc = "signup") {
        var pswd = document.getElementById("signup-modal-pass").value;
    }
    else {
        var pswd = document.getElementById("frg-psw-modal-pass").value;
    }
    //var pswd = document.getElementById("signup-modal-pass").value ? document.getElementById("signup-modal-pass").value : document.getElementById("frg-psw-modal-pass").value;
    if (!validate(pswd)) {
        alert("Enter proper password!");
        controller.abort();
    }
    else {
        setUser();
    }
}
function setUser() {
    alert("All good!");
}

function changeDataFormat(dateString) {
    const date = new Date(dateString);

    const formattedDate = date.toISOString().split('T')[0];

    return formattedDate;
}

//book.html
function getInputs(event) {
    // event.preventDefault();
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var inputAddress = document.getElementById("inputAddress").value;
    var inputCity = document.getElementById("inputCity").value;
    var inputState = document.getElementById("inputState").value;
    var inputPin = document.getElementById("inputPin").value;
    var bookingDate = document.getElementById("bookingDate").value;
    console.log(bookingDate);
    var flexRadioDefault1 = document.getElementById("flexRadioDefault1").checked;
    var flexRadioDefault2 = document.getElementById("flexRadioDefault2").checked;
    var gridCheck = document.getElementById("gridCheck").checked;
    var formData = {
        first_name: fname,
        last_name: lname,
        location: inputAddress,
        city: inputCity,
        state: inputState,
        pincode: inputPin,
        booking_date: bookingDate,
        driver_option: flexRadioDefault1 ? "Individual" : "Self",
        agreement: gridCheck
    }
    fetch('http://localhost:5000/bookings/insert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                document.getElementById('bookingForm').reset();
            }
        })
        .catch(err => {
            console.error('Error placing order:', err);
        });
    // console.log(formData.first_name, formData.last_name, formData.location, formData.city, formData.state, formData.pincode, formData.booking_date, formData.driver_option, formData.agreement);
    // const items = JSON.parse(localStorage.getItem('items')) || [];
    // if (formData.name && formData.address && formData.driver_option) {
    //     items.push(formData);
    // }
    // else {
    //     alert("Please fill in all fields correctly");
    //     return;
    // }
    // localStorage.setItem("items", JSON.stringify(items));
}

//mybookings.html
function updateItem(bkno) {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var inputAddress = document.getElementById("inputAddress").value;
    var inputCity = document.getElementById("inputCity").value;
    var inputState = document.getElementById("inputState").value;
    var inputPin = document.getElementById("inputPin").value;
    var bookingDate = document.getElementById("bookingDate").value;
    var flexRadioDefault1 = document.getElementById("flexRadioDefault1").checked;
    var flexRadioDefault2 = document.getElementById("flexRadioDefault2").checked;
    // var gridCheck = document.getElementById("gridCheck").checked;

    var formData = {
        first_name: fname,
        last_name: lname,
        location: inputAddress,
        city: inputCity,
        state: inputState,
        pincode: inputPin,
        booking_date: bookingDate,
        driver_option: flexRadioDefault1 ? "Individual" : "Self",
        agreement: true,
        booking_no: bkno
    }
    fetch('http://localhost:5000/bookings/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // document.location.reload();
                displayContent();
            }
        })
        .catch(err => {
            console.error('Error placing order:', err);
        });

    // const items = JSON.parse(localStorage.getItem('items')) || [];
    // items[index] = formData;
    // localStorage.setItem("items", JSON.stringify(items));
    // displayContent();
}

function editItem(index) {
    fetch('http://localhost:5000/bookings/fetch')
        .then(response => response.json())
        .then(data => {
            const item = data[index];
            // Clear existing content
            const nameDiv = document.getElementById("bk-name-div" + index);
            const addressDiv = document.getElementById("bk-address-div" + index);
            const driverOptionDiv = document.getElementById("bk-driver-option-div" + index);
            const bookDate = document.getElementById("bk-date-div" + index);
            // Clear previous content in the divs
            nameDiv.innerHTML = "";
            addressDiv.innerHTML = "";
            driverOptionDiv.innerHTML = "";
            bookDate.innerHTML = "";

            // Create and append form elements for 'Name'
            const nameRow = document.createElement('div');
            nameRow.classList.add('row', 'g-3');

            const fnameDiv = document.createElement('div');
            fnameDiv.classList.add('col-md-6');
            const fnameLabel = document.createElement('label');
            fnameLabel.setAttribute('for', 'inputFirstName');
            fnameLabel.classList.add('form-label');
            fnameLabel.textContent = 'First Name';
            const fnameInput = document.createElement('input');
            fnameInput.setAttribute('type', 'text');
            fnameInput.classList.add('form-control');
            fnameInput.setAttribute('id', 'fname');

            fnameInput.required = true;

            fnameDiv.appendChild(fnameLabel);
            fnameDiv.appendChild(fnameInput);
            nameRow.appendChild(fnameDiv);
            fnameInput.value = item.first_name;


            const lnameDiv = document.createElement('div');
            lnameDiv.classList.add('col-md-6');
            const lnameLabel = document.createElement('label');
            lnameLabel.setAttribute('for', 'inputLastName');
            lnameLabel.classList.add('form-label');
            lnameLabel.textContent = 'Last Name';
            const lnameInput = document.createElement('input');
            lnameInput.setAttribute('type', 'text');
            lnameInput.classList.add('form-control');
            lnameInput.setAttribute('id', 'lname');
            lnameInput.value = item.last_name;
            lnameInput.required = true;

            lnameDiv.appendChild(lnameLabel);
            lnameDiv.appendChild(lnameInput);
            nameRow.appendChild(lnameDiv);

            nameDiv.appendChild(nameRow);

            // Create and append form elements for 'Address'
            const addressRow = document.createElement('div');
            addressRow.classList.add('row', 'g-3');

            const addressDivInput = document.createElement('div');
            addressDivInput.classList.add('col-12');
            const addressLabel = document.createElement('label');
            addressLabel.setAttribute('for', 'inputAddress');
            addressLabel.classList.add('form-label');
            addressLabel.textContent = 'Address';
            const addressInput = document.createElement('input');
            addressInput.setAttribute('type', 'text');
            addressInput.classList.add('form-control');
            addressInput.setAttribute('id', 'inputAddress');
            addressInput.value = item.location;
            addressInput.required = true;

            addressDivInput.appendChild(addressLabel);
            addressDivInput.appendChild(addressInput);
            addressRow.appendChild(addressDivInput);

            const cityDiv = document.createElement('div');
            cityDiv.classList.add('col-md-3');
            const cityLabel = document.createElement('label');
            cityLabel.setAttribute('for', 'inputCity');
            cityLabel.classList.add('form-label');
            cityLabel.textContent = 'City';
            const cityInput = document.createElement('input');
            cityInput.setAttribute('type', 'text');
            cityInput.classList.add('form-control');
            cityInput.setAttribute('id', 'inputCity');
            cityInput.value = item.city;
            cityInput.required = true;

            cityDiv.appendChild(cityLabel);
            cityDiv.appendChild(cityInput);
            addressRow.appendChild(cityDiv);

            const stateDiv = document.createElement('div');
            stateDiv.classList.add('col-md-3');
            const stateLabel = document.createElement('label');
            stateLabel.setAttribute('for', 'inputState');
            stateLabel.classList.add('form-label');
            stateLabel.textContent = 'State';
            const stateSelect = document.createElement('select');
            stateSelect.setAttribute('id', 'inputState');
            stateSelect.classList.add('form-select');
            ['Delhi', 'Maharashtra', 'Karnataka'].forEach(state => {
                const option = document.createElement('option');
                option.textContent = state;
                if (state === item.state) {
                    option.selected = true;
                }
                stateSelect.appendChild(option);
            });

            stateDiv.appendChild(stateLabel);
            stateDiv.appendChild(stateSelect);
            addressRow.appendChild(stateDiv);

            const pinDiv = document.createElement('div');
            pinDiv.classList.add('col-md-3');
            const pinLabel = document.createElement('label');
            pinLabel.setAttribute('for', 'inputZip');
            pinLabel.classList.add('form-label');
            pinLabel.textContent = 'Pincode';
            const pinInput = document.createElement('input');
            pinInput.setAttribute('type', 'number');
            pinInput.classList.add('form-control');
            pinInput.setAttribute('id', 'inputPin');
            pinInput.value = item.pincode;
            pinInput.required = true;

            pinDiv.appendChild(pinLabel);
            pinDiv.appendChild(pinInput);
            addressRow.appendChild(pinDiv);

            const bookingDateDiv = document.createElement('div');
            bookingDateDiv.classList.add('col-md-3');
            const bookingDateLabel = document.createElement('label');
            bookingDateLabel.setAttribute('for', 'bookingDate');
            bookingDateLabel.classList.add('form-label');
            bookingDateLabel.textContent = 'Booking Date';
            const bookingDateInput = document.createElement('input');
            bookingDateInput.setAttribute('type', 'date');
            bookingDateInput.classList.add('form-control');
            bookingDateInput.setAttribute('id', 'bookingDate');
            const bkdt = changeDataFormat(item.booking_date);
            bookingDateInput.value = bkdt;
            bookingDateInput.required = true;

            bookingDateDiv.appendChild(bookingDateLabel);
            bookingDateDiv.appendChild(bookingDateInput);
            addressRow.appendChild(bookingDateDiv);

            addressDiv.appendChild(addressRow);

            // Create and append form elements for 'Driver Option'
            const driverRow = document.createElement('div');
            driverRow.classList.add('row', 'g-3');

            const driverOptionLabel = document.createElement('label');
            driverOptionLabel.classList.add('form-label');
            driverOptionLabel.setAttribute('for', 'driverOption');
            driverOptionLabel.textContent = 'Driver Option';

            const individualDiv = document.createElement('div');
            individualDiv.classList.add('col-md-4');
            const individualRadio = document.createElement('input');
            individualRadio.setAttribute('type', 'radio');
            individualRadio.setAttribute('name', 'driverOption');
            individualRadio.setAttribute('id', 'flexRadioDefault1');
            individualRadio.classList.add('form-check-input');
            individualRadio.checked = item.driver_option === 'Individual';
            const individualLabel = document.createElement('label');
            individualLabel.setAttribute('for', 'flexRadioDefault1');
            individualLabel.classList.add('form-check-label');
            individualLabel.textContent = 'Individual';

            individualDiv.appendChild(individualRadio);
            individualDiv.appendChild(individualLabel);
            driverRow.appendChild(individualDiv);

            const selfDiv = document.createElement('div');
            selfDiv.classList.add('col-md-4');
            const selfRadio = document.createElement('input');
            selfRadio.setAttribute('type', 'radio');
            selfRadio.setAttribute('name', 'driverOption');
            selfRadio.setAttribute('id', 'flexRadioDefault2');
            selfRadio.classList.add('form-check-input');
            selfRadio.checked = item.driver_option === 'Self';
            const selfLabel = document.createElement('label');
            selfLabel.setAttribute('for', 'flexRadioDefault2');
            selfLabel.classList.add('form-check-label');
            selfLabel.textContent = 'Self';

            selfDiv.appendChild(selfRadio);
            selfDiv.appendChild(selfLabel);
            driverRow.appendChild(selfDiv);

            driverOptionDiv.appendChild(driverOptionLabel);
            driverOptionDiv.appendChild(driverRow);

            // Update buttons for edit and cancel
            const editBtn = document.getElementById("bk-edit-btn" + index);
            editBtn.textContent = "Update";
            editBtn.removeEventListener('click', () => {
                editItem(item, index); // Pass item and index to editItem
            }); // Remove any old event listener first (if any)
            editBtn.addEventListener('click', function () {
                updateItem(item.booking_no);
            });

            const cancelBtn = document.getElementById("bk-cancel-btn" + index);
            cancelBtn.textContent = "Cancel";
            cancelBtn.removeEventListener('click', () => {
                deleteItem(item.booking_no); // Pass booking_no to deleteItem
            }); // Remove any old event listener first (if any)
            cancelBtn.addEventListener('click', function () {
                displayContent();
            });
        })
        .catch(err => {
            console.error('Error placing order:', err);
        });
}

function deleteItem(bkno) {
    if (confirm("Your want to delete?")) {
        fetch('http://localhost:5000/bookings/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ booking_no: bkno })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                displayContent();
            })
            .catch(error => {
                console.error('Error canceling order:', error);
            });
    }
}

function displayContent() {
    fetch('http://localhost:5000/bookings/display')
        .then(response => response.json())
        .then(data => {
            const bookings = document.getElementById('bookings');
            bookings.innerHTML = '';  // Clear any previous content

            if (data.length === 0) {
                // Create a row for "No Data" message
                const noDataRow = document.createElement('tr');
                const noDataCell = document.createElement('td');
                noDataCell.setAttribute('colspan', '5');  // Make it span across all columns
                noDataCell.classList.add('no-data');
                noDataCell.textContent = 'No Data';
                noDataRow.appendChild(noDataCell);
                bookings.appendChild(noDataRow);
            } else {
                data.forEach((item, index) => {
                    // Create the main row for the booking item
                    const tr = document.createElement('tr');
                    tr.classList.add('booking-row', 'row', 'g-3');

                    // Create the first td (for booking info)
                    const tdInfo = document.createElement('td');
                    tdInfo.classList.add('infos', 'col-md-10');

                    // Create the row for booking details
                    const infoRow = document.createElement('div');
                    infoRow.classList.add('row', 'g-3');
                    infoRow.setAttribute('id', `bk-info-row${index}`);

                    // Booking No
                    const bkNoDiv = document.createElement('div');
                    bkNoDiv.classList.add('col-6');
                    bkNoDiv.setAttribute('id', `bk-no-div${index}`);
                    const bkNoLabel = document.createElement('span');
                    bkNoLabel.innerHTML = '<b>Booking No: </b>';
                    const bkNoValue = document.createElement('span');
                    bkNoValue.textContent = item.booking_no;
                    bkNoDiv.appendChild(bkNoLabel);
                    bkNoDiv.appendChild(bkNoValue);

                    // Name
                    const bkNameDiv = document.createElement('div');
                    bkNameDiv.classList.add('col-6');
                    bkNameDiv.setAttribute('id', `bk-name-div${index}`);
                    const bkNameLabel = document.createElement('span');
                    bkNameLabel.innerHTML = '<b>Name: </b>';
                    const bkNameValue = document.createElement('span');
                    bkNameValue.textContent = item.name;
                    bkNameDiv.appendChild(bkNameLabel);
                    bkNameDiv.appendChild(bkNameValue);

                    // Address
                    const bkAddressDiv = document.createElement('div');
                    bkAddressDiv.classList.add('col-12');
                    bkAddressDiv.setAttribute('id', `bk-address-div${index}`);
                    const bkAddressLabel = document.createElement('span');
                    bkAddressLabel.innerHTML = '<b>Address: </b>';
                    const bkAddressValue = document.createElement('span');
                    bkAddressValue.textContent = item.address;
                    bkAddressDiv.appendChild(bkAddressLabel);
                    bkAddressDiv.appendChild(bkAddressValue);

                    // Driver Option
                    const bkDriverOptionDiv = document.createElement('div');
                    bkDriverOptionDiv.classList.add('col-6');
                    bkDriverOptionDiv.setAttribute('id', `bk-driver-option-div${index}`);
                    const bkDriverOptionLabel = document.createElement('span');
                    bkDriverOptionLabel.innerHTML = '<b>Driver Option: </b>';
                    const bkDriverOptionValue = document.createElement('span');
                    bkDriverOptionValue.textContent = item.driver_option;
                    bkDriverOptionDiv.appendChild(bkDriverOptionLabel);
                    bkDriverOptionDiv.appendChild(bkDriverOptionValue);
                    console.log(item.driver_option);

                    // Booking Date
                    const bkDateDiv = document.createElement('div');
                    bkDateDiv.classList.add('col-6');
                    bkDateDiv.setAttribute('id', `bk-date-div${index}`);
                    const bkDateLabel = document.createElement('span');
                    bkDateLabel.innerHTML = '<b>Booking Date: </b>';
                    const bkDateValue = document.createElement('span');
                    const bkdt = changeDataFormat(item.booking_date);
                    bkDateValue.textContent = bkdt;
                    bkDateDiv.appendChild(bkDateLabel);
                    bkDateDiv.appendChild(bkDateValue);

                    // Append all the booking detail divs to the info row
                    infoRow.appendChild(bkNoDiv);
                    infoRow.appendChild(bkNameDiv);
                    infoRow.appendChild(bkAddressDiv);
                    infoRow.appendChild(bkDriverOptionDiv);
                    infoRow.appendChild(bkDateDiv);

                    // Append the infoRow div to the tdInfo
                    tdInfo.appendChild(infoRow);

                    // Create the second td (for buttons)
                    const tdButtons = document.createElement('td');
                    tdButtons.classList.add('butns', 'col-md-2');

                    // Create the buttons container
                    const buttonsDiv = document.createElement('div');
                    buttonsDiv.classList.add('btns', 'row', 'g-3');
                    buttonsDiv.setAttribute('id', `bk-btns-row${index}`);

                    // Create the edit button
                    const editDiv = document.createElement('div');
                    editDiv.classList.add('col-12');
                    const editButton = document.createElement('button');
                    editButton.classList.add('btn', 'btn-primary');
                    editButton.setAttribute('type', 'button');
                    editButton.setAttribute('id', `bk-edit-btn${index}`);
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', () => {
                        editItem(index); // Pass item and index to editItem
                    });
                    editDiv.appendChild(editButton);

                    // Create the delete button
                    const deleteDiv = document.createElement('div');
                    deleteDiv.classList.add('col-12');
                    const deleteButton = document.createElement('button');
                    deleteButton.classList.add('btn', 'btn-danger');
                    deleteButton.setAttribute('type', 'button');
                    deleteButton.setAttribute('id', `bk-cancel-btn${index}`);
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        deleteItem(item.booking_no); // Pass booking_no to deleteItem
                    });
                    deleteDiv.appendChild(deleteButton);

                    // Append the buttons div to the tdButtons
                    buttonsDiv.appendChild(editDiv);
                    buttonsDiv.appendChild(deleteDiv);

                    // Append the tdButtons to the tr
                    tdButtons.appendChild(buttonsDiv);

                    // Finally, append both td elements to the tr
                    tr.appendChild(tdInfo);
                    tr.appendChild(tdButtons);

                    // Append the row to the bookings table
                    bookings.appendChild(tr);
                });
            }
        })
        .catch(err => {
            console.log("Error fetching bookings", err);
        });
}
