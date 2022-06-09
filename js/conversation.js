function createConversation(id) {
    simpleAjax("create_conversation.php", "post", `id=${id}`, request => {
        if (request.responseText) {
            let conversation = JSON.parse(request.responseText);
            let keys = Object.keys(conversation);

            removeConversationContentFromHTML()

            for (const key_id in keys) {
                let item_id = keys[key_id];
                let values = Object.values(conversation[item_id]);
                let author = values[0];
                let timestamp = values[1];
                let message = values[2];

                if (getCurrentUser() === author) {
                    createMessagePanel("sender", author, timestamp, message);
                } else {
                    createMessagePanel("receiver", author, timestamp, message);
                }
            }
            const convDiv = document.getElementById("conversation");
            convDiv.scrollTop = convDiv.scrollHeight;
        }
    }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}

function createMessagePanel(type, user, timestamp, message) {
    const body = document.createElement("div");
    body.classList.add("row");
    body.classList.add("message-body");

    const main = document.createElement("div");
    main.classList.add("col-sm-12");
    if (type === "receiver") {
        main.classList.add("message-main-receiver");
    } else {
        main.classList.add("message-main-sender");
    }

    const container = document.createElement("div");
    if (type === "receiver") {
        container.classList.add("receiver");
    } else {
        container.classList.add("sender");
    }

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message-text");
    // MIGHT BE A MISTAKE
    // messageDiv.innerText = message;
    messageDiv.innerHTML = message;

    const dateDiv = document.createElement("span");
    dateDiv.classList.add("message-time");
    dateDiv.classList.add("pull-right");
    dateDiv.innerText = timestamp;

    container.appendChild(messageDiv);
    container.appendChild(dateDiv);

    main.appendChild(container);

    body.appendChild(main);

    document.querySelector("#conversation").appendChild(body);
}

function sendNewMessage() {
    const convInput = document.getElementById("comment");
    let message = convInput.value;
    convInput.value = "";

    const convDiv = document.getElementById("conversation");
    convDiv.scrollTop = convDiv.scrollHeight;

    let id = getCurrentConvId();
    let author = getCurrentUser();
    let timestamp = "12:12:12 12/30/42";

    if (id !== "0") {
        simpleAjax("add_message_to_database.php", "post",
            `id=${id}&author=${author}&timestamp=${timestamp}&message=${message}`,
            request => {
                if (request.responseText) {
                    // Change with only an update
                    createMessagePanel("sender", "username", "DATE", request.responseText);
                }
            }, on_failure)

        function on_failure() {
            console.log("Oh shit... here we go again...");
        }
    }
}

function removeConversationContentFromHTML() {
    const content = document.getElementById("conversation");
    content.innerHTML = '';
}

function getCurrentConvId() {

    try {
        return document.getElementsByClassName("selected-channel")[0].id.replace("channel", "");
    } catch (e) {
        return getIdMostRecentConv();
    }
}

function getCurrentUser() {
    return document.getElementById("current-user-pseudo").innerText;
}

// Management of the keys being pressed for shortcuts in the text area
let keysPressed = {};

function keyDownEvent(event) {
    keysPressed[event.key] = true;

    if (keysPressed["Shift"] && keysPressed["Enter"]) {
        sendNewMessage();
    }
    return false;
}

function keyUpEvent(event) {
    keysPressed[event.key] = false;
    return false;
}
