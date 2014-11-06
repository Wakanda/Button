(function(Button) {
    "use strict";
    Button.setWidth(110);
    Button.setHeight(45);

    Button.addStates('hover', 'active', 'focus', 'disabled');
    Button.addEvents('action','click','dblclick','mousedown','mouseout','mouseover','mouseup','touchstart','touchend','touchcancel');

    var showUrl = function() {
        if(this.url() || this.url.boundDatasource()) {
            this.urlTarget.show();
        } else {
            this.urlTarget.hide();
        }
    };

    var showAction = function() {
        if(this.actionSource.boundDatasource() && this.actionSource.boundDatasource().datasourceName) {
            this.actionType.show();
        } else {
            this.actionType.hide();
        }
    };

    Button.doAfter('init', function() {
        showUrl.call(this);
        this.url.onChange(showUrl);
        this.subscribe('datasourceBindingChange', 'url', showUrl, this);

        showAction.call(this);
        this.subscribe('datasourceBindingChange', 'actionSource', showAction, this);

        // disable click
        $(this.node).off('click', this._handleClick);
    });

    Button.customizeProperty('actionType', { category: 'ActionSource property' });

    Button.setPanelStyle({
        'fClass': true, //This property is for the design panel
        'text': true,
        'textShadow': true,
        'dropShadow': true,
        'innerShadow': true,
        'background': true,
        'border': true,
        'sizePosition': true,
        'label': true,
        'disabled': ['border-radius']
    });

});
