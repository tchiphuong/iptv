var start;
var offset;

var itemList = [];
var targetURL = "https://raw.githubusercontent.com/luongtamlong/Dak-Lak-IPTV/main/daklakiptv.m3u";
var url = "https://cors-anywhere.herokuapp.com/" + targetURL;

$(function () {
    var dateLink = moment(new Date()).format("YYYYMMDD");
    if (~~localStorage.date < ~~dateLink) {
        localStorage.date = dateLink;
        $.ajax({
            url: targetURL,
            method: "GET",
            dataType: "text",
            success: function (text) {
                localStorage.content = text;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Lỗi: " + errorThrown);
            },
        });
    }

    var lstExcludes = [
        "info",
        "update",
        "sctv",
        "tintcquct",
        "vthanhnetwork",
        "knhqungbthilan",
        "knhqungbnga",
        "knhqungbtrungquc",
        "knhqungbphp",
        "knhqungbc",
        "knhqungbm",
        "knhqungbanh",
        "foxsportsnetwork",
        "formula1",
        "knhtrongnc",
        "radio",
        "phimtruyn",
    ];
    itemList = groupByGroupTitle(parseM3U(localStorage.content));
    $("#live-channels").empty();
    if (itemList) {
        itemList.forEach((element) => {
            if (
                lstExcludes.filter((x) =>
                    element.group
                        .toLowerCase()
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .trim()
                        .includes(x)
                ) == 0
            ) {
                $("#live-channels").append(`
                    <div class="m-4 px-2 ml-0 border-l-4 border-yellow-500 text-lg font-bold">
                        ${element.group}
                    </div>
                    <div id="list-channels-${element.group
                        .toLowerCase()
                        .replace(/[^a-zA-Z0-9]/g, "")
                        .trim()}" class="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4">
                        
                    </div>
                `);
                if (element.channels) {
                    $(
                        `#list-channels-${element.group
                            .toLowerCase()
                            .replace(/[^a-zA-Z0-9]/g, "")
                            .trim()}`
                    ).empty();

                    for (const object of element.channels) {
                        if (object.url) {
                            $(
                                `#list-channels-${element.group
                                    .toLowerCase()
                                    .replace(/[^a-zA-Z0-9]/g, "")
                                    .trim()}`
                            ).append(`
                                <a class="bg-white border border-gray-200 rounded-lg shadow flex flex-col" href="${object.url}" target="_blank">
                                    <img class="rounded-t-lg object-contain" src="${object.tvgLogo}" alt="${object.name}" style="aspect-ratio: 16/9;" loading="lazy" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png';">
                                    <span class="text-xs lg:text-lg font-bold px-3 py-2">${object.name}</span>
                                    </div>
                                </a>
                            `);
                        }
                    }
                }
            }
        });
    }
});

function parseM3U(text) {
    console.log(text);
    const lines = text.split("\n");
    const objects = [];

    for (const line of lines) {
        if (line.startsWith("#EXTINF")) {
            const object = {};
            const match = line.match(/tvg-id="(.+?)"/);
            if (match) {
                object.id = match[1];
            }

            const groupTitleMatch = line.match(/group-title="(.+?)"/);
            if (groupTitleMatch) {
                object.groupTitle = groupTitleMatch[1];
            }

            const groupLogoMatch = line.match(/group-logo="(.+?)"/);
            if (groupLogoMatch) {
                object.groupLogo = groupLogoMatch[1];
            }

            const tvgLogoMatch = line.match(/tvg-logo="(.+?)"/);
            if (tvgLogoMatch) {
                object.tvgLogo = tvgLogoMatch[1];
            }

            if (line) {
                object.name = line.split(",")[1];
            }

            objects.push(object);
        } else if (line.startsWith("#EXTVLCOPT")) {
            //console.log(line)
        } else if (line.startsWith("#")) {
            //console.log(line)
            // Ignore comment lines
        } else {
            const index = objects.length - 1;
            if (index >= 0) {
                // This is the URL of the stream
                if (line != "") {
                    objects[index].url = line;
                }
            }
        }
    }

    return objects;
}

function groupByGroupTitle(objects) {
    if (!objects) return;
    const groups = [];

    for (const object of objects) {
        const groupTitle = object.groupTitle;
        const currentGroup = groups.filter((x) => x.group == groupTitle);
        if (currentGroup.length !== 0) {
            //console.log(currentGroup[0].channels.push(object))
            currentGroup[0].channels.push(object);
        } else {
            groups.push({ group: groupTitle, channels: [object] });
        }
    }
    return groups;
}
