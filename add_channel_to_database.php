<?php
    $name = "HOLDER CONV";
    $users = ["user1",
              "user2"];
    $creator = "user1";
    $last_message_date = "06/06/2022";
    $avatar = "https://ui-avatars.com/api/?name=H+C";

	$file_data = file_get_contents('resources/database/channels.json');
    $json = json_decode($file_data, true);

    $id = max(array_keys($json)) + 1;

    $json[$id] = array(
        "name" => $name,
        "users" => $users,
        "creator" => $creator,
        "last-message-date" => $last_message_date,
        "avatar" => $avatar,
    );

    // Save the information to the database
    file_put_contents("resources/database/channels.json", json_encode($json, JSON_UNESCAPED_SLASHES));

    header("Location: home.html");
?>