package realtime.cloud.visualisation;

	
class Playhead{
	
	public var positions:Array<PlayheadPosition>;
	public var color:Colour;
	public var index:Int;
	public var size:Float;
	public var length:Int;

	/**
	* Creates an instance of a Playhead.
	*
	* @constructor
	* @this {Playhead}
	*/
	
		public function new( ?index : Int = 0 , ?length : Int = 5,  ?size : Float = 2, ?colour : Colour ){
			
			//We set the properties of this class instance
				this.color = (colour != null) ? colour : new Colour(0, 0, 0, 0.8);
				positions = new Array();
				this.index = index;
				this.length = length;
				this.size = size;
		}
	
	
		public function distanceTo( point : Point):Float{
			var position:PlayheadPosition = this.get();
			var directionX = point.x-  position.x;
			var directionY = point.y - position.y;
			return Math.sqrt( directionX * directionX + directionY * directionY );
		}
	

	/**
	* Handles adding a new position to the playhead
	*/
	
		public function add( position : PlayheadPosition ){
			if(this.positions.length > 0){
				while( this.positions.length > this.length ) {
					this.positions.shift();
				}
			}
			this.positions.push( position );
		}


	/**
	* Handles getting the current position to the playhead
	*/

		public function get() : PlayheadPosition{
			return this.positions[this.positions.length-1];
		}


}