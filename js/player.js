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

$("button").on("click", function () {
    $("button").each(function () {
        $(this).removeClass("active");
    });
    $(this).addClass("active");
});
