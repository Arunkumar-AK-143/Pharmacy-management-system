<?php
  require "db_connection.php";

  if($con) {
    if(isset($_GET["action"]) && $_GET["action"] == "delete") {
      $id = $_GET["id"];
      $query = "DELETE FROM customers WHERE ID = $id";
      $result = mysqli_query($con, $query);
      if(!empty($result))
    		showCustomers(0);
    }

    if(isset($_GET["action"]) && $_GET["action"] == "edit") {
      $id = $_GET["id"];
      showCustomers($id);
    }

    if(isset($_GET["action"]) && $_GET["action"] == "update") {
      $id = $_GET["id"];
      $name = ucwords($_GET["name"]);
      $contact_number = $_GET["contact_number"];
      $address = ucwords($_GET["address"]);
      $doctor_name = ucwords($_GET["doctor_name"]);
      $doctor_address = ucwords($_GET["doctor_address"]);
      updateCustomer($id, $name, $contact_number, $address, $doctor_name, $doctor_address);
    }

    if(isset($_GET["action"]) && $_GET["action"] == "cancel")
      showCustomers(0);

    if(isset($_GET["action"]) && $_GET["action"] == "search")
      searchCustomer(strtoupper($_GET["text"]));
  }

  function showCustomers($id) {
    require "db_connection.php";
    if($con) {
      $seq_no = 0;
      $query = "SELECT * FROM customers";
      $result = mysqli_query($con, $query);
      while($row = mysqli_fetch_array($result)) {
        $seq_no++;
        if($row['ID'] == $id)
          showEditOptionsRow($seq_no, $row);
        else
          showCustomerRow($seq_no, $row);
      }
    }
  }

  function showCustomerRow($seq_no, $row) {
    ?>
    <tr>
      <td><?php echo $seq_no; ?></td>
      <td><?php echo $row['ID'] ?></td>
      <td><?php echo $row['NAME']; ?></td>
      <td><?php echo $row['CONTACT_NUMBER']; ?></td>
      <td><?php echo $row['ADDRESS']; ?></td>
      <td><?php echo $row['DOCTOR_NAME']; ?></td>
      <td><?php echo $row['DOCTOR_ADDRESS']; ?></td>
      <td>
        <button href="" class="btn btn-info btn-sm" onclick="editCustomer(<?php echo $row['ID']; ?>);">
          <i class="fa fa-pencil"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="deleteCustomer(<?php echo $row['ID']; ?>);">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    </tr>
    <?php
  }

function showEditOptionsRow($seq_no, $row) {
  ?>
  <tr>
    <td><?php echo $seq_no; ?></td>
    <td><?php echo $row['ID'] ?></td>
    <td>
      <input type="text" class="form-control" value="<?php echo $row['NAME']; ?>" placeholder="Name" id="customer_name" onkeyup="validateName(this.value, 'name_error');">
      <code class="text-danger small font-weight-bold float-right" id="name_error" style="display: none;"></code>
    </td>
    <td>
      <input type="number" class="form-control" value="<?php echo $row['CONTACT_NUMBER']; ?>" placeholder="Contact Number" id="customer_contact_number" onblur="validateContactNumber(this.value, 'contact_number_error');">
      <code class="text-danger small font-weight-bold float-right" id="contact_number_error" style="display: none;"></code>
    </td>
    <td>
      <textarea class="form-control" placeholder="Address" id="customer_address" onblur="validateAddress(this.value, 'address_error');"><?php echo $row['ADDRESS']; ?></textarea>
      <code class="text-danger small font-weight-bold float-right" id="address_error" style="display: none;"></code>
    </td>
    <td>
      <input type="text" class="form-control" value="<?php echo $row['DOCTOR_NAME']; ?>" placeholder="Doctor's Name" id="customer_doctors_name" onkeyup="validateName(this.value, 'doctor_name_error');">
      <code class="text-danger small font-weight-bold float-right" id="doctor_name_error" style="display: none;"></code>
    </td>
    <td>
      <textarea class="form-control" placeholder="Doctor's Address" id="customer_doctors_address" onblur="validateAddress(this.value, 'doctor_address_error');"><?php echo $row['DOCTOR_ADDRESS']; ?></textarea>
      <code class="text-danger small font-weight-bold float-right" id="doctor_address_error" style="display: none;"></code>
    </td>
    <td>
      <button href="" class="btn btn-success btn-sm" onclick="updateCustomer(<?php echo $row['ID']; ?>);">
        <i class="fa fa-edit"></i>
      </button>
      <button class="btn btn-danger btn-sm" onclick="cancel();">
        <i class="fa fa-close"></i>
      </button>
    </td>
  </tr>
  <?php
}

function updateCustomer($id, $name, $contact_number, $address, $doctor_name, $doctor_address) {
  require "db_connection.php";
  $query = "UPDATE customers SET NAME = '$name', CONTACT_NUMBER = '$contact_number', ADDRESS = '$address', DOCTOR_NAME = '$doctor_name', DOCTOR_ADDRESS = '$doctor_address' WHERE ID = $id";
  $result = mysqli_query($con, $query);
  if(!empty($result))
    showCustomers(0);
}

function searchCustomer($text) {
  require "db_connection.php";
  if($con) {
    $seq_no = 0;
    $query = "SELECT * FROM customers WHERE UPPER(NAME) LIKE '%$text%'";
    $result = mysqli_query($con, $query);
    while($row = mysqli_fetch_array($result)) {
      $seq_no++;
      showCustomerRow($seq_no, $row);
    }
  }
}

?>
