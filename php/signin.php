<?php
session_start();

if (isset($_SESSION["pseudo"])) {
    header("Location: ../home.php");
}
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <title>TP 1 - Exo 4</title>
    <meta name="author" content="Marc Gaetano">
    <link rel="stylesheet" href="../css/tp1.css">
    <link rel="stylesheet" href="../css/exo4.css">
    <script src="../js/signup.js"></script>
</head>

<body>
    <h1>TP 1 - Exo 4</h1>
    <hr>

    <h2>Formulaire d'inscription</h2>

    <a href="signup.php">Créer un compte</a>

    <form action="dosignin.php" method="post" onreset="resetform()" id="signup-form">

        Introduisez votre pseudo :
        <br>
        <label for="pseudo"></label>
        <input id="pseudo" type="text" name="pseudo">
        <br><br>
        Introduisez votre mot de passe :
        <br>
        <label for="pass1"></label>
        <input id="pass1" type="password" name="password">
        <br>

        <input id="submit" type="submit" value="S'inscrire">
        <input type="reset" value="Annuler">
    </form>

    <?php
    if (isset($_SESSION["bad-signin"])) {
        echo "<div id='erreur'>";
        echo $_SESSION["bad-signin"];
        echo "</div>";
    }
    ?>

</body>

</html>