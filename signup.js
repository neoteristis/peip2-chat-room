// teste si les champs du formulaire sont corrects et :
// - si ils le sont, retourne 'true'
// - sinon, affiche le message d'erreur adéquat dans
//   l'emplacement prévu à cet effet, et retourne 'false'

// TODO: Fix the form | User is still redirected to home page even with wrong input
function checkform() {
    let login = document.getElementById("pseudo").value;
    let password1 = document.getElementById("pass1").value;
    let password2 = document.getElementById("pass2").value;

    const promise = fetch("/resources/database/users.json")
        .then((response) => response.json())
        .then((user) => verifySignInData(user))
        .then((booleanValue) => {
            return booleanValue;
        });

    promise.then(booleanValue => {
        console.log(booleanValue);
        document.getElementById("submit").setAttribute("submit", "return " + booleanValue.toString());
        /**let submitDiv = document.getElementById("signup-form");
        submitDiv.submit();
        console.log(document.getElementById("submit").getAttribute("submit"));**/
        console.log(document);
        let form = document.getElementsByTagName("form")[0];
        console.log(form);
        form.submit();
    });

    /**
     * Verify that the element used to sign up are correct
     *
     * @param users_data
     * @returns {boolean}
     */
    function verifySignInData(users_data) {
        let users_pseudo = Object.keys(users_data);

        // Verify that the login doesn't already exists
        if (users_pseudo.includes(login)) {
            errormsg("This identity already exists. We do not support namesake at the moment.");
            return false;
        }

        // Verify that the login is correct
        // Two conditions :
        // - 3 characters long
        // - only letters
        if (login.length < 3) {
            errormsg("The login must consist of at least 3 characters.");
            return false;
        } else {
            if (login.match(/^[A-Za-z]+$/) === null) {
                errormsg("The login can only contain letters.");
                return false;
            }
        }

        // Verify that the password is correct
        // The only condition is that it is at least 4 characters long
        if (password1.length < 4) {
            errormsg("The password must consist of at least 4 characters.");
            return false;
        }

        // Verify that the second password is equal to the first one
        if (password1 !== password2) {
            errormsg("The second password is not the same as first one.");
            return false;
        }

        return true;
    }
    return document.getElementById("submit").getAttribute("submit");
}

// efface le contenu de l'élément où on affiche
// les messages d'erreur et cache cet élément
function resetform() {
    document.getElementById("erreur").style.visibility = "hidden";
    document.getElementById("erreur").innerText = "";
}

// écrit 'msg' dans l'élément où on affiche
// les messages d'erreur et montre cet élément
function errormsg(msg) {
    document.getElementById("erreur").style.visibility = "visible";
    document.getElementById("erreur").innerText = msg;
}
