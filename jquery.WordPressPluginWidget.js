jQuery(document).ready(function($){

	var distance_of_time_in_words = function(to, from) {
		
		var distance_in_seconds = ((to - from) / 1000),
			distance_in_minutes = Math.floor( distance_in_seconds / 60 );

		if (distance_in_minutes == 0) return 'less than a minute ago';
		if (distance_in_minutes == 1) return 'a minute ago';
		if (distance_in_minutes < 45) return distance_in_minutes + ' minutes ago';
		if (distance_in_minutes < 90) return 'about 1 hour ago';
		if (distance_in_minutes < 1440) return 'about ' + Math.floor( distance_in_minutes / 60 ) + ' hours ago';
		if (distance_in_minutes < 2880) return '1 day ago';
		if (distance_in_minutes < 43200) return Math.floor(distance_in_minutes / 1440) + ' days ago';
		if (distance_in_minutes < 86400) return 'about 1 month ago';
		if (distance_in_minutes < 525960) return Math.floor(distance_in_minutes / 43200) + ' months ago';
		if (distance_in_minutes < 1051199) return 'about 1 year ago';

		return 'over ' + Math.floor(distance_in_minutes / 525960) + ' years ago';
	};
	
	var i = 0;
	var box_title_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAXCAMAAAAx3e/WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQjIyNkJERkM0NjYxMUUxOEFDQzk3ODcxRDkzRjhCRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQjIyNkJFMEM0NjYxMUUxOEFDQzk3ODcxRDkzRjhCRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRCMjI2QkREQzQ2NjExRTE4QUNDOTc4NzFEOTNGOEJFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRCMjI2QkRFQzQ2NjExRTE4QUNDOTc4NzFEOTNGOEJFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+dka2KgAAAEVQTFRFxMTEyMjI0tLSvb29vr6+zc3Ny8vLxcXFz8/P6enp3t7ex8fH0dHR1NTUw8PDwMDAzs7OvLy8wcHBu7u7v7+/zMzM////budQFwAAABd0Uk5T/////////////////////////////wDmQOZeAAAAcklEQVR42tSQSQ7DMAwD6chOukWs5eX/Ty2coo0T9wOdEzEgdRBuzNmnDofgja52JDyz5TCqUp0O6kfrb4bzSXkRiTviEZZ6JKLMJ5VQ2v8iGbtbfEwXmjFMG0VwdQo10hQNxYqtLMv9O6xvpZ/QeAkwAKjwHiJLaJc3AAAAAElFTkSuQmCC';
	//var stats_png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAqCAMAAACEJ4viAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEQjIyNkJEQkM0NjYxMUUxOEFDQzk3ODcxRDkzRjhCRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEQjIyNkJEQ0M0NjYxMUUxOEFDQzk3ODcxRDkzRjhCRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRCMjI2QkQ5QzQ2NjExRTE4QUNDOTc4NzFEOTNGOEJFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRCMjI2QkRBQzQ2NjExRTE4QUNDOTc4NzFEOTNGOEJFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+h1kA9gAAAK5QTFRF+fn5sbGx8fHx09PTmpqa2dnZ/f3919fX9PT00NDQ1dXVpKSk+vr6+/v7vb298vLyycnJ8/PztLS0zc3N6enp/v7+q6ur2NjY9/f3srKy/Pz8p6en7u7uoaGhnJyc4eHhtbW1pqam6Ojo9fX17e3toqKirKys1NTUzs7Ox8fHwcHBwMDA5eXlnZ2dpaWl0dHR9vb25ubm4uLi3d3dqqqqwsLCv7+/oKCgmZmZ////8yEsbwAAAMBJREFUeNrE0tcOgjAUBuDSliUoMhTEvfdef9//xUQjgaLX0Ium/ZLT/+SkRPxZpGykvuf5VMJogy5jY9yjDHcWFhqlcRuHc4o6B1QK0BDg+hcZgNDh3NWTwzItH/bRrhvT+g3zSxZkNGCZpoWGIbU0a3Y6zV5VA6keyeDxiw62P0gUqEW0FbDim4nVikFJbU2zZXybUEaxhCqOQqyh5/G0wpWICUwthyqwD4InOMuXJ7/gs7WkoPdVg1vykF8CDACEFanKO3aSYwAAAABJRU5ErkJggg==';

	var parseJson = function(results, $widget) {
	
		if ( null === results) return;

		// Date updated
		var lastUpdatedDate = new Date(results.last_updated),
			lastUpdatedReadable = distance_of_time_in_words(new Date(), lastUpdatedDate),
			lastUpdated = lastUpdatedDate.toDateString();
		$widget.find('.updated').html('Plugin last updated ' + lastUpdatedReadable + " (" + lastUpdated + ")");

		// Author url. Can be multiple, we are lazy and just get the first one
		var authors = results.contributors,
			authorName;
		for (authorName in authors) break;
		$widget.find('.owner').text( authorName ).attr("href", "http://profiles.wordpress.org/" + authorName);

		// Plugin name
		$widget.find('.repo').text( results.name );

		// Ratings
		var rating = ((results.rating / 100) * 5);
		var stars_width = (results.rating / 100) * 92;
		var ratingText = rating.toFixed(1) + " stars";
		$widget.find('.wordpress-stars').text(ratingText).css("width", stars_width);
		$widget.find('.wordpress-stars-wrap').attr("title", ratingText);
		$widget.find('.wordpress-rating').html( "From " + results.num_ratings + ( ( results.num_ratings === 1) ? " user." : " users.")  );
		
		// Description
		$widget.find('.description span').html(results.short_description);

		// Homepage link
		$widget.find('.link').append($('<a />').attr('href', results.homepage).text(results.homepage));

		// Download link
		$widget.find('.download').attr( "href", results.download_link );

		// Set widget as loaded
		$widget.addClass("is-loaded");

	};


	$('.wordpress-widget').each(function(){

		if (i === 0) $('head').append(
			'<style type="text/css">'
			+'.wordpress-box{font-family:helvetica,arial,sans-serif;font-size:13px;line-height:18px;background:#fafafa;border:1px solid #ddd;color:#666;border-radius:3px}'
			+'.wordpress-box a{color:#4183c4;border:0;text-decoration:none}'
			+'.wordpress-box .wordpress-box-title{position:relative;border-bottom:1px solid #ddd;border-radius:3px 3px 0 0;background:#fcfcfc;background:-moz-linear-gradient(#fcfcfc,#ebebeb);background:-webkit-linear-gradient(#fcfcfc,#ebebeb);}'
			+'.wordpress-box .wordpress-box-title h3{font-family:helvetica,arial,sans-serif;font-weight:normal;font-size:16px;color:gray;margin:0;padding:10px 10px 10px 30px;background:url('+box_title_png+') 7px center no-repeat}'
			+'.wordpress-box .wordpress-box-title h3 .repo{font-weight:bold}'
			+'.wordpress-box .wordpress-box-title .wordpress-stats{position:absolute;top:4px;right:10px;xbackground:white;xborder:1px solid #ddd;border-radius:3px;font-size:11px;xfont-weight:bold;line-height:18px;height:18px;padding:0 .5em}'
			+'.wordpress-box .wordpress-box-title .wordpress-stats a{display:inline-block;height:21px;color:#666;padding:0 5px 0 18px;background: url('+') no-repeat}'
			+'.wordpress-box .wordpress-box-content{padding:10px;font-weight:300;min-height:4.1em;}'
			+'.wordpress-box .wordpress-box-content p{margin:0}'
			+'.wordpress-box .wordpress-box-content .link{font-weight:bold}'
			+'.wordpress-box .wordpress-box-download{position:relative;border-top:1px solid #ddd;background:white;border-radius:0 0 3px 3px;padding:10px;height:24px}'
			+'.wordpress-box .wordpress-box-download .updated{margin:0;font-size:11px;color:#666;line-height:24px;font-weight:300}'
			+'.wordpress-box .wordpress-box-download .updated strong{font-weight:bold;color:#000}'
			+'.wordpress-box .wordpress-box-download .download{position:absolute;display:block;top:10px;right:10px;height:24px;line-height:24px;font-size:12px;color:#666;font-weight:bold;text-shadow:0 1px 0 rgba(255,255,255,0.9);padding:0 10px;border:1px solid #ddd;border-bottom-color:#bbb;border-radius:3px;background:#f5f5f5;background:-moz-linear-gradient(#f5f5f5,#e5e5e5);background:-webkit-linear-gradient(#f5f5f5,#e5e5e5);}'
			+'.wordpress-box .wordpress-box-download .download:hover{color:#527894;border-color:#cfe3ed;border-bottom-color:#9fc7db;background:#f1f7fa;background:-moz-linear-gradient(#f1f7fa,#dbeaf1);background:-webkit-linear-gradient(#f1f7fa,#dbeaf1);}'
			+'.wordpress-stars-wrap, .wordpress-stars {background:url(http://wordpress.org/extend/plugins-plugins/bb-ratings/stars.png) bottom left;line-height:17px;}'
			+'.wordpress-stars-wrap {width:92px;height:17px;position:relative;overflow:hidden;}'
			+'.wordpress-stars {background-position:top left;width:0;height:17px;float:left;text-indent:100%;}'
			+'.wordpress-stats, .wordpress-box-download, .wordpress-box-content { opacity:0; transition: all .25s ease-in-out; -webkit-transition: all .25s ease-in-out;}'
			+'.wordpress-box.is-loaded .wordpress-stats, .wordpress-box.is-loaded .wordpress-box-download, .wordpress-box.is-loaded .wordpress-box-content { opacity:1; }'
			+'</style>'
		);
		i++;

		var $container = $(this), $widget,
			pluginSlug = $container.data('slug'),
						pluginUrl = "http://wordpress.org/plugins/" + pluginSlug + "/",
						supportUrl = "http://wordpress.org/support/plugin/" + pluginSlug + "/",
						authorUrl = "";
			// vendorUrl = "http://wordpress.com/" + vendorName,
			// repoUrl = "http://wordpress.com/" + vendorName + '/' + repoName;
			// vendorName = repoName = vendorUrl = repoUrl = "";	

		$widget = $(
			'<div class="wordpress-box">' +
			'<div class="wordpress-box-title">' +
			'<h3>' +
			'<a class="owner" href=""></a>' +
			' / ' +
			'<a class="repo" href="' + pluginUrl + '">' + '&nbsp;</a>' +
			'</h3>' +
			'<div class="wordpress-stats">' +
			'<div class="wordpress-stars-wrap"><div class="wordpress-stars"></div></div>' +
			'<div class="wordpress-rating"></div>' +
			'</div>' +
			'</div>' +
			'<div class="wordpress-box-content">' +
			'<p class="description"><span></span> &mdash; <a href="' + pluginUrl + '">Read More</a></p>' +
			'<p class="link"></p>' +
			'</div>' +
			'<div class="wordpress-box-download">' +
			'<p class="updated"></p>' +
			'<a class="download" href="' + '">Download as zip</a>' +
			'</div>' +
			'</div>'
		);

		// Get banner image
		// Disabled for now, couldn't find any nice place for it
		/*
		var bannerImageUrl = "http://s-plugins.wordpress.org/" + pluginSlug + "/assets/banner-772x250.png";
		var bannerImg = document.createElement("img");
		bannerImg.onload = (function() {
				return function() {
					//console.log(this);
					//console.log(bannerImageUrl);
					$widget.find(".wordpress-box-content").css({
						backgroundImage: "url(" + this.src + ")"
					});
				};
			})();
		bannerImg.src = bannerImageUrl;
		*/

		$widget.appendTo($container);

		// URL to get plugin info is a bit strange, so that's why we need to create our own JSONP function
		var json_func_name = "wp_plugin_widget_" + Math.random().toString(36).replace(/[^a-z+]+/g, "");
		window[ json_func_name ] = function(data) { parseJson(data, $widget); };
		var plugin_info_url = "http://api.wordpress.org/plugins/info/1.0/" + pluginSlug + ".jsonp=" + json_func_name + "&?";
		
		$.ajax({
			url: plugin_info_url,
			dataType: 'jsonp',
			jsonp: " "
		});

	});

});
