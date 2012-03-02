package realtime.cloud.visualisation;

	
class Rectangle extends Point{
	
	public var width:Int;
	public var height:Int;

	/**
	* Creates an instance of a Rectangle.
	*
	* @constructor
	* @this {Rectangle}
	*/
	
		public function new( ?x : Float= 0, ?y : Float = 0, ?width : Int = 0, ?height : Int = 0){
			super(x, y);
			this.width = width;
			this.height = height;	
		}
	
}