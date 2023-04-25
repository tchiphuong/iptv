var text = "";
var dateObj = new Date();
var month = dateObj.getMonth() + 1; //months from 1-12
var day = dateObj.getDate();
var year = dateObj.getFullYear();
var dateLink = `${year}${pad(month)}${pad(day)}`;
$(function () {
    var url = `https://api.vebo.xyz/api/match/fixture/home/${dateLink}`;
    $.ajax({
        url: url,
        success: function (resp) {
            var lstMatch = resp.data.filter((x) => x.sport_type == "football");
            text +=
                `#EXTM3U x-tvg-url="http://lichphatsong.xyz/schedule/epg.xml,https://iptvx.one/EPG" tvg-shift=0 m3uautoload=1` +
                "\n";
            $.each(lstMatch, function (i, e) {
                var link = `#EXTINF:-1 group-title="Trực tiếp" tvg-id="" tvg-logo="${
                    e.tournament.logo
                }",${moment(e.date).format("DD/MM")} ${moment(e.timestamp).format("HH:mm")} ${
                    e.name
                }`;
                var hls = "new.m3u8";
                var subUrl = `https://api.vebo.xyz/api/match/${e.id}/meta`;
                $.ajax({
                    async: false,
                    url: subUrl,
                    success: function (resp) {
                        $.each(resp.data.play_urls, function (si, se) {
                            commentators = resp.data.commentators || [];
                            commentators = commentators.map((x) => x.name);
                            hls = se.url;
                            text += `${link} [${se.name}]` + "\n";
                            text += hls + "\n";
                            $("#console").html(text);
                            $(
                                "#match"
                            ).append(`<a href="${se.url}" target="_blank" class="relative flex flex-col justify-center items-center my-3 rounded-lg overflow-hidden mx-auto border border-gray-300 shadow w-full">
                                                            <div class="flex font-bold bg-gray-200 w-full py-2 justify-center items-center">
                                                                <img style="height: 32px;" src="${
                                                                    e.tournament.logo
                                                                }" alt="" />
                                                                <span class="px-3">${
                                                                    e.tournament.name
                                                                }</span>    
                                                            </div>
                                                            <div class="flex justify-center items-center py-1 px-2 flex-grow w-full">
                                                                <div class="flex flex-col justify-start items-center h-full w-4/12">
                                                                    <img class="object-contain" style="width: 64px; height: 64px;" src="${
                                                                        e.home.logo
                                                                    }">
                                                                    <span class="text-center" title="${
                                                                        e.home.name
                                                                    }">${e.home.short_name}</span>
                                                                </div>
                                                                <div class="text-center flex-grow">
                                                                    <span class="font-bold text-xl">${
                                                                        e.scores.home
                                                                    } - ${e.scores.away}</span>
                                                                    <div>${moment(e.date).format(
                                                                        "DD/MM/YYYY"
                                                                    )}</div>
                                                                    <div>${moment(
                                                                        e.timestamp
                                                                    ).format("HH:mm")}</div>
                                                                    <div>${commentators.map(
                                                                        (x) => x.name
                                                                    )}</div>
                                                                </div>
                                                                <div class="flex flex-col justify-start items-center h-full w-4/12">
                                                                    <img class="object-contain" style="width: 64px; height: 64px;" src="${
                                                                        e.away.logo
                                                                    }">
                                                                    <span class="text-center" title="${
                                                                        e.away.name
                                                                    }">${e.away.short_name}</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="quality absolute bg-red-500 text-white text-xs font-bold">${
                                                                se.name
                                                            }</div>
                                                            </a>`);
                        });
                    },
                    error: function (res) {
                        swal("Oops", "Something went wrong!", "error");
                        console.log(res);
                    },
                });
            });
        },
        error: function (res) {
            swal("Oops", "Something went wrong!", "error");
            console.log(res);
        },
    });
});
function pad(n) {
    return n < 10 ? "0" + n : n;
}
