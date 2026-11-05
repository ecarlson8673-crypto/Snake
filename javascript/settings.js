// settings for the different games
function settings() {
    document.getElementById("settingsOptions").style.display = "";
    if (game == "original") {
        document.getElementById("forOriginal").style.display = "";
    } else if (game == "multi") {
        document.getElementById("forMulti").style.display = "";
    }
}