package realtime.cloud.commands;

import xirsys.cube.mvcs.Command;
import realtime.cloud.model.ViewManager;
import realtime.cloud.events.ViewEvent;

class ChangeViewCommand extends Command {
	
	@Inject
	public var event : ViewEvent;
	
	@Inject
	public var viewManager : ViewManager;
	
	
	override public function execute(){
		var dispatchEvent:ViewEvent = new ViewEvent();
		dispatchEvent.path = viewManager.currentView.path;
		dispatchEvent.parameters = viewManager.currentView.parameters;
		viewManager.currentView = event;
		eventDispatcher.dispatch( ViewEvent.TRANSITION_OUT, dispatchEvent);
	
		
	}
	
	
}
