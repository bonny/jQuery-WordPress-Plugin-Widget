jQuery(document).ready(function($){

	var distance_of_time_in_words = function(to, from) {

		var distance_in_seconds = ((to - from) / 1000),
			distance_in_minutes = Math.floor( distance_in_seconds / 60 );

		if (distance_in_minutes === 0) return 'less than a minute ago';
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

	// http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
	var formatNumber = function(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var addStats = function(data, status, $widget) {

		var downloads = {
				sparkLineDataWeek: [],
				sparkLineDataMonth: [],
				sparkLineDataYear: []
			},
			loopnum = 0,
			loopcount = 0,
			dataAsArr = [],
			maxPerDay = 0;

		$.each(data, function(date, count) {
			dataAsArr.push({ date: date, count: count });
			maxPerDay = Math.max(maxPerDay, count);
		});

		// Loop backwards to get dates in order
		var length = dataAsArr.length;

		while (length--) {

			loopcount = loopcount + parseInt(dataAsArr[length].count, 10);

			if (loopnum === 0)
				downloads.oneDay = loopcount;

			if (loopnum === 6)
				downloads.week = loopcount;

			if (loopnum === 29)
				downloads.month = loopcount;

			if (loopnum === 363)
				downloads.year = loopcount;

			// Sparkline is 0-100. maxPerDay = 100
			if (loopnum <= 363)
				downloads.sparkLineDataYear.push( Math.round( ( dataAsArr[length].count / maxPerDay ) * 100 ));

			if (loopnum < 30)
				downloads.sparkLineDataMonth.push( Math.round( ( dataAsArr[length].count / maxPerDay ) * 100 ));

			if (loopnum < 7)
				downloads.sparkLineDataWeek.push( Math.round( ( dataAsArr[length].count / maxPerDay ) * 100 ));

			loopnum++;

		}

		var output = "";

		// Average downloads per day
		output += "Average " + formatNumber(Math.round(loopcount / loopnum)) + " downloads per day";

		/*
		output += "Downloads ";

		if (downloads.oneDay)
			output += " yesterday " + formatNumber(downloads.oneDay) + ", ";

		if (downloads.week) {
			output += " 7d " + formatNumber(downloads.week) + ", ";
			output += "<img src='" + "https://chart.googleapis.com/chart?chs=50x20&cht=ls&chco=0077CC&chd=t:" + downloads.sparkLineDataWeek.join(",") + "'>";
		}

		if (downloads.month) {
			output += " 30d " + formatNumber(downloads.month) + ", ";
			output += "<img src='" + "https://chart.googleapis.com/chart?chs=50x20&cht=ls&chco=0077CC&chd=t:" + downloads.sparkLineDataMonth.join(",") + "'>";
		}

		if (downloads.year) {
			output += " 1y " + formatNumber(downloads.year) + ", ";
			output += "<img src='" + "https://chart.googleapis.com/chart?chs=50x20&cht=ls&chco=0077CC&chd=t:" + downloads.sparkLineDataYear.join(",") + "'>";
		}
		*/

		$widget.find(".wordpress-box-download .downloads").html( output );
	};

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
		$widget.find('.ownerRepoSpace').text( " by " );

		// Plugin name
		$widget.find('.repo').text( results.name );

		// Ratings
		var rating = ((results.rating / 100) * 5),
			stars_width = (results.rating / 100) * 92,
			ratingText = rating.toFixed(1) + " stars";
		$widget.find('.wordpress-stars').text(ratingText).css("width", stars_width);
		$widget.find('.wordpress-stars-wrap').attr("title", ratingText);
		$widget.find('.wordpress-rating').html( "From " + results.num_ratings + ( ( results.num_ratings === 1) ? " user." : " users.")  );

		// Description
		$widget.find('.description span').html(results.short_description);

		// Homepage link
		// First check if homepage link is same as wordpress link
		// and if it is then don't output homepage link
		var pluginUrl = "http://wordpress.org/plugins/" + results.slug + "/";
		var pluginUrlAlternative = "http://wordpress.org/extend/plugins/" + results.slug + "/";
		if ( results.homepage === pluginUrl || results.homepage === pluginUrlAlternative ) {
			$widget.find('.link').hide();
			$widget.find('.wordpress-link-divider-first').hide();
		} else {
			$widget.find('.link').attr('href', results.homepage);
		}

		// Download link
		$widget.find('.download').attr( "href", results.download_link );

		// Set widget as loaded
		$widget.addClass("is-loaded");

	};


	$('.wordpress-widget').each(function(){

		if (i === 0) $('head').append(
			'<style type="text/css">'
			+ '.wordpress-box{font-family:helvetica,arial,sans-serif;font-size:13px;line-height:18px;background:#fafafa;border:1px solid #ddd;color:#666;border-radius:3px}'
			+ '.wordpress-box a{color:#4183c4;border:0;text-decoration:none}'
			+ '.wordpress-box .wordpress-banner-image { height: 150px; background-size: cover; background-repeat: no-repeat; } '
			+ '.wordpress-box .wordpress-box-title{position:relative;border-bottom:1px solid #ddd;border-radius:3px 3px 0 0;background:#fcfcfc;background:-moz-linear-gradient(#fcfcfc,#ebebeb);background:-webkit-linear-gradient(#fcfcfc,#ebebeb);background: #222;color:#ddd;}'
			+ '.wordpress-box-title a, a.wordpress-stars-link { color: #ddd;}'
			+ '.wordpress-box-title a:hover, a.wordpress-stars-link:hover { color: #2faadd; }'
			+ '.wordpress-box .wordpress-box-title h3{font-family:helvetica,arial,sans-serif;font-weight:normal;font-size:16px;color:gray;margin:0 115px 0 0;padding:10px;}'
			+ '.wordpress-box .wordpress-box-title h3 .repo{font-weight:bold}'
			+ '.wordpress-box .wordpress-box-title .wordpress-stats{position:absolute;top:4px;right:10px;xbackground:white;xborder:1px solid #ddd;border-radius:3px;font-size:11px;xfont-weight:bold;line-height:18px;height:18px;padding:0 .5em}'
			+ '.wordpress-box .wordpress-box-title .wordpress-stats a{display:inline-block;height:21px;padding:0 5px 0 18px;}'
			+ '.wordpress-box .wordpress-box-content{padding:10px;font-weight:300;min-height:4.1em;}'
			+ '.wordpress-box .wordpress-box-content p{margin:0}'
			+ '.wordpress-box .wordpress-box-content .links {margin:.5em 0 0 0}'
			+ '.wordpress-box .wordpress-link-divider {color:#aaa; margin: 0 .25em; }'
			+ '.xwordpress-box .wordpress-box-content .link{font-weight:bold}'
			+ '.wordpress-box .wordpress-box-download{position:relative;border-top:1px solid #ddd;background:white;border-radius:0 0 3px 3px;padding:10px;min-height:24px}'
			+ '.wordpress-box .wordpress-box-download .updated, .wordpress-box .wordpress-box-download .downloads{margin:0;font-size:11px;color:#666;line-height:18px;font-weight:300}'
			+ '.wordpress-box .wordpress-box-download .updated strong{font-weight:bold;color:#000}'
			+ '.wordpress-box .wordpress-box-download .download{position:absolute;display:block;top:14px;right:10px;height:24px;line-height:24px;font-size:12px;color:#666;font-weight:bold;text-shadow:0 1px 0 rgba(255,255,255,0.9);padding:0 10px;border:1px solid #ddd;border-bottom-color:#bbb;border-radius:3px;background:#f5f5f5;background:-moz-linear-gradient(#f5f5f5,#e5e5e5);background:-webkit-linear-gradient(#f5f5f5,#e5e5e5);}'
			+ '.wordpress-box .wordpress-box-download .download:hover{color:#527894;border-color:#cfe3ed;border-bottom-color:#9fc7db;background:#f1f7fa;background:-moz-linear-gradient(#f1f7fa,#dbeaf1);background:-webkit-linear-gradient(#f1f7fa,#dbeaf1);}'
			+ '.wordpress-box .wordpress-box-download .download:active { border: 1px solid #AAA; border-bottom-color: #CCC; border-top-color: #999; -webkit-box-shadow: inset 0 1px 2px #aaa; -moz-box-shadow:inset 0 1px 2px #aaa; box-shadow: inset 0 1px 2px #aaa;background: -webkit-linear-gradient(top, #E6E6E6, gainsboro); background:-moz-linear-gradient(top, #E6E6E6, gainsboro); background: -ms-linear-gradient(top, #E6E6E6, gainsboro); background: -o-linear-gradient(top, #E6E6E6, gainsboro); }'
			+ '.wordpress-stars-wrap, .wordpress-stars {background:url(http://wordpress.org/extend/plugins-plugins/bb-ratings/stars.png) bottom left;line-height:17px;}'
			+ '.wordpress-stars-wrap {width:92px;height:17px;position:relative;overflow:hidden;}'
			+ '.wordpress-stars {background-position:top left;width:0;height:17px;float:left;text-indent:100%;}'
			+ '.wordpress-stats, .wordpress-box-download, .wordpress-box-content { opacity:0; transition: all .25s ease-in-out; -webkit-transition: all .25s ease-in-out;}'
			+ '.wordpress-box.is-loaded .wordpress-stats, .wordpress-box.is-loaded .wordpress-box-download, .wordpress-box.is-loaded .wordpress-box-content { opacity:1; }'
			+ '</style>'
		);
		i++;

		var $container = $(this), $widget,
			pluginSlug = $container.data('slug'),
			pluginUrl = "http://wordpress.org/plugins/" + pluginSlug + "/",
			supportUrl = "http://wordpress.org/support/plugin/" + pluginSlug + "/",
			pluginBanner = $container.data('banner'),
			authorUrl = "";

		$widget = $(
			'<div class="wordpress-box">' +
			'<div class="wordpress-banner-image"></div>' +
			'<div class="wordpress-box-title">' +
			'<h3>' +
			'<a class="repo" href="' + pluginUrl + '">' + '&nbsp;</a>' +
			'<span class="ownerRepoSpace"></span>' +
			'<a class="owner" href=""></a>' +
			'</h3>' +
			'<div class="wordpress-stats">' +
			'<a class="wordpress-stars-link" href="http://wordpress.org/support/view/plugin-reviews/' + pluginSlug + '">' +
			'<div class="wordpress-stars-wrap"><div class="wordpress-stars"></div></div>' +
			'<div class="wordpress-rating"></div>' +
			'</a>' +
			'</div>' +
			'</div>' +
			'<div class="wordpress-box-content">' +
			'<p class="description"><span></span>' +
			// ' &mdash; <a href="' + pluginUrl + '">Read More</a></p>' +

			'<p class="links">' +
			' <a class="link" href="#">Homepage</a>' +
			' <span class="wordpress-link-divider wordpress-link-divider-first">|</span> <a href="' + pluginUrl + '">Info at WordPress.org</a>' +
			' <span class="wordpress-link-divider wordpress-link-divider-second">|</span> <a class="support" href="http://wordpress.org/support/plugin/' + pluginSlug + '">Support forum</a>' +
			'</p>' +

			// '<p class="link"></p>' +
			'</div>' +
			'<div class="wordpress-box-download">' +
			'<p class="updated"></p>' +
			'<p class="downloads"></p>' +
			'<a class="download" href="' + '">Download zip</a>' +
			'</div>' +
			'</div>'
		);

		// Get banner image
		if(pluginBanner !== 'none') {
			var bannerImageUrl = "http://s-plugins.wordpress.org/" + pluginSlug + "/assets/banner-772x250.png";
			var bannerImg = document.createElement("img");
			bannerImg.onload = (function() {
					return function() {
						$widget.find(".wordpress-banner-image").css("background-image",  "url(" + this.src + ")" );
					};
				})();

			bannerImg.src = bannerImageUrl;

		} else {
			$widget.find(".wordpress-banner-image").css("background-image",  "url(https://dl.dropboxusercontent.com/u/1162759/fallback-banner-image.png)" );
		}

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

		// Get download stats
		var statsURL = "http://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=" + pluginSlug + "&limit=365&callback=?";
		$.ajax({
			url: statsURL,
			dataType: 'jsonp',
			success: function(data, status) {
				addStats(data, status, $widget);
			}
		});

	});

});
