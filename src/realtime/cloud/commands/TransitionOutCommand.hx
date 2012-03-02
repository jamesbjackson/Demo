package realtime.cloud.commands;

import xirsys.cube.mvcs.Command;
import realtime.cloud.service.UrlAddressService;
import realtime.cloud.model.ViewManager;
import realtime.cloud.events.ViewEvent;

class TransitionOutCommand extends Command {
	
	@Inject
	public var event : ViewEvent;
	
	@Inject
	public var urlAddressService : UrlAddressService;
	
	@Inject
	public var viewManager : ViewManager;
	
	
	override public function execute(){
		urlAddressService.dispatch(viewManager.currentView.path, viewManager.currentView.parameters);
	}
	
	
}
