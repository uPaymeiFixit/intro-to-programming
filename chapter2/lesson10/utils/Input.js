/*
 * Keypress r2016-04-05
 * @author Josh Gibbs - uPaymeiFixit@gmail.com
 *
 * Example Usage:
 *  function up() { alert("up"); }
 *  function down() { alert("down"); }
 *  function comma() { alert("comma"); }
 *
 *  bind(38, up);
 *  bind(40, down);
 *  bind("onmouseup", up);
 *  bind(",", comma);
 *  unbind(16);
 *  bind(42, noexist);
 *  unbind(1);
 *  bind(".", function() { alert("hello"); })
 *  bind("p", function(keycode) { alert("you pressed " + keycode); });
 */

var Input = {
        x:0, // Mouse Position
        y:0, // Mouse Position
        codes: {
	"backspace":8,"back":8,
	"tab":9,
	"clear":12,
	"enter":13,
	"shift":16,
	"ctrl":17,"control":17,
	"alt":18,"option":18,
	"pause":19,"break":19,
	"caps":20,"capslock":20,"caps lock":20,
	"esc":27,"escape":27,
	"space":32,"spacebar":32,"space bar":32," ":32,
	"pageup":33,"page up":33,
	"pagedown":34,"page down":34,
	"end":35,
	"home":36,

	"left":37,"leftarrow":37,"arrowleft":37,"left arrow":37,"arrow left":37,
	"up":38,"uparrow":38,"arrowup":38,"up arrow":38,"arrow up":38,
	"right":39,"rightarrow":39,"arrowright":39,"right arrow":39,"arrow right":39,
	"down":40,"downarrow":40,"arrowdown":40,"down arrow":40,"arrow down":40,

	"insert":45,
	"delete":46,"del":46,

	"0":48,"1":49,"2":50,"3":51,"4":52,"5":53,"6":54,"7":55,"8":56,"9":57,
	"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,"h":72,"i":73,"j":74,"k":75,"l":76,"m":77,"n":78,"o":79,"p":80,"q":81,"r":82,"s":83,"t":84,"u":85,"v":86,"w":87,"x":88,"y":89,"z":90,

	"leftwindowkey":91,"leftwindow":91,"windowkeyleft":91,"windowleft":91,"left window key":91,"left window":91,"window key left":91,"window left":91,
	"rightwindowkey":92,"rightwindow":92,"windowkeyright":92,"windowright":92,"right window key":92,"right window":92,"window key right":92,"window right":92,

	"num0":96,"numpad0":96,"keypad0":96,"numberpad0":96,"number pad 0":96,"key pad 0":96,
	"num1":97,"numpad1":97,"keypad1":97,"numberpad1":97,"number pad 1":97,"key pad 1":97,
	"num2":98,"numpad2":98,"keypad2":98,"numberpad2":98,"number pad 2":98,"key pad 2":98,
	"num3":99,"numpad3":99,"keypad3":99,"numberpad3":99,"number pad 3":99,"key pad 3":99,
	"num4":100,"numpad4":100,"keypad4":100,"numberpad4":100,"number pad 4":100,"key pad 4":100,
	"num5":101,"numpad5":101,"keypad5":101,"numberpad5":101,"number pad 5":101,"key pad 5":101,
	"num6":102,"numpad6":102,"keypad6":102,"numberpad6":102,"number pad 6":102,"key pad 6":102,
	"num7":103,"numpad7":103,"keypad7":103,"numberpad7":103,"number pad 7":103,"key pad 7":103,
	"num8":104,"numpad8":104,"keypad8":104,"numberpad8":104,"number pad 8":104,"key pad 8":104,
	"num9":105,"numpad9":105,"keypad9":105,"numberpad9":105,"number pad 9":105,"key pad 9":105,

	"multiply":106,"*":106,"mul":106,
	"add":107,"plus":107,"+":107,
	"subtract":109,"minus":109,"min":109,
	"decimalpoint":110,"decimal":110,"decimal point":110,
	"divide":111,"div":111,"÷":111,

	"f1":112,"f2":113,"f3":114,"f4":115,"f5":116,"f6":117,"f7":118,"f8":119,"f9":120,"f10":121,"f11":122,"f12":123,"f13":124,"f14":125,"f15":126,"f16":127,"f17":128,"f18":129,"f19":130,

	"numlock":144,"numberlock":144,"num lock":144,"number lock":144,
	"scrolllock":145,"scrollock":145,"scroll lock":145,

	"semi-colon":186,"semicolon":186,"semi colon":186,";":186,
	"equalsign":187,"equal-sign":187,"equal":187,"equals":187,"equal sign":187,"=":187,
	"comma":188,",":188,
	"dash":189,"-":189,
	"period":190,"dot":190,".":190,
	"forwardslash":191,"slashforward":191,"forward slash":191,"slash forward":191,"/":191,"slash":191,
	"grave":192,"accent":192,"graveaccent":192,"grave accent":192,"`":192,
	"openbracket":219,"bracketopen":219,"open bracket":219,"bracket open":219,"[":219,"bracket":219,
	"backslash":220,"slashback":220,"back slash":220,"slash back":220,
	"closebracket":219,"bracketclose":219,"close bracket":219,"bracket close":219,"]":219,
	"singlequote":222,"apostrophe":222,"'":222,"single quote":222,

    "mouseup":900,"mouse up":900,"mouse release":900,"onmouseup":900,"leftmouseup":900,
    "mousedown":901,"mouse down":901,"mouse suppress":901,"onmousedown":901,"leftmousedown":901,
    "mousemove":902,"onmousemove":902
},
bound: [],

bind: function (keycode, callback) {
	if (typeof keycode == "number") {
		Input.bound[keycode] = callback;
	} else if (Input.codes[keycode]) {
		Input.bound[Input.codes[keycode]] = callback;
	} else {
		throw keycode + " is not defined. Try a different key.";
	}
},

unbind: function (keycode) {
	if (Input.bound[keycode]) {
		if (typeof keycode == "number") {
			delete Input.bound[keycode];
		} else if (Input.codes[keycode]) {
			delete Input.bound[Input.codes[keycode]];
		} else {
			throw keycode + " is not defined. Try a different key.";
		}
	}
}

}

document.onkeydown = function(event) {
    if (Input.bound[event.keyCode]) {
        Input.bound[event.keyCode](event.keyCode);
    }
};

document.onmousemove = function(event) {
    Input.x = event.pageX;
    Input.y = event.pageY;
    if (Input.bound[Input.codes["onmousemove"]]) {
        Input.bound[Input.codes["onmousemove"]](x, y);
    }
};

document.onmousedown = function() {
    if (Input.bound[Input.codes["onmousedown"]]) {
        Input.bound[Input.codes["onmousedown"]]();
    }
};

document.onmouseup = function() {
    if (Input.bound[Input.codes["onmouseup"]]) {
        Input.bound[Input.codes["onmouseup"]]();
    }
};
