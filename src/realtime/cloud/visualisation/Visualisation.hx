package realtime.cloud.visualisation;

import realtime.cloud.visualisation.Constants;
import UserAgentContext;
import haxe.Timer;

class Visualisation {
	
	private var locations:Array<CoordinatePoint>;
	private var context:CanvasRenderingContext2D;
	private var canvas:HTMLCanvasElement;
	private var canvasRect:Rectangle;
	private var playhead:Playhead;
	private var isDragging:Bool;
	public var isMouseDown:Bool;
	private var map:Rectangle;
	private var mouseX:Float;
	private var mouseY:Float;
	public var timer:Timer;
	private var fps:Int;
	
		
	/**
	* Creates an instance of an visualisation.
	*
	* @constructor
	* @this {Visualisation}
	* @param {Dynamic} canvas The HTML5 Canvas element which this instrument will be assoicated with.
	* @param {Bool} context the context of the HTML5 Canvas element.
	* @param {Int} playheadSpeed the fps at which the playhead moves.
	*/
	
		public function new(){
			this.map = new Rectangle();
			this.canvasRect = new Rectangle();
			this.playhead = new Playhead();
			this.isDragging = false;
			locations = new Array();
			this.fps = 5;	
		}
	
	
	/**
	* Handles activating the visualisation
	*/
	
		public function activate() {
			timer = new Timer( Math.round( 1000 / Constants.FPS) );
			timer.run = render;
		}
		
		
	/**
	* Handles deactivating the visualisation
	*/
	
		public function deactivate() {
			timer.stop();
			timer.run = null;	
		}
		
		
	/**
	* Handles activating the visualisation
	*/
	
		public function setCanvas( canvas:HTMLCanvasElement ) {
			this.canvas = canvas;
			this.context = canvas.getContext("2d");
			canvasRect = new Rectangle(0, 0, 960, 410);
			map = new Rectangle(0, 0, 960, 410);
		}
		
		
	/**
	* Handles setting the fps at whic the visualisation
	*/
	
		public function setSpeed( ?fps:Int = 5 ) {
			this.fps = fps;	
		}	
	
	

	/**
	* Handles when we have get a update message from the pulsar service
	*/
	
		public function updateCoordinate( index : Int = 0,  x : Float = 0, y : Float = 0 ) {
				locations[ index ].x = x; 
				locations[ index ].x = y;
		}	
		
	
	/**
	* Handles creating a new coordinate for this instrument
	*/
	
		public function createCoordinate( ?x : Float = 0, ?y : Float = 0 ) {
			var node = new CoordinatePoint();
			node.x = x;
			node.y = y;
			if(locations.length == 0) playhead.add(new PlayheadPosition(node.x, node.y, node.x, node.y, 1 ) );	
			locations.push( node );	
		}
	
		
	/**
	* Handles getting the visualisation coordinates
	*/
	
		public function getCoordinates() : Dynamic{
			var coordinates:Array<Coordinate> = new Array();
			for( i in 0...locations.length ) {
				var node:CoordinatePoint = locations[i];
				coordinates.push({x: node.x, y: node.y, index:i});
			}
			 return { coordinates: coordinates, userID:""};
		}	


	/**
	* Handles rendering the visualisation.
	*/
	
