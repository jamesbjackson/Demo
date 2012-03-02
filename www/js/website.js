$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof xirsys=='undefined') xirsys = {}
if(!xirsys.cube) xirsys.cube = {}
if(!xirsys.cube["abstract"]) xirsys.cube["abstract"] = {}
xirsys.cube.abstract.IModel = function() { }
xirsys.cube.abstract.IModel.__name__ = ["xirsys","cube","abstract","IModel"];
xirsys.cube.abstract.IModel.prototype.eventDispatcher = null;
xirsys.cube.abstract.IModel.prototype.injector = null;
xirsys.cube.abstract.IModel.prototype.onRegister = null;
xirsys.cube.abstract.IModel.prototype.__class__ = xirsys.cube.abstract.IModel;
if(typeof realtime=='undefined') realtime = {}
if(!realtime.cloud) realtime.cloud = {}
if(!realtime.cloud.visualisation) realtime.cloud.visualisation = {}
realtime.cloud.visualisation.Colour = function(red,green,blue,alpha) {
	if( red === $_ ) return;
	if(alpha == null) alpha = 1;
	if(blue == null) blue = 0;
	if(green == null) green = 0;
	if(red == null) red = 0;
	this.red = red;
	this.green = green;
	this.blue = blue;
	this.alpha = alpha;
}
realtime.cloud.visualisation.Colour.__name__ = ["realtime","cloud","visualisation","Colour"];
realtime.cloud.visualisation.Colour.prototype.red = null;
realtime.cloud.visualisation.Colour.prototype.green = null;
realtime.cloud.visualisation.Colour.prototype.blue = null;
realtime.cloud.visualisation.Colour.prototype.alpha = null;
realtime.cloud.visualisation.Colour.prototype.__class__ = realtime.cloud.visualisation.Colour;
if(typeof haxe=='undefined') haxe = {}
if(!haxe.rtti) haxe.rtti = {}
haxe.rtti.XmlParser = function(p) {
	if( p === $_ ) return;
	this.root = new Array();
}
haxe.rtti.XmlParser.__name__ = ["haxe","rtti","XmlParser"];
haxe.rtti.XmlParser.prototype.root = null;
haxe.rtti.XmlParser.prototype.curplatform = null;
haxe.rtti.XmlParser.prototype.sort = function(l) {
	if(l == null) l = this.root;
	l.sort(function(e1,e2) {
		var n1 = (function($this) {
			var $r;
			var $e = (e1);
			switch( $e[1] ) {
			case 0:
				var p = $e[2];
				$r = " " + p;
				break;
			default:
				$r = haxe.rtti.TypeApi.typeInfos(e1).path;
			}
			return $r;
		}(this));
		var n2 = (function($this) {
			var $r;
			var $e = (e2);
			switch( $e[1] ) {
			case 0:
				var p = $e[2];
				$r = " " + p;
				break;
			default:
				$r = haxe.rtti.TypeApi.typeInfos(e2).path;
			}
			return $r;
		}(this));
		if(n1 > n2) return 1;
		return -1;
	});
	var _g = 0;
	while(_g < l.length) {
		var x = l[_g];
		++_g;
		var $e = (x);
		switch( $e[1] ) {
		case 0:
			var l1 = $e[4];
			this.sort(l1);
			break;
		case 1:
			var c = $e[2];
			c.fields = this.sortFields(c.fields);
			c.statics = this.sortFields(c.statics);
			break;
		case 2:
			var e = $e[2];
			break;
		case 3:
			break;
		}
	}
}
haxe.rtti.XmlParser.prototype.sortFields = function(fl) {
	var a = Lambda.array(fl);
	a.sort(function(f1,f2) {
		var v1 = haxe.rtti.TypeApi.isVar(f1.type);
		var v2 = haxe.rtti.TypeApi.isVar(f2.type);
		if(v1 && !v2) return -1;
		if(v2 && !v1) return 1;
		if(f1.name == "new") return -1;
		if(f2.name == "new") return 1;
		if(f1.name > f2.name) return 1;
		return -1;
	});
	return Lambda.list(a);
}
haxe.rtti.XmlParser.prototype.process = function(x,platform) {
	this.curplatform = platform;
	this.xroot(new haxe.xml.Fast(x));
}
haxe.rtti.XmlParser.prototype.mergeRights = function(f1,f2) {
	if(f1.get == haxe.rtti.Rights.RInline && f1.set == haxe.rtti.Rights.RNo && f2.get == haxe.rtti.Rights.RNormal && f2.set == haxe.rtti.Rights.RMethod) {
		f1.get = haxe.rtti.Rights.RNormal;
		f1.set = haxe.rtti.Rights.RMethod;
		return true;
	}
	return false;
}
haxe.rtti.XmlParser.prototype.mergeFields = function(f,f2) {
	return haxe.rtti.TypeApi.fieldEq(f,f2) || f.name == f2.name && (this.mergeRights(f,f2) || this.mergeRights(f2,f)) && haxe.rtti.TypeApi.fieldEq(f,f2);
}
haxe.rtti.XmlParser.prototype.mergeClasses = function(c,c2) {
	if(c.isInterface != c2.isInterface) return false;
	if(this.curplatform != null) c.platforms.add(this.curplatform);
	if(c.isExtern != c2.isExtern) c.isExtern = false;
	var $it0 = c2.fields.iterator();
	while( $it0.hasNext() ) {
		var f2 = $it0.next();
		var found = null;
		var $it1 = c.fields.iterator();
		while( $it1.hasNext() ) {
			var f = $it1.next();
			if(this.mergeFields(f,f2)) {
				found = f;
				break;
			}
		}
		if(found == null) c.fields.add(f2); else if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	var $it2 = c2.statics.iterator();
	while( $it2.hasNext() ) {
		var f2 = $it2.next();
		var found = null;
		var $it3 = c.statics.iterator();
		while( $it3.hasNext() ) {
			var f = $it3.next();
			if(this.mergeFields(f,f2)) {
				found = f;
				break;
			}
		}
		if(found == null) c.statics.add(f2); else if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	return true;
}
haxe.rtti.XmlParser.prototype.mergeEnums = function(e,e2) {
	if(e.isExtern != e2.isExtern) return false;
	if(this.curplatform != null) e.platforms.add(this.curplatform);
	var $it0 = e2.constructors.iterator();
	while( $it0.hasNext() ) {
		var c2 = $it0.next();
		var found = null;
		var $it1 = e.constructors.iterator();
		while( $it1.hasNext() ) {
			var c = $it1.next();
			if(haxe.rtti.TypeApi.constructorEq(c,c2)) {
				found = c;
				break;
			}
		}
		if(found == null) return false;
		if(this.curplatform != null) found.platforms.add(this.curplatform);
	}
	return true;
}
haxe.rtti.XmlParser.prototype.mergeTypedefs = function(t,t2) {
	if(this.curplatform == null) return false;
	t.platforms.add(this.curplatform);
	t.types.set(this.curplatform,t2.type);
	return true;
}
haxe.rtti.XmlParser.prototype.merge = function(t) {
	var inf = haxe.rtti.TypeApi.typeInfos(t);
	var pack = inf.path.split(".");
	var cur = this.root;
	var curpack = new Array();
	pack.pop();
	var _g = 0;
	while(_g < pack.length) {
		var p = pack[_g];
		++_g;
		var found = false;
		var _g1 = 0;
		try {
			while(_g1 < cur.length) {
				var pk = cur[_g1];
				++_g1;
				var $e = (pk);
				switch( $e[1] ) {
				case 0:
					var subs = $e[4], pname = $e[2];
					if(pname == p) {
						found = true;
						cur = subs;
						throw "__break__";
					}
					break;
				default:
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		curpack.push(p);
		if(!found) {
			var pk = new Array();
			cur.push(haxe.rtti.TypeTree.TPackage(p,curpack.join("."),pk));
			cur = pk;
		}
	}
	var prev = null;
	var _g = 0;
	while(_g < cur.length) {
		var ct = cur[_g];
		++_g;
		var tinf;
		try {
			tinf = haxe.rtti.TypeApi.typeInfos(ct);
		} catch( e ) {
			continue;
		}
		if(tinf.path == inf.path) {
			var sameType = true;
			if(tinf.module == inf.module && tinf.doc == inf.doc && tinf.isPrivate == inf.isPrivate) {
				var $e = (ct);
				switch( $e[1] ) {
				case 1:
					var c = $e[2];
					var $e = (t);
					switch( $e[1] ) {
					case 1:
						var c2 = $e[2];
						if(this.mergeClasses(c,c2)) return;
						break;
					default:
						sameType = false;
					}
					break;
				case 2:
					var e = $e[2];
					var $e = (t);
					switch( $e[1] ) {
					case 2:
						var e2 = $e[2];
						if(this.mergeEnums(e,e2)) return;
						break;
					default:
						sameType = false;
					}
					break;
				case 3:
					var td = $e[2];
					var $e = (t);
					switch( $e[1] ) {
					case 3:
						var td2 = $e[2];
						if(this.mergeTypedefs(td,td2)) return;
						break;
					default:
					}
					break;
				case 0:
					sameType = false;
					break;
				}
			}
			var msg = tinf.module != inf.module?"module " + inf.module + " should be " + tinf.module:tinf.doc != inf.doc?"documentation is different":tinf.isPrivate != inf.isPrivate?"private flag is different":!sameType?"type kind is different":"could not merge definition";
			throw "Incompatibilities between " + tinf.path + " in " + tinf.platforms.join(",") + " and " + this.curplatform + " (" + msg + ")";
		}
	}
	cur.push(t);
}
haxe.rtti.XmlParser.prototype.mkPath = function(p) {
	return p;
}
haxe.rtti.XmlParser.prototype.mkTypeParams = function(p) {
	var pl = p.split(":");
	if(pl[0] == "") return new Array();
	return pl;
}
haxe.rtti.XmlParser.prototype.mkRights = function(r) {
	return (function($this) {
		var $r;
		switch(r) {
		case "null":
			$r = haxe.rtti.Rights.RNo;
			break;
		case "method":
			$r = haxe.rtti.Rights.RMethod;
			break;
		case "dynamic":
			$r = haxe.rtti.Rights.RDynamic;
			break;
		case "inline":
			$r = haxe.rtti.Rights.RInline;
			break;
		default:
			$r = haxe.rtti.Rights.RCall(r);
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xerror = function(c) {
	return (function($this) {
		var $r;
		throw "Invalid " + c.getName();
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xroot = function(x) {
	var $it0 = x.x.elements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		this.merge(this.processElement(c));
	}
}
haxe.rtti.XmlParser.prototype.processElement = function(x) {
	var c = new haxe.xml.Fast(x);
	return (function($this) {
		var $r;
		switch(c.getName()) {
		case "class":
			$r = haxe.rtti.TypeTree.TClassdecl($this.xclass(c));
			break;
		case "enum":
			$r = haxe.rtti.TypeTree.TEnumdecl($this.xenum(c));
			break;
		case "typedef":
			$r = haxe.rtti.TypeTree.TTypedecl($this.xtypedef(c));
			break;
		default:
			$r = $this.xerror(c);
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xpath = function(x) {
	var path = this.mkPath(x.att.resolve("path"));
	var params = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		params.add(this.xtype(c));
	}
	return { path : path, params : params};
}
haxe.rtti.XmlParser.prototype.xclass = function(x) {
	var csuper = null;
	var doc = null;
	var tdynamic = null;
	var interfaces = new List();
	var fields = new List();
	var statics = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c.getName()) {
		case "haxe_doc":
			doc = c.getInnerData();
			break;
		case "extends":
			csuper = this.xpath(c);
			break;
		case "implements":
			interfaces.add(this.xpath(c));
			break;
		case "haxe_dynamic":
			tdynamic = this.xtype(new haxe.xml.Fast(c.x.firstElement()));
			break;
		default:
			if(c.x.exists("static")) statics.add(this.xclassfield(c)); else fields.add(this.xclassfield(c));
		}
	}
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), isInterface : x.x.exists("interface"), params : this.mkTypeParams(x.att.resolve("params")), superClass : csuper, interfaces : interfaces, fields : fields, statics : statics, tdynamic : tdynamic, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xclassfield = function(x) {
	var e = x.getElements();
	var t = this.xtype(e.next());
	var doc = null;
	while( e.hasNext() ) {
		var c = e.next();
		switch(c.getName()) {
		case "haxe_doc":
			doc = c.getInnerData();
			break;
		default:
			this.xerror(c);
		}
	}
	return { name : x.getName(), type : t, isPublic : x.x.exists("public"), isOverride : x.x.exists("override"), doc : doc, get : x.has.resolve("get")?this.mkRights(x.att.resolve("get")):haxe.rtti.Rights.RNormal, set : x.has.resolve("set")?this.mkRights(x.att.resolve("set")):haxe.rtti.Rights.RNormal, params : x.has.resolve("params")?this.mkTypeParams(x.att.resolve("params")):null, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xenum = function(x) {
	var cl = new List();
	var doc = null;
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.getName() == "haxe_doc") doc = c.getInnerData(); else cl.add(this.xenumfield(c));
	}
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), isExtern : x.x.exists("extern"), params : this.mkTypeParams(x.att.resolve("params")), constructors : cl, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xenumfield = function(x) {
	var args = null;
	var xdoc = x.x.elementsNamed("haxe_doc").next();
	if(x.has.resolve("a")) {
		var names = x.att.resolve("a").split(":");
		var elts = x.getElements();
		args = new List();
		var _g = 0;
		while(_g < names.length) {
			var c = names[_g];
			++_g;
			var opt = false;
			if(c.charAt(0) == "?") {
				opt = true;
				c = c.substr(1);
			}
			args.add({ name : c, opt : opt, t : this.xtype(elts.next())});
		}
	}
	return { name : x.getName(), args : args, doc : xdoc == null?null:new haxe.xml.Fast(xdoc).getInnerData(), platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xtypedef = function(x) {
	var doc = null;
	var t = null;
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		if(c.getName() == "haxe_doc") doc = c.getInnerData(); else t = this.xtype(c);
	}
	var types = new Hash();
	if(this.curplatform != null) types.set(this.curplatform,t);
	return { path : this.mkPath(x.att.resolve("path")), module : x.has.resolve("module")?this.mkPath(x.att.resolve("module")):null, doc : doc, isPrivate : x.x.exists("private"), params : this.mkTypeParams(x.att.resolve("params")), type : t, types : types, platforms : this.defplat()};
}
haxe.rtti.XmlParser.prototype.xtype = function(x) {
	return (function($this) {
		var $r;
		switch(x.getName()) {
		case "unknown":
			$r = haxe.rtti.CType.CUnknown;
			break;
		case "e":
			$r = haxe.rtti.CType.CEnum($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
			break;
		case "c":
			$r = haxe.rtti.CType.CClass($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
			break;
		case "t":
			$r = haxe.rtti.CType.CTypedef($this.mkPath(x.att.resolve("path")),$this.xtypeparams(x));
			break;
		case "f":
			$r = (function($this) {
				var $r;
				var args = new List();
				var aname = x.att.resolve("a").split(":");
				var eargs = aname.iterator();
				var $it0 = x.getElements();
				while( $it0.hasNext() ) {
					var e = $it0.next();
					var opt = false;
					var a = eargs.next();
					if(a == null) a = "";
					if(a.charAt(0) == "?") {
						opt = true;
						a = a.substr(1);
					}
					args.add({ name : a, opt : opt, t : $this.xtype(e)});
				}
				var ret = args.last();
				args.remove(ret);
				$r = haxe.rtti.CType.CFunction(args,ret.t);
				return $r;
			}($this));
			break;
		case "a":
			$r = (function($this) {
				var $r;
				var fields = new List();
				var $it1 = x.getElements();
				while( $it1.hasNext() ) {
					var f = $it1.next();
					fields.add({ name : f.getName(), t : $this.xtype(new haxe.xml.Fast(f.x.firstElement()))});
				}
				$r = haxe.rtti.CType.CAnonymous(fields);
				return $r;
			}($this));
			break;
		case "d":
			$r = (function($this) {
				var $r;
				var t = null;
				var tx = x.x.firstElement();
				if(tx != null) t = $this.xtype(new haxe.xml.Fast(tx));
				$r = haxe.rtti.CType.CDynamic(t);
				return $r;
			}($this));
			break;
		default:
			$r = $this.xerror(x);
		}
		return $r;
	}(this));
}
haxe.rtti.XmlParser.prototype.xtypeparams = function(x) {
	var p = new List();
	var $it0 = x.getElements();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		p.add(this.xtype(c));
	}
	return p;
}
haxe.rtti.XmlParser.prototype.defplat = function() {
	var l = new List();
	if(this.curplatform != null) l.add(this.curplatform);
	return l;
}
haxe.rtti.XmlParser.prototype.__class__ = haxe.rtti.XmlParser;
if(!xirsys.injector) xirsys.injector = {}
if(!xirsys.injector.exceptions) xirsys.injector.exceptions = {}
xirsys.injector.exceptions.InjectorException = function(_msg,_infos) {
	if( _msg === $_ ) return;
	this.msg = _msg;
	this.infos = _infos;
}
xirsys.injector.exceptions.InjectorException.__name__ = ["xirsys","injector","exceptions","InjectorException"];
xirsys.injector.exceptions.InjectorException.prototype.msg = null;
xirsys.injector.exceptions.InjectorException.prototype.infos = null;
xirsys.injector.exceptions.InjectorException.prototype.__class__ = xirsys.injector.exceptions.InjectorException;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
xirsys.cube.abstract.IView = function() { }
xirsys.cube.abstract.IView.__name__ = ["xirsys","cube","abstract","IView"];
xirsys.cube.abstract.IView.prototype.__class__ = xirsys.cube.abstract.IView;
xirsys.cube.abstract.ICentralDispatcher = function() { }
xirsys.cube.abstract.ICentralDispatcher.__name__ = ["xirsys","cube","abstract","ICentralDispatcher"];
xirsys.cube.abstract.ICentralDispatcher.prototype.addEventHandler = null;
xirsys.cube.abstract.ICentralDispatcher.prototype.addEventHandlerOnce = null;
xirsys.cube.abstract.ICentralDispatcher.prototype.remove = null;
xirsys.cube.abstract.ICentralDispatcher.prototype.clear = null;
xirsys.cube.abstract.ICentralDispatcher.prototype.dispatch = null;
xirsys.cube.abstract.ICentralDispatcher.prototype.has = null;
xirsys.cube.abstract.ICentralDispatcher.prototype.__class__ = xirsys.cube.abstract.ICentralDispatcher;
if(!xirsys.cube.events) xirsys.cube.events = {}
xirsys.cube.events.CentralDispatcher = function(p) {
	if( p === $_ ) return;
	this._handlers = new Hash();
}
xirsys.cube.events.CentralDispatcher.__name__ = ["xirsys","cube","events","CentralDispatcher"];
xirsys.cube.events.CentralDispatcher.prototype._handlers = null;
xirsys.cube.events.CentralDispatcher.prototype.addEventHandler = function(type,h) {
	if(!this._handlers.exists(type)) {
		var dispatcher = new hxevents.Dispatcher();
		this._handlers.set(type,dispatcher);
	}
	this._handlers.get(type).add(h);
	return h;
}
xirsys.cube.events.CentralDispatcher.prototype.addEventHandlerOnce = function(type,h) {
	var me = this;
	var _h = null;
	_h = function(v) {
		me.remove(type,_h);
		h(v);
	};
	this.addEventHandler(type,_h);
	return _h;
}
xirsys.cube.events.CentralDispatcher.prototype.remove = function(type,h) {
	if(this._handlers.exists(type)) return this._handlers.get(type).remove(h);
	return null;
}
xirsys.cube.events.CentralDispatcher.prototype.clear = function() {
	this._handlers = new Hash();
}
xirsys.cube.events.CentralDispatcher.prototype.dispatch = function(type,e) {
	try {
		if(this._handlers.exists(type)) {
			var dispatcher = this._handlers.get(type);
			return dispatcher.dispatch(e);
		}
	} catch( exc ) {
		if( js.Boot.__instanceof(exc,hxevents.EventException) ) {
			return false;
		} else throw(exc);
	}
	return false;
}
xirsys.cube.events.CentralDispatcher.prototype.has = function(type,h) {
	if(this._handlers.exists(type)) {
		if(h == null) return true;
		return this._handlers.get(type).has(h);
	} else return false;
}
xirsys.cube.events.CentralDispatcher.prototype.__class__ = xirsys.cube.events.CentralDispatcher;
xirsys.cube.events.CentralDispatcher.__interfaces__ = [xirsys.cube.abstract.ICentralDispatcher];
if(!realtime.cloud.view) realtime.cloud.view = {}
realtime.cloud.view.IView = function() { }
realtime.cloud.view.IView.__name__ = ["realtime","cloud","view","IView"];
realtime.cloud.view.IView.prototype.init = null;
realtime.cloud.view.IView.prototype.getViewName = null;
realtime.cloud.view.IView.prototype.activate = null;
realtime.cloud.view.IView.prototype.deactivate = null;
realtime.cloud.view.IView.prototype.transitionIn = null;
realtime.cloud.view.IView.prototype.transitionOut = null;
realtime.cloud.view.IView.prototype.__class__ = realtime.cloud.view.IView;
realtime.cloud.view.IView.__interfaces__ = [xirsys.cube.abstract.ICentralDispatcher];
realtime.cloud.view.BaseView = function(p) {
	if( p === $_ ) return;
	this.viewName = "";
	xirsys.cube.events.CentralDispatcher.call(this);
}
realtime.cloud.view.BaseView.__name__ = ["realtime","cloud","view","BaseView"];
realtime.cloud.view.BaseView.__super__ = xirsys.cube.events.CentralDispatcher;
for(var k in xirsys.cube.events.CentralDispatcher.prototype ) realtime.cloud.view.BaseView.prototype[k] = xirsys.cube.events.CentralDispatcher.prototype[k];
realtime.cloud.view.BaseView.prototype.stage = null;
realtime.cloud.view.BaseView.prototype.viewName = null;
realtime.cloud.view.BaseView.prototype.htmlDocument = null;
realtime.cloud.view.BaseView.prototype.init = function(stage) {
	this.stage = stage;
	this.htmlDocument = stage.htmlDocument;
}
realtime.cloud.view.BaseView.prototype.activate = function() {
	utils.CommonJS.addEventListener(realtime.cloud.view.BaseView.DEEPLINK,utils.CommonJS.CLICK_EVENT,$closure(this,"onChangeView"));
}
realtime.cloud.view.BaseView.prototype.deactivate = function() {
	utils.CommonJS.removeEventListener(realtime.cloud.view.BaseView.DEEPLINK,utils.CommonJS.CLICK_EVENT,$closure(this,"onChangeView"));
}
realtime.cloud.view.BaseView.prototype.transitionIn = function(event) {
	var me = this;
	var innerElement = utils.CommonJS.get(".viewable");
	Firmin.animate(innerElement,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element) {
		me.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,event);
	});
}
realtime.cloud.view.BaseView.prototype.transitionOut = function(event) {
	var me = this;
	var innerElement = utils.CommonJS.get(".viewable");
	Firmin.animate(innerElement,{ opacity : 0, timingFunction : "ease-out"},"250ms",function(element) {
		me.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,event);
	});
}
realtime.cloud.view.BaseView.prototype.changeView = function(path,parameters) {
	var viewEvent = new realtime.cloud.events.ViewEvent();
	viewEvent.parameters = parameters;
	viewEvent.path = path;
	this.dispatch(realtime.cloud.events.ViewEvent.CHANGE,viewEvent);
}
realtime.cloud.view.BaseView.prototype.getViewName = function() {
	return this.viewName;
}
realtime.cloud.view.BaseView.prototype.onChangeView = function(event) {
	utils.CommonJS.stopEventPropergation(event);
	this.changeView(event.currentTarget.rel);
}
realtime.cloud.view.BaseView.prototype.__class__ = realtime.cloud.view.BaseView;
realtime.cloud.view.BaseView.__interfaces__ = [realtime.cloud.view.IView];
realtime.cloud.view.StartupView = function(p) {
	if( p === $_ ) return;
	realtime.cloud.view.BaseView.call(this);
	this.viewName = "StartupView";
}
realtime.cloud.view.StartupView.__name__ = ["realtime","cloud","view","StartupView"];
realtime.cloud.view.StartupView.__super__ = realtime.cloud.view.BaseView;
for(var k in realtime.cloud.view.BaseView.prototype ) realtime.cloud.view.StartupView.prototype[k] = realtime.cloud.view.BaseView.prototype[k];
realtime.cloud.view.StartupView.prototype.transitionIn = function(event) {
	var me = this;
	var launch = utils.CommonJS.get("#systemLaunch");
	var startup = utils.CommonJS.get("#systemStartup");
	var inner = utils.CommonJS.get("#systemStartup .inner");
	var footer = utils.CommonJS.get("#systemStartup footer");
	var contents = utils.CommonJS.get("#systemStartup .inner .contents");
	var title = utils.CommonJS.get("#systemStartup h1");
	var progressInfo = utils.CommonJS.get("#systemStartup .progress-info");
	Firmin.animate(launch,{ opacity : 0, delay : "500ms", z : 0, timingFunction : "ease-out"},"250ms",function(element) {
		utils.CommonJS.removeElement(launch);
		startup.style.display = "table";
		Firmin.animate(startup,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element1) {
			Firmin.animate(inner,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element2) {
				Firmin.animate(contents,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element3) {
					Firmin.animate(title,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element4) {
						Firmin.animate(progressInfo,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element5) {
							Firmin.animate(footer,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element6) {
								me.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,event);
							});
						});
					});
				});
			});
		});
	});
}
realtime.cloud.view.StartupView.prototype.transitionOut = function(event) {
	this.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,event);
}
realtime.cloud.view.StartupView.prototype.__class__ = realtime.cloud.view.StartupView;
realtime.cloud.view.StartupView.__interfaces__ = [realtime.cloud.view.IView];
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
haxe.rtti.Infos = function() { }
haxe.rtti.Infos.__name__ = ["haxe","rtti","Infos"];
haxe.rtti.Infos.prototype.__class__ = haxe.rtti.Infos;
xirsys.cube.abstract.IMediator = function() { }
xirsys.cube.abstract.IMediator.__name__ = ["xirsys","cube","abstract","IMediator"];
xirsys.cube.abstract.IMediator.prototype.mediatorMap = null;
xirsys.cube.abstract.IMediator.prototype.eventDispatcher = null;
xirsys.cube.abstract.IMediator.prototype.injector = null;
xirsys.cube.abstract.IMediator.prototype.preRegister = null;
xirsys.cube.abstract.IMediator.prototype.onRegister = null;
xirsys.cube.abstract.IMediator.prototype.preRemove = null;
xirsys.cube.abstract.IMediator.prototype.onRemove = null;
xirsys.cube.abstract.IMediator.prototype.getViewComponent = null;
xirsys.cube.abstract.IMediator.prototype.setViewComponent = null;
xirsys.cube.abstract.IMediator.prototype.__class__ = xirsys.cube.abstract.IMediator;
if(!xirsys.cube.mvcs) xirsys.cube.mvcs = {}
xirsys.cube.mvcs.Mediator = function(p) {
	if( p === $_ ) return;
	this.eventMap = new xirsys.cube.core.EventMap(this.eventDispatcher);
}
xirsys.cube.mvcs.Mediator.__name__ = ["xirsys","cube","mvcs","Mediator"];
xirsys.cube.mvcs.Mediator.prototype.mediatorMap = null;
xirsys.cube.mvcs.Mediator.prototype.eventDispatcher = null;
xirsys.cube.mvcs.Mediator.prototype.injector = null;
xirsys.cube.mvcs.Mediator.prototype.eventMap = null;
xirsys.cube.mvcs.Mediator.prototype.viewComponent = null;
xirsys.cube.mvcs.Mediator.prototype.removed = null;
xirsys.cube.mvcs.Mediator.prototype.preRemove = function() {
	if(this.eventMap != null) this.eventMap.unmapListeners();
	this.removed = true;
	this.onRemove();
}
xirsys.cube.mvcs.Mediator.prototype.preRegister = function() {
	this.removed = false;
	this.onRegister();
}
xirsys.cube.mvcs.Mediator.prototype.onRegister = function() {
}
xirsys.cube.mvcs.Mediator.prototype.onRemove = function() {
}
xirsys.cube.mvcs.Mediator.prototype.getViewComponent = function() {
	return this.viewComponent;
}
xirsys.cube.mvcs.Mediator.prototype.setViewComponent = function(view) {
	this.viewComponent = view;
}
xirsys.cube.mvcs.Mediator.prototype.__class__ = xirsys.cube.mvcs.Mediator;
xirsys.cube.mvcs.Mediator.__interfaces__ = [haxe.rtti.Infos,xirsys.cube.abstract.IMediator];
if(!realtime.cloud.mediator) realtime.cloud.mediator = {}
realtime.cloud.mediator.BaseMediator = function(p) {
	if( p === $_ ) return;
	xirsys.cube.mvcs.Mediator.call(this);
}
realtime.cloud.mediator.BaseMediator.__name__ = ["realtime","cloud","mediator","BaseMediator"];
realtime.cloud.mediator.BaseMediator.__super__ = xirsys.cube.mvcs.Mediator;
for(var k in xirsys.cube.mvcs.Mediator.prototype ) realtime.cloud.mediator.BaseMediator.prototype[k] = xirsys.cube.mvcs.Mediator.prototype[k];
realtime.cloud.mediator.BaseMediator.prototype.viewManager = null;
realtime.cloud.mediator.BaseMediator.prototype.loaderService = null;
realtime.cloud.mediator.BaseMediator.prototype.urlAddressService = null;
realtime.cloud.mediator.BaseMediator.prototype.viewActive = null;
realtime.cloud.mediator.BaseMediator.prototype.instanceOfView = null;
realtime.cloud.mediator.BaseMediator.prototype.setInstanceOfView = function(view) {
	this.instanceOfView = view;
}
realtime.cloud.mediator.BaseMediator.prototype.isActive = function() {
	return this.viewActive;
}
realtime.cloud.mediator.BaseMediator.prototype.manageView = function(path) {
	var asset = this.loaderService.getAsset(path);
	if(asset == null) return false;
	return this.instanceOfView.getViewName() == asset.view;
}
realtime.cloud.mediator.BaseMediator.prototype.onRegister = function() {
	this.eventDispatcher.addEventHandler(realtime.cloud.events.ViewEvent.TRANSITION_IN,$closure(this,"onTransitionIn"));
	this.eventDispatcher.addEventHandler(realtime.cloud.events.ViewEvent.TRANSITION_OUT,$closure(this,"onTransitionOut"));
	this.instanceOfView.addEventHandler(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,$closure(this,"onTransitionInCompleted"));
	this.instanceOfView.addEventHandler(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,$closure(this,"onTransitionOutCompleted"));
	this.instanceOfView.addEventHandler(realtime.cloud.events.ViewEvent.CHANGE,$closure(this,"changeView"));
	this.viewActive = false;
	xirsys.cube.mvcs.Mediator.prototype.onRegister.call(this);
}
realtime.cloud.mediator.BaseMediator.prototype.changeView = function(event) {
	this.eventDispatcher.dispatch(realtime.cloud.events.ViewEvent.CHANGE,event);
}
realtime.cloud.mediator.BaseMediator.prototype.onTransitionIn = function(event) {
	if(this.manageView(event.path) == true) this.instanceOfView.transitionIn(event);
}
realtime.cloud.mediator.BaseMediator.prototype.onTransitionOut = function(event) {
	if(this.manageView(event.path) == true) {
		this.instanceOfView.deactivate();
		this.instanceOfView.transitionOut(event);
	}
}
realtime.cloud.mediator.BaseMediator.prototype.onTransitionInCompleted = function(event) {
	this.eventDispatcher.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,event);
	this.instanceOfView.activate();
	this.viewActive = true;
}
realtime.cloud.mediator.BaseMediator.prototype.onTransitionOutCompleted = function(event) {
	this.eventDispatcher.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,event);
	this.viewActive = false;
}
realtime.cloud.mediator.BaseMediator.prototype.__class__ = realtime.cloud.mediator.BaseMediator;
realtime.cloud.mediator.PreloaderMediator = function(p) {
	if( p === $_ ) return;
	realtime.cloud.mediator.BaseMediator.call(this);
}
realtime.cloud.mediator.PreloaderMediator.__name__ = ["realtime","cloud","mediator","PreloaderMediator"];
realtime.cloud.mediator.PreloaderMediator.__super__ = realtime.cloud.mediator.BaseMediator;
for(var k in realtime.cloud.mediator.BaseMediator.prototype ) realtime.cloud.mediator.PreloaderMediator.prototype[k] = realtime.cloud.mediator.BaseMediator.prototype[k];
realtime.cloud.mediator.PreloaderMediator.prototype.view = null;
realtime.cloud.mediator.PreloaderMediator.prototype.onRegister = function() {
	this.eventDispatcher.addEventHandler(realtime.cloud.events.LoaderProgressEvent.PROGRESS,$closure(this,"onLoaderProgress"));
	this.setInstanceOfView(this.view);
	realtime.cloud.mediator.BaseMediator.prototype.onRegister.call(this);
}
realtime.cloud.mediator.PreloaderMediator.prototype.onLoaderProgress = function(event) {
	this.view.updateProgress(event);
}
realtime.cloud.mediator.PreloaderMediator.prototype.onTransitionInCompleted = function(event) {
	realtime.cloud.mediator.BaseMediator.prototype.onTransitionInCompleted.call(this,event);
	this.loaderService.load();
}
realtime.cloud.mediator.PreloaderMediator.prototype.__class__ = realtime.cloud.mediator.PreloaderMediator;
IntHash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	for( x in this.h ) a.push(x);
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
xirsys.cube.mvcs.Command = function() { }
xirsys.cube.mvcs.Command.__name__ = ["xirsys","cube","mvcs","Command"];
xirsys.cube.mvcs.Command.prototype.commandMap = null;
xirsys.cube.mvcs.Command.prototype.eventDispatcher = null;
xirsys.cube.mvcs.Command.prototype.injector = null;
xirsys.cube.mvcs.Command.prototype.mediatorMap = null;
xirsys.cube.mvcs.Command.prototype.Command = function() {
}
xirsys.cube.mvcs.Command.prototype.execute = function() {
}
xirsys.cube.mvcs.Command.prototype.__class__ = xirsys.cube.mvcs.Command;
xirsys.cube.mvcs.Command.__interfaces__ = [haxe.rtti.Infos];
if(!realtime.cloud.commands) realtime.cloud.commands = {}
realtime.cloud.commands.TransitionInCommand = function() { }
realtime.cloud.commands.TransitionInCommand.__name__ = ["realtime","cloud","commands","TransitionInCommand"];
realtime.cloud.commands.TransitionInCommand.__super__ = xirsys.cube.mvcs.Command;
for(var k in xirsys.cube.mvcs.Command.prototype ) realtime.cloud.commands.TransitionInCommand.prototype[k] = xirsys.cube.mvcs.Command.prototype[k];
realtime.cloud.commands.TransitionInCommand.prototype.event = null;
realtime.cloud.commands.TransitionInCommand.prototype.viewManager = null;
realtime.cloud.commands.TransitionInCommand.prototype.execute = function() {
	this.viewManager.currentView = this.event;
}
realtime.cloud.commands.TransitionInCommand.prototype.__class__ = realtime.cloud.commands.TransitionInCommand;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
if(!xirsys.cube.core) xirsys.cube.core = {}
xirsys.cube.core.MapBase = function(container,injector) {
	if( container === $_ ) return;
	this._enabled = true;
	this._active = true;
	this.injector = injector;
	this.useCapture = true;
	this.setContainer(container);
}
xirsys.cube.core.MapBase.__name__ = ["xirsys","cube","core","MapBase"];
xirsys.cube.core.MapBase.prototype._enabled = null;
xirsys.cube.core.MapBase.prototype._active = null;
xirsys.cube.core.MapBase.prototype._container = null;
xirsys.cube.core.MapBase.prototype.injector = null;
xirsys.cube.core.MapBase.prototype.useCapture = null;
xirsys.cube.core.MapBase.prototype.enabled = null;
xirsys.cube.core.MapBase.prototype.container = null;
xirsys.cube.core.MapBase.prototype.getContainer = function() {
	return this._container;
}
xirsys.cube.core.MapBase.prototype.setContainer = function(value) {
	if(value != this._container) {
		this.removeListeners();
		this._container = value;
		this.addListeners();
	}
	return value;
}
xirsys.cube.core.MapBase.prototype.getEnabled = function() {
	return this._enabled;
}
xirsys.cube.core.MapBase.prototype.setEnabled = function(value) {
	if(value != this._enabled) {
		this.removeListeners();
		this._enabled = value;
		this.addListeners();
	}
	return value;
}
xirsys.cube.core.MapBase.prototype.activate = function() {
	if(!this._active) {
		this._active = true;
		this.addListeners();
	}
}
xirsys.cube.core.MapBase.prototype.addListeners = function() {
}
xirsys.cube.core.MapBase.prototype.removeListeners = function() {
}
xirsys.cube.core.MapBase.prototype.__class__ = xirsys.cube.core.MapBase;
xirsys.cube.abstract.IViewMap = function() { }
xirsys.cube.abstract.IViewMap.__name__ = ["xirsys","cube","abstract","IViewMap"];
xirsys.cube.abstract.IViewMap.prototype.__class__ = xirsys.cube.abstract.IViewMap;
xirsys.cube.core.ViewMap = function(container,eventDispatcher,injector) {
	if( container === $_ ) return;
	xirsys.cube.core.MapBase.call(this,container,injector);
	this.eventDispatcher = eventDispatcher;
	this.mappedPackages = new Array();
	this.mappedTypes = new Array();
	this.injectedViews = new Array();
}
xirsys.cube.core.ViewMap.__name__ = ["xirsys","cube","core","ViewMap"];
xirsys.cube.core.ViewMap.__super__ = xirsys.cube.core.MapBase;
for(var k in xirsys.cube.core.MapBase.prototype ) xirsys.cube.core.ViewMap.prototype[k] = xirsys.cube.core.MapBase.prototype[k];
xirsys.cube.core.ViewMap.prototype.mappedPackages = null;
xirsys.cube.core.ViewMap.prototype.mappedTypes = null;
xirsys.cube.core.ViewMap.prototype.injectedViews = null;
xirsys.cube.core.ViewMap.prototype.eventDispatcher = null;
xirsys.cube.core.ViewMap.prototype.mapPackage = function(packageName) {
	if(!Lambda.has(this.mappedPackages,packageName)) {
		this.mappedPackages.push(packageName);
		this.activate();
	}
}
xirsys.cube.core.ViewMap.prototype.unmapPackage = function(packageName) {
	var index = this.indexOf(this.mappedPackages,packageName);
	if(index > -1) this.mappedPackages.splice(index,1);
}
xirsys.cube.core.ViewMap.prototype.mapType = function(type) {
	if(Lambda.has(this.mappedTypes,type)) return;
	this.mappedTypes.push(type);
	if(this.getContainer() != null) this.injectInto(this.getContainer());
	this.activate();
}
xirsys.cube.core.ViewMap.prototype.unmapType = function(type) {
	if(Lambda.has(this.mappedTypes,type)) this.mappedTypes[this.indexOf(this.mappedTypes,type)] == null;
}
xirsys.cube.core.ViewMap.prototype.hasType = function(type) {
	return Lambda.has(this.mappedTypes,type);
}
xirsys.cube.core.ViewMap.prototype.hasPackage = function(packageName) {
	return Lambda.has(this.mappedPackages,packageName);
}
xirsys.cube.core.ViewMap.prototype.injectInto = function(target) {
	this.injector.inject(target);
	this.injectedViews.push(target);
}
xirsys.cube.core.ViewMap.prototype.indexOf = function(arr,itm) {
	var ret = -1;
	var _g1 = 0, _g = arr.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(arr[i] == itm) ret = i;
	}
	return ret;
}
xirsys.cube.core.ViewMap.prototype.__class__ = xirsys.cube.core.ViewMap;
xirsys.cube.core.ViewMap.__interfaces__ = [xirsys.cube.abstract.IViewMap];
if(typeof utils=='undefined') utils = {}
if(!utils.json) utils.json = {}
utils.json.JSON = function() { }
utils.json.JSON.__name__ = ["utils","json","JSON"];
utils.json.JSON.encode = function(o) {
	return new utils.json.JSONEncoder(o).getString();
}
utils.json.JSON.decode = function(s,strict) {
	if(strict == null) strict = true;
	return new utils.json.JSONDecoder(s,strict).getValue();
}
utils.json.JSON.prototype.__class__ = utils.json.JSON;
utils.CommonJS = function() { }
utils.CommonJS.__name__ = ["utils","CommonJS"];
utils.CommonJS.getDocument = function() {
	var document = document;
	return document;
}
utils.CommonJS.getHtmlDocument = function() {
	var htmlDocument = document;
	return htmlDocument;
}
utils.CommonJS.removeElement = function(element) {
	if(element.parentNode != null && $closure(element.parentNode,"removeChild") != null) element.parentNode.removeChild(element);
}
utils.CommonJS.stopEventPropergation = function(event) {
	if(event.stopPropagation != null) event.stopPropagation(); else if(event.cancelBubble != null) event.cancelBubble = true;
	if(event.preventDefault != null) event.preventDefault(); else if(event.returnValue != null) event.returnValue = false;
}
utils.CommonJS.changeBodyContent = function(htmlContents) {
	var htmlDocument = utils.CommonJS.getHtmlDocument();
	htmlContents = StringTools.replace(htmlContents,"\n","");
	var regEx = new EReg("<body[^>]*>(.+)</body>","");
	var matched = regEx.match(htmlContents);
	if(matched) htmlContents = regEx.matched(1);
	htmlContents = StringTools.replace(htmlContents,"../","");
	htmlDocument.body.innerHTML = htmlContents;
}
utils.CommonJS.get = function(domSelection) {
	var htmlDocument = utils.CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelector(domSelection);
}
utils.CommonJS.getAll = function(domSelection) {
	var htmlDocument = utils.CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelectorAll(domSelection);
}
utils.CommonJS.setStyle = function(domSelection,cssStyle,value) {
	var nodeList = utils.CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.style[cssStyle] = value;
	}
}
utils.CommonJS.addEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = utils.CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.addEventListener(eventType,eventHandler,useCapture);
	}
}
utils.CommonJS.removeEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = utils.CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.removeEventListener(eventType,eventHandler,useCapture);
	}
}
utils.CommonJS.getComputedStyle = function(element,style) {
	var computedStyle;
	var htmlDocument = utils.CommonJS.getHtmlDocument();
	if(element.currentStyle != null) computedStyle = element.currentStyle; else computedStyle = htmlDocument.defaultView.getComputedStyle(element,null);
	return computedStyle.getPropertyValue(style);
}
utils.CommonJS.setDropDown = function(element,value) {
	var _g1 = 0, _g = element.options.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(element.options.item(i).value == value) {
			element.options.item(i).selected = true;
			break;
		}
	}
}
utils.CommonJS.prototype.getCSSPositionAsInt = function(value) {
	return Std.parseInt(StringTools.replace(value,"px",""));
}
utils.CommonJS.prototype.__class__ = utils.CommonJS;
realtime.cloud.visualisation.Point = function(x,y) {
	if( x === $_ ) return;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this.x = x;
	this.y = y;
}
realtime.cloud.visualisation.Point.__name__ = ["realtime","cloud","visualisation","Point"];
realtime.cloud.visualisation.Point.distance = function(startPoint,endPoint) {
	var distanceX = endPoint.x - startPoint.x;
	var distanceY = endPoint.y - startPoint.y;
	return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
}
realtime.cloud.visualisation.Point.prototype.x = null;
realtime.cloud.visualisation.Point.prototype.y = null;
realtime.cloud.visualisation.Point.prototype.clone = function() {
	return new realtime.cloud.visualisation.Point(this.x,this.y);
}
realtime.cloud.visualisation.Point.prototype.__class__ = realtime.cloud.visualisation.Point;
Website = function(p) {
	if( p === $_ ) return;
	this.stage = new realtime.cloud.Stage();
}
Website.__name__ = ["Website"];
Website.instance = null;
Website.main = function() {
	haxe.Log.trace = Website.log;
	Website.instance = new Website();
}
Website.log = function(v,pos) {
	var console = Reflect.field(js.Lib.window,"console");
	console.log("%s->%s->%s->line(%s) : %o \n",pos.fileName,pos.className,pos.methodName,pos.lineNumber,v);
}
Website.startApplication = function() {
	if(Website.instance.firstRun != true) {
		Website.instance.firstRun = true;
		Website.instance.application = new realtime.cloud.Application(Website.instance.stage);
	}
}
Website.prototype.firstRun = null;
Website.prototype.stage = null;
Website.prototype.application = null;
Website.prototype.__class__ = Website;
if(!realtime.cloud.data) realtime.cloud.data = {}
realtime.cloud.data.Asset = function(p) {
	if( p === $_ ) return;
	this.request = new utils.http.HttpLoaderRequest();
	this.path = "";
	this.view = "";
}
realtime.cloud.data.Asset.__name__ = ["realtime","cloud","data","Asset"];
realtime.cloud.data.Asset.prototype.path = null;
realtime.cloud.data.Asset.prototype.view = null;
realtime.cloud.data.Asset.prototype.title = null;
realtime.cloud.data.Asset.prototype.request = null;
realtime.cloud.data.Asset.prototype.overrideMimeType = function(contentType) {
	this.request.httpRequest.overrideMimeType(contentType);
}
realtime.cloud.data.Asset.prototype.getResponseText = function() {
	return this.request.httpRequest.getResponseText();
}
realtime.cloud.data.Asset.prototype.getResponseXML = function() {
	return this.request.httpRequest.getResponseXML();
}
realtime.cloud.data.Asset.prototype.__class__ = realtime.cloud.data.Asset;
xirsys.cube.events.IEvent = function() { }
xirsys.cube.events.IEvent.__name__ = ["xirsys","cube","events","IEvent"];
xirsys.cube.events.IEvent.prototype.__class__ = xirsys.cube.events.IEvent;
if(!realtime.cloud.events) realtime.cloud.events = {}
realtime.cloud.events.UrlAddressEvent = function(p) {
	if( p === $_ ) return;
	this.type = "";
	this.target = "";
	this.path = "";
	this.value = "";
	this.pathNames = new Array();
	this.parameterNames = new Array();
	this.parameters = new Hash();
}
realtime.cloud.events.UrlAddressEvent.__name__ = ["realtime","cloud","events","UrlAddressEvent"];
realtime.cloud.events.UrlAddressEvent.prototype.type = null;
realtime.cloud.events.UrlAddressEvent.prototype.target = null;
realtime.cloud.events.UrlAddressEvent.prototype.value = null;
realtime.cloud.events.UrlAddressEvent.prototype.path = null;
realtime.cloud.events.UrlAddressEvent.prototype.pathNames = null;
realtime.cloud.events.UrlAddressEvent.prototype.parameters = null;
realtime.cloud.events.UrlAddressEvent.prototype.parameterNames = null;
realtime.cloud.events.UrlAddressEvent.prototype.__class__ = realtime.cloud.events.UrlAddressEvent;
realtime.cloud.events.UrlAddressEvent.__interfaces__ = [xirsys.cube.events.IEvent];
realtime.cloud.mediator.PageNotFoundMediator = function(p) {
	if( p === $_ ) return;
	realtime.cloud.mediator.BaseMediator.call(this);
}
realtime.cloud.mediator.PageNotFoundMediator.__name__ = ["realtime","cloud","mediator","PageNotFoundMediator"];
realtime.cloud.mediator.PageNotFoundMediator.__super__ = realtime.cloud.mediator.BaseMediator;
for(var k in realtime.cloud.mediator.BaseMediator.prototype ) realtime.cloud.mediator.PageNotFoundMediator.prototype[k] = realtime.cloud.mediator.BaseMediator.prototype[k];
realtime.cloud.mediator.PageNotFoundMediator.prototype.view = null;
realtime.cloud.mediator.PageNotFoundMediator.prototype.onRegister = function() {
	this.setInstanceOfView(this.view);
	realtime.cloud.mediator.BaseMediator.prototype.onRegister.call(this);
}
realtime.cloud.mediator.PageNotFoundMediator.prototype.__class__ = realtime.cloud.mediator.PageNotFoundMediator;
if(typeof js=='undefined') js = {}
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
xirsys.cube.abstract.IMediatorMap = function() { }
xirsys.cube.abstract.IMediatorMap.__name__ = ["xirsys","cube","abstract","IMediatorMap"];
xirsys.cube.abstract.IMediatorMap.prototype.mapView = null;
xirsys.cube.abstract.IMediatorMap.prototype.unmapView = null;
xirsys.cube.abstract.IMediatorMap.prototype.createMediator = null;
xirsys.cube.abstract.IMediatorMap.prototype.registerMediator = null;
xirsys.cube.abstract.IMediatorMap.prototype.removeMediator = null;
xirsys.cube.abstract.IMediatorMap.prototype.removeMediatorByView = null;
xirsys.cube.abstract.IMediatorMap.prototype.retrieveMediator = null;
xirsys.cube.abstract.IMediatorMap.prototype.hasMediatorForView = null;
xirsys.cube.abstract.IMediatorMap.prototype.hasMediator = null;
xirsys.cube.abstract.IMediatorMap.prototype.__class__ = xirsys.cube.abstract.IMediatorMap;
xirsys.cube.core.MediatorMap = function(container,eventDispatcher,injector) {
	if( container === $_ ) return;
	xirsys.cube.core.MapBase.call(this,container,injector);
	this.eventDispatcher = eventDispatcher;
	this.mappingConfigByViewClassName = new Hash();
	this.mediatorByView = new Array();
}
xirsys.cube.core.MediatorMap.__name__ = ["xirsys","cube","core","MediatorMap"];
xirsys.cube.core.MediatorMap.__super__ = xirsys.cube.core.MapBase;
for(var k in xirsys.cube.core.MapBase.prototype ) xirsys.cube.core.MediatorMap.prototype[k] = xirsys.cube.core.MapBase.prototype[k];
xirsys.cube.core.MediatorMap.prototype.mappingConfigByViewClassName = null;
xirsys.cube.core.MediatorMap.prototype.mediatorByView = null;
xirsys.cube.core.MediatorMap.prototype.mediatorsMarkedForRemoval = null;
xirsys.cube.core.MediatorMap.prototype.eventDispatcher = null;
xirsys.cube.core.MediatorMap.prototype.mapView = function(viewClass,mediatorClass,autoCreate,autoRemove) {
	if(autoRemove == null) autoRemove = true;
	if(autoCreate == null) autoCreate = true;
	var viewClassName = Type.getClassName(viewClass);
	var config = { mediatorClass : mediatorClass, autoCreate : autoCreate, autoRemove : autoRemove, typedViewClasses : [viewClass]};
	this.mappingConfigByViewClassName.set(viewClassName,config);
	if(autoCreate && this.getContainer() != null && viewClassName == Type.getClassName(Type.getClass(this.getContainer()))) this.createMediator(this.getContainer());
	this.activate();
}
xirsys.cube.core.MediatorMap.prototype.unmapView = function(viewClass) {
	var viewClassName = Type.getClassName(viewClass);
	this.mappingConfigByViewClassName.remove(viewClassName);
}
xirsys.cube.core.MediatorMap.prototype.createMediator = function(viewComponent) {
	var mediator = this.getMediatorByView(viewComponent);
	if(mediator == null) {
		var viewClassName = Type.getClassName(Type.getClass(viewComponent));
		var config = this.mappingConfigByViewClassName.get(viewClassName);
		if(config != null) {
			var _g = 0, _g1 = config.typedViewClasses;
			while(_g < _g1.length) {
				var cls = _g1[_g];
				++_g;
				try {
					this.injector.mapInstance(cls,viewComponent);
					mediator = this.injector.instantiate(config.mediatorClass);
				} catch( e ) {
					if( js.Boot.__instanceof(e,xirsys.injector.exceptions.InjectorException) ) {
						haxe.Log.trace(e.msg,{ fileName : "MediatorMap.hx", lineNumber : 107, className : "xirsys.cube.core.MediatorMap", methodName : "createMediator"});
					} else throw(e);
				}
			}
			var _g = 0, _g1 = config.typedViewClasses;
			while(_g < _g1.length) {
				var cls = _g1[_g];
				++_g;
				this.injector.unmap(cls);
			}
			this.registerMediator(viewComponent,mediator);
		}
	}
	if(mediator != null) mediator.mediatorMap = this;
	return mediator;
}
xirsys.cube.core.MediatorMap.prototype.registerMediator = function(viewComponent,mediator) {
	this.injector.mapInstance(Type.getClass(mediator),mediator);
	this.setMediatorByView(viewComponent,mediator);
	mediator.setViewComponent(viewComponent);
	mediator.preRegister();
}
xirsys.cube.core.MediatorMap.prototype.removeMediator = function(mediator) {
	if(mediator != null) {
		var viewComponent = mediator.getViewComponent();
		this.deleteMediatorByView(viewComponent);
		this.mappingConfigByViewClassName.remove(Type.getClassName(Type.getClass(viewComponent)));
		mediator.preRemove();
		mediator.setViewComponent(null);
		this.injector.unmap(Type.getClass(mediator));
	}
	return mediator;
}
xirsys.cube.core.MediatorMap.prototype.removeMediatorByView = function(viewComponent) {
	return this.removeMediator(this.retrieveMediator(viewComponent));
}
xirsys.cube.core.MediatorMap.prototype.retrieveMediator = function(viewComponent) {
	return this.getMediatorByView(viewComponent);
}
xirsys.cube.core.MediatorMap.prototype.hasMediatorForView = function(viewComponent) {
	return this.getMediatorByView(viewComponent) != null;
}
xirsys.cube.core.MediatorMap.prototype.hasMediator = function(mediator) {
	var _g = 0, _g1 = this.mediatorByView;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.mediator == mediator) return true;
	}
	return false;
}
xirsys.cube.core.MediatorMap.prototype.getMediatorByView = function(view) {
	var _g = 0, _g1 = this.mediatorByView;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.view == view) return i.mediator;
	}
	return null;
}
xirsys.cube.core.MediatorMap.prototype.setMediatorByView = function(view,mediator) {
	var _g = 0, _g1 = this.mediatorByView;
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(i.view == view) return;
	}
	this.mediatorByView.push({ mediator : mediator, view : view});
}
xirsys.cube.core.MediatorMap.prototype.deleteMediatorByView = function(view) {
	var _g1 = 0, _g = this.mediatorByView.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this.mediatorByView[i].view == view) this.mediatorByView[i] = null;
	}
}
xirsys.cube.core.MediatorMap.prototype.__class__ = xirsys.cube.core.MediatorMap;
xirsys.cube.core.MediatorMap.__interfaces__ = [xirsys.cube.abstract.IMediatorMap];
realtime.cloud.view.PreloaderView = function(p) {
	if( p === $_ ) return;
	realtime.cloud.view.BaseView.call(this);
	this.viewName = "PreloaderView";
}
realtime.cloud.view.PreloaderView.__name__ = ["realtime","cloud","view","PreloaderView"];
realtime.cloud.view.PreloaderView.__super__ = realtime.cloud.view.BaseView;
for(var k in realtime.cloud.view.BaseView.prototype ) realtime.cloud.view.PreloaderView.prototype[k] = realtime.cloud.view.BaseView.prototype[k];
realtime.cloud.view.PreloaderView.prototype.updateTimer = null;
realtime.cloud.view.PreloaderView.prototype.updateFrequency = null;
realtime.cloud.view.PreloaderView.prototype.percentageDownloaded = null;
realtime.cloud.view.PreloaderView.prototype.renderedPercentage = null;
realtime.cloud.view.PreloaderView.prototype.activate = function() {
	this.updateFrequency = 25;
	this.updateTimer = new haxe.Timer(this.updateFrequency);
	this.percentageDownloaded = 0;
	this.renderedPercentage = 0;
	this.updateTimer.run = $closure(this,"renderProgress");
	realtime.cloud.view.BaseView.prototype.activate.call(this);
}
realtime.cloud.view.PreloaderView.prototype.deactivate = function() {
	this.renderProgress();
	this.updateTimer.run = null;
	this.updateTimer.stop();
	this.updateTimer = null;
	realtime.cloud.view.BaseView.prototype.deactivate.call(this);
}
realtime.cloud.view.PreloaderView.prototype.transitionIn = function(event) {
	this.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,event);
}
realtime.cloud.view.PreloaderView.prototype.transitionOut = function(event) {
	var me = this;
	var title = utils.CommonJS.get("h1");
	var progressInfo = utils.CommonJS.get(".progress-info");
	var footer = utils.CommonJS.get("footer");
	Firmin.animate(footer,{ opacity : 0, timingFunction : "ease-out"},"250ms",function(element) {
		Firmin.animate(progressInfo,{ opacity : 0, timingFunction : "ease-out"},"250ms",function(element1) {
			Firmin.animate(title,{ opacity : 0, timingFunction : "ease-out"},"250ms",function(element2) {
				me.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,event);
			});
		});
	});
}
realtime.cloud.view.PreloaderView.prototype.updateProgress = function(event) {
	this.percentageDownloaded = Math.round(event.precentage);
}
realtime.cloud.view.PreloaderView.prototype.renderProgress = function() {
	if(this.renderedPercentage <= this.percentageDownloaded) {
		var valueArray = Std.string(this.renderedPercentage).split("");
		var valueOne = valueArray[0];
		var valueTwo = valueArray[1];
		if(this.renderedPercentage >= 99) {
			valueOne = "9";
			valueTwo = "9";
		} else if(this.renderedPercentage < 10) {
			valueOne = "0";
			valueTwo = valueArray[0];
		}
		var labelValueOne = utils.CommonJS.get(".progress-info .value-one");
		var labelValueTwo = utils.CommonJS.get(".progress-info .value-two");
		labelValueOne.innerHTML = valueOne;
		labelValueTwo.innerHTML = valueTwo;
		this.renderedPercentage += 1;
	}
	if(this.renderedPercentage == 100) {
		this.updateTimer.stop();
		var viewEvent = new realtime.cloud.events.ViewEvent();
		viewEvent.path = realtime.cloud.Configuration.HOME_VIEW;
		this.dispatch(realtime.cloud.events.ViewEvent.CHANGE,viewEvent);
	}
}
realtime.cloud.view.PreloaderView.prototype.__class__ = realtime.cloud.view.PreloaderView;
realtime.cloud.view.PreloaderView.__interfaces__ = [realtime.cloud.view.IView];
realtime.cloud.mediator.HomeMediator = function(p) {
	if( p === $_ ) return;
	realtime.cloud.mediator.BaseMediator.call(this);
}
realtime.cloud.mediator.HomeMediator.__name__ = ["realtime","cloud","mediator","HomeMediator"];
realtime.cloud.mediator.HomeMediator.__super__ = realtime.cloud.mediator.BaseMediator;
for(var k in realtime.cloud.mediator.BaseMediator.prototype ) realtime.cloud.mediator.HomeMediator.prototype[k] = realtime.cloud.mediator.BaseMediator.prototype[k];
realtime.cloud.mediator.HomeMediator.prototype.view = null;
realtime.cloud.mediator.HomeMediator.prototype.onRegister = function() {
	this.setInstanceOfView(this.view);
	realtime.cloud.mediator.BaseMediator.prototype.onRegister.call(this);
}
realtime.cloud.mediator.HomeMediator.prototype.__class__ = realtime.cloud.mediator.HomeMediator;
xirsys.cube.abstract.IProxy = function() { }
xirsys.cube.abstract.IProxy.__name__ = ["xirsys","cube","abstract","IProxy"];
xirsys.cube.abstract.IProxy.prototype.eventDispatcher = null;
xirsys.cube.abstract.IProxy.prototype.injector = null;
xirsys.cube.abstract.IProxy.prototype.register = null;
xirsys.cube.abstract.IProxy.prototype.__class__ = xirsys.cube.abstract.IProxy;
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
xirsys.cube.abstract.ICommandMap = function() { }
xirsys.cube.abstract.ICommandMap.__name__ = ["xirsys","cube","abstract","ICommandMap"];
xirsys.cube.abstract.ICommandMap.prototype.eventDispatcher = null;
xirsys.cube.abstract.ICommandMap.prototype.injector = null;
xirsys.cube.abstract.ICommandMap.prototype.eventTypeMap = null;
xirsys.cube.abstract.ICommandMap.prototype.verifiedCommandClasses = null;
xirsys.cube.abstract.ICommandMap.prototype.mapEvent = null;
xirsys.cube.abstract.ICommandMap.prototype.unmapEvent = null;
xirsys.cube.abstract.ICommandMap.prototype.unmapEvents = null;
xirsys.cube.abstract.ICommandMap.prototype.hasEventCommand = null;
xirsys.cube.abstract.ICommandMap.prototype.execute = null;
xirsys.cube.abstract.ICommandMap.prototype.__class__ = xirsys.cube.abstract.ICommandMap;
xirsys.cube.abstract.IEventMap = function() { }
xirsys.cube.abstract.IEventMap.__name__ = ["xirsys","cube","abstract","IEventMap"];
xirsys.cube.abstract.IEventMap.prototype.unmapListeners = null;
xirsys.cube.abstract.IEventMap.prototype.routeEventToListener = null;
xirsys.cube.abstract.IEventMap.prototype.__class__ = xirsys.cube.abstract.IEventMap;
xirsys.injector.MapTypes = { __ename__ : ["xirsys","injector","MapTypes"], __constructs__ : ["InstanceType","ClassType","SingletonType"] }
xirsys.injector.MapTypes.InstanceType = ["InstanceType",0];
xirsys.injector.MapTypes.InstanceType.toString = $estr;
xirsys.injector.MapTypes.InstanceType.__enum__ = xirsys.injector.MapTypes;
xirsys.injector.MapTypes.ClassType = ["ClassType",1];
xirsys.injector.MapTypes.ClassType.toString = $estr;
xirsys.injector.MapTypes.ClassType.__enum__ = xirsys.injector.MapTypes;
xirsys.injector.MapTypes.SingletonType = ["SingletonType",2];
xirsys.injector.MapTypes.SingletonType.toString = $estr;
xirsys.injector.MapTypes.SingletonType.__enum__ = xirsys.injector.MapTypes;
xirsys.injector.Injector = function(p) {
	if( p === $_ ) return;
	this._mappings = new Hash();
	this._singletons = new Hash();
	this._injectees = new Hash();
}
xirsys.injector.Injector.__name__ = ["xirsys","injector","Injector"];
xirsys.injector.Injector.prototype._mappings = null;
xirsys.injector.Injector.prototype._singletons = null;
xirsys.injector.Injector.prototype._injectees = null;
xirsys.injector.Injector.prototype.mapInstance = function(type,inst) {
	var name = Type.getClassName(type);
	if(this._mappings == null) this._mappings = new Hash();
	var mapping = { name : name, map : inst, mapType : xirsys.injector.MapTypes.InstanceType};
	this._mappings.set(name,mapping);
	return mapping;
}
xirsys.injector.Injector.prototype.mapClass = function(type,inst) {
	var name = Type.getClassName(type);
	if(this._mappings == null) this._mappings = new Hash();
	if(this._mappings.exists(name)) throw new xirsys.injector.exceptions.InjectorException("Class type already mapped",{ fileName : "Injector.hx", lineNumber : 78, className : "xirsys.injector.Injector", methodName : "mapClass"});
	var mapping = { name : name, map : inst, mapType : xirsys.injector.MapTypes.ClassType};
	this._mappings.set(name,mapping);
	return mapping;
}
xirsys.injector.Injector.prototype.mapSingleton = function(type,forSingleton) {
	var name = Type.getClassName(type);
	if(this._mappings == null) this._mappings = new Hash();
	if(this._singletons == null) this._singletons = new Hash();
	if(this._mappings.exists(name)) throw new xirsys.injector.exceptions.InjectorException("Singleton already mapped",{ fileName : "Injector.hx", lineNumber : 90, className : "xirsys.injector.Injector", methodName : "mapSingleton"});
	var mapClass = forSingleton == null?type:forSingleton;
	var fnd = null, inst = null, injectSingleton = false;
	var clsName = Type.getClassName(mapClass);
	if(!this._singletons.exists(clsName)) {
		inst = this.instantiate(mapClass,true);
		this._singletons.set(clsName,inst);
		injectSingleton = true;
	}
	var map = this._singletons.get(clsName);
	var mapping = { name : name, map : map, mapType : xirsys.injector.MapTypes.SingletonType};
	this._mappings.set(name,mapping);
	if(injectSingleton) this.applyInjection(inst);
	return mapping;
}
xirsys.injector.Injector.prototype.inject = function(inst) {
	this.applyInjection(inst);
}
xirsys.injector.Injector.prototype.applyInjection = function(inst,recursive) {
	if(recursive == null) recursive = false;
	var cls = Type.getClass(inst);
	this.applyInjectionToClass(inst,cls,recursive);
}
xirsys.injector.Injector.prototype.applyInjectionToClass = function(inst,cls,recursive,recurred) {
	if(recurred == null) recurred = false;
	if(cls == null) return;
	if(this._injectees == null) this._injectees = new Hash();
	var clsName = Type.getClassName(cls);
	if(!this._injectees.exists(clsName)) this._injectees.set(clsName,true);
	var datas = haxe.rtti.Meta.getFields(cls);
	var _g = 0, _g1 = Reflect.fields(datas);
	while(_g < _g1.length) {
		var fld = _g1[_g];
		++_g;
		if(Reflect.hasField(Reflect.field(datas,fld),"Inject")) {
			var rtti = cls.__rtti;
			if(rtti == null) return;
			var x = Xml.parse(rtti).firstElement();
			var infos = new haxe.rtti.XmlParser().processElement(x);
			var iCls = this.getClassFields(cls).get(fld).type.slice(2)[0];
			if(!this._mappings.exists(iCls)) throw new xirsys.injector.exceptions.InjectorException("Class type not mapped for field " + fld + " in class " + clsName,{ fileName : "Injector.hx", lineNumber : 138, className : "xirsys.injector.Injector", methodName : "applyInjectionToClass"}); else {
				var mapping = this._mappings.get(iCls);
				switch( (mapping.mapType)[1] ) {
				case 0:
				case 2:
					inst[fld] = mapping.map;
					break;
				case 1:
					inst[fld] = this.instantiate(mapping.map);
					break;
				}
			}
		}
	}
	if(recursive) this.applyInjectionToClass(inst,Type.getSuperClass(cls),recursive,true);
}
xirsys.injector.Injector.prototype.getInstance = function(type) {
	var cls = Type.getClassName(type);
	var obj;
	if(this._mappings.exists(cls)) {
		var map = this._mappings.get(cls);
		switch( (map.mapType)[1] ) {
		case 1:
			throw new xirsys.injector.exceptions.InjectorException("Unable to return map instance of type Class.",{ fileName : "Injector.hx", lineNumber : 165, className : "xirsys.injector.Injector", methodName : "getInstance"});
			break;
		default:
			obj = map.map;
		}
	} else throw new xirsys.injector.exceptions.InjectorException("No mapping exists for class " + cls,{ fileName : "Injector.hx", lineNumber : 171, className : "xirsys.injector.Injector", methodName : "getInstance"});
	return obj;
}
xirsys.injector.Injector.prototype.getMap = function(type) {
	var cls = Type.getClassName(type);
	return this.hasMap(type)?this._mappings.get(cls):null;
}
xirsys.injector.Injector.prototype.hasMap = function(type) {
	var cls = Type.getClassName(type);
	return this._mappings.exists(cls);
}
xirsys.injector.Injector.prototype.unmap = function(type) {
	if(this.hasMap(type)) {
		var cls = Type.getClassName(type);
		this._mappings.remove(cls);
	}
}
xirsys.injector.Injector.prototype.instantiate = function(type,preventInjection) {
	if(preventInjection == null) preventInjection = false;
	var inst = Type.createInstance(type,[]);
	if(!preventInjection) this.applyInjection(inst,true);
	return inst;
}
xirsys.injector.Injector.prototype.getClassFields = function(cls) {
	return this.unifyFields(this.getClassDef(cls));
}
xirsys.injector.Injector.prototype.unifyFields = function(cls,h) {
	if(h == null) h = new Hash();
	var $it0 = cls.fields.iterator();
	while( $it0.hasNext() ) {
		var f = $it0.next();
		if(!h.exists(f.name)) h.set(f.name,f);
	}
	var parent = cls.superClass;
	if(parent != null) {
		var c = this.getClassDef(Type.resolveClass(parent.path));
		if(c != null) this.unifyFields(c,h);
	}
	return h;
}
xirsys.injector.Injector.prototype.getClassDef = function(cls) {
	var x = Xml.parse(cls.__rtti).firstElement();
	var infos = new haxe.rtti.XmlParser().processElement(x);
	return infos[0] == "TClassdecl"?infos.slice(2)[0]:null;
}
xirsys.injector.Injector.prototype.__class__ = xirsys.injector.Injector;
CommonJS = function() { }
CommonJS.__name__ = ["CommonJS"];
CommonJS.getWindow = function() {
	var window = window;
	return window;
}
CommonJS.getHtmlDocument = function() {
	var htmlDocument = document;
	return htmlDocument;
}
CommonJS.newElement = function(elementType,htmlElement) {
	var htmlDocument = CommonJS.getHtmlDocument();
	if(htmlElement == null) htmlElement = htmlDocument.body;
	return htmlElement.createElement(elementType);
}
CommonJS.get = function(domSelection) {
	var htmlDocument = CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelector(domSelection);
}
CommonJS.getAll = function(domSelection) {
	var htmlDocument = CommonJS.getHtmlDocument();
	return htmlDocument.body.querySelectorAll(domSelection);
}
CommonJS.stopEventPropergation = function(event) {
	if(event.stopPropagation != null) event.stopPropagation(); else if(event.cancelBubble != null) event.cancelBubble = true;
	if(event.preventDefault != null) event.preventDefault(); else if(event.returnValue != null) event.returnValue = false;
}
CommonJS.addEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.addEventListener(eventType,eventHandler,useCapture);
	}
}
CommonJS.removeEventListener = function(domSelection,eventType,eventHandler,useCapture) {
	if(useCapture == null) useCapture = true;
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.removeEventListener(eventType,eventHandler,useCapture);
	}
}
CommonJS.getComputedStyle = function(element,style) {
	var computedStyle;
	var htmlDocument = CommonJS.getHtmlDocument();
	if(element.currentStyle != null) computedStyle = element.currentStyle; else computedStyle = htmlDocument.defaultView.getComputedStyle(element,null);
	return computedStyle.getPropertyValue(style);
}
CommonJS.setStyle = function(domSelection,cssStyle,value) {
	var nodeList = CommonJS.getAll(domSelection);
	var _g1 = 0, _g = nodeList.length;
	while(_g1 < _g) {
		var i = _g1++;
		var element = nodeList[i];
		element.style[cssStyle] = value;
	}
}
CommonJS.prototype.__class__ = CommonJS;
xirsys.cube.core.Agent = function(container,autoStart) {
	if( container === $_ ) return;
	xirsys.cube.events.CentralDispatcher.call(this);
	this._container = container;
	this._autoStart = autoStart;
	this.eventDispatcher = new xirsys.cube.events.CentralDispatcher();
	this.bindMappings();
	if(this._autoStart) this.initiate();
}
xirsys.cube.core.Agent.__name__ = ["xirsys","cube","core","Agent"];
xirsys.cube.core.Agent.__super__ = xirsys.cube.events.CentralDispatcher;
for(var k in xirsys.cube.events.CentralDispatcher.prototype ) xirsys.cube.core.Agent.prototype[k] = xirsys.cube.events.CentralDispatcher.prototype[k];
xirsys.cube.core.Agent.prototype.eventDispatcher = null;
xirsys.cube.core.Agent.prototype.container = null;
xirsys.cube.core.Agent.prototype.injector = null;
xirsys.cube.core.Agent.prototype.commandMap = null;
xirsys.cube.core.Agent.prototype.mediatorMap = null;
xirsys.cube.core.Agent.prototype.viewMap = null;
xirsys.cube.core.Agent.prototype.proxy = null;
xirsys.cube.core.Agent.prototype._container = null;
xirsys.cube.core.Agent.prototype._autoStart = null;
xirsys.cube.core.Agent.prototype._injector = null;
xirsys.cube.core.Agent.prototype._commandMap = null;
xirsys.cube.core.Agent.prototype._mediatorMap = null;
xirsys.cube.core.Agent.prototype._viewMap = null;
xirsys.cube.core.Agent.prototype._proxy = null;
xirsys.cube.core.Agent.prototype.initiate = function() {
	this.dispatch(xirsys.cube.events.AgentEvent.STARTUP_COMPLETE,null);
}
xirsys.cube.core.Agent.prototype.getContainer = function() {
	return this._container;
}
xirsys.cube.core.Agent.prototype.getInjector = function() {
	return this._injector != null?this._injector:this._injector = new xirsys.injector.Injector();
}
xirsys.cube.core.Agent.prototype.setInjector = function(value) {
	return this._injector = value;
}
xirsys.cube.core.Agent.prototype.getCommandMap = function() {
	return this._commandMap != null?this._commandMap:this._commandMap = new xirsys.cube.core.CommandMap(this.eventDispatcher,this.getInjector());
}
xirsys.cube.core.Agent.prototype.setCommandMap = function(value) {
	return this._commandMap = value;
}
xirsys.cube.core.Agent.prototype.getMediatorMap = function() {
	return this._mediatorMap != null?this._mediatorMap:this._mediatorMap = new xirsys.cube.core.MediatorMap(this._container,this.eventDispatcher,this.getInjector());
}
xirsys.cube.core.Agent.prototype.setMediatorMap = function(value) {
	return this._mediatorMap = value;
}
xirsys.cube.core.Agent.prototype.getViewMap = function() {
	return this._viewMap != null?this._viewMap:(function($this) {
		var $r;
		$this._viewMap = new xirsys.cube.core.ViewMap($this._container,$this.eventDispatcher,$this.getInjector());
		$r = $this._viewMap;
		return $r;
	}(this));
}
xirsys.cube.core.Agent.prototype.setViewMap = function(value) {
	return this._viewMap = value;
}
xirsys.cube.core.Agent.prototype.getProxy = function() {
	return this._proxy != null?this.proxy:(function($this) {
		var $r;
		$this.proxy = new xirsys.cube.core.Proxy($this.eventDispatcher,$this.getInjector());
		$r = $this.proxy;
		return $r;
	}(this));
}
xirsys.cube.core.Agent.prototype.bindMappings = function() {
	this.getInjector().mapInstance(xirsys.cube.abstract.ICentralDispatcher,this.eventDispatcher);
	this.getInjector().mapSingleton(xirsys.injector.Injector);
	this.getInjector().mapInstance(xirsys.cube.abstract.ICommandMap,this._commandMap);
	this.getInjector().mapInstance(xirsys.cube.abstract.IMediatorMap,this._mediatorMap);
	this.getInjector().mapInstance(xirsys.cube.abstract.IViewMap,this._viewMap);
	this.getInjector().mapInstance(xirsys.cube.abstract.IProxy,this._proxy);
}
xirsys.cube.core.Agent.prototype.__class__ = xirsys.cube.core.Agent;
realtime.cloud.Context = function(stage,autoStart) {
	if( stage === $_ ) return;
	this.viewManager = new realtime.cloud.model.ViewManager();
	this.urlAddressService = new realtime.cloud.service.UrlAddressService();
	this.loaderService = new realtime.cloud.service.LoaderService();
	xirsys.cube.core.Agent.call(this,stage,autoStart);
}
realtime.cloud.Context.__name__ = ["realtime","cloud","Context"];
realtime.cloud.Context.__super__ = xirsys.cube.core.Agent;
for(var k in xirsys.cube.core.Agent.prototype ) realtime.cloud.Context.prototype[k] = xirsys.cube.core.Agent.prototype[k];
realtime.cloud.Context.prototype.urlAddressService = null;
realtime.cloud.Context.prototype.loaderService = null;
realtime.cloud.Context.prototype.viewManager = null;
realtime.cloud.Context.prototype.initiate = function() {
	this.getInjector().mapInstance(realtime.cloud.model.ViewManager,this.viewManager);
	this.viewManager.eventDispatcher = this.eventDispatcher;
	this.getInjector().mapInstance(realtime.cloud.service.LoaderService,this.loaderService);
	this.loaderService.eventDispatcher = this.eventDispatcher;
	this.getInjector().mapInstance(realtime.cloud.service.UrlAddressService,this.urlAddressService);
	this.urlAddressService.eventDispatcher = this.eventDispatcher;
	this.getCommandMap().mapEvent(realtime.cloud.events.ViewEvent.CHANGE,realtime.cloud.commands.ChangeViewCommand,realtime.cloud.events.ViewEvent);
	this.getCommandMap().mapEvent(realtime.cloud.events.UrlAddressEvent.CHANGE,realtime.cloud.commands.UrlChangedCommand,realtime.cloud.events.UrlAddressEvent);
	this.getCommandMap().mapEvent(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,realtime.cloud.commands.TransitionInCommand,realtime.cloud.events.ViewEvent);
	this.getCommandMap().mapEvent(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,realtime.cloud.commands.TransitionOutCommand,realtime.cloud.events.ViewEvent);
	this.getCommandMap().mapEvent(realtime.cloud.events.LoaderInitialisationEvent.INITIALISE,realtime.cloud.commands.InitialiseLoaderCommand,realtime.cloud.events.LoaderInitialisationEvent);
	this.viewManager.configure(this);
	this.loaderService.configure(this);
	this.loaderService.addAsset("/~/","StartupView","Realtime Cloud","",null);
	this.dispatch(xirsys.cube.events.AgentEvent.STARTUP_COMPLETE,null);
}
realtime.cloud.Context.prototype.handleStartup = function(evt) {
	this.urlAddressService.setHistory(false);
	this.urlAddressService.enableInternalDispatching(false);
	this.urlAddressService.enableExternalDispatching(false);
	this.urlAddressService.setValue(realtime.cloud.Configuration.STARTUP_VIEW);
}
realtime.cloud.Context.prototype.__class__ = realtime.cloud.Context;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype.__class__ = Reflect;
if(typeof hxevents=='undefined') hxevents = {}
hxevents.EventException = { __ename__ : ["hxevents","EventException"], __constructs__ : ["StopPropagation"] }
hxevents.EventException.StopPropagation = ["StopPropagation",0];
hxevents.EventException.StopPropagation.toString = $estr;
hxevents.EventException.StopPropagation.__enum__ = hxevents.EventException;
utils.json.JSONParseError = function(message,location,text) {
	if( message === $_ ) return;
	if(text == null) text = "";
	if(location == null) location = 0;
	if(message == null) message = "";
	this.name = "JSONParseError";
	this._location = location;
	this._text = text;
	this.message = message;
}
utils.json.JSONParseError.__name__ = ["utils","json","JSONParseError"];
utils.json.JSONParseError.prototype._location = null;
utils.json.JSONParseError.prototype._text = null;
utils.json.JSONParseError.prototype.name = null;
utils.json.JSONParseError.prototype.text = null;
utils.json.JSONParseError.prototype.location = null;
utils.json.JSONParseError.prototype.message = null;
utils.json.JSONParseError.prototype.getlocation = function() {
	return this._location;
}
utils.json.JSONParseError.prototype.gettext = function() {
	return this._text;
}
utils.json.JSONParseError.prototype.toString = function() {
	return this.name + ": " + this.message + " at position: " + this._location + " near \"" + this._text + "\"";
}
utils.json.JSONParseError.prototype.__class__ = utils.json.JSONParseError;
realtime.cloud.visualisation.Visualisation = function(p) {
	if( p === $_ ) return;
	this.map = new realtime.cloud.visualisation.Rectangle();
	this.canvasRect = new realtime.cloud.visualisation.Rectangle();
	this.playhead = new realtime.cloud.visualisation.Playhead();
	this.isDragging = false;
	this.locations = new Array();
	this.fps = 5;
}
realtime.cloud.visualisation.Visualisation.__name__ = ["realtime","cloud","visualisation","Visualisation"];
realtime.cloud.visualisation.Visualisation.prototype.locations = null;
realtime.cloud.visualisation.Visualisation.prototype.context = null;
realtime.cloud.visualisation.Visualisation.prototype.canvas = null;
realtime.cloud.visualisation.Visualisation.prototype.canvasRect = null;
realtime.cloud.visualisation.Visualisation.prototype.playhead = null;
realtime.cloud.visualisation.Visualisation.prototype.isDragging = null;
realtime.cloud.visualisation.Visualisation.prototype.isMouseDown = null;
realtime.cloud.visualisation.Visualisation.prototype.map = null;
realtime.cloud.visualisation.Visualisation.prototype.mouseX = null;
realtime.cloud.visualisation.Visualisation.prototype.mouseY = null;
realtime.cloud.visualisation.Visualisation.prototype.timer = null;
realtime.cloud.visualisation.Visualisation.prototype.fps = null;
realtime.cloud.visualisation.Visualisation.prototype.activate = function() {
	this.timer = new haxe.Timer(Math.round(1000 / realtime.cloud.visualisation.Constants.FPS));
	this.timer.run = $closure(this,"render");
}
realtime.cloud.visualisation.Visualisation.prototype.deactivate = function() {
	this.timer.stop();
	this.timer.run = null;
}
realtime.cloud.visualisation.Visualisation.prototype.setCanvas = function(canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext("2d");
	this.canvasRect = new realtime.cloud.visualisation.Rectangle(0,0,960,410);
	this.map = new realtime.cloud.visualisation.Rectangle(0,0,960,410);
}
realtime.cloud.visualisation.Visualisation.prototype.setSpeed = function(fps) {
	if(fps == null) fps = 5;
	this.fps = fps;
}
realtime.cloud.visualisation.Visualisation.prototype.updateCoordinate = function(index,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(index == null) index = 0;
	this.locations[index].x = x;
	this.locations[index].x = y;
}
realtime.cloud.visualisation.Visualisation.prototype.createCoordinate = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	var node = new realtime.cloud.visualisation.CoordinatePoint();
	node.x = x;
	node.y = y;
	if(this.locations.length == 0) this.playhead.add(new realtime.cloud.visualisation.PlayheadPosition(node.x,node.y,node.x,node.y,1));
	this.locations.push(node);
}
realtime.cloud.visualisation.Visualisation.prototype.getCoordinates = function() {
	var coordinates = new Array();
	var _g1 = 0, _g = this.locations.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = this.locations[i];
		coordinates.push({ x : node.x, y : node.y, index : i});
	}
	return { coordinates : coordinates, userID : ""};
}
realtime.cloud.visualisation.Visualisation.prototype.render = function() {
	this.context.clearRect(this.canvasRect.x,this.canvasRect.y,this.canvasRect.width,this.canvasRect.height);
	var radialGradient = this.context.createRadialGradient(0,0,0,0,0,0);
	var particle = new realtime.cloud.visualisation.Particle();
	var locationsLength = this.locations.length;
	var colour = new realtime.cloud.visualisation.Colour();
	var deadCoordinatePoints = new Array();
	var moveToX;
	var moveToY;
	var bezierCPX;
	var bezierCPY;
	var bezierX;
	var bezierY;
	var _g = 0;
	while(_g < locationsLength) {
		var i = _g++;
		var node = this.locations[i];
		if(node.particles.length > 0) {
			var _g2 = 0, _g1 = node.particles.length;
			while(_g2 < _g1) {
				var p = _g2++;
				var particle1 = node.particles[p];
				if(Math.random() < realtime.cloud.visualisation.Constants.PRECENTAGE_TO_MOVE_PARTICLE) {
					particle1.rotation += particle1.velocity.rotation;
					particle1.x += particle1.velocity.x;
					particle1.y += particle1.velocity.y;
					particle1.velocity.x *= 0.98;
					particle1.velocity.y *= 0.98;
					this.context.beginPath();
					var particleX = particle1.x + Math.cos(particle1.rotation) * particle1.rotationRadius;
					var particleY = particle1.y + Math.sin(particle1.rotation) * particle1.rotationRadius;
					this.context.fillStyle = "rgba(" + node.colour.red + "," + node.colour.green + "," + node.colour.blue + "," + realtime.cloud.visualisation.Constants.PARTICLES_COLOUR_ALPHA + ")";
					this.context.arc(particleX,particleY,Math.max(node.scale,realtime.cloud.visualisation.Constants.PARTICLES_ALPHA),0,Math.PI * 2,true);
					this.context.fill();
				}
			}
			if(Math.random() < realtime.cloud.visualisation.Constants.PRECENTAGE_TO_REMOVE_PARTICLE) node.particles.shift();
			while(node.particles.length > realtime.cloud.visualisation.Constants.MAX_PARTICLES) node.particles.shift();
			this.context.fillStyle = "#ffffff";
		}
		node.scale = 0;
		node.scale += Math.max(Math.min(node.y / (this.map.y + this.map.height),1),0);
		node.scale = Math.max(node.scale,0.2);
		node.reflection.x = node.x;
		node.reflection.y = Math.max(node.y + (realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT - realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT * node.scale),realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT);
		var reflectionScale = 1 - Math.max((node.y - realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT) / (this.canvasRect.height - realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT),0);
		var reflectionWidth = this.map.x * reflectionScale;
		var xScale = 0;
		if(node.x < reflectionWidth) {
			xScale = 1 - node.x / reflectionWidth;
			node.scale += xScale;
			node.reflection.y += (this.canvasRect.height - node.y) * reflectionWidth * xScale;
		} else if(node.x > this.canvasRect.width - reflectionWidth) {
			xScale = (node.x - this.canvasRect.width + reflectionWidth) / (this.canvasRect.width - this.canvasRect.width + reflectionWidth);
			node.scale += xScale;
			node.reflection.y += (this.canvasRect.height - node.y) * node.scale * xScale;
		}
		node.scale = Math.min(Math.max(node.scale,0),1);
		reflectionScale = 1 - Math.max((node.reflection.y - realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT) / (this.canvasRect.height - realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT),0);
		reflectionWidth = this.map.x * reflectionScale;
		node.reflection.x = Math.max(Math.min(node.reflection.x,this.canvasRect.width - reflectionWidth),reflectionWidth);
		radialGradient = this.context.createRadialGradient(node.x,node.y,0,node.x,node.y,node.size.current);
		radialGradient.addColorStop(0,"rgba(" + node.colour.red + "," + node.colour.green + "," + node.colour.blue + "," + node.colour.alpha + ")");
		radialGradient.addColorStop(1,"rgba(" + node.colour.red + "," + node.colour.green + "," + node.colour.blue + "," + node.colour.alpha * realtime.cloud.visualisation.Constants.NODE_ALPHA + ")");
		node.size.current += (node.size.target - node.size.current) * 0.2;
		var worldCenterX = this.canvasRect.width / 2;
		node.colour.red = 1;
		node.colour.green = 1;
		node.colour.blue = 1;
	}
	while(deadCoordinatePoints.length > 0) this.locations.splice(deadCoordinatePoints.pop(),1);
	if(this.locations.length > 1) {
		if(this.playhead.index > this.locations.length - 1) this.playhead.index = 0;
		var attractor = this.locations[this.playhead.index];
		this.playhead.color = attractor.colour;
		if(attractor.x < 0 || attractor.x > this.canvasRect.width || attractor.y < 0 || attractor.y > this.canvasRect.height) this.playhead.index = this.playhead.index + 1 > this.locations.length - 1?1:this.playhead.index + 1;
		var lastPlayheadPosition = this.playhead.get();
		var playheadPosition = new realtime.cloud.visualisation.PlayheadPosition();
		playheadPosition.x = lastPlayheadPosition.x;
		playheadPosition.y = lastPlayheadPosition.y;
		playheadPosition.reflectionX = lastPlayheadPosition.reflectionX;
		playheadPosition.reflectionY = lastPlayheadPosition.reflectionY;
		playheadPosition.scale = lastPlayheadPosition.scale;
		playheadPosition.x += (attractor.x - lastPlayheadPosition.x) * this.fps / 12;
		playheadPosition.y += (attractor.y - lastPlayheadPosition.y) * this.fps / 12;
		playheadPosition.reflectionX += (attractor.reflection.x - lastPlayheadPosition.reflectionX) * this.fps / 12;
		playheadPosition.reflectionY += (attractor.reflection.y - lastPlayheadPosition.reflectionY) * this.fps / 12;
		this.playhead.add(playheadPosition);
		if(this.playhead.distanceTo(attractor) < Math.min(attractor.size.current * attractor.scale,5)) {
			this.playhead.color = attractor.colour;
			this.playhead.index = this.playhead.index + 1 > this.locations.length - 1?0:this.playhead.index + 1;
			attractor.generatingParticleTrial(this.locations[this.playhead.index]);
			var signal = new realtime.cloud.visualisation.Point(attractor.x / this.canvasRect.width,attractor.y / this.canvasRect.height);
			signal.x = Math.max(Math.min(signal.x,1),0);
			signal.y = Math.max(Math.min(signal.y,1),0);
		}
		var currentPosition = this.playhead.positions[0];
		var newPosition = this.playhead.positions[1];
	}
}
realtime.cloud.visualisation.Visualisation.prototype.__class__ = realtime.cloud.visualisation.Visualisation;
realtime.cloud.commands.TransitionOutCommand = function() { }
realtime.cloud.commands.TransitionOutCommand.__name__ = ["realtime","cloud","commands","TransitionOutCommand"];
realtime.cloud.commands.TransitionOutCommand.__super__ = xirsys.cube.mvcs.Command;
for(var k in xirsys.cube.mvcs.Command.prototype ) realtime.cloud.commands.TransitionOutCommand.prototype[k] = xirsys.cube.mvcs.Command.prototype[k];
realtime.cloud.commands.TransitionOutCommand.prototype.event = null;
realtime.cloud.commands.TransitionOutCommand.prototype.urlAddressService = null;
realtime.cloud.commands.TransitionOutCommand.prototype.viewManager = null;
realtime.cloud.commands.TransitionOutCommand.prototype.execute = function() {
	this.urlAddressService.dispatch(this.viewManager.currentView.path,this.viewManager.currentView.parameters);
}
realtime.cloud.commands.TransitionOutCommand.prototype.__class__ = realtime.cloud.commands.TransitionOutCommand;
xirsys.cube.core.CommandMap = function(eventDispatcher,injector) {
	if( eventDispatcher === $_ ) return;
	this.eventDispatcher = eventDispatcher;
	this.injector = injector;
	this.verifiedCommandClasses = new Hash();
	this.eventTypeMap = new Hash();
}
xirsys.cube.core.CommandMap.__name__ = ["xirsys","cube","core","CommandMap"];
xirsys.cube.core.CommandMap.prototype.eventDispatcher = null;
xirsys.cube.core.CommandMap.prototype.injector = null;
xirsys.cube.core.CommandMap.prototype.eventTypeMap = null;
xirsys.cube.core.CommandMap.prototype.verifiedCommandClasses = null;
xirsys.cube.core.CommandMap.prototype.mapEvent = function(eventType,commandClass,eventClass,oneshot) {
	if(oneshot == null) oneshot = false;
	var me = this;
	var cb = function(event) {
		me.routeEventToCommand(eventType,commandClass,eventClass,event);
	};
	if(oneshot) this.eventDispatcher.addEventHandlerOnce(eventType,cb); else this.eventDispatcher.addEventHandler(eventType,cb);
	if(this.eventTypeMap.get(eventType) == null) this.eventTypeMap.set(eventType,new Hash());
	this.eventTypeMap.get(eventType).set(Type.getClassName(commandClass),cb);
}
xirsys.cube.core.CommandMap.prototype.unmapEvent = function(eventType,commandClass) {
	if(this.eventTypeMap.get(eventType) != null) {
		var cb = this.eventTypeMap.get(eventType).get(Type.getClassName(commandClass));
		this.eventTypeMap.get(eventType).remove(Type.getClassName(commandClass));
		this.eventDispatcher.remove(eventType,cb);
	}
}
xirsys.cube.core.CommandMap.prototype.unmapEvents = function() {
}
xirsys.cube.core.CommandMap.prototype.hasEventCommand = function(eventType,commandClass) {
	return this.eventTypeMap.get(eventType) != null && this.eventTypeMap.get(eventType).get(Type.getClassName(commandClass)) != null;
}
xirsys.cube.core.CommandMap.prototype.execute = function(commandClass,payload,payloadClass) {
	if(payload != null || payloadClass != null) {
		if(payloadClass == null) payloadClass = Type.getClass(payload);
		this.injector.mapInstance(payloadClass,payload);
	}
	var command = this.injector.instantiate(commandClass);
	if(payload != null || payloadClass != null) this.injector.unmap(payloadClass);
	command.execute();
}
xirsys.cube.core.CommandMap.prototype.routeEventToCommand = function(eventType,commandClass,originalEventClass,event) {
	if(event != null && !Std["is"](event,originalEventClass) && !Std["is"](event,Type.getSuperClass(originalEventClass))) return false;
	this.execute(commandClass,event);
	return true;
}
xirsys.cube.core.CommandMap.prototype.__class__ = xirsys.cube.core.CommandMap;
xirsys.cube.core.CommandMap.__interfaces__ = [xirsys.cube.abstract.ICommandMap];
xirsys.cube.mvcs.Actor = function() { }
xirsys.cube.mvcs.Actor.__name__ = ["xirsys","cube","mvcs","Actor"];
xirsys.cube.mvcs.Actor.prototype.eventDispatcher = null;
xirsys.cube.mvcs.Actor.prototype.__class__ = xirsys.cube.mvcs.Actor;
xirsys.cube.mvcs.Actor.__interfaces__ = [haxe.rtti.Infos];
if(!realtime.cloud.service) realtime.cloud.service = {}
realtime.cloud.service.LoaderService = function(p) {
	if( p === $_ ) return;
	this.configuration = new Hash();
	this.assets = new Hash();
	this.configurationLoader = new utils.http.HttpLoader();
	this.systemAssetLoader = new utils.http.HttpLoader();
	this.contentAssetLoader = new utils.http.HttpLoader();
	this.configurationLoader.addEventHandler(utils.http.HttpLoaderCompletedEvent.COMPLETED,$closure(this,"onHttpConfigurationCompleted"));
	this.systemAssetLoader.addEventHandler(utils.http.HttpLoaderCompletedEvent.COMPLETED,$closure(this,"onHttpSystemAssetsCompleted"));
	this.contentAssetLoader.addEventHandler(utils.http.HttpLoaderCompletedEvent.COMPLETED,$closure(this,"onHttpContentAssetsCompleted"));
	this.contentAssetLoader.addEventHandler(utils.http.HttpLoaderProgressEvent.PROGRESS,$closure(this,"onHttpContentAssetsProgress"));
}
realtime.cloud.service.LoaderService.__name__ = ["realtime","cloud","service","LoaderService"];
realtime.cloud.service.LoaderService.__super__ = xirsys.cube.mvcs.Actor;
for(var k in xirsys.cube.mvcs.Actor.prototype ) realtime.cloud.service.LoaderService.prototype[k] = xirsys.cube.mvcs.Actor.prototype[k];
realtime.cloud.service.LoaderService.prototype.assetURL = null;
realtime.cloud.service.LoaderService.prototype.configurationURL = null;
realtime.cloud.service.LoaderService.prototype.assets = null;
realtime.cloud.service.LoaderService.prototype.configuration = null;
realtime.cloud.service.LoaderService.prototype.configurationLoader = null;
realtime.cloud.service.LoaderService.prototype.systemAssetLoader = null;
realtime.cloud.service.LoaderService.prototype.contentAssetLoader = null;
realtime.cloud.service.LoaderService.prototype.stage = null;
realtime.cloud.service.LoaderService.prototype.context = null;
realtime.cloud.service.LoaderService.prototype.configure = function(context) {
	this.context = context;
	this.stage = context.getContainer();
}
realtime.cloud.service.LoaderService.prototype.init = function(configurationURL,assetURL) {
	this.configurationURL = configurationURL;
	this.assetURL = assetURL;
	this.configurationLoader.addRequest(configurationURL);
	this.configurationLoader.addRequest(assetURL);
	this.configurationLoader.beginRequests();
}
realtime.cloud.service.LoaderService.prototype.load = function() {
	this.contentAssetLoader.beginRequests();
}
realtime.cloud.service.LoaderService.prototype.getConfiguration = function(configurationName) {
	return this.configuration.get(configurationName);
}
realtime.cloud.service.LoaderService.prototype.setConfiguration = function(configurationName,configurationValue) {
	this.configuration.set(configurationName,configurationValue);
}
realtime.cloud.service.LoaderService.prototype.viewableContentExist = function(path) {
	return this.assets.get(path) != null;
}
realtime.cloud.service.LoaderService.prototype.getAsset = function(path) {
	return this.assets.get(path);
}
realtime.cloud.service.LoaderService.prototype.addAsset = function(path,view,title,mimeType,request) {
	var asset = new realtime.cloud.data.Asset();
	asset.path = path;
	asset.view = view;
	asset.title = title;
	asset.request = request;
	if(mimeType != "") asset.overrideMimeType(mimeType);
	this.assets.set(path,asset);
}
realtime.cloud.service.LoaderService.prototype.onHttpConfigurationCompleted = function(event) {
	var assetJSON = event.requests.get(this.assetURL).httpRequest.getResponseText();
	var configurationJSON = event.requests.get(this.configurationURL).httpRequest.getResponseText();
	var systemConfigurationObject = utils.json.JSON.decode(configurationJSON).config;
	var systemAssetObject = utils.json.JSON.decode(configurationJSON).assets;
	var contentAssetObject = utils.json.JSON.decode(assetJSON).assets;
	var $it0 = systemConfigurationObject.iterator();
	while( $it0.hasNext() ) {
		var config = $it0.next();
		this.configuration.set(config.name,config.value);
	}
	var $it1 = systemAssetObject.iterator();
	while( $it1.hasNext() ) {
		var systemAsset = $it1.next();
		var request = this.systemAssetLoader.addRequest(systemAsset.url);
		this.addAsset(systemAsset.path,systemAsset.view,systemAsset.title,systemAsset.mimeType,request);
	}
	var $it2 = contentAssetObject.iterator();
	while( $it2.hasNext() ) {
		var contentAsset = $it2.next();
		var request = this.contentAssetLoader.addRequest(contentAsset.url);
		this.addAsset(contentAsset.path,contentAsset.view,contentAsset.title,contentAsset.mimeType,request);
	}
	this.systemAssetLoader.beginRequests();
}
realtime.cloud.service.LoaderService.prototype.onHttpSystemAssetsCompleted = function(event) {
	var loaderInitialisationEvent = new realtime.cloud.events.LoaderInitialisationEvent();
	this.eventDispatcher.dispatch(realtime.cloud.events.LoaderInitialisationEvent.INITIALISE,loaderInitialisationEvent);
}
realtime.cloud.service.LoaderService.prototype.onHttpContentAssetsCompleted = function(event) {
	var loaderCompletedEvent = new realtime.cloud.events.LoaderCompletedEvent(event.requests,event.successful,event.failed);
	this.eventDispatcher.dispatch(realtime.cloud.events.LoaderCompletedEvent.COMPLETE,loaderCompletedEvent);
}
realtime.cloud.service.LoaderService.prototype.onHttpContentAssetsProgress = function(event) {
	var loaderProgressEvent = new realtime.cloud.events.LoaderProgressEvent(event.precentage,event.total,event.loaded);
	this.eventDispatcher.dispatch(realtime.cloud.events.LoaderProgressEvent.PROGRESS,loaderProgressEvent);
}
realtime.cloud.service.LoaderService.prototype.__class__ = realtime.cloud.service.LoaderService;
haxe.rtti.CType = { __ename__ : ["haxe","rtti","CType"], __constructs__ : ["CUnknown","CEnum","CClass","CTypedef","CFunction","CAnonymous","CDynamic"] }
haxe.rtti.CType.CUnknown = ["CUnknown",0];
haxe.rtti.CType.CUnknown.toString = $estr;
haxe.rtti.CType.CUnknown.__enum__ = haxe.rtti.CType;
haxe.rtti.CType.CEnum = function(name,params) { var $x = ["CEnum",1,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CClass = function(name,params) { var $x = ["CClass",2,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CTypedef = function(name,params) { var $x = ["CTypedef",3,name,params]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CFunction = function(args,ret) { var $x = ["CFunction",4,args,ret]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CAnonymous = function(fields) { var $x = ["CAnonymous",5,fields]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.CType.CDynamic = function(t) { var $x = ["CDynamic",6,t]; $x.__enum__ = haxe.rtti.CType; $x.toString = $estr; return $x; }
haxe.rtti.Rights = { __ename__ : ["haxe","rtti","Rights"], __constructs__ : ["RNormal","RNo","RCall","RMethod","RDynamic","RInline"] }
haxe.rtti.Rights.RNormal = ["RNormal",0];
haxe.rtti.Rights.RNormal.toString = $estr;
haxe.rtti.Rights.RNormal.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RNo = ["RNo",1];
haxe.rtti.Rights.RNo.toString = $estr;
haxe.rtti.Rights.RNo.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RCall = function(m) { var $x = ["RCall",2,m]; $x.__enum__ = haxe.rtti.Rights; $x.toString = $estr; return $x; }
haxe.rtti.Rights.RMethod = ["RMethod",3];
haxe.rtti.Rights.RMethod.toString = $estr;
haxe.rtti.Rights.RMethod.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RDynamic = ["RDynamic",4];
haxe.rtti.Rights.RDynamic.toString = $estr;
haxe.rtti.Rights.RDynamic.__enum__ = haxe.rtti.Rights;
haxe.rtti.Rights.RInline = ["RInline",5];
haxe.rtti.Rights.RInline.toString = $estr;
haxe.rtti.Rights.RInline.__enum__ = haxe.rtti.Rights;
haxe.rtti.TypeTree = { __ename__ : ["haxe","rtti","TypeTree"], __constructs__ : ["TPackage","TClassdecl","TEnumdecl","TTypedecl"] }
haxe.rtti.TypeTree.TPackage = function(name,full,subs) { var $x = ["TPackage",0,name,full,subs]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TClassdecl = function(c) { var $x = ["TClassdecl",1,c]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TEnumdecl = function(e) { var $x = ["TEnumdecl",2,e]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeTree.TTypedecl = function(t) { var $x = ["TTypedecl",3,t]; $x.__enum__ = haxe.rtti.TypeTree; $x.toString = $estr; return $x; }
haxe.rtti.TypeApi = function() { }
haxe.rtti.TypeApi.__name__ = ["haxe","rtti","TypeApi"];
haxe.rtti.TypeApi.typeInfos = function(t) {
	var inf;
	var $e = (t);
	switch( $e[1] ) {
	case 1:
		var c = $e[2];
		inf = c;
		break;
	case 2:
		var e = $e[2];
		inf = e;
		break;
	case 3:
		var t1 = $e[2];
		inf = t1;
		break;
	case 0:
		throw "Unexpected Package";
		break;
	}
	return inf;
}
haxe.rtti.TypeApi.isVar = function(t) {
	return (function($this) {
		var $r;
		switch( (t)[1] ) {
		case 4:
			$r = false;
			break;
		default:
			$r = true;
		}
		return $r;
	}(this));
}
haxe.rtti.TypeApi.leq = function(f,l1,l2) {
	var it = l2.iterator();
	var $it0 = l1.iterator();
	while( $it0.hasNext() ) {
		var e1 = $it0.next();
		if(!it.hasNext()) return false;
		var e2 = it.next();
		if(!f(e1,e2)) return false;
	}
	if(it.hasNext()) return false;
	return true;
}
haxe.rtti.TypeApi.rightsEq = function(r1,r2) {
	if(r1 == r2) return true;
	var $e = (r1);
	switch( $e[1] ) {
	case 2:
		var m1 = $e[2];
		var $e = (r2);
		switch( $e[1] ) {
		case 2:
			var m2 = $e[2];
			return m1 == m2;
		default:
		}
		break;
	default:
	}
	return false;
}
haxe.rtti.TypeApi.typeEq = function(t1,t2) {
	var $e = (t1);
	switch( $e[1] ) {
	case 0:
		return t2 == haxe.rtti.CType.CUnknown;
	case 1:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 1:
			var params2 = $e[3], name2 = $e[2];
			return name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
		default:
		}
		break;
	case 2:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 2:
			var params2 = $e[3], name2 = $e[2];
			return name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
		default:
		}
		break;
	case 3:
		var params = $e[3], name = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 3:
			var params2 = $e[3], name2 = $e[2];
			return name == name2 && haxe.rtti.TypeApi.leq(haxe.rtti.TypeApi.typeEq,params,params2);
		default:
		}
		break;
	case 4:
		var ret = $e[3], args = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 4:
			var ret2 = $e[3], args2 = $e[2];
			return haxe.rtti.TypeApi.leq(function(a,b) {
				return a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
			},args,args2) && haxe.rtti.TypeApi.typeEq(ret,ret2);
		default:
		}
		break;
	case 5:
		var fields = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 5:
			var fields2 = $e[2];
			return haxe.rtti.TypeApi.leq(function(a,b) {
				return a.name == b.name && haxe.rtti.TypeApi.typeEq(a.t,b.t);
			},fields,fields2);
		default:
		}
		break;
	case 6:
		var t = $e[2];
		var $e = (t2);
		switch( $e[1] ) {
		case 6:
			var t21 = $e[2];
			if(t == null != (t21 == null)) return false;
			return t == null || haxe.rtti.TypeApi.typeEq(t,t21);
		default:
		}
		break;
	}
	return false;
}
haxe.rtti.TypeApi.fieldEq = function(f1,f2) {
	if(f1.name != f2.name) return false;
	if(!haxe.rtti.TypeApi.typeEq(f1.type,f2.type)) return false;
	if(f1.isPublic != f2.isPublic) return false;
	if(f1.doc != f2.doc) return false;
	if(!haxe.rtti.TypeApi.rightsEq(f1.get,f2.get)) return false;
	if(!haxe.rtti.TypeApi.rightsEq(f1.set,f2.set)) return false;
	if(f1.params == null != (f2.params == null)) return false;
	if(f1.params != null && f1.params.join(":") != f2.params.join(":")) return false;
	return true;
}
haxe.rtti.TypeApi.constructorEq = function(c1,c2) {
	if(c1.name != c2.name) return false;
	if(c1.doc != c2.doc) return false;
	if(c1.args == null != (c2.args == null)) return false;
	if(c1.args != null && !haxe.rtti.TypeApi.leq(function(a,b) {
		return a.name == b.name && a.opt == b.opt && haxe.rtti.TypeApi.typeEq(a.t,b.t);
	},c1.args,c2.args)) return false;
	return true;
}
haxe.rtti.TypeApi.prototype.__class__ = haxe.rtti.TypeApi;
realtime.cloud.Stage = function(p) {
	if( p === $_ ) return;
	this.htmlDocument = document;
	this.document = document;
	this.window = window;
}
realtime.cloud.Stage.__name__ = ["realtime","cloud","Stage"];
realtime.cloud.Stage.prototype.document = null;
realtime.cloud.Stage.prototype.htmlDocument = null;
realtime.cloud.Stage.prototype.window = null;
realtime.cloud.Stage.prototype.__class__ = realtime.cloud.Stage;
xirsys.cube.core.Proxy = function(eventDispatcher,injector) {
	if( eventDispatcher === $_ ) return;
	this.eventDispatcher = eventDispatcher;
	this.injector = injector;
}
xirsys.cube.core.Proxy.__name__ = ["xirsys","cube","core","Proxy"];
xirsys.cube.core.Proxy.prototype.modelList = null;
xirsys.cube.core.Proxy.prototype.eventDispatcher = null;
xirsys.cube.core.Proxy.prototype.injector = null;
xirsys.cube.core.Proxy.prototype.register = function(model) {
	var m = this.injector.instantiate(model);
	this.injector.mapInstance(model,m);
	m.onRegister();
	if(this.modelList == null) this.modelList = new Array();
	this.modelList.push(m);
}
xirsys.cube.core.Proxy.prototype.__class__ = xirsys.cube.core.Proxy;
xirsys.cube.core.Proxy.__interfaces__ = [xirsys.cube.abstract.IProxy];
if(!utils.http) utils.http = {}
utils.http.HttpLoaderProgressEvent = function(precentage,total,loaded) {
	if( precentage === $_ ) return;
	this.precentage = precentage;
	this.total = total;
	this.loaded = loaded;
}
utils.http.HttpLoaderProgressEvent.__name__ = ["utils","http","HttpLoaderProgressEvent"];
utils.http.HttpLoaderProgressEvent.prototype.precentage = null;
utils.http.HttpLoaderProgressEvent.prototype.total = null;
utils.http.HttpLoaderProgressEvent.prototype.loaded = null;
utils.http.HttpLoaderProgressEvent.prototype.__class__ = utils.http.HttpLoaderProgressEvent;
realtime.cloud.visualisation.Rectangle = function(x,y,width,height) {
	if( x === $_ ) return;
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	realtime.cloud.visualisation.Point.call(this,x,y);
	this.width = width;
	this.height = height;
}
realtime.cloud.visualisation.Rectangle.__name__ = ["realtime","cloud","visualisation","Rectangle"];
realtime.cloud.visualisation.Rectangle.__super__ = realtime.cloud.visualisation.Point;
for(var k in realtime.cloud.visualisation.Point.prototype ) realtime.cloud.visualisation.Rectangle.prototype[k] = realtime.cloud.visualisation.Point.prototype[k];
realtime.cloud.visualisation.Rectangle.prototype.width = null;
realtime.cloud.visualisation.Rectangle.prototype.height = null;
realtime.cloud.visualisation.Rectangle.prototype.__class__ = realtime.cloud.visualisation.Rectangle;
Lambda = function() { }
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
}
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
}
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
}
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
}
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
}
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
}
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
}
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
}
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
}
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
}
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
}
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
}
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
}
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
}
Lambda.prototype.__class__ = Lambda;
realtime.cloud.visualisation.PlayheadPosition = function(x,y,reflectionX,reflectionY,scale) {
	if( x === $_ ) return;
	if(scale == null) scale = 1;
	if(reflectionY == null) reflectionY = 0;
	if(reflectionX == null) reflectionX = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	realtime.cloud.visualisation.Point.call(this,x,y);
	this.reflectionX = reflectionX;
	this.reflectionX = reflectionY;
	this.scale = scale;
}
realtime.cloud.visualisation.PlayheadPosition.__name__ = ["realtime","cloud","visualisation","PlayheadPosition"];
realtime.cloud.visualisation.PlayheadPosition.__super__ = realtime.cloud.visualisation.Point;
for(var k in realtime.cloud.visualisation.Point.prototype ) realtime.cloud.visualisation.PlayheadPosition.prototype[k] = realtime.cloud.visualisation.Point.prototype[k];
realtime.cloud.visualisation.PlayheadPosition.prototype.scale = null;
realtime.cloud.visualisation.PlayheadPosition.prototype.reflectionX = null;
realtime.cloud.visualisation.PlayheadPosition.prototype.reflectionY = null;
realtime.cloud.visualisation.PlayheadPosition.prototype.__class__ = realtime.cloud.visualisation.PlayheadPosition;
realtime.cloud.service.UrlAddressService = function(p) {
	if( p === $_ ) return;
	this.swfAddress = SWFAddress;
	this.swfAddress.addEventListener(realtime.cloud.events.UrlAddressEvent.INIT,$closure(this,"onUrlAddressInit"));
	this.swfAddress.addEventListener(realtime.cloud.events.UrlAddressEvent.INTERNAL_CHANGE,$closure(this,"onUrlAddressInternalChange"));
	this.swfAddress.addEventListener(realtime.cloud.events.UrlAddressEvent.EXTERNAL_CHANGE,$closure(this,"onUrlAddressExternalChange"));
	this.enableInternalDispatching(false);
	this.enableExternalDispatching(false);
}
realtime.cloud.service.UrlAddressService.__name__ = ["realtime","cloud","service","UrlAddressService"];
realtime.cloud.service.UrlAddressService.__super__ = xirsys.cube.mvcs.Actor;
for(var k in xirsys.cube.mvcs.Actor.prototype ) realtime.cloud.service.UrlAddressService.prototype[k] = xirsys.cube.mvcs.Actor.prototype[k];
realtime.cloud.service.UrlAddressService.prototype.swfAddress = null;
realtime.cloud.service.UrlAddressService.prototype.internalDispatched = null;
realtime.cloud.service.UrlAddressService.prototype.externalDispatched = null;
realtime.cloud.service.UrlAddressService.prototype.enableInternalDispatching = function(enabled) {
	this.internalDispatched = enabled;
}
realtime.cloud.service.UrlAddressService.prototype.enableExternalDispatching = function(enabled) {
	this.externalDispatched = enabled;
}
realtime.cloud.service.UrlAddressService.prototype.back = function() {
	this.swfAddress.back();
}
realtime.cloud.service.UrlAddressService.prototype.forward = function() {
	this.swfAddress.forward();
}
realtime.cloud.service.UrlAddressService.prototype.up = function() {
	this.swfAddress.up();
}
realtime.cloud.service.UrlAddressService.prototype.getBaseURL = function() {
	return this.swfAddress.upgetBaseURL();
}
realtime.cloud.service.UrlAddressService.prototype.getHistory = function() {
	return this.swfAddress.getHistory();
}
realtime.cloud.service.UrlAddressService.prototype.getParameter = function(parameter) {
	return this.swfAddress.getParameter(parameter);
}
realtime.cloud.service.UrlAddressService.prototype.getParameterNames = function() {
	return this.swfAddress.getParameterNames();
}
realtime.cloud.service.UrlAddressService.prototype.getPath = function() {
	return this.swfAddress.getPath();
}
realtime.cloud.service.UrlAddressService.prototype.getPathNames = function() {
	return this.swfAddress.getPathNames();
}
realtime.cloud.service.UrlAddressService.prototype.getQueryString = function() {
	return this.swfAddress.getQueryString();
}
realtime.cloud.service.UrlAddressService.prototype.getStatus = function() {
	return this.swfAddress.getStatus();
}
realtime.cloud.service.UrlAddressService.prototype.getStrict = function() {
	return this.swfAddress.getStrict();
}
realtime.cloud.service.UrlAddressService.prototype.getTitle = function() {
	return this.swfAddress.getTitle();
}
realtime.cloud.service.UrlAddressService.prototype.getTracker = function() {
	return this.swfAddress.getTracker();
}
realtime.cloud.service.UrlAddressService.prototype.getValue = function() {
	return this.swfAddress.getValue();
}
realtime.cloud.service.UrlAddressService.prototype.go = function(delta) {
	this.swfAddress.go(delta);
}
realtime.cloud.service.UrlAddressService.prototype.href = function(url,target) {
	if(target == null) target = "_self";
	this.swfAddress.href(url,target);
}
realtime.cloud.service.UrlAddressService.prototype.popup = function(url,name,options,handler) {
	if(handler == null) handler = "";
	if(options == null) options = "";
	if(name == null) name = "popup";
	this.swfAddress.popup(url,name,options,handler);
}
realtime.cloud.service.UrlAddressService.prototype.resetStatus = function() {
	this.swfAddress.resetStatus();
}
realtime.cloud.service.UrlAddressService.prototype.setHistory = function(history) {
	this.swfAddress.setHistory(history);
}
realtime.cloud.service.UrlAddressService.prototype.setStatus = function(status) {
	this.swfAddress.setStatus(status);
}
realtime.cloud.service.UrlAddressService.prototype.setStrict = function(strict) {
	this.swfAddress.setStrict(strict);
}
realtime.cloud.service.UrlAddressService.prototype.setTitle = function(title) {
	this.swfAddress.setTitle(title);
}
realtime.cloud.service.UrlAddressService.prototype.setTracker = function(tracker) {
	this.swfAddress.setTracker(tracker);
}
realtime.cloud.service.UrlAddressService.prototype.setValue = function(value) {
	if(this.internalDispatched || this.externalDispatched) this.swfAddress.setValue(value); else {
		var urlAddressEvent = new realtime.cloud.events.UrlAddressEvent();
		urlAddressEvent.type = realtime.cloud.events.UrlAddressEvent.CHANGE;
		urlAddressEvent.path = value;
		this.eventDispatcher.dispatch(realtime.cloud.events.UrlAddressEvent.CHANGE,urlAddressEvent);
	}
}
realtime.cloud.service.UrlAddressService.prototype.dispatch = function(path,parameters) {
	var urlAddressEvent = new realtime.cloud.events.UrlAddressEvent();
	urlAddressEvent.type = realtime.cloud.events.UrlAddressEvent.CHANGE;
	urlAddressEvent.path = path;
	urlAddressEvent.parameters = parameters;
	this.eventDispatcher.dispatch(realtime.cloud.events.UrlAddressEvent.CHANGE,urlAddressEvent);
}
realtime.cloud.service.UrlAddressService.prototype.onUrlAddressInit = function(event) {
	var urlAddressEvent = new realtime.cloud.events.UrlAddressEvent();
	urlAddressEvent.type = event.type;
	urlAddressEvent.target = event.target;
	urlAddressEvent.path = event.path;
	urlAddressEvent.value = event.value;
	urlAddressEvent.pathNames = event.pathNames;
	urlAddressEvent.parameterNames = event.parameterNames;
	urlAddressEvent.parameters = event.parameters;
	if(this.eventDispatcher != null) this.eventDispatcher.dispatch(realtime.cloud.events.UrlAddressEvent.INIT,urlAddressEvent);
}
realtime.cloud.service.UrlAddressService.prototype.onUrlAddressInternalChange = function(event) {
	var urlAddressEvent = new realtime.cloud.events.UrlAddressEvent();
	urlAddressEvent.type = event.type;
	urlAddressEvent.target = event.target;
	urlAddressEvent.path = event.path;
	urlAddressEvent.value = event.value;
	urlAddressEvent.pathNames = event.pathNames;
	urlAddressEvent.parameterNames = event.parameterNames;
	urlAddressEvent.parameters = event.parameters;
	if(this.internalDispatched && this.eventDispatcher != null) this.eventDispatcher.dispatch(realtime.cloud.events.UrlAddressEvent.CHANGE,urlAddressEvent);
}
realtime.cloud.service.UrlAddressService.prototype.onUrlAddressExternalChange = function(event) {
	var urlAddressEvent = new realtime.cloud.events.UrlAddressEvent();
	urlAddressEvent.type = event.type;
	urlAddressEvent.target = event.target;
	urlAddressEvent.path = event.path;
	urlAddressEvent.value = event.value;
	urlAddressEvent.pathNames = event.pathNames;
	urlAddressEvent.parameterNames = event.parameterNames;
	urlAddressEvent.parameters = event.parameters;
	if(this.externalDispatched && this.eventDispatcher != null) this.eventDispatcher.dispatch(realtime.cloud.events.UrlAddressEvent.CHANGE,urlAddressEvent);
}
realtime.cloud.service.UrlAddressService.prototype.__class__ = realtime.cloud.service.UrlAddressService;
realtime.cloud.visualisation.Constants = function() { }
realtime.cloud.visualisation.Constants.__name__ = ["realtime","cloud","visualisation","Constants"];
realtime.cloud.visualisation.Constants.prototype.__class__ = realtime.cloud.visualisation.Constants;
realtime.cloud.commands.InitialiseLoaderCommand = function() { }
realtime.cloud.commands.InitialiseLoaderCommand.__name__ = ["realtime","cloud","commands","InitialiseLoaderCommand"];
realtime.cloud.commands.InitialiseLoaderCommand.__super__ = xirsys.cube.mvcs.Command;
for(var k in xirsys.cube.mvcs.Command.prototype ) realtime.cloud.commands.InitialiseLoaderCommand.prototype[k] = xirsys.cube.mvcs.Command.prototype[k];
realtime.cloud.commands.InitialiseLoaderCommand.prototype.event = null;
realtime.cloud.commands.InitialiseLoaderCommand.prototype.urlAddressService = null;
realtime.cloud.commands.InitialiseLoaderCommand.prototype.execute = function() {
	var viewEvent = new realtime.cloud.events.ViewEvent();
	viewEvent.path = realtime.cloud.Configuration.PRELOAD_VIEW;
	this.eventDispatcher.dispatch(realtime.cloud.events.ViewEvent.CHANGE,viewEvent);
}
realtime.cloud.commands.InitialiseLoaderCommand.prototype.__class__ = realtime.cloud.commands.InitialiseLoaderCommand;
utils.http.HttpLoaderCompletedEvent = function(requests,successful,failed) {
	if( requests === $_ ) return;
	this.requests = requests;
	this.successful = successful;
	this.failed = failed;
}
utils.http.HttpLoaderCompletedEvent.__name__ = ["utils","http","HttpLoaderCompletedEvent"];
utils.http.HttpLoaderCompletedEvent.prototype.requests = null;
utils.http.HttpLoaderCompletedEvent.prototype.successful = null;
utils.http.HttpLoaderCompletedEvent.prototype.failed = null;
utils.http.HttpLoaderCompletedEvent.prototype.__class__ = utils.http.HttpLoaderCompletedEvent;
realtime.cloud.events.LoaderCompletedEvent = function(requests,successful,failed) {
	if( requests === $_ ) return;
	utils.http.HttpLoaderCompletedEvent.call(this,requests,successful,failed);
}
realtime.cloud.events.LoaderCompletedEvent.__name__ = ["realtime","cloud","events","LoaderCompletedEvent"];
realtime.cloud.events.LoaderCompletedEvent.__super__ = utils.http.HttpLoaderCompletedEvent;
for(var k in utils.http.HttpLoaderCompletedEvent.prototype ) realtime.cloud.events.LoaderCompletedEvent.prototype[k] = utils.http.HttpLoaderCompletedEvent.prototype[k];
realtime.cloud.events.LoaderCompletedEvent.prototype.__class__ = realtime.cloud.events.LoaderCompletedEvent;
realtime.cloud.events.LoaderCompletedEvent.__interfaces__ = [xirsys.cube.events.IEvent];
realtime.cloud.Configuration = function() { }
realtime.cloud.Configuration.__name__ = ["realtime","cloud","Configuration"];
realtime.cloud.Configuration.prototype.__class__ = realtime.cloud.Configuration;
utils.http.HttpLoaderRequest = function(p) {
	if( p === $_ ) return;
	this.httpRequest = new utils.http.request.HttpRequest();
	this.method = utils.http.request.HttpRequest.GET;
	this.asynchronous = true;
	this.username = "";
	this.password = "";
	this.url = "";
}
utils.http.HttpLoaderRequest.__name__ = ["utils","http","HttpLoaderRequest"];
utils.http.HttpLoaderRequest.prototype.httpRequest = null;
utils.http.HttpLoaderRequest.prototype.url = null;
utils.http.HttpLoaderRequest.prototype.method = null;
utils.http.HttpLoaderRequest.prototype.asynchronous = null;
utils.http.HttpLoaderRequest.prototype.username = null;
utils.http.HttpLoaderRequest.prototype.password = null;
utils.http.HttpLoaderRequest.prototype.__class__ = utils.http.HttpLoaderRequest;
if(!utils.http.request) utils.http.request = {}
utils.http.request.HttpRequest = function(p) {
	if( p === $_ ) return;
	this.request = this.createXMLHttpRequest();
	this.request.onreadystatechange = $closure(this,"onReadyStateChange");
	this.operationComplete = false;
	this.url = "";
	xirsys.cube.events.CentralDispatcher.call(this);
}
utils.http.request.HttpRequest.__name__ = ["utils","http","request","HttpRequest"];
utils.http.request.HttpRequest.__super__ = xirsys.cube.events.CentralDispatcher;
for(var k in xirsys.cube.events.CentralDispatcher.prototype ) utils.http.request.HttpRequest.prototype[k] = xirsys.cube.events.CentralDispatcher.prototype[k];
utils.http.request.HttpRequest.prototype.request = null;
utils.http.request.HttpRequest.prototype.operationComplete = null;
utils.http.request.HttpRequest.prototype.url = null;
utils.http.request.HttpRequest.prototype.createXMLHttpRequest = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {
		try {
			return new ActiveXObject('Msxml2.XMLHTTP.6.0');
		} catch( e1 ) {
		}
	}
	try {
		return new ActiveXObject('Msxml2.XMLHTTP.3.0');
	} catch( e ) {
	}
	try {
		return new ActiveXObject('Microsoft.XMLHTTP');
	} catch( e ) {
	}
	throw "This browser does not support XMLHttpRequest.";
}
utils.http.request.HttpRequest.prototype.getUrl = function() {
	return this.url;
}
utils.http.request.HttpRequest.prototype.isComplete = function() {
	return this.operationComplete;
}
utils.http.request.HttpRequest.prototype.getStatus = function() {
	return this.request.status;
}
utils.http.request.HttpRequest.prototype.getStatusText = function() {
	return this.request.statusText;
}
utils.http.request.HttpRequest.prototype.overrideMimeType = function(contentType) {
	if($closure(this.request,"overrideMimeType") != null) this.request.overrideMimeType(contentType);
}
utils.http.request.HttpRequest.prototype.getResponseText = function() {
	return this.request.responseText;
}
utils.http.request.HttpRequest.prototype.getResponseXML = function() {
	return this.request.responseXML;
}
utils.http.request.HttpRequest.prototype.setResponseHeader = function(headerName,headerValue) {
	this.request.setRequestHeader(headerName,headerValue);
}
utils.http.request.HttpRequest.prototype.getResponseHeader = function(headerName) {
	return this.request.getResponseHeader(headerName);
}
utils.http.request.HttpRequest.prototype.getAllResponseHeaders = function() {
	return this.request.getAllResponseHeaders();
}
utils.http.request.HttpRequest.prototype.abort = function() {
	this.request.abort();
}
utils.http.request.HttpRequest.prototype.open = function(url,method,asynchronous,username,password) {
	if(password == null) password = "";
	if(username == null) username = "";
	if(asynchronous == null) asynchronous = true;
	if(method == null) method = "GET";
	this.url = url;
	this.operationComplete = false;
	this.request.open(method,url,asynchronous,username,password);
	this.request.send();
}
utils.http.request.HttpRequest.prototype.send = function(messageBody) {
	if(messageBody == null) this.request.send();
	this.request.send(messageBody);
}
utils.http.request.HttpRequest.prototype.onReadyStateChange = function(event) {
	if(this.request.readyState == utils.http.request.HttpRequest.DONE) {
		if(this.request.status == 200) {
			this.operationComplete = true;
			this.dispatch(utils.http.request.HttpRequestEvent.COMPLETED,new utils.http.request.HttpRequestEvent(this));
		} else {
			this.operationComplete = true;
			this.dispatch(utils.http.request.HttpRequestEvent.ERROR,new utils.http.request.HttpRequestEvent(this));
		}
	}
}
utils.http.request.HttpRequest.prototype.__class__ = utils.http.request.HttpRequest;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
realtime.cloud.commands.UrlChangedCommand = function() { }
realtime.cloud.commands.UrlChangedCommand.__name__ = ["realtime","cloud","commands","UrlChangedCommand"];
realtime.cloud.commands.UrlChangedCommand.__super__ = xirsys.cube.mvcs.Command;
for(var k in xirsys.cube.mvcs.Command.prototype ) realtime.cloud.commands.UrlChangedCommand.prototype[k] = xirsys.cube.mvcs.Command.prototype[k];
realtime.cloud.commands.UrlChangedCommand.prototype.event = null;
realtime.cloud.commands.UrlChangedCommand.prototype.viewManager = null;
realtime.cloud.commands.UrlChangedCommand.prototype.loaderService = null;
realtime.cloud.commands.UrlChangedCommand.prototype.urlAddressService = null;
realtime.cloud.commands.UrlChangedCommand.prototype.execute = function() {
	var asset = this.loaderService.getAsset(this.event.path);
	if(asset == null) {
		this.event.parameters.set(realtime.cloud.Configuration.APP_ADDRESS,this.event.path);
		asset = this.loaderService.getAsset(realtime.cloud.Configuration.NOT_FOUND_VIEW);
		this.event.path = realtime.cloud.Configuration.NOT_FOUND_VIEW;
	}
	if(asset.title != null) this.urlAddressService.setTitle(asset.title);
	if(asset.request != null) utils.CommonJS.changeBodyContent(asset.getResponseText());
	var viewEvent = new realtime.cloud.events.ViewEvent();
	viewEvent.path = this.event.path;
	viewEvent.parameters = this.event.parameters;
	this.eventDispatcher.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_IN,viewEvent);
}
realtime.cloud.commands.UrlChangedCommand.prototype.__class__ = realtime.cloud.commands.UrlChangedCommand;
utils.json.JSONTokenizer = function(s,strict) {
	if( s === $_ ) return;
	this.jsonString = s;
	this.strict = strict;
	this.loc = 0;
	this.nextChar();
}
utils.json.JSONTokenizer.__name__ = ["utils","json","JSONTokenizer"];
utils.json.JSONTokenizer.prototype.obj = null;
utils.json.JSONTokenizer.prototype.jsonString = null;
utils.json.JSONTokenizer.prototype.loc = null;
utils.json.JSONTokenizer.prototype.ch = null;
utils.json.JSONTokenizer.prototype.strict = null;
utils.json.JSONTokenizer.prototype.getNextToken = function() {
	var token = new utils.json.JSONToken();
	this.skipIgnored();
	switch(this.ch) {
	case "{":
		token.type = utils.json.JSONTokenType.tLEFT_BRACE;
		token.value = "{";
		this.nextChar();
		break;
	case "}":
		token.type = utils.json.JSONTokenType.tRIGHT_BRACE;
		token.value = "}";
		this.nextChar();
		break;
	case "[":
		token.type = utils.json.JSONTokenType.tLEFT_BRACKET;
		token.value = "[";
		this.nextChar();
		break;
	case "]":
		token.type = utils.json.JSONTokenType.tRIGHT_BRACKET;
		token.value = "]";
		this.nextChar();
		break;
	case ",":
		token.type = utils.json.JSONTokenType.tCOMMA;
		token.value = ",";
		this.nextChar();
		break;
	case ":":
		token.type = utils.json.JSONTokenType.tCOLON;
		token.value = ":";
		this.nextChar();
		break;
	case "t":
		var possibleTrue = "t" + (this.nextChar() + this.nextChar() + this.nextChar());
		if(possibleTrue == "true") {
			token.type = utils.json.JSONTokenType.tTRUE;
			token.value = true;
			this.nextChar();
		} else this.parseError("Expecting 'true' but found " + possibleTrue);
		break;
	case "f":
		var possibleFalse = "f" + this.nextChar() + this.nextChar() + this.nextChar() + this.nextChar();
		if(possibleFalse == "false") {
			token.type = utils.json.JSONTokenType.tFALSE;
			token.value = false;
			this.nextChar();
		} else this.parseError("Expecting 'false' but found " + possibleFalse);
		break;
	case "n":
		var possibleNull = "n" + this.nextChar() + this.nextChar() + this.nextChar();
		if(possibleNull == "null") {
			token.type = utils.json.JSONTokenType.tNULL;
			token.value = null;
			this.nextChar();
		} else this.parseError("Expecting 'null' but found " + possibleNull);
		break;
	case "N":
		var possibleNAN = "N" + this.nextChar() + this.nextChar();
		if(possibleNAN == "NAN" || possibleNAN == "NaN") {
			token.type = utils.json.JSONTokenType.tNAN;
			token.value = Math.NaN;
			this.nextChar();
		} else this.parseError("Expecting 'nan' but found " + possibleNAN);
		break;
	case "\"":
		token = this.readString();
		break;
	default:
		if(this.isDigit(this.ch) || this.ch == "-") token = this.readNumber(); else if(this.ch == "") return null; else this.parseError("Unexpected " + this.ch + " encountered");
	}
	return token;
}
utils.json.JSONTokenizer.prototype.readString = function() {
	var string = "";
	this.nextChar();
	while(this.ch != "\"" && this.ch != "") {
		if(this.ch == "\\") {
			this.nextChar();
			switch(this.ch) {
			case "\"":
				string += "\"";
				break;
			case "/":
				string += "/";
				break;
			case "\\":
				string += "\\";
				break;
			case "n":
				string += "\n";
				break;
			case "r":
				string += "\r";
				break;
			case "t":
				string += "\t";
				break;
			case "u":
				var hexValue = "";
				var _g = 0;
				while(_g < 4) {
					var i = _g++;
					if(!this.isHexDigit(this.nextChar())) this.parseError(" Excepted a hex digit, but found: " + this.ch);
					hexValue += this.ch;
				}
				string += String.fromCharCode(this.hexValToInt(hexValue));
				break;
			default:
				string += "\\" + this.ch;
			}
		} else string += this.ch;
		this.nextChar();
	}
	if(this.ch == "") this.parseError("Unterminated string literal");
	this.nextChar();
	var token = new utils.json.JSONToken();
	token.type = utils.json.JSONTokenType.tSTRING;
	token.value = string;
	return token;
}
utils.json.JSONTokenizer.prototype.hexValToInt = function(hexVal) {
	var ret = 0;
	var _g1 = 0, _g = hexVal.length;
	while(_g1 < _g) {
		var i = _g1++;
		ret = ret << 4;
		switch(hexVal.charAt(i).toUpperCase()) {
		case "1":
			ret += 1;
			break;
		case "2":
			ret += 2;
			break;
		case "3":
			ret += 3;
			break;
		case "4":
			ret += 4;
			break;
		case "5":
			ret += 5;
			break;
		case "6":
			ret += 6;
			break;
		case "7":
			ret += 7;
			break;
		case "8":
			ret += 8;
			break;
		case "9":
			ret += 9;
			break;
		case "A":
			ret += 10;
			break;
		case "B":
			ret += 11;
			break;
		case "C":
			ret += 12;
			break;
		case "D":
			ret += 13;
			break;
		case "E":
			ret += 14;
			break;
		case "F":
			ret += 15;
			break;
		}
	}
	return ret;
}
utils.json.JSONTokenizer.prototype.readNumber = function() {
	var input = "";
	if(this.ch == "-") {
		input += "-";
		this.nextChar();
	}
	if(!this.isDigit(this.ch)) this.parseError("Expecting a digit");
	if(this.ch == "0") {
		input += this.ch;
		this.nextChar();
		if(this.isDigit(this.ch)) this.parseError("A digit cannot immediately follow 0"); else if(!this.strict && this.ch == "x") {
			input += this.ch;
			this.nextChar();
			if(this.isHexDigit(this.ch)) {
				input += this.ch;
				this.nextChar();
			} else this.parseError("Number in hex format require at least one hex digit after \"0x\"");
			while(this.isHexDigit(this.ch)) {
				input += this.ch;
				this.nextChar();
			}
			input = Std.string(this.hexValToInt(input));
		}
	} else while(this.isDigit(this.ch)) {
		input += this.ch;
		this.nextChar();
	}
	if(this.ch == ".") {
		input += ".";
		this.nextChar();
		if(!this.isDigit(this.ch)) this.parseError("Expecting a digit");
		while(this.isDigit(this.ch)) {
			input += this.ch;
			this.nextChar();
		}
	}
	if(this.ch == "e" || this.ch == "E") {
		input += "e";
		this.nextChar();
		if(this.ch == "+" || this.ch == "-") {
			input += this.ch;
			this.nextChar();
		}
		if(!this.isDigit(this.ch)) this.parseError("Scientific notation number needs exponent value");
		while(this.isDigit(this.ch)) {
			input += this.ch;
			this.nextChar();
		}
	}
	var num = Std.parseFloat(input);
	if(Math.isFinite(num) && !Math.isNaN(num)) {
		var token = new utils.json.JSONToken();
		token.type = utils.json.JSONTokenType.tNUMBER;
		token.value = num;
		return token;
	} else this.parseError("Number " + num + " is not valid!");
	return null;
}
utils.json.JSONTokenizer.prototype.nextChar = function() {
	return this.ch = this.jsonString.charAt(this.loc++);
}
utils.json.JSONTokenizer.prototype.skipIgnored = function() {
	var originalLoc;
	do {
		originalLoc = this.loc;
		this.skipWhite();
		this.skipComments();
	} while(originalLoc != this.loc);
}
utils.json.JSONTokenizer.prototype.skipComments = function() {
	if(this.ch == "/") {
		this.nextChar();
		switch(this.ch) {
		case "/":
			do this.nextChar(); while(this.ch != "\n" && this.ch != "");
			this.nextChar();
			break;
		case "*":
			this.nextChar();
			while(true) {
				if(this.ch == "*") {
					this.nextChar();
					if(this.ch == "/") {
						this.nextChar();
						break;
					}
				} else this.nextChar();
				if(this.ch == "") this.parseError("Multi-line comment not closed");
			}
			break;
		default:
			this.parseError("Unexpected " + this.ch + " encountered (expecting '/' or '*' )");
		}
	}
}
utils.json.JSONTokenizer.prototype.skipWhite = function() {
	while(this.isWhiteSpace(this.ch)) this.nextChar();
}
utils.json.JSONTokenizer.prototype.isWhiteSpace = function(ch) {
	return ch == " " || ch == "\t" || ch == "\n" || ch == "\r";
}
utils.json.JSONTokenizer.prototype.isDigit = function(ch) {
	return ch >= "0" && ch <= "9";
}
utils.json.JSONTokenizer.prototype.isHexDigit = function(ch) {
	var uc = ch.toUpperCase();
	return this.isDigit(ch) || uc >= "A" && uc <= "F";
}
utils.json.JSONTokenizer.prototype.parseError = function(message) {
	throw new utils.json.JSONParseError(message,this.loc,this.jsonString);
}
utils.json.JSONTokenizer.prototype.__class__ = utils.json.JSONTokenizer;
realtime.cloud.view.PageNotFoundView = function(p) {
	if( p === $_ ) return;
	realtime.cloud.view.BaseView.call(this);
	this.viewName = "PageNotFoundView";
}
realtime.cloud.view.PageNotFoundView.__name__ = ["realtime","cloud","view","PageNotFoundView"];
realtime.cloud.view.PageNotFoundView.__super__ = realtime.cloud.view.BaseView;
for(var k in realtime.cloud.view.BaseView.prototype ) realtime.cloud.view.PageNotFoundView.prototype[k] = realtime.cloud.view.BaseView.prototype[k];
realtime.cloud.view.PageNotFoundView.prototype.transitionIn = function(event) {
	var me = this;
	var viewable = utils.CommonJS.get(".viewable");
	var contents = utils.CommonJS.get(".viewable .inner .contents");
	Firmin.animate(viewable,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element) {
		Firmin.animate(contents,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element1) {
			me.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,event);
		});
	});
}
realtime.cloud.view.PageNotFoundView.prototype.transitionOut = function(event) {
	var me = this;
	var viewable = utils.CommonJS.get(".viewable");
	var contents = utils.CommonJS.get(".viewable .inner .contents");
	Firmin.animate(contents,{ opacity : 0, timingFunction : "ease-out"},"250ms",function(element) {
		Firmin.animate(viewable,{ opacity : 0, timingFunction : "ease-out"},"250ms",function(element1) {
			me.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,event);
		});
	});
}
realtime.cloud.view.PageNotFoundView.prototype.__class__ = realtime.cloud.view.PageNotFoundView;
realtime.cloud.view.PageNotFoundView.__interfaces__ = [realtime.cloud.view.IView];
hxevents.Dispatcher = function(p) {
	if( p === $_ ) return;
	this.handlers = new Array();
}
hxevents.Dispatcher.__name__ = ["hxevents","Dispatcher"];
hxevents.Dispatcher.stop = function() {
	throw hxevents.EventException.StopPropagation;
}
hxevents.Dispatcher.prototype.handlers = null;
hxevents.Dispatcher.prototype.add = function(h) {
	this.handlers.push(h);
	return h;
}
hxevents.Dispatcher.prototype.addOnce = function(h) {
	var me = this;
	var _h = null;
	_h = function(v) {
		me.remove(_h);
		h(v);
	};
	this.add(_h);
	return _h;
}
hxevents.Dispatcher.prototype.remove = function(h) {
	var _g1 = 0, _g = this.handlers.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(Reflect.compareMethods(this.handlers[i],h)) return this.handlers.splice(i,1)[0];
	}
	return null;
}
hxevents.Dispatcher.prototype.clear = function() {
	this.handlers = new Array();
}
hxevents.Dispatcher.prototype.dispatch = function(e) {
	try {
		var list = this.handlers.copy();
		var _g = 0;
		while(_g < list.length) {
			var l = list[_g];
			++_g;
			l(e);
		}
		return true;
	} catch( exc ) {
		if( js.Boot.__instanceof(exc,hxevents.EventException) ) {
			return false;
		} else throw(exc);
	}
}
hxevents.Dispatcher.prototype.has = function(h) {
	if(null == h) return this.handlers.length > 0; else {
		var _g = 0, _g1 = this.handlers;
		while(_g < _g1.length) {
			var handler = _g1[_g];
			++_g;
			if(h == handler) return true;
		}
		return false;
	}
}
hxevents.Dispatcher.prototype.__class__ = hxevents.Dispatcher;
realtime.cloud.visualisation.Particle = function(x,y) {
	if( x === $_ ) return;
	if(y == null) y = 0;
	if(x == null) x = 0;
	realtime.cloud.visualisation.Point.call(this,x,y);
	this.velocity = new realtime.cloud.visualisation.Velocity();
	this.rotationRadius = 0;
	this.rotation = 0;
}
realtime.cloud.visualisation.Particle.__name__ = ["realtime","cloud","visualisation","Particle"];
realtime.cloud.visualisation.Particle.__super__ = realtime.cloud.visualisation.Point;
for(var k in realtime.cloud.visualisation.Point.prototype ) realtime.cloud.visualisation.Particle.prototype[k] = realtime.cloud.visualisation.Point.prototype[k];
realtime.cloud.visualisation.Particle.prototype.velocity = null;
realtime.cloud.visualisation.Particle.prototype.rotation = null;
realtime.cloud.visualisation.Particle.prototype.rotationRadius = null;
realtime.cloud.visualisation.Particle.prototype.__class__ = realtime.cloud.visualisation.Particle;
realtime.cloud.Application = function(stage) {
	if( stage === $_ ) return;
	this.stage = stage;
	this.context = new realtime.cloud.Context(this.stage,false);
	this.context.addEventHandler(xirsys.cube.events.AgentEvent.STARTUP_COMPLETE,$closure(this,"handleStartup"));
	this.context.initiate();
}
realtime.cloud.Application.__name__ = ["realtime","cloud","Application"];
realtime.cloud.Application.prototype.stage = null;
realtime.cloud.Application.prototype.context = null;
realtime.cloud.Application.prototype.handleStartup = function(evt) {
	this.context.handleStartup(evt);
}
realtime.cloud.Application.prototype.__class__ = realtime.cloud.Application;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
utils.json.JSONTokenType = { __ename__ : ["utils","json","JSONTokenType"], __constructs__ : ["tUNKNOWN","tCOMMA","tLEFT_BRACE","tRIGHT_BRACE","tLEFT_BRACKET","tRIGHT_BRACKET","tCOLON","tTRUE","tFALSE","tNULL","tSTRING","tNUMBER","tNAN"] }
utils.json.JSONTokenType.tUNKNOWN = ["tUNKNOWN",0];
utils.json.JSONTokenType.tUNKNOWN.toString = $estr;
utils.json.JSONTokenType.tUNKNOWN.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tCOMMA = ["tCOMMA",1];
utils.json.JSONTokenType.tCOMMA.toString = $estr;
utils.json.JSONTokenType.tCOMMA.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tLEFT_BRACE = ["tLEFT_BRACE",2];
utils.json.JSONTokenType.tLEFT_BRACE.toString = $estr;
utils.json.JSONTokenType.tLEFT_BRACE.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tRIGHT_BRACE = ["tRIGHT_BRACE",3];
utils.json.JSONTokenType.tRIGHT_BRACE.toString = $estr;
utils.json.JSONTokenType.tRIGHT_BRACE.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tLEFT_BRACKET = ["tLEFT_BRACKET",4];
utils.json.JSONTokenType.tLEFT_BRACKET.toString = $estr;
utils.json.JSONTokenType.tLEFT_BRACKET.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tRIGHT_BRACKET = ["tRIGHT_BRACKET",5];
utils.json.JSONTokenType.tRIGHT_BRACKET.toString = $estr;
utils.json.JSONTokenType.tRIGHT_BRACKET.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tCOLON = ["tCOLON",6];
utils.json.JSONTokenType.tCOLON.toString = $estr;
utils.json.JSONTokenType.tCOLON.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tTRUE = ["tTRUE",7];
utils.json.JSONTokenType.tTRUE.toString = $estr;
utils.json.JSONTokenType.tTRUE.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tFALSE = ["tFALSE",8];
utils.json.JSONTokenType.tFALSE.toString = $estr;
utils.json.JSONTokenType.tFALSE.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tNULL = ["tNULL",9];
utils.json.JSONTokenType.tNULL.toString = $estr;
utils.json.JSONTokenType.tNULL.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tSTRING = ["tSTRING",10];
utils.json.JSONTokenType.tSTRING.toString = $estr;
utils.json.JSONTokenType.tSTRING.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tNUMBER = ["tNUMBER",11];
utils.json.JSONTokenType.tNUMBER.toString = $estr;
utils.json.JSONTokenType.tNUMBER.__enum__ = utils.json.JSONTokenType;
utils.json.JSONTokenType.tNAN = ["tNAN",12];
utils.json.JSONTokenType.tNAN.toString = $estr;
utils.json.JSONTokenType.tNAN.__enum__ = utils.json.JSONTokenType;
utils.json.JSONDecoder = function(s,strict) {
	if( s === $_ ) return;
	this.strict = strict;
	this.tokenizer = new utils.json.JSONTokenizer(s,strict);
	this.nextToken();
	this.value = this.parseValue();
	if(strict && this.nextToken() != null) this.tokenizer.parseError("Unexpected characters left in input stream!");
}
utils.json.JSONDecoder.__name__ = ["utils","json","JSONDecoder"];
utils.json.JSONDecoder.prototype.strict = null;
utils.json.JSONDecoder.prototype.value = null;
utils.json.JSONDecoder.prototype.tokenizer = null;
utils.json.JSONDecoder.prototype.token = null;
utils.json.JSONDecoder.prototype.getValue = function() {
	return this.value;
}
utils.json.JSONDecoder.prototype.nextToken = function() {
	return this.token = this.tokenizer.getNextToken();
}
utils.json.JSONDecoder.prototype.parseArray = function() {
	var a = new Array();
	this.nextToken();
	if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACKET) return a; else if(!this.strict && this.token.type == utils.json.JSONTokenType.tCOMMA) {
		this.nextToken();
		if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACKET) return a; else this.tokenizer.parseError("Leading commas are not supported.  Expecting ']' but found " + this.token.value);
	}
	while(true) {
		a.push(this.parseValue());
		this.nextToken();
		if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACKET) return a; else if(this.token.type == utils.json.JSONTokenType.tCOMMA) {
			this.nextToken();
			if(!this.strict) {
				if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACKET) return a;
			}
		} else this.tokenizer.parseError("Expecting ] or , but found " + this.token.value);
	}
	return null;
}
utils.json.JSONDecoder.prototype.parseObject = function() {
	var o = { };
	var key;
	this.nextToken();
	if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACE) return o; else if(!this.strict && this.token.type == utils.json.JSONTokenType.tCOMMA) {
		this.nextToken();
		if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACE) return o; else this.tokenizer.parseError("Leading commas are not supported.  Expecting '}' but found " + this.token.value);
	}
	while(true) if(this.token.type == utils.json.JSONTokenType.tSTRING) {
		key = Std.string(this.token.value);
		this.nextToken();
		if(this.token.type == utils.json.JSONTokenType.tCOLON) {
			this.nextToken();
			o[key] = this.parseValue();
			this.nextToken();
			if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACE) return o; else if(this.token.type == utils.json.JSONTokenType.tCOMMA) {
				this.nextToken();
				if(!this.strict) {
					if(this.token.type == utils.json.JSONTokenType.tRIGHT_BRACE) return o;
				}
			} else this.tokenizer.parseError("Expecting } or , but found " + this.token.value);
		} else this.tokenizer.parseError("Expecting : but found " + this.token.value);
	} else this.tokenizer.parseError("Expecting string but found " + this.token.value);
	return null;
}
utils.json.JSONDecoder.prototype.parseValue = function() {
	if(this.token == null) this.tokenizer.parseError("Unexpected end of input");
	switch( (this.token.type)[1] ) {
	case 2:
		return this.parseObject();
	case 4:
		return this.parseArray();
	case 10:
		return this.token.value;
	case 11:
		return this.token.value;
	case 7:
		return true;
	case 8:
		return false;
	case 9:
		return null;
	case 12:
		if(!this.strict) return this.token.value; else this.tokenizer.parseError("Unexpected " + this.token.value);
		break;
	default:
		this.tokenizer.parseError("Unexpected " + this.token.value);
	}
	return null;
}
utils.json.JSONDecoder.prototype.__class__ = utils.json.JSONDecoder;
haxe.Timer = function(time_ms) {
	if( time_ms === $_ ) return;
	var arr = haxe_timers;
	this.id = arr.length;
	arr[this.id] = this;
	this.timerId = window.setInterval("haxe_timers[" + this.id + "].run();",time_ms);
}
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.measure = function(f,pos) {
	var t0 = haxe.Timer.stamp();
	var r = f();
	haxe.Log.trace(haxe.Timer.stamp() - t0 + "s",pos);
	return r;
}
haxe.Timer.stamp = function() {
	return Date.now().getTime() / 1000;
}
haxe.Timer.prototype.id = null;
haxe.Timer.prototype.timerId = null;
haxe.Timer.prototype.stop = function() {
	if(this.id == null) return;
	window.clearInterval(this.timerId);
	var arr = haxe_timers;
	arr[this.id] = null;
	if(this.id > 100 && this.id == arr.length - 1) {
		var p = this.id - 1;
		while(p >= 0 && arr[p] == null) p--;
		arr = arr.slice(0,p + 1);
	}
	this.id = null;
}
haxe.Timer.prototype.run = function() {
}
haxe.Timer.prototype.__class__ = haxe.Timer;
xirsys.cube.core.EventMap = function(eventDispatcher) {
	if( eventDispatcher === $_ ) return;
	this.listeners = new Array();
	this.eventDispatcher = eventDispatcher;
	this.dispatcherListeningEnabled = true;
}
xirsys.cube.core.EventMap.__name__ = ["xirsys","cube","core","EventMap"];
xirsys.cube.core.EventMap.prototype.eventDispatcher = null;
xirsys.cube.core.EventMap.prototype.dispatcherListeningEnabled = null;
xirsys.cube.core.EventMap.prototype.listeners = null;
xirsys.cube.core.EventMap.prototype.mapListener = function(dispatcher,type,listener,eventClass) {
	if(this.dispatcherListeningEnabled == false && dispatcher == this.eventDispatcher) throw new xirsys.cube.core.CubeError(xirsys.cube.core.CubeError.E_EVENTMAP_NOSNOOPING);
	var params;
	var i = this.listeners.length;
	while(--i > -1) {
		params = this.listeners[i];
		if(params.dispatcher == dispatcher && params.type == type && params.listener == listener && params.eventClass == eventClass) return;
	}
	var me = this;
	var cb = function(event) {
		me.routeEventToListener(event,listener,eventClass);
	};
	params = { dispatcher : dispatcher, type : type, listener : listener, eventClass : eventClass, cb : cb};
	this.listeners.push(params);
	dispatcher.addEventHandler(type,cb);
}
xirsys.cube.core.EventMap.prototype.unmapListener = function(dispatcher,type,listener,eventClass) {
	var params;
	var i = this.listeners.length;
	while(i >= 0) {
		params = this.listeners[i];
		if(params.dispatcher == dispatcher && params.type == type && params.listener == listener && params.eventClass == eventClass) {
			dispatcher.remove(type,params.cb);
			this.listeners.splice(i,1);
			return;
		}
		i--;
	}
}
xirsys.cube.core.EventMap.prototype.unmapListeners = function() {
	var params;
	var dispatcher;
	while((function($this) {
		var $r;
		params = $this.listeners.pop();
		$r = params != null;
		return $r;
	}(this))) {
		dispatcher = params.dispatcher;
		dispatcher.remove(params.type,params.cb);
	}
}
xirsys.cube.core.EventMap.prototype.routeEventToListener = function(event,listener,originalEventClass) {
	if(Std["is"](event,originalEventClass)) listener(event);
}
xirsys.cube.core.EventMap.prototype.__class__ = xirsys.cube.core.EventMap;
xirsys.cube.core.EventMap.__interfaces__ = [xirsys.cube.abstract.IEventMap];
realtime.cloud.events.LoaderInitialisationEvent = function(p) {
}
realtime.cloud.events.LoaderInitialisationEvent.__name__ = ["realtime","cloud","events","LoaderInitialisationEvent"];
realtime.cloud.events.LoaderInitialisationEvent.prototype.__class__ = realtime.cloud.events.LoaderInitialisationEvent;
realtime.cloud.events.LoaderInitialisationEvent.__interfaces__ = [xirsys.cube.events.IEvent];
if(!haxe.xml) haxe.xml = {}
if(!haxe.xml._Fast) haxe.xml._Fast = {}
haxe.xml._Fast.NodeAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.NodeAccess.__name__ = ["haxe","xml","_Fast","NodeAccess"];
haxe.xml._Fast.NodeAccess.prototype.__x = null;
haxe.xml._Fast.NodeAccess.prototype.resolve = function(name) {
	var x = this.__x.elementsNamed(name).next();
	if(x == null) {
		var xname = this.__x.nodeType == Xml.Document?"Document":this.__x.getNodeName();
		throw xname + " is missing element " + name;
	}
	return new haxe.xml.Fast(x);
}
haxe.xml._Fast.NodeAccess.prototype.__class__ = haxe.xml._Fast.NodeAccess;
haxe.xml._Fast.AttribAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.AttribAccess.__name__ = ["haxe","xml","_Fast","AttribAccess"];
haxe.xml._Fast.AttribAccess.prototype.__x = null;
haxe.xml._Fast.AttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	var v = this.__x.get(name);
	if(v == null) throw this.__x.getNodeName() + " is missing attribute " + name;
	return v;
}
haxe.xml._Fast.AttribAccess.prototype.__class__ = haxe.xml._Fast.AttribAccess;
haxe.xml._Fast.HasAttribAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.HasAttribAccess.__name__ = ["haxe","xml","_Fast","HasAttribAccess"];
haxe.xml._Fast.HasAttribAccess.prototype.__x = null;
haxe.xml._Fast.HasAttribAccess.prototype.resolve = function(name) {
	if(this.__x.nodeType == Xml.Document) throw "Cannot access document attribute " + name;
	return this.__x.exists(name);
}
haxe.xml._Fast.HasAttribAccess.prototype.__class__ = haxe.xml._Fast.HasAttribAccess;
haxe.xml._Fast.HasNodeAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.HasNodeAccess.__name__ = ["haxe","xml","_Fast","HasNodeAccess"];
haxe.xml._Fast.HasNodeAccess.prototype.__x = null;
haxe.xml._Fast.HasNodeAccess.prototype.resolve = function(name) {
	return this.__x.elementsNamed(name).hasNext();
}
haxe.xml._Fast.HasNodeAccess.prototype.__class__ = haxe.xml._Fast.HasNodeAccess;
haxe.xml._Fast.NodeListAccess = function(x) {
	if( x === $_ ) return;
	this.__x = x;
}
haxe.xml._Fast.NodeListAccess.__name__ = ["haxe","xml","_Fast","NodeListAccess"];
haxe.xml._Fast.NodeListAccess.prototype.__x = null;
haxe.xml._Fast.NodeListAccess.prototype.resolve = function(name) {
	var l = new List();
	var $it0 = this.__x.elementsNamed(name);
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(new haxe.xml.Fast(x));
	}
	return l;
}
haxe.xml._Fast.NodeListAccess.prototype.__class__ = haxe.xml._Fast.NodeListAccess;
haxe.xml.Fast = function(x) {
	if( x === $_ ) return;
	if(x.nodeType != Xml.Document && x.nodeType != Xml.Element) throw "Invalid nodeType " + x.nodeType;
	this.x = x;
	this.node = new haxe.xml._Fast.NodeAccess(x);
	this.nodes = new haxe.xml._Fast.NodeListAccess(x);
	this.att = new haxe.xml._Fast.AttribAccess(x);
	this.has = new haxe.xml._Fast.HasAttribAccess(x);
	this.hasNode = new haxe.xml._Fast.HasNodeAccess(x);
}
haxe.xml.Fast.__name__ = ["haxe","xml","Fast"];
haxe.xml.Fast.prototype.x = null;
haxe.xml.Fast.prototype.name = null;
haxe.xml.Fast.prototype.innerData = null;
haxe.xml.Fast.prototype.innerHTML = null;
haxe.xml.Fast.prototype.node = null;
haxe.xml.Fast.prototype.nodes = null;
haxe.xml.Fast.prototype.att = null;
haxe.xml.Fast.prototype.has = null;
haxe.xml.Fast.prototype.hasNode = null;
haxe.xml.Fast.prototype.elements = null;
haxe.xml.Fast.prototype.getName = function() {
	return this.x.nodeType == Xml.Document?"Document":this.x.getNodeName();
}
haxe.xml.Fast.prototype.getInnerData = function() {
	var it = this.x.iterator();
	if(!it.hasNext()) throw this.getName() + " does not have data";
	var v = it.next();
	if(it.hasNext()) throw this.getName() + " does not only have data";
	if(v.nodeType != Xml.PCData && v.nodeType != Xml.CData) throw this.getName() + " does not have data";
	return v.getNodeValue();
}
haxe.xml.Fast.prototype.getInnerHTML = function() {
	var s = new StringBuf();
	var $it0 = this.x.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		s.add(x.toString());
	}
	return s.b.join("");
}
haxe.xml.Fast.prototype.getElements = function() {
	var it = this.x.elements();
	return { hasNext : $closure(it,"hasNext"), next : function() {
		var x = it.next();
		if(x == null) return null;
		return new haxe.xml.Fast(x);
	}};
}
haxe.xml.Fast.prototype.__class__ = haxe.xml.Fast;
realtime.cloud.events.LoaderProgressEvent = function(precentage,total,loaded) {
	if( precentage === $_ ) return;
	utils.http.HttpLoaderProgressEvent.call(this,precentage,total,loaded);
}
realtime.cloud.events.LoaderProgressEvent.__name__ = ["realtime","cloud","events","LoaderProgressEvent"];
realtime.cloud.events.LoaderProgressEvent.__super__ = utils.http.HttpLoaderProgressEvent;
for(var k in utils.http.HttpLoaderProgressEvent.prototype ) realtime.cloud.events.LoaderProgressEvent.prototype[k] = utils.http.HttpLoaderProgressEvent.prototype[k];
realtime.cloud.events.LoaderProgressEvent.prototype.__class__ = realtime.cloud.events.LoaderProgressEvent;
realtime.cloud.events.LoaderProgressEvent.__interfaces__ = [xirsys.cube.events.IEvent];
haxe.rtti.Meta = function() { }
haxe.rtti.Meta.__name__ = ["haxe","rtti","Meta"];
haxe.rtti.Meta.getType = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.obj == null?{ }:meta.obj;
}
haxe.rtti.Meta.getStatics = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.statics == null?{ }:meta.statics;
}
haxe.rtti.Meta.getFields = function(t) {
	var meta = t.__meta__;
	return meta == null || meta.fields == null?{ }:meta.fields;
}
haxe.rtti.Meta.prototype.__class__ = haxe.rtti.Meta;
realtime.cloud.visualisation.ParticleSize = function(current,target) {
	if( current === $_ ) return;
	if(target == null) target = 0;
	if(current == null) current = 0;
	this.current = current;
	this.target = target;
}
realtime.cloud.visualisation.ParticleSize.__name__ = ["realtime","cloud","visualisation","ParticleSize"];
realtime.cloud.visualisation.ParticleSize.prototype.current = null;
realtime.cloud.visualisation.ParticleSize.prototype.target = null;
realtime.cloud.visualisation.ParticleSize.prototype.__class__ = realtime.cloud.visualisation.ParticleSize;
realtime.cloud.mediator.StartupMediator = function(p) {
	if( p === $_ ) return;
	realtime.cloud.mediator.BaseMediator.call(this);
}
realtime.cloud.mediator.StartupMediator.__name__ = ["realtime","cloud","mediator","StartupMediator"];
realtime.cloud.mediator.StartupMediator.__super__ = realtime.cloud.mediator.BaseMediator;
for(var k in realtime.cloud.mediator.BaseMediator.prototype ) realtime.cloud.mediator.StartupMediator.prototype[k] = realtime.cloud.mediator.BaseMediator.prototype[k];
realtime.cloud.mediator.StartupMediator.prototype.view = null;
realtime.cloud.mediator.StartupMediator.prototype.onRegister = function() {
	this.setInstanceOfView(this.view);
	realtime.cloud.mediator.BaseMediator.prototype.onRegister.call(this);
}
realtime.cloud.mediator.StartupMediator.prototype.onTransitionInCompleted = function(event) {
	realtime.cloud.mediator.BaseMediator.prototype.onTransitionInCompleted.call(this,event);
	var configurationURL = realtime.cloud.Configuration.CONFIGURATION_URL;
	var assetURL = realtime.cloud.Configuration.ASSET_URL;
	this.loaderService.init(configurationURL,assetURL);
}
realtime.cloud.mediator.StartupMediator.prototype.__class__ = realtime.cloud.mediator.StartupMediator;
utils.http.HttpLoader = function(p) {
	if( p === $_ ) return;
	xirsys.cube.events.CentralDispatcher.call(this);
	this.allRequests = new Hash();
	this.successfulRequests = new Hash();
	this.failedRequests = new Hash();
}
utils.http.HttpLoader.__name__ = ["utils","http","HttpLoader"];
utils.http.HttpLoader.__super__ = xirsys.cube.events.CentralDispatcher;
for(var k in xirsys.cube.events.CentralDispatcher.prototype ) utils.http.HttpLoader.prototype[k] = xirsys.cube.events.CentralDispatcher.prototype[k];
utils.http.HttpLoader.prototype.allRequests = null;
utils.http.HttpLoader.prototype.successfulRequests = null;
utils.http.HttpLoader.prototype.failedRequests = null;
utils.http.HttpLoader.prototype.addRequest = function(url,method,asynchronous,username,password) {
	if(password == null) password = "";
	if(username == null) username = "";
	if(asynchronous == null) asynchronous = true;
	if(method == null) method = "GET";
	var loaderRequest = new utils.http.HttpLoaderRequest();
	loaderRequest.asynchronous = asynchronous;
	loaderRequest.method = method;
	loaderRequest.username = username;
	loaderRequest.password = password;
	loaderRequest.url = url;
	this.allRequests.set(url,loaderRequest);
	return loaderRequest;
}
utils.http.HttpLoader.prototype.removeRequest = function(url) {
	var loaderRequest = this.allRequests.get(url);
	loaderRequest.httpRequest.remove(utils.http.request.HttpRequestEvent.COMPLETED,$closure(this,"onHttpRequestCompleted"));
	loaderRequest.httpRequest.remove(utils.http.request.HttpRequestEvent.ERROR,$closure(this,"onHttpRequestError"));
	this.allRequests.remove(url);
	this.successfulRequests.remove(url);
	this.failedRequests.remove(url);
}
utils.http.HttpLoader.prototype.beginRequests = function() {
	var $it0 = this.allRequests.keys();
	while( $it0.hasNext() ) {
		var url = $it0.next();
		var loaderRequest = this.allRequests.get(url);
		loaderRequest.httpRequest.addEventHandler(utils.http.request.HttpRequestEvent.COMPLETED,$closure(this,"onHttpRequestCompleted"));
		loaderRequest.httpRequest.addEventHandler(utils.http.request.HttpRequestEvent.ERROR,$closure(this,"onHttpRequestError"));
		loaderRequest.httpRequest.open(loaderRequest.url,loaderRequest.method,loaderRequest.asynchronous,loaderRequest.username,loaderRequest.password);
	}
}
utils.http.HttpLoader.prototype.handleRequestCompletion = function() {
	var loaderRequest;
	var precentageLoaded = 0;
	var totalRequests = 0;
	var totalLoaded = 0;
	var $it0 = this.allRequests.keys();
	while( $it0.hasNext() ) {
		var url = $it0.next();
		loaderRequest = this.allRequests.get(url);
		if(loaderRequest.httpRequest.isComplete() == true) totalLoaded++;
		totalRequests++;
	}
	precentageLoaded = totalLoaded / totalRequests * 100;
	this.dispatch(utils.http.HttpLoaderProgressEvent.PROGRESS,new utils.http.HttpLoaderProgressEvent(precentageLoaded,totalRequests,totalLoaded));
	if(totalRequests == totalLoaded) this.dispatch(utils.http.HttpLoaderCompletedEvent.COMPLETED,new utils.http.HttpLoaderCompletedEvent(this.allRequests,this.successfulRequests,this.failedRequests));
}
utils.http.HttpLoader.prototype.onHttpRequestCompleted = function(event) {
	var url = event.httpRequest.getUrl();
	var loaderRequest = this.allRequests.get(url);
	loaderRequest.httpRequest.remove(utils.http.request.HttpRequestEvent.COMPLETED,$closure(this,"onHttpRequestCompleted"));
	loaderRequest.httpRequest.remove(utils.http.request.HttpRequestEvent.ERROR,$closure(this,"onHttpRequestError"));
	this.successfulRequests.set(url,loaderRequest);
	this.handleRequestCompletion();
}
utils.http.HttpLoader.prototype.onHttpRequestError = function(event) {
	var url = event.httpRequest.getUrl();
	var loaderRequest = this.allRequests.get(url);
	loaderRequest.httpRequest.remove(utils.http.request.HttpRequestEvent.COMPLETED,$closure(this,"onHttpRequestCompleted"));
	loaderRequest.httpRequest.remove(utils.http.request.HttpRequestEvent.ERROR,$closure(this,"onHttpRequestError"));
	this.failedRequests.set(url,loaderRequest);
	this.handleRequestCompletion();
}
utils.http.HttpLoader.prototype.__class__ = utils.http.HttpLoader;
if(!realtime.cloud.model) realtime.cloud.model = {}
realtime.cloud.model.ViewManager = function(p) {
	if( p === $_ ) return;
	this.currentView = new realtime.cloud.events.ViewEvent();
	this.homeView = new realtime.cloud.view.HomeView();
	this.startupView = new realtime.cloud.view.StartupView();
	this.preloaderView = new realtime.cloud.view.PreloaderView();
	this.pageNotFoundView = new realtime.cloud.view.PageNotFoundView();
}
realtime.cloud.model.ViewManager.__name__ = ["realtime","cloud","model","ViewManager"];
realtime.cloud.model.ViewManager.__super__ = xirsys.cube.mvcs.Actor;
for(var k in xirsys.cube.mvcs.Actor.prototype ) realtime.cloud.model.ViewManager.prototype[k] = xirsys.cube.mvcs.Actor.prototype[k];
realtime.cloud.model.ViewManager.prototype.context = null;
realtime.cloud.model.ViewManager.prototype.currentView = null;
realtime.cloud.model.ViewManager.prototype.homeView = null;
realtime.cloud.model.ViewManager.prototype.startupView = null;
realtime.cloud.model.ViewManager.prototype.preloaderView = null;
realtime.cloud.model.ViewManager.prototype.pageNotFoundView = null;
realtime.cloud.model.ViewManager.prototype.configure = function(context) {
	this.context = context;
	this.context.getMediatorMap().mapView(realtime.cloud.view.PageNotFoundView,realtime.cloud.mediator.PageNotFoundMediator);
	this.context.getMediatorMap().mapView(realtime.cloud.view.PreloaderView,realtime.cloud.mediator.PreloaderMediator);
	this.context.getMediatorMap().mapView(realtime.cloud.view.StartupView,realtime.cloud.mediator.StartupMediator);
	this.context.getMediatorMap().mapView(realtime.cloud.view.HomeView,realtime.cloud.mediator.HomeMediator);
	this.context.getMediatorMap().createMediator(this.pageNotFoundView);
	this.context.getMediatorMap().createMediator(this.preloaderView);
	this.context.getMediatorMap().createMediator(this.startupView);
	this.context.getMediatorMap().createMediator(this.homeView);
	this.pageNotFoundView.init(context.getContainer());
	this.preloaderView.init(context.getContainer());
	this.startupView.init(context.getContainer());
	this.homeView.init(context.getContainer());
}
realtime.cloud.model.ViewManager.prototype.__class__ = realtime.cloud.model.ViewManager;
realtime.cloud.events.ViewEvent = function(p) {
	if( p === $_ ) return;
	this.path = "";
	this.parameters = new Hash();
}
realtime.cloud.events.ViewEvent.__name__ = ["realtime","cloud","events","ViewEvent"];
realtime.cloud.events.ViewEvent.prototype.path = null;
realtime.cloud.events.ViewEvent.prototype.parameters = null;
realtime.cloud.events.ViewEvent.prototype.__class__ = realtime.cloud.events.ViewEvent;
realtime.cloud.events.ViewEvent.__interfaces__ = [xirsys.cube.events.IEvent];
realtime.cloud.visualisation.Velocity = function(x,y,rotation) {
	if( x === $_ ) return;
	if(rotation == null) rotation = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	realtime.cloud.visualisation.Point.call(this,x,y);
	this.rotation = rotation;
}
realtime.cloud.visualisation.Velocity.__name__ = ["realtime","cloud","visualisation","Velocity"];
realtime.cloud.visualisation.Velocity.__super__ = realtime.cloud.visualisation.Point;
for(var k in realtime.cloud.visualisation.Point.prototype ) realtime.cloud.visualisation.Velocity.prototype[k] = realtime.cloud.visualisation.Point.prototype[k];
realtime.cloud.visualisation.Velocity.prototype.rotation = null;
realtime.cloud.visualisation.Velocity.prototype.__class__ = realtime.cloud.visualisation.Velocity;
xirsys.cube.events.AgentEvent = function(p) {
}
xirsys.cube.events.AgentEvent.__name__ = ["xirsys","cube","events","AgentEvent"];
xirsys.cube.events.AgentEvent.prototype.type = null;
xirsys.cube.events.AgentEvent.prototype.__class__ = xirsys.cube.events.AgentEvent;
xirsys.cube.events.AgentEvent.__interfaces__ = [xirsys.cube.events.IEvent];
xirsys.cube.core.CubeError = function(message,id) {
	if( message === $_ ) return;
	if(id == null) id = 0;
	if(message == null) message = "No message specified";
	this.message = message;
	this.id = id;
}
xirsys.cube.core.CubeError.__name__ = ["xirsys","cube","core","CubeError"];
xirsys.cube.core.CubeError.prototype.message = null;
xirsys.cube.core.CubeError.prototype.id = null;
xirsys.cube.core.CubeError.prototype.__class__ = xirsys.cube.core.CubeError;
realtime.cloud.visualisation.Playhead = function(index,length,size,colour) {
	if( index === $_ ) return;
	if(size == null) size = 2;
	if(length == null) length = 5;
	if(index == null) index = 0;
	this.color = colour != null?colour:new realtime.cloud.visualisation.Colour(0,0,0,0.8);
	this.positions = new Array();
	this.index = index;
	this.length = length;
	this.size = size;
}
realtime.cloud.visualisation.Playhead.__name__ = ["realtime","cloud","visualisation","Playhead"];
realtime.cloud.visualisation.Playhead.prototype.positions = null;
realtime.cloud.visualisation.Playhead.prototype.color = null;
realtime.cloud.visualisation.Playhead.prototype.index = null;
realtime.cloud.visualisation.Playhead.prototype.size = null;
realtime.cloud.visualisation.Playhead.prototype.length = null;
realtime.cloud.visualisation.Playhead.prototype.distanceTo = function(point) {
	var position = this.get();
	var directionX = point.x - position.x;
	var directionY = point.y - position.y;
	return Math.sqrt(directionX * directionX + directionY * directionY);
}
realtime.cloud.visualisation.Playhead.prototype.add = function(position) {
	if(this.positions.length > 0) while(this.positions.length > this.length) this.positions.shift();
	this.positions.push(position);
}
realtime.cloud.visualisation.Playhead.prototype.get = function() {
	return this.positions[this.positions.length - 1];
}
realtime.cloud.visualisation.Playhead.prototype.__class__ = realtime.cloud.visualisation.Playhead;
realtime.cloud.view.HomeView = function(p) {
	if( p === $_ ) return;
	realtime.cloud.view.BaseView.call(this);
	this.viewName = "HomeView";
	this.visualisation = new realtime.cloud.visualisation.Visualisation();
}
realtime.cloud.view.HomeView.__name__ = ["realtime","cloud","view","HomeView"];
realtime.cloud.view.HomeView.__super__ = realtime.cloud.view.BaseView;
for(var k in realtime.cloud.view.BaseView.prototype ) realtime.cloud.view.HomeView.prototype[k] = realtime.cloud.view.BaseView.prototype[k];
realtime.cloud.view.HomeView.prototype.visualisation = null;
realtime.cloud.view.HomeView.prototype.lastMovementDetected = null;
realtime.cloud.view.HomeView.prototype.activate = function() {
	var canvas = utils.CommonJS.get(".visualisation canvas");
	this.visualisation.setCanvas(canvas);
	this.visualisation.activate();
	this.visualisation.createCoordinate(230,105);
	this.visualisation.createCoordinate(620,150);
	this.visualisation.createCoordinate(480,210);
	this.visualisation.createCoordinate(800,260);
	this.visualisation.createCoordinate(210,275);
	this.visualisation.activate();
	realtime.cloud.view.BaseView.prototype.activate.call(this);
}
realtime.cloud.view.HomeView.prototype.deactivate = function() {
	this.visualisation.deactivate();
	realtime.cloud.view.BaseView.prototype.deactivate.call(this);
}
realtime.cloud.view.HomeView.prototype.transitionIn = function(event) {
	var me = this;
	var header = utils.CommonJS.get("header");
	var viewable = utils.CommonJS.get(".viewable");
	var title = utils.CommonJS.get(".title");
	var copy = utils.CommonJS.get(".copy");
	var visualisation = utils.CommonJS.get(".visualisation");
	var footer = utils.CommonJS.get("footer");
	Firmin.animate(header,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element) {
		Firmin.animate(viewable,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element1) {
			Firmin.animate(title,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element2) {
				Firmin.animate(copy,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element3) {
					Firmin.animate(visualisation,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element4) {
						Firmin.animate(footer,{ opacity : 1, timingFunction : "ease-out"},"250ms",function(element5) {
							me.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED,event);
						});
					});
				});
			});
		});
	});
}
realtime.cloud.view.HomeView.prototype.transitionOut = function(event) {
	this.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED,event);
}
realtime.cloud.view.HomeView.prototype.__class__ = realtime.cloud.view.HomeView;
realtime.cloud.view.HomeView.__interfaces__ = [realtime.cloud.view.IView];
realtime.cloud.visualisation.CoordinatePoint = function(x,y) {
	if( x === $_ ) return;
	if(y == null) y = 0;
	if(x == null) x = 0;
	realtime.cloud.visualisation.Point.call(this,x,y);
	this.position = new realtime.cloud.visualisation.Point();
	this.reflection = new realtime.cloud.visualisation.Point();
	this.colour = new realtime.cloud.visualisation.Colour();
	this.size = new realtime.cloud.visualisation.ParticleSize(0,16);
	this.particles = new Array();
	this.dragging = false;
	this.scale = 1;
}
realtime.cloud.visualisation.CoordinatePoint.__name__ = ["realtime","cloud","visualisation","CoordinatePoint"];
realtime.cloud.visualisation.CoordinatePoint.__super__ = realtime.cloud.visualisation.Point;
for(var k in realtime.cloud.visualisation.Point.prototype ) realtime.cloud.visualisation.CoordinatePoint.prototype[k] = realtime.cloud.visualisation.Point.prototype[k];
realtime.cloud.visualisation.CoordinatePoint.prototype.particles = null;
realtime.cloud.visualisation.CoordinatePoint.prototype.position = null;
realtime.cloud.visualisation.CoordinatePoint.prototype.reflection = null;
realtime.cloud.visualisation.CoordinatePoint.prototype.size = null;
realtime.cloud.visualisation.CoordinatePoint.prototype.scale = null;
realtime.cloud.visualisation.CoordinatePoint.prototype.colour = null;
realtime.cloud.visualisation.CoordinatePoint.prototype.dragging = null;
realtime.cloud.visualisation.CoordinatePoint.prototype.dispose = function() {
	this.position = null;
	this.reflection = null;
	this.colour = null;
	this.size = null;
	this.particles = null;
}
realtime.cloud.visualisation.CoordinatePoint.prototype.generatingParticleTrial = function(direction) {
	this.size.current = 12;
	var quantity = 20 + Math.round(Math.random() * 20);
	var _g = 0;
	while(_g < quantity) {
		var i = _g++;
		var particle = new realtime.cloud.visualisation.Particle();
		particle.x = this.x;
		particle.y = this.y;
		var directionX = direction.x - particle.x;
		var directionY = direction.y - particle.y;
		particle.x += directionX * (0.6 * (i / quantity));
		particle.y += directionY * (0.6 * (i / quantity));
		var rotationRadius = (directionX + directionY) / 500 * (i / quantity);
		particle.x += -rotationRadius + Math.random() * (rotationRadius + rotationRadius);
		particle.y += -rotationRadius + Math.random() * (rotationRadius + rotationRadius);
		particle.velocity.x = directionX / (100 + Math.random() * 500);
		particle.velocity.y = directionY / (100 + Math.random() * 500);
		particle.velocity.rotation = -0.1 + Math.random() * 0.2;
		particle.rotationRadius = Math.random() * 12;
		this.particles.push(particle);
	}
}
realtime.cloud.visualisation.CoordinatePoint.prototype.__class__ = realtime.cloud.visualisation.CoordinatePoint;
utils.http.request.HttpRequestEvent = function(httpRequest) {
	if( httpRequest === $_ ) return;
	this.httpRequest = httpRequest;
}
utils.http.request.HttpRequestEvent.__name__ = ["utils","http","request","HttpRequestEvent"];
utils.http.request.HttpRequestEvent.prototype.httpRequest = null;
utils.http.request.HttpRequestEvent.prototype.__class__ = utils.http.request.HttpRequestEvent;
utils.http.request.HttpRequestEvent.__interfaces__ = [xirsys.cube.events.IEvent];
utils.json.JSONEncoder = function(value) {
	if( value === $_ ) return;
	this.jsonString = this.convertToString(value);
}
utils.json.JSONEncoder.__name__ = ["utils","json","JSONEncoder"];
utils.json.JSONEncoder.prototype.jsonString = null;
utils.json.JSONEncoder.prototype.getString = function() {
	return this.jsonString;
}
utils.json.JSONEncoder.prototype.convertToString = function(value) {
	if(Std["is"](value,List) || Std["is"](value,IntHash)) value = Lambda.array(value);
	if(Std["is"](value,Hash)) value = this.mapHash(value);
	if(Std["is"](value,String)) return this.escapeString((function($this) {
		var $r;
		var $t = value;
		if(Std["is"]($t,String)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))); else if(Std["is"](value,Float)) return Math.isFinite((function($this) {
		var $r;
		var $t = value;
		if(Std["is"]($t,Float)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this)))?value + "":"null"; else if(Std["is"](value,Bool)) return value?"true":"false"; else if(Std["is"](value,Array)) return this.arrayToString((function($this) {
		var $r;
		var $t = value;
		if(Std["is"]($t,Array)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))); else if(Std["is"](value,Dynamic) && value != null) return this.objectToString(value);
	return "null";
}
utils.json.JSONEncoder.prototype.mapHash = function(value) {
	var ret = { };
	var $it0 = value.keys();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		ret[i] = value.get(i);
	}
	return ret;
}
utils.json.JSONEncoder.prototype.escapeString = function(str) {
	var s = "";
	var ch;
	var len = str.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		ch = str.charAt(i);
		switch(ch) {
		case "\"":
			s += "\\\"";
			break;
		case "\\":
			s += "\\\\";
			break;
		case "\n":
			s += "\\n";
			break;
		case "\r":
			s += "\\r";
			break;
		case "\t":
			s += "\\t";
			break;
		default:
			var code = ch.charCodeAt(0);
			if(ch < " " || code > 127) {
				var hexCode = StringTools.hex(ch.charCodeAt(0));
				var zeroPad = "";
				var _g2 = 0, _g1 = 4 - hexCode.length;
				while(_g2 < _g1) {
					var j = _g2++;
					zeroPad += "0";
				}
				s += "\\u" + zeroPad + hexCode;
			} else s += ch;
		}
	}
	return "\"" + s + "\"";
}
utils.json.JSONEncoder.prototype.arrayToString = function(a) {
	var s = "";
	var _g1 = 0, _g = a.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(s.length > 0) s += ",";
		s += this.convertToString(a[i]);
	}
	return "[" + s + "]";
}
utils.json.JSONEncoder.prototype.objectToString = function(o) {
	var s = "";
	var value;
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		value = Reflect.field(o,key);
		if(!Reflect.isFunction(value)) {
			if(s.length > 0) s += ",";
			s += this.escapeString(key) + ":" + this.convertToString(value);
		}
	}
	return "{" + s + "}";
}
utils.json.JSONEncoder.prototype.__class__ = utils.json.JSONEncoder;
realtime.cloud.commands.ChangeViewCommand = function() { }
realtime.cloud.commands.ChangeViewCommand.__name__ = ["realtime","cloud","commands","ChangeViewCommand"];
realtime.cloud.commands.ChangeViewCommand.__super__ = xirsys.cube.mvcs.Command;
for(var k in xirsys.cube.mvcs.Command.prototype ) realtime.cloud.commands.ChangeViewCommand.prototype[k] = xirsys.cube.mvcs.Command.prototype[k];
realtime.cloud.commands.ChangeViewCommand.prototype.event = null;
realtime.cloud.commands.ChangeViewCommand.prototype.viewManager = null;
realtime.cloud.commands.ChangeViewCommand.prototype.execute = function() {
	var dispatchEvent = new realtime.cloud.events.ViewEvent();
	dispatchEvent.path = this.viewManager.currentView.path;
	dispatchEvent.parameters = this.viewManager.currentView.parameters;
	this.viewManager.currentView = this.event;
	this.eventDispatcher.dispatch(realtime.cloud.events.ViewEvent.TRANSITION_OUT,dispatchEvent);
}
realtime.cloud.commands.ChangeViewCommand.prototype.__class__ = realtime.cloud.commands.ChangeViewCommand;
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
Xml = function(p) {
}
Xml.__name__ = ["Xml"];
Xml.Element = null;
Xml.PCData = null;
Xml.CData = null;
Xml.Comment = null;
Xml.DocType = null;
Xml.Prolog = null;
Xml.Document = null;
Xml.parse = function(str) {
	var rules = [Xml.enode,Xml.epcdata,Xml.eend,Xml.ecdata,Xml.edoctype,Xml.ecomment,Xml.eprolog];
	var nrules = rules.length;
	var current = Xml.createDocument();
	var stack = new List();
	while(str.length > 0) {
		var i = 0;
		try {
			while(i < nrules) {
				var r = rules[i];
				if(r.match(str)) {
					switch(i) {
					case 0:
						var x = Xml.createElement(r.matched(1));
						current.addChild(x);
						str = r.matchedRight();
						while(Xml.eattribute.match(str)) {
							x.set(Xml.eattribute.matched(1),Xml.eattribute.matched(3));
							str = Xml.eattribute.matchedRight();
						}
						if(!Xml.eclose.match(str)) {
							i = nrules;
							throw "__break__";
						}
						if(Xml.eclose.matched(1) == ">") {
							stack.push(current);
							current = x;
						}
						str = Xml.eclose.matchedRight();
						break;
					case 1:
						var x = Xml.createPCData(r.matched(0));
						current.addChild(x);
						str = r.matchedRight();
						break;
					case 2:
						if(current._children != null && current._children.length == 0) {
							var e = Xml.createPCData("");
							current.addChild(e);
						}
						if(r.matched(1) != current._nodeName || stack.isEmpty()) {
							i = nrules;
							throw "__break__";
						}
						current = stack.pop();
						str = r.matchedRight();
						break;
					case 3:
						str = r.matchedRight();
						if(!Xml.ecdata_end.match(str)) throw "End of CDATA section not found";
						var x = Xml.createCData(Xml.ecdata_end.matchedLeft());
						current.addChild(x);
						str = Xml.ecdata_end.matchedRight();
						break;
					case 4:
						var pos = 0;
						var count = 0;
						var old = str;
						try {
							while(true) {
								if(!Xml.edoctype_elt.match(str)) throw "End of DOCTYPE section not found";
								var p = Xml.edoctype_elt.matchedPos();
								pos += p.pos + p.len;
								str = Xml.edoctype_elt.matchedRight();
								switch(Xml.edoctype_elt.matched(0)) {
								case "[":
									count++;
									break;
								case "]":
									count--;
									if(count < 0) throw "Invalid ] found in DOCTYPE declaration";
									break;
								default:
									if(count == 0) throw "__break__";
								}
							}
						} catch( e ) { if( e != "__break__" ) throw e; }
						var x = Xml.createDocType(old.substr(10,pos - 11));
						current.addChild(x);
						break;
					case 5:
						if(!Xml.ecomment_end.match(str)) throw "Unclosed Comment";
						var p = Xml.ecomment_end.matchedPos();
						var x = Xml.createComment(str.substr(4,p.pos + p.len - 7));
						current.addChild(x);
						str = Xml.ecomment_end.matchedRight();
						break;
					case 6:
						var prolog = r.matched(0);
						var x = Xml.createProlog(prolog.substr(2,prolog.length - 4));
						current.addChild(x);
						str = r.matchedRight();
						break;
					}
					throw "__break__";
				}
				i += 1;
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(i == nrules) {
			if(str.length > 10) throw "Xml parse error : Unexpected " + str.substr(0,10) + "..."; else throw "Xml parse error : Unexpected " + str;
		}
	}
	if(!stack.isEmpty()) throw "Xml parse error : Unclosed " + stack.last().getNodeName();
	return current;
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new Hash();
	r.setNodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.setNodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.setNodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.setNodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.setNodeValue(data);
	return r;
}
Xml.createProlog = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Prolog;
	r.setNodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype.nodeType = null;
Xml.prototype.nodeName = null;
Xml.prototype.nodeValue = null;
Xml.prototype.parent = null;
Xml.prototype._nodeName = null;
Xml.prototype._nodeValue = null;
Xml.prototype._attributes = null;
Xml.prototype._children = null;
Xml.prototype._parent = null;
Xml.prototype.getNodeName = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName;
}
Xml.prototype.setNodeName = function(n) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._nodeName = n;
}
Xml.prototype.getNodeValue = function() {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue;
}
Xml.prototype.setNodeValue = function(v) {
	if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
	return this._nodeValue = v;
}
Xml.prototype.getParent = function() {
	return this._parent;
}
Xml.prototype.get = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.get(att);
}
Xml.prototype.set = function(att,value) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.set(att,value);
}
Xml.prototype.remove = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	this._attributes.remove(att);
}
Xml.prototype.exists = function(att) {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.exists(att);
}
Xml.prototype.attributes = function() {
	if(this.nodeType != Xml.Element) throw "bad nodeType";
	return this._attributes.keys();
}
Xml.prototype.iterator = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		return this.cur < this.x.length;
	}, next : function() {
		return this.x[this.cur++];
	}};
}
Xml.prototype.elements = function() {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			if(this.x[k].nodeType == Xml.Element) break;
			k += 1;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k += 1;
			if(n.nodeType == Xml.Element) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.elementsNamed = function(name) {
	if(this._children == null) throw "bad nodetype";
	return { cur : 0, x : this._children, hasNext : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			if(n.nodeType == Xml.Element && n._nodeName == name) break;
			k++;
		}
		this.cur = k;
		return k < l;
	}, next : function() {
		var k = this.cur;
		var l = this.x.length;
		while(k < l) {
			var n = this.x[k];
			k++;
			if(n.nodeType == Xml.Element && n._nodeName == name) {
				this.cur = k;
				return n;
			}
		}
		return null;
	}};
}
Xml.prototype.firstChild = function() {
	if(this._children == null) throw "bad nodetype";
	return this._children[0];
}
Xml.prototype.firstElement = function() {
	if(this._children == null) throw "bad nodetype";
	var cur = 0;
	var l = this._children.length;
	while(cur < l) {
		var n = this._children[cur];
		if(n.nodeType == Xml.Element) return n;
		cur++;
	}
	return null;
}
Xml.prototype.addChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.push(x);
}
Xml.prototype.removeChild = function(x) {
	if(this._children == null) throw "bad nodetype";
	var b = this._children.remove(x);
	if(b) x._parent = null;
	return b;
}
Xml.prototype.insertChild = function(x,pos) {
	if(this._children == null) throw "bad nodetype";
	if(x._parent != null) x._parent._children.remove(x);
	x._parent = this;
	this._children.insert(pos,x);
}
Xml.prototype.toString = function() {
	if(this.nodeType == Xml.PCData) return this._nodeValue;
	if(this.nodeType == Xml.CData) return "<![CDATA[" + this._nodeValue + "]]>";
	if(this.nodeType == Xml.Comment) return "<!--" + this._nodeValue + "-->";
	if(this.nodeType == Xml.DocType) return "<!DOCTYPE " + this._nodeValue + ">";
	if(this.nodeType == Xml.Prolog) return "<?" + this._nodeValue + "?>";
	var s = new StringBuf();
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "<" == null?"null":"<";
		s.add(this._nodeName);
		var $it0 = this._attributes.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			s.b[s.b.length] = " " == null?"null":" ";
			s.b[s.b.length] = k == null?"null":k;
			s.b[s.b.length] = "=\"" == null?"null":"=\"";
			s.add(this._attributes.get(k));
			s.b[s.b.length] = "\"" == null?"null":"\"";
		}
		if(this._children.length == 0) {
			s.b[s.b.length] = "/>" == null?"null":"/>";
			return s.b.join("");
		}
		s.b[s.b.length] = ">" == null?"null":">";
	}
	var $it1 = this.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		s.add(x.toString());
	}
	if(this.nodeType == Xml.Element) {
		s.b[s.b.length] = "</" == null?"null":"</";
		s.add(this._nodeName);
		s.b[s.b.length] = ">" == null?"null":">";
	}
	return s.b.join("");
}
Xml.prototype.__class__ = Xml;
utils.json.JSONToken = function(type,value) {
	if( type === $_ ) return;
	this.type = type == null?utils.json.JSONTokenType.tUNKNOWN:type;
	this.value = value;
}
utils.json.JSONToken.__name__ = ["utils","json","JSONToken"];
utils.json.JSONToken.prototype.type = null;
utils.json.JSONToken.prototype.value = null;
utils.json.JSONToken.prototype.__class__ = utils.json.JSONToken;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	Object.prototype.iterator = function() {
      var o = this.instanceKeys();
      var y = this;
      return {
        cur : 0,
        arr : o,
        hasNext: function() { return this.cur < this.arr.length; },
        next: function() { return y[this.arr[this.cur++]]; }
      };
    }
	Object.prototype.instanceKeys = function(proto) {
      var keys = [];
      proto = !proto;
      for(var i in this) {
        if(proto && Object.prototype[i]) continue;
        keys.push(i);
      }
      return keys;
    }
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
if(typeof(haxe_timers) == "undefined") haxe_timers = [];
{
	Xml.Element = "element";
	Xml.PCData = "pcdata";
	Xml.CData = "cdata";
	Xml.Comment = "comment";
	Xml.DocType = "doctype";
	Xml.Prolog = "prolog";
	Xml.Document = "document";
}
realtime.cloud.view.BaseView.DEEPLINK = ".deeplink";
realtime.cloud.view.StartupView.SUCCESS = "#success";
realtime.cloud.view.StartupView.ERROR = "#error";
realtime.cloud.view.StartupView.SEARCH = "#searchButton";
realtime.cloud.view.StartupView.BACK = "#backButton";
realtime.cloud.view.StartupView.FORM = "#searchForm";
xirsys.cube.mvcs.Mediator.__meta__ = { fields : { mediatorMap : { Inject : null}, eventDispatcher : { Inject : null}, injector : { Inject : null}}};
xirsys.cube.mvcs.Mediator.__rtti = "<class path=\"xirsys.cube.mvcs.Mediator\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<implements path=\"xirsys.cube.abstract.IMediator\"/>\n\t<mediatorMap public=\"1\"><c path=\"xirsys.cube.abstract.IMediatorMap\"><d/></c></mediatorMap>\n\t<eventDispatcher public=\"1\"><c path=\"xirsys.cube.abstract.ICentralDispatcher\"><d/></c></eventDispatcher>\n\t<injector public=\"1\"><c path=\"xirsys.injector.Injector\"/></injector>\n\t<eventMap public=\"1\"><c path=\"xirsys.cube.abstract.IEventMap\"><d/></c></eventMap>\n\t<viewComponent public=\"1\"><d/></viewComponent>\n\t<removed public=\"1\"><e path=\"Bool\"/></removed>\n\t<preRemove public=\"1\" set=\"method\" line=\"62\"><f a=\"\"><e path=\"Void\"/></f></preRemove>\n\t<preRegister public=\"1\" set=\"method\" line=\"74\"><f a=\"\"><e path=\"Void\"/></f></preRegister>\n\t<onRegister public=\"1\" set=\"method\" line=\"80\"><f a=\"\"><e path=\"Void\"/></f></onRegister>\n\t<onRemove public=\"1\" set=\"method\" line=\"84\"><f a=\"\"><e path=\"Void\"/></f></onRemove>\n\t<getViewComponent public=\"1\" set=\"method\" line=\"88\"><f a=\"\"><unknown/></f></getViewComponent>\n\t<setViewComponent public=\"1\" set=\"method\" line=\"93\"><f a=\"view\">\n\t<d/>\n\t<e path=\"Void\"/>\n</f></setViewComponent>\n\t<new public=\"1\" set=\"method\" line=\"57\"><f a=\"\"><e path=\"Void\"/></f></new>\n\t<haxe_doc>\r\n * Copyright (c) 2011, Influxis.\r\n * \r\n * support@influxis.com\r\n * \r\n * All rights reserved.\r\n * Redistribution and use in source and binary forms, with or without\r\n * modification, are permitted provided that the following conditions are met:\r\n *\r\n *   - Redistributions of source code must retain the above copyright\r\n *     notice, this list of conditions and the following disclaimer.\r\n *   - Redistributions in binary form must reproduce the above copyright\r\n *     notice, this list of conditions and the following disclaimer in the\r\n *     documentation and/or other materials provided with the distribution.\r\n *\r\n * THIS SOFTWARE IS PROVIDED BY INFLUXIS \"AS IS\" AND ANY EXPRESS OR IMPLIED \r\n * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF \r\n * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO\r\n * EVENT SHALL INFLUXIS OR THEIR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, \r\n * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES \r\n * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR\r\n * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER\r\n * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT\r\n * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY\r\n * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH\r\n * DAMAGE.\r\n * \r\n * @author Lee Sylvester\r\n </haxe_doc>\n</class>";
realtime.cloud.mediator.BaseMediator.__meta__ = { fields : { viewManager : { Inject : null}, loaderService : { Inject : null}, urlAddressService : { Inject : null}}};
realtime.cloud.mediator.BaseMediator.__rtti = "<class path=\"realtime.cloud.mediator.BaseMediator\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Mediator\"/>\n\t<viewManager public=\"1\"><c path=\"realtime.cloud.model.ViewManager\"/></viewManager>\n\t<loaderService public=\"1\"><c path=\"realtime.cloud.service.LoaderService\"/></loaderService>\n\t<urlAddressService public=\"1\"><c path=\"realtime.cloud.service.UrlAddressService\"/></urlAddressService>\n\t<viewActive><e path=\"Bool\"/></viewActive>\n\t<instanceOfView><c path=\"realtime.cloud.view.IView\"/></instanceOfView>\n\t<setInstanceOfView set=\"method\" line=\"34\"><f a=\"view\">\n\t<c path=\"realtime.cloud.view.IView\"/>\n\t<e path=\"Void\"/>\n</f></setInstanceOfView>\n\t<isActive set=\"method\" line=\"40\"><f a=\"\"><e path=\"Bool\"/></f></isActive>\n\t<manageView set=\"method\" line=\"46\"><f a=\"path\">\n\t<c path=\"String\"/>\n\t<e path=\"Bool\"/>\n</f></manageView>\n\t<onRegister public=\"1\" set=\"method\" line=\"55\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></onRegister>\n\t<changeView set=\"method\" line=\"74\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.ViewEvent\"/>\n\t<e path=\"Void\"/>\n</f></changeView>\n\t<onTransitionIn set=\"method\" line=\"80\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.ViewEvent\"/>\n\t<e path=\"Void\"/>\n</f></onTransitionIn>\n\t<onTransitionOut set=\"method\" line=\"89\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.ViewEvent\"/>\n\t<e path=\"Void\"/>\n</f></onTransitionOut>\n\t<onTransitionInCompleted set=\"method\" line=\"99\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.ViewEvent\"/>\n\t<e path=\"Void\"/>\n</f></onTransitionInCompleted>\n\t<onTransitionOutCompleted set=\"method\" line=\"107\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.ViewEvent\"/>\n\t<e path=\"Void\"/>\n</f></onTransitionOutCompleted>\n\t<new public=\"1\" set=\"method\" line=\"12\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
realtime.cloud.mediator.PreloaderMediator.__meta__ = { fields : { view : { Inject : null}}};
realtime.cloud.mediator.PreloaderMediator.__rtti = "<class path=\"realtime.cloud.mediator.PreloaderMediator\" params=\"\">\n\t<extends path=\"realtime.cloud.mediator.BaseMediator\"/>\n\t<view public=\"1\"><c path=\"realtime.cloud.view.PreloaderView\"/></view>\n\t<onRegister public=\"1\" set=\"method\" line=\"15\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></onRegister>\n\t<onLoaderProgress set=\"method\" line=\"22\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.LoaderProgressEvent\"/>\n\t<e path=\"Void\"/>\n</f></onLoaderProgress>\n\t<onTransitionInCompleted set=\"method\" line=\"28\" override=\"1\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.ViewEvent\"/>\n\t<e path=\"Void\"/>\n</f></onTransitionInCompleted>\n\t<new public=\"1\" set=\"method\" line=\"8\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
xirsys.cube.mvcs.Command.__meta__ = { fields : { commandMap : { Inject : null}, eventDispatcher : { Inject : null}, injector : { Inject : null}, mediatorMap : { Inject : null}}};
xirsys.cube.mvcs.Command.__rtti = "<class path=\"xirsys.cube.mvcs.Command\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<commandMap public=\"1\"><c path=\"xirsys.cube.abstract.ICommandMap\"><d/></c></commandMap>\n\t<eventDispatcher public=\"1\"><c path=\"xirsys.cube.abstract.ICentralDispatcher\"><d/></c></eventDispatcher>\n\t<injector public=\"1\"><c path=\"xirsys.injector.Injector\"/></injector>\n\t<mediatorMap public=\"1\"><c path=\"xirsys.cube.abstract.IMediatorMap\"><d/></c></mediatorMap>\n\t<Command public=\"1\" set=\"method\" line=\"53\"><f a=\"\"><e path=\"Void\"/></f></Command>\n\t<execute public=\"1\" set=\"method\" line=\"57\"><f a=\"\"><e path=\"Void\"/></f></execute>\n\t<haxe_doc>\r\n * Copyright (c) 2011, Influxis.\r\n * \r\n * support@influxis.com\r\n * \r\n * All rights reserved.\r\n * Redistribution and use in source and binary forms, with or without\r\n * modification, are permitted provided that the following conditions are met:\r\n *\r\n *   - Redistributions of source code must retain the above copyright\r\n *     notice, this list of conditions and the following disclaimer.\r\n *   - Redistributions in binary form must reproduce the above copyright\r\n *     notice, this list of conditions and the following disclaimer in the\r\n *     documentation and/or other materials provided with the distribution.\r\n *\r\n * THIS SOFTWARE IS PROVIDED BY INFLUXIS \"AS IS\" AND ANY EXPRESS OR IMPLIED \r\n * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF \r\n * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO\r\n * EVENT SHALL INFLUXIS OR THEIR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, \r\n * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES \r\n * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR\r\n * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER\r\n * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT\r\n * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY\r\n * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH\r\n * DAMAGE.\r\n * \r\n * @author Lee Sylvester\r\n </haxe_doc>\n</class>";
realtime.cloud.commands.TransitionInCommand.__meta__ = { fields : { event : { Inject : null}, viewManager : { Inject : null}}};
realtime.cloud.commands.TransitionInCommand.__rtti = "<class path=\"realtime.cloud.commands.TransitionInCommand\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Command\"/>\n\t<event public=\"1\"><c path=\"realtime.cloud.events.ViewEvent\"/></event>\n\t<viewManager public=\"1\"><c path=\"realtime.cloud.model.ViewManager\"/></viewManager>\n\t<execute public=\"1\" set=\"method\" line=\"16\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></execute>\n</class>";
utils.CommonJS.SUBMIT_EVENT = "submit";
utils.CommonJS.CLICK_EVENT = "click";
realtime.cloud.events.UrlAddressEvent.INIT = "init";
realtime.cloud.events.UrlAddressEvent.CHANGE = "change";
realtime.cloud.events.UrlAddressEvent.INTERNAL_CHANGE = "internalChange";
realtime.cloud.events.UrlAddressEvent.EXTERNAL_CHANGE = "externalChange";
realtime.cloud.mediator.PageNotFoundMediator.__meta__ = { fields : { view : { Inject : null}}};
realtime.cloud.mediator.PageNotFoundMediator.__rtti = "<class path=\"realtime.cloud.mediator.PageNotFoundMediator\" params=\"\">\n\t<extends path=\"realtime.cloud.mediator.BaseMediator\"/>\n\t<view public=\"1\"><c path=\"realtime.cloud.view.PageNotFoundView\"/></view>\n\t<onRegister public=\"1\" set=\"method\" line=\"12\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></onRegister>\n\t<new public=\"1\" set=\"method\" line=\"5\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
realtime.cloud.mediator.HomeMediator.__meta__ = { fields : { view : { Inject : null}}};
realtime.cloud.mediator.HomeMediator.__rtti = "<class path=\"realtime.cloud.mediator.HomeMediator\" params=\"\">\n\t<extends path=\"realtime.cloud.mediator.BaseMediator\"/>\n\t<view public=\"1\"><c path=\"realtime.cloud.view.HomeView\"/></view>\n\t<onRegister public=\"1\" set=\"method\" line=\"12\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></onRegister>\n\t<new public=\"1\" set=\"method\" line=\"5\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
js.Lib.onerror = null;
realtime.cloud.commands.TransitionOutCommand.__meta__ = { fields : { event : { Inject : null}, urlAddressService : { Inject : null}, viewManager : { Inject : null}}};
realtime.cloud.commands.TransitionOutCommand.__rtti = "<class path=\"realtime.cloud.commands.TransitionOutCommand\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Command\"/>\n\t<event public=\"1\"><c path=\"realtime.cloud.events.ViewEvent\"/></event>\n\t<urlAddressService public=\"1\"><c path=\"realtime.cloud.service.UrlAddressService\"/></urlAddressService>\n\t<viewManager public=\"1\"><c path=\"realtime.cloud.model.ViewManager\"/></viewManager>\n\t<execute public=\"1\" set=\"method\" line=\"20\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></execute>\n</class>";
xirsys.cube.mvcs.Actor.__rtti = "<class path=\"xirsys.cube.mvcs.Actor\" params=\"\">\n\t<implements path=\"haxe.rtti.Infos\"/>\n\t<eventDispatcher public=\"1\"><c path=\"xirsys.cube.events.CentralDispatcher\"><d/></c></eventDispatcher>\n\t<haxe_doc>\r\n * Copyright (c) 2011, Influxis.\r\n * \r\n * support@influxis.com\r\n * \r\n * All rights reserved.\r\n * Redistribution and use in source and binary forms, with or without\r\n * modification, are permitted provided that the following conditions are met:\r\n *\r\n *   - Redistributions of source code must retain the above copyright\r\n *     notice, this list of conditions and the following disclaimer.\r\n *   - Redistributions in binary form must reproduce the above copyright\r\n *     notice, this list of conditions and the following disclaimer in the\r\n *     documentation and/or other materials provided with the distribution.\r\n *\r\n * THIS SOFTWARE IS PROVIDED BY INFLUXIS \"AS IS\" AND ANY EXPRESS OR IMPLIED \r\n * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF \r\n * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO\r\n * EVENT SHALL INFLUXIS OR THEIR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, \r\n * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES \r\n * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR\r\n * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER\r\n * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT\r\n * LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY\r\n * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH\r\n * DAMAGE.\r\n * \r\n * @author Lee Sylvester\r\n </haxe_doc>\n</class>";
realtime.cloud.service.LoaderService.__rtti = "<class path=\"realtime.cloud.service.LoaderService\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Actor\"/>\n\t<assetURL><c path=\"String\"/></assetURL>\n\t<configurationURL><c path=\"String\"/></configurationURL>\n\t<assets><c path=\"Hash\"><c path=\"realtime.cloud.data.Asset\"/></c></assets>\n\t<configuration><c path=\"Hash\"><c path=\"String\"/></c></configuration>\n\t<configurationLoader><c path=\"utils.http.HttpLoader\"/></configurationLoader>\n\t<systemAssetLoader><c path=\"utils.http.HttpLoader\"/></systemAssetLoader>\n\t<contentAssetLoader><c path=\"utils.http.HttpLoader\"/></contentAssetLoader>\n\t<stage><c path=\"realtime.cloud.Stage\"/></stage>\n\t<context><c path=\"realtime.cloud.Context\"/></context>\n\t<configure public=\"1\" set=\"method\" line=\"70\">\n\t\t<f a=\"context\">\n\t\t\t<c path=\"realtime.cloud.Context\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles configuring the content model by referencing to the application context\r\n\t</haxe_doc>\n\t</configure>\n\t<init public=\"1\" set=\"method\" line=\"80\">\n\t\t<f a=\"configurationURL:assetURL\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles init the content manager with the cofiguration and content json paths.\r\n\t</haxe_doc>\n\t</init>\n\t<load public=\"1\" set=\"method\" line=\"100\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\r\n\t* Handles loading all the content\r\n\t</haxe_doc>\n\t</load>\n\t<getConfiguration public=\"1\" set=\"method\" line=\"110\">\n\t\t<f a=\"configurationName\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles getting a configuration setting\r\n\t</haxe_doc>\n\t</getConfiguration>\n\t<setConfiguration public=\"1\" set=\"method\" line=\"119\">\n\t\t<f a=\"configurationName:configurationValue\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles setting a configuration setting\r\n\t</haxe_doc>\n\t</setConfiguration>\n\t<viewableContentExist public=\"1\" set=\"method\" line=\"128\">\n\t\t<f a=\"path\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Bool\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Determines if the viewable content has been loaded\r\n\t</haxe_doc>\n\t</viewableContentExist>\n\t<getAsset public=\"1\" set=\"method\" line=\"137\">\n\t\t<f a=\"path\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"realtime.cloud.data.Asset\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Determines if a path asset has been loaded\r\n\t</haxe_doc>\n\t</getAsset>\n\t<addAsset public=\"1\" set=\"method\" line=\"146\">\n\t\t<f a=\"path:view:title:mimeType:request\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"utils.http.HttpLoaderRequest\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Determines if a path asset has been loaded\r\n\t</haxe_doc>\n\t</addAsset>\n\t<onHttpConfigurationCompleted set=\"method\" line=\"161\">\n\t\t<f a=\"event\">\n\t\t\t<c path=\"utils.http.HttpLoaderCompletedEvent\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles when a HTTP request has completed for the configuration loader\r\n\t</haxe_doc>\n\t</onHttpConfigurationCompleted>\n\t<onHttpSystemAssetsCompleted set=\"method\" line=\"199\">\n\t\t<f a=\"event\">\n\t\t\t<c path=\"utils.http.HttpLoaderCompletedEvent\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles when a HTTP request has completed for the system asset loader\r\n\t</haxe_doc>\n\t</onHttpSystemAssetsCompleted>\n\t<onHttpContentAssetsCompleted set=\"method\" line=\"209\">\n\t\t<f a=\"event\">\n\t\t\t<c path=\"utils.http.HttpLoaderCompletedEvent\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles when a HTTP request has completed for the content asset loader\r\n\t</haxe_doc>\n\t</onHttpContentAssetsCompleted>\n\t<onHttpContentAssetsProgress set=\"method\" line=\"220\">\n\t\t<f a=\"event\">\n\t\t\t<c path=\"utils.http.HttpLoaderProgressEvent\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles when the progress of the content assets loader has been updated\r\n\t</haxe_doc>\n\t</onHttpContentAssetsProgress>\n\t<new public=\"1\" set=\"method\" line=\"45\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\r\n\t* @constructor\r\n\t* @this {LoaderService}\r\n\t</haxe_doc>\n\t</new>\n</class>";
utils.http.HttpLoaderProgressEvent.PROGRESS = "httpLoaderProgress";
realtime.cloud.service.UrlAddressService.__rtti = "<class path=\"realtime.cloud.service.UrlAddressService\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Actor\"/>\n\t<swfAddress><d/></swfAddress>\n\t<internalDispatched><e path=\"Bool\"/></internalDispatched>\n\t<externalDispatched><e path=\"Bool\"/></externalDispatched>\n\t<enableInternalDispatching public=\"1\" set=\"method\" line=\"35\">\n\t\t<f a=\"enabled\">\n\t\t\t<e path=\"Bool\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Handles enabling the swf address system\n\t</haxe_doc>\n\t</enableInternalDispatching>\n\t<enableExternalDispatching public=\"1\" set=\"method\" line=\"43\">\n\t\t<f a=\"enabled\">\n\t\t\t<e path=\"Bool\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Handles enabling the swf address system\n\t</haxe_doc>\n\t</enableExternalDispatching>\n\t<back public=\"1\" set=\"method\" line=\"52\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\n\t* Loads the previous URL in the history list.\n\t</haxe_doc>\n\t</back>\n\t<forward public=\"1\" set=\"method\" line=\"61\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\n\t* Loads the next URL in the history list.\n\t</haxe_doc>\n\t</forward>\n\t<up public=\"1\" set=\"method\" line=\"70\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\n\t* Navigates one level up in the deep linking path.\n\t</haxe_doc>\n\t</up>\n\t<getBaseURL public=\"1\" set=\"method\" line=\"79\">\n\t\t<f a=\"\"><c path=\"String\"/></f>\n\t\t<haxe_doc>\n\t* Provides the base address of the document.\n\t</haxe_doc>\n\t</getBaseURL>\n\t<getHistory public=\"1\" set=\"method\" line=\"88\">\n\t\t<f a=\"\"><e path=\"Bool\"/></f>\n\t\t<haxe_doc>\n\t* Provides the state of the history setting.\n\t</haxe_doc>\n\t</getHistory>\n\t<getParameter public=\"1\" set=\"method\" line=\"97\">\n\t\t<f a=\"parameter\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<d/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Provides the value of a specific query parameter as a string or array of strings.\n\t</haxe_doc>\n\t</getParameter>\n\t<getParameterNames public=\"1\" set=\"method\" line=\"106\">\n\t\t<f a=\"\"><c path=\"Array\"><c path=\"String\"/></c></f>\n\t\t<haxe_doc>\n\t* Provides a list of all the query parameter names.\n\t</haxe_doc>\n\t</getParameterNames>\n\t<getPath public=\"1\" set=\"method\" line=\"115\">\n\t\t<f a=\"\"><c path=\"String\"/></f>\n\t\t<haxe_doc>\n\t* Provides the deep linking value without the query string.\n\t</haxe_doc>\n\t</getPath>\n\t<getPathNames public=\"1\" set=\"method\" line=\"124\">\n\t\t<f a=\"\"><c path=\"Array\"><c path=\"String\"/></c></f>\n\t\t<haxe_doc>\n\t* Provides a list of all the folders in the deep linking path.\n\t</haxe_doc>\n\t</getPathNames>\n\t<getQueryString public=\"1\" set=\"method\" line=\"133\">\n\t\t<f a=\"\"><c path=\"String\"/></f>\n\t\t<haxe_doc>\n\t* Provides the query string part of the deep linking value.\n\t</haxe_doc>\n\t</getQueryString>\n\t<getStatus public=\"1\" set=\"method\" line=\"142\">\n\t\t<f a=\"\"><c path=\"String\"/></f>\n\t\t<haxe_doc>\n\t* Provides the status of the browser window.\n\t</haxe_doc>\n\t</getStatus>\n\t<getStrict public=\"1\" set=\"method\" line=\"151\">\n\t\t<f a=\"\"><e path=\"Bool\"/></f>\n\t\t<haxe_doc>\n\t* Provides the state of the strict mode setting.\n\t</haxe_doc>\n\t</getStrict>\n\t<getTitle public=\"1\" set=\"method\" line=\"160\">\n\t\t<f a=\"\"><c path=\"String\"/></f>\n\t\t<haxe_doc>\n\t* Provides the title of the HTML document.\n\t</haxe_doc>\n\t</getTitle>\n\t<getTracker public=\"1\" set=\"method\" line=\"169\">\n\t\t<f a=\"\"><c path=\"String\"/></f>\n\t\t<haxe_doc>\n\t* Provides the tracker function.\n\t</haxe_doc>\n\t</getTracker>\n\t<getValue public=\"1\" set=\"method\" line=\"178\">\n\t\t<f a=\"\"><c path=\"String\"/></f>\n\t\t<haxe_doc>\n\t* Provides the current deep linking value.\n\t</haxe_doc>\n\t</getValue>\n\t<go public=\"1\" set=\"method\" line=\"187\">\n\t\t<f a=\"delta\">\n\t\t\t<c path=\"Int\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Loads a URL from the history list.\n\t</haxe_doc>\n\t</go>\n\t<href public=\"1\" set=\"method\" line=\"196\">\n\t\t<f a=\"url:?target\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Opens a new URL in the browser.\n\t</haxe_doc>\n\t</href>\n\t<popup public=\"1\" set=\"method\" line=\"205\">\n\t\t<f a=\"url:?name:?options:?handler\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Opens a browser popup window.\n\t</haxe_doc>\n\t</popup>\n\t<resetStatus public=\"1\" set=\"method\" line=\"214\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\n\t* Resets the status of the browser window.\n\t</haxe_doc>\n\t</resetStatus>\n\t<setHistory public=\"1\" set=\"method\" line=\"223\">\n\t\t<f a=\"history\">\n\t\t\t<e path=\"Bool\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Enables or disables the creation of history entries.\n\t</haxe_doc>\n\t</setHistory>\n\t<setStatus public=\"1\" set=\"method\" line=\"232\">\n\t\t<f a=\"status\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Sets the status of the browser window.\n\t</haxe_doc>\n\t</setStatus>\n\t<setStrict public=\"1\" set=\"method\" line=\"241\">\n\t\t<f a=\"strict\">\n\t\t\t<e path=\"Bool\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Enables or disables the strict mode.\n\t</haxe_doc>\n\t</setStrict>\n\t<setTitle public=\"1\" set=\"method\" line=\"250\">\n\t\t<f a=\"title\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t*  Sets the title of the HTML document.\n\t</haxe_doc>\n\t</setTitle>\n\t<setTracker public=\"1\" set=\"method\" line=\"259\">\n\t\t<f a=\"tracker\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Sets a function for page view tracking.\n\t</haxe_doc>\n\t</setTracker>\n\t<setValue public=\"1\" set=\"method\" line=\"268\">\n\t\t<f a=\"value\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Sets the current deep linking value.\t\n\t</haxe_doc>\n\t</setValue>\n\t<dispatch public=\"1\" set=\"method\" line=\"284\">\n\t\t<f a=\"path:parameters\">\n\t\t\t<c path=\"String\"/>\n\t\t\t<c path=\"Hash\"><d/></c>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Used for internal application dispatching and not update the URL\n\t</haxe_doc>\n\t</dispatch>\n\t<onUrlAddressInit set=\"method\" line=\"298\">\n\t\t<f a=\"event\">\n\t\t\t<c path=\"realtime.cloud.events.UrlAddressEvent\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Handles when the URL address changes.\n\t</haxe_doc>\n\t</onUrlAddressInit>\n\t<onUrlAddressInternalChange set=\"method\" line=\"315\">\n\t\t<f a=\"event\">\n\t\t\t<c path=\"realtime.cloud.events.UrlAddressEvent\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Handles when the URL address internally changes.\n\t</haxe_doc>\n\t</onUrlAddressInternalChange>\n\t<onUrlAddressExternalChange set=\"method\" line=\"331\">\n\t\t<f a=\"event\">\n\t\t\t<c path=\"realtime.cloud.events.UrlAddressEvent\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\n\t* Handles when the URL address externally changes.\n\t</haxe_doc>\n\t</onUrlAddressExternalChange>\n\t<new public=\"1\" set=\"method\" line=\"22\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\n\t* Creates an instance of a URL Address Service.\n\t*\n\t* @constructor\n\t* @this {UrlAddressService}\n\t</haxe_doc>\n\t</new>\n</class>";
realtime.cloud.visualisation.Constants.FPS = 30;
realtime.cloud.visualisation.Constants.PRECENTAGE_TO_REMOVE_PARTICLE = 0.1;
realtime.cloud.visualisation.Constants.PRECENTAGE_TO_MOVE_PARTICLE = 0.9;
realtime.cloud.visualisation.Constants.PIXEL_DISTANCE_FOR_DRAGGING = 40;
realtime.cloud.visualisation.Constants.REFLECTION_HEIGHT = 98;
realtime.cloud.visualisation.Constants.REFLECTION_NODE_ALPHA_START = 0.06;
realtime.cloud.visualisation.Constants.REFLECTION_NODE_ALPHA_END = 0.1;
realtime.cloud.visualisation.Constants.REFLECTION_PLAYHEAD_ALPHA = 0.1;
realtime.cloud.visualisation.Constants.PARTICLES_COLOUR_ALPHA = 0.5 + Math.random() * 0.5;
realtime.cloud.visualisation.Constants.PARTICLES_ALPHA = 0.9;
realtime.cloud.visualisation.Constants.PLAYHEAD_ALPHA = 0.9;
realtime.cloud.visualisation.Constants.NODE_ALPHA = 0.9;
realtime.cloud.visualisation.Constants.MAX_PARTICLES = 150;
realtime.cloud.commands.InitialiseLoaderCommand.__meta__ = { fields : { event : { Inject : null}, urlAddressService : { Inject : null}}};
realtime.cloud.commands.InitialiseLoaderCommand.__rtti = "<class path=\"realtime.cloud.commands.InitialiseLoaderCommand\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Command\"/>\n\t<event public=\"1\"><c path=\"realtime.cloud.events.LoaderInitialisationEvent\"/></event>\n\t<urlAddressService public=\"1\"><c path=\"realtime.cloud.service.UrlAddressService\"/></urlAddressService>\n\t<execute public=\"1\" set=\"method\" line=\"18\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></execute>\n</class>";
utils.http.HttpLoaderCompletedEvent.COMPLETED = "httpLoaderCompleted";
realtime.cloud.events.LoaderCompletedEvent.COMPLETE = "LoaderCompletedEvent_Complete";
realtime.cloud.events.LoaderCompletedEvent.RENDERED = "LoaderCompletedEvent_Rendered";
realtime.cloud.Configuration.CONFIGURATION_URL = "data/config.json";
realtime.cloud.Configuration.ASSET_URL = "data/assets.json";
realtime.cloud.Configuration.COMMAND = "command";
realtime.cloud.Configuration.PAYLOAD = "payload";
realtime.cloud.Configuration.APP_ADDRESS = "appAddress";
realtime.cloud.Configuration.STARTUP_VIEW = "/~/";
realtime.cloud.Configuration.PRELOAD_VIEW = "/preloader/";
realtime.cloud.Configuration.NOT_FOUND_VIEW = "/not_found/";
realtime.cloud.Configuration.HOME_VIEW = "/content/home/";
utils.http.request.HttpRequest.GET = "GET";
utils.http.request.HttpRequest.POST = "POST";
utils.http.request.HttpRequest.PUT = "PUT";
utils.http.request.HttpRequest.OPTIONS = "OPTIONS";
utils.http.request.HttpRequest.DELETE = "DELETE";
utils.http.request.HttpRequest.MOVE = "MOVE";
utils.http.request.HttpRequest.PROPFIND = "PROPFIND";
utils.http.request.HttpRequest.PROPPATCH = "PROPPATCH";
utils.http.request.HttpRequest.MKCOL = "MKCOL";
utils.http.request.HttpRequest.COPY = "COPY";
utils.http.request.HttpRequest.LOCK = "DELETE";
utils.http.request.HttpRequest.UNLOCK = "DELETE";
utils.http.request.HttpRequest.UNSENT = 0;
utils.http.request.HttpRequest.OPENED = 1;
utils.http.request.HttpRequest.HEADERS_RECEIVED = 2;
utils.http.request.HttpRequest.LOADING = 3;
utils.http.request.HttpRequest.DONE = 4;
realtime.cloud.commands.UrlChangedCommand.__meta__ = { fields : { event : { Inject : null}, viewManager : { Inject : null}, loaderService : { Inject : null}, urlAddressService : { Inject : null}}};
realtime.cloud.commands.UrlChangedCommand.__rtti = "<class path=\"realtime.cloud.commands.UrlChangedCommand\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Command\"/>\n\t<event public=\"1\"><c path=\"realtime.cloud.events.UrlAddressEvent\"/></event>\n\t<viewManager public=\"1\"><c path=\"realtime.cloud.model.ViewManager\"/></viewManager>\n\t<loaderService public=\"1\"><c path=\"realtime.cloud.service.LoaderService\"/></loaderService>\n\t<urlAddressService public=\"1\"><c path=\"realtime.cloud.service.UrlAddressService\"/></urlAddressService>\n\t<execute public=\"1\" set=\"method\" line=\"29\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></execute>\n</class>";
realtime.cloud.events.LoaderInitialisationEvent.INITIALISE = "initialise";
realtime.cloud.events.LoaderProgressEvent.PROGRESS = "progress";
realtime.cloud.mediator.StartupMediator.__meta__ = { fields : { view : { Inject : null}}};
realtime.cloud.mediator.StartupMediator.__rtti = "<class path=\"realtime.cloud.mediator.StartupMediator\" params=\"\">\n\t<extends path=\"realtime.cloud.mediator.BaseMediator\"/>\n\t<view public=\"1\"><c path=\"realtime.cloud.view.StartupView\"/></view>\n\t<onRegister public=\"1\" set=\"method\" line=\"15\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></onRegister>\n\t<onTransitionInCompleted set=\"method\" line=\"22\" override=\"1\"><f a=\"event\">\n\t<c path=\"realtime.cloud.events.ViewEvent\"/>\n\t<e path=\"Void\"/>\n</f></onTransitionInCompleted>\n\t<new public=\"1\" set=\"method\" line=\"7\"><f a=\"\"><e path=\"Void\"/></f></new>\n</class>";
realtime.cloud.model.ViewManager.__rtti = "<class path=\"realtime.cloud.model.ViewManager\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Actor\"/>\n\t<context><c path=\"realtime.cloud.Context\"/></context>\n\t<currentView public=\"1\"><c path=\"realtime.cloud.events.ViewEvent\"/></currentView>\n\t<homeView><c path=\"realtime.cloud.view.HomeView\"/></homeView>\n\t<startupView><c path=\"realtime.cloud.view.StartupView\"/></startupView>\n\t<preloaderView><c path=\"realtime.cloud.view.PreloaderView\"/></preloaderView>\n\t<pageNotFoundView><c path=\"realtime.cloud.view.PageNotFoundView\"/></pageNotFoundView>\n\t<configure public=\"1\" set=\"method\" line=\"45\">\n\t\t<f a=\"context\">\n\t\t\t<c path=\"realtime.cloud.Context\"/>\n\t\t\t<e path=\"Void\"/>\n\t\t</f>\n\t\t<haxe_doc>\r\n\t* Handles configuring the view model.\r\n\t* by referencing to the application context and register view with there corrosponding mediators\r\n\t</haxe_doc>\n\t</configure>\n\t<new public=\"1\" set=\"method\" line=\"31\">\n\t\t<f a=\"\"><e path=\"Void\"/></f>\n\t\t<haxe_doc>\r\n\t* @constructor\r\n\t</haxe_doc>\n\t</new>\n</class>";
realtime.cloud.events.ViewEvent.CHANGE = "ViewEvent_changeView";
realtime.cloud.events.ViewEvent.TRANSITION_IN = "ViewEvent_transitionIn";
realtime.cloud.events.ViewEvent.TRANSITION_OUT = "ViewEvent_transitionOut";
realtime.cloud.events.ViewEvent.TRANSITION_IN_COMPLETED = "ViewEvent_transitionInCompleted";
realtime.cloud.events.ViewEvent.TRANSITION_OUT_COMPLETED = "ViewEvent_transitionOutCompleted";
xirsys.cube.events.AgentEvent.STARTUP_COMPLETE = "/mvc/events/startupComplete";
xirsys.cube.core.CubeError.E_COMMANDMAP_NOIMPL = "Command Class does not implement an execute() method";
xirsys.cube.core.CubeError.E_COMMANDMAP_OVR = "Cannot overwrite map";
xirsys.cube.core.CubeError.E_MEDIATORMAP_NOIMPL = "Mediator Class does not implement IMediator";
xirsys.cube.core.CubeError.E_MEDIATORMAP_OVR = "Mediator Class has already been mapped to a View Class in this context";
xirsys.cube.core.CubeError.E_EVENTMAP_NOSNOOPING = "Listening to the context eventDispatcher is not enabled for this EventMap";
xirsys.cube.core.CubeError.E_AGENT_INJECTOR = "The Agent does not specify a concrete Injector. Please override the injector getter in your concrete or abstract Context.";
utils.http.request.HttpRequestEvent.COMPLETED = "httpRequestCompleted";
utils.http.request.HttpRequestEvent.ERROR = "httpRequestError";
realtime.cloud.commands.ChangeViewCommand.__meta__ = { fields : { event : { Inject : null}, viewManager : { Inject : null}}};
realtime.cloud.commands.ChangeViewCommand.__rtti = "<class path=\"realtime.cloud.commands.ChangeViewCommand\" params=\"\">\n\t<extends path=\"xirsys.cube.mvcs.Command\"/>\n\t<event public=\"1\"><c path=\"realtime.cloud.events.ViewEvent\"/></event>\n\t<viewManager public=\"1\"><c path=\"realtime.cloud.model.ViewManager\"/></viewManager>\n\t<execute public=\"1\" set=\"method\" line=\"16\" override=\"1\"><f a=\"\"><e path=\"Void\"/></f></execute>\n</class>";
Xml.enode = new EReg("^<([a-zA-Z0-9:_-]+)","");
Xml.ecdata = new EReg("^<!\\[CDATA\\[","i");
Xml.edoctype = new EReg("^<!DOCTYPE ","i");
Xml.eend = new EReg("^</([a-zA-Z0-9:_-]+)>","");
Xml.epcdata = new EReg("^[^<]+","");
Xml.ecomment = new EReg("^<!--","");
Xml.eprolog = new EReg("^<\\?[^\\?]+\\?>","");
Xml.eattribute = new EReg("^\\s*([a-zA-Z0-9:_-]+)\\s*=\\s*([\"'])([^\\2]*?)\\2","");
Xml.eclose = new EReg("^[ \r\n\t]*(>|(/>))","");
Xml.ecdata_end = new EReg("\\]\\]>","");
Xml.edoctype_elt = new EReg("[\\[|\\]>]","");
Xml.ecomment_end = new EReg("-->","");
Website.main()