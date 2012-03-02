package utils.http.request;

import js.w3c.level3.Core.Document;
import xirsys.cube.events.CentralDispatcher;
import xirsys.cube.events.IEvent;
import UserAgentContext;
	
	
class HttpRequest extends CentralDispatcher<IEvent> {
	
	public static var GET:String = "GET"; 				//Request URI (Defined in HTTP & WebDAV)
	public static var POST:String = "POST"; 			//Send data to server (Defined in HTTP & WebDAV)
	public static var PUT:String = "PUT"; 				//Store data for URI (Defined in HTTP & WebDAV)
	public static var OPTIONS:String = "OPTIONS"; 		//Request URI Options (Defined in HTTP & WebDAV)
	public static var DELETE:String = "DELETE"; 		//Delete data for URI (Defined in HTTP & WebDAV)

	public static var MOVE:String = "MOVE"; 			//Move URI to to new location (Defined in WebDAV)
	public static var PROPFIND:String = "PROPFIND"; 	//Request URI Properties (Defined in WebDAV)
	public static var PROPPATCH:String = "PROPPATCH"; 	//Update or Delete URI Properties (Defined in WebDAV)
	public static var MKCOL:String = "MKCOL"; 			//Create collection at URI (Defined in WebDAV)
	public static var COPY:String = "COPY"; 			//Create copy of URI (Defined in WebDAV)
	public static var LOCK:String = "DELETE"; 			//Create Lock (Defined in WebDAV)
	public static var UNLOCK:String = "DELETE"; 		//Remove Lock (Defined in WebDAV)
	
	
	public static var UNSENT:Int = 0; 					//The object has been constructed.
	public static var OPENED:Int = 1; 					//The open() method has been successfully invoked. During this state request headers can be set using setRequestHeader() and the request can be made using the send() method. 
	public static var HEADERS_RECEIVED:Int = 2; 		//All redirects (if any) have been followed and all HTTP headers of the final response have been received. Several response members of the object are now available. 
	public static var LOADING:Int = 3; 					//The response entity body is being received.
	public static var DONE:Int = 4; 					//The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects). .  


	private var request:XMLHttpRequest;	
	private var operationComplete:Bool;
	private var url:String;
	
	
	/**
	* Creates an instance of a HTTPRequest.
	*
	* @constructor
	* @this {HttpRequest}
	*/
	
		public function new(){
			request =  createXMLHttpRequest();
			request.onreadystatechange = onReadyStateChange; 
			operationComplete = false;
			url = "";
			super();
		}
	
	
	/**
	* Handle creating the correct instance of the HTTP Request.
	*/
	
		public function createXMLHttpRequest() : XMLHttpRequest {
			try { return new XMLHttpRequest(); }catch(e:Dynamic)
    		try { return untyped __js__("new ActiveXObject('Msxml2.XMLHTTP.6.0')"); } catch(e:Dynamic){}
    		try { return untyped __js__("new ActiveXObject('Msxml2.XMLHTTP.3.0')"); } catch(e:Dynamic){}
    		try { return untyped __js__("new ActiveXObject('Microsoft.XMLHTTP')"); } catch(e:Dynamic){}	
		    throw "This browser does not support XMLHttpRequest.";
		}
	
	
	/**
	* Return's the current open URL used bt the HTTP Request.
	*/
	
		public function getUrl() : String {
    		return url;
		}
	
	
	/**
	* Return's if the current operation has completed.
	*/
	
		public function isComplete() : Bool {
    		return operationComplete;
		}
	
	
	/**
		Retrieves the HTTP status code of the request. see W3C for more details
		(http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html)
	
		2xx - Successful
		These codes are used when a request has been successfully processed. For example, 
		the value 200 is used when the requested resource is being returned to the HTTP client 
		in the body of the response message.

		3xx - Redirection
		Codes starting with a '3' indicate that the request was processed, but the browser 
		should get the resource from another location. Some examples are:

			302 - 	The requested resource has been temporarily moved and the browser should 
					issue a request to the URL supplied in the Location response header.

			304 -	The requested resource has not been modified and the browser should read 
					from its local cache instead. The Content-Length header will be zero or 
					absent because content is never returned with a 304 response.

 	 
 	 	4xx - Client Error
		The server returns these codes when they is a problem with the client's request. 
		Here are some examples:

			401 - 	Anonymous clients are not authorized to view the requested content and 
					must provide authentication information in the WWW-Authenticate request 
					header. 

			404 - 	The requested resource does not exist on the server

		
		5xx - Server Error
		A status code starting with the digit 5 indicates that an error occurred on the 
		server while processing the request. For example:

			500 - 	An internal error occurred on the server. This may be because of an 
					application error or configuration problem

			503 - 	The service is currently unavailable, perhaps because of essential 
					maintenance or overloading
	*/
	
	
		public function getStatus() : UnsignedShort {
    		return request.status;
		}
	
	
	/**
		Retrieves the friendly HTTP status of the request.
	*/
	
