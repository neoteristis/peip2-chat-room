function createConversation(id) {
    simpleAjax("create_conversation.php", "post", `id=${id}`, request => {
        if (request.responseText) {
            let conversation = JSON.parse(request.responseText);
            let keys = Object.keys(conversation);

            for (const key_id in keys.reverse()) {
                let item_id = keys[key_id];
                let values = Object.values(conversation[item_id]);
                let author = values[0];
                let timestamp = values[1];
                let message = values[2];

                // TODO : Choose user type correctly
                let user_type = "sender"

                createMessagePanel(user_type, author, timestamp, message);
            }
        }
    }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}

function createMessagePanel(type, user, timestamp, message) {
    // TODO : Implement the fact that if the user is the sender then it is a specific class of message
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
    messageDiv.innerText = message;

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
    createMessagePanel("sender", "username", "DATE", message);

    let id = getCurrentConvId();
    let author = getCurrentUser();
    let timestamp = "12:12:12 12/30/42";

    console.log(id, author, timestamp, message);

    simpleAjax("add_message_to_database.php", "post",
        `id=${id}&author=${author}&timestamp=${timestamp}&message=${message}`,
        request => {
            if (request.responseText) {
                refreshConversation();
            }
        }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}

function refreshConversation() {
    const content = document.getElementById("conversation");
    content.innerHTML = '';
    createConversation();
}

function getCurrentConvId() {
    return 1;
}

function getCurrentUser() {
    return "naxomi";
}