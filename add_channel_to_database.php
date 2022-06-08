<?php
    function generateRandomString($length = 25) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
    }

    $name = generateRandomString(10);
    $users = ["user1",
              "user2"];
    $creator = "user1";
    $last_message_date = "06/06/2022";
    $avatar = "https://ui-avatars.com/api/?name=" . $name[0] . "+" . $name[1];

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

    // Create the file that will hold the conversations
    $file = fopen("resources/database/conversations/{$id}.csv", "a");
    fclose($file);

    // Output the data to the AJAX method
    echo $id . " " . $avatar;
?>
