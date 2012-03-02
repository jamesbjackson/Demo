package realtime.cloud.mediator;

import realtime.cloud.events.LoaderProgressEvent;
import realtime.cloud.service.LoaderService;
import realtime.cloud.view.PreloaderView;
import realtime.cloud.events.ViewEvent;
	
class PreloaderMediator extends BaseMediator {
			
	@Inject
	public var view : PreloaderView;
	

	/* Handles register events for this mediator when it is first created */
		override public function onRegister(){
			eventDispatcher.addEventHandler( LoaderProgressEvent.PROGRESS, onLoaderProgress );
			setInstanceOfView(view);
			super.onRegister();
		}
		
	/* Handles updating the UI with progress events */
		private function onLoaderProgress( event : LoaderProgressEvent){
			view.updateProgress(event);
		}
	
	
	/* Handles when the transistion in is complete for the view and activites it */
		override private function onTransitionInCompleted( event : ViewEvent ){
			super.onTransitionInCompleted(event);
			loaderService.load();
		}
	
		
}