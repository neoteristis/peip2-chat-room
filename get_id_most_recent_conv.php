<?php
    $file_data = file_get_contents('resources/database/channels.json');
    $json = json_decode($file_data, true);

    // TODO : Get most recent conv id
    if (!(count(array_keys($json)) == 0)) {
        echo (int) array_keys($json)[0];
    } else {
        echo 0;
    }
?>