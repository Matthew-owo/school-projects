<?php
// include the dbConnect.php file
require_once("../dbConnect.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php echo $_GET["vaccine"]; ?> Booking - Hong Kong COVID-19 Vaccination Booking System</title>
</head>

<body>
  <h1>Hong Kong COVID-19 Vaccination Booking System</h1>
  <?php
  if (!($_GET["vaccine"] === "Sinovac" || $_GET["vaccine"] === "BioNTech")) {
  ?>
    <!-- Error Message -->
    <h2 style="color: red;">ERROR: Wrong vaccine type.</h2>
  <?php } else { ?>
    <h2>Selected Vaccine: <?php echo $_GET["vaccine"]; ?></h2>
    <form action="submit.php" method="post">
      <!-- Vaccin Type (Hidden) -->
      <input type="hidden" name="vaccine" value="<?php echo $_GET["vaccine"]; ?>" required />

      <!-- Vaccination Station -->
      <label for="venue-select">Vaccination Station</label>
      <span style="color: red;">*</span>
      <br />
      <select name="venue-select" id="venue-select" required>
        <?php
        // Execute a SQL query
        $query = "SELECT * FROM `venues` WHERE `vaccine` = '" . $_GET["vaccine"] . "';";
        $result = mysqli_query($db, "SELECT * FROM `venues`");

        // Check if the query was successful
        if (!$result) {
          echo "Error: " . mysqli_error($db);
          exit();
        }

        // Loop through the result set
        while ($row = mysqli_fetch_assoc($result)) {
          echo "<option value=\"" . $row["name"] . "\">" . $row["name"] . "</option>";
        }

        // free the result set
        mysqli_free_result($result);

        // close the database connection
        mysqli_close($db);
        ?>
      </select>
      <br /><br />

      <!-- Date Picker -->
      <label for="date">Date</label>
      <span style="color: red;">*</span>
      <br />
      <input type="date" name="date" id="date" required />
      <br /><br />

      <!-- Timeslot -->
      <label for="timeslot">Timeslot</label>
      <span style="color: red;">*</span>
      <br />
      <select name="timeslot" id="timeslot" required>
        <option value="08:00-09:00">08:00 - 09:00</option>
        <option value="09:00-10:00">09:00 - 10:00</option>
        <option value="10:00-11:00">10:00 - 11:00</option>
        <option value="11:00-12:00">11:00 - 12:00</option>
        <option value="12:00-13:00">12:00 - 13:00</option>
        <option value="13:00-14:00">13:00 - 14:00</option>
        <option value="14:00-15:00">14:00 - 15:00</option>
        <option value="15:00-16:00">15:00 - 16:00</option>
        <option value="16:00-17:00">16:00 - 17:00</option>
        <option value="17:00-18:00">17:00 - 18:00</option>
        <option value="18:00-19:00">18:00 - 19:00</option>
        <option value="19:00-20:00">19:00 - 20:00</option>
        <option value="20:00-21:00">20:00 - 21:00</option>
        <option value="21:00-22:00">21:00 - 22:00</option>
        <option value="22:00-23:00">22:00 - 23:00</option>
      </select>
      <br /><br />
      <hr />

      <!-- Chinese Name -->
      <label for="zhName">Chinese Name</label>
      <span style="color: red;">*</span>
      <br />
      <input type="text" name="zhName" id="zhName" maxlength="50" required />
      <br /><br />

      <!-- English Name -->
      <label for="zhName">English Name</label>
      <span style="color: red;">*</span>
      <br />
      <input type="text" name="enName" id="enName" maxlength="50" required />
      <br /><br />

      <!-- Gender -->
      <label for="gender">Gender</label>
      <span style="color: red;">*</span>
      <br />
      <select name="gender" id="gender" required>
        <option value="m">Male</option>
        <option value="f">Feale</option>
      </select>
      <br /><br />

      <!-- Date of Birth -->
      <label for="dob">Date of Birth</label>
      <span style="color: red;">*</span>
      <br />
      <input type="date" name="dob" id="dob" required />
      <br /><br />

      <!-- HKID Number -->
      <label for="hkid">HKID Number</label>
      <span style="color: red;">*</span>
      <br />
      <input type="text" name="hkid" id="hkid" maxlength="10" required />
      <br /><br />

      <!-- Phone Number -->
      <label for="phoneNo">Phone Number</label>
      <span style="color: red;">*</span>
      <br />
      <input type="text" name="phoneNo" id="phoneNo" maxlength="8" oninput="value=value.replace(/[^\d]/g,'')" required />
      <br /><br />

      <!-- Address -->
      <label for="address">Address</label>
      <span style="color: red;">*</span>
      <br />
      <textarea type="text" name="address" id="address" rows="4" cols="50" maxlength="100" required></textarea>
      <br /><br />

      <!-- Place of Birth -->
      <label for="placeOfBirth">Place of Birth</label>
      <span style="color: red;">*</span>
      <br />
      <select name="placeOfBirth" id="placeOfBirth" required>
        <option value="Hong Kong">Hong Kong</option>
        <option value="Mainland China">Mainland China</option>
        <option value="Overseas">Overseas</option>
      </select>
      <br /><br />

      <!-- Submit Button -->
      <br />
      <button type="submit">Submit</button>
    </form>
  <?php } ?>
</body>

</html>