package realtime.cloud.mediator;

import realtime.cloud.view.HomeView;
	
class HomeMediator extends BaseMediator {
		
		
	@Inject
	public var view : HomeView;
	
	
	override public function onRegister(){
		setInstanceOfView(view);
		super.onRegister();
	}

	
}
