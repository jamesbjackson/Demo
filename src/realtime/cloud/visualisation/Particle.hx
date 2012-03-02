package realtime.cloud.visualisation;

	
class Particle extends Point{
	
	public var velocity:Velocity;
	public var rotation:Float;
	public var rotationRadius:Float;
	
	
	/**
	* Creates an instance of a Particle.
	*
	* @constructor
	* @this {Particle}
	*/
	
		public function new( ?x : Float = 0 , ?y : Float = 0 ){
			super(x, y);
			velocity = new Velocity();
			rotationRadius = 0;
			rotation = 0;
		}
	
}