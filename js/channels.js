/**
 * Add a new channel panel div to the HTML
 */
function createNewChannelPanel(id, link_to_avatar, conversation_name, selected) {

    const body = document.createElement("div");
    body.classList.add("row", "sideBar-body");
    body.setAttribute("id", "channel" + id);

    let onclickValue = `switchChannel(${id}, "${link_to_avatar}", "${conversation_name}")`;

    body.setAttribute("onclick", onclickValue);

    // TODO: fix the fact that it never enters in the if
    if (selected) {
        body.classList.add("selected-channel");
    }

    // --- BEGINNING OF AVATAR ---
    const avatar = document.createElement("div");
    avatar.classList.add("col-sm-3", "col-xs-3", "sideBar-avatar");

    const avatar_icon = document.createElement("div");
    avatar_icon.classList.add("avatar-icon");

    const avatar_image = document.createElement("img");
    avatar_image.src = link_to_avatar;
    avatar_image.setAttribute("onmouseover", `displayDeleteIcon(${id})`);
    let onclickValueDelete = `(function(){
        event.stopPropagation();
        deleteChannel(${id});
    })();`
    avatar_image.setAttribute("onclick", onclickValueDelete);
    avatar_image.setAttribute("onmouseout", `hideDeleteIcon(${id}, "${link_to_avatar}")`)

    avatar_icon.appendChild(avatar_image);
    avatar.appendChild(avatar_icon);
    body.appendChild(avatar);
    // --- END OF AVATAR ---

    // --- BEGINNING OF MAIN ---
    const main = document.createElement("div");
    main.classList.add("col-sm-9", "col-xs-9", "sideBar-main");

    const row = document.createElement("div");
    row.classList.add("row");

    // START OF NAME DIV
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("col-sm-8", "col-xs-8", "sideBar-name");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name-meta");
    nameSpan.innerText = conversation_name;

    nameDiv.appendChild(nameSpan);
    // END OF NAME DIV

    // START OF TIME DIV
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("col-sm-4", "col-xs-4", "pull-right", "sideBar-time");

    const timeSpan = document.createElement("span");
    timeSpan.classList.add("time-meta", "pull-right");
    timeSpan.innerText = "12:34"; // TODO : Add real hour of last message

    timeDiv.appendChild(timeSpan);
    // END OF TIME DIV

    // START OF UNREAD MESSAGE DIV
    const unreadDiv = document.createElement("div");
    unreadDiv.classList.add("col-sm-4", "col-xs-4", "sideBar-time");

    const unreadSpan = document.createElement("span");
    unreadSpan.classList.add("time-meta", "pull-right");
    unreadSpan.innerText = "0 unread"; // TODO : Add real hour of last message

    unreadDiv.appendChild(unreadSpan);
    // END OF UNREAD MESSAGE DIV

    row.appendChild(nameDiv);
    row.appendChild(timeDiv);
    row.appendChild(unreadDiv);

    main.appendChild(row);
    // --- END OF MAIN ---

    body.appendChild(main);

    document.querySelector(".sideBar").insertBefore(body, document.querySelector(".sideBar").firstChild);

    fillChannelHeading(link_to_avatar, conversation_name);

    if (document.getElementById("empty-channel")) {
        deleteEmptyChannelPanel();
    }
}

/**
 * Add panel that just says "No channel" to the HTML
 */
function createEmptyChannelPanel() {
    const body = document.createElement("div");
    body.classList.add("row", "sideBar-body");
    body.setAttribute("id", "empty-channel");

    // --- BEGINNING OF MAIN ---
    const main = document.createElement("div");
    main.classList.add("col-sm-9", "col-xs-9", "sideBar-main");

    const row = document.createElement("div");
    row.classList.add("row");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("col-sm-8", "col-xs-8", "sideBar-name");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name-meta");
    nameSpan.innerText = "There are no channels.";

    nameDiv.appendChild(nameSpan);
    row.appendChild(nameDiv);
    main.appendChild(row);
    // --- End of main ---
    body.appendChild(main);

    document.querySelector(".sideBar").appendChild(body);
}

/**
 * Function to delete the panel that appears when there are no existing channels
 */
function deleteEmptyChannelPanel() {
    document.getElementById("empty-channel").remove();
}

/**
 * Create all the channels panel from the database
 */
