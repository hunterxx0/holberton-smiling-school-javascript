


function getCourses(q = "", topic = "all", sor = "most popular") {
	url = "https://smileschool-api.hbtn.info/courses?q=" + q + "&topic=" + topic + "&sort=" + sor;
	$.ajax({
		type: "GET",
		url: url,
		beforeSend: function () {
			$( "#searchresults-section" ).css('display', 'none');
			refreshing(true);
		},
		complete: function () {
			refreshing(false);
			$( "#searchresults-section" ).css('display', 'initial');
		},
		success: function (data) {
	        $( ".res-vids" ).empty();
	        $(".sorting").empty();
	        $(".topic").empty();
	        setTopSor(data.topics, data.sorts, data.courses.length);
	        let x = 0;
	        for ( let i in data.courses ) {
	        	data.courses[i]["x"] = x;
	            setResults(data.courses[i]);
	            x++;
	        }
	        $("#searchresults-section").css("background-color", "white !important");

		},
		fail: function () {
			console.log("failed");
		},
	});
}
function getQuotes() {
	$.ajax({
		type: "GET",
		url: "https://smileschool-api.hbtn.info/quotes",
		beforeSend: function () {
			$( "#testim-slide" ).css('display', 'none');
			refreshing(true);
		},
		complete: function () {
			refreshing(false);
			$( "#testim-slide" ).css('display', 'initial');
		},
		success: function (data) {
			let x = 0;
	        for ( let i in data ) {
	        	data[i]["x"] = x;
	            addQuotes(data[i]);
	            x++;
	        }
		}
	});
}
function getTutos() {
	$.ajax({
		type: "GET",
		url: "https://smileschool-api.hbtn.info/popular-tutorials",
		success: function (data) {
			let x = 0;
	        for ( let i in data ) {
	        	data[i]["x"] = x;
	        	data[i]["type"] = "tutos";        	
	            addVids(data[i]);
	            x++;
	        }
	        manCarous("tutos");
		}
	});
}
function getLatest() {
	$.ajax({
		type: "GET",
		url: "https://smileschool-api.hbtn.info/latest-videos",
		success: function (data) {
			let x = 0;
	        for ( let i in data ) {
	        	data[i]["x"] = x;
	        	data[i]["type"] = "latest";        	
	            addVids(data[i]);
	            x++;
	        }
	        manCarous("latest");
		}
	});
}
function refreshing(status) {
	if ( status ) {
		var ctr = document.createElement('div');
		ctr.setAttribute("class", "spinner d-flex justify-content-center m-50");
		var ref = document.createElement('div');
		ref.setAttribute("class", "spinner-border text-light");
		ref.setAttribute("style", "width: 5rem; height: 5rem;");
		ref.setAttribute("role", "status");
		var span = document.createElement('span');
		span.setAttribute("class", "sr-only");
		span.appendChild(document.createTextNode("Loading..."));
		ref.appendChild(span);
		ctr.appendChild(ref);
		$( "#testimonial-section" ).prepend(ctr);
	} else {
		$( ".spinner" ).remove();
	}
}

function setResults(courses) {
var authDiv = document.createElement('div');
	authDiv.setAttribute("class", "d-flex justify-content-start");
	var authImg = document.createElement('img');
	authImg.setAttribute("class", "circle-thumb-small rounded-circle");
	authImg.setAttribute("src", courses.author_pic_url);
	var pAuth = document.createElement('p');
	pAuth.setAttribute("class", "lavender m-3");
	pAuth.appendChild(document.createTextNode(courses.author));
	authDiv.appendChild(authImg);
	authDiv.appendChild(pAuth);
	var ratingDiv = document.createElement('div');
	ratingDiv.setAttribute("class", "d-flex justify-content-space-between");
	var starDiv = document.createElement('div');
	starDiv.setAttribute("class", "d-flex justify-content-space-between mr-auto");
	for (let i=0; i<courses.star;i++) {
		var starImg = document.createElement('img');
		starImg.setAttribute("class", "star m-1");
		starImg.setAttribute("src", "images/star_on.png");
		starDiv.appendChild(starImg);
	}
	for (let z=0; z< 5-courses.star;z++) {
		var starImg = document.createElement('img');
		starImg.setAttribute("class", "star m-1");
		starImg.setAttribute("src", "images/star_off.png");
		starDiv.appendChild(starImg);
	}
	var timeDiv = document.createElement('div');
	var pTime = document.createElement('p');
	pTime.setAttribute("class", "lavender text-right");
	pTime.appendChild(document.createTextNode(courses.duration));
	ratingDiv.appendChild(starDiv)
	ratingDiv.appendChild(timeDiv)
	var bodyDiv = document.createElement('div');
	bodyDiv.setAttribute("class", "d-card-body text-black");
	var h3 = document.createElement('h3');
	h3.setAttribute("class", "card-title font-weight-bold text-black");
	h3.appendChild(document.createTextNode(courses.title));
	var pSub = document.createElement('p');
	pSub.setAttribute("class", "card-text text-secondary");
	pSub.appendChild(document.createTextNode(courses["sub-title"]));
	bodyDiv.appendChild(h3);
	bodyDiv.appendChild(pSub);
	bodyDiv.appendChild(authDiv);
	bodyDiv.appendChild(ratingDiv);
	var vidImg = document.createElement('img');
	vidImg.setAttribute("class", "card-img-top");
	vidImg.setAttribute("src", courses.thumb_url);
	vidImg.setAttribute("alt", "Card image");
	var iElem = document.createElement('i');
	iElem.setAttribute("class", "fa fa-play");
	iElem.setAttribute("aria-hidden", "true");
	var span = document.createElement('span');
	span.setAttribute("class", "play-tuto play-button-icon");
	span.appendChild(iElem);
	var cardDiv = document.createElement('div');
	cardDiv.setAttribute("class", "card video-card text-left m-4");
	cardDiv.appendChild(vidImg);
	cardDiv.appendChild(span);
	cardDiv.appendChild(bodyDiv);
	var contDiv = document.createElement('div');
	contDiv.setAttribute("class", "col col-sm-0 col-md-4 col-lg-3");
	contDiv.appendChild(cardDiv);
	$( ".res-vids" ).append(contDiv);
}

