<?php

$id = $_POST["id"];
$id = 1;
$file = fopen("resources/database/conversations/{$id}.csv", "r");

$csvData = array();

$i = 0;
while (($row = fgetcsv($file, 0, ",")) !== FALSE) {
    $csvData[$i] = $row;
    $i++;
}

$reverse_row = array_reverse($csvData, true);

echo json_encode($reverse_row, JSON_UNESCAPED_SLASHES);