function initSketchpad() {
    "use strict";

    var sketchpadEl = document.getElementById("sketchpad");
    var sketchpad = new Sketchpad({
        containerEl: sketchpadEl,
        token: "sketchpad",
        features: {},
        createPageConfig: {
            no: 1,
            foregroundImage: "https://i.ibb.co/wpY70LB/body.png"
        }
    });


    var colorpalette = new Colorpalette({
        containerEl: document.getElementById("colorpalette")
    }).on("change", function (e) {
        sketchpad.getCurrentTool().setColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    });
    window.colorpalette = colorpalette;

    var colorpaletteFill = new Colorpalette({
        containerEl: document.getElementById("colorpaletteFill")
    }).on("change", function (e) {
        sketchpad.getCurrentTool().setFillColor(e.color.red, e.color.green, e.color.blue, e.color.alpha);
    });
    window.colorpaletteFill = colorpaletteFill;


    /**
     * Changes current tool
     * @param  {string} toolId  - tool id
     */
    function selectTool(toolId) {
        console.log("selectTool", toolId);
        sketchpad.setTool(toolId);

        document.querySelectorAll(".toolbar .button").forEach(function (el) {
            el.classList.remove("active");
        });
        document.getElementById("tool-" + toolId).classList.add("active");

        document.getElementById("size").style.display = "none";
        document.getElementById("colorpaletteSection").style.display = "none";
        document.getElementById("colorpaletteFillSection").style.display = "none";

        var tool = sketchpad.getCurrentTool();

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

    selectTool("pen");

    document.getElementById("size-slider").addEventListener("change", function (e) {
        if (typeof sketchpad.getCurrentTool().setSize === "function") {
            sketchpad.getCurrentTool().setSize(e.target.value);
        }
    });

    //calculate
    document.getElementById('tool-calculate').addEventListener("click", function () {

        let pageX=window.pageXOffset;
        let pageY=window.pageYOffset;
        // scroll to the top of the page
        window.scrollTo(0, 0);

        html2canvas(document.querySelector("#sketchpad")).then(canvas => {

            $('#drawCanvas').children().remove();
            $('#drawCanvas').append("<h3>Screenshot</h3>");
            $('#drawCanvas').append(canvas);

            var canvasElement = document.querySelector("#drawCanvas > canvas"),
                out = document.querySelector("output"),
                ctx = canvasElement.getContext("2d"),
                w = canvasElement.width,
                h = canvasElement.height;

            const imageData = ctx.getImageData(0, 0, w, h);
            let count = 0;

            for (let i = 0; i < imageData.data.length; i += 4) {
                // RGBA  i -> red 1+i -> green 2+i -> blue
                if (imageData.data[1 + i] < 200 || imageData.data[2 + i] < 240 || imageData.data[i] < 240) {
                    count++
                }
            }
            out.innerHTML = " <h3>Percentage : " + (count / (imageData.data.length / 4) * 100) + "</h3>";

            window.scrollTo(pageX, pageY);
        });
    });

    //pen
    document.getElementById('tool-pen').addEventListener("click", function () {
        selectTool("pen");
    });

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
}

initSketchpad();



