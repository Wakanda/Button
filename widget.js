WAF.define('Button', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Button = Widget.create('Button', {
        tagName: 'button',
        value: Widget.property({
            defaultValueCallback: function() {
                return this.node.innerHTML;
            }
        }),
        actionSource: Widget.property({ type: 'datasource' }),
        actionType: Widget.property({
            type: 'enum',
            values: [ 'create', 'simple', 'save', 'next',
                    'previous', 'last', 'first', 'remove' ],
            defaultValue: 'simple',
            bindable: false
        }),
        url: Widget.property({ type: 'string' }),
        urlTarget: Widget.property({
            type: 'enum',
            values: ['_blank', '_self'],
            bindable: false
        }),
        init: function() {
            this.node.innerHTML = this.value();
            this.value.onChange(function() {
                this.node.innerHTML = this.value();
            });

            this._handleClick = function() {
                this.fire('action');

                if(this.actionSource() && this.actionType() in this.actionSource()) {
                    this.actionSource()[this.actionType()]();
                }

                if(this.url()) {
                    if(this.urlTarget() === '_blank') {
                        window.open(this.url());
                    } else {
                        window.location = this.url();
                    }
                }
            }.bind(this);
            $(this.node).on('click', this._handleClick)
        }
    });

    Button.inherit(WAF.require('waf-behavior/focus'));


    return Button;
});
