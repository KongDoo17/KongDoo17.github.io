new Vue({
    el: "#wrap",
    data: {
        temperature: '',
        place: '',
        weather: '',
        weather_icon_url: '',
        check_radio1: 'checked',
        check_radio2: 'non-checked',
        Background_Image: ['spring.jpg', 'summer.jpg', 'fall.jpg', 'winter.jpg', 'sky.jpg'],
        radio_display: {
            display: 'block',
        },
        setName_style: {
            display: 'block',
        },
        backImg: {
            backgroundImage: '',
        },
        setName: 'What is your name?',
        todo: 'Write a to do',
        time_interval: '',
        current: '',
        curtime: '',
    },
    methods: {
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

            if (value == 1 || value == null) {
                var num = Math.round(Math.random() * 4);

                this.check_radio1 = "checked";
                this.check_radio2 = "";
                this.radio_display.display = "none";

                this.backImg.backgroundImage = "url('" + this.Background_Image[num] + "')";

                console.log(this.backImg.backgroundImage);
                console.log(this.radio_display.display);
            } else if (value == 2) {
                this.check_radio2 = "checked";
                this.check_radio1 = "";
                this.radio_display.display = "block";

                console.log(this.radio_display.display);
            }
        },
        Clear_setName() {
            this.setName = '';
        },
        Clear_todo() {
            this.todo = '';
        },
        time() {
            this.time_interval = setInterval(function () {
                var time = new Date();

                this.curtime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

                if (localStorage.getItem("name") != null) {
                    this.setName_style.display = 'none';
                    if (time.getHours() < 12 && time.getHours() >= 7) {
                        this.current = "Good Morning, " + localStorage.getItem("name");
                    } else if (time.getHours() < 17 && time.getHours() >= 12) {
                        this.current = "Good afternoon, " + localStorage.getItem("name");
                    } else if (time.getHours() < 21 && time.getHours() >= 17) {
                        this.current = "Good evening, " + localStorage.getItem("name");
                    } else if (time.getHours() < 24 && time.getHours() >= 21) {
                        this.current = "Good night, " + localStorage.getItem("name");
                    } else if (time.getHours() < 7) {
                        this.current = "Good midnight, " + localStorage.getItem("name");
                    }
                }
            }.bind(this), 1000);
        },
        Enter_Check() {
            this.current = "Hello, " + this.setName + "님";
            this.setName_style.display = 'none';
            localStorage.setItem("name", this.setName);
        },
        get_todolist() {
            // var name = document.getElementById("setname");
            // var todolist = document.getElementById("todolist");
            // var list = localStorage.getItem("todolist");

            // if (list != null) {
            //     var str = list.split(',');

            //     if (todolist != null) {
            //         while (todolist.hasChildNodes()) {
            //             todolist.removeChild(todolist.firstChild);
            //         }
            //     }

            //     for (var i = str.length - 1; i >= 0; i--) {
            //         var button = document.createElement('button');
            //         var divbox = document.createElement('div');
            //         var box = document.createElement('div');

            //         button.id = "button_" + i;
            //         divbox.id = "div_" + i;
            //         box.id = "box_" + i;

            //         button.setAttribute("onclick", "remove(this.id)");

            //         divbox.innerHTML = str[i];
            //         button.innerHTML = "삭제";

            //         divbox.style.display = "inline-block";
            //         button.style.display = "inline-block";

            //         box.style.borderRadius = "30px";
            //         box.style.height = "50px";
            //         box.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
            //         box.style.lineHeight = "50px";
            //         box.style.marginBottom = "20px";

            //         divbox.style.marginRight = "20px";
            //         button.style.right = "30px";
            //         button.style.backgroundColor = "lightgray";


            //         if (str[i] != "") {
            //             box.appendChild(divbox);
            //             box.appendChild(button);
            //             todolist.appendChild(box);
            //         }
            //     }
            // }
        },
        set_todolist(event) {

            event.preventDefault();

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
        },
        default_button() {
            if (confirm("초기화 하시겠습니까?") == true) {
                localStorage.clear();
                window.location.reload();
            }
        },
    },
    created() {
        this.init();

        this.SelectBackground();

        this.time();
    },
})




window.onload = function () {

    init();
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