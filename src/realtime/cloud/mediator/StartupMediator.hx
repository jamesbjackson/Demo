package realtime.cloud.mediator;

import realtime.cloud.Configuration; 
import realtime.cloud.view.StartupView;
import realtime.cloud.events.ViewEvent;
	
class StartupMediator extends BaseMediator {
	
	/*We create variables which are injected into this instance at runtime */		
		@Inject
		public var view : StartupView;
	
	
	/* Handles register events for this mediator when it is first created */
		override public function onRegister(){
			setInstanceOfView(view);
			super.onRegister();
		}
	
	
	/* Handles when the transistion out is complete for the view and activites it */
		override private function onTransitionInCompleted( event : ViewEvent ){
			super.onTransitionInCompleted(event);
			var configurationURL : String = Configuration.CONFIGURATION_URL;
			var assetURL : String = Configuration.ASSET_URL;
			loaderService.init( configurationURL, assetURL);
		}
	

}