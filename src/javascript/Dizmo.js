//= require Assert

Class("Accordion.Dizmo", {
    my: {
        methods: {
            showBack: function () {
                dizmo.showBack();
            },

            showFront: function () {
                dizmo.showFront();
            },

            getId: function () {
                return dizmo.identifier;
            },

            load: function (path) {
                return dizmo.privateStorage.getProperty(path);
            },

            save: function (path, value) {
                dizmo.privateStorage.setProperty(path, value);
            },

            setTitle: function (value) {
                if (typeof value === 'string') {
                    dizmo.setAttribute('settings/title', value);
                }
            },

            publish: function (path, value) {
                assert(path);

                if (typeof value === 'undefined') {
                    value = path;
                    path = 'stdout';
                }

                dizmo.publicStorage.setProperty(path, value);
            },

            unpublish: function (path) {
                if (typeof path === 'undefined') {
                    path = 'stdout';
                }

                dizmo.publicStorage.deleteProperty(path);
            },

            getAttribute: function (key) {
                return dizmo.getAttribute(key);
            },

            setAttribute: function (key, value) {
                dizmo.setAttribute(key, value);
            },

            getSize: function () {
                return dizmo.getSize();
            },

            setSize: function (width, height) {
                dizmo.setSize(width, height);
            },

            subscribe: function (path, callback) {
                return dizmo.privateStorage.subscribeTo(
                    path, callback.bind(this)
                );
            },

            unsubscribe: function (id) {
                dizmo.privateStorage.unsubscribe(id);
            }
        }
    },

    after: {
        initialize: function () {
            this.setAttributes();
            this.initEvents();
        }
    },

    methods: {
        initEvents: function () {
            dizmo.onShowBack(function () {
                jQuery("#front").hide();
                jQuery("#back").show();
                jQuery(events).trigger('dizmo.turned', ['back']);
            });

            dizmo.onShowFront(function () {
                jQuery("#back").hide();
                jQuery("#front").show();
                jQuery(events).trigger('dizmo.turned', ['front']);
            });

            dizmo.subscribeToAttribute('geometry/height', function () {
                jQuery(events).trigger('dizmo.resized', [
                    dizmo.getWidth(), dizmo.getHeight()
                ]);
            });

            dizmo.subscribeToAttribute('geometry/width', function () {
                jQuery(events).trigger('dizmo.resized', [
                    dizmo.getWidth(), dizmo.getHeight()
                ]);
            });

            viewer.subscribeToAttribute('settings/displaymode', function (path, value) {
                if (value === 'presentation') {
                    dizmo.setAttribute('state/framehidden', true);
                } else {
                    dizmo.setAttribute('state/framehidden', false);
                }

                jQuery(events).trigger('dizmo.onmodechanged', [value]);
            });

            dizmo.onDock(function () {
                jQuery(events).trigger('dizmo.docked');
            });

            dizmo.onUndock(function () {
                jQuery(events).trigger('dizmo.undocked');
            });

            dizmo.canDock(false);
        },

        setAttributes: function () {
            dizmo.setAttribute('settings/usercontrols/allowresize', true);
        }
    }
});
