//= require Main

function showBack() {
    dizmo.showBack();
}

function showFront() {
    dizmo.showFront();
}

var events = {};
window.document.addEventListener('dizmoready', function () {
    $ACC = DizmoElements('.dizmo-accordion');
    $P1 = jQuery('#P01'); $P2 = jQuery('#P02');

    MAIN = new Accordion.Main();
});