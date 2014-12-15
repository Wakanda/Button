(function(Button) {
    "use strict";
    
    Button.setWidth(92);
    Button.setHeight(32);

    Button.addStates('hover', 'active', 'focus', 'disabled');

    Button.addEvents({ 
        'name':'action' 
    },{ 
        'name':'click', 
        'category':'Mouse Events' 
    },{ 
        'name':'dblclick', 
        'description':'On Double Click',
        'category':'Mouse Events'
    },{ 
        'name':'mousedown', 
        'description':'On Mouse Down',
        'category':'Mouse Events'
    },{ 
        'name':'mouseout',
        'description':'On Mouse Out',
         'category':'Mouse Events'
    },{ 
        'name':'mouseover',
        'description':'On Mouse Over',
        'category':'Mouse Events'
    },{ 
        'name':'mouseup',
        'description':'On Mouse Up',
        'category':'Mouse Events'
    },{ 
        'name':'touchcancel',
        'description':'On Touch Cancel',
        'category':'Touch Events'
    },{ 
        'name':'touchend',
        'description':'On Touch End',
        'category':'Touch Events'
    },{ 
        'name':'touchstart',
        'description':'On Touch Start',
        'category':'Touch Events'
    });

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

    Button.customizeProperty('plainText', {title: 'Plain text'});
    Button.customizeProperty('url', {title: 'URL'});
    Button.customizeProperty('urlTarget', {title: 'Target'});
    Button.customizeProperty('actionSource', {title: 'Source', category: 'Action Source property'});
    Button.customizeProperty('actionType', { title: 'Action', category: 'Action Source property' });

    Button.setPanelStyle({
        'fClass': true, //This property is for the design panel
        'text': true,
        'textShadow': true,
        'dropShadow': true,
        'innerShadow': true,
        'background': true,
        'border': true,
        'sizePosition': true
    });

});
