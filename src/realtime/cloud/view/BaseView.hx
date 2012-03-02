package realtime.cloud.view;

import utils.CommonJS;
import realtime.cloud.Stage;
import xirsys.cube.events.CentralDispatcher;
import realtime.cloud.events.ViewEvent;
import UserAgentContext;
	
class BaseView extends CentralDispatcher<Dynamic>, implements IView  {


	private var stage : Stage;
	private var viewName : String;
	private var htmlDocument : HTMLDocument;
	private static var DEEPLINK : String = ".deeplink";
	
	
	/**
	* @constructor
	*/
		
		public function new( ){
			viewName = "";
			super();
		}
	
	
	/**
	* Handles setting up the view ready for use
	*/
	
		public function init( stage : Stage){
			this.stage = stage;
			htmlDocument = stage.htmlDocument;
		}
	
	
	/**
	* Handles activating the view
	*/
	
		public function activate(){
			CommonJS.addEventListener(DEEPLINK, CommonJS.CLICK_EVENT, onChangeView);
		}
	
	
	/**
	* Handles deactivating the view
	*/
	
		public function deactivate(){
			CommonJS.removeEventListener(DEEPLINK, CommonJS.CLICK_EVENT, onChangeView);
		}
	
	
	/**
	* Handles preforming a transition in of the current view
	*/
	
		public function transitionIn(event : ViewEvent){
			var me = this;
			var innerElement:Element = CommonJS.get(".viewable");
			Firmin.animate(innerElement, { opacity: 1, timingFunction: "ease-out"}, "250ms", function(element){
				me.dispatch( ViewEvent.TRANSITION_IN_COMPLETED, event);
			});
		}
	
	
	/**
	* Handles preforming a transition out of the current view
	*/
	
		public function transitionOut(event : ViewEvent){
			var me = this;
			var innerElement:Element = CommonJS.get(".viewable");
			Firmin.animate(innerElement, { opacity: 0, timingFunction: "ease-out"}, "250ms", function(element){
				me.dispatch( ViewEvent.TRANSITION_OUT_COMPLETED, event);
			});
		}


	/**
	* Handles dispatching a change view request
	*/
	
		public function changeView( path : String, ?parameters : Hash<String>  ) {
			var viewEvent:ViewEvent = new ViewEvent();
			viewEvent.parameters = parameters;
			viewEvent.path = path;
			dispatch(ViewEvent.CHANGE, viewEvent );
		}
		
		
	/**
	* Handles getting the name of the view
	*/
	
		public function getViewName() : String{
			return viewName;
		}
		

	/**
	* Handles telling the application to change to a different view
	*/
	
		private function onChangeView( event : EventTarget ) {
			//trace("onChangeView: " + event.currentTarget.rel);
			CommonJS.stopEventPropergation(event);
			changeView( event.currentTarget.rel );	
		}
		
		
				
		
	
		
}