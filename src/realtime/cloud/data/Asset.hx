package realtime.cloud.data;

import js.w3c.level3.Core;
import utils.http.HttpLoaderRequest;
import utils.http.request.HttpRequest;
import UserAgentContext;
	
	
class Asset{
			
	public var path : String;
	public var view : String;
	public var title : String;
	public var request : HttpLoaderRequest;
	
	/**
	* @constructor
	* @this {Asset}
	*/
		
		public function new() {
			request = new HttpLoaderRequest();
			path = "";
			view = "";
		}
			
			
	/**
		handles allow the override of the loaded content MINE type.
	*/
		
		public function overrideMimeType( contentType : String ){
			request.httpRequest.overrideMimeType( contentType );
		}
		
		
	/**
		Retrieves the response body as a string.
	*/
	
		public function getResponseText() : DOMString {
    		return request.httpRequest.getResponseText();
		}
	
		
	/**
		Retrieves the response body as an XML Document Object Model (DOM) object.
	*/
	
		public function getResponseXML() : Document {
    		return request.httpRequest.getResponseXML();
		}	
					
			
				
}
