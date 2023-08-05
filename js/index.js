var isAdmin = "false";

function validate() {
  var uname = document.forms["login-form"]["username"].value;
  var pswd = document.forms["login-form"]["password"].value;
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(xhttp.readyState = 4 && xhttp.status == 200)
			isAdmin = xhttp.responseText;
	};
	xhttp.open("GET", "php/validateCredentials.php?action=is_admin&uname=" + uname + "&pswd=" + pswd, true);
	xhttp.send();
}

function validateCredentials() {
  if(isAdmin == "true")
    return true;
  alert("Username or password invalid!");
  return false;
}


function validateAndSetup() {
  var pharmacy_name = document.getElementById('pharmacy_name');
  var address = document.getElementById('address');
  var email = document.getElementById('email');
  var contact_number = document.getElementById('contact_number');
  //var profile_image = document.getElementById('profile_image');
  var username = document.getElementById('username');
  var password = document.getElementById('password');
  var confirm_password = document.getElementById('confirm_password');
  if(!validateName(pharmacy_name.value, 'pharmacy_name_error'))
    pharmacy_name.focus();
  else if(!validateAddress(address.value, 'address_error'))
    address.focus();
  else if(!notNull(email.value, 'email_error'))
    email.focus();
  else if(!validateContactNumber(contact_number.value, 'contact_number_error'))
    contact_number.focus();
  else if(!notNull(username.value, 'username_error'))
    username.focus();
  else if(username.value.indexOf(' ') >= 0) {
    document.getElementById('username_error').style.display = "block";
    document.getElementById('username_error').innerHTML = "mustn't contain spaces!";
    username.focus();
  }
  else if(password.value.indexOf(' ') >= 0) {
    document.getElementById('password_error').style.display = "block";
    document.getElementById('password_error').innerHTML = "mustn't contain spaces!";
    password.focus();
  }
  else if(password.value.length < 6) {
    document.getElementById('password_error').style.display = "block";
    document.getElementById('password_error').innerHTML = "must be of length 6 or more characterss!";
    password.focus();
  }
  else if(password.value != confirm_password.value) {
    document.getElementById('password_error').style.display = "none";
    document.getElementById('confirm_password_error').style.display = "block";
    document.getElementById('confirm_password_error').innerHTML = "password mismatch!";
    confirm_password.focus();
  }
  else {
    document.getElementById('confirm_password_error').style.display = "none";
    var confirmation = prompt("Please type 'CONFIRM' below to complete setup!");
    if(confirmation == "CONFIRM") {
      var xhttp = new XMLHttpRequest();
    	xhttp.onreadystatechange = function() {
    		if(xhttp.readyState = 4 && xhttp.status == 200)
    			alert(xhttp.responseText);
    	};
    	xhttp.open("GET", "php/validateCredentials.php?action=store_admin_info&pharmacy_name=" + pharmacy_name.value + "&address=" + address.value + "&email=" + email.value + "&contact_number=" + contact_number.value + "&username=" + username.value + "&password=" + password.value, true);
    	xhttp.send();
      return true;
    }
  }
  return false;
}

function isSetupDone() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      xhttp.responseText;
      //alert(xhttp.responseText);
  };
  xhttp.open("GET", "php/validateCredentials.php?action=is_setup_done", false);
  xhttp.send();
  if(xhttp.responseText == "true")
    window.location.href = "http://localhost/Pharmacy-Management/login.php";
}

function displayForgotPasswordForm() {
  document.getElementById("forgot-password-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

function displayLoginForm() {
  document.getElementById("forgot-password-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

function verifyEmailNumber() {
  var email = document.getElementById("email").value;
  var contact_number = document.getElementById("contact_number").value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      xhttp.responseText;
  };
  xhttp.open("GET", "php/validateCredentials.php?action=verify_email_number&email=" + email + "&contact_number=" + contact_number, false);
  xhttp.send();
  if(xhttp.responseText == "true") {
    document.getElementById("email-number-fields").style.display = "none";
    document.getElementById("username-password-fields").style.display = "block";
  }
  else
    alert("Invalid email or contact number!");
}

function updateUsernamePassword() {
  var username = document.getElementById('username');
  var password = document.getElementById('password');
  var confirm_password = document.getElementById('confirm_password');

  if(!notNull(username.value, 'username_error'))
    username.focus();
  else if(username.value.indexOf(' ') >= 0) {
    document.getElementById('username_error').style.display = "block";
    document.getElementById('username_error').innerHTML = "mustn't contain spaces!";
    username.focus();
  }
  else if(password.value.indexOf(' ') >= 0) {
    document.getElementById('password_error').style.display = "block";
    document.getElementById('password_error').innerHTML = "mustn't contain spaces!";
    password.focus();
  }
  else if(password.value.length < 6) {
    document.getElementById('password_error').style.display = "block";
    document.getElementById('password_error').innerHTML = "must be of length 6 or more characterss!";
    password.focus();
  }
  else if(password.value != confirm_password.value) {
    document.getElementById('password_error').style.display = "none";
    document.getElementById('confirm_password_error').style.display = "block";
    document.getElementById('confirm_password_error').innerHTML = "password mismatch!";
    confirm_password.focus();
  }
  else {
    document.getElementById('confirm_password_error').style.display = "none";
    var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
  		if(xhttp.readyState = 4 && xhttp.status == 200)
        xhttp.responseText;
  			//alert(xhttp.responseText);
  	};
  	xhttp.open("GET", "php/validateCredentials.php?action=update_username_password&username=" + username.value + "&password=" + password.value + "&email=" + email.value + "&contact_number=" + contact_number.value, false);
  	xhttp.send();
    if(xhttp.responseText == "true") {
      alert("New username and password set successfully..");
      displayLoginForm();
    }
    else
      alert("Failed to reset password!");
  }
  return false;
}
