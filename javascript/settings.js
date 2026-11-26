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

    // set up the examples
    // snake color example
    for (let i = 0; i < 15; i++) {
        let div = document.createElement("div");
        div.classList.add("exampleSquare");
        div.id = `color${i}`;
        if (i % 2 == 0) {
            div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
            exampleFieldColor[i] = `rgb(${0}, ${255}, ${0})`;
        } else {
            div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
            exampleFieldColor[i] = `rgb(${0}, ${200}, ${0})`;
        }
        document.getElementById("colorExample").appendChild(div);
    }

    // food type example
    for (let i = 0; i < 15; i++) {
        let div = document.createElement("div");
        div.classList.add("exampleSquare");
        div.id = `food${i}`;
        if (i % 2 == 0) {
            div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
        } else {
            div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
        }
        document.getElementById("foodExample").appendChild(div);
    }

    // speed example
    for (let i = 0; i < 15; i++) {
        let div = document.createElement("div");
        div.classList.add("exampleSquare");
        div.id = `speed${i}`;
        if (i % 2 == 0) {
            div.style.backgroundColor = `rgb(${0}, ${255}, ${0})`;
        } else {
            div.style.backgroundColor = `rgb(${0}, ${200}, ${0})`;
        }
        document.getElementById("speedExample").appendChild(div);
    }
}
