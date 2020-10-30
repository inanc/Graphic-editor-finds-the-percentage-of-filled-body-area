var currentSize = 8;
var currentTool = "pen";
var currentColor = [234, 234, 33, 1];

function initSketchpad(imageLocation, divId) {
    "use strict";
    let sketchpad;
    const sketchpadEl = document.getElementById(divId);
    sketchpad = new Sketchpad({
        containerEl: sketchpadEl,
        token: "sketchpad",
        features: {},
        createPageConfig: {
            no: 1,
            foregroundImage: imageLocation
        }
    });


    var colorpalette = new Colorpalette({
        containerEl: document.getElementById("colorpalette")
    }).on("change", function (e) {
        sketchpad.getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    });


    var colorpaletteFill = new Colorpalette({
        containerEl: document.getElementById("colorpaletteFill")
    }).on("change", function (e) {
        sketchpad.getCurrentTool().setFillColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    });


    /**
     * Changes current tool
     * @param  {string} toolId  - tool id
     */
    function selectTool(toolId) {
        sketchpad.setTool(toolId);
        console.log("toolId", toolId)
        document.querySelectorAll(".toolbar .button").forEach(function (el) {
            el.classList.remove("active");
        });
        document.getElementById("tool-" + toolId).classList.add("active");

        document.getElementById("size").style.display = "none";
        document.getElementById("colorpaletteSection").style.display = "none";
        document.getElementById("colorpaletteFillSection").style.display = "none";

        var tool = sketchpad.getCurrentTool();
        currentTool = tool;
        document.getElementById("toolName").innerHTML = tool.toolLabel || "Undefined";
        /**
         * set toolbar for tool
         */

        if (typeof tool.getColor === "function") {
            colorpalette.setColor(tool.getColor(), "noPropagate");
        }

        if (typeof tool.getFillColor === "function") {
            colorpaletteFill.setColor(tool.getFillColor(), "noPropagate");
        }

        if (typeof tool.getSize === "function") {
            var size = tool.getSize();
            document.getElementById("size-slider").value = size;
        }

        switch (toolId) {
            case "pen":
                document.getElementById("colorpaletteSection").style.display = "block";
                document.getElementById("size").style.display = "block";
                break;
            case "highlighter":
                document.getElementById("colorpaletteSection").style.display = "block";
                document.getElementById("size").style.display = "block";
                break;
            case "eraser":
                break;
            case "rectangle":
                document.getElementById("colorpaletteSection").style.display = "block";
                document.getElementById("colorpaletteFillSection").style.display = "block";
                document.getElementById("size").style.display = "block";
                break;
            case "circle":
                document.getElementById("colorpaletteSection").style.display = "block";
                document.getElementById("colorpaletteFillSection").style.display = "block";
                document.getElementById("size").style.display = "block";
                break;
            case "line":
                document.getElementById("colorpaletteSection").style.display = "block";
                document.getElementById("size").style.display = "block";
                break;
        }


    }


    //pen
    document.getElementById('tool-pen').addEventListener("click", function () {
        selectTool("pen");
        sketchpad.setTool("pen").getCurrentTool().setColor(234, 234, 33, 1);

        currentColor = [234, 234, 33, 1];
    });
    //size
    document.getElementById("size-slider").addEventListener("change", function (e) {
        if (typeof sketchpad.getCurrentTool().setSize === "function") {
            sketchpad.getCurrentTool().setSize(e.target.value);
        }
        currentSize = e.target.value;

    });
    // selectTool("pen");

    // marker
    document.getElementById('tool-highlighter').addEventListener("click", function () {
        selectTool("highlighter");
    });

    // mandala
    document.getElementById('tool-mandala').addEventListener("click", function () {
        selectTool("mandala");
    });

    // mandala
    document.getElementById('tool-type').addEventListener("click", function () {
        selectTool("type");
    });


    //eraser
    document.getElementById('tool-eraser').addEventListener("click", function () {
        selectTool("eraser");

    });
    //cutout
    document.getElementById('tool-cutout').addEventListener("click", function () {
        selectTool("cutout");
    });

    document.getElementById('tool-rectangle').addEventListener("click", function () {
        selectTool("rectangle");
    });

    document.getElementById('tool-line').addEventListener("click", function () {
        selectTool("line");
    });

    document.getElementById('tool-circle').addEventListener("click", function () {
        selectTool("circle");
    });

    document.getElementById('tool-rainbow').addEventListener("click", function () {
        selectTool("rainbow");
    });

    document.getElementById('tool-move-viewport').addEventListener("click", function () {
        selectTool("move-viewport");
    });

    document.getElementById('tool-rotate-viewport').addEventListener("click", function () {
        selectTool("rotate-viewport");
    });

    document.getElementById('tool-zoom-in').addEventListener("click", function () {
        sketchpad.setScale(sketchpad.scale * 2);
    });
    document.getElementById('tool-zoom-1').addEventListener("click", function () {
        sketchpad.setScale(1);
        sketchpad.setViewportPosition(0, 0);
        sketchpad.setRotation(0);
    });

    document.getElementById('tool-zoom-out').addEventListener("click", function () {
        sketchpad.setScale(sketchpad.scale / 2);
    });


    document.getElementById('reset').addEventListener("click", function () {
        sketchpad.clearSketchpad();

    });
    document.getElementById('tool-undo').addEventListener("click", function () {
        sketchpad.undo();
    });
    document.getElementById('tool-redo').addEventListener("click", function () {
        sketchpad.redo();
    });

    document.getElementById('tool-color1').addEventListener("click", function () {
        selectTool("pen");
        sketchpad.setTool("pen").getCurrentTool().setColor(255, 20, 33, 1);
        currentColor = [255, 20, 33, 1];
        document.querySelectorAll(".toolbar .button").forEach(function (el) {
            el.classList.remove("active");
        });
        document.getElementById("tool-color1").classList.add("active");
    });

    document.getElementById('tool-color2').addEventListener("click", function () {
        selectTool("pen");
        sketchpad.setTool("pen").getCurrentTool().setColor(217, 130, 42, 1);
        document.querySelectorAll(".toolbar .button").forEach(function (el) {
            el.classList.remove("active");
        });
        document.getElementById("tool-color2").classList.add("active");
        currentColor = [217, 130, 42, 1];
    });


    return sketchpad;
}

