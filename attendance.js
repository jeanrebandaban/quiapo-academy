function manualSubmit() {
  
  var studNum = document.getElementById('studNum').value;
  var usersDB = firebase.database().ref("registrationForm");
  usersDB.on('value', (snapshot) => {
    var users = snapshot.val();
    for (const key in users) {
      if (studNum == users[key]["studentNo"]) {
        document.getElementById("studentNumber").value = key;

      }
      
    }

    onSubmit();
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
  });
}

function onSubmit() {
  const studentNumberInput = document.getElementById("studentNumber").value;
  console.log(studentNumberInput);
  if (!studentNumberInput) {
    document.getElementById("status-error").innerHTML = "Error";
    document.getElementById("status-error").classList.remove("hide");
  } else {
    document.getElementById("status-error").innerHTML = "";
    document.getElementById("status-error").classList.remove("hide");
    const studentNumber = studentNumberInput;
    var profilesRef = firebase.database().ref("registrationForm/" + studentNumber);
    profilesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        document.getElementById("status-error").innerHTML = "Error";
        document.getElementById("status-error").classList.remove("hide");
      } else {
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("program").value = data.program;
        document.getElementById("yearLevel").value = data.yearLevel;
        document.getElementById("studentNumber").value = data.studentNo;
        console.log(document.getElementById("studentNumber").value);
      }
    });

    setTimeout(() => {
      console.log(document.getElementById("studentNumber").value);
      if (document.getElementById("studentNumber").value !== "Student Number") {
        const date = new Date();
        const attendanceRef = firebase.database().ref("attendance/" + `${studentNumber}` + "/" + date.toLocaleDateString().replaceAll("/", "-"));

        attendanceRef.once('value', (snapshot) => {
          if (snapshot.exists() && snapshot.val()?.timeIn) {
            attendanceRef.update({
              timeIn: snapshot.val().timeIn,
              timeOut: date.toLocaleTimeString(),
            });
            document.getElementById("status").value = time;
            document.getElementById("status-success").innerHTML = "LOGGED OUT";
            document.getElementById("status-success").classList.remove("hide");
            setTimeout(() => {
              resetFields();
            }, 4000)
          } else {
            attendanceRef.update({
              timeIn: date.toLocaleTimeString()
            });

            document.getElementById("status").value = time;
            document.getElementById("status-success").innerHTML = "LOGGED IN";
            document.getElementById("status-success").classList.remove("hide");
            setTimeout(() => {
              resetFields();
            }, 4000)
          }
        });
      }
    }, 1500); // Add delay to make sure DOM has updated studentNumber
  }
  console.log("10");
}
function resetFields() {

  document.getElementById("status").value = "";
  document.getElementById("firstName").value = "First Name";
  document.getElementById("lastName").value = "Last Name";
  document.getElementById("program").value = "Program";
  document.getElementById("yearLevel").value = "Year Level";
  document.getElementById("studentNumber").value = "Student Number";
  document.getElementById("status-success").innerHTML = "";
  document.getElementById("status-success").classList.add("hide");
  document.getElementById("status-error").innerHTML = "";
  document.getElementById("status-error").classList.add("hide");
  document.getElementById("studNum").value = "";
  document.getElementById("submit").disabled = false;
}
