// settings for the different games
{
    let open = false;
    function settings() {
        document.getElementById("settingsOptions").style.display = "";
        if (open == false) {
            document.getElementById("settings").innerHTML = "Back";
        } else {
            document.getElementById("settings").innerHTML = "Settings";
        }
        open = !open;
    }
}