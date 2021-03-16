<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	<head>
		<title>Web Ad Previews</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="cache-control" content="max-age=0" />
        <meta http-equiv="cache-control" content="no-cache" />
        <meta http-equiv="expires" content="0" />
        <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
        <meta http-equiv="pragma" content="no-cache" />
        <link rel="stylesheet" type="text/css" href="../web/Banners.css">
	</head>
	<body>
    <div id="banner-list" style="left: 0px;">
		<a id="banner-hide" class="open" href="#">
			<span class="indicator"></span>
		</a>
		
		<header>
			<h1>Avista</h1>
			<h2>Bill Assistance </h2>
		</header>
		
		<div class="banners">

				<h4>Animated Webads</h4>
				<ul>
					<?php
						echo showSWFs('.');
					?>
				</ul>
                <h4>Staic Webads</h4>
				<ul>
					<?php
						echo showJPGs('.');
					?>
				</ul>			
		</div>
	</div>

	<div id="container">
	
		<div id="banner-holder">
        	<div id="banner-load"></div>
			
		</div>
	
	</div> <!--! end of #container -->
	
	<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if offline -->
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>
	<script type="text/javascript" src="../web/Banners.js"></script>



</body>
</html>
<?php

function showSWFs($dir = '.') {
	$output = '';
	$flash_o = '';
	$fcount = 0;	// flash count
	$count = 0;
	$files = scandir($dir);
    foreach ($files as $file) 
    {
		if (strstr($file, '.swf') || strstr($file, '.gif') ||  strstr($file, '.html')) 
		{
			$names = explode('.', $file);
			if (strstr($names[0], '_')) 
			{
				$unames = explode('_', $names[0]);
				$sizes = explode('x', $unames[0]);
			}
			else
			{
				$sizes = explode('x', $names[0]);
			}
			if(strstr($file, '.swf')){
				$flash_o .= '
					<li><a data-version="10" data-width="'.$sizes[0].'" data-height="'.$sizes[1].'" data-swf="'.$dir.'/'.$file.'" href="#" class="banner-link">'.$names[0].'</a></li>
				';
			}else if(strstr($file, '.gif')){
				$flash_o .= '
					<li><a data-version="10" data-width="'.$sizes[0].'" data-height="'.$sizes[1].'" data-img="'.$dir.'/'.$file.'" href="#" class="banner-link">'.$names[0].'</a></li>
				';
			}else {
				$flash_o .= '
					<li><a data-version="10" data-width="'.$sizes[0].'" data-height="'.$sizes[1].'" data-html="'.$dir.'/'.$file.'" href="#" class="banner-link">'.$names[0].'</a></li>
				';
			}

		$fcount++;
		}
    }
	return $output.$flash_o;
}

function showJPGs($dir = '.') {
	$output = '';
	$img_o = '';
	$icount = 0;	// image count
	$count = 0;
	$files = scandir($dir);
	//$formats = array('.jpg', '.png', '.gif');
    foreach ($files as $file) 
    {
		if (strstr($file, '.jpg') || strstr($file, '.png')) {
			$names = explode('.', $file);
			$sizes = explode('x', $names[0]);
			$img_o .= '
				<li><a data-version="10" data-width="'.$sizes[0].'" data-height="'.$sizes[1].'" data-img="'.$dir.'/'.$file.'" href="#" class="banner-link">'.$names[0].'</a></li>
			';
		$icount++;
		}
    }
	return $output.$img_o;
}
?>