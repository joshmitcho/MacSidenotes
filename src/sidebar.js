var numClicks;
var updateNum;
var deleteOccur;
var table;
//This block is necessary because Chrome extensions don't allow standard onClick functionality
document.addEventListener('DOMContentLoaded', function() {

    table = document.getElementById("tbody");

    //reinitializing updateNum
    updateNum = 0;

    //initilaizing deleteOccur
    deleteOccur = false;

    //customAlert(document.getElementById("note").cols, "2000"); 
   

    //delete any saved empty notes
    deleteEmpty();

    // load note associated with current tab
    updateNote();    

    //initializing click count for list button
	numClicks = 0;

    var link = document.getElementById('save');
    // onClick's logic below:
    link.addEventListener('click', function() {
    	    
        saveNote();
        
    });


    var link1 = document.getElementById('list');
    // onClick's logic below:
    link1.addEventListener('click', function() {
        
        showList();
        clickCounter();
        
    });

    var link2 = document.getElementById('delete');
    // onClick's logic below:
    link2.addEventListener('click', function() {
        
        deleteNote();

    });

    
    //Allows links to be opened in a new tab
    window.addEventListener('click',function(e){
        if(e.target.href!==undefined){
            chrome.tabs.create({url:e.target.href})
        }
    });


});

/* Makes user confirm whether or not they want to delete note */

/*! \fn function deleteNote()
 *  \brief Makes user confirm whether or not they want to delete note.
 */
function deleteNote(){

    document.getElementById("deletePrompt").style.display = 'block';

    var itemDelete = document.getElementById('YES');
    // onClick's logic below:
    itemDelete.addEventListener('click', function() {

        deleteOccur = true;
        
        document.getElementById("deletePrompt").style.display = 'none';

        var myURL = getURL();
        document.getElementById("note").value = '';
        localStorage.removeItem(myURL);
        //updateMasterList();
        updateNote();
        //customAlert("Note Deleted!", "2000");
		showNotice("deleteNotice");        

    });

    var itemSave = document.getElementById('NO');
    // onClick's logic below:
    itemSave.addEventListener('click', function() {

        document.getElementById("deletePrompt").style.display = 'none';
        
        //customAlert("Note Was Not Deleted", "2000");        

    });

}

/* Function deletes any empty notes */
function deleteEmpty(){

    for(var cnt = 0; cnt < localStorage.length; cnt++){
        if(localStorage.getItem(localStorage.key(cnt)) == ''){
            localStorage.removeItem(localStorage.key(cnt));   
        }
    }

}

/* Counts the number of times list button has been clicked */
function clickCounter(){
    numClicks += 1;
}

/** Show/Hides List on button click */
function showList(){

    if(numClicks % 2 == 0){
        document.getElementById("show_hide_Table").style.display = 'block';
        //document.getElementById("window").className = "bumped";


        //document.getElementById("note").style.width = document.getElementById('show_hide_Table').clientWidth+"px"; // setting textarea width to match table
        //customAlert(document.getElementById('show_hide_Table').clientWidth, "2000");
    }
    else{
        document.getElementById("show_hide_Table").style.display = 'none';
        //document.getElementById("window").className = "";
        //document.getElementById("note").style.width = "300px";  // reverting back to original textarea size
    }

}

/* Funciton updates the master list containing all notes */
function updateMasterList(){

    deleteMasterList();

	populateMasterList();

}

function deleteMasterList(){


    var rowLength = document.getElementById("tbody").rows.length;

    
    for(var i=0; i < rowLength; i++){
        
        table.deleteRow(0);
    }
    
}

function populateMasterList(){


    // This is the URL:      localStorage.key(i)                      
    // This is the textArea: localStorage.getItem(localStorage.key(i))    

    for(var j=0; j < localStorage.length; j++){
    
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        var str = localStorage.key(j);  
        
        var groomedStr = str.substr(str.indexOf("://") + 3);
        
        groomedStr = groomedStr.replace("www.", "");
        if (groomedStr.substr(groomedStr.length - 1, groomedStr.length) == '/'){
            groomedStr = groomedStr.substr(0, groomedStr.length - 1);
        }
        

        if (groomedStr.length >= 20){
            groomedStr = groomedStr.substr(0, 20);
            groomedStr += "...";
        }
        
        //string_to_display_to_user.link(URL_link_connects_to);
        cell1.innerHTML = groomedStr.link(str);
        
        var groomedNote = localStorage.getItem(localStorage.key(j));
        
        if (groomedNote.length >= 20){
            groomedNote = groomedNote.substr(0, 20);
            groomedNote += "...";
        }
        
        cell2.innerHTML = groomedNote;
    }
    
}



/* This function brings up the note referenced to the current website  */
function updateNote(){

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
        pageURL = tabs[0].url;
        
        var previousNotes = localStorage[pageURL];

        if ( previousNotes === undefined ){
            document.getElementById("note").value = "";

        } else {
            document.getElementById("note").value = previousNotes;
        }
        
    });
	
    updateMasterList();

}


/*Note is saved in local storage
*The id 'note' refers to the textarea where the user types their note
*/
function saveNote() {

	// Get text written in the textArea
    var note = document.getElementById("note").value;

	if (note != ""){
	
    // Get the current URL
    var tabURL = getURL();

    
    // save what is currently written in the note to localStorage and associate it with the current URL
    localStorage[tabURL] = note;

    //var myvar = localStorage[tabURL];

	//customAlertGood("Note Saved!", "2000");
	
	showNotice("saveNotice");

    // call updateNote() to update current note to reference of the URL, essentially allows note to be pulled up again when tab closed 
    updateNote();
    }
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

/* Function to display messages for testing purposes as well as notifying user of possible deletion
 * @param msg is the message that will be displayed on the screen
 * @param duration is the duration of thime the message will be displayed on the screen
 */
function customAlert(msg,duration)
{
	var styler = document.createElement("div");
	styler.setAttribute("id","alertBad");
	styler.className
	styler.innerHTML = "<p align='center'>"+msg+"<p>";
	setTimeout(function()
	{
		styler.parentNode.removeChild(styler);
	},duration);
	document.body.appendChild(styler);
}

 /* Function to display messages for testing purposes as well as notifying user of saved changes
     * @param msg is the message that will be displayed on the screen
     * @param duration is the duration of thime the message will be displayed on the screen
     */
function customAlertGood(msg,duration)
{
	var styler = document.createElement("div");
	styler.setAttribute("id","alertGood");
	styler.innerHTML = "<p align='center'>"+msg+"<p>";
	setTimeout(function()
	{
		styler.parentNode.removeChild(styler);
	},duration);
	document.body.appendChild(styler);
	
}
 function showNotice(which)
{
	notice = document.getElementById(which);
	notice.style.display = "inline-block";
	setTimeout(function()
	{
		notice.style.display = "none";
	},1500);		
}
