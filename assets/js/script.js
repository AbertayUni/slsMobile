// if working locally or on the web, set isApp to 0
// if compiling for PhoneGap, set isApp to 1
var isApp = 0;
if(isApp) var pathPrefix = "http://sociallearningspace.abertay.ac.uk/mobile/";
else var pathPrefix = "";

function loadContact() {
	var str = "";
	
	$(".hiddendiv").find("contact").each(function() {
		str += "<div>";
		str += "<h3>" + $(this).children("name").html() + "</h3>";
		str += "<h4>" + $(this).children("position").html() + "</h4>";
		str += "<h4>" + $(this).children("school").html() + "</h4>";
		str += "<address>";
		$(this).find("address").each(function() {
			str += "<p>" + $(this).children("company").html() + "<br>";
			str += "" + $(this).children("building").html() + "<br>";
			str += "" + $(this).children("street").html() + "<br>";
			str += "" + $(this).children("city").html() + "<br>";
			str += "" + $(this).children("postcode").html() + "<br>";
			str += "" + $(this).children("country").html() + "</p>";
		});
		str += "<p>" + $(this).children("phone").html() + "</p>";
		str += "</address>";
		str += "</div>";
	});
		
	return str;
}

function loadVideo() {	
	var str = "";
		
	$(".hiddendiv").find("video").each(function() {					
		var channel = $(this).children("channel").html();
		var maxToShow = $(this).children("maxToShow").html();
				
		// js: changed dataType to 'jsonp' from 'xml' because it would fail in IE<10 due to cross-domain issues ("no transport")
		$.ajax({
			url: "https://gdata.youtube.com/feeds/api/users/"+channel+"/uploads?max-results="+maxToShow,
			dataType: 'jsonp',
			success: function(data) {				
				$(data).find("entry").each(function() {
					var videoUrl = $(this).children("link").attr("href");		

					// transform url to equivalent of 'http://www.youtube.com/embed/lgZBsWGaQY0'
					// to avoid cross-origin issues
					videoUrl = videoUrl.slice((videoUrl.indexOf('?v=')+3),videoUrl.indexOf('&'));										
					
					str += "<div class='video-container'>";
					str += "<iframe width='420' height='315' src='http://www.youtube.com/embed/"+videoUrl+"' frameborder='0' allowfullscreen></iframe>";			
					str += "</div>";
				});
				
				$("#videoContent").html(str).trigger("create");
			},
			error: function (xhr, status, error) {
				// alert("AJAX failure: "+error);
			}
		});
	});
	
	return str;
}

function loadLinks() {
	var str = "";
    
	$(".hiddendiv").find("hotlink").each(function() {
		str += "<div data-role='collapsible' data-theme='c' data-content-theme='a'>";
		str += "<h3>" + $(this).children("name").html() + "</h3>";
		str += "<div>";
		var i=0;
		str += "<img src='assets/img/linkImages/" + $(this).children("linkImage").html() + "'>";
		str += "<p>" + $(this).children("description").html() + "</p>";
		str += "<a href='" + $(this).children("weblink").html() + "' rel='external'>Link</a>";
		str += "</div></div>";
	});
		
	return str;
}

function loadHome(img, alt) {
	// populate home page content
	var str = "";		
	str += "<img src='assets/img/"+img+"' alt='"+alt+"' />";
			
	return str;
}

function loadTwitter() {
	var str = "";
          
	$(".hiddendiv").find("twitter").each(function() {	
		// read account name and section title from xml
		var account = $(this).children("account").html();
		var title = $(this).attr("title");
		var accountWidgetId = $(this).children("account").attr("widgetId");
				
		// read hashtag from XML
		var hasHash = 0;
		var hashtag = $(this).children("hashtag").html();
		var hashtagWidgetId = $(this).children("hashtag").attr("widgetId");
		
		if(hashtag) hasHash = 1;
												
		str += "<div id='twitterBar' data-role='navbar'>";
		
		if(hasHash) {
			// build navbar for tabs
			str += "<ul>";
			str += "<li><a href='#' class='ui-btn-active' data-tab-class='tab1'>"+title+"</a></li>";			
			str += "<li><a href='#' data-tab-class='tab2'>#"+hashtag+"</a></li>";
			str += "</ul>";
			str += "</div><!-- /navbar -->";
		}
				
		str += "<div class='tab1'>";
		str += "<a class='twitter-timeline' href='https://twitter.com/"+account+"' data-widget-id='"+accountWidgetId+"' data-tweet-limit='20'>"+title+"</a>";
		str += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');</script>";
		str += "</div><!-- end of tab1 -->";
	
		if(hasHash) {
			str += "<div class='tab2 ui-screen-hidden'>";		
			str += "<a class='twitter-timeline' href='https://twitter.com/search?q=%23"+hashtag+"' data-widget-id='"+hashtagWidgetId+"' data-tweet-limit='20'>Tweets about '#"+hashtag+"'</a>";
			str += "<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document,'script','twitter-wjs');</script>";
			str += "</div><!-- end of tab2 -->";				
		}
	});
		
	return str;
}

