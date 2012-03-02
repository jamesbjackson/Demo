package utils;

import js.w3c.level3.Core;
import UserAgentContext;
using StringTools;

class CommonJS {
	
	
	//Events Types
		public static var SUBMIT_EVENT:String = "submit";
		public static var CLICK_EVENT:String = "click";
	
	/**
	* Handles getting the value of css pixel property as a int
	*/
	
		private function getCSSPositionAsInt( value : String ) : Int{
			return Std.parseInt( StringTools.replace(value, "px", "") );
		}
	
	
	//Gets an element from the HTML document body
		public static function getDocument() : Document{
			var document : Document =  untyped __js__("document");
			return document;
		}	
		
		
	//Gets an element from the HTML document body
		public static function getHtmlDocument() : HTMLDocument{
			var htmlDocument : HTMLDocument =  untyped __js__("document");
			return htmlDocument;
		}	
		
		//Gets an element from the HTML document body
		public static function removeElement( element : Element) {
			if (element.parentNode !=null && element.parentNode.removeChild !=null) {
				element.parentNode.removeChild(element);
			}	
		}
		
	//Stop's the event propergation and defualt action
		public static function stopEventPropergation( event : Dynamic ){
			if(event.stopPropagation != null) event.stopPropagation(); 
			else if( event.cancelBubble != null) event.cancelBubble = true;
	    	if (event.preventDefault != null) event.preventDefault();
	    	else if( event.returnValue != null) event.returnValue = false;
		}
	
	
	//Handle changing the body content of the HTML document
		public static function changeBodyContent( htmlContents : String ){
			var htmlDocument : HTMLDocument =  getHtmlDocument();
			htmlContents = htmlContents.replace("\n", "");
			var regEx : EReg = new EReg("<body[^>]*>(.+)</body>", "");
			var matched : Bool = regEx.match(htmlContents);
			if(matched){ htmlContents =  regEx.matched(1); }
			htmlContents = htmlContents.replace("../", "");
			htmlDocument.body.innerHTML = htmlContents;
		}


	//Gets an element from the HTML document body
		public static function get( domSelection : String  ) : Dynamic{
			var htmlDocument : HTMLDocument =  getHtmlDocument();
			return htmlDocument.body.querySelector(domSelection);
		}
		

	//Gets all elements from the HTML document body
		public static function getAll( domSelection : String  ) : NodeList{
			var htmlDocument : HTMLDocument =  getHtmlDocument();
			return htmlDocument.body.querySelectorAll(domSelection);
		}	
		
	
	
	//Sets CSS styles for all matching elements 
		public static function setStyle( domSelection : String, cssStyle :String, value:String){
			var nodeList : NodeList =  getAll(domSelection);
			for( i in 0...nodeList.length ){
				var element : Element = nodeList[i];
				untyped element.style[cssStyle] = value;
			}
		}
		
		
	//Add event listener to all matching elements
		public static function addEventListener( domSelection : String, eventType :String, eventHandler:Dynamic->Void, ?useCapture:Bool = true){
			var nodeList : NodeList =  getAll(domSelection);
			for( i in 0...nodeList.length ){
				var element : Element = nodeList[i];
				element.addEventListener(eventType, eventHandler, useCapture); 
			}	 
		}	
		
	//Remove event listener from all matching elements
		public static function removeEventListener( domSelection : String, eventType :String, eventHandler:Dynamic->Void, ?useCapture:Bool = true){
			var nodeList : NodeList =  getAll(domSelection);
			for( i in 0...nodeList.length ){
				var element : Element = nodeList[i];
				element.removeEventListener(eventType, eventHandler, useCapture); 
			}
		}
		
	
	//Handles getting the computed style of a element
		public static function getComputedStyle( element : Element, style :String) : Dynamic {
  			var computedStyle : CSSStyleDeclaration;
  			var htmlDocument : HTMLDocument =  getHtmlDocument();
 		 	if (element.currentStyle != null){ computedStyle = element.currentStyle; }
  			else { computedStyle = htmlDocument.defaultView.getComputedStyle(element, null); }
  			return computedStyle.getPropertyValue(style);
		}	
		
		
	//Handles setting a select drop down selected value
		public static function setDropDown( element : HTMLSelectElement, value : String) {
			for( i in 0...element.options.length ){ 
				if(element.options.item(i).value == value){
					element.options.item(i).selected = true;
					break;
				}
			}
		}			
		
	
}