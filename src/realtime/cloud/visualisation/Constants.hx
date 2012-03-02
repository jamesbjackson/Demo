package realtime.cloud.visualisation;

class Constants {
	  public static var FPS:Int = 30; 
	  public static var PRECENTAGE_TO_REMOVE_PARTICLE:Float = 0.1;
	  public static var PRECENTAGE_TO_MOVE_PARTICLE:Float = 0.9;
	  public static var PIXEL_DISTANCE_FOR_DRAGGING:Int = 40;
	  public static var REFLECTION_HEIGHT:Int = 98;
	  public static var REFLECTION_NODE_ALPHA_START:Float = 0.06;
	  public static var REFLECTION_NODE_ALPHA_END:Float = 0.1;
	  public static var REFLECTION_PLAYHEAD_ALPHA:Float = 0.1;
	  public static var PARTICLES_COLOUR_ALPHA:Float = ( 0.5 + ( Math.random() * 0.5 ) );
	  public static var PARTICLES_ALPHA:Float = 0.9;
	  public static var PLAYHEAD_ALPHA:Float = 0.9;
	  public static var NODE_ALPHA:Float = 0.9;
	  public static var MAX_PARTICLES:Int = 150;
}

typedef Coordinate = {
  	var x:Float;
  	var y:Float;
  	var index:Int;
};