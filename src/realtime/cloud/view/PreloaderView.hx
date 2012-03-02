package realtime.cloud.view;

import utils.CommonJS;
import realtime.cloud.Stage;
import realtime.cloud.Configuration;
import realtime.cloud.events.LoaderProgressEvent;
import realtime.cloud.events.ViewEvent;
import UserAgentContext;
import haxe.Timer;
import Firmin;


class PreloaderView extends BaseView, implements IView {
	
	private var updateTimer : Timer;
	private var updateFrequency : Int;
	private var percentageDownloaded : Int;
	private var renderedPercentage : Int;

	/**
	* @constructor
	*/
		
		public function new( ){
			super();
			viewName = "PreloaderView"; 
		}
	
	
	/**
	* Handles activating the view
	*/
	
		override public function activate(){
			updateFrequency = 25;
			updateTimer = new Timer(updateFrequency);
			percentageDownloaded = 0;
			renderedPercentage = 0;
			updateTimer.run = renderProgress;
			super.activate();
		}
	
	
	/**
	* Handles deactivating the view
	*/
	
		override public function deactivate(){
			renderProgress();
			updateTimer.run = null;
			updateTimer.stop();
			updateTimer = null;
			super.deactivate();
		}
	
	
	/**
	* Handles preforming a transition in of the current view
	*/
	
		override public function transitionIn(event : ViewEvent){
			dispatch( ViewEvent.TRANSITION_IN_COMPLETED, event);	
		}
	
	
	/**
	* Handles preforming a transition out of the current view
	*/
	
		override public function transitionOut(event : ViewEvent){
			var me = this;
			var title:Element = CommonJS.get("h1");
			var progressInfo:Element = CommonJS.get(".progress-info");	
			var footer:Element = CommonJS.get("footer");
			Firmin.animate(footer, { opacity: 0, timingFunction: "ease-out" }, "250ms", function(element){
				Firmin.animate(progressInfo, { opacity: 0, timingFunction: "ease-out" }, "250ms", function(element){
					Firmin.animate(title, { opacity: 0, timingFunction: "ease-out" }, "250ms", function(element){
						me.dispatch( ViewEvent.TRANSITION_OUT_COMPLETED, event);	
					});	
				});
			});
		}
	

	/**
	* Handles when the progress of the content assets loader has been updated
	*/	

		public function updateProgress( event : LoaderProgressEvent ){	
			percentageDownloaded = Math.round(event.precentage);
		}
		
		
	/**
	* Handles the rendering of the progress of the downloaded assets
	*/	

		private function renderProgress(){	
			if(renderedPercentage <= percentageDownloaded){
				var valueArray = Std.string(renderedPercentage).split("");
				var valueOne : String = valueArray[0];
				var valueTwo : String = valueArray[1];
				if(renderedPercentage >= 99){ valueOne = "9"; valueTwo = "9"; }
				else if(renderedPercentage < 10){ valueOne = "0"; valueTwo = valueArray[0]; }
				var labelValueOne:Element = CommonJS.get(".progress-info .value-one");
				var labelValueTwo:Element = CommonJS.get(".progress-info .value-two");
				labelValueOne.innerHTML= valueOne;
				labelValueTwo.innerHTML= valueTwo;	
				renderedPercentage += 1;
			}
			if(renderedPercentage == 100){
				updateTimer.stop();
				var viewEvent:ViewEvent = new ViewEvent();
				viewEvent.path = Configuration.HOME_VIEW;
				dispatch(ViewEvent.CHANGE, viewEvent );
			}
		}			
		
		

			
}