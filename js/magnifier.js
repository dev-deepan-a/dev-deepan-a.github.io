var magnifyImage = false;
var doesMouseEntered = false;
var glass, img;

function magnify(imgID, zoom) {
    console.log(roomName);
    var w, h, bw;
    var canvas = document.getElementById(imgID);
    if (img == null) {
        img = new Image();
    }
    if (window.innerWidth >= 640) {
        img.src = "src/img/" + roomName + "_L.jpg"
    } else if (window.innerWidth <= 640) {
        img.src = "src/img/" + roomName + "_P.jpg"
    }
    // img = document.getElementById(imgID);

    // img.src = canvas.toDataURL();
    /*create magnifier glass:*/
    if (glass == null) {
        glass = document.createElement("DIV");
        glass.id = "img-magnifier-glass";
        glass.setAttribute("class", "img-magnifier-glass");
        glass.addEventListener("mouseout",
            function () {
                toggleMagnifier(false);
            }
        );
        /*insert magnifier glass:*/
    }

    canvas.parentElement.insertBefore(glass, canvas);

    /*set background properties for the magnifier glass:*/
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.left = (canvas.clientWidth / 2) + "px";
    glass.style.top = (canvas.clientHeight / 2) + "px";
    glass.style.backgroundSize = (canvas.clientWidth * zoom) + "px " + (canvas.clientHeight * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;
        /*prevent any other actions that may occur when moving over the image*/
        e.preventDefault();
        /*get the cursor's x and y positions:*/
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /*prevent the magnifier glass from being positioned outside the image:*/
        if (x > canvas.clientWidth - (w / zoom)) {
            x = canvas.clientWidth - (w / zoom);
        }
        if (x < w / zoom) {
            x = w / zoom;
        }
        if (y > canvas.clientHeight - (h / zoom)) {
            y = canvas.clientHeight - (h / zoom);
        }
        if (y < h / zoom) {
            y = h / zoom;
        }
        /*set the position of the magnifier glass:*/
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /*display what the magnifier glass "sees":*/
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0,
            y = 0;
        e = e || window.event;
        /*get the x and y positions of the image:*/
        a = img.getBoundingClientRect();
        /*calculate the cursor's x and y coordinates, relative to the image:*/
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /*consider any page scrolling:*/
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return {
            x: x,
            y: y
        };
    }
}

function toggleMagnifier(toggleValue) {
    var magnifierGlass = document.getElementById("img-magnifier-glass");
    if (magnifierGlass) {
        if (magnifyImage == false && toggleValue == true) {
            magnifyImage = true;
            magnifierGlass.style.visibility = "visible";
            magnifierGlass.style.webkitTransform = "scale(1)";
            magnifierGlass.style.transform = "scale(1)";
            console.log(magnifyImage);
        } else if (magnifyImage == true && toggleValue == false) {
            magnifyImage = false;
            console.log("Mouse Out");
            magnifierGlass.style.webkitTransform = "scale(0)";
            magnifierGlass.style.transform = "scale(0)";
            // magnifierGlass.style.visibility = "hidden";
        }
    }
}

function showMagnifier() {
    console.log("showing magnifier");
    var magnifierGlass = document.getElementById("img-magnifier-glass");
    if (magnifierGlass) {
        if (magnifyImage) {
            magnifierGlass.style.visibility = "visible";
        } else {
            magnifierGlass.style.visibility = "hidden";
        }
    }
}

function detectMouse() {
    console.log("Mouse out");
}