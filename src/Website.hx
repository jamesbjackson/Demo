package ;

import realtime.cloud.Stage;
import realtime.cloud.Application;
import UserAgentContext;
	
class Website {
	
	private var firstRun : Bool;
	private var stage : Stage;		
	private var application : Application;
	public static var instance : Website;

	/**
	* @constructor 
	* @this {Main}
	*/
			
		public function new() {
			stage = new Stage();
		}
	
	/**
	* Handles a static call to init the entire HaXe application framework
	*/
	
		public static function main() {
			haxe.Log.trace = log;
			Website.instance = new Website();
		}
	
	
	/**
	* Handles a custom logging of traces and errors to the javascript console
	*/	
		public static function log ( v:Dynamic, ?pos : haxe.PosInfos ):Void { 
              var console = Reflect.field( js.Lib.window, "console" ); 
			  console.log( "%s->%s->%s->line(%s) : %o \n", pos.fileName, pos.className, pos.methodName, pos.lineNumber, v ); 
        } 
	
	
	/**
	* Handles starting up the application
	*/	
		
		public static function startApplication() : Void {
			if(instance.firstRun != true){
				instance.firstRun = true;
				instance.application = new Application( instance.stage );
			}
		}
	
}