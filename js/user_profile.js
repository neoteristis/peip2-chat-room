/**
 * Update the box at the top left of the screen that contains the user name, pseudo and avatar
 */
function update_user_profile() {
    simpleAjax("get_current_user_avatar.php", "post",
        "",
        request => {
            if (request.responseText) {
                document.getElementById("current-user-avatar").src = request.responseText;
            }
        }, on_failure)

    simpleAjax("get_current_user_pseudo.php", "post",
        "",
        request => {
            if (request.responseText) {
                console.log(request.responseText);
                document.getElementById("current-user-pseudo").innerText = request.responseText;
            }
        }, on_failure);

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}