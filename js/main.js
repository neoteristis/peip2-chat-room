window.onload = function () {
    createAllChannelsPanel();

    let div = document.getElementsByClassName("selected-channel")[0];
    if (div !== undefined) {
        let id_number = div.id.replace("channel", "");
        createConversation(id_number);
    }

    /**
     * Event handler that create a new channel when the button is clicked
     */
    document.getElementById("new-channel").onclick = function () {
        createNewChannel();
    }

    /**
     * Constantly updated to be reactive when someone is searching an item in the search bar
     **/
    window.setInterval(function () {
        channelsSearchBar();
    }, 10);

    document.querySelector('#comment').addEventListener('keydown', keyDownEvent);
    document.querySelector('#comment').addEventListener('keyup', keyUpEvent);

    /**
     // TODO: AutoGrow the chat input box | I need to change the css to let some place to the box
     function auto_grow(element) {
        element.style.height = "5px";
        element.style.height = (element.scrollHeight)+"px";
    }
     console.log(document.getElementById("comment"));
     auto_grow(document.getElementById("comment"));**/

    update_user_profile();

    window.setInterval(function () {
        let id = getCurrentConvId();

        if (typeof id === 'object' && typeof id.then === 'function') {
            id.then(item => {
                if (item !== "0") {
                    createConversation(item)
                }
            });
        }
    }, 10)
}