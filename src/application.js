//= require Main

function showBack() {
    dizmo.showBack();
}

function showFront() {
    dizmo.showFront();
}

var events = {};
window.document.addEventListener('dizmoready', function () {
    MAIN = new Accordion.Main();
});
