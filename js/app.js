'use strict';
// Library Imports
const shell = require('electron').shell;
window.$ = require("jquery");
window.jQuery = window.$
import 'bootstrap3';

// Local file Imports
import Timer  from './Timer';
import './notification';
import {normalTimerStart, normalTimerStop, normalTimerReset} from './normalTimer'
import {shortTimerStart, shortTimerStop, shortTimerReset} from './shortTimer'
import {longTimerStart, longTimerStop, longTimerReset} from './longTimer'

(function(){

let ipc = require('electron').ipcRenderer;

/**
 *  This funciton is called when the DOMis loaded
 */
const init = ()=>{
	var display = document.querySelector('#time');
	var display_short = document.querySelector('#time_short');
	var display_long = document.querySelector('#time_long');


	// Open new browser window when link is cliked
	$(document).on('click', 'a[href^="http"]', function (event) {
			event.preventDefault();
			shell.openExternal(this.href);
	});


	let normalTimer = new Timer(25);
	// Click Events in normal Timer
	$('#start').click(()=>normalTimerStart(normalTimer, display))
	$('#stop').click(()=>normalTimerStop(normalTimer))
	$('#reset').click(()=>normalTimerReset(normalTimer))

	let shortTimer = new Timer(5);
	// Click Events in Short Timer
	$('#short_start').click(()=>shortTimerStart(shortTimer, display_short))
	$('#short_stop').click(()=>shortTimerStop(shortTimer))
	$('#short_reset').click(()=>shortTimerReset(shortTimer))


	let longTimer = new Timer(10);
	// Click Events in Long Timer
	$('#long_start').click(()=>longTimerStart(longTimer, display_long))
	$('#long_stop').click(()=>longTimerStop(longTimer))
	$('#long_reset').click(()=>longTimerReset(longTimer))

	// When close button is Clicked
	$('#close',()=>{
			ipc.send('closeApp', 'close');
	})

	// Switching between timer Tabs
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			let activeTab = e.target.toString();
			let nameActiveTab = activeTab.split('#');

			if (nameActiveTab[1] == 'pomodoro') {
					normalTimer.resetTimer('#time');
			}
			else if (nameActiveTab[1] == 'short') {
					shortTimer.resetTimer('#time_short');
			}
			else {
					longTimer.resetTimer('#time_long');
			}
	})
}

// Check if Dom has loaded
document.onreadystatechange = () => {
    if (document.readyState == "complete") {
      init();
    }
};

})();