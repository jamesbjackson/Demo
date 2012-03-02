package realtime.cloud;

class Configuration {
		
	//-----------------------------------------------------------------------------------
	//APPLICATION CONSTANTS
	//-----------------------------------------------------------------------------------	
		
		//Common application configuration		
			public static var CONFIGURATION_URL : String = "data/config.json";
			public static var ASSET_URL : String = "data/assets.json";
	
		//Common application properties	
			public static var COMMAND : String = "command";
			public static var PAYLOAD : String = "payload";
			public static var APP_ADDRESS : String = "appAddress";
		
		
	//-----------------------------------------------------------------------------------
	//VIEW REFERENCE CONSTANTS
	//-----------------------------------------------------------------------------------
	
		public static var STARTUP_VIEW : String = "/~/";
		public static var PRELOAD_VIEW : String = "/preloader/";
		public static var NOT_FOUND_VIEW : String = "/not_found/";	
		public static var HOME_VIEW : String = "/content/home/";
}