function hideAllSketchpadExceptValue(value) {
    $(".sketchpadHide").parent().hide();
    $(`#${value}Sketchpad`).parent().show();
}

function removePreviousGender() {
    $(".sketchpadHide").children().remove();
    $('input:checked[type=radio][name=switch-body]').trigger("change")

}

// default
let gender = "Man";
// Gender choose
document.getElementById('selectGender').addEventListener("change", function () {
    if (this.value === 'Man') {
        gender = "Man";
        removePreviousGender()
    } else if (this.value === 'Woman') {
        gender = "Woman";
        removePreviousGender()
    } else if (this.value === 'Kid') {
        gender = "Kid";
        removePreviousGender()
    }
});

function newObjectAdjustment(sketchpadObject) {
    // get current size ,tool and color and set the new object
    sketchpadObject.getCurrentTool().setSize(currentSize);
    sketchpadObject.setTool(currentTool);
    document.getElementById("toolName").innerHTML = currentTool;
    document.getElementById("colorpaletteFillSection").style.display = "none";
    sketchpadObject.getCurrentTool().setColor(currentColor[0], currentColor[1], currentColor[2], currentColor[3]);
}


// Body choose
$(document).on('change', 'input[type=radio][name=switch-body]', function () {
    if (this.value === 'frontBody') {
        if (!$.trim($('#frontBodySketchpad').html()).length) { // single object
            newObjectAdjustment(initSketchpad(`./images/${gender}.png`, "frontBodySketchpad")) // front
        }
        hideAllSketchpadExceptValue("frontBody");
    } else if (this.value === 'backBody') {
        if (!$.trim($('#backBodySketchpad').html()).length) {// if its empty create new one
            newObjectAdjustment(initSketchpad(`./images/${gender}-Back.png`, "backBodySketchpad")) // back
        }
        hideAllSketchpadExceptValue("backBody")
    } else if (this.value === 'frontHand') {
        if (!$.trim($('#frontHandSketchpad').html()).length) {
            newObjectAdjustment(initSketchpad("./images/Front-Hand.png", "frontHandSketchpad"))
        }
        hideAllSketchpadExceptValue("frontHand")
    } else if (this.value === 'backHand') {
        if (!$.trim($('#backHandSketchpad').html()).length) {
            newObjectAdjustment(initSketchpad("./images/Back-Hand.png", "backHandSketchpad"))
        }
        hideAllSketchpadExceptValue("backHand")
    } else if (this.value === 'leftHead') {
        if (!$.trim($('#leftHeadSketchpad').html()).length) {
            newObjectAdjustment(initSketchpad(`./images/Face-${gender}-(Left).png`, "leftHeadSketchpad"))
        }
        hideAllSketchpadExceptValue("leftHead")
    } else if (this.value === 'rightHead') {
        if (!$.trim($('#rightHeadSketchpad').html()).length) {
            newObjectAdjustment(initSketchpad(`./images/Face-${gender}-(Right).png`, "rightHeadSketchpad"))
        }
        hideAllSketchpadExceptValue("rightHead")
    }
});