function loadProjects() {
	var str="";
  		
	$(".hiddendiv").find("project").each(function() {				
		str += "<div data-role='collapsible' data-theme='c' data-content-theme='a'>";
				
		str += "<h3>" + $(this).children("name").html() + "</h3>";
		str += "<div>";
		var i=0;
		str += "<img src='assets/img/projectImages/" + $(this).children("projectImage").html() + "'>";
		str += "<p>" + $(this).children("description").html() + "</p>";
		str += "<a href='" + $(this).children("links").html() + "' rel='external'>Link</a>";
		str += "</div></div>";
	});	
	
	return str;
}

function loadThankYou() {
	var str = "";
	
	$(".hiddendiv").find("thankyou").each(function() {		
		str += "<div>";
		str += "<h3 class='title-heading'>" + $(this).attr("title") + "</h3>";
		str += "" + $(this).children("pageBody").html() + "";
		str += "</div>";		
	});
		
	return str;
}

function loadError() {		
	var str = "";
	
	$(".hiddendiv").find("error").each(function() {
		str += "<div>";
		str += "<h3 class='title-heading'>" + $(this).attr("title") + "</h3>";
		str += "" + $(this).children("pageBody").html() + "";
		str += "</div>";
	});
	
	return str;
}

function loadAbout() {
	var str="";
    	
	$(".hiddendiv").find("about").each(function() {
		str += "<div>";
		str += "<h3 class='title-heading'>" + $(this).attr("title") + "</h3>";
		str += "" + $(this).children("pageBody").html() + "";
		str += "</div>";
	});	
	
	return str;
}

function doPageLoad(thisPage) {
	var str="";
	var useHash = "#";
	
	// load XML file containing the content for the relevant page only, using jQuery selector in the URL
	if(thisPage == "home") useHash = "";
	
	$(useHash+thisPage+" .hiddendiv").load(pathPrefix+"assets/xml/pages.xml", function() {	
		
		var str = "";
		var newContent = "";
		
		switch(thisPage) {
			case "home":
				// str = loadHome();				
				break;
			case "about":
				str = loadAbout();			
				break;
			case "contact":
				str = loadContact();
				break;
			case "video":
				str = loadVideo();
				break;
			case "hotlinks":
				str = loadLinks();				
				break;
			case "projects":
				str = loadProjects();				
				break;
			case "twitter":
				str = loadTwitter();
				break;
			case "thankyou":
				str = loadThankYou();
				break;
			case "error":
				str = loadError();								
				break;
			default:
				// str = loadHome();				
				break;
		}
				
		$("#"+thisPage+"Content").html(str).trigger("create");
				
		if(thisPage == "contact") {		
			// Email Validation
			$("#contactForm").validate({
				submitHandler: function(form) {
					// form.submit();
					// js: changed form submission to an AJAX post request
					// this is to enable packaging via PhoneGap - the PHP file that processes the
					// contact mail must reside on the server
					$.ajax({
						url: pathPrefix+"form.php",
						type: 'POST',
						data: $("#contactForm").serialize(),
						async: false,
						success: function(data) {
							if(data == 1) {
								window.location.href = "#thankyou";							 
							}						
							else {
								window.location.href = "#error";															
							}
						},
						error: function() {
							// error not related to mail function in form.php
						}
					});  
					
					/*
					$.post(pathPrefix+"form.php", $("#contactForm").serialize()).done(function (data) {						
						if(data == 1) {
							//window.location.href = "#thankyou";
							 $(location).attr('href','#thankyou');
						}						
						else {
							//window.location.href = "#error";							
							$(location).attr('href','#error');
						}
					});
					*/
				}
			});
			// End Email Validation
		}
		else if(thisPage == "twitter") {		 
			// tab ui based on example at http://stackoverflow.com/a/9415262
			var prevSelection = "tab1";
			$("#twitterBar ul li").on("click",function(){
				var newSelection = $(this).children("a").attr("data-tab-class");
				$("."+prevSelection).addClass("ui-screen-hidden");
				$("."+newSelection).removeClass("ui-screen-hidden");
				prevSelection = newSelection;
			});    
		}
	});
}

