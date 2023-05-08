$(function () {
  // Sidebar toggle behavior
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');

  });
});
document.getElementById("logout-link").addEventListener("click", function (event) {
  event.preventDefault();
  var confirmLogout = confirm("Are you sure you want to log out?");
  if (confirmLogout) {
    // Perform logout action
    // ...
    deleteSession();
    window.location.href = "../registration.html";
  } else {
    // Cancel logout action
    // ...
  }
});



