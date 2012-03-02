package realtime.cloud.events;

import utils.http.HttpLoaderCompletedEvent;

class LoaderCompletedEvent extends HttpLoaderCompletedEvent, implements xirsys.cube.events.IEvent {
	
	public static var COMPLETE : String	= "LoaderCompletedEvent_Complete";
	public static var RENDERED : String	= "LoaderCompletedEvent_Rendered";
	
}
