window.onload = function () {
    loadAllChannelPanels();

    // PERMET DE CLIQUER SUR DES TRUCS
    document.getElementById("new-channel").onclick = function () {
        createNewChannel();
    }
}