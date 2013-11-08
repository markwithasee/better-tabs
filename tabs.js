/*
* Better Tabs - A tiny jquery plugin which uses object literal organization and progressive enhancement.
*
* Copyright (c) 2013 Marc Brooks
*
* Licensed under the MIT license:
*   http://www.opensource.org/licenses/mit-license.php
*
* Project home:
*  https://github.com/markwithasee/better-tabs
*
*/

Tabs = {
  // Changes to the tab with the specified ID.
  GoTo: function (containerId, contentId, skipReplace) {

    // Change current active tab
    var currentTab = $('.tabs_container.'+containerId).find('.toc li a[href="#' + contentId + '"]').parent(),
		thisTOC = currentTab.parent('.toc');
    thisTOC.children('.toc li.current').removeClass('current');
	currentTab.addClass('current');
    
    // Change current active content 
	thisTOC.siblings('.content').hide();
    thisTOC.siblings('.content').filter('#_' + contentId).show();
  
    // Change the address
    if (!skipReplace) window.location.replace("#" + contentId);
  },

  Init: function () {
	
	var i = 1;
	
	$('.tabs_container').each(function(){
		
	    var containerId,
			contentId,
	      	tabList = [],
	      	hash = window.location.hash.substring(1); 
	      	// Hash starts with second character
	      	// The underscore in "_hash" content ID parameter prevents scroll on load

		// Unique class for each container
		var containerId = 'tabs_container_'+i;
		$(this).addClass(containerId);
		i++;

	    // Array of tabs  
	    $(this).find('.toc li a').each(function(){
			tabList.push($(this).attr('href').substring(1));
	    });

		// Hide all tabs initially 
	    $(this).find('.content').hide();

	    // If there's a URL hash and it's in the array, activate it
	    if ( (window.location.hash) && ($.inArray(hash,tabList) != -1) ) {
			var contentId = hash;
	    }
	    // If the URL hash is not in the array, activate the first tab
	    else {
			var contentId = $(this).find('.toc li a:first').attr('href').substring(1);
	    }

	    if (contentId) Tabs.GoTo(containerId, contentId, true);

	    // Attach an onclick event to all the anchor links in the table of contents.
	    $(this).find('.toc li a').on('click',function(e){
			e.preventDefault();
			// If this a nested tab, don't change the address
			var skipReplace = false;
			if ($(this).parents('.tabs_container').length > 1) {
				var skipReplace = true;
			}
			// Get the name of the anchor of the link that was clicked.
			Tabs.GoTo(containerId, this.hash.substring(1), skipReplace);
			return false;
	    });
		
	});

  }
};

// Hook up the ready event to the tab initialization function
$(document).ready(function () { Tabs.Init(); });