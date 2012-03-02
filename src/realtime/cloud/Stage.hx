package realtime.cloud;

import js.w3c.level3.Core;
import UserAgentContext;

class Stage{
			
	public var document : Document;
	public var htmlDocument : HTMLDocument;
	public var window : Window; 

	/**
	* Creates refences to the current container and window.
	*
	* @constructor
	* @this {Stage}
	*/
		
		public function new() {
			htmlDocument =  untyped __js__("document");
			document =  untyped __js__("document");
			window =  untyped __js__("window");
		}
				
}
