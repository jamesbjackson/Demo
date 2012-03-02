package realtime.cloud.visualisation;

	
class ParticleSize{
	
	public var current:Float;
	public var target:Float;
	
	/**
	* Creates an instance of a ParticleSize.
	*
	* @constructor
	* @this {ParticleSize}
	*/
	
		public function new( ?current:Float = 0, ?target:Float = 0){
			this.current = current;
			this.target = target;
		}
	
}