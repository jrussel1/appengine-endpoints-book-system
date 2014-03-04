//Copyright 2012 Google Inc. All Rights Reserved.

/**
 * @fileoverview
 * Provides methods for the BookSystem sample UI and interaction with the
 * BookSystem API.
 *
 */

var book = book || {};
book.system = book.system || {};


/**
 * Whether or not the user is signed in.
 * @type {boolean}
 */
book.system.signedIn = false;


/**
 * Signs the user out.
 */
book.system.signout = function() {
	document.getElementById('signinButtonContainer').classList.add('visible');
	document.getElementById('signedInStatus').classList.remove('visible');
	book.system.setBoardEnablement(false);
	book.system.signedIn = false;
}



book.system.getBooksBeingSold = function() {
	var request = gapi.client.bookSystem.bookforsale.list();
	request.execute(function(resp) { 
//		console.log(resp);
		for(var isbn in resp.isbnToMap){
			console.log("------------------------------------------");
			console.log("ISBN: "+isbn);
			for(var sellerId in resp.isbnToMap[isbn]){
				console.log("Seller_ID: "+sellerId);
				for(var bookPart in resp.isbnToMap[isbn][sellerId].book){
					console.log(bookPart+": "+resp.isbnToMap[isbn][sellerId].book[bookPart]);
				}
				for(var sellerPart in resp.isbnToMap[isbn][sellerId].seller){
					console.log(sellerPart+": "+resp.isbnToMap[isbn][sellerId].seller[sellerPart]);
				}
			}
		}
	});
};

/**
 * Handles a square click.
 * @param {MouseEvent} e Mouse click event.
 */
book.system.clickSquare = function(e) {
//	console.log(book.system.getBooksBeingSold);
	book.system.getBooksBeingSold();
};


/**
 * Shows or hides the board and game elements.
 * @param {boolean} state Whether to show or hide the board elements.
 */
book.system.setBoardEnablement = function(state) {
	if (!state) {
		document.getElementById('board').classList.add('hidden');
		document.getElementById('gameHistoryWrapper').classList.add('hidden');
		document.getElementById('warning').classList.remove('hidden');
	} else {
		document.getElementById('board').classList.remove('hidden');
		document.getElementById('gameHistoryWrapper').classList.remove('hidden');
		document.getElementById('warning').classList.add('hidden');
	}
};


/**
 * Initializes the application.
 * @param {string} apiRoot Root of the API's path.
 * @param {string} tokenEmail The email parsed from the auth/ID token.
 */
book.system.init = function(apiRoot, tokenEmail) {
	// Loads the BookSystem API asynchronously, and triggers login
	// in the UI when loading has completed.
	var callback = function() {
		book.system.signedIn = true;
		document.getElementById('userLabel').innerHTML = tokenEmail;
		book.system.setBoardEnablement(true);
	}
	gapi.client.load('bookSystem', 'v1', callback, apiRoot);

	var buttons = document.querySelectorAll('td');
	for (var i = 0; i < buttons.length; i++) {
		var button = buttons[i];
		button.addEventListener('click', book.system.clickSquare);
	}

	var reset = document.querySelector('#restartButton');
	reset.addEventListener('click', book.system.resetGame);
};
