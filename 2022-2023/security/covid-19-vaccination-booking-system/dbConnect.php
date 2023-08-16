<?php
  $db_host = '127.0.0.1';
  $db_user = 'root';
  $db_password = 'root';
  $db_db = 'vaccination_booking_system';
  $db_port = 8889;

  $db = new mysqli(
    $db_host,
    $db_user,
    $db_password,
    $db_db,
	$db_port
  );
	
  if ($db->connect_error) {
    echo 'Errno: '.$db->connect_errno;
    echo '<br>';
    echo 'Error: '.$db->connect_error;
    exit();
  }
