<?php
    $id = $_POST["id"];

    unlink("resources/database/conversations/{$id}.csv");

    $file_data = file_get_contents('resources/database/channels.json');
    $json = json_decode($file_data, true);

    unset($json[$id]);

    file_put_contents("resources/database/channels.json", json_encode($json, JSON_UNESCAPED_SLASHES));
?>