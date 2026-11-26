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

    // bold currently active settings
    /*
    document.getElementById("blue").style.borderWidth = `${8}px`;
    document.getElementById("cherry").style.borderWidth = `${8}px`;
    document.getElementById("one").style.borderWidth = `${8}px`;
    document.getElementById("normal").style.borderWidth = `${8}px`;
    */

    // set up the examples
    // snake color example
    for (let i = 0; i < 15; i++) {
        let div = document.createElement("div");
        div.classList.add("exampleSquare");
        div.id = 
    }
}
