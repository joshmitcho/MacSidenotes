describe("MacSidenotes", function() {

	beforeEach(function() {
	  
	});

	it("should increment clicker", function() {
    
		var oldClicks = numClicks;
		clickCounter();
		expect(numClicks).toEqual(oldClicks + 1);
		clickCounter();
		expect(numClicks).toEqual(oldClicks + 2);
		clickCounter();
		expect(numClicks).toEqual(oldClicks + 3);
	
	});

	it("should empty the Master List", function() {
    
		var addedRows = 5;
		
		table = document.getElementById("tbody");
		for (i = 0; i < addedRows; i++){
			table.insertRow(-1);
		}

		var rows = table.rows.length;

		expect(rows).toEqual(addedRows);
		
		deleteMasterList();
		rows = table.rows.length;
		expect(rows).toEqual(0);
		
	});
	
	it("should show the Note Saved and Note Deleted notices", function() {
    
		var save = document.getElementById("saveNotice");
		var del = document.getElementById("deleteNotice");
		
		expect(save.style.display).toEqual("");
		expect(del.style.display).toEqual("");

		showNotice("saveNotice");
		expect(save.style.display).toEqual("inline-block");
		showNotice("deleteNotice");
		expect(del.style.display).toEqual("inline-block");

	});
	
	it("should reveal and hide the Master List", function() {
		
		numClicks = 0;
		var table = document.getElementById("show_hide_Table")
		
		expect(table.style.display).toEqual("");
		showList();
		clickCounter();
		expect(table.style.display).toEqual("block");
		showList();
		clickCounter();
		expect(table.style.display).toEqual("none");

	});	
  
});
