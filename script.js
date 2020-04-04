// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

$(document).ready(function() {
    // Displays the current date  and time at the top of the page in the jumbotron.
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY,   h:mm:ss a"));

    // listens for save button clicks.
    $(".saveBtn").on("click", function() {
      // Get nearby values
      var value = $(this).siblings(".description").val();
      var time = $(this).parent().attr("id");
  
      // Save the values/input into localStorage.
      localStorage.setItem(time, value);
    });

    function backgroundColorByTime() {
        // Get current number of hours on the page.
        var currentHour = moment().hours();
    
        // loop over the given time blocks.
        $(".time-block").each(function() {
          var blockHour = parseInt($(this).attr("id").split("-")[1]);
    
          // check if we've moved past this time
          if (blockHour < currentHour) { 
            $(this).addClass("past"); // <------------past will invoke the grey background via the tie-in with CSS.
          } 
          else if (blockHour === currentHour) {
            $(this).removeClass("past");
            $(this).addClass("present"); // <----------the current hour time block will invoke the (.addClass) red background via the CSS tie-in.
          } 
          else {
            $(this).removeClass("past");
            $(this).removeClass("present");
            $(this).addClass("future"); // <------ else, addClass to future, which is green via the CSS tie-in.
          }
        });
      }

      backgroundColorByTime(); // <------Invokes the background color function

        // set up interval to check if current time needs to be updated
    var interval = setInterval(backgroundColorByTime, 15000); // <------ This had me stumped but working.

    // load any saved data from localStorage
    $("#hour-9 .description").val(localStorage.getItem("hour-9"));
    $("#hour-10 .description").val(localStorage.getItem("hour-10"));
    $("#hour-11 .description").val(localStorage.getItem("hour-11"));
    $("#hour-12 .description").val(localStorage.getItem("hour-12"));
    $("#hour-13 .description").val(localStorage.getItem("hour-13"));
    $("#hour-14 .description").val(localStorage.getItem("hour-14"));
    $("#hour-15 .description").val(localStorage.getItem("hour-15"));
    $("#hour-16 .description").val(localStorage.getItem("hour-16"));
    $("#hour-17 .description").val(localStorage.getItem("hour-17"));
}); 