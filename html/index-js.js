window.onload = function () {

    var radionum = localStorage.getItem("RadioNumber");

    if (radionum == "1") {
        SelectBackground(1);
    } else if (radionum == "2") {
        SelectBackground(2);
    }

    init();
    
    time();

    setInterval("time()", 1000);
}

function SelectBackground(value) {
    var backs = document.getElementsByName('backgroup');

    if (value == "1") {
        var BackImg = new Array();
        BackImg[0] = "spring.jpg";
        BackImg[1] = "summer.jpg";
        BackImg[2] = "fall.jpg"
        BackImg[3] = "winter.jpg";
        BackImg[4] = "sky.jpg";

        var num = Math.round(Math.random() * 4);
        document.body.style.backgroundImage = "url('" + BackImg[num] + "')";
        localStorage.setItem("RadioNumber", "1");
        backs[0].checked = true;
        document.getElementById("back2").style.display = "none";
        document.getElementById("leftbox").style.display = "none";
        document.getElementById("rightbox").style.display = "none";
    } else if (value == "2") {
        localStorage.setItem("RadioNumber", "2");
        document.getElementById("back2").style.display = "block";
        document.getElementById("leftbox").style.display = "block";
        document.getElementById("rightbox").style.display = "block";
        backs[1].checked = true;
    }
}

function init() {
    var name = document.getElementById("setname");
    var todolist = document.getElementById("todolist");
    var list = localStorage.getItem("todolist");

    if (list != null) {
        var str = list.split(',');

        if (todolist != null) {
            while (todolist.hasChildNodes()) {
                todolist.removeChild(todolist.firstChild);
            }
        }

        for (var i = str.length - 1; i >= 0; i--) {
            var button = document.createElement('button');
            var divbox = document.createElement('div');
            var box = document.createElement('div');

            button.id = "button_" + i;
            divbox.id = "div_" + i;
            box.id = "box_" + i;

            button.setAttribute("onclick", "remove(this.id)");

            divbox.innerHTML = str[i];
            button.innerHTML = "삭제";

            divbox.style.display = "inline-block";
            button.style.display = "inline-block";

            box.style.borderRadius = "30px";
            box.style.height = "50px";
            box.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            box.style.lineHeight = "50px";
            box.style.marginBottom = "20px";

            divbox.style.marginRight = "20px";
            button.style.right = "30px";
            button.style.backgroundColor = "lightgray";


            if (str[i] != "") {
                box.appendChild(divbox);
                box.appendChild(button);
                todolist.appendChild(box);
            }
        }
    }

    init2();
}

function time() {
    var setname = document.getElementById("setname");
    var pc = document.getElementById("pc");
    var time = new Date();
    document.getElementById("now").innerHTML = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

    if (localStorage.getItem("name") != null) {
        setname.style.display = "none";
        if (time.getHours() < 12 && time.getHours() >= 7) {
            pc.innerHTML = "Good Morning, " + localStorage.getItem("name");
        } else if (time.getHours() < 17 && time.getHours() >= 12) {
            pc.innerHTML = "Good afternoon, " + localStorage.getItem("name");
        } else if (time.getHours() < 21 && time.getHours() >= 17) {
            pc.innerHTML = "Good evening, " + localStorage.getItem("name");
        } else if (time.getHours() < 24 && time.getHours() >= 21) {
            pc.innerHTML = "Good night, " + localStorage.getItem("name");
        } else if (time.getHours() < 7) {
            pc.innerHTML = "Good midnight, " + localStorage.getItem("name");
        }
    }
    clearInterval("time()");
}

function Clear(clicked_id) {
    document.getElementById(clicked_id).value = null;
}

function Enter_Check() {
    if (event.keyCode == 13) {
        var name = document.getElementById("setname");
        document.getElementById("pc").innerHTML = "Hello, " + name.value + "님";
        name.style.display = "none";
        localStorage.setItem("name", name.value);
    }
}

