package realtime.cloud.events;

import utils.http.HttpLoaderProgressEvent;

class LoaderProgressEvent extends HttpLoaderProgressEvent, implements xirsys.cube.events.IEvent {
	
	public static var PROGRESS : String	= "progress";
	
}
