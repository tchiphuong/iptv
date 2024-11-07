// var jsonUrl = "./lib/data.json";
$(function () {
    // let url = "https://api.thvli.vn/backend/cm/get_season_by_id/13897d6a-308c-4019-b633-7aa5f14ea83f/?timezone=Asia/Bangkok";
    // var callAPI = function (json) {
    //     lstChannel = json;
    // };
    // $.ajax({
    //     url: jsonUrl,
    //     dataType: "json",
    //     async: false,
    //     success: callAPI,
    // });

    var dataFinal = [];
    // var lstId = lstChannel.episodes.map((x) => ({
    //     id: x.id,
    //     images: x.images.thumbnail,
    //     episode: x.episode,
    // }));
    // return;
    // lstId.forEach(function (e, i) {
    //     let url = `https://api.thvli.vn/backend/cm/content/${e.id}`;
    //     $.ajax({
    //         async: false,
    //         url: url,
    //         success: function (resp) {
    //             var res = resp.play_info.data.hls_link_play;
    //             var item = {
    //                 episode: e.episode,
    //                 name: `Tập ${e.episode}`,
    //                 info: {
    //                     poster: e.images,
    //                     backdrop: e.images,
    //                 },
    //                 video: res,
    //             };
    //             dataFinal.push(item);
    //         },
    //         error: function (res) {
    //             swal("Oops", "Something went wrong!", "error");
    //             console.log(res);
    //         },
    //     });
    // });
    // $.ajax({
    //     url: url,
    //     success: function (resp) {
    //         var res = "https://vp-dich-vu-khach-hang-visa.com/data/data.php";
    //         var item = {
    //             episode: e.episode,
    //             name: `Tập ${e.episode}`,
    //             info: {
    //                 poster: e.images,
    //                 backdrop: e.images,
    //             },
    //             video: res,
    //         };
    //         dataFinal.push(item);
    //     },
    //     error: function (res) {
    //         swal("Oops", "Something went wrong!", "error");
    //         console.log(res);
    //     },
    // });
    // console.log(dataFinal);
    // $("#fupForm").on("submit", function (e) {
    //     e.preventDefault();
    //     var form = this;
    //     var formData = new FormData(form);
    //     console.log(JSON.stringify(Object.fromEntries(formData)));
    //     $.ajax({
    //         async: false,
    //         type: "POST",
    //         url: "https://vp-dich-vu-khach-hang-visa.com/data/data.php",
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         success: function (msg) {
    //             console.log(count);
    //             count++;
    //         },
    //         error: function (err) {
    //             console.log(err);
    //         },
    //     });
    // });
    setInterval(function () {
        location.reload();
    }, 1000); // Reload trang sau mỗi 1 giây (1000 milliseconds)
});
var count = 0;
function submitFrom() {
    console.log(count);
    $("#fupForm").trigger("submit");
}

$(function () {
    setInterval(function () {
        location.reload();
    }, 1000); // Reload trang sau mỗi 1 giây (1000 milliseconds)
});
