package realtime.cloud.service;

import xirsys.cube.mvcs.Actor;
import xirsys.cube.events.IEvent;
import realtime.cloud.events.UrlAddressEvent;

class UrlAddressService extends Actor{
	
		
	private var swfAddress : Dynamic;
	private var internalDispatched : Bool;
	private var externalDispatched : Bool;
		
	
	/**
	* Creates an instance of a URL Address Service.
	*
	* @constructor
	* @this {UrlAddressService}
	*/
	
		public function new(){
			swfAddress = untyped __js__("SWFAddress");
			swfAddress.addEventListener(UrlAddressEvent.INIT, onUrlAddressInit);
			swfAddress.addEventListener(UrlAddressEvent.INTERNAL_CHANGE, onUrlAddressInternalChange);
			swfAddress.addEventListener(UrlAddressEvent.EXTERNAL_CHANGE, onUrlAddressExternalChange);
			enableInternalDispatching(false);
			enableExternalDispatching(false);
		}
	
	/**
	* Handles enabling the swf address system
	*/		
	
		public function enableInternalDispatching( enabled : Bool ){
			this.internalDispatched = enabled;
		}
		
	/**
	* Handles enabling the swf address system
	*/		
	
		public function enableExternalDispatching( enabled : Bool ){
			this.externalDispatched = enabled;
		}	
	
	
	/**
	* Loads the previous URL in the history list.
	*/		
	
		public function back(){
			swfAddress.back();
		}
		
	
	/**
	* Loads the next URL in the history list.
	*/		
	
		public function forward(){
			swfAddress.forward();
		}
		
		
	/**
	* Navigates one level up in the deep linking path.
	*/		
	
		public function up(){
			swfAddress.up();
		}
		
	
	/**
	* Provides the base address of the document.
	*/		
	
		public function getBaseURL() : String{
			return swfAddress.upgetBaseURL();
		}
		
	
	/**
	* Provides the state of the history setting.
	*/		
	
		public function getHistory() : Bool{
			return swfAddress.getHistory();
		}	
		
		
	/**
	* Provides the value of a specific query parameter as a string or array of strings.
	*/		
	
		public function getParameter( parameter : String ) : Dynamic{
			return swfAddress.getParameter(parameter);
		}					
	
	
	/**
	* Provides a list of all the query parameter names.
	*/		
	
		public function getParameterNames() : Array<String>{
			return swfAddress.getParameterNames();
		}
		

	/**
	* Provides the deep linking value without the query string.
	*/		
	
		public function getPath() : String{
			return swfAddress.getPath();
		}
		
		
	/**
	* Provides a list of all the folders in the deep linking path.
	*/		
	
		public function getPathNames() : Array<String>{
			return swfAddress.getPathNames();
		}
	
		
	/**
	* Provides the query string part of the deep linking value.
	*/		
	
		public function getQueryString() : String{
			return swfAddress.getQueryString();
		}
		
		
	/**
	* Provides the status of the browser window.
	*/		
	
		public function getStatus() : String{
			return swfAddress.getStatus();
		}
		
		
	/**
	* Provides the state of the strict mode setting.
	*/		
	
		public function getStrict() : Bool{
			return swfAddress.getStrict();
		}										

	
	/**
	* Provides the title of the HTML document.
	*/		
	
		public function getTitle() : String{
			return swfAddress.getTitle();
		}
	
	
	/**
	* Provides the tracker function.
	*/		
	
		public function getTracker() : String{
			return swfAddress.getTracker();
		}
		

	/**
	* Provides the current deep linking value.
	*/		
	
		public function getValue() : String{
			return swfAddress.getValue();
		}		
		
	
	/**
	* Loads a URL from the history list.
	*/		
	
		public function go( delta:Int ){
			swfAddress.go(delta);
		}

	
	/**
	* Opens a new URL in the browser.
	*/		
	
		public function href( url:String, target:String = "_self" ){
			swfAddress.href(url, target);
		}
		
		
	/**
	* Opens a browser popup window.
	*/		
	
		public function popup( url:String, name:String = "popup", options:String = "", handler:String = "" ){
			swfAddress.popup(url, name, options, handler);
		}	
		
		
	/**
	* Resets the status of the browser window.
	*/		
	
