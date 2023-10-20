<?php
session_start();

include_once('/xampp/htdocs/travelHK.com/dbConnect.php');
global $conn;
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>管理頁面</title>

  <?php
  require_once('/xampp/htdocs/travelHK.com/library.php');
  ?>

  <script src="/js/partner/guesthouse.js"></script>
  <link rel="stylesheet" href="/css/admin_form.css">
</head>

<body>

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <?php require_once("../sidebar.php"); ?>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <div id="content">

        <!-- Topbar -->
        <?php require_once("../topbar.php"); ?>
        <!-- End of Topbar -->

        <!-- Guesthouse Creation Form -->
        <form id="guesthouse-creation" method="POST">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-10 offset-1">
                <h3 class="mb-0 text-secondary">新增民宿</h3>
              </div>
            </div>
            <div class="row">
              <div class="col-md-10 offset-1 card">
                <div class="card-body">
                  <!-- Guesthouse Name -->
                  <div class="row">
                    <div class="col-md-2">
                      <label>民宿名稱</label>
                      <span class="text-danger">*</span>
                    </div>
                    <div class="col-md-5">
                      <input type="text" class="form-control" id="chi-name" name="chi-name" placeholder="中文">
                    </div>
                    <div class="col-md-5">
                      <input type="text" class="form-control" id="eng-name" name="eng-name" placeholder="英文">
                    </div>
                  </div>
                  <!-- District -->
                  <div class="row">
                    <div class="col-md-2">
                      <label>地區</label>
                      <span class="text-danger">*<span>
                    </div>
                    <div class="col-md-10">
                      <select class="form-select" id="district" name="district">
                        <option value="" selected disabled hidden>請選擇地區</option>
                        <?php
                        $region_sql = "SELECT * FROM `hong_kong_region`;";
                        $region_rs = mysqli_query($conn, $region_sql);

                        while ($region = mysqli_fetch_assoc($region_rs)) {
                          echo "<optgroup label=\"" . $region['zh-hk'] . "\">";

                          $district_sql = "SELECT * FROM `hong_kong_district` WHERE `region_id` = " . $region['region_id'] . ";";
                          $district_rs = mysqli_query($conn, $district_sql);
                          while ($district = mysqli_fetch_assoc($district_rs)) {
                            echo "<option value=\"" . $district['district_id'] . "\">" . $district['zh-hk'] . "</option>";
                          }

                          echo "</optgroup>";
                        }
                        ?>
                      </select>
                    </div>
                  </div>
                  <!-- Physical Address -->
                  <div class="row">
                    <div class="col-md-2">
                      <label>地址</label>
                      <span class="text-danger">*<span>
                    </div>
                    <div class="col-md-10">
                      <input type="text" class="form-control" id="chi-address" name="chi-address" placeholder="中文">
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-10 offset-2">
                      <input type="text" class="form-control" id="eng-address" name="eng-address" placeholder="英文">
                    </div>
                  </div>
                  <div class="row" style="display: none;">
                    <div class="col-md-5 offset-2">
                      <input type="text" class="form-control" id="latitude" name="latitude">
                    </div>
                    <div class="col-md-5">
                      <input type="text" class="form-control" id="longitude" name="longitude">
                    </div>
                  </div>
                  <!-- Email -->
                  <div class="row">
                    <div class="col-2">
                      電郵
                      <span class="text-danger">*<span>
                    </div>
                    <div class="col">
                      <input type="email" class="form-control" id="email" name="email">
                    </div>
                  </div>
                  <!-- Phone number -->
                  <div class="row">
                    <div class="col-2">
                      電話
                      <span class="text-danger">*<span>
                    </div>
                    <div class="col">
                      <input type="tel" class="form-control" id="phoneNumber" name="phoneNumber" minlength="8" maxlength="8" oninput="value=value.replace(/[^\d]/g,'')">
                    </div>
                  </div>
                  <!-- Number of rooms -->
                  <div class="row">
                    <div class="col-md-2">
                      <label>房間數目</label>
                      <span class="text-danger">*<span>
                    </div>
                    <div class="col-md-10">
                      <div class="input-group">
                        <input type="number" class="form-control" id="rooms" name="rooms">
                        <span class="input-group-text">間</span>
                      </div>
                    </div>
                  </div>
                  <!-- Office hours -->
                  <div class="row">
                    <div class="col-md-2">
                      <label>辦公時間</label>
                      <span class="text-danger">*<span>
                    </div>
                    <div class="col-md-2">星期一至五</div>
                    <div class="col-md-8">
                      <input type="time" class="form-control business-hours" name="start-weekday" id="start-weekday">
                      <span> - </span>
                      <input type="time" class="form-control business-hours" name="end-weekday" id="end-weekday">
                      <div class="form-check form-check-inline ms-2">
                        <input type="checkbox" class="form-check-input" name="weekday-closed" id="weekday-closed">
                        <label for="weekday-closed">休息</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" name="weekday-24hours" id="weekday-24hours">
                        <label for="weekday-24hours">24小時</label> 
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-2 offset-2">星期六至日</div>
                    <div class="col-md-8">
                      <input type="time" class="form-control business-hours" name="start-weekend" id="start-weekend">
                      <span> - </span>
                      <input type="time" class="form-control business-hours" name="end-weekend" id="end-weekend">
                      <div class="form-check form-check-inline ms-2">
                        <input type="checkbox" class="form-check-input" name="weekend-closed" id="weekend-closed">
                        <label for="weekend-closed">休息</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" name="weekend-24hours" id="weekend-24hours">
                        <label for="weekend-24hours">24小時</label> 
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-2 offset-2">公眾假期</div>
                    <div class="col-md-8">
                      <input type="time" class="form-control business-hours" name="start-holiday" id="start-holiday">
                      <span> - </span>
                      <input type="time" class="form-control business-hours" name="end-holiday" id="end-holiday">
                      <div class="form-check form-check-inline ms-2">
                        <input type="checkbox" class="form-check-input" name="holiday-closed" id="holiday-closed">
                        <label for="holiday-closed">休息</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" name="holiday-24hours" id="holiday-24hours">
                        <label for="holiday-24hours">24小時</label> 
                      </div>
                    </div>
                  </div>
                  <!-- Payment Methods -->
                  <div class="row">
                    <div class="col-md-2">
                      <label>付款方式</label>
                      <span class="text-danger">*<span>
                    </div>
                    <div class="col-md-10" id="payment-checkboxes">
                      <!-- Print the payment method with check box -->
                      <?php
                      $sql = "SELECT * FROM `payment_method_list`;";
                      $rs = mysqli_query($conn, $sql);

                      while ($method = mysqli_fetch_assoc($rs)) {
                        if ($method['method_id'] == '0') {
                          // empty
                        } else {
                          echo '<div class="form-check form-check-inline">';
                          echo '<input class="form-check-input payment-method" type="checkbox" id="' . str_replace(' ', '', $method['en']) . '" value="' . $method['method_id'] . '" name="payment[]">';
                          echo '<label class="form-check-label" for="' . str_replace(' ', '', $method['en']) . '">' . $method['zh-hk'] . '</label>';
                          echo '</div>';
                        }
                      }
                      ?>
                      <!-- Print the "Other" check box -->
                      <!-- <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="Other-payment" value="0" name="Other-payment-method-check">
                        <label class="form-check-label" for="Other-payment">其他</label>
                      </div>
                      <div class="hidden">
                        <input type="text" class="form-control" name="other-payment-method-input" placeholder="(如適用)">
                      </div> -->
                    </div>
                  </div>
                  <!-- Equipment -->
                  <div class="row">
                    <div class="col-2">
                      公用設備
                    </div>
                    <div class="col" id="equipment-checkboxes">
                      <!-- Print the payment method with check box -->
                      <?php
                      $sql = "SELECT * FROM `guesthouse_equipment_list`;";
                      $rs = mysqli_query($conn, $sql);

                      while ($method = mysqli_fetch_assoc($rs)) {
                        if ($method['equipment_id'] == '0') {
                          // empty
                        } else {
                          echo '<div class="form-check form-check-inline">';
                          echo '<input class="form-check-input equipment" type="checkbox" id="' . str_replace(' ', '', $method['en']) . '" value="' . $method['equipment_id'] . '" name="equipment[]">';
                          echo '<label class="form-check-label" for="' . str_replace(' ', '', $method['en']) . '">' . $method['zh-hk'] . '</label>';
                          echo '</div>';
                        }
                      }
                      ?>
                      <!-- Print the "Other" check box -->
                      <!-- <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" id="other-equipment" value="0" name="other-equipment-check">
                        <label class="form-check-label" for="other-equipment">其他</label>
                      </div>
                      <div class="hidden">
                        <input type="text" class="form-control" name="other-equipment-input" placeholder="(如適用)">
                      </div> -->
                    </div>
                  </div>
                  <!-- Submit -->
                  <div class="row">
                    <div class="col-md-12 text-end">
                      <button type="button" class="btn btn-primary" onclick="createGuesthouse('<?php echo $_SESSION['g_id'] ?>');">提交</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

      </div>
    </div>
    <!-- End of Content Wrapper -->

  </div>

</body>

</html>