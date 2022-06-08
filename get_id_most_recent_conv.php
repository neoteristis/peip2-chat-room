<?php
    $file_data = file_get_contents('resources/database/channels.json');
    $json = json_decode($file_data, true);

    echo (int) array_keys($json)[0];
?>