<?php

$id = $_POST["id"];

$file = fopen("resources/database/conversations/{$id}.csv", "r");

$csvData = array();

$i = 0;
while (($row = fgetcsv($file, 0, ",")) !== FALSE) {
    $csvData[$i] = $row;
    $i++;
}

echo json_encode($csvData, JSON_UNESCAPED_SLASHES);