		private function render() {
			
			//We clear the context ready to be drawn again
				context.clearRect(canvasRect.x, canvasRect.y, canvasRect.width, canvasRect.height);
			
			///We create local variables
				var radialGradient:Dynamic = context.createRadialGradient(0, 0, 0, 0, 0, 0);
				var particle:Particle = new Particle();
				var locationsLength :Int = locations.length;
				var colour:Colour = new Colour();
				var deadCoordinatePoints:Array<Int> = new Array();
				var moveToX:Float;
				var moveToY:Float;
				var bezierCPX:Float;
				var bezierCPY:Float;
				var bezierX:Float;
				var bezierY:Float;

			//We then loop through all the keys and stop it being told it is being dragged
				for( i in 0...locationsLength ) {	

					//We then create a reference to the current node
						var node:CoordinatePoint = locations[i];
						
					// We then check to see there are any particles which are needing to process for this node
						if( node.particles.length > 0 ) {
							
							//We handle update the update the postion, velocity and drawing it onto the HTML5 Canvas
								for( p in 0...node.particles.length ) {
									
									//We then create a reference to the current particle in the current node
										var particle:Particle = node.particles[p];
										
									
									//We then have a percentage chance of update the current position of a particle
										if( Math.random() < Constants.PRECENTAGE_TO_MOVE_PARTICLE ){
									
											//We then handle updating the particle's velocity
												particle.rotation += particle.velocity.rotation;
												particle.x += particle.velocity.x;
												particle.y += particle.velocity.y;
												particle.velocity.x *= 0.98;
												particle.velocity.y *= 0.98;
								
											//We now display this movement on the HTML 5 canvas
												context.beginPath();
												var particleX:Float = particle.x + Math.cos( particle.rotation ) * particle.rotationRadius;
												var particleY:Float = particle.y + Math.sin( particle.rotation ) * particle.rotationRadius;
												context.fillStyle = 'rgba(' + node.colour.red + ',' + node.colour.green + ',' + node.colour.blue + ',' + Constants.PARTICLES_COLOUR_ALPHA + ')';
												context.arc(particleX, particleY, Math.max( (1 * node.scale), Constants.PARTICLES_ALPHA), 0, Math.PI*2, true);
												context.fill();
										}
								}
					
							//We then handle removing particles so they slowly die off
								if( Math.random() < Constants.PRECENTAGE_TO_REMOVE_PARTICLE ) { 
									node.particles.shift(); 
								}
						
							//We also make sure that we only have a maximum number particles for a given node
								while( node.particles.length > Constants.MAX_PARTICLES) { 
									node.particles.shift();
								}
					
							//We reset the fill colour to fix issues casued with bugs in the rendering to the HTML5 Canvas
								context.fillStyle = "#ffffff";
						}
				
					//We then handle setting the scale of the node dependent on it's position and it relation to the map 
						node.scale = 0;
						node.scale += Math.max( Math.min( ( node.y / ( map.y + map.height ) ) , 1 ) , 0 );
						node.scale = Math.max( node.scale , 0.2 );
				
					//Next we handle updating the reflection for the node on the canvas
						node.reflection.x = node.x;
						node.reflection.y = Math.max( node.y + ( Constants.REFLECTION_HEIGHT - (Constants.REFLECTION_HEIGHT * node.scale ) ), Constants.REFLECTION_HEIGHT );
						var reflectionScale:Float = 1 - Math.max( ( (node.y - Constants.REFLECTION_HEIGHT) / (canvasRect.height - Constants.REFLECTION_HEIGHT) ), 0 );
						var reflectionWidth:Float = map.x * reflectionScale;
					
					//We then determine the xScale of the CoordinatePoint in the 3D canvas space		
						var xScale:Float = 0;
						if( node.x < reflectionWidth ) {
							xScale = 1 - ( node.x / reflectionWidth );
							node.scale += xScale;
							node.reflection.y += ( canvasRect.height - node.y ) * reflectionWidth * xScale;
						}else if( node.x > canvasRect.width - reflectionWidth ) {
							xScale = ( node.x - canvasRect.width + reflectionWidth ) / ( canvasRect.width - canvasRect.width + reflectionWidth );
							node.scale += xScale;
							node.reflection.y += ( canvasRect.height - node.y) * node.scale * xScale;
						}
				
					//We handle working the required size and position of the reflection
						node.scale = Math.min( Math.max( node.scale, 0 ), 1 );
						reflectionScale = 1 - Math.max( ( (node.reflection.y - Constants.REFLECTION_HEIGHT) / (canvasRect.height - Constants.REFLECTION_HEIGHT) ) , 0 );
						reflectionWidth = map.x * reflectionScale;
						node.reflection.x = Math.max( Math.min( node.reflection.x, canvasRect.width - reflectionWidth ), reflectionWidth );
				
					//We create a radial gradient for the inner node reflection
						radialGradient = context.createRadialGradient( node.x, node.y, 0, node.x, node.y, node.size.current );
						radialGradient.addColorStop(0,'rgba(' + node.colour.red + ',' + node.colour.green + ',' + node.colour.blue +',' + node.colour.alpha + ')' );
						radialGradient.addColorStop(1,'rgba(' + node.colour.red + ',' + node.colour.green + ',' + node.colour.blue + ',' + ( node.colour.alpha * Constants.NODE_ALPHA ) + ')' );
				
					// We update the current size of the node and sync the color of the node with the current position
						node.size.current += ( node.size.target - node.size.current ) * 0.2;
						var worldCenterX:Float = (canvasRect.width / 2);
						node.colour.red = 1;
						node.colour.green = 1;
						node.colour.blue = 1;
				}


			//We then remove all the dead keys from the locations
				while (deadCoordinatePoints.length > 0) { locations.splice( deadCoordinatePoints.pop(), 1 ); }
			
			//The playhead can only be render if there are least to locations to be played otherwise it will just be pining
				if( locations.length > 1 ) {

					//We check that the index is with the bounds of the locations and then select the current playhead attractor
						if( playhead.index > locations.length - 1 ) { playhead.index = 0; }
						var attractor:CoordinatePoint = locations[playhead.index];
						playhead.color = attractor.colour;
					
					// Increment index by one but make sure its within bounds
						if( (attractor.x < 0) || (attractor.x > canvasRect.width) || (attractor.y < 0) || (attractor.y > canvasRect.height) ) {
							playhead.index = (playhead.index + 1 > locations.length - 1) ? 1 : playhead.index + 1;
						}
					
					//We then get the last position and create a new position based on it settings and add it back to the playhead
						var lastPlayheadPosition:PlayheadPosition = playhead.get();
						var playheadPosition:PlayheadPosition = new PlayheadPosition();
						
						playheadPosition.x = lastPlayheadPosition.x;
						playheadPosition.y = lastPlayheadPosition.y;
						playheadPosition.reflectionX = lastPlayheadPosition.reflectionX;
						playheadPosition.reflectionY = lastPlayheadPosition.reflectionY;
						playheadPosition.scale = lastPlayheadPosition.scale;
						
						playheadPosition.x += ( attractor.x - lastPlayheadPosition.x ) * fps / 12;
						playheadPosition.y += ( attractor.y - lastPlayheadPosition.y ) * fps / 12;
						playheadPosition.reflectionX += ( attractor.reflection.x - lastPlayheadPosition.reflectionX ) * fps / 12;
						playheadPosition.reflectionY += ( attractor.reflection.y - lastPlayheadPosition.reflectionY ) * fps / 12;
						playhead.add( playheadPosition );
							

					//We then check the distance and only increment the index by one but make sure its within bounds
						if( playhead.distanceTo( attractor ) < Math.min( attractor.size.current * attractor.scale, 5 ) ) {
							
							//We only increment the index, inherit color from the attractor and emit any extra effects at collision
								playhead.color = attractor.colour;
								playhead.index = playhead.index + 1 > locations.length - 1 ? 0 : playhead.index + 1;
								attractor.generatingParticleTrial( locations[playhead.index] ); 
							
							// Determine the signal of this sound depending on position and play the cord representing the the cell of the attractor is in
								var signal:Point = new Point( (attractor.x / canvasRect.width) , (attractor.y / canvasRect.height) ); 
								signal.x = Math.max( Math.min( signal.x, 1 ), 0 ); 
								signal.y = Math.max( Math.min( signal.y, 1 ), 0 );
						}
					
					
					//We then set the current position and new position of the playhead	
						var currentPosition:PlayheadPosition = playhead.positions[ 0 ];
						var newPosition:PlayheadPosition = playhead.positions[ 1 ];
						
		
				} 

		}
	
	
}