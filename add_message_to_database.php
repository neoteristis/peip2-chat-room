<?php

    function format_message($message) {
        $output = [];

        preg_match_all('~<(.*?)>~', $message, $output);
        print_r($output[1]);
    }

    $id = $_POST["id"];
    $author = $_POST["author"];
    $timestamp = $_POST["timestamp"];
    $message = $_POST["message"];

    $message = $_GET["message"];

    $formatted_message = format_message($message);

    $line = [$author,$timestamp,$formatted_message];

    $handle = fopen("resources/database/conversations/{$id}.csv", "a");
    fputcsv($handle, $line); // Line is an array of strings
    fclose($handle);
?>