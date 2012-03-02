package realtime.cloud.commands;

import xirsys.cube.mvcs.Command; 
import realtime.cloud.events.LoaderInitialisationEvent;
import realtime.cloud.service.UrlAddressService;
import realtime.cloud.events.ViewEvent;
import realtime.cloud.Configuration; 

class InitialiseLoaderCommand extends Command {
	
	@Inject
	public var event : LoaderInitialisationEvent;
	
	@Inject
	public var urlAddressService : UrlAddressService;
	
	
	override public function execute(){
		var viewEvent:ViewEvent = new ViewEvent();
		viewEvent.path = Configuration.PRELOAD_VIEW;
		eventDispatcher.dispatch(ViewEvent.CHANGE, viewEvent );	
	}
		
}
