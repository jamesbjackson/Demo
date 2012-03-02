package realtime.cloud;

import xirsys.cube.core.Agent;
import xirsys.cube.events.IEvent;
import xirsys.cube.events.AgentEvent;
import realtime.cloud.Configuration;
import realtime.cloud.Stage;

import realtime.cloud.model.ViewManager;
import realtime.cloud.service.LoaderService;
import realtime.cloud.service.UrlAddressService;

import realtime.cloud.commands.ChangeViewCommand;
import realtime.cloud.commands.UrlChangedCommand;
import realtime.cloud.commands.TransitionInCommand;
import realtime.cloud.commands.TransitionOutCommand;
import realtime.cloud.commands.InitialiseLoaderCommand;

import realtime.cloud.events.ViewEvent;
import realtime.cloud.events.UrlAddressEvent;
import realtime.cloud.events.LoaderCompletedEvent;
import realtime.cloud.events.LoaderInitialisationEvent;


class Context extends Agent<Dynamic,IEvent> {
	
	public var urlAddressService : UrlAddressService;
	public var loaderService : LoaderService;
	public var viewManager : ViewManager; 
	
	
	/**
	* @constructor
	* @this {Context}
	* @param {Dynamic} container The container which the context will be assoicated with.
	* @param {Bool} autoStart Automaticly start the context when constructed.
	*/

		public function new( stage : Stage, autoStart : Bool ){
			viewManager = new ViewManager();
			urlAddressService = new UrlAddressService();
			loaderService = new LoaderService();
			super( stage, autoStart );
		}


	/**
	* Handles with the context is firstly initated and is used to setup all the injector rules.
	*
	* @override
	* @this {Context}
	*/

		override public function initiate(){
			
			//We setup the view model
				injector.mapInstance( ViewManager, viewManager);
				viewManager.eventDispatcher = eventDispatcher;
				
			//We setup the content manager model
				injector.mapInstance( LoaderService, loaderService);
				loaderService.eventDispatcher = eventDispatcher; 
				
			//We then setup the URL address service
				injector.mapInstance( UrlAddressService, urlAddressService);
				urlAddressService.eventDispatcher = eventDispatcher;
					
			//We then setup all the required view events required	
				commandMap.mapEvent( ViewEvent.CHANGE, ChangeViewCommand, ViewEvent );
				commandMap.mapEvent( UrlAddressEvent.CHANGE, UrlChangedCommand, UrlAddressEvent );
				commandMap.mapEvent( ViewEvent.TRANSITION_IN_COMPLETED, TransitionInCommand, ViewEvent );
				commandMap.mapEvent( ViewEvent.TRANSITION_OUT_COMPLETED, TransitionOutCommand, ViewEvent );
				
			//We setup the loader events required by the application
				commandMap.mapEvent( LoaderInitialisationEvent.INITIALISE, InitialiseLoaderCommand, LoaderInitialisationEvent );	

			//We then configure the models and services
				viewManager.configure(this);
				loaderService.configure(this);	
				
			//We then manually add the Startup view asset as it is the base HTML document which is used to load this web application
				loaderService.addAsset("/~/", "StartupView", "Realtime Cloud", "", null);	
				
			//We finally dispatch that the startup of the application has been completed
				dispatch( AgentEvent.STARTUP_COMPLETE, null );
		}
		
		
	/**
	* Handles dealing when the agent ("context") has started up
	*/	
		
		public function handleStartup( evt : IEvent ) : Void {
			urlAddressService.setHistory(false);
			urlAddressService.enableInternalDispatching(false);
			urlAddressService.enableExternalDispatching(false);
			urlAddressService.setValue(Configuration.STARTUP_VIEW);		 	
		}
		
}