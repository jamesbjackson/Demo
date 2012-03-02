package realtime.cloud.events;

class ViewEvent implements xirsys.cube.events.IEvent {
	
	public static var CHANGE : String = "ViewEvent_changeView";
	public static var TRANSITION_IN : String = "ViewEvent_transitionIn";
	public static var TRANSITION_OUT : String = "ViewEvent_transitionOut";
	public static var TRANSITION_IN_COMPLETED : String = "ViewEvent_transitionInCompleted";
	public static var TRANSITION_OUT_COMPLETED  : String = "ViewEvent_transitionOutCompleted";

	public var path : String;
	public var parameters : Hash<Dynamic>;
	
	/**
	* Creates an instance of an View Event.
	*
	* @constructor
	* @this {UrlAddressEvent}
	*/
	
		public function new(){
			path = "";
			parameters = new Hash<Dynamic>();
		}
	
	
}
