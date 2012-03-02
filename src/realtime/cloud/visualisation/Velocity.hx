package realtime.cloud.visualisation;

	
class Velocity extends Point{
	
	public var rotation:Float;	
	
	/**
	* Creates an instance of a Velocity.
	*
	* @constructor
	* @this {Velocity}
	*/
	
		public function new( ?x : Float = 0 , ?y : Float = 0, rotation : Float = 0 ){
			super(x, y);
			this.rotation = rotation;
		}
	
}