function todolist() {
    var todolist = document.getElementById("todolist");
    var todo = document.getElementById("todo");

    if (localStorage.getItem("todolist") == null) {
        var list = "";
    } else {
        var list = localStorage.getItem("todolist");
    }

    list += document.getElementById("todo").value + ",";
    localStorage.setItem("todolist", list);

    if (list != null) {
        var str = list.split(',');

        if (todolist != null) {
            while (todolist.hasChildNodes()) {
                todolist.removeChild(todolist.firstChild);
            }
        }

        for (var i = str.length - 1; i >= 0; i--) {
            var button = document.createElement('button');
            var divbox = document.createElement('div');
            var box = document.createElement('div');

            button.id = "button_" + i;
            divbox.id = "div_" + i;
            box.id = "box_" + i;

            button.setAttribute("onclick", "remove(this.id)");

            divbox.innerHTML = str[i];
            button.innerHTML = "삭제";

            divbox.style.display = "inline-block";
            button.style.display = "inline-block";

            box.style.borderRadius = "30px";
            box.style.height = "50px";
            box.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            box.style.lineHeight = "50px";
            box.style.marginBottom = "20px";

            divbox.style.marginRight = "20px";
            button.style.right = "30px";


            if (str[i] != "") {
                box.appendChild(divbox);
                box.appendChild(button);
                todolist.appendChild(box);
            }
        }
    }
    todo.value = "";
}

function todolist2() {
    if (event.keyCode == 13) {
        var todolist = document.getElementById("todolist");
        var todo = document.getElementById("todo");

        if (localStorage.getItem("todolist") == null) {
            var list = "";
        } else {
            var list = localStorage.getItem("todolist");
        }

        list += document.getElementById("todo").value + ",";
        localStorage.setItem("todolist", list);

        if (list != null) {
            var str = list.split(',');

            if (todolist != null) {
                while (todolist.hasChildNodes()) {
                    todolist.removeChild(todolist.firstChild);
                }
            }

            for (var i = str.length - 1; i >= 0; i--) {
                var button = document.createElement('button');
                var divbox = document.createElement('div');
                var box = document.createElement('div');

                button.id = "button_" + i;
                divbox.id = "div_" + i;
                box.id = "box_" + i;

                button.setAttribute("onclick", "remove(this.id)");

                divbox.innerHTML = str[i];
                button.innerHTML = "삭제";

                divbox.style.display = "inline-block";
                button.style.display = "inline-block";

                box.style.borderRadius = "30px";
                box.style.height = "50px";
                box.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                box.style.lineHeight = "50px";
                box.style.marginBottom = "20px";

                divbox.style.marginRight = "20px";
                button.style.right = "30px";


                if (str[i] != "") {
                    box.appendChild(divbox);
                    box.appendChild(button);
                    todolist.appendChild(box);
                }
            }
        }
        todo.value = "";
    }
}

function remove(clicked_id) {
    if (confirm("삭제하시겠습니까?") == true) {
        var click_id = clicked_id.split('_');
        var list = localStorage.getItem("todolist");

        var str = "div_" + click_id[1];
        var str2 = "box_" + click_id[1];

        var button = document.getElementById(clicked_id);
        var divbox = document.getElementById(str);
        var box = document.getElementById(str2);

        var list2 = list.replace(divbox.innerHTML + ",", "");

        localStorage.setItem("todolist", list2);

        divbox.remove();
        button.remove();
        box.remove();
    }
}


function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${"d330ecdaa40750cf755f58d071fee78c"}&units=metric`).then(function (response) {
        return response.json();
    }).then(function (json) {
        const weather = document.getElementById("js-weather");
        const temperature = json.list[0].main.temp;
        const place = json.city.name;
        const curwea = json.list[0].weather[0].main;

        weather.innerHTML = "현재 기온 : " + temperature + "℃<br>지역 : " + place + "<br>날씨 : " + curwea;
        weather.innerHTML += "<img src = 'http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png' id = 'image2'>";
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem("coords");
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init2() {
    loadCoords();
}

function button_default() {
    if (confirm("초기화 하시겠습니까?") == true) {
        localStorage.clear();
        window.location.reload();
    }
}
