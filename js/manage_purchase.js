function deletePurchase(id) {
  var confirmation = confirm("Are you sure?");
  if(confirmation) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById('purchases_div').innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/manage_purchase.php?action=delete&id=" + id, true);
    xhttp.send();
  }
}

function editPurchase(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('purchases_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_purchase.php?action=edit&id=" + id, true);
  xhttp.send();
}

function updatePurchase(id) {
  var suppliers_name = document.getElementById("suppliers_name");
  var invoice_date = document.getElementById("invoice_date");
  var grand_total = document.getElementById("grand_total");
  var payment_status = document.getElementById("payment_status");
  //alert(payment_status.value);
  //if(!notNull(suppliers_name.value, "supplier_name_error"))
    //suppliers_name.focus();
  //else if(isSupplier(suppliers_name.value) == "false") {
    //document.getElementById("supplier_name_error").style.display = "block";
    //document.getElementById("supplier_name_error").innerHTML = "Supplier doesn't exists!";
    //suppliers_name.focus();
  //}
  //else
  if(!checkDate(invoice_date.value, 'date_error'))
    invoice_date.focus();
  else {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById('purchases_div').innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/manage_purchase.php?action=update&id=" + id + "&suppliers_name=" + suppliers_name.value + "&invoice_date=" + invoice_date.value + "&grand_total=" + grand_total.value + "&payment_status=" + payment_status.value, true);
    xhttp.send();
  }
}

function printPurchase(id) {
  //Get the HTML of div
  var divElements = document.getElementById("purchases_div").innerHTML;

  //Get the HTML of whole page
  var oldPage = document.body.innerHTML;

  //Reset the pages HTML with divs HTML only
  document.body.innerHTML = "<html><head><title></title></head><body>" + divElements + "</body>";

  //Print Page
  window.print();

  //Restore orignal HTML
  document.body.innerHTML = oldPage;
}

function cancel() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('purchases_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_purchase.php?action=cancel", true);
  xhttp.send();
}

function searchPurchase(text, tag) {
  if(tag == "VOUCHER_NUMBER") {
    document.getElementById("by_suppliers_name").value = "";
    document.getElementById("by_invoice_number").value = "";
    document.getElementById("by_purchase_date").value = "";
  }
  if(tag == "SUPPLIER_NAME") {
    document.getElementById("by_voucher_number").value = "";
    document.getElementById("by_invoice_number").value = "";
    document.getElementById("by_purchase_date").value = "";
  }
  if(tag == "INVOICE_NUMBER") {
    document.getElementById("by_suppliers_name").value = "";
    document.getElementById("by_voucher_number").value = "";
    document.getElementById("by_purchase_date").value = "";
  }
  if(tag == "PURCHASE_DATE") {
    document.getElementById("by_suppliers_name").value = "";
    document.getElementById("by_voucher_number").value = "";
    document.getElementById("by_invoice_number").value = "";
  }

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('purchases_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_purchase.php?action=search&text=" + text + "&tag=" + tag, true);
  xhttp.send();
}
