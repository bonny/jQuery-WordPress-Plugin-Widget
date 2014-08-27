# WordPress jQuery Plugin Widget

Drop this script on your page and it will build you a beautiful widget
that displays the status of your WordPress plugin.

## What does it look like?

Something like this:

[![Widget Image](https://raw.github.com/bonny/jQuery-WordPress-Plugin-Widget/master/screenshot.png)][1]

## How about a real demo

Sure! Here you go:

[WordPress Plugin Widget Demo](http://bonny.github.io/jQuery-WordPress-Plugin-Widget/)

## How do I use it?

Everwhere you want a widget to be placed, add the following markup:

	<div class="wordpress-widget" data-slug="slug-of-your-plugin"></div>

Then include the javascript file somewhere after you've include jQuery:

	<script src="jquery.WordPressPluginWidget.js"></script>

### Options

* `data-slug`  
required - the slug of your plugin

* `data-banner-format`  
optional, the image format of your banner image. Default is PNG, set this to JPG if your banner image is in JPEG and not PNG.

* `data-banner`  
optional, set to `data-banner="none"` if your plugin does not have a banner image


## Version history

### 1.1.1

- Banner image is now clickable
- Banner image now supports PNG (default is JPG)

### 1.1 

- Added plugin banner header images
- Data attribute for when not using headers, then a fallback image is used
- Added a nice pushed down active state for the download button
- Demo page: distribute widgets horizontally
- Demo page: responsive styles
- Demo page: official WordPress blue hex color for links

### 1.0

- It works!

## Credits

This plugin is based on [GitHub jQuery Repo Widget](https://github.com/JoelSutherland/GitHub-jQuery-Repo-Widget). I've only changed it to fetch data from WordPress.org instead of GitHub, and then I also changed it to look to be bit more WordPress-ish.

The original license in included in this folder, and it's also available here: [license](https://github.com/bonny/jQuery-WordPress-Plugin-Widget/blob/master/LICENSE-GitHub-jQuery-Repo-Widget).

  [1]: http://bonny.github.io/jQuery-WordPress-Plugin-Widget/
