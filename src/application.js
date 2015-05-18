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
    $P3 = jQuery('#P03'); $P4 = jQuery('#P04');
    $P5 = jQuery('#P05'); $P6 = jQuery('#P06');
    $P7 = jQuery('#P07'); $P8 = jQuery('#P08');

    MAIN = new Accordion.Main();
});