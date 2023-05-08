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

	$(document).ready(function () {
		// Activate tooltip
		$('[data-toggle="tooltip"]').tooltip();

		// Select/Deselect checkboxes
		var checkbox = $('table tbody input[type="checkbox"]');
		$("#selectAll").click(function () {
			if (this.checked) {
				checkbox.each(function () {
					this.checked = true;
				});
			} else {
				checkbox.each(function () {
					this.checked = false;
				});
			}
		});
		checkbox.click(function () {
			if (!this.checked) {
				$("#selectAll").prop("checked", false);
			}
		});
	});
});

var user = getLoggedInUser();
if (user == null || user["appType"] != "admin") {
	alert("You must login to access this page.");
	window.location.href = "../registration.html";
}