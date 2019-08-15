# The percentage of filled human body area
A simple graphic editor that you can draw and you can get the percentage of filled area. It is specialised in the human body area.

It can use to calculating the percentage of burned human body area

Based on : https://developers.sketchpad.pro
## Demo
Try on:  https://codepen.io/inanccakil/pen/zYOrZaa

## Usage
It uses RGBA colour space for calculation.

<img src="https://assets-global.website-files.com/55e67eeba2e73cb76514f165/59394737acbaea4fd061f9b3_07%20-%20RGBA.png" height="200"  />

### Calculation

```javascript
        for (let i = 0; i < imageData.data.length; i += 4) {
            /*  RGBA(Red,Green,Blue,a)  and a is the opacity of the color
                        i -> Red , 1+i -> Green , 2+i -> Blue
                black	rgb(0,0,0)
                gray	rgb(128,128,128)
                white	rgb(255,255,255)

                if the colour's Red, Green and Blue values smaller than 255 that means it's not white
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
```
### Use with external image source
Cross-Origin Resource Sharing (CORS) is a default false in html2canvas.

```javascript
  html2canvas(document.querySelector(`#${currentBodyValue}Sketchpad`), {
        useCORS: true
    }).then(canvas => {
```

