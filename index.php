<?php
    if (isset($_POST["pseudo"])) {
        header("Location: home.php");
    } else {
        header("Location: php/signin.php");
    }
?>