function setTopSor(top, sor, courses) {
	for (x=0; x<top.length; x++) {
		var option = document.createElement('option');
		option.setAttribute("value", top[x]);		
		option.appendChild(document.createTextNode(top[x].charAt(0).toUpperCase() + top[x].slice(1)));
		$(".topic").append(option)
	}
	for (x=0; x<sor.length; x++) {
		var option = document.createElement('option');
		option.setAttribute("value", sor[x].replace(/_/g, ' '));
		str = sor[x].charAt(0).toUpperCase() + sor[x].slice(1);
		option.appendChild(document.createTextNode(str.replace(/_/g, ' ')));
		$(".sorting").append(option)
	}
	if ( courses == 1 ) {
		$(".results").text(courses + " result found");
	} else {
		$(".results").text(courses + " results found");
	}
}
function addQuotes(data) {
	var imgDiv = document.createElement('div');
	imgDiv.setAttribute("class", "col-auto");
	var img = document.createElement('img');
	img.setAttribute("class", "rounded-circle circle-thumb");
	img.setAttribute("src", data.pic_url);
	img.setAttribute("alt", "First slide");
	var pDiv = document.createElement('div');
	pDiv.setAttribute("class", "col-sm-8");
	var p1 = document.createElement('p');
	p1.setAttribute("class", "mt-4 ml-1 mr-1 w-75");
	p1.appendChild(document.createTextNode(data.text));
	var p2 = document.createElement('p');
	p2.setAttribute("class", "font-weight-bold");
	p2.appendChild(document.createTextNode(data.name));
	var p3 = document.createElement('p');
	p3.setAttribute("class", "font-italic");
	p3.appendChild(document.createTextNode(data.title));
	pDiv.appendChild(p1);
	pDiv.appendChild(p2);
	pDiv.appendChild(p3);
	imgDiv.appendChild(img);
	var imgDivPos = document.createElement('div');
	imgDivPos.setAttribute("class", "col-sm-1");
	var div3 = document.createElement('div');
	div3.setAttribute("class", "row justify-content-center align-items-center pb-5 pl-5 pr-0");
	div3.appendChild(imgDivPos);
	div3.appendChild(imgDiv);
	div3.appendChild(pDiv);
	var div2 = document.createElement('div');
	div2.setAttribute("class", "container-fluid");
	div2.appendChild(div3);
	var div1 = document.createElement('div');
	if ( data.x ) {
		div1.setAttribute("class", "carousel-item");
	} else {
		div1.setAttribute("class", "carousel-item active");
	}
	div1.appendChild(div2);
	$( ".testim-add" ).before(div1);
}
function addVids(vidData) {
	var authDiv = document.createElement('div');
	authDiv.setAttribute("class", "d-flex justify-content-start");
	var authImg = document.createElement('img');
	authImg.setAttribute("class", "circle-thumb-small rounded-circle");
	authImg.setAttribute("src", vidData.author_pic_url);
	var pAuth = document.createElement('p');
	pAuth.setAttribute("class", "lavender m-3");
	pAuth.appendChild(document.createTextNode(vidData.author));
	authDiv.appendChild(authImg);
	authDiv.appendChild(pAuth);
	var ratingDiv = document.createElement('div');
	ratingDiv.setAttribute("class", "d-flex justify-content-space-between");
	var starDiv = document.createElement('div');
	starDiv.setAttribute("class", "d-flex justify-content-space-between mr-auto");
	for (let i=0; i<vidData.star;i++) {
		var starImg = document.createElement('img');
		starImg.setAttribute("class", "star m-1");
		starImg.setAttribute("src", "images/star_on.png");
		starDiv.appendChild(starImg);
	}
	for (let z=0; z< 5-vidData.star;z++) {
		var starImg = document.createElement('img');
		starImg.setAttribute("class", "star m-1");
		starImg.setAttribute("src", "images/star_off.png");
		starDiv.appendChild(starImg);
	}
	var timeDiv = document.createElement('div');
	var pTime = document.createElement('p');
	pTime.setAttribute("class", "lavender text-right");
	pTime.appendChild(document.createTextNode(vidData.duration));
	ratingDiv.appendChild(starDiv)
	ratingDiv.appendChild(timeDiv)
	var bodyDiv = document.createElement('div');
	bodyDiv.setAttribute("class", "d-card-body text-black");
	var h3 = document.createElement('h3');
	h3.setAttribute("class", "card-title font-weight-bold text-black");
	h3.appendChild(document.createTextNode(vidData.title));
	var pSub = document.createElement('p');
	pSub.setAttribute("class", "card-text text-secondary");
	pSub.appendChild(document.createTextNode(vidData["sub-title"]));
	bodyDiv.appendChild(h3);
	bodyDiv.appendChild(pSub);
	bodyDiv.appendChild(authDiv);
	bodyDiv.appendChild(ratingDiv);
	var vidImg = document.createElement('img');
	vidImg.setAttribute("class", "card-img-top");
	vidImg.setAttribute("src", vidData.thumb_url);
	vidImg.setAttribute("alt", "Card image");
	var iElem = document.createElement('i');
	iElem.setAttribute("class", "fa fa-play");
	iElem.setAttribute("aria-hidden", "true");
	var span = document.createElement('span');
	span.setAttribute("class", "play-tuto play-button-icon");
	span.appendChild(iElem);
	var cardDiv = document.createElement('div');
	cardDiv.setAttribute("class", "video-card card text-left");
	cardDiv.appendChild(vidImg);
	cardDiv.appendChild(span);
	cardDiv.appendChild(bodyDiv);
	var contDiv = document.createElement('div');
	contDiv.setAttribute("class", "col-3 col-lg-3 col-sm-0 col-sm-6 m-1");
	contDiv.appendChild(cardDiv);
	var div1 = document.createElement('div');
	if ( vidData.x && vidData.type == "tutos") {
		div1.setAttribute("class", "car-item carousel-item");
	} else if ( vidData.x == 0 && vidData.type == "tutos") {
		div1.setAttribute("class", "car-item carousel-item active");
	} else if ( vidData.x && vidData.type == "latest") {
		div1.setAttribute("class", "latest-item carousel-item");		
	} else if ( vidData.x == 0 && vidData.type == "latest") {
		div1.setAttribute("class", "latest-item carousel-item active");		
	}
	div1.appendChild(contDiv);
	if ( vidData.type == "tutos" ) {
		$( ".vid-sec" ).append(div1);
	} else if ( vidData.type == "latest" ) {
		$( ".latest-vids" ).append(div1);
	}
}
function manCarous(type) { 
	if ( type == "latest") {
		$('.latest').carousel({
			interval: 10000
		});
	} else if ( type == "tutos") {
		$('.car').carousel({
			interval: 10000
		});
	}
	if ( type == "latest") {
		$('.latest').carousel({
			interval: 10000
		});
		var type = $('.latest-item');
	} else if ( type == "tutos") {
		$('.car').carousel({
			interval: 10000
		});
		var type = $('.car-item');
	}
	type.each(function(){
	    var minPerSlide = 4;
	    var next = $(this).next();
	    if (!next.length) {
	    next = $(this).siblings(':first');
	    }
	    next.children(':first-child').clone().appendTo($(this));
	    
	    for (var i=0;i<minPerSlide;i++) {
	        next=next.next();
	        if (!next.length) {
	        	next = $(this).siblings(':first');
	      	}
	        
	        next.children(':first-child').clone().appendTo($(this));
	      }
	});
}
getQuotes();
getTutos();
getLatest();
$(document).ready(function(){
	$("#searchValue").change( function() {
		getCourses($(this).val(), $(".topic").val(), $(".sorting").val());

	});
	$(".topic").on("change", function() {
		getCourses($("#searchValue").val(), $(this).val(), $(".sorting").val());
	});
	$(".sorting").on("change", function() {
		getCourses($("#searchValue").val(), $(".topic").val(), $(this).val());
	});

});
getCourses("", "all", "most_popular");

