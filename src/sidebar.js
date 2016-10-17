
//This block is necessary because Chrome extensions don't allow standard onClick functionality
document.addEventListener('DOMContentLoaded', function() {
    
	// var currentNote = document.getElementById("note").value;
 //    var currentURL = getURL();

 //    customAlert(currentNote, "4000");
 //    customAlert(currentURL, "4000");
	
	// var bool = isInStorage(currentURL);

	// customAlert(bool, "4000");



	

    // var currentURL = getURL();
    // var currentNote = document.getElementById("note");
    // currentNote.innerHTML = "Welcome to the surface...";

    updateNote();

	var link = document.getElementById('save');
    // onClick's logic below:
    link.addEventListener('click', function() {
    	    
        saveNote();
        
    });
});


function updateNote(){
    // customAlert("gettingURL...", "4000");
    // //var test;
    // //var tabURL1 = getURL1(test);
    // customAlert("gotURL... " + tabURL1, "4000");
    // var previousNotes = localStorage[tabURL1];
    // customAlert("PREV ON TWD: " + previousNotes, "4000");
    // document.getElementById("note").value = previousNotes;
    // customAlert("update complete", "4000");

    customAlert("gettingURL...", "4000");
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        pageURL = tabs[0].url;
        customAlert("gotURL... " + pageURL, "4000");
        var previousNotes = localStorage[pageURL];
        customAlert("PREV_NOTES: " + previousNotes, "4000");

        if ( previousNotes === undefined ){
            document.getElementById("note").value = "";
            customAlert("NEW --> THEREFORE BLANK", "4000");

        } else {
            document.getElementById("note").value = previousNotes;
        }
        
        customAlert("Update Complete...", "4000");
        
    });




}

// function isInStorage(windowURL){
// 	return array.indexOf(windowURL) > -1;
// }

//Note is saved in local storage
//The id 'note' refers to the textarea where the user types their note
function saveNote() {

	// Get a value saved in a form.
    var note = document.getElementById("note").value;

    // Get the current URL
    var fetchURL;
    var tabURL = getURL();

    customAlert(tabURL, "4000");
    
    localStorage[tabURL] = note;

    

   

    var myvar = localStorage[tabURL];

    // if( myvar != null){
    // 	customAlert("CONTAINS: " + myvar, "4000");
    // }	else {
    // 	customAlert("IS NULL!" + myvar, "4000");
    // }

    customAlert("CONTAINS: " + myvar, "4000");

    //document.getElementById("note").value = "BBBBB";

    updateNote();
  
 //  	// Save it using the Chrome extension storage API.
 //    chrome.storage.sync.set({'value': note}, function() {
 //        customAlert(note, "4000");
 //    });

 //    //var test = new Object;
 //    chrome.storage.sync.get('value', function(test){
 //    //  test = [ { 'value': note } ]
    	
 //    	// for (first in test) break;
 //    	// customAlert(first, "4000");
 //    	// for (second in test);
 //    	// customAlert(second, "4000");
    	
 //    	customAlert(JSON.stringify(test), "4000");
	// });

 }


function getURL() {
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    	pageURL = tabs[0].url;
    	//customAlert(pageURL, "4000");
    	
	});
	return pageURL;
}

function getURL1(alpha) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        alpha = tabs[0].url;
        //customAlert(pageURL, "4000");
        
    });
    return alpha;
}


/* Function to display messages for testing purposes*/
function customAlert(msg,duration)
{
 var styler = document.createElement("div");
  styler.setAttribute("style","border: solid 5px Red;width:auto;height:auto;top:50%;left:40%;background-color:#444;color:Silver");
 styler.innerHTML = "<p>"+msg+"<p>";
 setTimeout(function()
 {
   styler.parentNode.removeChild(styler);
 },duration);
 document.body.appendChild(styler);
}
 
