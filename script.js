// quotes section [Home page, Pricing page]
function quotes() {
  $(".loader").show();
  $.ajax({
    url: "https://smileschool-api.hbtn.info/quotes",
    type: "GET",
    dataType: "json",
    success: function (data) {
      $(".loader").hide();

      for (let i = 0; i < data.length; i++) {
        let quote = data[i];

        let quoteHTML = `
          <div class="carousel-item carousel-item-content">
            <div class="row">
              <div class="col-sm-3 text-center">
                <img
                  class="rounded-circle"
                  src="${quote.pic_url}"
                  class="d-block w-100"
                  alt="random person image"
                />
              </div>
              <div class="col-sm-8 ml-3 d-flex flex-column">
                <div>${quote.text}</div>
                <div class="font-weight-bold mt-3">${quote.name}</div>
                <div>${quote.title}</div>
              </div>
            </div>
          </div>
          `;
        $("#quotes-section").append(quoteHTML);
        $("#quotes-section .carousel-item:first-child").addClass("active");
      }
    },
  });
}

//video section [Home page]
function most_popular_video() {
  $(".loader").show();
  $.ajax({
    url: "https://smileschool-api.hbtn.info/popular-tutorials",
    type: "GET",
    dataType: "json",
    success: function (data) {
      $(".loader").hide();

      for (let i = 0; i < data.length; i++) {
        let video = data[i];

        let star_on = `<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy" />`;
        let star_off = `<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy" />`;
        let stars = "";
        for (let j = 0; j < 5; j++) {
          if (j < video.star) {
            stars += star_on;
          } else {
            stars += star_off;
          }
        }
        video.star = stars;

        let videoHTML = `
          <div class="carousel-item">
          <div class="row justify-content-center">
            <div class="mx-1">
              <div class="card mx-auto my-3">
                <img class="card-img-top" src="${video.thumb_url}" alt="Tuto" />
                <img class="play-icon" src="images/play.png" alt="play" />
                <div class="card-body">
                  <p class="font-weight-bold black-text">
                    ${video.title}<br />
                    <span class="text-secondary"
                      >${video.subtitle}</span
                    >
                  </p>
                  <div class="row justify-content-start">
                    <div class="col-2 pr-0">
                      <img
                        class="rounded-circle"
                        src="${video.author_pic_url}"
                        width="30"
                        height="30"
                        alt="Profile 1"
                        loading="lazy"
                      />
                    </div>
                    <div class="col mt-1 pl-0 purple-text font-weight-bold">
                      ${video.author}
                    </div>
                  </div>
        
                  <div class="row justify-content-between mt-2">
                    <div class="col">
                      ${video.star}
                    </div>
                    <div class="col-4 text-right font-weight-bold purple-text">
                      ${video.duration}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
        $("#video-section").append(videoHTML);
      }
      $("#video-section .carousel-item:first-child").addClass("active");
    },
  });
}

// Latest videos section [Home page]
function latest_video() {
  $(".loader").show();
  $.ajax({
    url: "https://smileschool-api.hbtn.info/latest-videos",
    dataType: "json",
    type: "GET",
    success: function (data) {
      $(".loader").hide();

      for (let i = 0; i < data.length; i++) {
        let video = data[i];

        let star_on = `<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy" />`;
        let star_off = `<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy" />`;
        let stars = "";
        for (let j = 0; j < 5; j++) {
          if (j < video.star) {
            stars += star_on;
          } else {
            stars += star_off;
          }
        }
        video.star = stars;

        let Latest_videosHTML = `<div class="carousel-item">
           <div class="row justify-content-center">
             <div class="mx-1">
               <div class="card mx-auto my-3">
                 <img class="card-img-top" src="${video.thumb_url}" alt="Tuto" />
                 <img class="play-icon" src="images/play.png" alt="play" />
                 <div class="card-body">
                   <p class="font-weight-bold black-text">
                     ${video.title}<br />
                     <span class="text-secondary"
                       >${video.subtitle}</span
                     >
                   </p>
                   <div class="row justify-content-start">
                     <div class="col-2 pr-0">
                       <img
                         class="rounded-circle"
                         src="${video.author_pic_url}"
                         width="30"
                         height="30"
                         alt="Profile 1"
                         loading="lazy"
                       />
                     </div>
                     <div class="col mt-1 pl-0 purple-text font-weight-bold">
                       ${video.author}
                     </div>
                   </div>
         
                   <div class="row justify-content-between mt-2">
                     <div class="col">
                       ${video.star}
                     </div>
                     <div class="col-4 text-right font-weight-bold purple-text">
                       ${video.duration}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>`;
        $("#Latest-videos-section").append(Latest_videosHTML);
      }
      $("#Latest-videos-section .carousel-item:first-child").addClass("active");
    },
  });
}

