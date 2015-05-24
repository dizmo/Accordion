Accordion Dizmo
===============

The Accordion dizmo demonstrates how easy it is to use the accordion feature
of dizmoElements. Let's have a look at a screen shot:

![preview](assets/accordion-panel.png)

As you see the panel `#1` of the accordion has been activated. If we click on
the round header icon in the top left corner, it will close with a nice
animation and you will see all listed accordion panels:

![preview](assets/accordion-list.png)

By clicking on the round icon or the header text of panel `#1` you can reopen
it. Further, as you see since the list is longer than the available dizmo space
a corresponding scrollbar has been displayed on the right hand side: By simply
dragging the list you can move the content up or down.

Structure: HTML
---------------

```html
<div class='dizmo-accordion no-dizmo-drag' data-type='dizmo-accordion'>
    <ul class='dizmo-accordion-panels'>
        <!-- listed panels: shown in accordion list -->

        <li class='dizmo-accordion-panel' id='0'>
            <div class='dizmo-accordion-panel-header'>
                <div class='dizmo-accordion-panel-header-content'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL 0</span>
                </div>
                <div class='dizmo-accordion-panel-header-content active'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL 0 [active]</span>
                </div>
            </div>
            <div class='dizmo-accordion-panel-body'>
                <div class='dizmo-accordion-panel-body-content'>
                    <div><span>0</span><p></p></div>
                </div>
            </div>
        </li>

        <li class='dizmo-accordion-panel' id='1' data-state='active'>
            <div class='dizmo-accordion-panel-header'>
                <div class='dizmo-accordion-panel-header-content'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL 0</span>
                </div>
                <div class='dizmo-accordion-panel-header-content active'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL 0 [active]</span>
                </div>
            </div>
            <div class='dizmo-accordion-panel-body'>
                <div class='dizmo-accordion-panel-body-content'>
                    <div><span>1</span><p></p></div>
                </div>
            </div>
        </li>

        <li class='dizmo-accordion-panel' id='?'>...</li

        <li class='dizmo-accordion-panel' id='9'>
            <div class='dizmo-accordion-panel-header'>
                <div class='dizmo-accordion-panel-header-content'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL 9</span>
                </div>
                <div class='dizmo-accordion-panel-header-content active'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL i [active]</span>
                </div>
            </div>
            <div class='dizmo-accordion-panel-body'>
                <div class='dizmo-accordion-panel-body-content'>
                    <div><span>9</span><p></p></div>
                </div>
            </div>
        </li>

    </ul>
</div>
```

As you see the structure is straight forward: Each panel has an `header` and a
`body`; each `header` has an `active content` and a (passive) `content` where
each header `content` has an `icon` and a `text`. Finally, each `body` as a
`content` which can be filled a custom payload.

Please note panel `#1` has `data-state='active'` causing the panel to be shown
by default: without any such `data-state` set to `active` by default the list of
all panels would be shown instead.

Structure: Unlisted panels
--------------------------

```html
<div class='dizmo-accordion no-dizmo-drag' data-type='dizmo-accordion'>
    <ul class='dizmo-accordion-panels'>

        <!-- listed panels: shown in accordion list -->

        <li class='dizmo-accordion-panel' id='?'>...</li>

        <!-- unlisted panels: not shown in accordion list -->

        <li class='dizmo-accordion-panel unlisted' id='a'>
            <div class='dizmo-accordion-panel-header'>
                <div class='dizmo-accordion-panel-header-content active'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL A [active]</span>
                </div>
            </div>
            <div class='dizmo-accordion-panel-body'>
                <div class='dizmo-accordion-panel-body-content'>
                    <div><span>A</span><p></p></div>
                </div>
            </div>
        </li>

        <li class='dizmo-accordion-panel unlisted' id='b'>...</li>

        <li class='dizmo-accordion-panel unlisted' id='c'>
            <div class='dizmo-accordion-panel-header'>
                <div class='dizmo-accordion-panel-header-content active'>
                    <span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>
                    <span class='dizmo-accordion-panel-header-text'>PANEL C [active]</span>
                </div>
            </div>
            <div class='dizmo-accordion-panel-body'>
                <div class='dizmo-accordion-panel-body-content'>
                    <div><span>C</span><p></p></div>
                </div>
            </div>
        </li>

    </ul>
</div>
```

