<?php
	$pseudo = $_POST[ "pseudo" ];
	$password = hash("md5", $_POST["password1"]);
	$first_name = $_POST["firstname"];
	$last_name = $_POST["lastname"];
    $avatar = "https://avatars.dicebear.com/api/adventurer-neutral/" . $pseudo;
    $channels = "";

	$file_data = file_get_contents('resources/database/users.json');
    $json = json_decode($file_data, true);

    $json[$pseudo] = array(
        "firstname" => $first_name,
        "lastname" => $last_name,
        "password" => $password,
        "avatar" => "https://avatars.dicebear.com/api/adventurer-neutral/{$pseudo}.svg",
        "channels" => $channels,
    );

    // Save the information to the database
    file_put_contents("resources/database/users.json", json_encode($json, JSON_UNESCAPED_SLASHES));

    // Start the session
    session_start();
    $_SESSION["pseudo"] = $pseudo;

    header("Location: home.php");

    exit();
?>
