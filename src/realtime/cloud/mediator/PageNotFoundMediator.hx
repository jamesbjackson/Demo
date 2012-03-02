package realtime.cloud.mediator;

import realtime.cloud.view.PageNotFoundView;
	
class PageNotFoundMediator extends BaseMediator {
		
		
	@Inject
	public var view : PageNotFoundView;
	
	
	override public function onRegister(){
		setInstanceOfView(view);
		super.onRegister();
	}

	
}
