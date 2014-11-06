WAF.define('Button', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Button = Widget.create('Button', {
        tagName: 'button',
        title: Widget.property({
            defaultValueCallback: function() {
                return this.node.innerHTML;
            }
        }),
        plainText: Widget.property({
            type: 'boolean',
            defaultValue: true,
            bindable: false
        }),
        actionSource: Widget.property({ type: 'datasource' }),
        actionType: Widget.property({
            type: 'enum',
            values: {
                '':               '',
                'addNewElement':  'create',
                'save':           'save',
                'selectNext':     'next',
                'selectPrevious': 'previous',
                'last':           'last',
                'first':          'first',
                'removeCurrent':  'remove'
            },
            defaultValue: '',
            bindable: false
        }),
        url: Widget.property({ type: 'string' }),
        urlTarget: Widget.property({
            type: 'enum',
            values: ['_blank', '_self'],
            bindable: false
        }),
        renderTitle: function(title) {
            title = title || this.title() || 'Button';
            if(title == 'Button' || this.title().length < 1 && this.actionSource.boundDatasource() != null){
                switch (this.actionType()) {
                    case '':
                        title = 'Button';
                        break;
                    case 'addNewElement': 
                        title = 'Create';
                        break;
                    case 'selectPrevious':
                        title = 'Previous';
                        break;
                    case 'selectNext':
                        title = 'Next';
                        break;
                    case 'removeCurrent':
                        title = 'Remove';
                        break;
                    default:
                        title = this.actionType().substring(0,1).toUpperCase() + this.actionType().substring(1);
                        break;
                }
            }
            if(this.plainText()) {
                this.node.textContent = this.node.innerHTML = title;
            } else {
                this.node.innerHTML = title;
            }
        },
        init: function() {
            // button text
            this.renderTitle();
            this.title.onChange(this.renderTitle);
            this.plainText.onChange(this.renderTitle);
            this.actionType.onChange(this.renderTitle);

            // bootstrap classes
            this.addClass('waf-widget btn btn-default');

            this._handleClick = function(event) {
                this.fire('action');
                if(this.actionSource()) {
                    switch (this.actionType()) {
                        case 'first':
                            this.actionSource().select(0);
                            break;
                        case 'last':
                            this.actionSource().select(this.actionSource().length - 1);
                            break;
                        default:
                            if(this.actionType() in this.actionSource()) {
                                this.actionSource()[this.actionType()]();
                            }
                    }
                }

                if(this.url()) {
                    if(this.urlTarget() === '_blank') {
                        window.open(this.url());
                    } else {
                        window.location = this.url();
                    }
                }

                event.stopPropagation();
            }.bind(this);
            $(this.node).on('click', this._handleClick);
        }
    });

    return Button;
});
