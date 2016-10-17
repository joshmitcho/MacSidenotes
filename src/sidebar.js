
//This block is necessary because Chrome extensions don't allow standard onClick functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // load note associated with current tab
    updateNote();

	var link = document.getElementById('save');
    // onClick's logic below:
    link.addEventListener('click', function() {
    	    
        saveNote();
        
    });
});

/* This function updates  */
function updateNote(){


    //customAlert("gettingURL...", "4000");
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        pageURL = tabs[0].url;
        //customAlert("gotURL... " + pageURL, "4000");
        var previousNotes = localStorage[pageURL];
        //customAlert("PREV_NOTES: " + previousNotes, "4000");

        if ( previousNotes === undefined ){
            document.getElementById("note").value = "";
            //customAlert("NEW --> THEREFORE BLANK", "4000");

        } else {
            document.getElementById("note").value = previousNotes;
        }
        
        //customAlert("Update Complete...", "4000");
        
    });




}


//Note is saved in local storage
//The id 'note' refers to the textarea where the user types their note
function saveNote() {

	// Get text written in the textArea
    var note = document.getElementById("note").value;

    // Get the current URL
    var fetchURL;
    var tabURL = getURL();

    
    // save what is currently written in the note to localStorage and associate it with the current URL
    localStorage[tabURL] = note;

    var myvar = localStorage[tabURL];

    // call updateNote() to update current note to reference of the URL, essentially allows note to be pulled up again when tab closed 
    updateNote();

    customAlert("Note Saved!", "2000");






  
    /* ------------- ATTEMPT AT USING CHROME API FOR STORAGE ------------- */

  
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


/* Function grabs the URL of the current tab 
 * Returns the URL   
 */
function getURL() {
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    	pageURL = tabs[0].url;
	});
	return pageURL;
}


/* Function to display messages for testing purposes as well as notifying user of saved changes*/
function customAlert(msg,duration)
{
 var styler = document.createElement("div");
  styler.setAttribute("style","border: solid 2px Red;width:auto;height:auto;top:50%;left:40%;background-color:#444;color:Silver");
 styler.innerHTML = "<p>"+msg+"<p>";
 setTimeout(function()
 {
   styler.parentNode.removeChild(styler);
 },duration);
 document.body.appendChild(styler);
}
 
