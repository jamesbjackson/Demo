package realtime.cloud.visualisation;

	
class CoordinatePoint extends Point{
	
	public var particles:Array<Particle>;
	public var position:Point;
	public var reflection:Point;
	public var size:ParticleSize;
	public var scale:Float;
	public var colour: Colour;
	public var dragging:Bool;
	
	
	/**
	* Creates an instance of a Coordinate Point.
	*
	* @constructor
	* @this {Note}
	*/
	
		public function new( ?x : Float = 0 , ?y : Float = 0){
			super(x, y);
			this.position = new Point();
			this.reflection = new Point();
			this.colour = new Colour();
			this.size = new ParticleSize(0, 16);
			this.particles = new Array();
			this.dragging = false;
			this.scale = 1;
		}
	
	
	
	/**
	* Handles disposing of this instance
	*/
	
		public function dispose() {
			this.position = null;
			this.reflection = null;
			this.colour = null;
			this.size = null;
			this.particles = null;
		}


	/**
	* Handles generating a partical trail
	*/
	
		public function generatingParticleTrial( direction : Point ) {
			this.size.current = 12;
			var quantity:Int = 20 + Math.round( Math.random()*20 );
			for( i in 0...quantity ) {
				var particle:Particle = new Particle();
				particle.x = this.x;
				particle.y = this.y;
				var directionX:Float = direction.x - particle.x;
				var directionY:Float = direction.y - particle.y;
				particle.x += directionX * ( 0.6* (i/quantity) );
				particle.y += directionY * ( 0.6 * (i/quantity) );
				var rotationRadius = ( (directionX + directionY) / 500 ) * (i/quantity);
				particle.x += -rotationRadius + Math.random() * ( rotationRadius + rotationRadius);
				particle.y += -rotationRadius + Math.random() * (rotationRadius + rotationRadius);
				particle.velocity.x = directionX / ( 100 + (Math.random() * 500) );
				particle.velocity.y = directionY / ( 100 + (Math.random() * 500) );
				particle.velocity.rotation = -0.1 + Math.random() * 0.2;
				particle.rotationRadius = Math.random() * 12;
				this.particles.push( particle );
			}
		}

	
	
}