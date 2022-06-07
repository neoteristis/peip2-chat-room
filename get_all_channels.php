<?php
    /*
    Returns an array containing all the informations about all the channels
    */
    $json = file_get_contents("resources/database/channels.json", true);
    $data = json_encode(json_decode($json, true), JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo $data;
    exit();
?>