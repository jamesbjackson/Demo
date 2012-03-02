package realtime.cloud.visualisation;

	
class Point{
	
	public var x:Float;
	public var y:Float;
	
	
	/**
	* Creates an instance of a Point.
	*
	* @constructor
	* @this {Point}
	*/
	
		public function new( x : Float = 0 , y : Float = 0 ){
			this.x = x;
			this.y = y;
		}
	

	/**
	* Handles cloning this point instance
	*/
	
		public function clone():Point {
			return new Point(x, y);
		}


	/**
	* Handles getting the distance between two different points
	*/
	
		public static function distance( startPoint : Point, endPoint : Point ) {
			var distanceX = endPoint.x - startPoint.x;
			var distanceY = endPoint.y - startPoint.y;
			return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
		}

	
	
}