package utils.http;

import xirsys.cube.events.CentralDispatcher;
import xirsys.cube.events.IEvent;
import utils.http.request.HttpRequest;
import utils.http.request.HttpRequestEvent;

class HttpLoader extends CentralDispatcher<Dynamic>{
		
	private var allRequests : Hash<HttpLoaderRequest>;
	private var successfulRequests : Hash<HttpLoaderRequest>;
	private var failedRequests : Hash<HttpLoaderRequest>;
		
	/**
	* Creates an instance of an  HTTP Loader.
	*
	* @constructor
	* @this {HttpLoader}
	*/
	
		public function new(){
			super();
			allRequests = new Hash<HttpLoaderRequest>();
			successfulRequests = new Hash<HttpLoaderRequest>();
			failedRequests = new Hash<HttpLoaderRequest>();
		}

	/**
	* Handles adding a new url request to the 
	*/
	
		public function addRequest( url : String, method:String = "GET", asynchronous : Bool = true, username:String = "", password:String = "" ) : HttpLoaderRequest{
			var loaderRequest : HttpLoaderRequest = new HttpLoaderRequest();
			loaderRequest.asynchronous = asynchronous;
			loaderRequest.method = method;
			loaderRequest.username = username;
			loaderRequest.password = password;
			loaderRequest.url = url;
			allRequests.set(url, loaderRequest);
			return loaderRequest;
		}	
	

	/**
	* Handles removing queued content which has already been added to the service.
	*/
	
		public function removeRequest( url : String ) {
			var loaderRequest : HttpLoaderRequest = allRequests.get(url);
			loaderRequest.httpRequest.remove( HttpRequestEvent.COMPLETED, onHttpRequestCompleted );
			loaderRequest.httpRequest.remove( HttpRequestEvent.ERROR, onHttpRequestError );
			allRequests.remove(url);
			successfulRequests.remove(url);
			failedRequests.remove(url);
		}
		
	
	/**
	* Handles beginning / openning all the loading requests
	*/
	
		public function beginRequests() {
			for( url in allRequests.keys() ) {
				var loaderRequest : HttpLoaderRequest = allRequests.get(url);
				loaderRequest.httpRequest.addEventHandler( HttpRequestEvent.COMPLETED, onHttpRequestCompleted );
				loaderRequest.httpRequest.addEventHandler( HttpRequestEvent.ERROR, onHttpRequestError );
				loaderRequest.httpRequest.open(loaderRequest.url, loaderRequest.method, loaderRequest.asynchronous, loaderRequest.username, loaderRequest.password);
			}
		}
	
	
	/**
	* Handles check to see if all request have completed each time a request completes
	*/
	
		private function handleRequestCompletion() {
			
			//We setup the required local varibles 
				var loaderRequest : HttpLoaderRequest;
				var precentageLoaded:Float = 0;
				var totalRequests:Int = 0;
				var totalLoaded:Int = 0;
				
			//We then determine if all the loader request have completed and also the percentage loaded	
				for( url in allRequests.keys() ) {
					loaderRequest = allRequests.get(url);
					if(loaderRequest.httpRequest.isComplete() == true ) totalLoaded++;
					totalRequests++;
				}
				
			//We then work out the precentage loaded and fire off a progress event
				precentageLoaded = ( totalLoaded  / totalRequests ) * 100;
				dispatch( HttpLoaderProgressEvent.PROGRESS,  new HttpLoaderProgressEvent(precentageLoaded, totalRequests, totalLoaded) );
				
			//We then determine if all the loadeds	
				if(totalRequests == totalLoaded){
					dispatch( HttpLoaderCompletedEvent.COMPLETED,  new HttpLoaderCompletedEvent(allRequests, successfulRequests, failedRequests) );
				}
		}
	
	
	/**
	* Handles when a HTTP request has completed
	*/	
		
		private function onHttpRequestCompleted( event : Dynamic /*HttpRequestEvent*/ ){
			var url : String = event.httpRequest.getUrl();
			var loaderRequest : HttpLoaderRequest = allRequests.get( url );
			loaderRequest.httpRequest.remove( HttpRequestEvent.COMPLETED, onHttpRequestCompleted );
			loaderRequest.httpRequest.remove( HttpRequestEvent.ERROR, onHttpRequestError );
			successfulRequests.set(url, loaderRequest);
			handleRequestCompletion();
		}


	/**
	* Handles when a HTTP request error occured
	*/	

		private function onHttpRequestError( event : Dynamic /*HttpRequestEvent*/ ){
			var url : String = event.httpRequest.getUrl();
			var loaderRequest : HttpLoaderRequest = allRequests.get( url );
			loaderRequest.httpRequest.remove( HttpRequestEvent.COMPLETED, onHttpRequestCompleted );
			loaderRequest.httpRequest.remove( HttpRequestEvent.ERROR, onHttpRequestError );
			failedRequests.set(url, loaderRequest);	
			handleRequestCompletion();		
		}	
		
	
}