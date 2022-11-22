var isMousePressed = false;
var selected;
Array.from(document.querySelectorAll(".title")).forEach(win => {
    win.addEventListener("mousedown",() => {
        isMousePressed = true;
        selected = win.parentElement;
    });
    window.addEventListener("mouseup", ()=>{
        isMousePressed = false;
    })
});
onmousemove = function(e){
    
    if(isMousePressed){
        console.log(parseFloat(window.getComputedStyle(selected).width).toFixed(0))
        selected.style.transform = `translateX(calc(${e.clientX}px))`
    }       
}   
