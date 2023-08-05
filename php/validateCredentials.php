<?php

  if(isset($_GET['action']) && $_GET['action'] == 'is_setup_done')
    isSetupDone();

  function isSetupDone() {
    require "db_connection.php";
    if($con) {
      $query = "SELECT * FROM admin_credentials";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      echo ($row) ? "true" : "false";
    }
  }

  if(isset($_GET['action']) && $_GET['action'] == 'is_admin')
    isAdmin();

  function isAdmin() {
    require "db_connection.php";
    if($con) {
      $username = $_GET["uname"];
      $password = $_GET["pswd"];

      $query = "SELECT * FROM admin_credentials WHERE USERNAME = '$username' AND PASSWORD = '$password'";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      if($row)  {
        $query = "UPDATE admin_credentials SET IS_LOGGED_IN = 'true'";
        $result = mysqli_query($con, $query);
        echo "true";
      }
      else
        echo "false";
    }
  }

  if(isset($_GET['action']) && $_GET['action'] == 'store_admin_info')
    storeAdminData();

  function storeAdminData() {
    require "db_connection.php";
    if($con) {
      $pharmacy_name = $_GET["pharmacy_name"];
      $address = $_GET["address"];
      $email = $_GET["email"];
      $contact_number = $_GET["contact_number"];
      $username = $_GET["username"];
      $password = $_GET["password"];

      $query = "INSERT INTO admin_credentials (PHARMACY_NAME, ADDRESS, EMAIL, CONTACT_NUMBER, USERNAME, PASSWORD, IS_LOGGED_IN) VALUES('$pharmacy_name', '$address', '$email', '$contact_number', '$username', '$password', 'false')";
      $result = mysqli_query($con, $query);
      echo ($result) ? "true" : "false";
    }
  }

  if(isset($_GET['action']) && $_GET['action'] == 'verify_email_number')
    verifyEmailNumber();

  function verifyEmailNumber() {
    require "db_connection.php";
    if($con) {
      $email = $_GET["email"];
      $contact_number = $_GET["contact_number"];

      $query = "SELECT * FROM admin_credentials WHERE EMAIL = '$email' AND CONTACT_NUMBER = '$contact_number'";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      echo ($row) ? "true" : "false";
    }
  }

  if(isset($_GET['action']) && $_GET['action'] == 'update_username_password')
    updateUsernamePassword();

  function updateUsernamePassword() {
    require "db_connection.php";
    if($con) {
      $username = $_GET["username"];
      $password = $_GET["password"];
      $email = $_GET["email"];
      $contact_number = $_GET["contact_number"];

      $query = "UPDATE admin_credentials SET USERNAME = '$username', PASSWORD = '$password' WHERE EMAIL = '$email' AND CONTACT_NUMBER = '$contact_number'";
      $result = mysqli_query($con, $query);
      echo ($result) ? "true" : "false";
    }
  }

  if(isset($_GET['action']) && $_GET['action'] == 'validate_password')
    validatePassword();

  function validatePassword() {
    require "db_connection.php";
    if($con) {
      $password = $_GET["password"];

      $query = "SELECT * FROM admin_credentials WHERE PASSWORD = '$password'";
      $result = mysqli_query($con, $query);
      $row = mysqli_fetch_array($result);
      echo ($row) ? "true" : "false";
    }
  }

  if(isset($_GET['action']) && $_GET['action'] == 'update_admin_info')
    updateAdminInfo();

  function updateAdminInfo() {
    require "db_connection.php";
    if($con) {
      $pharmacy_name = $_GET["pharmacy_name"];
      $address = $_GET["address"];
      $email = $_GET["email"];
      $contact_number = $_GET["contact_number"];
      $username = $_GET["username"];

      $query = "UPDATE admin_credentials SET PHARMACY_NAME = '$pharmacy_name', ADDRESS = '$address', EMAIL = '$email', CONTACT_NUMBER = '$contact_number', USERNAME = '$username'";
      $result = mysqli_query($con, $query);
      echo ($result) ? "Details updated..." : "Oops! Somthing wrong happend...";
    }
  }

  if(isset($_GET['action']) && $_GET['action'] == 'change_password')
    changePassword();

  function changePassword() {
    require "db_connection.php";
    if($con) {
      $password = $_GET["password"];

      $query = "UPDATE admin_credentials SET PASSWORD = '$password'";
      $result = mysqli_query($con, $query);
      echo ($result) ? "Password changed..." : "Oops! Somthing wrong happend...";
    }
  }

 ?>
