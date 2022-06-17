function show_comment() {
    $.ajax({
        type: 'GET',
        url: '/ktoon_comment/get',
        data: {},
        success: function (response) {
            let rows = response['comment']
            for (let i = 0; i < rows.length; i++) {
                let url = rows[i]['url']
                let image = rows[i]['image']
                let title = rows[i]['title']
                let star = rows[i]['star']
                let comment = rows[i]['comment']
                let username = rows[i]['username'] ?? '익명';

                let star_image = '⭐'.repeat(star)

                let temp_html = `<article class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                                            <div class="service-item rounded overflow-hidden">
                                                <!-- 웹툰 이미지 src에 넣기-->
                                                <img id="card-image" class="img-fluid" src=${image} alt="">
                                                <div class="position-relative p-4">
                                                    <h4 id="card-title" class="mt-2">${title}</h4>
                                                    <p><span id="card-comment">${comment}</span> - <span id="card-author">${username}</span></p>
                                                    <p id="card-star">${star_image}</p>
                                                    <!-- 웹툰 URL href에 넣기 -->
                                                    <a id="card-url" class="small fw-medium" href="${url}">웹툰으로 이동<i class="fa fa-arrow-right ms-2"></i></a>
                                                </div>
                                            </div>
                                        </article>`

                $('#poster').append(temp_html)
            }
        }
    })
}
$(document).ready(function () {
    show_comment();
    show_webtoon();
});
function show_webtoon() {
    $.ajax({
        type: 'GET',
        url: '/ktoon/recommend',
        data: {},
        success: function (response) {
            let rows = response['webtoons']
            for(let i = 0; i<rows.length;i++)
            {
                let title = rows[i]['title']
                let image = rows[i]['image']
                let date = rows[i]['date']
                let url = rows[i]['url']
                let temp_html = `<div class="col-lg-4 col-md-6 portfolio-item third">
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
                                </div>`

                $('#webtoon-box').append(temp_html)
            }
        }
    })
}

function save_comment() {
    let url = $('#url').val()
    let star = $('#star').val()
    let comment = $('#comment').val()
    let username = localStorage.getItem('username')

    $.ajax({
        type: 'POST',
        url: '/ktoon_comment/post',
        data: {url_give: url, star_give: star, comment_give: comment, username_give: username},
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        }
    })
}


function open_box() {
    $('#post-box').show()
}
function close_box() {
    $('#post-box').hide()
}