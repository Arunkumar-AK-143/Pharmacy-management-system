function edit(action) {
  document.getElementById('pharmacy_name').disabled = action;
  document.getElementById('address').disabled = action;
  document.getElementById('email').disabled = action;
  document.getElementById('contact_number').disabled = action;
  document.getElementById('username').disabled = action;

  if(action) {
    document.getElementById('edit').style.display = "block";
    document.getElementById('update_cancel').style.display = "none";
  }
  else {
    document.getElementById('edit').style.display = "none";
    document.getElementById('update_cancel').style.display = "block";
  }

  document.getElementById('pharmacy_name_error').style.display = "none";
  document.getElementById('address_error').style.display = "none";
  document.getElementById('email_error').style.display = "none";
  document.getElementById('contact_number_error').style.display = "none";
  document.getElementById('username_error').style.display = "none";

  if(!action)
    document.getElementById('admin_acknowledgement').innerHTML = "";
}

function updateAdminDetails() {
  var pharmacy_name = document.getElementById('pharmacy_name');
  var address = document.getElementById('address');
  var email = ocument.getElementById('email');
  var contact_number = document.getElementById('contact_number');
  var username = document.getElementById('username');

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
  else {
    var password = prompt("Please enter password below to update details!");
    if(validatePassword(password)) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(xhttp.readyState = 4 && xhttp.status == 200)
          document.getElementById('admin_acknowledgement').innerHTML = xhttp.responseText;
      };
      xhttp.open("GET", "php/validateCredentials.php?action=update_admin_info&pharmacy_name=" + pharmacy_name.value + "&address=" + address.value + "&email=" + email.value + "&contact_number=" + contact_number.value + "&username=" + username.value, true);
      xhttp.send();
      edit(true);
      return true;
    }
    else
      document.getElementById('admin_acknowledgement').innerHTML = "<span class='text-danger'>Invalid Password!</span>";
    return false;
  }
}

function validatePassword(password) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      xhttp.responseText;
  };
  xhttp.open("GET", "php/validateCredentials.php?action=validate_password&password=" + password, false);
  xhttp.send();
  if(xhttp.responseText == "true")
    return true;
  return false;
}

function checkAdminPassword(password, error) {
  document.getElementById(error).style.display = "block";
  if(validatePassword(password)) {
    document.getElementById(error).style.display = "none";
    return true;
  }
  else
    document.getElementById(error).innerHTML = "Wrong Password!!!";
  return false;
}

function changePassword() {
  var old_password = document.getElementById('old_password');
  var password = document.getElementById('password');
  var confirm_password = document.getElementById('confirm_password');

  if(!checkAdminPassword(old_password.value, 'old_password_error'))
    old_password.focus();
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
  			alert(xhttp.responseText);
  	};
  	xhttp.open("GET", "php/validateCredentials.php?action=change_password&password=" + password.value, false);
  	xhttp.send();
    return true;
  }
  return false;
}
