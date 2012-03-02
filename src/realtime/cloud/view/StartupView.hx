package realtime.cloud.view;

import utils.CommonJS;
import realtime.cloud.Stage;
import realtime.cloud.events.ViewEvent;
import UserAgentContext;

using StringTools;
	
class StartupView extends BaseView, implements IView {
	
	private static var SUCCESS : String = "#success";
	private static var ERROR : String = "#error";
	private static var SEARCH : String = "#searchButton";
	private static var BACK : String = "#backButton";
	private static var FORM : String = "#searchForm";
	

	/**
	* @constructor
	*/
		
		public function new( ){
			super();
			viewName = "StartupView"; 
		}

		
	/**
	* Handles preforming a transition in of the current view
	*/
	
		override public function transitionIn(event : ViewEvent){
			var me = this;
			var launch:Element = CommonJS.get("#systemLaunch");
			var startup:Element = CommonJS.get("#systemStartup");
			var inner:Element = CommonJS.get("#systemStartup .inner");
			var footer:Element = CommonJS.get("#systemStartup footer");
			var contents:Element = CommonJS.get("#systemStartup .inner .contents");
			var title:Element = CommonJS.get("#systemStartup h1");
			var progressInfo:Element = CommonJS.get("#systemStartup .progress-info");

			Firmin.animate(launch, { opacity: 0, delay: "500ms", z : 0, timingFunction: "ease-out"}, "250ms", function(element){
				CommonJS.removeElement(launch);
				startup.style.display = "table";
				Firmin.animate(startup, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
					Firmin.animate(inner, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
						Firmin.animate(contents, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
							Firmin.animate(title, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
								Firmin.animate(progressInfo, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
									Firmin.animate(footer, { opacity: 1, timingFunction: "ease-out" }, "250ms", function(element){
										me.dispatch( ViewEvent.TRANSITION_IN_COMPLETED, event);	
									});
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