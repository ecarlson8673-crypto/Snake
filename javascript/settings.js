// settings for the different games
{
    let open = false;
    function settings() {
        if (open == false) {
            document.getElementById("settings").innerHTML = "Back";
            document.getElementById("settingsOptions").style.display = "";
        } else {
            document.getElementById("settings").innerHTML = "Settings";
            document.getElementById("settingsOptions").style.display = "none";
        }
        open = !open;
    }
}
