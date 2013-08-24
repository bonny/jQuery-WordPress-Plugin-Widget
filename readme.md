# WordPress jQuery Plugin Widget

Drop this script on your page and it will build you a beautiful widget
that displays the status of your WordPress plugin.

## What does it look like?

Something like this:

![Widget Image](https://raw.github.com/bonny/jQuery-WordPress-Plugin-Widget/master/screenshot.png)

## How do I use it?

Everwhere you want a widget to be placed, add the following markup:

	<div class="wordpress-widget" data-slug="slug-of-your-plugin"></div>

Then include the javascript file somewhere after you've include jQuery:

	<script src="jquery.WordPressPluginWidget.js"></script>

That's it!

## Version history

1.0 It works!

## Credits

This plugin is based on [GitHub jQuery Repo Widget](https://github.com/JoelSutherland/GitHub-jQuery-Repo-Widget). I've only changed it to fetch data from WordPress.org instead of GitHub, and then I also changed it to look to be bit more WordPress-ish.

The original licence in included in this folder, and it's also available here: [license](https://github.com/bonny/jQuery-WordPress-Plugin-Widget/blob/master/LICENSE-GitHub-jQuery-Repo-Widget).
