//= require Assert
//= require Dizmo

Class("Accordion.Main", {
    has: {
        dizmo: {
            is: 'ro', init: function () {
                return new Accordion.Dizmo();
            }
        }
    },

    after: {
        initialize: function () {
            var color = this.dizmo.my.getAttribute('settings/framecolor');
            if (color === '#ffe6e6e6') this.dizmo.my.setAttribute(
                'settings/framecolor', '#ffe5e5e5'
            );

            var $acc = jQuery('.dizmo-accordion');
            $ACC = DizmoElements($acc);

            $P0 = $acc.find('.dizmo-accordion-panel:nth(0)');
            $P1 = $acc.find('.dizmo-accordion-panel:nth(1)');
            $P2 = $acc.find('.dizmo-accordion-panel:nth(2)');
            $P3 = $acc.find('.dizmo-accordion-panel:nth(3)');
            $P4 = $acc.find('.dizmo-accordion-panel:nth(4)');
            $P5 = $acc.find('.dizmo-accordion-panel:nth(5)');
            $P6 = $acc.find('.dizmo-accordion-panel:nth(6)');
            $P7 = $acc.find('.dizmo-accordion-panel:nth(7)');
            $P8 = $acc.find('.dizmo-accordion-panel:nth(8)');
            $P9 = $acc.find('.dizmo-accordion-panel:nth(9)');

            $PA = $acc.find('.dizmo-accordion-panel#a');
            $PB = $acc.find('.dizmo-accordion-panel#b');
            $PC = $acc.find('.dizmo-accordion-panel#c');

            this.updateTimestamp($acc.find('div > span + p'));
            this.initEvents();
        }
    },

    methods: {
        initEvents: function () {
            var $done = jQuery('.done-button');
            $done.on('click', function () {
                Accordion.Dizmo.showFront();
            });

            var $acc = jQuery('.dizmo-accordion'),
                $panels = $acc.find('.dizmo-accordion-panel');

            // accordion -- before- and after-show handlers

            $panels.on('before-show', function (ev, do_show) {
                var $target = jQuery(ev.target);
                console.debug('[ON:BEF/SHOW-1]', $target);

                //
                // If one ore more `before-show` handlers are listening then
                // of these *exactly one* is required to invoke `do-show`: By
                // doing so you can implement conditional logic if you indeed
                // want to show the corresponding panel or not.
                //

                do_show($target);
            });
            $panels.on('before-show', function (ev) {
                console.debug('[ON:BEF/SHOW-2]', jQuery(ev.target));
            });
            $panels.on('after-show', function (ev) {
                var $target = jQuery(ev.target);
                console.debug('[ON:AFT/SHOW-3]', $target);
                this.updateTimestamp($target.find('div > span + p'));
            }.bind(this));

            // accordion -- before- and after-hide handlers

            $panels.on('before-hide', function (ev, do_hide) {
                var $target = jQuery(ev.target);
                console.debug('[ON:BEF/HIDE-1]', $target);

                //
                // If one ore more `before-hide` handlers are listening then
                // of these *exactly one* is required to invoke `do-hide`: By
                // doing so you can implement conditional logic if you indeed
                // want to hide the corresponding panel or not.
                //

                do_hide($target);
            });
            $panels.on('before-hide', function (ev) {
                console.debug('[ON:BEF/HIDE-2]', jQuery(ev.target));
            });
            $panels.on('after-hide', function (ev) {
                console.debug('[ON:AFT/HIDE-3]', jQuery(ev.target));
            });

            // accordion -- click handlers: next-switch between unlisted

            var $panel_t,
                $panel_n = $acc.find('.dizmo-accordion-panel' +
                    ':not(#a):not(#b):not(#c)'),
                $panel_a = $acc.find('.dizmo-accordion-panel#a'),
                $panel_b = $acc.find('.dizmo-accordion-panel#b'),
                $panel_c = $acc.find('.dizmo-accordion-panel#c');

            $panel_n.find('div > span + p').on('click', function (ev) {
                $panel_t = jQuery(ev.target).closest('.dizmo-accordion-panel');
                DizmoElements($acc).daccordion('toggle-panel', $panel_a);
            });
            $panel_a.find('div > span + p').on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_b);
            });
            $panel_b.find('div > span + p').on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_c);
            });
            $panel_c.find('div > span + p').on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_t);
            });

            // accordion -- click handlers: back-switch between unlisted

            var $icon_a = $panel_a.find('.dizmo-accordion-panel-header-icon'),
                $text_a = $panel_a.find('.dizmo-accordion-panel-header-text'),
                $icon_b = $panel_b.find('.dizmo-accordion-panel-header-icon'),
                $text_b = $panel_b.find('.dizmo-accordion-panel-header-text'),
                $icon_c = $panel_c.find('.dizmo-accordion-panel-header-icon'),
                $text_c = $panel_c.find('.dizmo-accordion-panel-header-text');

            $icon_a.on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_t);
            });
            $text_a.on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_t);
            });
            $icon_b.on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_a);
            });
            $text_b.on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_a);
            });
            $icon_c.on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_b);
            });
            $text_c.on('click', function () {
                DizmoElements($acc).daccordion('toggle-panel', $panel_b);
            });
        },

        updateTimestamp: function($timestamp) {
            $timestamp.html(this.getTimestamp());
        },

        getTimestamp: function () {
            return new Date().toLocaleString() + '&raquo;';
        }
    }
});
