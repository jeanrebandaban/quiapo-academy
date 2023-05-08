
//registration

const registration = "registrationForm";
// reference your database
var regFormDB = firebase.database().ref(registration);

document.getElementById("registrationForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  var appType = document.forms["registrationForm"]["user-type"].value;
  var firstName = getElementVal("registerFName");
  var lastName = getElementVal("registerLName");
  var email = getElementVal("registerEmail");
  var contactNo = getElementVal("typePhone");
  var pass = getElementVal("registerPassword");
  var pass2 = getElementVal("registerRepeatPassword");
  var bday = getElementVal("birthdate");
  var gender = document.forms["registrationForm"]["gender"].value;
  var yearLevel = getElementVal("year_input");
  var program = getElementVal("prog_input");

  if (pass !== pass2) {
    alert("Passwords do not match");
    return false;
  }

  if (pass.length < 6) {
    alert("Password must be at least 6 characters long. Please choose a longer password.")
    return false;
  }


  saveMessages(appType, firstName, lastName, email, contactNo, pass, pass2, bday, gender, yearLevel, program);


  //   reset the form

  document.getElementById("registrationForm").reset();
  $('.modal-body').html("Account registration successful. Please wait for admin activation before logging in. Thank you.");

  $('#exampleModal').modal('show');
}

const saveMessages = (appType, firstName, lastName, email, contactNo, pass, pass2, bday, gender, yearLevel, program) => {
  var newRegForm = regFormDB.push();

  newRegForm.set({
    appType: appType,
    firstName: firstName,
    lastName: lastName,
    email: email,
    contactNo: contactNo,
    pass: pass,
    pass2: pass2,
    bday: bday,
    gender: gender,
    yearLevel: yearLevel,
    program: program
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};

const userTypeRadios = document.querySelectorAll('input[name="user-type"]');
const studentFields = document.querySelector('#student-fields');

// Show/hide student fields when user type is changed
userTypeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'teacher') {
      studentFields.style.display = 'none';
    } else {
      studentFields.style.display = 'block';
    }
  });
});
function setYear(year) {
  var yearInput = document.getElementById("year_input");
  yearInput.value = year;
  var yearLabel = document.getElementById("yearLabel" + year).innerHTML;
  var button = document.getElementById("yearLevelLabel");
  button.innerHTML = yearLabel;
}

function setProgram(prog) {
  var progInput = document.getElementById("prog_input");
  progInput.value = prog;
  var button = document.getElementById("programLabel");
  button.innerHTML = prog;
}

function validateForm() {
  var user = document.forms["registrationForm"]["user-type"].value;

  if (user == "student") {
    let x = document.forms["registrationForm"]["year"].value;
    if (x == "") {
      alert("Year must be filled out");
      return false;
    }
  }

}

