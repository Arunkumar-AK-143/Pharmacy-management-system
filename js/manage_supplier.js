function deleteSupplier(id) {
  var confirmation = confirm("Are you sure?");
  if(confirmation) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById('suppliers_div').innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/manage_supplier.php?action=delete&id=" + id, true);
    xhttp.send();
  }
}

function editSupplier(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('suppliers_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_supplier.php?action=edit&id=" + id, true);
  xhttp.send();
}

function updateSupplier(id) {
  var supplier_name = document.getElementById("supplier_name");
  var supplier_email = document.getElementById("supplier_email");
  var contact_number = document.getElementById("supplier_contact_number");
  var supplier_address = document.getElementById("supplier_address");
  if(!validateName(supplier_name.value, "name_error"))
    supplier_name.focus();
  else if(!validateContactNumber(contact_number.value, "contact_number_error"))
    contact_number.focus();
  else if(!validateAddress(supplier_address.value, "address_error"))
    supplier_address.focus();
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById('suppliers_div').innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/manage_supplier.php?action=update&id=" + id + "&name=" + supplier_name.value + "&email=" + supplier_email.value +"&contact_number=" + contact_number.value + "&address=" + supplier_address.value, true);
    xhttp.send();
  }
}

function cancel() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('suppliers_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_supplier.php?action=cancel", true);
  xhttp.send();
}

function searchSupplier(text) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('suppliers_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_supplier.php?action=search&text=" + text, true);
  xhttp.send();
}
