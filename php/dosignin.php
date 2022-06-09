<?php
session_start();
unset($_SESSION["bad-signin"]);
unset($_SESSION["bad-signup"]);


$pseudo = ucfirst(strtolower($_POST["pseudo"]));
$password = hash("md5", $_POST["password"]);

$file_data = file_get_contents('../resources/database/users.json');
$json = json_decode($file_data, true);

function toP($text) {
    return "<p>".$text."</p>";
}
// Verify information
if (!array_key_exists($pseudo, $json)) $_SESSION["bad-signin"] .= toP("Le pseudo n'existe pas.");
else{
    if ($json[$pseudo]["password"]!=$password) $_SESSION["bad-signin"] = toP("Le pseudo et le password ne correspondent pas.");
}


// If there are errors don't do the signuin.
if (isset($_SESSION["bad-signin"])) {
    header("Location: signin.php");
    exit();
}

// Add info to the session
$_SESSION["pseudo"] = $pseudo;

header("Location: ../home.php");
exit();
