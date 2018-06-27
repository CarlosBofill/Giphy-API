$( document ).ready(function() {

	// my array
	var topic = ["Hitmonlee", "Rayquaza", "Muk", "Latios", "Squirtle", "Dragonair", "Mewtwo","Snorlax"];
	
	//function that displays the gif buttons
	
	function displayGifButtons() {
		$("#gifButtonsView").empty();
		for (var i = 0; i < topic.length; i++) {
			var gifButton = $("<button>");
			gifButton.addClass("pokemon");
			gifButton.addClass("btn btn-primary")
			gifButton.attr("data-name", topic[i]);
			gifButton.text(topic[i]);
			$("#gifButtonsView").append(gifButton);
		}
	}
	
	//function to add new button
	
	function addNewButton() {
		$("#addGif").on("click", function() {
			var pokemon = $("#topicInput").val().trim();
			if (pokemon == ""){
				return false;
			}
			topic.push(pokemon);
	
			displayGifButtons();
			return false;
			});
	}
	
	
	function removeLastButton() {
		$("removeGif").on("click", function() {
			topic.pop(pokemon);
			displayGifButtons();
			return false;
		});
	
	}
	
	
	
	function displayGifs() {
		var pokemon = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pokemon + "&api_key=dc6zaTOxFJmzC&limit=8";
		
		$.ajax({
			url: queryURL,
			method: 'GET'
		})
	
		.done(function(response) {
			$("#gifsView").empty();
			
			var results = response.data;
			if (results == ""){
				alert("There is not a giffy for this!");	
			}
			for (var i = 0; i<results.length; i++){
				
				var gifDiv = $("<div1>");
				
				var gifRating = $("<p>").text("Rating " + results[i].rating);
				gifDiv.append(gifRating);
	
				
				var gifImage = $("<img>");
				gifImage.attr("src", results[i].images.fixed_height_small_still.url);
				
				gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
				
				gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
				
				gifImage.attr("data-state", "still");
				gifImage.addClass("image");
				gifDiv.append(gifImage);
				
				$("#gifsView").prepend(gifDiv);
			}
		});
	}
	
	
	
	displayGifButtons();
	addNewButton();
	removeLastButton();
	
	
	
	//event listeners
	$(document).on("click", ".pokemon", displayGifs);
	$(document).on("click", ".image", function() {
		var state = $(this).attr('data-state');
		if (state == 'still') {
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		}else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
	
		});
	
	});
	