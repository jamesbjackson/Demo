package realtime.cloud.view;

import utils.CommonJS;
import realtime.cloud.Stage;
import realtime.cloud.events.LoaderProgressEvent;
import realtime.cloud.events.ViewEvent;
import UserAgentContext;
import Firmin;
	
class PageNotFoundView extends BaseView, implements IView {


	/**
	* @constructor
	*/
		
		public function new( ){
			super();
			viewName = "PageNotFoundView";
			
		}
	
	
	/**
	* Handles preforming a transition in of the current view
	*/
	
		override public function transitionIn(event : ViewEvent){
			var me = this;
			var viewable:Element = CommonJS.get(".viewable");	
			var contents:Element = CommonJS.get(".viewable .inner .contents");
			Firmin.animate(viewable, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
				Firmin.animate(contents, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
					me.dispatch( ViewEvent.TRANSITION_IN_COMPLETED, event);
				});
			});	
		}
	
	
	/**
	* Handles preforming a transition out of the current view
	*/
	
		override public function transitionOut(event : ViewEvent){
			var me = this;
			var viewable:Element = CommonJS.get(".viewable");
			var contents:Element = CommonJS.get(".viewable .inner .contents");		
			Firmin.animate(contents, { opacity: 0, timingFunction: "ease-out"}, "250ms", function(element){
				Firmin.animate(viewable, { opacity: 0, timingFunction: "ease-out" }, "250ms", function(element){
					me.dispatch( ViewEvent.TRANSITION_OUT_COMPLETED, event);
				});	
			});
		}
			
}