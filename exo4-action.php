<?php
	$login = $_POST[ "pseudo" ];
	$password = $_POST[ "password1" ];
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
    $avatar = "https://avatars.dicebear.com/api/adventurer-neutral/" . $login;
    $channels = "";

	$file_data = file_get_contents('resources/database/users.json');
    $json = json_decode($file_data, true);

    $json[$login] = array(
        "firstname" => $first_name,
        "lastname" => $last_name,
        "password" => $password,
        "avatar" => "https://avatars.dicebear.com/api/adventurer-neutral/{$login}.svg",
        "channels" => "3,2,1",
    );

    print("<pre>".print_r($json,true)."</pre>");
    // Save the information to the database
    file_put_contents("resources/database/users.json", json_encode($json, JSON_UNESCAPED_SLASHES));
?>
