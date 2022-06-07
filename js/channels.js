function createNewChannelPanel(link_to_avatar, conversation_name) {
    const body = document.createElement("div");
    body.classList.add("row");
    body.classList.add("sideBar-body");

    // --- BEGINNING OF AVATAR ---
    const avatar = document.createElement("div");
    avatar.classList.add("col-sm-3");
    avatar.classList.add("col-xs-3");
    avatar.classList.add("sideBar-avatar");

    const avatar_icon = document.createElement("div");
    avatar_icon.classList.add("avatar-icon");

    const avatar_image = document.createElement("img");
    avatar_image.src = link_to_avatar;

    avatar_icon.appendChild(avatar_image);
    avatar.appendChild(avatar_icon);
    body.appendChild(avatar);
    // --- END OF AVATAR ---

    // --- BEGINNING OF MAIN ---
    const main = document.createElement("div");
    main.classList.add("col-sm-9");
    main.classList.add("col-xs-9");
    main.classList.add("sideBar-main");

    const row = document.createElement("div");
    row.classList.add("row");

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("col-sm-8");
    nameDiv.classList.add("col-xs-8");
    nameDiv.classList.add("sideBar-name");

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name-meta");
    nameSpan.innerText = conversation_name;

    nameDiv.appendChild(nameSpan);

    const timeDiv = document.createElement("div");
    timeDiv.classList.add("col-sm-4");
    timeDiv.classList.add("col-xs-4");
    timeDiv.classList.add("pull-right");
    timeDiv.classList.add("sideBar-time");

    const timeSpan = document.createElement("span");
    timeSpan.classList.add("time-meta");
    timeSpan.classList.add("pull-right");
    timeSpan.innerText = "12:34"; // TODO : Add real hour of last message
    // --- END OF MAIN ---

    timeDiv.appendChild(timeSpan);

    row.appendChild(nameDiv);
    row.appendChild(timeDiv);

    main.appendChild(row);

    body.appendChild(main);

    document.querySelector(".sideBar").appendChild(body);
}

function createAllChannelPanels() {
    simpleAjax("get_all_channels.php", "post", "", request => {
        if (request.responseText) {
            let channels = JSON.parse(request.responseText);
            let keys = Object.keys(channels);

            for (const key_id in keys) {
                let values = Object.values(channels[keys[key_id]]);
                let conv_name = values[0];
                let users = values[1];
                let creator = values[2];
                let last_message_date = values[3];
                let avatar_link = values[4];
                createNewChannelPanel(avatar_link, conv_name);
            }
        }
    }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}

function loadAllChannelPanels() {
    createAllChannelPanels();

    window.setTimeout(() => {
        console.log("hi");
    }, 1000)

}

function createNewChannel() {
    // TODO : Add possibility to change the values from the user side
    let name = "HOLDER CONV";
    let users = ["user1",
        "user2"];
    let creator = "user1";
    let last_message_date = "06/06/2022";
    let avatar = "https://ui-avatars.com/api/?name=H+C";

    simpleAjax("add_channel_to_database.php", "post",
        `?name=${name}&users=${users}&creator=${creator}&last-message-date=${last_message_date}&avatar=${avatar}`,
        request => {
            if (request.responseText) {
                createNewChannelPanel(avatar, name);
            }
        }, on_failure)

    function on_failure() {
        console.log("Oh shit... here we go again...");
    }
}

function channelsSearchBar() {
    // get search bar element
    const searchInput = document.getElementById("searchText");

    // store name elements in array-like object
    const namesFromDOM = document.getElementsByClassName("sideBar-body");

    // listen for user events
    searchInput.addEventListener("keyup", (event) => {
        const { value } = event.target;

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