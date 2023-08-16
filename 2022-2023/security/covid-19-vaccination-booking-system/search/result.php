<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Search Result - Hong Kong COVID-19 Vaccination Booking System</title>
</head>

<body>
  <h1>Hong Kong COVID-19 Vaccination Booking System</h1>
  <h2>Search your booking</h2>

  <?php
  // include the dbConnect.php file
  require_once("../dbConnect.php");
  require_once("../utilities/cipher.php");

  $search_sql = $db->prepare("SELECT `id`, `vaccine`, `venue`, `date`, `timeslot`, `zhName`, `zhNameIv`, `enName`, `enNameIv`, `gender`, `dob`, `dobIv`, `phoneNo`, `phoneNoIv`, `hkid`, `hkidIv`, `address`, `addressIv`, `placeOfBirth` FROM `booking` where `id` = ?");
  $search_sql->bind_param("s", $_POST["ref"]);
  $search_sql->execute();

  $result = $search_sql->get_result();

  $num_of_rows = $result->num_rows;

  // Found the booking
  if ($num_of_rows > 0) {
    while ($row = $result->fetch_assoc()) {
      if ($_POST["hkid"] == decrypt($row["hkid"], $row["hkidIv"])) {
        echo "ID: " . $row["id"] . "<br />";
        echo "Vaccine Type: " . $row["vaccine"] . "<br />";
        echo "Venue: " . $row["venue"] . "<br />";
        echo "Date: " . $row["date"] . "<br />";
        echo "Timeslot: " . $row["timeslot"] . "<br />";
        echo "Chinese Name: " . decrypt($row["zhName"], $row["zhNameIv"]) . "<br />";
        echo "Engilsh Name: " . decrypt($row["enName"], $row["enNameIv"]) . "<br />";
      } else {
        echo "<h2>Booking Not Found</h2>";
      }
    }
  } else {
    echo "<h2>Booking Not Found</h2>";
  }
  ?>
  <a href="/">Back to homepage</a>
</body>

</html>