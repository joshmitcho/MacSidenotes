
//This block is necessary because Chrome extensions don't allow standard onClick functionality
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('save');
    // onClick's logic below:
    link.addEventListener('click', function() {
        saveNote();
    });
});

//Note is saved in local storage
//The id 'note' refers to the textarea where the user types their note
function saveNote() {
	 alert(document.getElementById("note").value);
 }