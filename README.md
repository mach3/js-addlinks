# AddLinks.js


This helps us to manage the "add link" user interface.


## Usage


### Simple Example


First, mark up HTML for adding links.

	<!-- Text input elements to input a link -->
	<label for="url">URL:</label><input id="url" type="text" /><br />
	<label for="title">TITLE:</label><input id="title" type="text" /><br />
	
	<!-- Button elements to add / clear links -->
	<input id="addLink" value="Add" type="button" />
	<input id="clearLinks" value="clear" type="button" />

	<!-- List elemnet to display link list -->
	<ul id="linkList"></ul>

Initialize and run.

	var mylinks = new AddLinks;
	mylinks.run();

Does it work ?  
You can get the collection of links as JSON string, using `toString` method.
	
	var jsonString = mylinks.toString();
	// This returns JSON string like...
	// [{"url":"http://www.google.com","title":"Google"}, ... ]

### Configure

You can configure the selector of elements,  
as the first argument of constructor, or a argument of `config` method.

	
	var option = {
		urlInput : "#url", // input element for URL
		titleInput : "#title", // input element for Title
		addButton : "#addLink", // button element to add a link
		clearButton : "#clearLinks", // button element to clear all links
		linkList : "#linkList", // list element to display the collection of links
		deleteButton : "#linkList .delete" // button element to delete a link
	};

	var mylinks = new AddLinks( option );
	
	// or

	mylinks.config( option );

You can pass the collection of links as the default,  
as the second argument of constructor.


	var links = [
		{ "title":"Google", "url":"http://www.google.com" },
		{ "title":"Yahoo!", "url":"http://www.yahoo.com" }
	];
	var mylinks = new AddLinks( {}, links );

### Other methods

- `refreshList()`
	Update the display of the list
- `clear()`
	Clear all the list
- `removeByUrl( url )`
	Search the url passed from the list, and remove the link
- `add( url, title )`
	Add a new link


## Version

1.0 : Release

## Lisence

The MIT License

Copyright (c) 2010 Matsukaze.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
