package realtime.cloud.view;


import realtime.cloud.Stage;
import realtime.cloud.events.ViewEvent;
import realtime.cloud.visualisation.Visualisation;
import UserAgentContext;
import utils.CommonJS;

	
class HomeView extends BaseView, implements IView {
	
	
	public var visualisation:Visualisation;
	public var lastMovementDetected:Float;
	
	
	/**
	* @constructor
	*/
		
		public function new( ){
			super();
			viewName = "HomeView";
			visualisation = new Visualisation();
		}
	

	/**
	* Handles activating the view
	*/
	
		override public function activate() {
			var canvas:HTMLCanvasElement = CommonJS.get(".visualisation canvas");
			visualisation.setCanvas(canvas);
			visualisation.activate();
			visualisation.createCoordinate(230, 105);
			visualisation.createCoordinate(620, 150);
			visualisation.createCoordinate(480, 210);
			visualisation.createCoordinate(800, 260);
			visualisation.createCoordinate(210, 275);
			visualisation.activate();
			super.activate();	
		}
		
		
	/**
	* Handles deactivating the view
	*/
	
		override public function deactivate() {	
			visualisation.deactivate();
			super.deactivate();
		}
		
		
		
	/**
	* Handles preforming a transition in of the current view
	*/
	
		override public function transitionIn(event : ViewEvent){
			var me = this;
			var header:Element = CommonJS.get("header");
			var viewable:Element = CommonJS.get(".viewable");
			var title:Element = CommonJS.get(".title");
			var copy:Element = CommonJS.get(".copy");
			var visualisation:Element = CommonJS.get(".visualisation");		
			var footer:Element = CommonJS.get("footer");
			Firmin.animate(header, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
				Firmin.animate(viewable, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
					Firmin.animate(title, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
						Firmin.animate(copy, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
							Firmin.animate(visualisation, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
								Firmin.animate(footer, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
									me.dispatch( ViewEvent.TRANSITION_IN_COMPLETED, event);	
								});	
							});
						});
					});	
				});
			});		
		}
	
	
	/**
	* Handles preforming a transition out of the current view
	*/
	
		override public function transitionOut(event : ViewEvent){
			dispatch( ViewEvent.TRANSITION_OUT_COMPLETED, event);	
		}	
	
					
}