function createAllChannelsPanel() {
    simpleAjax("get_all_channels.php", "post", "", request => {
        if (request.responseText) {
            let channels = JSON.parse(request.responseText);
            let keys = Object.keys(channels);

            if (keys.length === 0) {
                createEmptyChannelPanel();
            } else {
                for (const key_id in keys.reverse()) {
                    let item_id = keys[key_id];
                    let values = Object.values(channels[item_id]);
                    let conv_name = values[0];
                    let users = values[1];
                    let creator = values[2];
                    let last_message_date = values[3];
                    let avatar_link = values[4];

                    if (key_id === "0") {
                        createNewChannelPanel(item_id, avatar_link, conv_name, true);
                    } else {
                        createNewChannelPanel(item_id, avatar_link, conv_name, false);
                    }
                }
            }
        }
    }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}

/**
 * Delete all the channels panel and recreate them all
 */
function refreshAllChannelPanels() {
    const content = document.getElementsByClassName("sideBar")[0];
    content.innerHTML = '';
    createAllChannelsPanel();
}

/**
 * Create a new channel in the database from a php script
 */
function createNewChannel() {
    // TODO : Add possibility to change the values from the user side
    let name = "HOLDER CONV";
    let users = ["user1",
        "user2"];
    let creator = "user1";
    let last_message_date = "06/06/2022";

    simpleAjax("add_channel_to_database.php", "post",
        `?name=${name}&users=${users}&creator=${creator}&last-message-date=${last_message_date}`,
        request => {
            if (request.responseText) {
                let info = request.responseText.split(" ");
                let id = info[0];
                let link_to_avatar = info[1];
                createNewChannelPanel(id, link_to_avatar, name, false);
                switchChannel(id, link_to_avatar, name);
            }
        }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}

/**
 * Make the search bar functional by displaying what is searched
 */
function channelsSearchBar() {
    // get search bar element
    const searchInput = document.getElementById("searchText");

    // store name elements in array-like object
    const namesFromDOM = document.getElementsByClassName("sideBar-body");

    // listen for user events
    searchInput.addEventListener("keyup", (event) => {
        const {value} = event.target;

        // get user search input converted to lowercase
        const searchQuery = value.toLowerCase();

        for (const nameElement of namesFromDOM) {
            // store name text and convert to lowercase
            let nameSpan = nameElement.getElementsByClassName("name-meta")[0];
            let name = nameSpan.textContent.toLowerCase();

            // compare current name to search input
            if (name.includes(searchQuery)) {
                // found name matching search, display it
                nameElement.style.display = "block";
            } else {
                // no match, don't display name
                nameElement.style.display = "none";
            }
        }
    });
}

/**
 * Display a trashcan icon on the channel panel
 * Is triggered by a mouseover
 */
function displayDeleteIcon(id) {
    let image_link = "https://toppng.com/uploads/preview/big-trash-can-vector-trash-can-icon-1156305906701r6eta2fm.png"
    const body = document.querySelector(`.sideBar`);
    const panel = body.querySelector(`[id='channel${id}']`);
    const avatar_icon = panel.querySelector(".avatar-icon");
    const avatar_image = avatar_icon.firstChild;
    avatar_image.src = image_link;
}

/**
 * Hide the trashcan icon by displaying the avatar image of the conversation
 * Is triggered by a mouseout
 */
function hideDeleteIcon(id, link_to_avatar) {
    const body = document.querySelector(`.sideBar`);
    const panel = body.querySelector(`[id='channel${id}']`);
    const avatar_icon = panel.querySelector(".avatar-icon");
    const avatar_image = avatar_icon.firstChild;
    avatar_image.src = link_to_avatar;
}

/**
 * Remove the channel panel from the HTML
 * Call the php script to remove a channel from the database
 *
 * Is triggered by an onclick on the channel panel trashcan icon
 */
function deleteChannel(id) {
    simpleAjax("remove_channel_from_database.php", "post",
        `id=${id}`,
        request => {
            getIdMostRecentConv().then(
                res_id => {
                    if (res_id === "0") {
                        createEmptyChannelPanel();
                    } else {
                        let new_id = parseInt(res_id.toString());
                        let div = document.getElementById("channel" + new_id);
                        let img = div.getAttribute("onclick").split(", ")[1].replace('"', "");
                        let channel_name = div.getElementsByClassName("name-meta")[0].innerText;
                        switchChannel(new_id, img, channel_name);
                    }
                }
            );
        }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }

    const body = document.querySelector(`.sideBar`);
    const panel = body.querySelector(`[id='channel${id}']`);

    panel.remove();

    removeConversationContentFromHTML();

}

/**
 * Switch to a new channel by selecting the panel of the new channel
 * Display the conversation of the selected channel
 */
function switchChannel(new_id, avatar_link, name) {
    let old = document.getElementsByClassName("selected-channel")[0];
    if (old !== undefined) {
        old.classList.remove("selected-channel");
    }
    const body = document.getElementById("channel" + new_id);
    body.classList.add("selected-channel");

    if (avatar_link !== undefined && name !== undefined) {
        fillChannelHeading(avatar_link, name);
    }

    createConversation(new_id);
}

async function getIdMostRecentConv() {
    // TODO : Write function to get the id of the most recent conv

    // For the moment it only get the first conversation by ID
    try {
        let response = await fetch("get_id_most_recent_conv.php");
        return response.text();
    } catch (e) {
        return 0;
    }

}

/**
 * Update the heading of the channel that is placed above a conversation
 */
function fillChannelHeading(avatar_link, name) {
    document.getElementsByClassName("conversation")[0]
        .getElementsByClassName("heading-avatar-icon")[0]
        .getElementsByTagName("img")[0].src = avatar_link;
    document.getElementsByClassName("heading-name-meta")[0].innerHTML = name;

}