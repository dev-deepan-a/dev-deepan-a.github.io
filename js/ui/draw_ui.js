function drawUI() {
  var defaultGroutApplied = 0;
  var defaultWallTileApplied = 0;
  var defaultFloorTileApplied = 0;
  var defaultRoomApplied = 0;

  var groutButtons = [];
  var groutColors = [];
  var groutDetails = {
    grout_thumbnail_url: "",
    grout_color_name: "",
    grout_product_id: "",
    grout_color_number: "",
    grout_sub_name: ""
  };

  $(function() {
    var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1gqHO4UhNRWOETs64dnApFfr2Xj6FrQdbJo4lYybn2Vk/od6/public/values?alt=json';
    $.getJSON(sheetUrl, function(data) {
      var entry = data.feed.entry;
      for (var i = 18; i < entry.length; i += 18) {
        // entry[i].content.$t retrieves the content of each cell
        // groutColors.push(entry[i].content.$t);
        createGroutMenuButtons(
          entry[i].content.$t, //Thumbnail sheetUrl
          entry[i + 1].content.$t,
          entry[i + 2].content.$t,
          entry[i + 3].content.$t,
          entry[i + 4].content.$t,
          entry[i + 5].content.$t,
        )
        if (entry[i + 6].content.$t != '#') {
          createWallTileButtons(entry[i + 6].content.$t, entry[i + 8].content.$t, entry[i + 10].content.$t, entry[i + 11].content.$t);
        }

        if (entry[i + 7].content.$t != '#') {
          createFloorTileButtons(entry[i + 7].content.$t, entry[i + 9].content.$t, entry[i + 12].content.$t, entry[i + 13].content.$t);
        }
        if (entry[i + 14].content.$t != '#') {
          createRoomButtons(entry[i + 14].content.$t, entry[i + 15].content.$t, entry[i + 16].content.$t, entry[i + 17].content.$t);
        }
      }

    })
  });

  function createGroutMenuButtons(thumbnailURL, colorName, productID, colorNumber, subName, hexcode) {
    // console.log(thumbnailURL);
    // console.log(colorName);
    // console.log(productID);
    // console.log(colorNumber);
    // console.log(subName);
    var groutMenuHTML = document.getElementById("floor-grout-menu");
    var groutMenu = document.createElement('div');
    groutMenu.classList.add("grout-menu");
    groutMenu.id = "grout-menu";

    var groutButtonSelection = document.createElement('div');
    groutButtonSelection.id = "grout-button-selection";

    var groutButtonBG = document.createElement('div');
    groutButtonBG.id = "grout-button-bg";

    var groutThumbContainer = document.createElement('div');
    groutThumbContainer.id = "grout-thumb";

    var thumbnail = document.createElement('img');
    thumbnail.id = "thumbnail";
    thumbnail.src = "https://hbb-demo.s3.ap-south-1.amazonaws.com/Ceresit/src/img/ui/button_bg.png";
    thumbnail.alt = "HHH";
    thumbnail.style.backgroundColor = hexcode;

    groutThumbContainer.appendChild(thumbnail);

    var groutButton = document.createElement('button');
    groutButton.classList.add("grout-button");
    groutButton.onclick = function() {
      console.log("Changing Colors");
      if (groutMain) {
        var groutClass = document.getElementsByClassName("grout-menu");
        for (i = 0; i < groutClass.length; i++) {
          groutClass[i].children[7].style.color = "white";
          groutClass[i].children[6].style.color = "white";
          groutClass[i].children[5].style.color = "white";
          groutClass[i].children[4].style.color = "white";
          groutClass[i].children[3].style.color = "white";
          groutClass[i].children[2].style.color = "white";
          groutClass[i].children[1].style.opacity = 0;
        }

        changeGroutColor(hexcode);

        groutColorName.style.color = "black";
        groutColorNumber.style.color = "black";
        groutProductID.style.color = "black";
        groutSubName.style.color = "black";
        groutButtonSelection.style.opacity = 1;
      }
    };

    function changeGroutColor(hexcode) {
      groutsAndTileContext.globalCompositeOperation = "source-in";
      console.log(hexcode);
      // draw color
      groutsAndTileContext.fillStyle = hexcode;
      groutsAndTileContext.fillRect(0, 0, groutsAndTileCanvas.width, groutsAndTileCanvas.height);

      // set composite mode
      groutsAndTileContext.globalCompositeOperation = "destination-in";

      // draw image
      groutsAndTileContext.drawImage(groutMain, 0, 0);
    }

    var groutColorName = document.createElement('div');
    groutColorName.id = "grout-color-name";
    groutColorName.innerHTML = colorName;

    var groutColorNumber = document.createElement('div');
    groutColorNumber.id = "grout-color-number";
    groutColorNumber.innerHTML = colorNumber;

    var groutProductID = document.createElement('div');
    groutProductID.id = "grout-product-id";
    groutProductID.innerHTML = productID;

    var groutSubName = document.createElement('div');
    groutSubName.id = "grout-sub-name";
    groutSubName.innerHTML = subName;

    groutMenu.appendChild(groutButtonBG);
    groutMenu.appendChild(groutButtonSelection);
    groutMenu.appendChild(groutThumbContainer);
    groutMenu.appendChild(groutColorName);
    groutMenu.appendChild(groutColorNumber);
    groutMenu.appendChild(groutProductID);
    groutMenu.appendChild(groutSubName);
    groutMenu.appendChild(groutButton);

    groutMenuHTML.appendChild(groutMenu);
    console.log(groutMenuHTML);

    if (defaultGroutApplied == 0) {
      changeGroutColor(hexcode);

      groutColorName.style.color = "black";
      groutColorNumber.style.color = "black";
      groutProductID.style.color = "black";
      groutSubName.style.color = "black";
      groutButtonSelection.style.opacity = 1;
      console.log(defaultGroutApplied);
      defaultGroutApplied = 1;
    }
  }

  function changeGroutBackgroundColor(groutColor) {
    console.log("Changing Grout Color");
  }

  function createWallTileButtons(thumbnailURL, thumbnailURL1, tileName, tileDetails) {
    // Responsible for creating wall tile buttons
    var wallTileMainDiv = document.getElementById("wall-tile");
    var wallTileMenu = document.createElement('div');
    wallTileMenu.classList.add("wall-tile-menu");
    wallTileMenu.id = "wall-tile-menu";

    var wallTileButtonSelection = document.createElement('div');
    wallTileButtonSelection.id = "wall-tile-button-selection";

    var wallTileThumbContainer = document.createElement('div');
    wallTileThumbContainer.id = "wall-tile-thumb";

    var wallTileThumbnail = document.createElement('img');
    wallTileThumbnail.id = "wall-tile-thumbnail";
    wallTileThumbnail.src = thumbnailURL1;
    wallTileThumbnail.alt = "HHH";
    // wallTileThumbnail.style.backgroundColor = hexcode;

    wallTileThumbContainer.appendChild(wallTileThumbnail);

    var wallTileButton = document.createElement('button');
    wallTileButton.classList.add("wall-tile-button");
    wallTileButton.onclick = function() {
      var wallTileClass = document.getElementsByClassName("wall-tile-menu");
      for (i = 0; i < wallTileClass.length; i++) {
        wallTileClass[i].children[5].style.color = "white";
        wallTileClass[i].children[4].style.color = "white";
        wallTileClass[i].children[3].style.color = "white";
        wallTileClass[i].children[2].style.color = "white";
        wallTileClass[i].children[1].style.opacity = 0;
      }
      console.log("Changing wall tiles");
      if (wallTileImage) {
        wallTileContext.clearRect(0, 0, wallTileCanvas.width, wallTileCanvas.height);
        wallTileImage.src = thumbnailURL;
        wallTileImage.onload = function() {
          var x = 0;
          var y = 0;
          wallTileContext.drawImage(wallTileImage, x, y);
          wallTileName.style.color = "black";
          wallTileDetails.style.color = "black";
          wallTileButtonSelection.style.opacity = 1;
        };

      }
    };

    var wallTileName = document.createElement('div');
    wallTileName.id = "wall-tile-name";
    wallTileName.innerHTML = tileName;

    var wallTileDetails = document.createElement('div');
    wallTileDetails.id = "wall-tile-details";
    wallTileDetails.innerHTML = tileDetails;

    var wallTileButtonBG = document.createElement('div');
    wallTileButtonBG.id = "wall-tile-button-bg";

    wallTileMenu.appendChild(wallTileButtonBG);
    wallTileMenu.appendChild(wallTileButtonSelection);
    wallTileMenu.appendChild(wallTileThumbContainer);
    wallTileMenu.appendChild(wallTileName);
    wallTileMenu.appendChild(wallTileDetails);
    wallTileMenu.appendChild(wallTileButton);

    wallTileMainDiv.appendChild(wallTileMenu);
    console.log(wallTileMainDiv);

    if (defaultWallTileApplied == 0) {

      wallTileName.style.color = "black";
      wallTileDetails.style.color = "black";
      wallTileButtonSelection.style.opacity = 1;
      console.log(defaultWallTileApplied);
      defaultWallTileApplied = 1;
    }
  }

  function createFloorTileButtons(thumbnailURL, thumbnailURL1, tileName, tileDetails) {

    console.log(floorTileName);
    // Responsible for creating wall tile buttons
    var floorTileMainDiv = document.getElementById("floor-tile");
    var floorTileMenu = document.createElement('div');
    floorTileMenu.classList.add("floor-tile-menu");
    floorTileMenu.id = "floor-tile-menu";

    var floorTileButtonSelection = document.createElement('div');
    floorTileButtonSelection.id = "floor-tile-button-selection";

    var floorTileThumbContainer = document.createElement('div');
    floorTileThumbContainer.id = "floor-tile-thumb";

    var floorTileThumbnail = document.createElement('img');
    floorTileThumbnail.id = "floor-tile-thumbnail";
    floorTileThumbnail.src = thumbnailURL1;
    floorTileThumbnail.alt = "HHH";
    // wallTileThumbnail.style.backgroundColor = hexcode;

    floorTileThumbContainer.appendChild(floorTileThumbnail);

    var floorTileButton = document.createElement('button');
    floorTileButton.classList.add("floor-tile-button");
    floorTileButton.onclick = function() {
      console.log("Changing Floor tiles");
      if (floorTileImage) {
        var floorTileClass = document.getElementsByClassName("floor-tile-menu");
        for (i = 0; i < floorTileClass.length; i++) {
          floorTileClass[i].children[5].style.color = "white";
          floorTileClass[i].children[4].style.color = "white";
          floorTileClass[i].children[1].style.opacity = 0;
        }
        floorTileContext.clearRect(0, 0, floorTileCanvas.width, floorTileCanvas.height);
        floorTileImage.src = thumbnailURL;
        floorTileImage.onload = function() {
          var x = 0;
          var y = 0;
          floorTileContext.drawImage(floorTileImage, x, y);
          floorTileName.style.color = "black";
          floorTileDetails.style.color = "black";
          floorTileButtonSelection.style.opacity = 1;
        };

      }
    };

    var floorTileName = document.createElement('div');
    floorTileName.id = "floor-tile-name";
    floorTileName.innerHTML = tileName;

    var floorTileDetails = document.createElement('div');
    floorTileDetails.id = "floor-tile-details";
    floorTileDetails.innerHTML = tileDetails;

    var floorTileButtonBG = document.createElement('div');
    floorTileButtonBG.id = "floor-tile-button-bg";

    floorTileMenu.appendChild(floorTileButtonBG);
    floorTileMenu.appendChild(floorTileButtonSelection);
    floorTileMenu.appendChild(floorTileThumbContainer);
    floorTileMenu.appendChild(floorTileName);
    floorTileMenu.appendChild(floorTileDetails);
    floorTileMenu.appendChild(floorTileButton);

    floorTileMainDiv.appendChild(floorTileMenu);
    console.log(floorTileMainDiv);

    if (defaultFloorTileApplied == 0) {
      floorTileName.style.color = "black";
      floorTileDetails.style.color = "black";
      floorTileButtonSelection.style.opacity = 1;
      console.log(defaultFloorTileApplied);
      defaultFloorTileApplied = 1;
    }
  }

  function createRoomButtons(name, thumbnailURL, details, thumbnailURL1) {

    console.log(roomName);
    // Responsible for creating wall tile buttons
    var roomMainDiv = document.getElementById("rooms");
    var roomMenu = document.createElement('div');
    roomMenu.classList.add("room-menu");
    roomMenu.id = "room-menu";

    var roomButtonSelection = document.createElement('div');
    roomButtonSelection.id = "room-button-selection";

    var roomThumbContainer = document.createElement('div');
    roomThumbContainer.id = "room-thumb";

    var roomThumbnail = document.createElement('img');
    roomThumbnail.id = "room-thumbnail";
    roomThumbnail.src = thumbnailURL1;
    roomThumbnail.alt = "HHH";
    // wallTileThumbnail.style.backgroundColor = hexcode;

    roomThumbContainer.appendChild(roomThumbnail);

    var roomButton = document.createElement('button');
    roomButton.classList.add("room-button");
    roomButton.onclick = function()
    {
    };

    var roomName = document.createElement('div');
    roomName.id = "room-name";
    roomName.innerHTML = name;

    var roomDetails = document.createElement('div');
    roomDetails.id = "room-details";
    roomDetails.innerHTML = details;

    var roomButtonBG = document.createElement('div');
    roomButtonBG.id = "room-button-bg";

    roomMenu.appendChild(roomButtonBG);
    roomMenu.appendChild(roomButtonSelection);
    roomMenu.appendChild(roomThumbContainer);
    roomMenu.appendChild(roomName);
    roomMenu.appendChild(roomDetails);
    roomMenu.appendChild(roomButton);

    roomMainDiv.appendChild(roomMenu);
    console.log(roomMainDiv);

    if (defaultRoomApplied == 0) {
      roomName.style.color = "black";
      roomDetails.style.color = "black";
      roomButtonSelection.style.opacity = 1;
      console.log(defaultRoomApplied);
      defaultRoomApplied = 1;
    }
  }

  // var logoCanvas = document.getElementById("layer5");
  // var context = logoCanvas.getContext("2d");

  // var logo = new Image();
  // logo.src = "https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/ceresit_logo.png";
  // logo.onload = function() {
  //   var x = logoCanvas.width - logo.width;
  //   var y = 0;
  //   context.drawImage(logo, x, y);
  // };

  var sceneCanvas = document.getElementById("layer1");
  var scenecontext = sceneCanvas.getContext("2d");

  var scene = new Image();
  scene.src = "https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/Scene.png";
  scene.onload = function() {
    var x = 0;
    var y = 0;
    scenecontext.drawImage(scene, x, y);
  };

  var groutsAndTileCanvas = document.getElementById("layer2");
  var groutsAndTileContext = groutsAndTileCanvas.getContext("2d");
  //
  var groutMain = new Image();
  groutMain.id = "grout-color-change";
  // groutMain.style.setAttribute("-webkit-mask-box-image", "url('https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/GroutMain.png')")
  groutMain.onload = function() {
    var x = 0;
    var y = 0;
    groutsAndTileContext.drawImage(groutMain, x, y);
  };
  groutMain.src = "https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/GroutMain.png";


  var wallTileCanvas = document.getElementById("layer3");
  var wallTileContext = wallTileCanvas.getContext("2d");
  //
  var wallTileImage = new Image();
  wallTileImage.id = "wall-tile-image";
  // groutMain.style.setAttribute("-webkit-mask-box-image", "url('https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/GroutMain.png')")
  wallTileImage.onload = function() {
    var x = 0;
    var y = 0;
    wallTileContext.drawImage(wallTileImage, x, y);
  };
  wallTileImage.src = "https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/wall-tile/WallTile_Opt01.png";

  var floorTileCanvas = document.getElementById("layer4");
  var floorTileContext = floorTileCanvas.getContext("2d");
  //
  var floorTileImage = new Image();
  floorTileImage.id = "floor-tile-image";
  // groutMain.style.setAttribute("-webkit-mask-box-image", "url('https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/GroutMain.png')")
  floorTileImage.onload = function() {
    var x = 0;
    var y = 0;
    floorTileContext.drawImage(floorTileImage, x, y);
  };
  floorTileImage.src = "https://hbb-demo.s3.ap-south-1.amazonaws.com/ceresit-files/floor-tile/FloorTile_Opt01.png";
}
