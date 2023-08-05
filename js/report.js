function showReport(title) {
  var start_date = document.getElementById('start_date').value;
  var end_date = document.getElementById('end_date').value;
  //alert(start_date + " " + end_date)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState = 4 && xhttp.status == 200)
      document.getElementById(title + "_report_div").innerHTML = xhttp.responseText;
  };
  xhttp.open("GET", "php/report.php?action=" + title + "&start_date=" + start_date + "&end_date=" + end_date, true);
  xhttp.send();
}

function printReport(report_title) {
  var start_date = document.getElementById('start_date').value;
  var end_date = document.getElementById('end_date').value;

  var page_content = document.body.innerHTML;

  var print_content = document.getElementById("print_content").innerHTML;

  if(start_date == "" || end_date == "")
    print_content = "<div class='h3 text-center text-primary'>" + report_title + " Report</div><br>" + print_content;
  else
    print_content = "<div class='h3 text-center text-primary'>" + report_title + " Report Between " + start_date + " and " + end_date + "</div><br><br>" + print_content;

  document.body.innerHTML = print_content;
  window.print();
  document.body.innerHTML = page_content;
}
