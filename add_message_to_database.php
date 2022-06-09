<?php

    function format_message($message) {
        // Italic + Bold
        $message = preg_replace("~'''''(.*?)'''''~", '<i><b>\1</b></i>', $message);
        // Only bold
        $message = preg_replace("~[^']'''([^'].*?[^'])'''~", '<b>\1</b>', $message);
        // Only italic
        $message = preg_replace("~[^']''([^'].*?[^'])''~", '<i>\1</i>', $message);
        // Link
        $message = preg_replace("\[(.*?)\|(.*?)\]", "<a href='\1'>\2</a>", $message);
        return $message;
    }

    $id = $_POST["id"];
    $author = $_POST["author"];
    $timestamp = $_POST["timestamp"];
    $message = $_POST["message"];

    $formatted_message = format_message($message);
    $line = [$author,$timestamp,$formatted_message];

    $handle = fopen("resources/database/conversations/{$id}.csv", "a");
    fputcsv($handle, $line); // Line is an array of strings
    fclose($handle);

    echo $formatted_message;
?>