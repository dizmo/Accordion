//= require Main

/**
 * Required to enable the dizmo menu `Settings` entry; otherwise it is *not*
 * show at all.
 */
function showBack() {
    dizmo.showBack();
}

/**
 * Required to enable dizmo menu `Content` entry; otherwise it si *not* shown
 * at all.
 */
function showFront() {
    dizmo.showFront();
}

/**
 * Global object to attach custom events to: Trigger events on this object in
 * case of global relevance e.g. dizmo docking/undocking.
 */
var events = {};

/**
 * As soon as the DOM has been loaded, and the dizmo is ready, instantiate the
 * main class: the global `MAIN` variable can be used for debugging purposes
 * within the inspector.
 */
window.document.addEventListener('dizmoready', function () {
    MAIN = new Accordion.Main();
});