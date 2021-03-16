var Banners = Banners || function()
{
	var cfg = {
		$bannerlist		: $('#banner-list'),
		$bannerLoad		: $('#banner-load'),
		bannerTarget	: 'banner-target',
		$bannerhide		: $('#banner-hide', this.$bannerlist),
	};

	var embedBanner = function(swf, width, height, version)
	{
		swfobject.embedSWF(swf, cfg.bannerTarget, width, height, version, false, {},{wmode:"opaque", base:"."},{}); 
	}
	
	var embedImage = function(img, width, height, version){
		var elem = document.createElement("img");
		elem.setAttribute("src", img);
		elem.setAttribute("width", width);
		elem.setAttribute("height", height);
		document.getElementById("banner-load").appendChild(elem);
	}
	
	var embedHtml = function(file, width, height){
			document.getElementById("banner-load").innerHTML='<object type="text/html" data=' + file + ' width=' + width + ' height=' + height + ' style="margin:0;"></object>';
		}

	var bannerClick = function(event)
	{
		var $this 		= $(this),
			swf			= $this.attr('data-swf'),
			img			= $this.attr('data-img'),
			html		= $this.attr('data-html'),
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
		else if (img != undefined)
		{
			$('.bannerReplay').html('').data('banner', {s : img, w: width, h:height, v:version });
			window.setTimeout(function(){ embedImage(img, width, height, version) }, 500);
		}
		else if (html != undefined)
		{
			width = parseInt($this.attr('data-width')) + 20 + 'px',
			height = parseInt($this.attr('data-height')) + 20 + 'px',
			$('.bannerReplay').html('').data('banner', {s : html, w: width, h:height, v:version });
			window.setTimeout(function(){ embedHtml(html, width, height) }, 500);
		}

		//bannerlistHandler();
		
		$(window).scrollTop( 0 );
		return false;
	};

	var bannerReplay = function(event)
	{
		var $this = $(this);
		if ($this.data('banner').s){
			embedBanner($this.data('banner').s, 
						$this.data('banner').w,
						$this.data('banner').h,
						$this.data('banner').v);

		}
		else{
			document.getElementById('frameDemo').contentDocument.location.reload(true);
		}
		return false;
	};	

	var bannerlistHandler = function(event)
	{
		var $this = $(this);
		if(cfg.listout)
		{
			// close banner
			cfg.$bannerlist.animate({'left': -310}, 350);
			cfg.listout = false;
			$this.removeClass('open');
		}
		else
		{
			// show banner
			cfg.$bannerlist.animate({'left': 0}, 350);
			cfg.listout = true;
			$this.addClass('open');
		}

		return false;
	};	

	//cfg.$bannerhide.click(bannerlistHandler);
	cfg.$bannerLoad.delegate('.bannerReplay', 'click', bannerReplay);
	cfg.$bannerlist.delegate('.banner-link', 'click', bannerClick);
}();