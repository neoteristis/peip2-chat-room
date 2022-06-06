<?php
    if (isset($_GET["login"])) {
        header("Location: home.html");
    } else {
        header("Location: exo4-formulaire.html");
    }
?>