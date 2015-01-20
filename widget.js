WAF.define('Button', ['waf-core/widget'], function(Widget) {
    "use strict";

    var Button = Widget.create('Button', {
        tagName: 'button',
        title: Widget.property({
            type: 'string',
            description: "Title displayed as plain text or formatted HTML text",
            defaultValueCallback: function() {
                if(this.node.childNodes[2]){
                    if(this.plainText()) {
                        return this.node.childNodes[2].textContent;
                    }
                    return this.node.childNodes[2].innerHTML;
                }
                return '';
            }
        }),
        plainText: Widget.property({
            type: 'boolean',
            description: "Format HTML text for the Button widget's title",            
            defaultValue: true,
            bindable: false
        }),
        actionSource: Widget.property({ 
            type: 'datasource',
            description: "Datasource to define for automatic actions"
        }),
        actionType: Widget.property({
            type: 'enum',
            description: "Action to execute on datasource",
            values: {
                '':               '',
                'addNewElement':  'Create',
                'save':           'Save',
                'selectNext':     'Next',
                'selectPrevious': 'Previous',
                'last':           'Last',
                'first':          'First',
                'removeCurrent':  'Remove'
            },
            defaultValue: '',
            bindable: false
        }),
        url: Widget.property({ 
            type: 'string',
            description: "URL to go to when the Button widget is clicked"
        }),
        urlTarget: Widget.property({
            type: 'enum',
            description: "Location where to open the URL",
            values: ['_blank', '_self'],
            bindable: false
        }),
        disable: function() {
           this.$super('disable')();
           this.node.disabled = true;
        },
        enable: function() {
           this.$super('enable')();
           this.node.disabled = false;
        },
        initTitle: function(){
            this.node.innerHTML = '';
            // icon reserved span
            this.node.insertAdjacentHTML('afterbegin','<span/>');
            // title suggestion span
            this.node.insertAdjacentHTML('afterbegin','<span/>');
            // user defined title span
            this.node.insertAdjacentHTML('afterbegin','<span/>');
        },
        resetTitle: function(){
            this.node.childNodes[1].innerHTML = '';
            this.node.childNodes[2].innerHTML = '';
        },
        renderTitle: function(title) {
            this.resetTitle();
            title = title || this.title();

            if(!title){
                title = 'Button';
                if(this.actionSource.boundDatasource() != null){
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
                this.node.childNodes[1].innerHTML = title;
              
            }else{
                if(this.plainText()) {
                    this.node.childNodes[2].textContent = this.node.childNodes[2].innerHTML = title;
                } else {
                    this.node.childNodes[2].innerHTML = title;
                }     
            }
        },
        init: function() {
            this.initTitle();
            this.renderTitle();
            this.title.onChange(function(){ this.renderTitle() });
            this.plainText.onChange(function(){ this.renderTitle() });
            this.actionType.onChange(function(){ this.renderTitle() });

            // bootstrap classes
            this.addClass('btn btn-default');

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

    Button.addTabIndex();
    
    return Button;
});