The accordion further supports panels which are *not* listed in the accordion's
list: therefore, such panels cannot be activated directly from the list; but it
is possible to activate them using the [JavaScript API](#API: JavaScript).

Such *unlisted* panels become handy, to e.g. simulate panel nesting: create a
*listed* panel, put a button in its content area, and wire the `click` event of
the button with an activation of an unlisted panel -- that's it!

Thea Accordion dizmo uses exactly that mechanism: within each listed panel there
are three (same) unlisted panels #a, #b and #c. By clicking on the timestamp it
is possible to cycle through them.

Styling: (S)CSS
---------------

```css
div.dizmo-accordion {
  ul.dizmo-accordion-panels {
    li.dizmo-accordion-panel {
      .dizmo-accordion-panel-header {
        border-top: 1px solid dimgrey; /* default: none */
      }
      .dizmo-accordion-panel-body {
        height: calc(100% - 20px - 48px); /* alternative: omit --> 100% */
        margin: 0 10px 10px;                      /*      omit --> 0    */
        width: calc(100% - 20px);                 /*      omit --> 100% */
        .dizmo-accordion-panel-body-content {     /*** CUSTOM CONTENT ***/

          display: table;
          div {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            span {
              font-size: 10em;
              font-weight: bold;
            }
            p:hover {
              text-decoration: underline;
            }
          }

        }
      }
    }
  }
  .iScrollVerticalScrollbar {
    .iScrollIndicator {
      border: 1px solid dimgrey; /* default: library dependent */
    }
  }
}
```

As you see the SCSS hierarchy reflects the HTML, with one exception: namely the
scrollbar `.iScrollVerticalScrollbar`. Actually it is not required, but has been
shown here for demonstration purposes: You could simply omit it, and the
scrollbar would still be rendered properly (albeit with a slightly different
gray shading).

Let's remove the scrollbar style and the body margin -- while keeping the same
`CUSTOM CONTENT` styles:

```css
div.dizmo-accordion {
  ul.dizmo-accordion-panels {
    li.dizmo-accordion-panel {
      .dizmo-accordion-panel-header {
        border-top: 1px dashed dimgrey; /* default: none */
      }
      .dizmo-accordion-panel-body {
        .dizmo-accordion-panel-body-content {     /*** CUSTOM CONTENT ***/

          display: table;
          div {
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            span {
              font-size: 10em;
              font-weight: bold;
            }
            p:hover {
              text-decoration: underline;
            }
          }

        }
      }
    }
  }
}
```

![preview](assets/accordion-panel-alt.png)

As you see the body margin of the accordion panels has been removed. Since the
looks looks almost the same (except a slightly different gray for the scrollbar
bord) it has not been shown again.

API: JavaScript
---------------

Toggling, showing and hiding panels is straight forward: Just call on the
dizmoElements object the `daccordion(..)` funtion with the corresponding
parameters:

To toggle panel `#1` invoke:

```js
DizmoElements('.dizmo-accordion').daccordion('toggle-panel', jQuery('#1'))
```

To show panel `#1` invoke:

```js
DizmoElements('.dizmo-accordion').daccordion('show-panel', jQuery('#1'))
```

To hide panel `#1` invoke:

```js
DizmoElements('.dizmo-accordion').daccordion('hide-panel', jQuery('#1'))
```

The scrollbar of the list is also controllable:

The create the scrollbar invoke:

```js
DizmoElements('.dizmo-accordion').daccordion('scroll-create')
```

The destroy the scrollbar invoke:

```js
DizmoElements('.dizmo-accordion').daccordion('scroll-destroy')
```

The update the scrollbar invoke:

```js
DizmoElements('.dizmo-accordion').daccordion('scroll-update')
```

Usually, these three invocation will not be required at all -- but it may make
very much sense upon e.g. resizing the dizmo to destroy the scrollbar when a
resizing operation starts, and then (re-)create it once resizing has been done.

API: Events
-----------

The accordion supports four different events: `before-show` and `after-show`
plus `before-hide` and `after-hide`. You can subscribe to them to perform
various tasks: E.g. check permission for a given panel in the `before-show`
event handler; if no permission is provided don't show it -- here is a code
snippet:

```js
$panels.on('before-show', function (ev, do_show) {
    var $target = jQuery(ev.target);
    console.debug('[ON:BEFORE-SHOW]', $target);

    if (this.permission_1) do_show($target);
}.bind(this);

$panels.on('after-show', function (ev, do_show) {
    var $target = jQuery(ev.target);
    console.debug('[ON:AFTER-SHOW]', $target);
}.bind(this);


$panels.on('before-hide', function (ev, do_hide) {
    var $target = jQuery(ev.target);
    console.debug('[ON:BEFORE-HIDE]', $target);

    if (this.permission_2) do_hide($target);
}.bind(this);

$panels.on('after-hide', function (ev) {
    var $target = jQuery(ev.target);
    console.debug('[ON:AFTER-HIDE]', $target);
}.bind(this);
```

By combining the event handlers with listed and/or unlisted panels you are able
to create some very interesting dizmos based on the `daccordion(..)` feature.