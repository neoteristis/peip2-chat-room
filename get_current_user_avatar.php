<?php
    session_start();
    if (isset($_SESSION["pseudo"])) {
        $pseudo = $_SESSION["pseudo"];
        echo "https://avatars.dicebear.com/api/adventurer-neutral/" . $pseudo . ".svg";
    } else {
        session_unset();
        session_regenerate_id();
        session_destroy();
    }
    exit();
?>