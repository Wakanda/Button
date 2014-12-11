## Button widget for [Wakanda](http://www.wakanda.org)
The [Button widget](http://doc.wakanda.org/WakandaStudio0/help/Title/en/page4607.html "Button widget") allows you to include buttons on your Pages that can open up a URL or Page in your project, perform an automatic action on a datasource, or execute your own JavaScript code.

### Properties
This widget has the following properties:

* __ID__: Unique ID
* __Hide on load__: Hide the widget when your page is loaded for the first time. 
* __Title__: Button title.
* __Plain text__: Display the Button's Title property as either HTML or plain text. 
* __URL__: Defines the URL to go to.
* __Target__: Open the URL in a new page or the same page.
* __Action Source property__: This section allows you to define a datasource on which an automatic action can be executed:
	* __Source__: Datasource name.
	* __Action__: Automated functions to be executed on the datasource.

For more information, refer to the [Widget v2 Properties](http://doc.wakanda.org/WakandaStudio0/help/Title/en/page4608.html "Widget v2 Properties") chapter.

### Events
The following events can be intercepted for this widget:

* [Property Events](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4609.html #1085182): On Change
* [General Events](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4609.html #1085330): On Action
* [Mouse Events](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4609.html #1085346): On Click, On Double Click, On Mouse Down, On Mouse Out, On Mouse Over, and On Mouse Up
* [Touch Events](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4609.html #1085362): On Touch Start, On Touch End, and On Touch Cancel

For more information, refer to the [Widget v2 Events](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4609.html "Widget v2 Events") chapter.

### Styles
You can customize the look of each Button by making changes in the __Styles__ tab for each of its Default, Hover, Active, Focus, and Disabled states. For more information, refer to the [Widget v2 Styles](http://doc.wakanda.org/WakandaStudio0/help/Title/en/page4611.html "Widget v2 Styles") chapter.

### API
The Button widget has its own [API](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4613.html "Button v2 API") and also inherits from the [Widgets v2 Instance API](http://doc.wakanda.org/WakandaStudio/help/Title/en/page4066.html " Widgets v2 Instance API").