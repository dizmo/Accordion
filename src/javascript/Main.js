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

            var $acc = DizmoElements('div.dizmo-accordion'),
                $panels = $acc.find('li.dizmo-accordion-panel');

            //
            // accordion -- before- and after-show handlers:
            //
            // It is possible to have none, one or multiple handlers for the
            // `before-show` and `after-show` events; these event handlers are
            // *not* mandatory but optional to implement.
            //

            $panels.on('before-show', function (ev, do_show) {
                var $target = DizmoElements(ev.target);
                console.debug('[ON:BEF/SHOW-1]', $target);

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
            $panels.on('before-show', function (ev) {
                console.debug('[ON:BEF/SHOW-2]', DizmoElements(ev.target));
            });
            $panels.on('after-show', function (ev) {
                var $target = DizmoElements(ev.target);
                console.debug('[ON:AFT/SHOW-3]', $target);

                this.updateTimestamp($target.find('div > span + p'));
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
                console.debug('[ON:BEF/HIDE-1]', $target);

                //
                // If one or more `before-hide` handlers are listening then
                // of these *maximum one* is required to invoke `do-hide`: By
                // doing so you can implement conditional logic. (In this demo
                // `do-hide` is always invoked).
                //

                do_hide($target);
            });
            $panels.on('before-hide', function (ev) {
                console.debug('[ON:BEF/HIDE-2]', DizmoElements(ev.target));
            });
            $panels.on('after-hide', function (ev) {
                console.debug('[ON:AFT/HIDE-3]', DizmoElements(ev.target));
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
                $panel_n = $acc.find('li.dizmo-accordion-panel' +
                    ':not(#a):not(#b):not(#c)'),
                $panel_a = $acc.find('li.dizmo-accordion-panel#a'),
                $panel_b = $acc.find('li.dizmo-accordion-panel#b'),
                $panel_c = $acc.find('li.dizmo-accordion-panel#c');

            $panel_n.find('div > span + p').on('click', function (ev) {
                $panel_t = DizmoElements(ev.target)
                    .closest('li.dizmo-accordion-panel');
                $acc.daccordion('toggle-panel', $panel_a);
            });
            $panel_a.find('div > span + p').on('click', function () {
                $acc.daccordion('toggle-panel', $panel_b);
            });
            $panel_b.find('div > span + p').on('click', function () {
                $acc.daccordion('toggle-panel', $panel_c);
            });
            $panel_c.find('div > span + p').on('click', function () {
                $acc.daccordion('toggle-panel', $panel_t);
            });

            //
            // accordion -- click handlers: back-switch between unlisted:
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

            var $icon_a = $panel_a.find('.dizmo-accordion-panel-header-icon'),
                $text_a = $panel_a.find('.dizmo-accordion-panel-header-text'),
                $icon_b = $panel_b.find('.dizmo-accordion-panel-header-icon'),
                $text_b = $panel_b.find('.dizmo-accordion-panel-header-text'),
                $icon_c = $panel_c.find('.dizmo-accordion-panel-header-icon'),
                $text_c = $panel_c.find('.dizmo-accordion-panel-header-text');

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
