var numClicks;
var updateNum;
//This block is necessary because Chrome extensions don't allow standard onClick functionality
document.addEventListener('DOMContentLoaded', function() {

    updateNum = 0;

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

    // var boldText = document.getElementById('bold');
    // // onClick's logic below:
    // boldText.addEventListener('click', function() {
        
    //     document.getElementById('note').className = 'bold';

    // });

    // var italicText = document.getElementById('italic');
    // // onClick's logic below:
    // italicText.addEventListener('click', function() {
        
    //     document.getElementById('note').className = 'italic';

    // });

    //Allows links to be opened in a new tab
    window.addEventListener('click',function(e){
        if(e.target.href!==undefined){
            chrome.tabs.create({url:e.target.href})
        }
    });


});


function deleteNote(){

    document.getElementById("deletePrompt").style.display = 'block';

    // var myURL = getURL();
    // document.getElementById("note").value = '';
    // localStorage.removeItem(myURL);
    // updateMasterList();
    // customAlert("Note Deleted!", "2000");

    var itemDelete = document.getElementById('YES');
    // onClick's logic below:
    itemDelete.addEventListener('click', function() {
        
        document.getElementById("deletePrompt").style.display = 'none';

        var myURL = getURL();
        document.getElementById("note").value = '';
        localStorage.removeItem(myURL);
        updateMasterList();
        customAlert("Note Deleted!", "2000");        

    });

    var itemSave = document.getElementById('NO');
    // onClick's logic below:
    itemSave.addEventListener('click', function() {

        document.getElementById("deletePrompt").style.display = 'none';
        
        customAlert("Note Was Not Deleted", "2000");        

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

function showList(){

    if(numClicks % 2 == 0){
        document.getElementById("test").style.display = 'block';
    }
    else{
        document.getElementById("test").style.display = 'none';
    }

}

/* Funciton updates the master list containing all notes */
function updateMasterList(){

    // This is the URL:      localStorage.key(i)                      
    // This is the textArea: localStorage.getItem(localStorage.key(i))

    // var masterList = new Array();
    // for (var i = 0; i < localStorage.length; i++){
    //     masterList[i] = localStorage.key(i);    
    // }

    for(var j=0; j < localStorage.length; j++){
        
        if(updateNum == 0) {
            
            var table = document.getElementById("table");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            var str = localStorage.key(j);
    
            cell1.innerHTML = str.link(localStorage.key(j));
            cell2.innerHTML = localStorage.getItem(localStorage.key(j));
        
        }
        else{

            var table = document.getElementById("table");
            table.deleteRow(1);
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            var str = localStorage.key(j);
    
            cell1.innerHTML = str.link(localStorage.key(j));
            cell2.innerHTML = localStorage.getItem(localStorage.key(j));

        }

    }

    updateNum++;

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


//Note is saved in local storage
//The id 'note' refers to the textarea where the user types their note
function saveNote() {

	// Get text written in the textArea
    var note = document.getElementById("note").value;

    // Get the current URL
    var tabURL = getURL();

    
    // save what is currently written in the note to localStorage and associate it with the current URL
    localStorage[tabURL] = note;

    var myvar = localStorage[tabURL];

    // call updateNote() to update current note to reference of the URL, essentially allows note to be pulled up again when tab closed 
    updateNote();
    

    customAlertGood("Note Saved!", "2000");

  
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
 styler.innerHTML = "<p align='center'>"+msg+"<p>";
 setTimeout(function()
 {
   styler.parentNode.removeChild(styler);
 },duration);
 document.body.appendChild(styler);
}

/* Function to display messages for testing purposes as well as notifying user of saved changes*/
function customAlertGood(msg,duration)
{
 var styler = document.createElement("div");
  styler.setAttribute("style","border: solid 2px black;width:auto;height:auto;top:50%;left:40%;background-color:green;color:Silver");
 styler.innerHTML = "<p align='center'>"+msg+"<p>";
 setTimeout(function()
 {
   styler.parentNode.removeChild(styler);
 },duration);
 document.body.appendChild(styler);
}
 