function addFooter() {
	var newCode = "	<footer data-role='footer' data-position='fixed'>";
	// newCode += "		<div data-role='navbar'>";
	// newCode += "			<ul>";
	// newCode += "				<li><a data-icon='back' data-rel='back'>Back</a></li>";
	// newCode += "				<li><a href='#home' data-icon='bars'>Menu</a></li>";
	// newCode += "			</ul>";
	// newCode += "		</div><!-- /navbar -->";
	newCode += "		<small>&copy; University of Abertay Dundee</small>";
	newCode += "	</footer> <!-- /footer -->";
	
	return newCode;
}

function buildAbout(pageTitle) {
	var newCode = "<article id='about' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='aboutContent' data-role='content'>";
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";

	newCode += addFooter();
	
	newCode += "</article> <!-- End of About page -->";
	
	return newCode;
}

function buildProjects(pageTitle) {
	var newCode = "<article id='projects' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='projectsContent' data-role='content'>";
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";

	newCode += addFooter();	
	
	newCode += "</article> <!-- End of Projects page -->";
	
	return newCode;
}

function buildVideo(pageTitle) {
	var newCode = "<article id='video' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='videoContent' data-role='content'>";
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";

	newCode += addFooter();
	
	newCode += "</article> <!-- End of Video page -->";
	return newCode;
}

function buildTwitter(pageTitle) {
	var newCode = "";
	
	newCode += "<article id='twitter' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='twitterContent' data-role='content'>";			
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";
		
	newCode += addFooter();
	
	newCode += "</article> <!-- End of Twitter page -->";
	
	return newCode;
}

function buildLinks(pageTitle) {
	var newCode = "<article id='hotlinks' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='hotlinksContent' data-role='content'>";
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";
	
	newCode += addFooter();
		
	newCode += "</article> <!-- End of Links page -->";
	
	return newCode;
}

function buildContact(pageTitle) {
	var newCode = "";
	
	newCode += "<article id='contact' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='contactContent' data-role='content'>";
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";
	newCode += "	<section id='formContent' data-role='content'>";
	newCode += "		<form action='form.php' name='contactForm' id='contactForm' method='post'>";
	newCode += "			<label for='contactName'>Your Name:</label>";
	newCode += "			<input type='text' name='cf_name' id='contactName' data-mini='true' minlength='2' required />";
	newCode += "			<label for='contactEmail'>Your Email:</label>";
	newCode += "			<input type='email' name='cf_email' id='contactEmail' data-mini='true' required />";
	newCode += "			<label for='select-choice-1' class='select'>Reason for contact</label>";
	newCode += "			<select name='cf_select' id='contactSelect'>";
	newCode += "				<option value='general'>General Purpose</option>";
	newCode += "				<option value='info'>Information</option>";
	newCode += "				<option value='book a visit'>Book a Visit</option>";
	newCode += "				<option value='feedback'>Feedback</option>";
	newCode += "			</select>";
	newCode += "			<label for='contactMessage'>Message:</label>";
	newCode += "			<textarea name='cf_message' id='contactMessage' data-mini='false' minlength='2' required></textarea>";
	newCode += "			<input id='contactSubmit' type='submit' value='Submit'>";
	newCode += "		</form>";
	newCode += "	</section><!-- /content -->";

	newCode += addFooter();
		
	newCode += "</article> <!-- End of Contact page -->";
	
	return newCode;
}

function buildError(pageTitle) {
	var newCode = "";
	newCode += "<article id='error' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='errorContent' data-role='content'>";	
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";

	newCode += addFooter();
	
	newCode += "</article> <!-- End of Error page -->";
	return newCode;
}

