const btnRecord = document.getElementById('btn-record');
const btnToggleForm = document.getElementById('btn-toggleform');
const btnClose = document.getElementById('btn-closeform');
const postBox = document.getElementById('post-box');

function toggleReviewForm() {
  postBox.classList.toggle('show');
}

function closeReviewForm() {
  postBox.classList.remove('show');
}

$(document).ready(function () {
  closeReviewForm();
  getNaverReview();
  getNaverDailyRecommended();
});

btnToggleForm.addEventListener('click', toggleReviewForm);
btnClose.addEventListener('click', closeReviewForm);
btnRecord.addEventListener('click', postNaverReview);

function postNaverReview() {
  const url = $('#url').val();
  const star = $('#star').val();
  const comment = $('#comment').val();

  $.ajax({
    type: 'POST',
    url: '/naver_webtoon/post',
    data: {
      url_give: url,
      star_give: star,
      comment_give: comment,
    },
    success: function (res) {
      alert(res['msg']);
      window.location.reload();
    },
  });
}

function getNaverReview() {
  $.ajax({
    type: 'GET',
    url: '/naver_webtoon/get',
    data: {},
    success: function (res) {
      const reviews = res.reviews;
      for (let review of reviews) {
        let title = review.title;
        let image = review.image;
        let url = review.url;
        let star = '⭐'.repeat(reviews.star);
        let comment = review.comment;

        let tempHtml = `
                    <article class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="service-item rounded overflow-hidden">
                            <img id="card-image" class="img-fluid" src=${image} alt="">
                            <div class="position-relative p-4">
                                <h4 id="card-title" class="mt-2">${title}</h4>
                                <p><span id="card-comment">${comment}</span> - <span id="card-author">작성자</span></p>
                                <p id="card-star">${star}</p>
                                <a id="card-url" class="small fw-medium" href=${url}>웹툰으로 이동<i class="fa fa-arrow-right ms-2"></i></a>
                            </div>
                        </div>
                    </article>
        `;
        $('#poster').append(tempHtml);
      }
    },
  });
}

function getNaverDailyRecommended() {
  $.ajax({
    type: 'GET',
    url: '/naver_webtoon/recommend',
    data: {},
    success: function (res) {
      let webtoons = res.webtoons;
      for (let webtoon of webtoons) {
        let title = webtoon.title;
        let url = webtoon.url;
        let image = webtoon.image;
        let date = webtoon.date;

        let tempHtml = `<article class="col-lg-4 col-md-6 portfolio-item first">
                          <div class="portfolio-img rounded overflow-hidden">
                              <img class="img-fluid" src=${image} alt="">
                              <div class="portfolio-btn">
                                  <a class="btn btn-lg-square btn-outline-light rounded-circle mx-1" href=${url}><i
                                          class="fa fa-link"></i></a>
                              </div>
                          </div>
                          <div class="pt-3">
                              <p class="rec-day text-primary mb-0">${date}요일 연재</p>
                              <hr class="text-primary w-25 my-2">
                              <h5 class="lh-base">${title}</h5>
                          </div>
                      </article>`;

        $('#recommended-webtoons').append(tempHtml);
      }
    },
  });
}
