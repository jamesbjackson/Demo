package utils.http.request;

import UserAgentContext;

class HttpRequestEvent implements xirsys.cube.events.IEvent {
	
	public static var COMPLETED : String = "httpRequestCompleted";
	public static var ERROR : String = "httpRequestError";
	
	public var httpRequest : HttpRequest;
	
	public function new( httpRequest : HttpRequest ){
		this.httpRequest = httpRequest;
	}
	
}
