<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <h1>Hong Kong COVID-19 Vaccination Booking System</h1>

  <?php
  // Handle XSS Attack
  $newZhName = htmlspecialchars($_POST["zhName"], ENT_QUOTES);
  $newEnName = htmlspecialchars($_POST["enName"], ENT_QUOTES);
  $newPhoneNo = htmlspecialchars($_POST["phoneNo"], ENT_QUOTES);
  $newHkid = htmlspecialchars($_POST["hkid"], ENT_QUOTES);
  $newAddress = htmlspecialchars($_POST["address"], ENT_QUOTES);

  $phoneNoPattern = '/^\d{8}$/';
  $hkidPattern = '/^[A-Z]{1,2}[0-9]{6}\([0-9A]\)$/';

  $allDataCorrect = true;
  $errMsg = "";
  if (!preg_match($phoneNoPattern, $newPhoneNo)) {
    $allDataCorrect = false;
    $errMsg .= "<h2 style='color: red;'>Phone Number is not valid.</h2>";
  }

  if (!preg_match($hkidPattern, $newHkid)) {
    $allDataCorrect = false;
    $errMsg .= "<h2 style='color: red;'>HKID Number is not valid.</h2>";
  }

  if ($allDataCorrect) {
    // include the dbConnect.php file
    require_once("../dbConnect.php");
    require_once("../utilities/cipher.php");

    $zhName_encrypted = encrypt($newZhName);
    $enName_encrypted = encrypt($newEnName);
    $dob_encrypted = encrypt($_POST["dob"]);
    $phoneNo_encrypted = encrypt($newPhoneNo);
    $hkid_encrypted = encrypt($newHkid);
    $address_encrypted = encrypt($newAddress);

    $insert_sql = $db->prepare("INSERT INTO `booking` (`vaccine`, `venue`, `date`, `timeslot`, `zhName`, `zhNameIv`, `enName`, `enNameIv`, `gender`, `dob`, `dobIv`, `phoneNo`, `phoneNoIv`, `hkid`, `hkidIv`, `address`, `addressIv`, `placeOfBirth`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $insert_sql->bind_param(
      "ssssssssssssssssss",
      $_POST["vaccine"],
      $_POST["venue-select"],
      $_POST["date"],
      $_POST["timeslot"],
      $zhName_encrypted["cipher"],
      $zhName_encrypted["iv"],
      $enName_encrypted["cipher"],
      $enName_encrypted["iv"],
      $_POST["gender"],
      $dob_encrypted["cipher"],
      $dob_encrypted["iv"],
      $phoneNo_encrypted["cipher"],
      $phoneNo_encrypted["iv"],
      $hkid_encrypted["cipher"],
      $hkid_encrypted["iv"],
      $address_encrypted["cipher"],
      $address_encrypted["iv"],
      $_POST["placeOfBirth"]
    );
    $insert_sql->execute();
    $insert_sql->store_result();

    echo "<h2 style='color: green;'>You have made the booking successfully</h2>";
    echo "ID: " . $insert_sql->insert_id . "<br />";
    echo "Vaccine Type: " . $_POST["vaccine"] . "<br />";
    echo "Venue: " . $_POST["venue-select"] . "<br />";
    echo "Date: " . $_POST["date"] . "<br />";
    echo "Timeslot: " . $_POST["timeslot"] . "<br />";
    echo "Chinese Name: " . $newEnName . "<br />";
    echo "Engilsh Name: " . $newZhName . "<br />";
    echo "<a href='/'>Back to homepage</a>";
  } else {
    echo $errMsg;
    echo "<a href='./'>Back</a>";
  }
  ?>




</body>

</html>