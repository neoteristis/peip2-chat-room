<?php
    $id = $_POST["id"];
    $author = $_POST["author"];
    $timestamp = $_POST["timestamp"];
    $message = $_POST["message"];

    $line = [$author,$timestamp,$message];

    $handle = fopen("resources/database/conversations/{$id}.csv", "a");
    fputcsv($handle, $line); // Line is an array of strings
    fclose($handle);
?>