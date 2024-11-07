var jsonUrl = "./lib/api.json";
$(function () {
    var callAPI = function (json) {
        lstChannel = json.channel;
    };
    $.ajax({
        url: jsonUrl,
        dataType: "json",
        async: false,
        success: callAPI,
    });

    $("#list-channels").empty();
    lstChannel.forEach((element, index) => {
        if (element.isShow) {
            if (index === 0) {
                $("#list-channels").append(`
                <li class="flex flex-col">
                    <button id="${element.name}" type="button"
                        class="channel-item text-white bg-blue-600 h-16 flex flex-col items-center justify-center hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-700">
                        <img class="max-w-full max-h-full" src="${element.img}" alt="${element.title}">
                    </button>
                    <div class="text-center">${element.title}</div>
                </li>
            `);
            } else {
                $("#list-channels").append(`
                <li>
                    <button id="${element.name}" type="button"
                        class="channel-item text-gray-900 w-full bg-white h-16 flex items-center justify-center border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        <img class="max-w-full max-h-full" src="${element.img}" alt="${element.title}">
                    </button>
                    <div class="text-center">${element.title}</div>
                </li>
            `);
            }
        }
    });
    $(".channel-item").on("click", function () {
        const id = $(this).attr("id");
        $("#list-quality").empty();
        let streamUrl = lstChannel[0].link[0].url;

        $(this)
            .parents("ul")
            .find("button")
            .each(function () {
                $(this)
                    .removeClass(
                        "bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700"
                    )
                    .addClass(
                        "border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    );
            });
        $(this)
            .addClass(
                "bg-blue-600 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700"
            )
            .removeClass(
                "border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            );

        lstChannel.forEach((element, index) => {
            if (element.name === id) {
                streamUrl = element.link[0].url;
                $("#channel-title").text(`LIVE | ${element.title}`);
                $("#current-channel").text(`${element.title}`);
                element.link.forEach((sub_element) => {
                    $("#list-quality").append(`
                    <li>
                        <button type="button" stream-url="${sub_element.url}" class="quality-item text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        ${sub_element.title}
                        </button>
                    </li>
                    `);
                });
            }
        });
        Play(streamUrl);

        $(".quality-item").click(function () {
            streamUrl = $(this).attr("stream-url");
            Play(streamUrl);
        });
    });
    $($("#list-channels").find("button")[0]).trigger("click");

    readTextFile("https://playlist.vthanhtivi.pw/");
});

function Play(streamUrl) {
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
    playM3u8(streamUrl, license, ck);
}
function playM3u8(url, license, clearkeys) {
    var player = new Clappr.Player({
        source: url,
        parentId: "#player",
        preload: "auto",
        autoPlay: "true",
        width: "100%",
        height: "100%",
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

    document.title = url; //.split('/')[url.split('/').length - 1];
}

function readTextFile(file) {
    var lst = [];
    var url = "https://playlist.vthanhtivi.pw/";
    url = "https://raw.githubusercontent.com/tchiphuong/iptv/main/myList.m3u";
    $.ajax({
        url: url,
        crossDomain: true,
        dataType: "jsonp",
        jsonpCallback: "text/plain",
        jsonp: false,
        headers: {
            "Content-Type": "text/plain;charset=UTF-8",
        },
        success: function (data) {
            console.log(data);
        },
        error: function (res) {
            console.log(res);
        },
    });

    // fetch(url)
    //     .then((response) => response.text())
    //     .then(function (text) {
    //         lst = text.split("#EXTINF");
    //         lst.forEach((item) => {
    //             //if (lst.lastIndexOf(item) > 20 && lst.lastIndexOf(item) <= 30) {
    //             var subList = item.split("\n");
    //             if (item.includes("https://sglive.akamaized.net/bpk-tv")) {
    //                 subList[0] = `#EXTINF${subList[0]}`;
    //                 console.log(subList);
    //             }
    //             //}
    //         });
    //     });
}
