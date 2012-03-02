package realtime.cloud.mediator;

import xirsys.cube.mvcs.Mediator;

import realtime.cloud.data.Asset;
import realtime.cloud.model.ViewManager;
import realtime.cloud.service.LoaderService;
import realtime.cloud.service.UrlAddressService;
import realtime.cloud.events.ViewEvent;
import realtime.cloud.view.IView;
	
class BaseMediator extends Mediator {


	/*We create variables which are injected into this instance at runtime */
	
		@Inject
		public var viewManager : ViewManager;
	
		@Inject
		public var loaderService : LoaderService;
	
		@Inject
		public var urlAddressService : UrlAddressService;
	
	
	
	/*We create variables local to this instance of the base mediator */
		private var viewActive : Bool;
		private var instanceOfView : IView;
	
	
	/*This allows us to set the instance of the view used by this base mediator by inherited mediators */
		private function setInstanceOfView( view : IView){
			instanceOfView = view;
		}
		
		
	/*Determines if the view is active or not */
		private function isActive() : Bool {
			return viewActive;
		}	
	
	
	/* Determines if the view url need's to be managed by this mediator */
		private function manageView( path:String ):Bool{
			var asset:Asset = loaderService.getAsset(path);
			//trace("manageView: " + path + " | " + asset.view  + " | " + instanceOfView.getViewName() + " | " + (instanceOfView.getViewName() == asset.view));
			if(asset == null) return false;
			return (instanceOfView.getViewName() == asset.view);
		}  


	/* Handles register events for this base mediator when it is first created */	
		override public function onRegister(){
			
			/*We listen to event from the application layer */
				eventDispatcher.addEventHandler( ViewEvent.TRANSITION_IN, onTransitionIn );
				eventDispatcher.addEventHandler( ViewEvent.TRANSITION_OUT, onTransitionOut );
			
			/* We listen to event from the view directly */
				instanceOfView.addEventHandler( ViewEvent.TRANSITION_IN_COMPLETED, onTransitionInCompleted );
				instanceOfView.addEventHandler( ViewEvent.TRANSITION_OUT_COMPLETED, onTransitionOutCompleted );
				instanceOfView.addEventHandler( ViewEvent.CHANGE, changeView );
			
			/* We set the view by defualt to be inactive and call the super */
				viewActive = false;
				super.onRegister();
			
		}
	

	/* Handles changing between different views internally with the applications */
		private function changeView( event : ViewEvent ){
			eventDispatcher.dispatch( ViewEvent.CHANGE, event);
		}
		

	/* Handles the transistion in animation of the view */
		private function onTransitionIn( event : ViewEvent ){
			if(manageView(event.path) == true){
				//trace("onTransitionIn: " + event.path + " | " +  event.parameters);
				 instanceOfView.transitionIn(event);
			}
		}
		
		
	/* Handles the transistion in animation of the view */
		private function onTransitionOut( event : ViewEvent ){
			if(manageView(event.path) == true){
				//trace("onTransitionOut: " + event.path + " | " +  event.parameters);
				instanceOfView.deactivate();
				instanceOfView.transitionOut(event);
			}
		}	
		

	/* Handles when the transistion in is complete for the view and activites it */
		private function onTransitionInCompleted( event : ViewEvent ){
			eventDispatcher.dispatch( ViewEvent.TRANSITION_IN_COMPLETED, event);
			instanceOfView.activate();
			viewActive = true;
		}
		
	
	/* Handles when the transistion out is complete for the view and activites it */
		private function onTransitionOutCompleted( event : ViewEvent ){
			eventDispatcher.dispatch( ViewEvent.TRANSITION_OUT_COMPLETED, event);
			viewActive = false;
		}
	
}