		public function resetStatus(){
			swfAddress.resetStatus();
		}		


	/**
	* Enables or disables the creation of history entries.
	*/		
	
		public function setHistory( history:Bool ){
			swfAddress.setHistory(history);
		}
		
		
	/**
	* Sets the status of the browser window.
	*/		
	
		public function setStatus( status:String ){
			swfAddress.setStatus(status);
		}
		
		
	/**
	* Enables or disables the strict mode.
	*/		
	
		public function setStrict( strict:Bool ){
			swfAddress.setStrict(strict);
		}			


	/**
	*  Sets the title of the HTML document.
	*/		
	
		public function setTitle( title:String ){
			swfAddress.setTitle(title);
		}
		
		
	/**
	* Sets a function for page view tracking.
	*/		
	
		public function setTracker( tracker:String ){
			swfAddress.setTracker(tracker);
		}	
		
		
	/**
	* Sets the current deep linking value.	
	*/		
	
		public function setValue( value:String ){
			if(internalDispatched || externalDispatched){
				swfAddress.setValue(value);
			}else{
				var urlAddressEvent: UrlAddressEvent = new UrlAddressEvent();
				urlAddressEvent.type = UrlAddressEvent.CHANGE;
				urlAddressEvent.path  = value;
				eventDispatcher.dispatch(UrlAddressEvent.CHANGE, urlAddressEvent);
			}
		}	
		
		
	/**
	* Used for internal application dispatching and not update the URL
	*/		
	
		public function dispatch( path:String, parameters : Hash<Dynamic>){
			var urlAddressEvent: UrlAddressEvent = new UrlAddressEvent();
			urlAddressEvent.type = UrlAddressEvent.CHANGE;
			urlAddressEvent.path  = path;
			urlAddressEvent.parameters  = parameters;
			eventDispatcher.dispatch(UrlAddressEvent.CHANGE, urlAddressEvent);
		}						

		
			
	/**
	* Handles when the URL address changes.
	*/
		
		private function onUrlAddressInit( event : UrlAddressEvent ) {
			var urlAddressEvent: UrlAddressEvent = new UrlAddressEvent();
			urlAddressEvent.type = event.type;
			urlAddressEvent.target = event.target;
			urlAddressEvent.path = event.path;
			urlAddressEvent.value  = event.value;
			urlAddressEvent.pathNames = event.pathNames;
			urlAddressEvent.parameterNames = event.parameterNames;
			urlAddressEvent.parameters = event.parameters;
			if(eventDispatcher != null) eventDispatcher.dispatch(UrlAddressEvent.INIT, urlAddressEvent);	
		}
		
			
	/**
	* Handles when the URL address internally changes.
	*/
		
		private function onUrlAddressInternalChange( event : UrlAddressEvent ) {
			var urlAddressEvent: UrlAddressEvent = new UrlAddressEvent();
			urlAddressEvent.type = event.type;
			urlAddressEvent.target = event.target;
			urlAddressEvent.path = event.path;
			urlAddressEvent.value  = event.value;
			urlAddressEvent.pathNames = event.pathNames;
			urlAddressEvent.parameterNames = event.parameterNames;
			urlAddressEvent.parameters = event.parameters;
			if(internalDispatched && eventDispatcher != null) eventDispatcher.dispatch(UrlAddressEvent.CHANGE, urlAddressEvent);	
		}
		
	/**
	* Handles when the URL address externally changes.
	*/
		
		private function onUrlAddressExternalChange( event : UrlAddressEvent ) {
			var urlAddressEvent: UrlAddressEvent = new UrlAddressEvent();
			urlAddressEvent.type = event.type;
			urlAddressEvent.target = event.target;
			urlAddressEvent.path = event.path;
			urlAddressEvent.value  = event.value;
			urlAddressEvent.pathNames = event.pathNames;
			urlAddressEvent.parameterNames = event.parameterNames;
			urlAddressEvent.parameters = event.parameters;
			if(externalDispatched && eventDispatcher != null) eventDispatcher.dispatch(UrlAddressEvent.CHANGE, urlAddressEvent);	
		}			

		
	
}