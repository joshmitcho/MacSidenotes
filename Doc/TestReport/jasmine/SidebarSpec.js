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
  /*
	it("should add a note", function() {
		pageURL = "";
		chrome = {
			tabs : {
				query: function (){},
				url: "5"
			}
		};		
		
		expect(pageURL).toEqual("5");
		
		document.getElementById("note").value = "Test Note";
	  
		var localStorage = ["foo", "bar", "baz"];

		saveNote();
	  
		expect(localStorage).toContain("bar");
    });
  */
	it("should empty the list", function() {
    
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
	
	it("should show notice", function() {
    
		
		expect(1).toEqual(0);

	});
  
});
