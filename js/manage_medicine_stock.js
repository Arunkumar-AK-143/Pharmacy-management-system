function deleteMedicineStock(id) {
  var confirmation = confirm("Are you sure?");
  if(confirmation) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById('medicines_stock_div').innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/manage_medicine_stock.php?action=delete&id=" + id, true);
    xhttp.send();
  }
}

function editMedicineStock(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('medicines_stock_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_medicine_stock.php?action=edit&id=" + id, true);
  xhttp.send();
}

function updateMedicineStock(id) {
  var batch_id = document.getElementById("batch_id");
  var expiry_date = document.getElementById("expiry_date");
  var quantity = document.getElementById("quantity");
  var mrp = document.getElementById("mrp");
  var rate = document.getElementById("rate");

  if(!notNull(batch_id.value, "batch_id_error"))
    batch_id.focus();
  else if(!checkExpiry(expiry_date.value, "expiry_date_error"))
    expiry_date.focus();
  else if(!checkQuantity(quantity.value, "quantity_error"))
    quantity.focus();
  else if(!checkValue(mrp.value, "mrp_error"))
    mrp.focus();
  else if(!checkValue(rate.value, "rate_error"))
    rate.focus();
  else if(Number.parseInt(mrp.value) < Number.parseFloat(rate.value)) {
    document.getElementById("rate_error").style.display = "block";
    document.getElementById("rate_error").innerHTML = "Rate must be less than MRP!";
    rate.focus();
  }
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById('medicines_stock_div').innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/manage_medicine_stock.php?action=update&id=" + id + "&batch_id=" + batch_id.value + "&expiry_date=" + expiry_date.value + "&quantity=" + quantity.value + "&mrp=" + mrp.value + "&rate=" + rate.value, true);
    xhttp.send();
  }
}

function cancel() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('medicines_stock_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_medicine_stock.php?action=cancel", true);
  xhttp.send();
}

function searchMedicineStock(text, tag) {
  if(tag == "NAME") {
    document.getElementById("by_generic_name").value = "";
    document.getElementById("by_suppliers_name").value = "";
  }
  if(tag == "GENERIC_NAME") {
    document.getElementById("by_name").value = "";
    document.getElementById("by_suppliers_name").value = "";
  }
  if(tag == "SUPPLIER_NAME") {
    document.getElementById("by_name").value = "";
    document.getElementById("by_generic_name").value = "";
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('medicines_stock_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_medicine_stock.php?action=search&text=" + text + "&tag=" + tag, true);
  xhttp.send();
}
