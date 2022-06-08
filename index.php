<?php
    if (isset($_GET["pseudo"])) {
        header("Location: home.php");
    } else {
        header("Location: dosignup.php");
    }
?>