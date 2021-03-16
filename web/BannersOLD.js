/*
*	Script Name
*	
*	File: banners.src.js
*	
*	About: Version
*		1.1
*	
*	Description:
*		
*	
*	Requires:
*		- jQuery 
*		- swfObject
*		
*
*	Author:
*		- Ian Shea
*
*/

var Banners = Banners || function()
{
	var cfg = {
		
		$bannerlist		: $('#banner-list'),
		$bannerLoad		: $('#banner-load'),
		bannerTarget	: 'banner-target',
		$bannerhide		: $('#banner-hide', this.$bannerlist),
		//listout			: true
	};
	
	var embedBanner = function(swf, width, height, version)
	{
		swfobject.embedSWF(swf, cfg.bannerTarget, width, height, version, false, {},{wmode:"opaque", base:"."},{}); 
	}
	
	var embedHTML = function(file)
	{
		 $('#banner-load').load(file);
	}
	
	var bannerClick = function(event)
	{
		var $this 		= $(this),
			swf			= $this.attr('data-swf'),
			html5		= $this.attr('data-html'),
			img			= $this.attr('data-img'),
			width		= $this.attr('data-width') + 'px',
			height		= $this.attr('data-height') + 'px',
			version		= $this.attr('data-version');
			nDiv 		= document.createElement('div');
			$comments 	= $this.parent().find('div.comments').clone(),
			nReplay		= document.createElement('a');
			
		var bannerTitle = $this.html();
			
		$comments.removeClass('hidden');
		
		nDiv.setAttribute('id', cfg.bannerTarget)
		nReplay.setAttribute('href', '#');
		nReplay.setAttribute('data-obj', $this);
		nReplay.setAttribute('class', 'bannerReplay');

		cfg.$bannerLoad.empty().append('<h3>' + bannerTitle + '</h3>', nDiv, $comments, '<br />', nReplay);
		
		if (swf != undefined)
		{
			$('.bannerReplay').html('Replay').data('banner', {s : swf, w: width, h:height, v:version });
			window.setTimeout(function(){ embedBanner(swf, width, height, version) }, 500);
		}
		else if (html5 != undefined)
		{	
			$('.bannerReplay').html('Replay').data('banner', {s : html5});
			window.setTimeout(function(){ embedHTML(html5) }, 500);
		}
		else if (img != undefined)
		{
			$('.bannerReplay').html('').data('banner', {s : img, w: width, h:height, v:version });
			window.setTimeout(function(){ embedBanner(img, width, height, version) }, 500);
		}
		
		//bannerlistHandler();
		
		$(window).scrollTop( 0 );
		
		return false;
	};
	
	var bannerReplay = function(event)
	{
		var $this = $(this);
		
		if ($this.data('banner').s)
		{
			embedBanner($this.data('banner').s, 
						$this.data('banner').w,
						$this.data('banner').h,
						$this.data('banner').v);
		}
		else
		{
			document.getElementById('frameDemo').contentDocument.location.reload(true);
		}
		
		return false;
	};
	
	cfg.$bannerLoad.delegate('.bannerReplay', 'click', bannerReplay);
	
	cfg.$bannerlist.delegate('.banner-link', 'click', bannerClick);

}();