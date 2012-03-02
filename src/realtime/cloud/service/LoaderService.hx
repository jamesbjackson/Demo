package realtime.cloud.service;

import utils.CommonJS;
import realtime.cloud.Stage;
import xirsys.cube.mvcs.Actor;
import utils.json.JSON;

import realtime.cloud.Context;
import realtime.cloud.data.Asset;
import realtime.cloud.events.LoaderCompletedEvent;
import realtime.cloud.events.LoaderProgressEvent;
import realtime.cloud.events.LoaderInitialisationEvent;

import utils.http.HttpLoader;
import utils.http.HttpLoaderCompletedEvent;
import utils.http.HttpLoaderProgressEvent;
import utils.http.HttpLoaderRequest;
import utils.http.request.HttpRequest;

import js.w3c.level3.Core;
import UserAgentContext;


class LoaderService extends Actor{
	
	private var assetURL : String;
	private var configurationURL : String;
	
	private var assets : Hash<Asset>;
	private var configuration : Hash<String>;
	
	private var configurationLoader : HttpLoader;
	private var systemAssetLoader : HttpLoader;
	private var contentAssetLoader : HttpLoader;
	
	private var stage : Stage;
	private var context : Context;
		
		
	/**
	* @constructor
	* @this {LoaderService}
	*/
	
		public function new(){

			//we create instances of the classes properties
				configuration = new Hash<String>();
				assets = new Hash<Asset>();
				configurationLoader = new HttpLoader();
				systemAssetLoader = new HttpLoader();
				contentAssetLoader = new HttpLoader();
				
			//We then add the event listeners required for the Json loader
				configurationLoader.addEventHandler( HttpLoaderCompletedEvent.COMPLETED, onHttpConfigurationCompleted );
				systemAssetLoader.addEventHandler( HttpLoaderCompletedEvent.COMPLETED, onHttpSystemAssetsCompleted );
			
			//We then add the event listeners required for the content asset loader
				contentAssetLoader.addEventHandler( HttpLoaderCompletedEvent.COMPLETED, onHttpContentAssetsCompleted );
				contentAssetLoader.addEventHandler( HttpLoaderProgressEvent.PROGRESS, onHttpContentAssetsProgress );

		}
	
	
	
	/**
	* Handles configuring the content model by referencing to the application context
	*/
	
		public function configure( context : Context ){
			this.context = context;
			stage = context.container;
		}	
		
		
	/**
	* Handles init the content manager with the cofiguration and content json paths.
	*/
	
		public function init( configurationURL : String ,  assetURL : String){
			
			//We stor the content and configuration url's for later use
				this.configurationURL = configurationURL;
				this.assetURL = assetURL;
			
			//We then add the url's to the corrosponding http loaders
				configurationLoader.addRequest(configurationURL);
				configurationLoader.addRequest(assetURL);

			//Finally we begin loading of the Content and Configuration JSON files	
				configurationLoader.beginRequests();
			
		}	
		
		
	/**
	* Handles loading all the content
	*/
	
		public function load(){
			contentAssetLoader.beginRequests();
			
		}	
		
	
	/**
	* Handles getting a configuration setting
	*/
	
		public function getConfiguration( configurationName : String ) : String{	
			return configuration.get( configurationName );	
		}
		
		
	/**
	* Handles setting a configuration setting
	*/
	
		public function setConfiguration( configurationName : String, configurationValue : String ){	
			configuration.set( configurationName, configurationValue );
		}	
	
		
	/**
	* Determines if the viewable content has been loaded
	*/
	
		public function viewableContentExist( path : String ) : Bool {	
			return (assets.get(path) != null);		
		}
		

	/**
	* Determines if a path asset has been loaded
	*/
	
		public function getAsset( path : String ) : Asset {	
			return assets.get(path);		
		}	
		
		
	/**
	* Determines if a path asset has been loaded
	*/
	
		public function addAsset( path:String, view:String, title:String, mimeType:String, request:HttpLoaderRequest ) {	
			var asset = new Asset(); 
			asset.path =  path;
			asset.view =  view;
			asset.title = title;
			asset.request =  request;				
			if(mimeType != "") asset.overrideMimeType(mimeType); 
			assets.set(path, asset);		
		}				


	/**
	* Handles when a HTTP request has completed for the configuration loader
	*/	
		
		private function onHttpConfigurationCompleted( event : HttpLoaderCompletedEvent ){
			
			//We firstly get the raw JSON
				var assetJSON : String = event.requests.get(assetURL).httpRequest.getResponseText();
				var configurationJSON : String = event.requests.get(configurationURL).httpRequest.getResponseText();
			
			//We then decode the raw JSON into HaXe Objects
				var systemConfigurationObject : Object = JSON.decode( configurationJSON ).config;
				var systemAssetObject : Object = JSON.decode( configurationJSON ).assets;
				var contentAssetObject : Object = JSON.decode( assetJSON ).assets;

			//We then process the system configuration name value pairs and store in the application
				for(config in systemConfigurationObject.iterator() ){  
					configuration.set(config.name, config.value); 
				}
				
			//We then process each of the asset system items to be loaded
				for(systemAsset in systemAssetObject.iterator() ){ 
					var request =  systemAssetLoader.addRequest(systemAsset.url);	
					addAsset(systemAsset.path, systemAsset.view, systemAsset.title, systemAsset.mimeType, request);
				}
				
			//We then process each of the asset content items to be loaded
				for(contentAsset in contentAssetObject.iterator() ){ 
					var request =  contentAssetLoader.addRequest(contentAsset.url);	
					addAsset(contentAsset.path, contentAsset.view, contentAsset.title, contentAsset.mimeType, request);
				}	
			
			//We then start the loading of the content
				systemAssetLoader.beginRequests();
				
		}
		
	
	/**
	* Handles when a HTTP request has completed for the system asset loader
	*/	

		private function onHttpSystemAssetsCompleted( event : HttpLoaderCompletedEvent ){
			var loaderInitialisationEvent:LoaderInitialisationEvent = new LoaderInitialisationEvent();
			eventDispatcher.dispatch(LoaderInitialisationEvent.INITIALISE, loaderInitialisationEvent);
		}
		

	/**
	* Handles when a HTTP request has completed for the content asset loader
	*/	

		private function onHttpContentAssetsCompleted( event : HttpLoaderCompletedEvent ){
			var loaderCompletedEvent = new  LoaderCompletedEvent(event.requests, event.successful, event.failed);
			eventDispatcher.dispatch(LoaderCompletedEvent.COMPLETE, loaderCompletedEvent);
		}

	
	/**
	* Handles when the progress of the content assets loader has been updated
	*/	


		private function onHttpContentAssetsProgress( event : HttpLoaderProgressEvent ){	
			var loaderProgressEvent = new  LoaderProgressEvent(event.precentage, event.total, event.loaded);
			eventDispatcher.dispatch(LoaderProgressEvent.PROGRESS, loaderProgressEvent);
		}	
	
			

}