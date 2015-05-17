//= require Main

function showBack() {
    dizmo.showBack();
}

function showFront() {
    dizmo.showFront();
}

var events = {};
window.document.addEventListener('dizmoready', function () {
    $acc = DizmoElements('.dizmo-accordion');
    $p1 = jQuery('#P01'); $p2 = jQuery('#P02');

    MAIN = new Accordion.Main();
});