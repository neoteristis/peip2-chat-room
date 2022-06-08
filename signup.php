<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>TP 1 - Exo 4</title>
    <meta name="author" content="Marc Gaetano">
    <link rel="stylesheet" href="css/tp1.css">
    <link rel="stylesheet" href="css/exo4.css">
    <script src="signup.js"></script>
</head>
<body>
    <h1>TP 1 - Exo 4</h1>
    <hr>

    <h2>Formulaire d'inscription</h2>

    <form action="dosignup.php" method="post" onsubmit="return checkform()" onreset="resetform()">
        Choisissez votre pseudo (minimum 3 caractères, uniquement des lettres minuscules ou majuscules)
        <br>
        <label for="pseudo"></label>
        <input id="pseudo" type="text" name="pseudo">
        <br><br>
        Quel est votre prénom ?
        <br>
        <label for="firstname"></label>
        <input id="firstname" type="text" name="firstname">
        <br><br>
        Quel est votre nom ?
        <br>
        <label for="lastname"></label>
        <input id="lastname" type="text" name="lastname">
        <br><br>
        Choisissez votre mot de passe (minimum 4 caractères)
        <br>
        <label for="pass1"></label>
        <input id="pass1" type="password" name="password1">
        <br>
        Répétez votre mot de passe
        <br>
        <label for="pass2"></label>
        <input id="pass2" type="password" name="password2">
        <br><br>
        <input type="submit" value="S'inscrire">
        <input type="reset" value="Annuler">
    </form>

    <div id="erreur" style="visibility: hidden">
    </div>
</body>
</html>
