package realtime.cloud.view;

import utils.CommonJS;
import realtime.cloud.Stage;
import realtime.cloud.events.ViewEvent;
import xirsys.cube.abstract.ICentralDispatcher;

interface IView implements ICentralDispatcher<Dynamic>{
	
	public function init( stage:Stage ) : Void;
	public function getViewName() : String;
	public function activate() : Void;
	public function deactivate() : Void;
	public function transitionIn( event:ViewEvent ) : Void;
	public function transitionOut( event:ViewEvent ) : Void;
    
}
