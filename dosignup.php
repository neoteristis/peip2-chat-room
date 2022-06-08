<?php
	$login = $_POST[ "pseudo" ];
	$password = hash("md5", $_POST["password1"]);
	$first_name = $_POST["firstname"];
	$last_name = $_POST["lastname"];
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

    // Save the information to the database
    file_put_contents("resources/database/users.json", json_encode($json, JSON_UNESCAPED_SLASHES));

    header("Location: home.php");
?>
