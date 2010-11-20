/*!
 * AddLinks
 * Copyright (C) Matsukaze. All rights reserved.
 * @version 1.1
 * @require jQuery 1.4 or later
 * @author mach3
 */
var AddLinks = function( option, links ){
	this.links = links || [];
	if( option ) this.config ( option );
	return this;
};
AddLinks.prototype = {
	
	EVENT_CHANGE : "change",
	EVENT_ERROR : "error",

	ERROR_EMPTY : "empty",
	ERROR_LIMIT_OVER : "limitOver",
	ERROR_DOUBLED : "doubled",
	

	option : {
		urlInput:"#linkUrlInput",
		titleInput:"#linkTitleInput",
		addButton:"#linkAddButton",
		clearButton:"#linkClearButton",
		list:"#linkList",
		deleteButton:"#linkList .delete",
		limit:10
	},

	links : [],
	urlInput : null,
	titleInput : null,

	/**
	 * Configure the selectos, or some options.
	 * @param {object} option Confiuration option
	 * @return {object} AddLinks object
	 */
	config : function( option ){
		this.option = $.extend( {}, this.option, option );
	},
	/**
	 * Start to observe ( add event listeners )
	 * @return {object} AddLinks object
	 */
	run : function(){
		this.urlInput = $(this.option.urlInput);
		this.titleInput = $(this.option.titleInput);
		this.urlInput.bind( "keydown", $.proxy( this._onKeyDownInput, this ) );
		this.titleInput.bind( "keydown", $.proxy( this._onKeyDownInput, this ) );
		$(this.option.addButton).click( $.proxy( this._onClickAddButton, this ) );
		$(this.option.clearButton).click( $.proxy( this.clear, this ) );
		$(this.option.deleteButton).live( "click", $.proxy( this._onClickDeleteButton, this ) );
		$(this).bind( this.EVENT_CHANGE, $.proxy( this.refreshList, this ) );
		return this;
	},
	_onKeyDownInput : function( e ){
		if( e.keyCode !== 13 ) return;
		this._onClickAddButton();
	},
	_onClickAddButton : function( e ){
		this.add(
			this.urlInput.val(),
			this.titleInput.val()
		);
	},
	_onClickDeleteButton : function( e ){
		this.removeByUrl( this._escape( $(e.target).data("url") ) );
	},
	_error : function( message ){
		$(this).trigger( this.EVENT_ERROR, message );
		return this;
	},
	_escape : function( str ){
		return $("<span>").text(str).html();
	},
	_find : function( url ){
		var _f = false;
		$.each( this.links, function( i, o ){
			if( o.url === url ){ _f = true; return false; }
		});
		return _f;
	},
	/**
	 * Add a new link
	 * @param {string} url URL of the page
	 * @param {string} title Title of the page
	 * @return {boolean} If added successfully or not
	 */
	add : function( url, title ){
		switch( true ){
			case ( !url || !title ) :
				this._error( this.ERROR_EMPTY );
				return false;
				break;
			case ( this.links.length >= this.option.limit ) :
				this._error( this.ERROR_LIMIT_OVER );
				return false;
				break;
			case ( this._find( url ) ) :
				this._error( this.ERROR_DOUBLED );
				return false;
				break;
			default :
				this.links.push({
					url : this._escape( this.urlInput.val() ),
					title : this._escape( this.titleInput.val() )
				});
				$(this).trigger( this.EVENT_CHANGE );
				this.urlInput.val("");
				this.titleInput.val("");
				return true;
				break;
		}
		return false;
	},
	/**
	 * Remove a link from the list by URL
	 * @param {string} url URL of the link deleted
	 * @return {object} AddLinks object
	 */
	removeByUrl : function( url ){
		this.links = $.grep( this.links, function( o, i ){
			return o.url !== url;
		});
		$(this).trigger( this.EVENT_CHANGE );
		return this;
	},
	/**
	 * Clear all links
	 * @return {object} AddLinks object
	 */
	clear : function(){
		this.links = [];
		$(this).trigger( this.EVENT_CHANGE );
		return this;
	},
	/**
	 * Refresh the list of the links
	 * @return {object} AddLinks object
	 */
	refreshList : function(){
		var list = $( this.option.list ),
			tmpl = '<li><a href="{{url}}">{{title}}</a> <input type="button" class="delete" value="X" data-url="{{url}}" /></li>';
		list.html("");
		$.each( this.links, function( i, o ){
			var html = tmpl
			.replace( /{{title}}/g, o.title )
			.replace( /{{url}}/g, o.url );
			$(html).appendTo( list );
		});
		return this;
	},
	/**
	 * Wrapper of jQuery.bind
	 * @return {object} AddLinks object
	 */
	bind : function( name, func ){
		$(this).bind( name, func );
		return this;
	},
	/**
	 * Return the link collection as JSON String
	 * @return {string} JSON String
	 */
	toString : function(){
		var str = "[";
		$.each( this.links, function( i, o ){
			if ( !! i ){ str += ","; }
			str +=  '{"url":"{{url}}","title":"{{title}}"}'
			.replace("{{url}}", o.url )
			.replace("{{title}}", o.title);
		} );
		str += "]";
		return str;
	}
};
