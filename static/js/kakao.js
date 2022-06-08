const url = document.getElementById('url');
const record__btn = document.getElementById('record__btn');

$(document).ready(function(){
    handle_get_kakao();
});

function handle_post_kakao() {
    const give_url = url.value;
    const give_star = $('#star').val();
    const give_comment = $('#comment').val();

    $.ajax({
        type: "POST",
        url: '/kakao_webtoon/post',
        data: {
            give_url,
            give_star,
            give_comment
        },
        success: function(res) {
            alert(res['msg']);
            window.location.reload();
        }
    });
};
record__btn.addEventListener("click", handle_post_kakao);

function handle_get_kakao() {
    $.ajax({
        type: "GET",
        url: "/kakao_webtoon/get",
        data: {},
        success: function(res){
            const webtoons = res['webtoons'];
            let title, image, date;
            for(let i=0; i<webtoons.length; i++){
                title = webtoons[i]['title'];
                image = webtoons[i]['image'];
                date = webtoons[i]['date'];
                let temp_html = `
                    <article class="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                        <div class="service-item rounded overflow-hidden">
                            <!-- 웹툰 이미지 src에 넣기-->
                            <img class="img-fluid" src=${image} alt="">
                            <div class="position-relative p-4 pt-0">
                                <h4 class="mt-5" id="title">${title}</h4>
                                <p><span id="review">${date}요일 연재!</span><span> - </span><span id="author">작성자</span></p>
                                <p id="star">⭐⭐⭐⭐⭐</p>
                                <!-- 웹툰 URL href에 넣기 -->
                                <a class="small fw-medium" href="웹툰URL">웹툰으로 이동<i class="fa fa-arrow-right ms-2"></i></a>
                            </div>
                        </div>
                    </article>
                `;
                $('#poster').append(temp_html);
            }
        }
    })
}