// Courses section [courses page]
function courses() {
  let topicSelect = $("#topic-select");
  let sortSelect = $("#sort-select");
  let searchInput = $("#search-input");

  $(".loader").show();
  $.ajax({
    url: "https://smileschool-api.hbtn.info/courses",
    type: "GET",
    dataType: "json",
    data: {
      q: searchInput.val(),
      topic: topicSelect.val(),
      sort: sortSelect.val(),
    },

    success: function (data) {
      $(".loader").hide();
      // seach input
      $(searchInput).on("keyup", function () {
        updateCards(
          data,
          searchInput.val(),
          topicSelect.val(),
          sortSelect.val()
        );
      });

      // topics select
      topicSelect.on("change", function () {
        updateCards(
          data,
          searchInput.val(),
          topicSelect.val(),
          sortSelect.val()
        );
      });

      // sort select
      sortSelect.on("change", function () {
        updateCards(
          data,
          searchInput.val(),
          topicSelect.val(),
          sortSelect.val()
        );
      });

      // Add topics to select
      $.each(data.topics, function (index, topic) {
        topicSelect.append(
          '<option class="text-dark font-weight-bold" value="' +
            topic +
            '">' +
            topic +
            "</option>"
        );
      });

      // Add sort options to select
      $.each(data.sorts, function (index, sort) {
        sortSelect.append(
          '<option class="text-dark font-weight-bold" value="' +
            sort +
            '">' +
            sort +
            "</option>"
        );
      });

      function updateCards(data, search, topic, sort) {
        let filteredData = data;

        // Filter based on search input
        if (search) {
          filteredData = filteredData.filter(function (item) {
            return item.title.toLowerCase().includes(search.toLowerCase());
          });
        }

        // Filter based on topic select
        if (topic && topic !== "All topics") {
          filteredData = filteredData.filter(function (item) {
            return item.topic === topic;
          });
        }

        // Sort based on sort select
        if (sort === "title") {
          filteredData.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
        } else if (sort === "duration") {
          filteredData.sort(function (a, b) {
            return a.duration - b.duration;
          });
        }

        // Clear existing cards
        $("#card-video").empty();

        for (let i = 0; i < filteredData.length; i++) {
          let video = filteredData[i];

          let star_on = `<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy" />`;
          let star_off = `<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy" />`;
          let stars = "";
          for (let j = 0; j < 5; j++) {
            if (j < video.star) {
              stars += star_on;
            } else {
              stars += star_off;
            }
          }
          video.star = stars;

          let cardHTML = `
                  <div class="card mx-auto my-3">
                  <img class="card-img-top" src="${video.thumb_url}" alt="Tuto" />
                  <img class="play-icon" src="images/play.png" alt="play" />
                  <div class="card-body">
                    <p class="font-weight-bold black-text">
                      ${video.title}<br />
                      <span class="text-secondary">${video.subtitle}</span>
                    </p>
                    <div class="row justify-content-start">
                      <div class="col-2 pr-0">
                        <img src="${video.avatar_url}" alt="Avatar" class="avatar" />
                      </div>
                      <div class="col-10 pl-0">
                        <p class="text-secondary">${video.author}</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer d-flex justify-content-between align-items-center">
                    <p>${video.duration} min</p>
                    <p>${video.star}</p>
                  </div>
                  </div>
            `;
          $("#card-video").append(cardHTML);
        }
        $("#card-video").addClass("active");
      }
    },
  });
}

$(document).ready(function () {
  quotes();
  most_popular_video();
  latest_video();
  courses();
});
