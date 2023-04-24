function playM3u8(url, license = null, clearkeys = null) {
    $("#player").empty();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    try {
        clearkeys = window.atob(window.location.href.split("&ck=")[1]);
    } catch {
        clearkeys = '{"":""}';
    }
    try {
        license = window.atob(window.location.href.split("&l=")[1]);
    } catch {
        license = "";
    }
    var player = new Clappr.Player({
        width: "100%",
        height: "100%",
        source: url,
        parentId: "#player",
        preload: "auto",
        autoPlay: "true",
        fullscreenEnabled: "true",
        hideMediaControl: "false",
        plugins: [LevelSelector, ClapprPip.PipButton, ClapprPip.PipPlugin, DashShakaPlayback],
        shakaConfiguration: {
            drm: {
                servers: {
                    "com.widevine.alpha": license,
                },
                clearKeys: JSON.parse(clearkeys),
            },
        },
    });
}
var url = window.location.href.split("#")[1];
url = "http://live-ali2.tv360.vn/manifest/VTV1_HD/playlist_1080p.m3u8";
try {
    ck = window.atob(window.location.href.split("&ck=")[1]);
} catch {
    ck = '{"":""}';
}
try {
    license = window.atob(window.location.href.split("&l=")[1]);
} catch {
    license = "";
}
playM3u8(url, license, ck);

var text = "";
var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var dateLink = `${year}${pad(month)}${pad(day)}`;
// dateLink = '20230423';
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
                            ).append(`<button onclick="playM3u8('${se.url}')" class="relative flex flex-col justify-center items-center my-3 rounded-lg overflow-hidden mx-auto border border-gray-300 shadow w-full">
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
                                                                    <img style="width: 64px; height: 64px;" src="${
                                                                        e.home.logo
                                                                    }">
                                                                    <span class="text-center" title="${
                                                                        e.home.name
                                                                    }">${e.home.name}</span>
                                                                </div>
                                                                <div class="text-center flex-grow">
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
                                                                    <img style="width: 64px; height: 64px;" src="${
                                                                        e.away.logo
                                                                    }">
                                                                    <span class="text-center" title="${
                                                                        e.away.name
                                                                    }">${e.away.name}</span>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="quality absolute bg-red-500 text-white text-xs font-bold">${
                                                                se.name
                                                            }</div>
                                                            </button>`);
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

$("button").on("click", function () {
    $("button").each(function () {
        $(this).removeClass("active");
    });
    $(this).addClass("active");
});
