//that's keynapse IIFE
(function(window, document, undefined) {
	if (window.keynapse) {
		console.log('WARNING: hum... nothing.');
		return;
	}

	var keynapse = initKeynapse();

	$(document).ready(function() {
		prepareApplication();
	});

})(window, document);

//the main function of keynapse bootstrapping process,
//it initializes keynapse instance with default properties
//and constants
function initKeynapse(){
	var keynapse = window.keynapse || (window.keynapse = {});
	keynapse.knCells = [];
	keynapse.currentKnCell = null;
	keynapse.currentKnCellIndex = 0;
	keynapse.isStarted = false;
	keynapse.cellHotKeys = ['1','2','3','4','5','6','7','8','9','a','b','c','d','e','f',
							'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u',
							'v','w','x','y','z'];
	keynapse.cellIndexBykeyCode = {
		'49': 0,
		'50': 1,
		'51': 2,
		'52': 3,
		'53': 4,
		'54': 5,
		'55': 6,
		'56': 7,
		'57': 8,
		'97': 9, //A
		'98': 10, //B
		'99': 11, //C
		'100': 12, //D
		'101': 13, //E
		'102': 14, //F
		'103': 15, //G
		'104': 16, //H
		'105': 17, //I
		'106': 18, //J
		'107': 19, //K
		'108': 20, //L
		'109': 21, //M
		'110': 22, //N
		'111': 23, //O
		'112': 24, //P
		'113': 25, //Q
		'114': 26, //R
		'115': 27, //S
		'116': 28, //T
		'117': 29, //U
		'118': 30, //V
		'119': 31, //W
		'120': 32, //X
		'121': 33, //Y
		'122': 34, //Z

		'65': 9, //a
		'66': 10, //b
		'67': 11, //c
		'68': 12, //d
		'69': 13, //e
		'70': 14, //f
		'71': 15, //g
		'72': 16, //h
		'73': 17, //i
		'74': 18, //j
		'75': 19, //k
		'76': 20, //l
		'77': 21, //m
		'78': 22, //n
		'79': 23, //o
		'80': 24, //p
		'81': 25, //q
		'82': 26, //r
		'83': 27, //s
		'84': 28, //t
		'85': 29, //u
		'86': 30, //v
		'87': 31, //w
		'88': 32, //x
		'89': 33, //y
		'90': 34 //z
	}

	return keynapse;
}

//the first function executed after keynapse instance is ready,
//adding main keynapse div, activating keyboard listener, and 
//registring initial hotKeys
function prepareApplication(){
	addKnPanel();
	var keynapse = window.keynapse;
	keynapse.listener = new window.keypress.Listener();
	registerStartKeys(keynapse);
}

//add the main panel of keynapse application
function addKnPanel(){
	var zIndex = getMaxZIndex() + 10;
	var panel = $("<div kn-panel class=kn-panel></div>");
	panel.css("z-index", zIndex);
	panel.click(function(){
		stopKeynapse();
	})
	$("body").append(panel);
}

//registry hotkeys that starts/stops keynapse application
function registerStartKeys(keynapse){
	registerInitCombo(keynapse, "ctrl shift up");
	registerInitCombo(keynapse, "ctrl shift down");
	registerInitCombo(keynapse, "ctrl shift left");
	registerInitCombo(keynapse, "ctrl shift right");

	keynapse.listener.simple_combo("esc", resetKeynapse);
}

//reset current kn-cell to first one, if keynapse is started,
//or stop keynapse
function resetKeynapse(){
	if(!keynapse.isStarted){
		return
	}
	if(keynapse.currentKnCellIndex > 0 ){

		var previousKnCell = keynapse.currentKnCell;
		previousKnCell.knCellHint.removeClass('kn-cell-hint-current');		

		keynapse.currentKnCellIndex = 0;
		keynapse.currentKnCell = keynapse.knCells[0];

		keynapse.currentKnCell.knCellHint.addClass('kn-cell-hint-current');
	} else {
		stopKeynapse();
	}
}

//registry hotkeys for navigating between kn-cells
function registerNavigationKeys(keynapse){
	keynapse.listener.simple_combo("tab", nextKnCell);
	keynapse.listener.simple_combo("enter", selectKnCell);
}

//unregister hotkeys for navigating between kn-cells,
//and dynamic hotkeys
function unregisterNavigationKeys(keynapse){
	keynapse.listener.unregister_combo("tab");
	keynapse.listener.unregister_combo("enter");
	keynapse.listener.unregister_combo('.');

	for (var i = keynapse.cellHotKeys.length - 1; i >= 0; i--) {
		keynapse.listener.unregister_combo(keynapse.cellHotKeys[i]);
	};
}

