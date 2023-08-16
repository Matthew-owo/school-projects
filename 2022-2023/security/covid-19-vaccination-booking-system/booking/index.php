<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking - Hong Kong COVID-19 Vaccination Booking System</title>
</head>

<body>
  <h1>Hong Kong COVID-19 Vaccination Booking System</h1>
  <form action="form.php" method="get">
    <!-- Vaccine type -->
    <div>Please select a brand of vaccine.</div>
    <input type="radio" name="vaccine" id="sinovac" value="Sinovac">
    <label for="sinovac">Sinovac</label>
    <br />
    <input type="radio" name="vaccine" id="biontech" value="BioNTech">
    <label for="biontech">BioNTech</label>
    <br /><br />

    <button type="submit">Submit</button>
  </form>

</body>

</html>