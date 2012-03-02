package utils.http;

import UserAgentContext;

class HttpLoaderCompletedEvent{
	
	public static var COMPLETED : String = "httpLoaderCompleted";
	
	public var requests : Hash<HttpLoaderRequest>;
	public var successful : Hash<HttpLoaderRequest>;
	public var failed : Hash<HttpLoaderRequest>;
	
	public function new( requests : Hash<HttpLoaderRequest>,  successful : Hash<HttpLoaderRequest>, failed : Hash<HttpLoaderRequest>){
		this.requests = requests;
		this.successful = successful;
		this.failed = failed;
	}
	
}