//show the maing panel, highlight kn-cells,
//and registry dynamic hotkeys for each kn-cell
function startKeynapse(e){
	if ( window.keynapse.isStarted ){
		stopKeynapse();
		return;
	}
	registerNavigationKeys(window.keynapse);
	$("[kn-panel]").fadeIn();

	$("[kn-cell]").each(function(index){
		keynapse.knCells.push(this);
		addKnCellHint(this);
		if (keynapse.knCells.length == 1 && keynapse.currentKnCell === null){
			keynapse.currentKnCell = this;
			keynapse.currentKnCellIndex = 0;
			this.knCellHint.addClass('kn-cell-hint-current');
		} else {
			keynapse.currentKnCell.knCellHint.addClass('kn-cell-hint-current');
		}

		if(keynapse.knCells.length <= keynapse.cellHotKeys.length){
			var cellHotKey = keynapse.cellHotKeys[keynapse.knCells.length - 1]
			keynapse.listener.simple_combo(cellHotKey, selectKnCellByIndex);
		} else {
			if ( index == keynapse.cellHotKeys.length ){
				keynapse.listener.simple_combo(".", nextKnCell);
			}
		}
	});
	window.keynapse.isStarted = true;
}

//hide the main panel, hide kn-cell hints,
//and unregister dynamic hotkeys
function stopKeynapse(){
	if ( !window.keynapse.isStarted ){
		return;
	}
	unregisterNavigationKeys(window.keynapse);
	keynapse.knCells = [];
	$("[kn-panel]").fadeOut();
	$("[kn-cell]").each(function(index){
		$(this).removeClass("kn-cell");
		$(this).removeClass("kn-cell-current");		
	});
	removeKnCellHint();
	window.keynapse.isStarted = false;
}

//event dispatched by tab that selects next kn-cell
function nextKnCell(e){
	var previousKnCell = keynapse.currentKnCell;
	previousKnCell.knCellHint.removeClass('kn-cell-hint-current');

	var currentKnCell;
	if (keynapse.currentKnCellIndex == keynapse.knCells.length - 1 ){
		keynapse.currentKnCellIndex = 0;
		keynapse.currentKnCell = keynapse.knCells[keynapse.currentKnCellIndex];
		currentKnCell = keynapse.currentKnCell;
	} else {
		keynapse.currentKnCell = keynapse.knCells[++keynapse.currentKnCellIndex];
		currentKnCell = keynapse.currentKnCell;
	}
	
	currentKnCell.knCellHint.addClass('kn-cell-hint-current');
}

//event dispatched by dynamic hotkey that selects next kn-cell
function selectKnCellByIndex(e){
	
	var previousKnCell = keynapse.currentKnCell;
	previousKnCell.knCellHint.removeClass('kn-cell-hint-current');

	var currentKnCellIndex = keynapse.cellIndexBykeyCode[e.keyCode];
	keynapse.currentKnCellIndex = currentKnCellIndex;
	keynapse.currentKnCell = keynapse.knCells[currentKnCellIndex];

	keynapse.currentKnCell.knCellHint.addClass('kn-cell-hint-current');
}

//grab focus and dispatch click event of selected kn-cell
function selectKnCell(e){
	var knCell = keynapse.currentKnCell;
	stopKeynapse();

	if(knCell.type == 'text'){
		$(knCell).focus();		
	} else {
		$(knCell).focus();
		$(knCell).trigger("click");
	}
}

//registry combo that starts/stops keynapse application
function registerInitCombo(keynapse, combo){
	keynapse.listener.register_combo({
	    "keys"              : combo,
	    "on_keydown"        : startKeynapse,
	    "on_keyup"          : null,
	    "on_release"        : null,
	    "this"              : undefined,
	    "prevent_default"   : false,
	    "prevent_repeat"    : false,
	    "is_unordered"      : true,
	    "is_counting"       : false,
	    "is_exclusive"      : false,
	    "is_solitary"       : false,
	    "is_sequence"       : false
	});
}

//add hint div that highlights kn-cell
function addKnCellHint(knCell){	
	var parentPosition = $(knCell).position();
	var parentWidth = $(knCell).width();
	var parentHeight = $(knCell).height();
	var left = parentPosition.left - (parentWidth % 2) + 5;
	var top = parentPosition.top + 5;
	var knCellIndex = window.keynapse.knCells.indexOf(knCell);
	var label = knCellIndex > keynapse.cellHotKeys.length - 1 ? '.' : keynapse.cellHotKeys[knCellIndex];

	var knCellHintDiv = "<span kn-cell-hint class=kn-cell-hint>" + label + "</span>";
	var knCellHint = $(knCellHintDiv).insertAfter($(knCell));
	$(knCellHint).css('top', top + 'px');
	$(knCellHint).css('left', left + 'px');
	knCell.knCellHint = knCellHint;
	$(knCellHint).show();
}

//remove all kn-cell hints
function removeKnCellHint(){
	$("[kn-cell-hint]").remove();
}

//this function is based on topzindex jquery plugin
function getMaxZIndex(){
    var group = "*";
    var zmax = 0;
    $(group).each(function() {
        var cur = parseInt($(this).css('z-index'));
        zmax = cur !== undefined && cur > zmax ? cur : zmax;
    });
    return zmax;
}