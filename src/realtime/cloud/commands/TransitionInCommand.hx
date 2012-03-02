package realtime.cloud.commands;

import xirsys.cube.mvcs.Command;
import realtime.cloud.model.ViewManager;
import realtime.cloud.events.ViewEvent;

class TransitionInCommand extends Command {
	
	@Inject
	public var event : ViewEvent;
	
	@Inject
	public var viewManager : ViewManager;
	
	
	override public function execute(){
		viewManager.currentView = event;
	}
	
	
}