		public function getStatusText() : DOMString {
    		return request.statusText;
		}
	
		
	/**
		handles allow the override of the loaded content MINE type.
	*/
		
		public function overrideMimeType( contentType : String ){
			if(request.overrideMimeType != null){
				request.overrideMimeType( contentType );
			}
		}
		
		
	/**
		Retrieves the response body as a string.
	*/
	
		public function getResponseText() : DOMString {
    		return request.responseText;
		}	
		
		
	/**
		Retrieves the response body as an XML Document Object Model (DOM) object.
	*/
	
		public function getResponseXML() : Document {
    		return request.responseXML;
		}		
		
			
	/**
		Adds custom HTTP headers to the request.
		Refer to RFC2616, Section 14: Header Field Definitions (http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html) 
		for a general list of standard headers. The server is ultimately responsible for 
		honoring the headers of the request.By far the most common request header is 
		Content-Type, which is required by some XML Web services.
		
		HeaderName	 	Required. String that specifies the header name.
		HeaderValue	 	Required. String that specifies the header value.
	*/
	
		public function setResponseHeader( headerName : String,  headerValue : String ){
    		request.setRequestHeader(headerName, headerValue);
		}
	
	
	
	/**
		Returns the specified response header.
		HeaderName		 Required. String that specifies the response header name.
	 */
	
		public function getResponseHeader( headerName : String ):String{
    		return request.getResponseHeader(headerName);
		}
	
	
	
	/**
		Returns the complete list of response headers.
		Each name/value pair is delimited by a carriage return/line feed (CR/LF) sequence.
	 */
	
		public function getAllResponseHeaders():String{
    		return request.getAllResponseHeaders();
		}
	
	
	/**
		The abort method interrupts an asynchronous operation in progress. (Pass true to 
		the Asynchronous parameter of open to create an asynchronous request.) Calling abort 
		resets the object; the onreadystatechange event handler is removed, and readyState is 
	    changed to 0 (uninitialized).
	 */
	
		public function abort(){
    		request.abort();
		}
		
		
		
	/**
		Handles sending an HTTP request to the server and receives a response.
	 	
	 	Url	 			Required. String that specifies either the absolute or a relative URL of 
	 					the XML data or server-side XML Web services.
	 			
	 	Method	 		Required. String that specifies the HTTP method used to open the connection: 
	 					such as GET, POST, or HEAD. This parameter is not case-sensitive.
	 					
	 	Asynchronous	Optional. Variant that specifies true for asynchronous operation (the call 
	 					returns immediately), or false for synchronous operation. If true, assign a 
	 					callback handler to the onreadystatechange property to determine when the call 
	 					has completed. If not specified, the default is true. Performance Note   
	 					
	 					When Asynchronous is set to false, send operations are synchronous, and the brower
	 					does not accept input or produce output while send operations are in progress. 
	 					Therefore, this setting should not be used in situations where it is possible for 
	 					a user to be waiting on the send operation to complete.
	 					
	 	Username	 	Optional. Variant that specifies the name of the user for authentication. 
	 					If this parameter is null ("") or missing and the site requires authentication, 
	 					the component displays a logon window.
	 					
	 	Password	 	Optional. Variant that specifies the password for authentication. This parameter 
	 					is ignored if the user parameter is null ("") or missing. 
	 */
	
	
		public function open(url:String, method:String = "GET", asynchronous : Bool = true, username:String = "", password:String = ""){
				this.url = url;
				operationComplete = false;
				request.open(method, url, asynchronous, username, password);
				request.send();
		}


  	/**
		Sends an HTTP request to the server and receives a response. 
		This method is synchronous or asynchronous, depending on the value of the varAsync parameter in 
		the open method call. If synchronous, this call does not return until the entire response is 
		received or the protocol stack time out period expires. If asynchronous, this call returns 
		immediately. This optional messageBody parameter may be a String, array of unsigned bytes, 
		or an XML Document Object Model (DOM) object

		messageBody	 Optional. Variant that specifies the body of the message being sent with the request. 	
	 */
	
		public function send( messageBody ){
    		if(messageBody == null) request.send();
    		request.send( messageBody );
		}
		
	
	/**
		Sets or retrieves the event handler for asynchronous requests.	
	 */
	
		private function onReadyStateChange( event : Event ){
			if (request.readyState == HttpRequest.DONE){
				if(request.status == 200){
					operationComplete = true;
					dispatch(HttpRequestEvent.COMPLETED,  new HttpRequestEvent(this) );
    			}else{
    				operationComplete = true;
					dispatch(HttpRequestEvent.ERROR,  new HttpRequestEvent(this) );
				}
			}	
		}

}