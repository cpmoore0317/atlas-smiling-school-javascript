$(document).ready(function () {
  // Function to append a new quote element
  function appendQuoteElement(picUrl, name, title, text, index) {
    // Appending the HTML structure for the quote element to the carousel-inner div
    $(".section-quote .carousel-inner").append(`
          <div class="carousel-item ${index == 0 ? "active" : ""}">
              <div class="row justify-content-between">
                  <div class="col-sm-4 text-center text-md-right my-auto pr-md-5">
                      <img src="${picUrl}" alt="slide" class="rounded-circle" height="160px" weight="160px">
                  </div>
                  <div class="col-sm-8 py-2">
                      <p class="mt-5 mt-sm-0 pl-md-2">${text}</p>
                      <p class="font-weight-bold mb-n1 mt-5">${name}</p>
                      <p><em>${title}</em></p> 
                  </div>
              </div>  
          </div>
      `);
  }

  // Function to append a new card element
  function appendCardElement(
    author,
    picUrl,
    thumbUrl,
    stars,
    title,
    subTitle,
    duration,
    index,
    selector
  ) {
    // Appending the HTML structure for the card element to the specified selector
    $(selector).append(`
          <div class="carousel-item ${
            index == 0 ? "active" : ""
          } col-12 col-sm-6 col-md-4 col-lg-3">
              <div class="card border-0" style="max-width: 25.5rem;">
                  <div class="position-relative image-group">
                      <img src="./images/play.png" alt="play" width="64px" class="play position-absolute">
                      <img src="${thumbUrl}" alt="card-1" class="card-img-top img-fluid" height="154px">
                  </div>
                  <div class="card-body">
                      <h5 class="card-title font-weight-bold">${title}</h5>
                      <p class="card-text text-muted">${subTitle}</p>
                      <div class="row justify-content-start align-items-center p-4">
                          <img src="${picUrl}" alt="${author}" width="30px" class="rounded-circle mr-4">
                          <p class="m-0 font-weight-bold">${author}</p>
                      </div>
                      <div class="row justify-content-between px-4">
                          <div class="d-inline-block">
                              ${generateStarRating(stars)}
                          </div>
                          <p class="font-weight-bold">${duration}</p>
                      </div>
                  </div>
              </div>      
          </div>
      `);
  }

  // Function to append a new course element
  function appendCourseElement(
    thumbUrl,
    title,
    subTitle,
    picUrl,
    author,
    stars,
    duration
  ) {
    // Appending the HTML structure for the course element to the matchingCourses div
    $("#matchingCourses").append(`
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-4">
                <div class="card border-0">
                    <div class="position-relative image-group">
                        <img src="./images/play.png" alt="play" width="64px" class="play position-absolute">
                        <img src="${thumbUrl}" alt="card" class="card-img-top img-fluid" height="154px">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title font-weight-bold">${title}</h5>
                        <p class="card-text text-muted">${subTitle}</p>
                        <div class="row justify-content-start align-items-center p-4">
                            <img src="${picUrl}" alt="${author}" width="30px" class="rounded-circle mr-4">
                            <p class="m-0 font-weight-bold">${author}</p>
                        </div>
                        <div class="row justify-content-between px-4">
                            <div class="d-inline-block">
                                ${generateStarRating(stars)}
                            </div>
                            <p class="font-weight-bold">${duration}</p>
                        </div>
                    </div>
                </div>   
            </div>
        `);
  }

  // Function to generate the star rating
  function generateStarRating(stars) {
    // Initialize an empty string to store the HTML for stars
    let starHtml = "";
    // Ensure stars do not exceed 5
    stars = Math.min(stars, 5);
    // Loop to generate filled stars
    for (let i = 0; i < stars; i++) {
      //Adding HTML for a filled star
      starHtml += `<img src="./images/star_on.png" alt="star on" width="15px">\n`;
    }
    // Loop to generate empty stars (if any)
    for (let i = 0; i < 5 - stars; i++) {
      // Adding HTML for an empty star
      starHtml += `<img src="./images/star_off.png" alt="star off" width="15px">\n`;
    }
    // Return the generated HTML for star rating
    return starHtml;
  }

  // Function to display the quotes
  function displayQuotes() {
    // Show loader while fetching quotes
    toggleLoader(true, ".section-quote .carousel-inner");
    // Fetch quotes data from the API
    $.get("https://smileschool-api.hbtn.info/quotes", function (data) {
      // Iterate through each quote in the data
      data.forEach((quote, index) => {
        // Append each quote element to the carousel
        appendQuoteElement(
          quote.pic_url, // URL of the person's picture
          quote.name, // Name of the person
          quote.title, // Title of the person
          quote.text, // Quote text
          index // Index used for setting active class for the first quote
        );
      });
      // Hide loader once quotes are fetched and displayed
      toggleLoader(false, ".section-quote .carousel-inner");
    });
  }

  // Function to display the carousel videos
  function displayCarouselVideos(carouselSelector, apiURL, contentSelector) {
    // Show loader while fetching videos
    toggleLoader(true, carouselSelector + " .carousel-inner");
    // Fetch video data from API
    $.get(apiURL, function (data) {
      // Iterate through each video in the data
      data.forEach((video, index) => {
        // Append each video card element to the carousel
        appendCardElement(
          video.author, // Author of the video
          video.author_pic_url, // URL of the author's picture
          video.thumb_url, // URL of the video thumbnail
          video.star, // Star rating of the video
          video.title, // Title of the video
          video.sub_title, // Subtitle of the video
          video.duration, // Duration of the video
          index, // Index for setting active class for the first video
          contentSelector // Selector for the content area to append the video
        );
      });
      // Check if there are less than 5 video in the carousel
      while ($(carouselSelector + " .carousel-item").length < 5) {
        // Append videos repeatedly until there are 5 videos in the carousel
        data.forEach((video) => {
          appendCardElement(
            video.author, // Author of the video
            video.author_pic_url, // URL of the author's picture
            video.thumb_url, // URL of the video thumbnail
            video.star, // Star rating of the video
            video.title, // Title of the video
            video.sub_title, // Subtitle of the video
            video.duration, // Duration of the video
            -1, // Negative index as it's not for setting active class
            contentSelector // Selector for the content area to append the video
          );
        });
      }
      // Hide loader once videos are fetched and displayed
      toggleLoader(false, carouselSelector + " .carousel-inner");
    });
  }

  // Function to populate the search filters
  function populateSearchFilters() {
    // Fetch course data from the API
    $.get("https://smileschool-api.hbtn.info/courses", function (data) {
      // Set search input value to the fetched query
      $(".section-filters input").val(data.q);
      // Initialize variables to store selected topic and sort
      let searchInput = $(".section-filters input").val();
      let selectedTopic = $("#topic button").attr("data-name");
      let selectedSort = $("#sortBy button").attr("data-name");

      // Populate topics dropdown menu
      data.topics.forEach((topic) => {
        $("#topic .dropdown-menu").append(
          `<a class="dropdown-item f-medium px-4 py-2" data-name="${topic}" href="#">${formatText(
            topic
          )}</a>`
        );
      });

      // Update search input and display courses on search input change
      $(".section-filters input").change(function () {
        searchInput = $(this).val();
        displayCourses(searchInput, selectedTopic, selectedSort);
      });

      // Update selected topic and display courses on topic selection
      $("#topic button").text(formatText(data.topics[0]));
      $("#topic .dropdown-menu a").click(function () {
        selectedTopic = $(this).attr("data-name");
        $("#topic button").text($(this).text());
        displayCourses(searchInput, selectedTopic, selectedSort);
      });

      // Populate sorts dropdown menu
      data.sorts.forEach((sort) => {
        $("#sortBy .dropdown-menu").append(
          `<a class="dropdown-item f-medium px-4 py-2" data-name="${sort}" href="#">${formatText(
            sort
          )}</a>`
        );
      });

      // Update selected sort and display courses on sort selection
      $("#sortBy button").text(formatText(data.sorts[0]));
      $("#sortBy .dropdown-menu a").click(function () {
        selectedSort = $(this).attr("data-name");
        $("#sortBy button").text($(this).text());
        displayCourses(searchInput, selectedTopic, selectedSort);
      });
    });
  }

  // Function to format the text
  function formatText(text) {
    // Split the text by underscores and capitalize the first letter of each word
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // Join the words back together with spaces
  }

  // Function to display the courses
  function displayCourses(search = "", topic = "", sort = "") {
    // Show loader while fetching courses
    toggleLoader(true, ".section-result .section-inner");
    // Clear the existing courses from the DOM
    $("#matchingCourses").empty();
    // Construct the URL with search, topic, and sort parameters
    let url = `https://smileschool-api.hbtn.info/courses?q=${search}&topic=${topic}&sort=${sort}`;

    // Fetch course data from the constructed URL
    $.get(url, function (data) {
      // Iterate through each course in the data
      data.courses.forEach((course) => {
        // Append each course element to the matchingCourses section
        appendCourseElement(
          course.thumb_url, // URL of the course thumbnail
          course.title, // Title of the course
          course.sub_title, // Subtitle of the course
          course.author_pic_url, // URL of the author's picture
          course.author, // Author of the course
          course.star, // Star rating of the course
          course.duration // Duration of the course
        );
      });

      // Update the count of displayed courses
      let courseCount = data.courses.length;
      $(".section-result p.courses-count").text(
        courseCount + (courseCount > 1 ? " videos" : " video")
      );

      // Hide the loader once courses are fetched and displayed
      toggleLoader(false, ".section-result .section-inner");
    });
  }

  // Function to toggle the loader
  function toggleLoader(shouldShow, selector) {
    // Toggle the visibility of the loader based on the value of shouldShow
    $(selector + " .loader").toggle(shouldShow);
  }

  // Function to handle the carousel slide
  function handleCarouselSlide(event, selector) {
    // Get the current carousel item
    const currentItem = $(event.relatedTarget);
    // Get the index of the current carousel item
    const idx = currentItem.index();
    // Define the number of items per slide
    const itemsPerSlide = 4;
    // Get the total number of items in the carousel
    const totalItems = $(selector + " .carousel-item").length;

    // Check if the current item is at the end of the carousel
    if (idx >= totalItems - (itemsPerSlide - 1)) {
      // Calculate the number of items to append based on the difference between total items and items per slide
      const itemsToAppend = itemsPerSlide - (totalItems - idx);
      // Append items to the carousel based on the direction of slide
      for (let i = 0; i < itemsToAppend; i++) {
        if (event.direction == "left") {
          $(selector + " .carousel-item")
            .eq(i)
            .appendTo(selector + " .carousel-inner");
        } else {
          $(selector + " .carousel-item")
            .eq(0)
            .appendTo(selector + " .carousel-inner");
        }
      }
    }
  }

  // Initialize event listener for carouselVideos slide
  $("#carouselVideos").on("slide.bs.carousel", function (e) {
    // Call handleCarouselSlide function passing the event and selector for carouselVideos
    handleCarouselSlide(e, "#carouselVideos");
  });

  // Initialize event listener for carouselLatestVideos slide
  $("#carouselLatestVideos").on("slide.bs.carousel", function (e) {
    // Call handleCarouselSlide function passing the event and selector for carouselLatestVideos
    handleCarouselSlide(e, "#carouselLatestVideos");
  });

  // Check if there is a section with class "section-quote" exists
  if ($(".section-quote").length > 0) {
    // If exists, call displayQuotes function to fetch and display quotes
    displayQuotes();
  }

  // Check if there is an element with id "carouselVideos"
  if ($("#carouselVideos").length > 0) {
    // If exists, call displayCarouselVideos function to fetch and display popular tutorial videos
    displayCarouselVideos(
      "#carouselVideos",
      "https://smileschool-api.hbtn.info/popular-tutorials",
      "#carouselVideos .carousel-inner"
    );
  }

  // Check if there is an element with id "carouselLatestVideos"
  if ($("#carouselLatestVideos").length > 0) {
    // If exists, call displayCarouselVideos function to fetch and display latest videos
    displayCarouselVideos(
      "#carouselLatestVideos",
      "https://smileschool-api.hbtn.info/latest-videos",
      "#carouselLatestVideos .carousel-inner"
    );
  }

  // Check if there is a section with class "section-result" exists
  if ($(".section-result").length > 0) {
    // If exists, populate search filters and display courses
    populateSearchFilters();
    displayCourses();
  }
});
