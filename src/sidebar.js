/** @private click counter for list button, increment on keyboard click*/ var numClicks;
/** @private html/css table that is being displayed/hidden by js*/ var table;
/** @private time 'Note Saved'/'Note Deleted' messages are displayed for*/ var notifyTime = 1500;


/**
  * This block is necessary because Chrome extensions don't allow standard onClick functionality. In turn is populated with listeners that react to user input.
  *
  */
document.addEventListener('DOMContentLoaded', function() {

    // table the user will see that contains the notes they have saved and corresponding URLs
    table = document.getElementById("tbody");

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

    
    // Allows links to be opened in a new tab
    window.addEventListener('click',function(e){
        if(e.target.href!==undefined){
            chrome.tabs.create({url:e.target.href})
        }
    });


});

/**
 *  Makes user confirm whether or not they want to delete note. Delete note is called when 'delete' button is pressed.
 *  
 */
function deleteNote(){

    // Exception of if they call delete note on a non-existent note, button will not trigger any action
    if(document.getElementById("note").value != ''){
       
        document.getElementById("deletePrompt").style.display = 'block';

        var itemDelete = document.getElementById('YES');
        // onClick's logic below:
        itemDelete.addEventListener('click', function() {


            document.getElementById("deletePrompt").style.display = 'none';

            var myURL = getURL();
           
                document.getElementById("note").value = '';
                localStorage.removeItem(myURL);
                
                updateNote();
               
                // popup notifying the user that a note has been deleted
                showNotice("deleteNotice"); 

            
                   

        });

        var itemSave = document.getElementById('NO');
        
        // onClick's logic below:
        itemSave.addEventListener('click', function() {

            // closing the box prompting the user for confirmation of deletion
            document.getElementById("deletePrompt").style.display = 'none';
           
        });

    }   

}

/**
  * Counts the number of times the 'list' button has been clicked.
  * 
  */
function clickCounter(){
    numClicks += 1;
}

/** 
  * Shows/Hides the master list on user keyboard click of 'list' button.
  *
  */
function showList(){

    if(numClicks % 2 == 0){
        // diplaying the master list of notes to the user
        document.getElementById("show_hide_Table").style.display = 'block';
    }
    else{
        // hiding the master list of notes from users screen
        document.getElementById("show_hide_Table").style.display = 'none';
    }

}

/**
  * Updates the master list containing all notes and the url associated to them. 
    Deletes the table previously shown to user and replaces it with the table with 
    the table that contains the changes the user made. Does so in real time if list
    is opened.
  * 
  */
function updateMasterList(){

    deleteMasterList();

	populateMasterList();

}

/**
  * Deletes the current table that is diplayed to the user.
    This table contained the contents of the master list.
  *
  */
function deleteMasterList(){


    var rowLength = document.getElementById("tbody").rows.length;

    
    for(var i=0; i < rowLength; i++){
        
        table.deleteRow(0);
    }
    
}


/**
  * Populates the displayed table with the updated contents of master list,
    which contains the most recently updates notes and links to notes,
    while also grooming the output the user sees for aesthetic purposes.
  * 
  */
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



/**
  * Populates the extensions 'text area', the place on the extension where the
    user inputs note, with the note that is associated with the current website.
  * 
  */
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


/** 
  * Saves the id 'note', which is the text area of the extension, to users google chrome localStorage.
  * 
  */
function saveNote() {

	// Get text written in the textArea
    var note = document.getElementById("note").value;

    //Disallows empty notes to be saved
	if (note != ""){
	
        // Get the current URL
        var tabURL = getURL();

        
        // save what is currently written in the note to localStorage and associate it with the current URL
        localStorage[tabURL] = note;

    	//Displays to the user that the note has been saved
    	showNotice("saveNotice");

        // call updateNote() to update current note to reference of the URL, essentially allows note to be pulled up again when tab closed 
        updateNote();
    }
 }


/** 
  * Grabs the URL of the current tab and returns it. 
  *
  * @return {string} pageURL - The url of the current tab   
  */
function getURL() {
	
	chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    	pageURL = tabs[0].url;
	});
	return pageURL;
}

/** 
  * Display messages for testing purposes.
  *
  * @param {message} string The message that will be displayed on the screen.
  * @param {duration} string The duration of time the message will be displayed on the screen.
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

  /** 
    * Display messages for testing purposes.
    *
    * @param {message} string The message that will be displayed on the screen.
    * @param {duration} string The duration of time the message will be displayed on the screen.
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

/** 
  * Shows notification message to inform user of a saved or deleted note.
  * 
  * @param {string} which Save note or Delete note.
  */
 function showNotice(which)
{
	notice = document.getElementById(which);
	notice.style.display = "inline-block";
	setTimeout(function()
	{
		notice.style.display = "none";
	},notifyTime);		
}
