new Vue({
    el : "#wrap",
    data : {
        temperature : '',
        place : '',
        weather : '',
        weather_icon_url : '',
        check_radio1 : 'checked',
        check_radio2 : 'non-checked',
        Background_Image : ['spring.jpg', 'summer.jpg', 'fall.jpg', 'winter.jpg', 'sky.jpg'],
        radio_display : 'block',
        backImg : {
            backgroundImage : '',
        },
    },
    methods : {
        init() {
            this.loadCoords();
        },
        loadCoords() {
            const loadedCoords = localStorage.getItem("coords");
            if (loadedCoords === null) {
                this.askForCoords();
            } else {
                const parsedCoords = JSON.parse(loadedCoords);
                this.getWeather(parsedCoords.latitude, parsedCoords.longitude);
            }
        },
        askForCoords() {
            navigator.geolocation.getCurrentPosition(this.handleGeoSucces, this.handleGeoError);
        },
        handleGeoError() {
            console.log("Cant access geo location");
        },
        handleGeoSucces(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const coordsObj = {
                latitude,
                longitude
            };
            this.saveCoords(coordsObj);
            this.getWeather(latitude, longitude);
        },
        saveCoords(coordsObj) {
            localStorage.setItem("coords", JSON.stringify(coordsObj));
        },
        getWeather(lat, lon) {
            /*fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${"d330ecdaa40750cf755f58d071fee78c"}&units=metric`).then(function (response) {
                return response.json();
            }).then(function (json) {
                const weather = document.getElementById("js-weather");
                const temperature = json.list[0].main.temp;
                const place = json.city.name;
                const curwea = json.list[0].weather[0].main;
        
                weather.innerHTML = "현재 기온 : " + temperature + "℃<br>지역 : " + place + "<br>날씨 : " + curwea;
                weather.innerHTML += "<img src = 'http://openweathermap.org/img/w/" + json.list[0].weather[0].icon + ".png' id = 'image2'>";
            });*/
            var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=d330ecdaa40750cf755f58d071fee78c&units=metric";

            axios.get(url)
                .then(response => {
                    this.temperature = response.data.list[0].main.temp;
                    this.place = response.data.city.name;
                    this.weather = response.data.list[0].weather[0].main;
                    this.weather_icon = response.data.list[0].weather[0].icon;

                    this.weather_icon_url = "http://openweathermap.org/img/w/" + this.weather_icon + ".png";
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        SelectBackground(value) {

            if(value == 1 || value == null){
                var num = Math.round(Math.random() * 4);

                this.check_radio1 = "checked";
                this.check_radio2 = "";
                this.radio_display = "none";

                this.backImg.backgroundImage = "url('" + this.Background_Image[num] + "')";

                console.log(this.backImg.backgroundImage);
                console.log(this.radio_display);
            } else if(value == 2){
                this.check_radio2 = "checked";
                this.check_radio1 = "";
                this.radio_display = "block";

                console.log(this.radio_display);
            }
        }
    },
    created() {
        this.init();

        this.SelectBackground();
    },
})





window.onload = function () {

    init();

    time();

    setInterval("time()", 1000);
}

function SelectBackground(value) {

    // if (value == "1") {
    //     var BackImg = new Array();
    //     BackImg[0] = "spring.jpg";
    //     BackImg[1] = "summer.jpg";
    //     BackImg[2] = "fall.jpg"
    //     BackImg[3] = "winter.jpg";
    //     BackImg[4] = "sky.jpg";

    //     var num = Math.round(Math.random() * 4);
    //     document.getElementById("wrap").style.backgroundImage = "url('" + BackImg[num] + "')";
    // } else if (value == "2") {
    // }
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

function todolist(id) {
    if (id == "submit" || event.keyCode == 13) {
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
    }
    todo.value = "";
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

function button_default() {
    if (confirm("초기화 하시겠습니까?") == true) {
        localStorage.clear();
        window.location.reload();
    }
}