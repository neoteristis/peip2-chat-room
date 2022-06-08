window.onload = function () {
    createAllChannelsPanel();

    // TODO : Error ID not found because undefined element
    let div = document.getElementsByClassName("selected-channel")[0];
    let id_number;
    if (div === undefined) {
        // TODO : Find the id of the most recent conv
        id_number = 1;
    } else {
        id_number = div.id.replace("channel", "");
    }
    createConversation(id_number);

    document.getElementById("new-channel").onclick = function () {
        createNewChannel();
    }

    window.setInterval(function () {
        channelsSearchBar();
    }, 10);

    // TODO : Not working

    document.querySelector('#comment').addEventListener('keydown', keyDownEvent);

    document.querySelector('#comment').addEventListener('keyup', keyUpEvent)
}