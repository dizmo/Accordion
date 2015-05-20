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

            $ACC = DizmoElements('.dizmo-accordion');
            $P0 = jQuery('#P01'); $P1 = jQuery('#P02');
            $P2 = jQuery('#P03'); $P3 = jQuery('#P04');
            $P4 = jQuery('#P05'); $P5 = jQuery('#P06');
            $P6 = jQuery('#P07'); $P7 = jQuery('#P08');
            $P8 = jQuery('#P09'); $P9 = jQuery('#P10');

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
