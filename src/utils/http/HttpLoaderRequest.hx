package utils.http;

import utils.http.request.HttpRequest;

class HttpLoaderRequest {
	
	public var httpRequest : HttpRequest;
	public var url : String; 
	public var method : String;
	public var asynchronous : Bool;
	public var username : String;
	public var password : String;
	
	
	/**
	* Creates an instance of a HttpLoaderRequest.
	*
	* @constructor
	* @this {HttpLoaderRequest}
	*/
	
		public function new(){
			httpRequest =  new HttpRequest(); 
			method = HttpRequest.GET;
			asynchronous = true;
			username = "";
			password = "";
			url = "";
		}

}
