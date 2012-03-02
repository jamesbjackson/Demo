package realtime.cloud;

import realtime.cloud.Stage;
import realtime.cloud.Context;
import xirsys.cube.events.AgentEvent;
import xirsys.cube.events.IEvent;
import UserAgentContext;
	
class Application{
			
	public var stage : Stage;
	public var context : Context;
	
	/**
	* @constructor
	* @this {Application}
	* @param {Stage} stage The container which the application will be assoicated with.
	*/
		
		public function new( stage : Stage ) {
			this.stage = stage;
			context = new Context( this.stage, false );
			context.addEventHandler( AgentEvent.STARTUP_COMPLETE, handleStartup );
			context.initiate();
		}


	/**
	* Handles dealing when the agent ("context") has started up
	*/	

		private function handleStartup( evt : IEvent ) : Void {
			context.handleStartup(evt);
		}		
}
