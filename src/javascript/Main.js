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

            $PA = $acc.find('.dizmo-accordion-panel:nth(10)');
            $PB = $acc.find('.dizmo-accordion-panel:nth(11)');
            $PC = $acc.find('.dizmo-accordion-panel:nth(12)');
            $ACC = DizmoElements($acc);

            this.initEvents();
        }
    },

    methods: {
        initEvents: function () {
            var $done = jQuery('.done-button');
            $done.on('click', function () {
                Accordion.Dizmo.showFront();
            });

            var $panels = jQuery('.dizmo-accordion-panel');
            $panels.on('before-show', function (ev, do_show) {
                var $target = jQuery(ev.target), id = $target.prop('id');
                console.debug('[ON:BEF/SHOW-1] id=', id, $target);
                do_show($target);
            });
            $panels.on('before-show', function (ev) {
                var $target = jQuery(ev.target), id = $target.prop('id');
                console.debug('[ON:BEF/SHOW-2] id=', id, $target);
            });
            $panels.on('after-show', function (ev) {
                var $target = jQuery(ev.target), id = $target.prop('id');
                console.debug('[ON:AFT/SHOW]-3 id=', id, $target);
            });

            $panels.on('before-hide', function (ev, do_hide) {
                var $target = jQuery(ev.target), id = $target.prop('id');
                console.debug('[ON:BEF/HIDE-1] id=', id, $target);
                do_hide($target);
            });
            $panels.on('before-hide', function (ev) {
                var $target = jQuery(ev.target), id = $target.prop('id');
                console.debug('[ON:BEF/HIDE-2] id=', id, $target);
            });
            $panels.on('after-hide', function (ev) {
                var $target = jQuery(ev.target), id = $target.prop('id');
                console.debug('[ON:AFT/HIDE]-3 id=', id, $target);
            });
        }
    }
});
