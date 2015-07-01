//= require Assert
//= require Dizmo

Class("Accordion.Main", {
    has: {
        /**
         * Wrapper around the dizmo API: It is instantiated *before* the
         * `initialize` function is called (and can therefore already be used
         * there).
         */
        dizmo: {
            is: 'ro', init: function () {
                return new Accordion.Dizmo();
            }
        }
    },

    after: {
        /**
         * Called after all attributes were initialized to apply further steps
         * (like initializing events).
         */
        initialize: function () {

            //
            // DizmoElements object referencing the accordion element:
            //

            var $acc = DizmoElements('div.dizmo-accordion');

            //
            // global dizmoElements objects to be used for debugging purposes;
            // each line corresponds to a panel:
            //

            // listed panels:
            window.$P0 = $acc.find('li.dizmo-accordion-panel:nth(0)');
            window.$P1 = $acc.find('li.dizmo-accordion-panel:nth(1)');
            window.$P2 = $acc.find('li.dizmo-accordion-panel:nth(2)');
            window.$P3 = $acc.find('li.dizmo-accordion-panel:nth(3)');
            window.$P4 = $acc.find('li.dizmo-accordion-panel:nth(4)');
            window.$P5 = $acc.find('li.dizmo-accordion-panel:nth(5)');
            window.$P6 = $acc.find('li.dizmo-accordion-panel:nth(6)');
            window.$P7 = $acc.find('li.dizmo-accordion-panel:nth(7)');
            window.$P8 = $acc.find('li.dizmo-accordion-panel:nth(8)');
            window.$P9 = $acc.find('li.dizmo-accordion-panel:nth(9)');

            // unlisted panels (hidden in the list):
            window.$PA = $acc.find('li.dizmo-accordion-panel#a');
            window.$PB = $acc.find('li.dizmo-accordion-panel#b');
            window.$PC = $acc.find('li.dizmo-accordion-panel#c');

            //
            // global dizmoElements objects to be used for debugging purposes:
            //

            window.$ACC = $acc;

            // initial update of timestamps (in all panels):
            this.updateTimestamp($acc.find('div > span + p'));

            // initial wiring of events with their handlers:
            this.initEvents();
        }
    },

    methods: {
        /**
         * Wire events with the corresponding handlers -- these event handlers
         * are *custom* (and for demonstration purposes):
         */
        initEvents: function () {
            var $done = DizmoElements('.done-button');
            $done.on('click', function () {
                Accordion.Dizmo.showFront();
            });

            var $acc = DizmoElements('div.dizmo-accordion:first'),
                $all_panels = $acc.find('>ul.dizmo-accordion-panels'),
                $panels = $all_panels.find('>li.dizmo-accordion-panel');

            //
            // accordion -- before- and after-show handlers:
            //
            // It is possible to have none, one or multiple handlers for the
            // `before-show` and `after-show` events; these event handlers are
            // *not* mandatory but optional to implement.
            //

            $panels.on('before-show', function (ev, do_show) {
                var $target = DizmoElements(ev.target);
                console.debug('[ON:BEF/SHOW]', $target);

                //
                // If one or more `before-show` handlers are listening then
                // of these *maximum one* is required to invoke `do-show`: By
                // doing so you can implement conditional logic. (In this demo
                // `do-show` is always invoked).
                //
                // For example, if you only want to show a certain admin-panel
                // given a sufficient permission condition, then you could not
                // invoke `do-show` if no such permission would be present (and
                // display a notification instead).
                //

                do_show($target);
            });
            $panels.on('after-show', function (ev) {
                var $target = DizmoElements(ev.target);
                console.debug('[ON:AFT/SHOW]', $target);

                //
                // Update `timestamp` paragraph(s) with corresponding value:
                //

                this.updateTimestamp($target.find('p.timestamp'));

                //
                // Update *nested* accordion(s) scroll mechanism:
                //

                $target.find('.dizmo-accordion').daccordion('scroll-update');
            }.bind(this));

            //
            // accordion -- before- and after-hide handlers:
            //
            // It is possible to have none, one or multiple handlers for the
            // `before-hide` and `after-hides` events; these event handlers are
            // *not* mandatory but optional to implement.
            //

            $panels.on('before-hide', function (ev, do_hide) {
                var $target = DizmoElements(ev.target);
                console.debug('[ON:BEF/HIDE]', $target);

                //
                // If one or more `before-hide` handlers are listening then
                // of these *maximum one* is required to invoke `do-hide`: By
                // doing so you can implement conditional logic. (In this demo
                // `do-hide` is always invoked).
                //

                do_hide($target);
            });
            $panels.on('after-hide', function (ev) {
                console.debug('[ON:AFT/HIDE]', DizmoElements(ev.target));
            });

            //
            // accordion -- click handlers: next-switch between unlisted:
            //
            // In this demo, each *listed* panel contains a click-able time-
            // stamp: Upon clicking it the *unlisted* panel #a is shown, which
            // again has a click-able timestamp, which leads to the again un-
            // listed panel #b. Similarly the timestamp in panel #b leads to
            // the unlisted panel #c.
            //
            // Panel #c has another timestamp, which upon a click *cycles* back
            // to the initial (and listed) panel at the start of the cycle. The
            // same unlisted panels #a, #b and #c are used for all listed panels
            // to cycle through.
            //
            // Using this combination of listed/unlisted panels it is possible
            // to simulate *nested* panels: Since the list of panels of the
            // original HTML is flat and does not contain any nesting relation-
            // ships, the corresponding next- (and back-) switches need to be
            // explicitly implemented.
            //

            var $panel_t,
                $panel_n = $all_panels.find('>li.dizmo-accordion-panel' +
                    ':not(#a):not(#b):not(#c)'),
                $panel_a = $all_panels.find('>li.dizmo-accordion-panel#a'),
                $panel_b = $all_panels.find('>li.dizmo-accordion-panel#b'),
                $panel_c = $all_panels.find('>li.dizmo-accordion-panel#c');

            $panel_n.find('p.timestamp').on('click', function (ev) {
                $panel_t = DizmoElements(ev.target)
                    .closest('li.dizmo-accordion-panel');
                $acc.daccordion('toggle-panel', $panel_a);
            });
            $panel_a.find('p.timestamp').on('click', function () {
                $acc.daccordion('toggle-panel', $panel_b);
            });
            $panel_b.find('p.timestamp').on('click', function () {
                $acc.daccordion('toggle-panel', $panel_c);
            });
            $panel_c.find('p.timestamp').on('click', function () {
                $acc.daccordion('toggle-panel', $panel_t);
            });

            //
            // accordion -- click handlers; back-switch between unlisted:
            //
            // The unlisted panels offer also a back-switch in the header
            // section; as explained above due to a lack of relationship
            // definitions of nested panels, the back-switches need to be
            // implemented explicitly (to define where to back-switch to).
            //
            // By clicking the icon (or text) of the header the unlisted panels
            // #a, #b and #c back-switch to #(initial listed panel), #a or #b.
            //
            // If the handlers below would have had *not* been implemented, then
            // clicking the header icon or text - of an *unlisted* panel - would
            // have had *no* effect!
            //

            var $icon_a = $panel_a
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content')
                    .find('>.dizmo-accordion-panel-header-icon'),
                $text_a = $panel_a
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content')
                    .find('>.dizmo-accordion-panel-header-text'),
                $icon_b = $panel_b
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content')
                    .find('>.dizmo-accordion-panel-header-icon'),
                $text_b = $panel_b
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content')
                    .find('>.dizmo-accordion-panel-header-text'),
                $icon_c = $panel_c
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content')
                    .find('>.dizmo-accordion-panel-header-icon'),
                $text_c = $panel_c
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content')
                    .find('>.dizmo-accordion-panel-header-text');

            $icon_a.on('click', function () {
                $acc.daccordion('toggle-panel', $panel_t);
            });
            $text_a.on('click', function () {
                $acc.daccordion('toggle-panel', $panel_t);
            });
            $icon_b.on('click', function () {
                $acc.daccordion('toggle-panel', $panel_a);
            });
            $text_b.on('click', function () {
                $acc.daccordion('toggle-panel', $panel_a);
            });
            $icon_c.on('click', function () {
                $acc.daccordion('toggle-panel', $panel_b);
            });
            $text_c.on('click', function () {
                $acc.daccordion('toggle-panel', $panel_b);
            });

            //
            // accordion -- dynamic content; for panels #b and #c:
            //
            // It is recommended to use the `before-show` handler for dynamic
            // content manipulation (to avoid the user seeing the content be-
            // ing changed).
            //
            // However, due to the application logic using the `before-show`
            // handler might not always be possible: In this case, the other
            // `after-show` handler can be used (or any other timing mechanism
            // you wish to employ).
            //
            // It is important to update the scroll mechanism of the panel's
            // content by running `$acc.daccordion('scroll-update-content')` --
            // otherwise, scrolling will not be properly (re-)initialized!
            //

            $panel_b.on('before-show', function (ev) {
                var $target = DizmoElements(ev.target),
                    $p = jQuery("<p class='lorem-ipsum'>"),
                    $lipsum = $panel_a.find('p.lorem-ipsum');

                $p.html($lipsum.text().replace('STATIC/A',
                        'DYNAMIC/B <b>[' + new Date().toISOString() + ']</b>'));
                $target
                    .find('>.dizmo-accordion-panel-body')
                    .find('>.dizmo-accordion-panel-body-content')
                    .find('div').append($p);
            });

            $panel_c.on('after-show', function (ev) {
                var $target = DizmoElements(ev.target),
                    $p = jQuery("<p class='lorem-ipsum'>"),
                    $lipsum = $panel_a.find('p.lorem-ipsum');

                $p.html($lipsum.text().replace('STATIC/A',
                        'DYNAMIC/C <b>[' + new Date().toISOString() + ']</b>'));
                $target
                    .find('>.dizmo-accordion-panel-body')
                    .find('>.dizmo-accordion-panel-body-content')
                    .find('div').append($p);

                $acc.daccordion('scroll-update-content'); // required!
            });

            //
            // accordion -- click handler; for special toggle button(s):
            //
            // The `dizmo-accordion-panel-header-icon` span tag has by default
            // a toggle functionality associated with; in cases where a custom
            // tag (like a button) is required the corresponding toggling needs
            // to be wired manually!
            //

            var $toggle = $panels
                .find('>.dizmo-accordion-panel-header')
                .find('>.dizmo-accordion-panel-header-content')
                .find('>.dizmo-accordion-panel-header-button.toggle');
            $toggle.on('click', function (ev) {
                var $target = DizmoElements(ev.target),
                    $panel = $target.closest('.dizmo-accordion-panel');

                $acc.daccordion('toggle-panel', $panel);
            });

            //
            // accordion -- click handlers; for plus/minus buttons:
            //
            // By using `insert-panel` it is possible to insert a panel at a
            // given index; if the index is larger than the number of already
            // existing panels then it is appended to the list.
            //
            // Further, the panel being inserted can be customized using an
            // options parameter: Either provide a map of CSS selectors with
            // the desired HTML content as values (see `plus-1`), or directly
            // use an HTML snippet wrapped as a `DizmoElements` object (see
            // `plus-2`).
            //
            // In the latter case, if you add custom elements (like buttons) do
            // not forget to wire the corresponding event handlers!
            //
            // It is also possible to add a `nested` accordion dynamically! See
            // `plus-3` and `plus-4` variations: whereas `plus-3` uses the CSS
            // selectors to construct a new panel with a `nested` accordion, the
            // last `plus-4` wraps an HTML snippet as a `DizmoElements` object.
            //
            // Further panels can be inserted to the `nested` accordion, but one
            // has first to maek sure that is has been properly initialized by
            // using the parameter-less `daccordion ()` function.
            //
            // Finally, via `remove-panel` a panel can be removed at a given
            // index (see `minus`); if no panel exists at the index then nothing
            // happens.
            //

            //
            // $plus-1: insert a panel at index 1; in `opts` use CSS selectors
            //          (with HTML snippets) to customize an internal template.
            //

            var $plus_1 = $panels
                .find('>.dizmo-accordion-panel-header')
                .find('>.dizmo-accordion-panel-header-content')
                .find('>.dizmo-accordion-panel-header-button.plus-1');
            $plus_1.on('click', function (ev) {
                var h_content = '.dizmo-accordion-panel-header-content',
                    b_content = '.dizmo-accordion-panel-body-content',
                    active = '.active', not_active = ':not(.active)';

                var text = '.dizmo-accordion-panel-header-text',
                    icon = '.dizmo-accordion-panel-header-icon';

                var opts = {unlisted: false}; // or 'unlisted'
                opts[h_content + not_active + ' ' + text] = 'PANEL ?';
                opts[h_content + active + ' ' + text] = 'PANEL ? [active]';
                opts[b_content] = "<div><span>?</span><p class='timestamp'></p></div>";

                $acc.daccordion('insert-panel', 1, opts);
            });

            //
            // $plus-2: insert a panel at index 2; *instead* `opts` use directly
            //          a `$panel` which is created from a template.
            //

            var $plus_2 = $panels
                .find('>.dizmo-accordion-panel-header')
                .find('>.dizmo-accordion-panel-header-content')
                .find('>.dizmo-accordion-panel-header-button.plus-2');
            $plus_2.on('click', function (ev) {
                var tpl = "<li class='dizmo-accordion-panel'>" +
                    "<div class='dizmo-accordion-panel-header'>" +
                        "<div class='dizmo-accordion-panel-header-content'>" +
                            "<span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>" +
                            "<span class='dizmo-accordion-panel-header-text'></span>" +
                        "</div>" +
                        "<div class='dizmo-accordion-panel-header-content active'>" +
                            "<span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>" +
                            "<span class='dizmo-accordion-panel-header-text'></span>" +
                        "</div>" +
                    "</div>" +
                    "<div class='dizmo-accordion-panel-body'>" +
                        "<div class='dizmo-accordion-panel-body-content'>" +
                            "<div><span></span><p class='timestamp'></p></div>" +
                        "</div>" +
                    "</div>" +
                "</li>";

                var $panel = DizmoElements(tpl);
                $panel
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content:not(.active)')
                    .find('>.dizmo-accordion-panel-header-text')
                    .text('PANEL #');
                $panel
                    .find('>.dizmo-accordion-panel-header')
                    .find('>.dizmo-accordion-panel-header-content.active')
                    .find('>.dizmo-accordion-panel-header-text')
                    .text('PANEL # [active]');
                $panel
                    .find('>.dizmo-accordion-panel-body')
                    .find('>.dizmo-accordion-panel-body-content')
                    .find('div').find('span')
                    .text('#');

                $acc.daccordion('insert-panel', 2, $panel);
            });

            //
            // $plus-3: insert a panel at index 3; in `opts` use CSS selectors
            //          (with HTML snippets) to customize an internal template.
            //

            var $plus_3 = $panels
                .find('>.dizmo-accordion-panel-header')
                .find('>.dizmo-accordion-panel-header-content')
                .find('>.dizmo-accordion-panel-header-button.plus-3');
            $plus_3.on('click', function (ev) {
                var h_content = '.dizmo-accordion-panel-header-content',
                    b_content = '.dizmo-accordion-panel-body-content',
                    h_text = '.dizmo-accordion-panel-header-text';

                var opts = {nested: 'nested'};
                opts[h_content + ' ' + h_text] = 'PANEL $';
                opts[b_content] =
                    "<div class='dizmo-accordion no-dizmo-drag' data-type='dizmo-accordion'>" +
                        "<ul class='dizmo-accordion-panels'></ul>" +
                    "</div>";

                $acc.daccordion('insert-panel', 3, opts);

                var $sub_acc = $acc.find('.dizmo-accordion').daccordion(),
                    sub_opts = {unlisted: false}; // or 'unlisted'

                sub_opts[h_content + ' ' + h_text] = 'PANEL $';
                sub_opts[b_content] = "<div><span>$</span><p class='timestamp'></p></div>";

                $sub_acc.daccordion('insert-panel', 0, sub_opts);
                $sub_acc.daccordion('insert-panel', 1, sub_opts);
                $sub_acc.daccordion('insert-panel', 2, sub_opts);
            });

            //
            // $plus-4: insert a panel at index 4; *instead* `opts` use directly
            //          a `$panel` which is created from a template.
            //

            var $plus_4 = $panels
                .find('>.dizmo-accordion-panel-header')
                .find('>.dizmo-accordion-panel-header-content')
                .find('>.dizmo-accordion-panel-header-button.plus-4');
            $plus_4.on('click', function (ev) {
                var tpl = "<li class='dizmo-accordion-panel'>" +
                    "<div class='dizmo-accordion-panel-header'>" +
                        "<div class='dizmo-accordion-panel-header-content'>" +
                            "<span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>" +
                            "<span class='dizmo-accordion-panel-header-text'>PANEL $</span>" +
                        "</div>" +
                        "<div class='dizmo-accordion-panel-header-content active'>" +
                            "<span class='dizmo-accordion-panel-header-icon'>&nbsp;</span>" +
                            "<span class='dizmo-accordion-panel-header-text'>PANEL $ [active]</span>" +
                        "</div>" +
                    "</div>" +
                    "<div class='dizmo-accordion-panel-body'>" +
                        "<div class='dizmo-accordion-panel-body-content nested'>" +
                            "<div class='dizmo-accordion no-dizmo-drag' data-type='dizmo-accordion'>" +
                                "<ul class='dizmo-accordion-panels'></ul>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</li>";


                $acc.daccordion('insert-panel', 4, DizmoElements(tpl));

                var $sub_acc = $acc.find('.dizmo-accordion').daccordion(),
                    sub_opts = {unlisted: false}; // or 'unlisted'

                var h_content = '.dizmo-accordion-panel-header-content',
                    b_content = '.dizmo-accordion-panel-body-content',
                    h_text = '.dizmo-accordion-panel-header-text';

                sub_opts[h_content + ' ' + h_text] = 'PANEL $';
                sub_opts[b_content] = "<div><span>$</span><p class='timestamp'></p></div>";

                $sub_acc.daccordion('insert-panel', 0, sub_opts);
                $sub_acc.daccordion('insert-panel', 1, sub_opts);
                $sub_acc.daccordion('insert-panel', 2, sub_opts);
            });

            //
            // $minus: remove a panel at index 1.
            //

            var $minus = $panels
                .find('>.dizmo-accordion-panel-header')
                .find('>.dizmo-accordion-panel-header-content')
                .find('>.dizmo-accordion-panel-header-button.minus');
            $minus.on('click', function (ev) {
                $acc.daccordion('remove-panel', 1);
            });

            //
            // $panels: toggle panel header when nested panel(s) toggle(s)
            //
            // By default the nested accordion panel headers *do not* hide the
            // panels headers of the outer accordion. The following handlers
            // for `before-show` and `before-hide` events (of the *nested*
            // panels!) implement such a hide/show of the outer headers.
            //

            var $nested = DizmoElements('.nested').find('.dizmo-accordion-panel');
            $nested.on('before-show', function (ev, do_show) {
                var $target = DizmoElements(ev.target);
                console.debug('[ON:BEF/SHOW]', $target);

                var $nested = $target.closest('.nested'),
                    $panel = $nested.closest('.dizmo-accordion-panel'),
                    $header = $panel.find('>.dizmo-accordion-panel-header'),
                    $body = $panel.find('>.dizmo-accordion-panel-body');

                $body.css('height', '100%');
                $header.slideUp('fast', function () {
                    do_show($target)
                });
            });
            $nested.on('before-hide', function (ev, do_hide) {
                var $target = DizmoElements(ev.target);
                console.debug('[ON:BEF/HIDE]', $target);

                var $nested = $target.closest('.nested'),
                    $panel = $nested.closest('.dizmo-accordion-panel'),
                    $header = $panel.find('>.dizmo-accordion-panel-header'),
                    $body = $panel.find('>.dizmo-accordion-panel-body');

                $header.slideDown('fast', function () {
                    $body.css('height', 'calc(100% - 48px)');
                    do_hide($target)
                });
            });

            //
            // framecolor -- ensure colors with strong contrast w.r.t. frame:
            //

            DizmoElements(events).on('settings/framecolor', function (ev, value) {
                if (value.match(/^#ff[\w]{6}/) && !value.match(/[\w]{6}ff$/)) {
                    value = value.replace('#ff', '#');
                } else if (value.match(/[\w]{6}ff$/)) {
                    value = value.slice(0, 7);
                }

                if (Colors.hex2bright(value)) {
                    DizmoElements('#front')
                        .css('color', 'black');
                    DizmoElements('.dizmo-accordion-panel-header')
                        .css('border-top-color', 'dimgrey');
                    DizmoElements('.iScrollIndicator')
                        .css('border-color', 'dimgrey');
                } else {
                    DizmoElements('#front')
                        .css('color', 'white');
                    DizmoElements('.dizmo-accordion-panel-header')
                        .css('border-top-color', 'whitesmoke');
                    DizmoElements('.iScrollIndicator')
                        .css('border-color', 'whitesmoke');
                }
            });

            DizmoElements(events).trigger('settings/framecolor', [
                this.dizmo.my.getAttribute('settings/framecolor')
            ]);
        },

        /**
         * Update timestamp for provided `$timestamp` element.
         */
        updateTimestamp: function($timestamp) {
            $timestamp.html(this.getTimestamp({suffix: '&raquo;'}));
        },

        /**
         * Get local timestamp string with an optional prefix and/or suffix.
         */
        getTimestamp: function (opts) {
            var prefix = opts && opts.prefix || '',
                suffix = opts && opts.suffix || '';

            return prefix + new Date().toLocaleString() + suffix;
        }
    }
});
