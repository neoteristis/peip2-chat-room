<?php
    session_start();
    if (isset($_SESSION["pseudo"])) {
        echo $_SESSION["pseudo"];
    } else {
        session_unset();
        session_regenerate_id();
        session_destroy();
    }
    exit();
?>