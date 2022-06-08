window.onload = function () {
    createAllChannelsPanel();

    // TODO : Error ID not found because undefined element
    let div = document.getElementsByClassName("selected-channel")[0];
    if (div !== undefined) {
        let id_number = div.id.replace("channel", "");
        createConversation(id_number);
    }

    document.getElementById("new-channel").onclick = function () {
        createNewChannel();
    }

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
}