package utils.http;

import UserAgentContext;

class HttpLoaderProgressEvent {
	
	public static var PROGRESS : String = "httpLoaderProgress";
	
	public var precentage : Float;
	public var total : Int;
	public var loaded : Int;
	
	public function new( precentage : Float, total : Int, loaded : Int  ){
		this.precentage = precentage;
		this.total = total;
		this.loaded = loaded;
	}
	
}
