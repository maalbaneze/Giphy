$(document).ready(function () {
    //topic array, initial
    var topics = ["Planes", "Jets", "Tanks", "Cannons", "Howitzers", "Shells", "Caissons", "Submarines", "Aircraft Carriers"];

    //function to display gif buttons
    function displayGifButtons() {
        // empty div to prevent duplication
        $("#gifButtonsView").empty();
        //loop for displaying gif buttons
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    //call the displayGifButtons function
    displayGifButtons();

    //function to add a button
    function createButton() {
        $("#add-gif").on("click", function () {
            var action = $("#action-input").val().trim();
            if (action === "") {
                return false; // added so user cannot add a blank button
            }
            actions.push(action);

            displayGifButtons();
            return false;
        });
    };
    //function to remove buttons created
    function removeButton() {
        $("removeGif").on("click", function () {
            actions.pop(action);
            displayGifButtons();
            return false;
        });
    }
    //call the create and remove buttons functions
    createButton();
    removeButton();
});
//function to display a selected gif when its button is clicked
function displayGifs() {
    var action = $(this).attr("data-name");
    $("button").on("click", function () {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=MEdG71YFb6IWDK7ErNXtB4XnCCM7gMAT&&limit=10";
        console.log(queryURL); // displays the constructed url
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response); // console test to make sure something returns
                //$("#gifsView").empty();
                var results = response.data; //shows results of gifs

                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        var gifDiv = $("<div>"); //div for the gifs to go inside
                        gifDiv.addClass("gifDiv");
                        // pulling rating of gif
                        var gifRating = results[i].rating;
                        var p = $("p").text("Rating: " + gifRating);
                        gifDiv.append(gifRating);
                        gifDiv.append(p);
                        // pulling gif
                        var gifImage = $("<img>");
                        gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
                        gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); // still image
                        gifImage.attr("data-animate", results[i].images.fixed_height_small.url); // animated image
                        gifImage.attr("data-state", "still"); // set the image state
                        gifImage.addClass("image");
                        gifDiv.append(gifImage);
                        // pulling still image of gif
                        // adding div of gifs to gifsView div
                    }
                }
            });

        $(document).on("click", ".gifs", function () {
            console.log();
            var state = $(this).attr('data-state');
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });
    })
}
