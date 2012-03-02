package realtime.cloud.commands;


import utils.CommonJS;
import xirsys.cube.mvcs.Command;
import realtime.cloud.data.Asset;
import realtime.cloud.model.ViewManager;
import realtime.cloud.service.LoaderService;
import realtime.cloud.service.UrlAddressService;
import realtime.cloud.events.UrlAddressEvent;
import realtime.cloud.events.ViewEvent;
import realtime.cloud.Configuration; 

class UrlChangedCommand extends Command {
	
	@Inject
	public var event : UrlAddressEvent;
	
	@Inject
	public var viewManager : ViewManager;
	
	@Inject
	public var loaderService : LoaderService;

	@Inject
	public var urlAddressService : UrlAddressService;
	
	
	override public function execute(){
		
		//We get a reference to the current asset needing to be loaded
			var asset:Asset = loaderService.getAsset(event.path);
			if(asset == null){ 
				event.parameters.set(Configuration.APP_ADDRESS, event.path);
				asset = loaderService.getAsset(Configuration.NOT_FOUND_VIEW);
				event.path = Configuration.NOT_FOUND_VIEW;
			}
		
		//We handle setting the title and changing content of the new document	
			if(asset.title != null) urlAddressService.setTitle(asset.title);
			if(asset.request != null) CommonJS.changeBodyContent( asset.getResponseText() );
					
		//We then fire a transistion in event
			var viewEvent:ViewEvent = new ViewEvent();
			viewEvent.path = event.path;
			viewEvent.parameters = event.parameters;
			eventDispatcher.dispatch(ViewEvent.TRANSITION_IN, viewEvent );	
			
	}
	
	
}
