<?php

  if(isset($_GET['action']) && $_GET['action'] == "add_row")
    createMedicineInfoRow();

  if(isset($_GET['action']) && $_GET['action'] == "is_supplier")
    isSupplier(strtoupper($_GET['name']));

  if(isset($_GET['action']) && $_GET['action'] == "is_invoice")
    isInvoiceExist(strtoupper($_GET['invoice_number']));

  if(isset($_GET['action']) && $_GET['action'] == "is_new_medicine")
    isNewMedicine(strtoupper($_GET['name']), strtoupper($_GET['packing']));

  if(isset($_GET['action']) && $_GET['action'] == "add_stock")
    addStock();

  if(isset($_GET['action']) && $_GET['action'] == "add_new_purchase")
    addNewPurchase();

  function isSupplier($name) {
    require "db_connection.php";
    if($con) {
      $query = "SELECT * FROM suppliers WHERE UPPER(NAME) = '$name'";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      echo ($row) ? "true" : "false";
    }
  }

  function isInvoiceExist($invoice_number) {
    require "db_connection.php";
    if($con) {
      $query = "SELECT * FROM purchases WHERE INVOICE_NUMBER = $invoice_number";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      echo ($row) ? "true" : "false";
    }
  }

  function isNewMedicine($name, $packing) {
    require "db_connection.php";
    if($con) {
      $query = "SELECT * FROM medicines WHERE UPPER(NAME) = '$name' AND UPPER(PACKING) = '$packing'";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      echo ($row) ? "false" : "true";
    }
  }

  function addStock() {
    require "db_connection.php";
    $name = ucwords($_GET['name']);
    $batch_id = strtoupper($_GET['batch_id']);
    $expiry_date = $_GET['expiry_date'];
    $quantity = $_GET['quantity'];
    $mrp = $_GET['mrp'];
    $rate = $_GET['rate'];
    $invoice_number = $_GET['invoice_number'];
    if($con) {
      $query = "SELECT * FROM medicines_stock WHERE UPPER(NAME) = '".strtoupper($name)."' AND UPPER(BATCH_ID) = '$batch_id'";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      if($row) {
        $new_quantity = $row['QUANTITY'] + $quantity;
        $query = "UPDATE medicines_stock SET QUANTITY = $new_quantity WHERE UPPER(NAME) = '".strtoupper($name)."' AND UPPER(BATCH_ID) = '$batch_id'";
        $result = mysqli_query($con, $query);
      }
      else {
        $query = "INSERT INTO medicines_stock (NAME, BATCH_ID, EXPIRY_DATE, QUANTITY, MRP, RATE, INVOICE_NUMBER) VALUES('$name', '$batch_id', '$expiry_date', $quantity, $mrp, $rate, $invoice_number)";
        $result = mysqli_query($con, $query);
      }
    }
  }

  function addNewPurchase() {
    require "db_connection.php";
    $suppliers_name = ucwords($_GET['suppliers_name']);
    $invoice_number = $_GET['invoice_number'];
    $payment_type = $_GET['payment_type'];
    $invoice_date = $_GET['invoice_date'];
    $grand_total = $_GET['grand_total'];
    $payment_status = ($payment_type == "Payment Due") ? "DUE" : "PAID";

    if($con) {
      $query = "INSERT INTO purchases (SUPPLIER_NAME, INVOICE_NUMBER, PURCHASE_DATE, TOTAL_AMOUNT, PAYMENT_STATUS) VALUES('$suppliers_name', $invoice_number, '$invoice_date', $grand_total, '$payment_status')";
      $result = mysqli_query($con, $query);
      if($result)
        echo "Purchase saved...";
      else
        echo "Failed to save purchase!";
    }
  }

  function createMedicineInfoRow() {
      $row_id = $_GET['row_id'];
      $row_number = $_GET['row_number'];
      ?>
      <div class="row col col-md-12">
        <div class="col col-md-2">
          <input type="text" class="form-control" placeholder="Medicine Name" name="medicine_name">
          <code class="text-danger small font-weight-bold float-right" id="medicine_name_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
        <div class="col col-md-1">
          <input type="text" class="form-control" name="packing">
          <code class="text-danger small font-weight-bold float-right" id="pack_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
        <div class="col col-md-2">
          <input type="text" class="form-control" name="batch_id">
          <code class="text-danger small font-weight-bold float-right" id="batch_id_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
        <div class="col col-md-1">
          <input type="text" class="form-control" name="expiry_date">
          <code class="text-danger small font-weight-bold float-right" id="expiry_date_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
        <div class="col col-md-1">
          <input type="number" class="form-control" placeholder="0" id="quantity_<?php echo $row_number; ?>" name="quantity" onkeyup="getAmount(<?php echo $row_number; ?>);">
          <code class="text-danger small font-weight-bold float-right" id="quantity_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
        <div class="col col-md-1">
          <input type="number" class="form-control" name="mrp">
          <code class="text-danger small font-weight-bold float-right" id="mrp_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
        <div class="col col-md-1">
          <input type="number" class="form-control" id="rate_<?php echo $row_number; ?>" name="rate" onkeyup="getAmount(<?php echo $row_number; ?>);">
          <code class="text-danger small font-weight-bold float-right" id="rate_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
        <div class="row col col-md-3">
          <div class="col col-md-7"><input type="text" class="form-control" id="amount_<?php echo $row_number; ?>" disabled></div>
          <div class="col col-md-5">
            <button class="btn btn-primary" onclick="addRow();">
              <i class="fa fa-plus"></i>
            </button>
            <button class="btn btn-danger" onclick="removeRow('<?php echo $row_id ?>');">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        </div>
      </div><br>
      <div class="row col col-md-8">
        <div class="col col-md-4"><label for="generic_name" class="font-weight-bold">&nbsp;If new medicine, generic name : </label></div>
        <div class="col col-md-8">
          <input type="text" class="form-control" placeholder="Generic Name" name="generic_name">
          <code class="text-danger small font-weight-bold float-right" id="generic_name_error_<?php echo $row_number; ?>" style="display: none;"></code>
        </div>
      </div>
      <div class="col col-md-12">
        <hr class="col-md-12" style="padding: 0px;">
      </div>
      <?php
  }
?>
