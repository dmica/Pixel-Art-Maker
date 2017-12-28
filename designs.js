// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

var hexSelectedColor = "#000000";
var canvas, hex, ctx;
var imageWidth = 150;
var imageHeight = 100;


// Function to create the grid
function makeGrid(height, width) {
  // Create empty string variable table
  var table = "";

  // Remove TableBody if existent
  $("tbody").remove();

  // Create a TableBody
  $("#pixel_canvas").append("<tbody>");

  // Create rows and colums;
  for (var i = 0; i < height; i++) {
    table += "<tr>";
    for (var j = 0; j < width; j++) {
      table += "<td></td>";
    }
    table += "</tr>";
  }

  // Append htmlString to tag with ID pixel_canvas
  $("#pixel_canvas").append(table);

  // Remove contextmenu for grid
  $("td").contextmenu(function() {
    return false;
  });
};

//Submit button listener
$("#submit").click(function(e) {
  var height, width, theDrawing, rightMouseButton;

  //prevent page from reloading, since reload deletes the grid
  e.preventDefault();

  //Get min and max value for height and width
  var minHeight = parseInt($("#input_height").attr("min"));
  var maxHeight = parseInt($("#input_height").attr("max"));
  var minWidth = parseInt($("#input_width").attr("min"));
  var maxWidth = parseInt($("#input_width").attr("max"));
  var inputHeight = $("#input_height").val();
  var inputWidth = $("#input_width").val();

  // if input is higher or lower than min or max allowed size, set input to max size
  if (inputHeight < minHeight) {
    height = minHeight;
    $("#input_height").val(minHeight);
  } else if (inputHeight > maxHeight) {
    height = maxHeight;
    $("#input_height").val(maxHeight);
  } else {
    height = inputHeight;
  }

  if (inputWidth < minWidth) {
    width = minWidth;
    $("#input_width").val(minWidth);
  } else if (inputWidth > maxWidth) {
    width = maxWidth;
    $("#input_width").val(maxWidth);
  } else {
    width = inputWidth;
  }

  // Create grid
  makeGrid(height, width);

  // Drawing functionality
  $("td").mousedown(function(e) {
    theDrawing = true;
    if (e.button == 2) {
      rightMouseButton = true;
      $(this).css("background-color", "#FFFFFF");
    } else {
      $(this).css("background-color", hexSelectedColor);
    }
  });

  $("td").mousemove(function(e) {
    $(this).css("cursor", "pointer");
    if (theDrawing) {
      if (rightMouseButton) {
        $("td").contextmenu(function() {
          return false;
        });
        $(this).css("background-color", "#FFFFFF");
      } else {
        $(this).css("background-color", hexSelectedColor);
      }
    }
  });

  $("td").mouseup(function() {
    if (rightMouseButton) {
      rightMouseButton = false;
    }
    theDrawing = false;
  });
});

// Function to create color picker image
function draw() {
  canvas = $("#colorPicker")[0];
  var img = new Image();

  // Check if browser is 'canvas' compatible
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");

    /* because of CrossSite Scripting warnings in Chrome when
       html and image is in the same location, image is
       in Base64 format */
    img.src =
        "data:image/gif;base64,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";

    // Draw image
    img.onload = function() {
      ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
    };

    // Set canvas size to image size
    $("#colorPicker").attr("width", imageWidth);
    $("#colorPicker").attr("height", imageHeight);

    // Set table size for selected color
    $("#selectedColor").css("width", imageWidth);
    $("#selectedColor").css("height", "10px");
    $("#selectedColor").css("background-color", hexSelectedColor);
  };
};
draw();

// Set color to pixel color
$("#colorPicker").mousemove(function(e) {
  // Get coordinates of current position
  $("#colorPicker").css("cursor", "pointer");
  var canvasOffset = $(canvas).offset();
  var canvasX = Math.floor(e.pageX - canvasOffset.left);
  var canvasY = Math.floor(e.pageY - canvasOffset.top);

  // Get pixel at position
  var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
  var pixel = imageData.data;
  var pixelColor = "rgb(" + pixel[0] + ", " + pixel[1] + ", " + pixel[2] + ")";
  var dColor = pixel[2] + 256 * pixel[1] + 65536 * pixel[0];
  hex = "#" + ("0000" + dColor.toString(16)).substr(-6);
});

// set color when clicked
$("#colorPicker").click(function() {
  hexSelectedColor = hex;
  $("#selectedColor").css("background-color", hexSelectedColor);
});
