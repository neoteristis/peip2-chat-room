<?php
session_start();
unset($_SESSION["bad-signin"]);
unset($_SESSION["bad-signup"]);


$pseudo = ucfirst(strtolower($_POST["pseudo"]));
$password = hash("md5", $_POST["password1"]);
$first_name = ucfirst(strtolower($_POST["firstname"]));
$last_name = ucfirst(strtolower($_POST["lastname"]));
$avatar = "https://avatars.dicebear.com/api/adventurer-neutral/$pseudo.svg";

$file_data = file_get_contents('../resources/database/users.json');
$json = json_decode($file_data, true);

function toP($text){
    return "<p>".$text."</p>";
}
// Verify information
$_SESSION["bad-signup"] = "";
if (array_key_exists($pseudo, $json)) $_SESSION["bad-signup"] .= toP("This identity already exists. We do not support namesake at the moment.");
if (strlen($pseudo) < 3) $_SESSION["bad-signup"] .= toP("The login must consist of at least 3 characters.");
if (!ctype_alpha($pseudo)) $_SESSION["bad-signup"] .= toP("The login can only contain letters.");
if ($_POST["password1"] != $_POST["password2"]) $_SESSION["bad-signup"] .= toP("The passwords dont match");
if (strlen($_POST["password1"]) < 4) $_SESSION["bad-signup"] .= toP("The password must consist of at least 4 characters.");


// If there are errors don't do the signup.
if ($_SESSION["bad-signup"]!="") {
    header("Location: signup.php");
    exit();
}
unset($_SESSION["bad-signup"]);

// Save the information to the database
$json[$pseudo] = array(
    "firstname" => $first_name,
    "lastname" => $last_name,
    "password" => $password,
    "avatar" => $avatar,
    "channels" => [],
);
file_put_contents("../resources/database/users.json", json_encode($json, JSON_UNESCAPED_SLASHES));

// Add info to the session
$_SESSION["pseudo"] = $pseudo;

header("Location: ../home.php");
exit();
