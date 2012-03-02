package realtime.cloud.events;

class UrlAddressEvent implements xirsys.cube.events.IEvent {
	
	public static var INIT : String = "init";
	public static var CHANGE : String = "change";
	public static var INTERNAL_CHANGE : String = "internalChange";
	public static var EXTERNAL_CHANGE : String = "externalChange";

	public var type : String;
	public var target : String;
	public var value : String;
	public var path : String;
	public var pathNames : Array<String>;
	public var parameters : Hash<Dynamic>;
	public var parameterNames : Array<String>;
	
	
	/**
	* Creates an instance of an URL Address Event.
	*
	* @constructor
	* @this {UrlAddressEvent}
	*/
	
		public function new(){
			type = "";
			target = "";
			path = "";
			value  = "";
			pathNames = new Array<String>();
			parameterNames = new Array<String>();
			parameters = new Hash<Dynamic>();
		}
	
	
}
