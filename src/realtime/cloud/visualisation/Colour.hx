package realtime.cloud.visualisation;

	
class Colour{
	
	public var red:Int;
	public var green:Int;
	public var blue:Int;	
	public var alpha:Float;	
	
	/**
	* Creates an instance of a Colour.
	*
	* @constructor
	* @this {Colour}
	*/
	
		public function new( ?red:Int = 0, ?green:Int = 0, ?blue:Int = 0, ?alpha:Float = 1 ){
			this.red = red;
			this.green = green;
			this.blue = blue;
			this.alpha = alpha;
		}
	
}