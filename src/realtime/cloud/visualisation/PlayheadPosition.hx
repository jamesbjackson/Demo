package realtime.cloud.visualisation;

	
class PlayheadPosition extends Point{
	
	public var scale:Float;
	public var reflectionX:Float;
	public var reflectionY:Float;

	/**
	* Creates an instance of a PlayheadPosition.
	*
	* @constructor
	* @this {PlayheadPosition}
	*/
	
		public function new( ?x : Float= 0, ?y : Float = 0, ?reflectionX : Float = 0, ?reflectionY : Float = 0, ?scale : Float= 1 ){
			super(x, y);
			this.reflectionX = reflectionX;
			this.reflectionX = reflectionY;
			this.scale = scale;
			
		}
	
}