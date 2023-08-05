function deleteInvoice(invoice_number) {
  var confirmation = confirm("Are you sure?");
  if(confirmation) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if(xhttp.readyState = 4 && xhttp.status == 200)
        document.getElementById('invoices_div').innerHTML = xhttp.responseText;
    };
    xhttp.open("GET", "php/manage_invoice.php?action=delete&invoice_number=" + invoice_number, true);
    xhttp.send();
  }
}

function refresh() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('invoices_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_invoice.php?action=refresh", true);
  xhttp.send();
}

function searchInvoice(text, tag) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById('invoices_div').innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_invoice.php?action=search&text=" + text + "&tag=" + tag, true);
  xhttp.send();
}

function printInvoice(invoice_number) {
  var print_content;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      print_content = xhttp.responseText;
  };
  xhttp.open("GET", "php/manage_invoice.php?action=print_invoice&invoice_number=" + invoice_number, false);
  xhttp.send();
  var print_window = window.open('','','width=1000,height=600');
  var is_chrome = Boolean(print_window.chrome);
  print_window.document.write(print_content);

  if (is_chrome) {
     setTimeout(function() {
       print_window.document.close();
       print_window.focus();
       print_window.print();
       print_window.close();
     }, 250);
   }
   else {
     print_window.document.close();
     print_window.focus();
     print_window.print();
     print_window.close();
  }
  return true;
}
