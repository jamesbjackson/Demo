package;


extern class Firmin {

	public static function animate(element:Dynamic, description:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function translate(element:Dynamic, distances:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function translate3d(element:Dynamic, distances:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function translateX(element:Dynamic, distances:Int, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function translateY(element:Dynamic, distances:Int, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function translateZ(element:Dynamic, distances:Int, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	
	public static function scale(element:Dynamic, magnitudes:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
  	public static function scale3d(element:Dynamic, magnitudes:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function scaleX(element:Dynamic, magnitudes:Int, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function scaleY(element:Dynamic, magnitudes:Int, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function scaleZ(element:Dynamic, magnitudes:Int, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	
	public static function rotate(element:Dynamic, angle:String, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function rotate3d(element:Dynamic, description:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function rotateX(element:Dynamic, angle:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function rotateY(element:Dynamic, angle:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function rotateZ(element:Dynamic, angle:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	
	public static function skew(element:Dynamic, angles:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function skewX(element:Dynamic, angle:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function skewY(element:Dynamic, angle:Dynamic, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	
	public static function matrix(element:Dynamic, vector:Array<Float>, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	public static function matrix3d(element:Dynamic, vector:Array<Float>, ?duration:Dynamic, ?callbackFunction:Dynamic->Void) : Firmin;
	
}