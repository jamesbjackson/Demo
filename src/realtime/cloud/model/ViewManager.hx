package realtime.cloud.model;

import xirsys.cube.mvcs.Actor;
import realtime.cloud.Context;
import realtime.cloud.events.ViewEvent;

import realtime.cloud.view.HomeView;
import realtime.cloud.view.StartupView;
import realtime.cloud.view.PreloaderView;
import realtime.cloud.view.PageNotFoundView;

import realtime.cloud.mediator.HomeMediator;
import realtime.cloud.mediator.StartupMediator;
import realtime.cloud.mediator.PreloaderMediator;
import realtime.cloud.mediator.PageNotFoundMediator;


class ViewManager extends Actor{
	
	private var context : Context;
	public var currentView : ViewEvent;
	private var homeView : HomeView;
	private var startupView : StartupView;
	private var preloaderView : PreloaderView;
	private var pageNotFoundView : PageNotFoundView;

	/**
	* @constructor
	*/
	
		public function new(){
			currentView = new ViewEvent();
			homeView = new HomeView();
			startupView = new StartupView();
			preloaderView = new PreloaderView();
			pageNotFoundView	= new PageNotFoundView();
		}
	
		
	/**
	* Handles configuring the view model.
	* by referencing to the application context and register view with there corrosponding mediators
	*/
	
		public function configure( context : Context ){
			
			//We then store a reference to the context
				this.context = context;
				
			//We then setup the views and mediators	
				this.context.mediatorMap.mapView( PageNotFoundView, PageNotFoundMediator );
				this.context.mediatorMap.mapView( PreloaderView, PreloaderMediator );
				this.context.mediatorMap.mapView( StartupView, StartupMediator );
				this.context.mediatorMap.mapView( HomeView, HomeMediator );
				this.context.mediatorMap.createMediator( pageNotFoundView );
				this.context.mediatorMap.createMediator( preloaderView );
				this.context.mediatorMap.createMediator( startupView );
				this.context.mediatorMap.createMediator( homeView );
				pageNotFoundView.init( context.container);
				preloaderView.init( context.container);
				startupView.init( context.container);	
				homeView.init( context.container);		
		}
		
		
		
		
}