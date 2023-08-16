<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Search Booking - Hong Kong COVID-19 Vaccination Booking System</title>
</head>

<body>
  <h1>Hong Kong COVID-19 Vaccination Booking System</h1>
  <h2>Search your booking</h2>
  <form action="result.php" method="post">
    <label for="hkid">HKID Number</label>
    <br />
    <input type="text" name="hkid" id="hkid" maxlength="10" />
    <br /><br />

    <label for="ref">Reference Number</label>
    <br />
    <input type="text" name="ref" id="ref" oninput="value=value.replace(/[^\d]/g,'')" maxlength="8" />
    <br /><br />

    <input type="submit" value="Search" />
  </form>
</body>

</html>