function buildThanks(pageTitle) {
	var newCode = "";
	
	newCode += "<article id='thankyou' data-role='page'>";
	newCode += "	<header data-role='header' data-position='fixed'>";
	newCode += "		<a data-icon='back' data-rel='back'>Back</a>";
	newCode += "		<h1>"+pageTitle+"</h1> <!-- /header -->";
	newCode += "		<a href='#home' data-icon='bars'>Menu</a>";
	newCode += "	</header>";

	newCode += "	<section id='thankyouContent' data-role='content'>";	
	newCode += "		<div class='hiddendiv' hidden='true'></div>";
	newCode += "	</section><!-- /content -->";

	newCode += addFooter();
	
	newCode += "</article> <!-- End of Thank you page -->";
	
	return newCode;
}

function buildMain() {	
	// create the site navigation from the XML file
	var navCode = "<nav id='main-nav'><ul>";
	var mainCode = "";
	
	$.ajax({
		url: pathPrefix+"assets/xml/pages.xml",
		dataType: 'xml',
		success: function(data) {
		
			var counter = 0;
			var blockType = "ui-block-a";
			
			// set home page title as specified in XML
			var homeTitle = $(data).find("page home").attr("title");
			$("#home h1").html(homeTitle);		
			
			var homeImg = $(data).find("page home homeImage").text();						
			var homeAlt = $(data).find("page home homeImageAlt").text();			
			
			var homeContent = loadHome(homeImg, homeAlt);								
						
			// loop through all pages except 'home'
			$(data).find("page").each(function() {								
				// get the page's tag name
				var page = $(this).children()[0];
				var pageType = page.nodeName;
				
				// get the title attribute
				var pageTitle = $(page).attr("title");		
							
				switch(pageType) {
					case "about":
					navCode += "<li><a data-role='button' href='#about'><span class='fa fa-bullhorn'></span>About</a></li>";
					mainCode += buildAbout(pageTitle);
					break;
					case "projects":
					mainCode += buildProjects(pageTitle);
					navCode += "<li><a data-role='button' href='#projects'><span class='fa fa-code'></span>Projects</a></li>";					
					break;
					case "video":
					navCode += "<li><a data-role='button' href='#video'><span class='fa fa-film'></span>Video</a></li>";					
					mainCode += buildVideo(pageTitle);
					break;
					case "twitter":
					navCode += "<li><a data-role='button' href='#twitter'><span class='fa fa-twitter'></span>Twitter</a></li>";					
					mainCode += buildTwitter(pageTitle);
					break;
					case "hotlinks":
					navCode += "<li><a data-role='button' href='#hotlinks'><span class='fa fa-external-link'></span>Links</a></li>";					
					mainCode += buildLinks(pageTitle);
					break;
					case "contact":
					navCode += "<li><a data-role='button' href='#contact'><span class='fa fa-envelope-o'></span>Contact</a></li>";					
					mainCode += buildContact(pageTitle);
					break;
					case "thankyou":
					// not added to nav
					mainCode += buildThanks(pageTitle);					
					break;					
					case "error":
					// not added to nav
					mainCode += buildError(pageTitle);					
					break;
				}
			});
			
			navCode += "</ul></nav><!-- /grid-a -->";	
						
			// populate page content
			if(mainCode) {								
				$("body").append(mainCode).trigger("create");				
			}
			
			// populate the navigation section, 'trigger' to initialise the jquery mobile styles on buttons etc					
			$("#homeContent").html(navCode).trigger("create");
												
			// populate home page content
			$("#homeContent").prepend(homeContent);
						
			if(window.location.hash) {
				// if # is present, make the relevant value the active page
				var thisPage = window.location.href.slice(window.location.href.indexOf('#')+1);								
				$.mobile.changePage("#"+thisPage);
			}	
		}
	});
}

$(document).on("pageinit", "#about", function(event) {
	doPageLoad("about");	
});

$(document).on("pageinit", "#contact", function(event) {
	doPageLoad("contact");	
});

$(document).on("pageinit", "#video", function(event) {
	doPageLoad("video");	
});

$(document).on("pageinit", "#twitter", function(event) {
	doPageLoad("twitter");	
});

$(document).on("pageinit", "#hotlinks", function(event) {
	doPageLoad("hotlinks");	
});

$(document).on("pageinit", "#projects", function(event) {
	doPageLoad("projects");	
});

$(document).on("pageinit", "#thankyou", function(event) {
	doPageLoad("thankyou");
});

$(document).on("pageinit", "#error", function(event) {
	doPageLoad("error");
});

$(document).ready(function() {
	// override transitions when building Android app
	if(isApp) {
		$.mobile.defaultPageTransition = "none";
	}  
	// populate the index page nav and contents using data read from the XML file
	buildMain();	
});