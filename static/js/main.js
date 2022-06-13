(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  $('.nav-item').click(function(){

  });

  show_webtoon();

  let now = new Date().getDay();
  let dayOfweek = new Array(
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일"
  );
  let today = dayOfweek[now - 1];
  document.querySelector(".now").innerHTML = `${today}의 <br> 웹툰 추천작은?`;

  function show_webtoon (){

    $.ajax({
      type: 'GET',
      url: '/index_naver',
      data: {},
      success: function (response){

        let rows = response['webtoons']
        for (let i = 0; i < rows.length; i ++){
          let title = rows[i]['title'];
          let image = rows[i]['image'];
          let index = rows[i]['index'];
          let url = rows[i]['url'];

          let temp_naver = `<div class="row mb-4">
                                <div class="fadeInUp" data-wow-delay="0.1s">
                                    <div class="service-item rounded overflow-hidden">
                                        <img class="index-thumbnail"
                                            src=${image}
                                            alt="">
                                        <div class="position-relative p-4 pt-0">
                                            <div class="service-icon">
                                                <i class="fa-solid fa-${index} fa-3x"></i>
                                            </div>
                                            <h4 class="mb-3">${title}</h4>
                                            <!-- <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p> -->
                                            <a class="small fw-medium" href=${url}>웹툰보러가기<i
                                                    class="fa fa-arrow-right ms-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
          $('#naver-container').append(temp_naver);
        }
      }
    })

    $.ajax({
      type: 'GET',
      url: '/index_kakao',
      data: {},
      success: function (response){

        let rows = response['webtoons']
        for (let i = 0; i < rows.length; i ++){
          let title = rows[i]['title'];
          let image = rows[i]['image'];
          let index = rows[i]['index'];
          let url = rows[i]['url']

          let temp_kakao = `<div class="row mb-4">
                                <div class="fadeInUp" data-wow-delay="0.1s">
                                    <div class="service-item rounded overflow-hidden">
                                        <img class="index-thumbnail"
                                            src=${image}
                                            alt="">
                                        <div class="position-relative p-4 pt-0">
                                            <div class="service-icon">
                                                <i class="fa-solid fa-${index} fa-3x"></i>
                                            </div>
                                            <h4 class="mb-3">${title}</h4>
                                            <!-- <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p> -->
                                            <a class="small fw-medium" href=${url}>웹툰보러가기<i class="fa fa-arrow-right ms-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
          $('#kakao-container').append(temp_kakao);
        }
      }
    })

    $.ajax({
      type: 'GET',
      url: '/index_ktoon',
      data: {},
      success: function (response){

        let rows = response['webtoons']
        for (let i = 0; i < rows.length; i ++){
          let title = rows[i]['title'];
          let image = rows[i]['image'];
          let index = rows[i]['index'];
          let url = rows[i]['url']

          let temp_kakao = `<div class="row mb-4">
                                <div class="fadeInUp" data-wow-delay="0.1s">
                                    <div class="service-item rounded overflow-hidden">
                                        <img class="index-thumbnail"
                                            src=${image}
                                            alt="">
                                        <div class="position-relative p-4 pt-0">
                                            <div class="service-icon">
                                                <i class="fa-solid fa-${index} fa-3x"></i>
                                            </div>
                                            <h4 class="mb-3">${title}</h4>
                                            <!-- <p>Stet stet justo dolor sed duo. Ut clita sea sit ipsum diam lorem diam.</p> -->
                                            <a class="small fw-medium" href=${url}>웹툰보러가기<i
                                                    class="fa fa-arrow-right ms-2"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>`
          $('#ktoon-container').append(temp_kakao);
        }
      }
    })
  }
})(jQuery);