// initialization
$('input:checked[type=radio][name=switch-body]').trigger("change");


//calculate
document.getElementById('tool-calculate').addEventListener("click", function () {
    let currentBodyValue = document.querySelector('input:checked[type=radio][name=switch-body]').value;

    let genderValue = document.getElementById("selectGender").value;


    // get the current scroll position
    let pageX = window.pageXOffset;
    let pageY = window.pageYOffset;
    // scroll to the top of the page
    window.scrollTo(0, 0);

    // html to canvas html2canvas.hertzen.com
    html2canvas(document.querySelector(`#${currentBodyValue}Sketchpad`)).then(canvas => {

        // Screenshot
        $('#drawCanvas').children().remove();
        $('#drawCanvas').append("<h3>Screenshot</h3>");
        $('#drawCanvas').append(canvas);

        const imageData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height);
        let notWhiteCount = 0;

        for (let i = 0; i < imageData.data.length; i += 4) {

            /*  RGBA(Red,Green,Blue,a)  and a is the opacity of the color
                 i -> Red , 1+i -> Green , 2+i -> Blue
                black	rgb(0,0,0)
                gray	rgb(128,128,128)
                white	rgb(255,255,255)

                      if color Red,Green,Blue value smaller than 255 that means its not white
            */
            if (imageData.data[i] < 255 || imageData.data[1 + i] < 255 || imageData.data[2 + i] < 255) {

                if (imageData.data[i] > 215 && imageData.data[1 + i] > 215 && imageData.data[2 + i] > 215) {

                    /* Border color of the body image is rgb(220,220,220) (white-gray)
                    Dont count body image border
                    */
                } else {
                    notWhiteCount++
                }
            }
        }

        // calculation for the body and gender type
        if (currentBodyValue === "frontBody") { //  front body
            let frontPercentage = (notWhiteCount / (imageData.data.length / 4) * 100);
            // front percentage 48
            if (genderValue === "Man") { // FOR MAN
                frontPercentage = (frontPercentage * 2.26).toFixed(1);// calculation
            } else if (genderValue === "Woman") {
                frontPercentage = (frontPercentage * 2.82).toFixed(1);// calculation
            } else { // KID
                frontPercentage = (frontPercentage * 2.30).toFixed(1);// calculation
            }
            document.querySelector("#frontOutput").innerHTML = '<b>Calculation=</b> Front Body Percentage : %' + frontPercentage;
            document.querySelector("#frontOutputInput").value = frontPercentage; // keep the value
            let back = parseFloat(document.getElementById("backOutputInput").value);
            back += parseFloat(frontPercentage);
            document.querySelector("#bodySum").innerHTML = "All Body Sum: %" + (back).toFixed(1); // sum

        } else if (currentBodyValue === "backBody") {
            // back percentage 52
            let backPercentage = (notWhiteCount / (imageData.data.length / 4) * 100);
            if (genderValue === "Man") { // FOR MAN
                backPercentage = (backPercentage * 2.47).toFixed(1);// calculation
            } else if (genderValue === "Woman") {
                backPercentage = (backPercentage * 3.05).toFixed(1);// calculation
            } else { // KID
                backPercentage = (backPercentage * 2.49).toFixed(1);// calculation
            }


            document.querySelector("#backOutput").innerHTML = "Back Body Percentage : %" + backPercentage + "";
            document.querySelector("#backOutputInput").value = backPercentage;

            let front = parseFloat(document.getElementById("frontOutputInput").value);
            front = front + parseFloat(backPercentage);
            document.querySelector("#bodySum").innerHTML = "All Body Sum: %" + front.toFixed(1)

        } else if (currentBodyValue === "frontHand") {
            let frontHandPercentage = ((notWhiteCount / (imageData.data.length / 4) * 100)).toFixed(1);
            // Man woman and kid are same calculation
            frontHandPercentage = (frontHandPercentage * 5.1).toFixed(1);

            document.querySelector("#frontHandOutput").innerHTML = "<br>Front Hand Percentage : " + frontHandPercentage + "";
            document.querySelector("#frontHandOutputInput").value = frontHandPercentage;

            let backhand = parseFloat(document.getElementById("backHandOutputInput").value);
            backhand = backhand + parseFloat(frontHandPercentage); // sum
            document.querySelector("#handSum").innerHTML = "All Sum:" + backhand.toFixed(1)

        } else if (currentBodyValue === "backHand") {
            // Man woman and kid are same calculation
            let backhandPercentage = ((notWhiteCount / (imageData.data.length / 4) * 100) * 4.73).toFixed(1);

            document.querySelector("#backHandOutput").innerHTML = "Back Hand Percentage : " + backhandPercentage + "";
            document.querySelector("#backHandOutputInput").value = backhandPercentage;

            let fronthand = parseFloat(document.getElementById("frontHandOutputInput").value);
            fronthand = fronthand + parseFloat(backhandPercentage);
            document.querySelector("#handSum").innerHTML = "All Sum:" + fronthand.toFixed(1)

        } else if (currentBodyValue === "leftHead") {

            let leftHeadPercentage = (notWhiteCount / (imageData.data.length / 4) * 100);
            if (genderValue === "Man" || genderValue === "Woman") {
                leftHeadPercentage = (leftHeadPercentage * 3.41).toFixed(1);// calculation

            } else { // KID
                leftHeadPercentage = (leftHeadPercentage * 1.83).toFixed(1);// calculation
            }

            document.querySelector("#leftHeadOutput").innerHTML = "<br>Left Head Percentage : " + leftHeadPercentage + "";
            document.querySelector("#leftHeadOutputInput").value = leftHeadPercentage;

            let rightHead = parseFloat(document.getElementById("rightHeadOutputInput").value);
            rightHead = rightHead + parseFloat(leftHeadPercentage);
            document.querySelector("#rightHeadSum").innerHTML = "All Sum: " + rightHead.toFixed(1)

        } else if (currentBodyValue === "rightHead") {

            let rightHeadPercentage = (notWhiteCount / (imageData.data.length / 4) * 100);
            if (genderValue === "Man" || genderValue === "Woman") {
                rightHeadPercentage = (rightHeadPercentage * 3.41).toFixed(1);// calculation

            } else { // KID
                rightHeadPercentage = (rightHeadPercentage * 1.83).toFixed(1);// calculation
            }


            document.querySelector("#rightHeadOutput").innerHTML = "Right Head Percentage : " + rightHeadPercentage + "";
            document.querySelector("#rightHeadOutputInput").value = rightHeadPercentage;

            let leftHead = parseFloat(document.getElementById("leftHeadOutputInput").value);
            leftHead = leftHead + parseFloat(rightHeadPercentage); // sum
            document.querySelector("#rightHeadSum").innerHTML = "All Sum: " + leftHead.toFixed(1)

        }
        // come back to the before calculation scroll position
        window.scrollTo(pageX, pageY);
    });
});

