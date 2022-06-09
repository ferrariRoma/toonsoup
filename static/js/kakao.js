const url = document.getElementById("url");
const record__btn = document.getElementById("record__btn");

$(document).ready(function () {
  handle_get_kakao();
  today__recommend();
  handle__close__btn();
});

function handle__close__btn() {
  $("#post-box").hide();
}

function handle__open__btn() {
  $("#post-box").show();
}

function handle_post_kakao() {
  const give_url = url.value;
  const give_star = $("#star").val();
  const give_comment = $("#comment").val();

  $.ajax({
    type: "POST",
    url: "/kakao_webtoon/post",
    data: {
      give_url,
      give_star,
      give_comment,
    },
    success: function (res) {
      alert(res["msg"]);
      window.location.reload();
    },
  });
}
record__btn.addEventListener("click", handle_post_kakao);

function handle_get_kakao() {
  $.ajax({
    type: "GET",
    url: "/kakao_webtoon/get",
    data: {},
    success: function (res) {
      const webtoons = res["webtoons"];
      let title, image, url, star, comment;
      for (let i = 0; i < webtoons.length; i++) {
        title = webtoons[i]["title"];
        image = webtoons[i]["image"];
        url = webtoons[i]["url"];
        star = "⭐".repeat(webtoons[i]["star"]);
        comment = webtoons[i]["comment"];
        let temp_html = `
                    <article class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="service-item rounded overflow-hidden">
                            <!-- 웹툰 이미지 src에 넣기-->
                            <img id="card-image" class="img-fluid" src=${image} alt="">
                            <div class="position-relative p-4">
                                <h4 id="card-title" class="mt-2">${title}</h4>
                                <p><span id="card-comment">${comment}</span> - <span id="card-author">작성자</span></p>
                                <p id="card-star">${star}}</p>
                                <!-- 웹툰 URL href에 넣기 -->
                                <a id="card-url" class="small fw-medium" href=${url}>웹툰으로 이동<i class="fa fa-arrow-right ms-2"></i></a>
                            </div>
                        </div>
                    </article>
                `;
        $("#poster").append(temp_html);
      }
    },
  });
}

function today__recommend() {
  $.ajax({
    type: "GET",
    url: "/kakao_webtoon/recommend",
    data: {},
    success: function (res) {
      const webtoons = res["webtoons"];
      let title, image, date;
      for (let i = 0; i < webtoons.length; i++) {
        title = webtoons[i]["title"];
        recommend_url = webtoons[i]["url"];
        image = webtoons[i]["image"];
        date = webtoons[i]["date"];
        const temp_html = `                
            <div class="col-lg-4 col-md-6 portfolio-item first">
                <div class="portfolio-img rounded overflow-hidden">
                    <img class="img-fluid" src=${image} alt="">
                    <div class="portfolio-btn">
                        <a class="btn btn-lg-square btn-outline-light rounded-circle mx-1" href=${recommend_url}><i
                                class="fa fa-link"></i></a>
                    </div>
                </div>
                <div class="pt-3">
                    <p class="rec-day text-primary mb-0">${date}요일 연재</p>
                    <hr class="text-primary w-25 my-2">
                    <h5 class="lh-base">${title}</h5>
                </div>
            </div>
        `;
        $("#recommend_webtoons").append(temp_html);
      }
    },
  });
}
