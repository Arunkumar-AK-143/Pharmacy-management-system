<?php

if(isset($_GET['action']) && $_GET['action'] == "purchase")
  showPurchases($_GET['start_date'], $_GET['end_date']);

if(isset($_GET['action']) && $_GET['action'] == "sales")
  showSales($_GET['start_date'], $_GET['end_date']);

function showPurchases($start_date, $end_date) {
  ?>
  <thead>
    <tr>
      <th>SL</th>
      <th>Purchase Date</th>
      <th>Voucher Number</th>
      <th>Invoice No</th>
      <th>Supplier Name</th>
      <th>Total Amount</th>
    </tr>
  </thead>
  <tbody>
  <?php
  require "db_connection.php";
  if($con) {
    $seq_no = 0;
    $total = 0;
    if($start_date == "" || $end_date == "")
      $query = "SELECT * FROM purchases";
    else
      $query = "SELECT * FROM purchases WHERE PURCHASE_DATE BETWEEN '$start_date' AND '$end_date'";
    $result = mysqli_query($con, $query);
    while($row = mysqli_fetch_array($result)) {
      $seq_no++;
      showPurchaseRow($seq_no, $row);
      $total = $total + $row['TOTAL_AMOUNT'];
    }
    ?>
    </tbody>
    <tfoot class="font-weight-bold">
      <tr style="text-align: right; font-size: 24px;">
        <td colspan="5" style="color: green;">&nbsp;Total Purchases =</td>
        <td style="color: red;"><?php echo $total; ?></td>
      </tr>
    </tfoot>
    <?php
  }
}

function showPurchaseRow($seq_no, $row) {
  ?>
  <tr>
    <td><?php echo $seq_no; ?></td>
    <td><?php echo $row['PURCHASE_DATE']; ?></td>
    <td><?php echo $row['VOUCHER_NUMBER']; ?></td>
    <td><?php echo $row['INVOICE_ID']; ?></td>
    <td><?php echo $row['SUPPLIER_NAME'] ?></td>
    <td><?php echo $row['TOTAL_AMOUNT']; ?></td>
  </tr>
  <?php
}

function showSales($start_date, $end_date) {
  ?>
  <thead>
    <tr>
      <th>SL</th>
      <th>Sales Date</th>
      <th>Invoice Number</th>
      <th>Customer Name</th>
      <th>Total Amount</th>
    </tr>
  </thead>
  <tbody>
  <?php
  require "db_connection.php";
  if($con) {
    $seq_no = 0;
    $total = 0;
    if($start_date == "" || $end_date == "")
      $query = "SELECT * FROM invoices INNER JOIN customers ON invoices.CUSTOMER_ID = customers.ID";
    else
      $query = "SELECT * FROM invoices INNER JOIN customers ON invoices.CUSTOMER_ID = customers.ID WHERE INVOICE_DATE BETWEEN '$start_date' AND '$end_date'";
    $result = mysqli_query($con, $query);
    while($row = mysqli_fetch_array($result)) {
      $seq_no++;
      //print_r($row);
      showSalesRow($seq_no, $row);
      $total = $total + $row['NET_TOTAL'];
    }
    ?>
    </tbody>
    <tfoot class="font-weight-bold">
      <tr style="text-align: right; font-size: 24px;">
        <td colspan="4" style="color: green;">&nbsp;Total Sales =</td>
        <td class="text-primary"><?php echo $total; ?></td>
      </tr>
    </tfoot>
    <?php
  }
}

function showSalesRow($seq_no, $row) {
  ?>
  <tr>
    <td><?php echo $seq_no; ?></td>
    <td><?php echo $row['INVOICE_DATE']; ?></td>
    <td><?php echo $row['INVOICE_ID']; ?></td>
    <td><?php echo $row['NAME']; ?></td>
    <td><?php echo $row['NET_TOTAL'] ?></td>
  </tr>
  <?php
}

?>
