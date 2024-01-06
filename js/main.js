var host = "https://tchiphuong.github.io/iptv/";
$(function () {
    var cbbdata = [];
    $.ajax({
        async: false,
        url: "https://soccer-api.api.vinasports.com.vn/api/v1/publish/leagues",
        beforeSend: function () {
            ShowLoading();
        },
        success: function (resp) {
            cbbdata = sortObj(resp.data, "order_number")
                .filter((item) => item.sport_type === 1 && item.app_display)
                .map((item) => ({
                    id: item.league_sync_id,
                    text: item.name,
                    logo: item.logo,
                }));
        },
        error: function (res) {
            swal("Oops", "Something went wrong!", "error");
        },
        complete: function () {
            CloseLoading();
        },
    });

    $("#cbb-standings").select2({
        templateResult: formatState,
        templateSelection: formatState,
        data: cbbdata,
    });

    $('[data-type="tab-control"]').each(function () {
        if ($(this).attr("tab-show")) {
            $(this).trigger("click");
        }
    });
    flatpickr("#date", {
        minDate: moment().subtract(2, "days").format("YYYY-MM-DD"),
        locale: "vn",
        dateFormat: "d/m/Y",
        altFormat: "d/m/Y",
        defaultDate: "today",
        onChange: function (selectedDates, dateStr, instance) {
            // var date = moment(new Date(selectedDates)).format("YYYYMMDD");
            // getData(date);
            var date = moment(new Date($("#date")[0]._flatpickr.selectedDates[0])).format("YYYYMMDD");
            getData(date);
        },
    });

    $(".shortcut-buttons-flatpickr-button").addClass("text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800");

    $("#btn-search").on("click", function () {
        var date = moment(new Date($("#date")[0]._flatpickr.selectedDates[0])).format("YYYYMMDD");
        getData(date, true);
    });

    $("#btn-search").trigger("click");
    getStandings(cbbdata[0].id);

    $(document).on("click", "button[data-type='btn-filter']", function () {
        $("#tournament")
            .find("button[data-type='btn-filter']")
            .each(function () {
                $(this).removeClass("bg-blue-700 text-white active");
            });
        $(this).addClass("bg-blue-700 text-white active");
        const id = $(this).attr("id");
        $(`button[data-type="match"]`).each(function () {
            $(this).addClass("invisible opaciy-0 hidden");
        });
        $(`button[tournament='${id}']`).each(function () {
            $(this).removeClass("invisible opaciy-0 hidden");
        });
        if (id == "all") {
            $(`button[data-type="match"]`).each(function () {
                $(this).removeClass("invisible opaciy-0 hidden");
            });
        }
    });

    $(document).on("change", "#cbb-standings", function () {
        getStandings($(this).val());
    });

    // setInterval(function () {
    //     var dateObj = new Date();
    //     var month = dateObj.getMonth() + 1; //months from 1-12
    //     var day = dateObj.getDate();
    //     var year = dateObj.getFullYear();
    //     var dateLink = `${year}${pad(month)}${pad(day)}`;
    //     var date = moment(new Date($("#date")[0]._flatpickr.selectedDates[0])).format("YYYYMMDD");
    //     if (date == dateLink) {
    //         getData(dateLink, false);
    //     }
    // }, 1000);
});

function formatState(state) {
    if (!state.id) {
        return state.text;
    }
    var $state = $(`
        <div class="flex items-center">
            <img class="h-10 w-10 object-contain" src="${state.logo}" />
            <span class="px-3">${state.text}</span>
        </div>`);
    return $state;
}

function pad(n) {
    return n < 10 ? "0" + n : n;
}

function sortObj(list, key) {
    function compare(a, b) {
        a = a[key];
        b = b[key];
        var type = typeof a === "string" || typeof b === "string" ? "string" : "number";
        var result;
        if (type === "string") result = a.localeCompare(b);
        else result = a - b;
        return result;
    }
    return list.sort(compare);
}

function getStandings(league = null) {
    let url = `https://soccer-api.api.vinasports.com.vn/api/v1/publish/leagues/ranking?league_id=${league}`;
    var standings = "";
    $.ajax({
        async: false,
        type: "get",
        url: url,
        success: function (resp) {
            $("#list-standings").empty();
            standings += `<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:border-gray-700">`;
            $.each(resp.data.ranks, function (i, e) {
                standings += `<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-3 text-center"></th>
                                    <th scope="col" class="py-3 px-3 text-center"></th>
                                    <th scope="col" class="py-3 px-3 text-center">
                                        <span class="md:hidden">P</span>
                                        <span class="hidden md:block">Played</span>
                                    </th>
                                    <th scope="col" class="py-3 px-3 text-center">
                                        <span class="md:hidden">W</span>
                                        <span class="hidden md:block">Won</span>
                                    </th>
                                    <th scope="col" class="py-3 px-3 text-center">
                                        <span class="md:hidden">D</span>
                                        <span class="hidden md:block">Drawn</span>
                                    </th>
                                    <th scope="col" class="py-3 px-3 text-center">
                                        <span class="md:hidden">L</span>
                                        <span class="hidden md:block">Lost</span>
                                    </th>
                                    <th scope="col" class="py-3 px-3 text-center">
                                        <span class="md:hidden">GD</span>
                                        <span class="hidden md:block">Goals Diference</span>
                                    </th>
                                    <th scope="col" class="py-3 px-3 text-center">
                                        <span class="md:hidden">Pst</span>
                                        <span class="hidden md:block">Points</span>
                                    </th>
                                </tr>
                            </thead>
                        <tbody>`;
                $.each(e.team_ranks, function (i, se) {
                    let border = "border-white";
                    if (se.color == 0) {
                        border = "border-blue-500";
                    } else if (se.color == 1) {
                        border = "border-yellow-500";
                    } else if (se.color == 2) {
                        border = "border-green-500";
                    } else if (se.color >= 3) {
                        border = "border-red-500";
                    }
                    standings += `
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                            <td scope="row" class="${border} border-l-4 border-5 px-2 text-center border-left-2">${se.team_rank}</td>
                            <th scope="row" class="py-4 px-3 flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <img class="h-5" src="${se.team_logo}" alt="">
                                <span class="px-2">${se.team_name}</span>
                            </th>
                            <td class="py-4 px-3 text-center">
                                ${se.total_count}
                            </td>
                            <td class="py-4 px-3 text-center">
                                ${se.win_count}
                            </td>
                            <td class="py-4 px-3 text-center">
                                ${se.draw_count}
                            </td>
                            <td class="py-4 px-3 text-center">
                                ${se.lose_count}
                            </td>
                            <td class="py-4 px-3 text-center">
                                ${se.goal_difference}
                            </td>
                            <td class="py-4 px-3 text-center">
                                ${se.integral}
                            </td>
                        </tr>`;
                });
                standings += `</tbody>`;
            });
            standings += `</table>`;
            $("#list-standings").append(standings);
        },
        error: function (res) {
            swal("Oops", "Something went wrong!", "error");
        },
    });
}

function getData(date = null, live = false) {
    if (live) {
        $("#all").trigger("click");
    }
    var text = "";
    var html = "";
    var htmlTemp = "";
    var commentators;
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var dateLink = `${year}${pad(month)}${pad(day)}`;
    var hlsUrls = [];
    var url = `https://api.vebo.xyz/api/match/fixture/home/${dateLink}`;
    if (date) {
        url = `https://api.vebo.xyz/api/match/fixture/home/${date}`;
    }
    $.ajax({
        url: url,
        async: false,
        beforeSend: function () {
            ShowLoading();
        },
        success: function (resp) {
            if (resp.data.length == 0) {
                html = `<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Data not found!</div>`;
                swal("Oops", "Data not found!", "error");
            }
            var lstMatch = sortObj(
                resp.data.filter((x) => x.sport_type == "football"),
                "timestamp"
            );
            text += `#EXTM3U x-tvg-url="" tvg-shift=0 m3uautoload=1` + "\n<br>";

            lstMatch = lstMatch.filter((x) => x.is_featured).concat(lstMatch.filter((x) => !x.is_featured));

            var array = lstMatch.map((x) => x.tournament.unique_tournament);
            var unique = [];
            var distinct = [];
            for (let i = 0; i < array.length; i++) {
                if (!unique[array[i].id]) {
                    distinct.push({
                        id: array[i].id,
                        name: array[i].name,
                        logo: array[i].logo,
                        is_featured: array[i].is_featured,
                        priority: array[i].priority,
                    });
                    unique[array[i].id] = 1;
                }
            }
            if (live) {
                var lstTournament = sortObj(distinct.filter((x) => x.is_featured)).concat(sortObj(distinct.filter((x) => !x.is_featured)));
                $("#tournament").empty();
                if (lstTournament.length > 0) {
                    $("#tournament").append(`
                        <button data-type="btn-filter" id="all" type="button" class="bg-blue-700 text-white flex min-w-min gap-2 items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none border-2">
                            <div class="whitespace-nowrap">All</div>
                        </button>
                    `);
                    $.each(lstTournament, function (i, e) {
                        $("#tournament").append(`
                            <button data-type="btn-filter" id="${e.id}" type="button" class="flex min-w-min gap-2 items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none border-2">
                                <img src="${e.logo}" class="object-contain" style="width: 30px; height: 30px;" alt="">
                                <div class="whitespace-nowrap pr-2">${e.name}</div>
                            </button>
                        `);
                    });
                }
            }
            $.each(lstMatch, function (i, e) {
                commentators = "";
                var link = `#EXTINF:-1 group-title="Trực tiếp" tvg-id="" tvg-logo="${e.tournament.logo}",${moment(e.date).format("DD/MM")} ${moment(e.timestamp).format("HH:mm")} ${e.name}`;
                var hls = "new.m3u8";
                var subUrl = `https://api.vebo.xyz/api/match/${e.id}/meta`;
                htmlTemp = "";
                html += `<button data-type="match" tournament="${e.tournament.unique_tournament.id}" class="relative flex flex-col justify-center items-center rounded-lg overflow-hidden mx-auto border-2 border-gray-300 shadow w-full ${e.timestamp <= new Date().valueOf() ? (e.is_featured ? "border-red-500" : "border-yellow-500") : ""}">
                        <div class="flex font-bold bg-gray-200 w-full p-2 justify-center items-center">
                            <img style="height: 32px; max-width: 50%;" class="object-contain" src="${e.tournament.logo}" alt="${e.tournament.name}" loading="lazy">
                            <span class="truncate px-3" title="${e.tournament.name}">${e.tournament.name}</span>    
                        </div>
                        <div class="flex justify-center items-center p-3 flex-grow w-full">
                            <div class="flex flex-col justify-start items-center h-full w-4/12">
                                <img class="object-contain" style="width: 64px; height: 64px;" src="${e.home.logo || e.tournament.logo}" loading="lazy">
                                <span class="text-center" title="${e.home.name}">${e.home.short_name}</span>
                            </div>
                            <div class="text-center flex-grow h-full">
                                <span class="font-bold text-3xl">${e.timestamp <= new Date().valueOf() ? e.scores.home + " - " + e.scores.away : " "}</span>
                                <div>${moment(e.date).format("DD/MM/YYYY")}</div>
                                <div>${moment(e.timestamp).format("HH:mm")}</div>
                            </div>
                            <div class="flex flex-col justify-start items-center h-full w-4/12">
                                <img class="object-contain" style="width: 64px; height: 64px;" src="${e.away.logo || e.tournament.logo}" loading="lazy">
                                <span class="text-center" title="${e.away.name}">${e.away.short_name}</span>
                            </div>
                            </div>
                        <div>@commentators_${e.id}</div>
                        <div class="flex gap-1 justify-center items-center flex-wrap">`;
                commentators = (e.commentators && e.commentators.map((x) => x.name).join("; ")) || [];
                if (e.is_live) {
                    $.ajax({
                        async: false,
                        url: subUrl,
                        beforeSend: function () {
                            ShowLoading();
                        },
                        success: function (resp) {
                            let lstQuality = ["nhà đài", "backup 1", "backup 2", "sd", "sd1", "sd2"];
                            $.each(resp.data.play_urls, function (si, se) {
                                commentators = resp.data.commentators || [];
                                commentators = commentators.map((x) => x.name).join(", ");
                                hls = se.url;
                                text += `${link} [${se.name}]` + "\n<br>";
                                text += hls + "\n<br>";
                                hlsUrls.push({ url: se.url, quality: se.name });
                                if (!lstQuality.includes(se.name.toLowerCase())) {
                                    htmlTemp += `<a href="${host}get-key.html?url=${se.url}&title=${e.home.short_name} - ${e.away.short_name} (${commentators})" target="_blank" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">${se.name}</a>`;
                                }
                            });
                        },
                        complete: function (m) {
                            CloseLoading();
                        },
                        error: function (res) {
                            CloseLoading();
                            swal("Oops", "Something went wrong!", "error");
                        },
                    });
                }
                html = html.replaceAll(`@commentators_${e.id}`, `<div class="py-2">${commentators && commentators.length > 0 ? `<b>BLV: </b><span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${commentators}` : commentators}</span></div>`);
                html += htmlTemp;
                html += `</div></button>`;
            });
            $("#match").html(html);
            $("button[data-type='btn-filter'].active").trigger("click");
            //document.write(text);
            $.each(sortObj(sortObj(hlsUrls, "url"), "quality"), function (index, item) {
                $("#test").append(`<div>
                    <div>#EXTINF:-1 group-title="Trực tiếp" tvg-id="" tvg-logo="https://tchiphuong.github.io/iptv/images/vebotv.png",VEBOtv ${index + 1} [${item.quality}]</div>
                    <a href="${item.url}" target="_blank">${item.url}</a>
                    </div>`);
            });
        },
        complete: function (m) {
            CloseLoading();
        },
        error: function (res) {
            CloseLoading();
            swal("Oops", "Something went wrong!", "error");
        },
    });
}
var btn = $("#button");

$(window).scroll(function () {
    if ($(window).scrollTop() > 60) {
        btn.addClass("show");
    } else {
        btn.removeClass("show");
    }
});

btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
});

function activeTab(element) {
    $(element)
        .parent()
        .find("button")
        .each(function (i, e) {
            if (e == element) {
                $(e).removeClass("text-gray-700 bg-white").addClass("text-white bg-indigo-700").find("span").addClass("text-white font-bold").removeClass("text-gray-700");
            } else {
                $(e).addClass("text-gray-700 bg-white").removeClass("text-white bg-indigo-700").find("span").removeClass("text-white font-bold").addClass("text-gray-700");
            }
        });

    let tabid = $(element).attr("target-tab");
    $('[data-type="tab-item"]').each(function () {
        $(this).hide(ShowLoading());
    });
    $("title").text($(element).text().trim());
    setTimeout(() => {
        $("#" + tabid).show(CloseLoading());
    }, 50);
    if ($(element).attr("target-tab") === "highlights") {
        getHighlights();
    }
}

function getHighlights(page = 1) {
    ShowLoading();
    let url = `https://api.vebo.xyz/api/news/xoilac/list/highlight/${page}`;
    $.ajax({
        async: false,
        url: url,
        beforeSend: function () {
            ShowLoading();
        },
        success: function (resp) {
            $("#first-highlights").empty();
            $("#list-highlights").empty();
            if (resp.data.highlight) {
                let url = `https://api.vebo.xyz/api/news/xoilac/detail/${resp.data.highlight.id}`;
                $.ajax({
                    async: false,
                    url: url,
                    beforeSend: function () {
                        ShowLoading();
                    },
                    success: function (resp) {
                        video_url = resp.data.video_url;
                    },
                    error: function (res) {
                        swal("Oops", "Something went wrong!", "error");
                    },
                    complete: function () {
                        CloseLoading();
                    },
                });
                $("#first-highlights").html(`
                    <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:items-start hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img class="object-cover w-full rounded-t-lg md:h-auto w-full md:w-1/2 lg:w-4/12 md:rounded-none md:rounded-l-lg object-cover" style="aspect-ratio: 16/9;" src="${resp.data.highlight.feature_image}" alt="${resp.data.highlight.name}" loading="lazy">
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <span>
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">${resp.data.highlight.name}</h5>
                                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${moment(resp.data.highlight.created_at).format("DD/MM/YYYY")}</span>
                                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${resp.data.highlight.name.split("|")[1]}</span>
                            </span>
                            <p class="mb-3 font-xs italic text-gray-700 dark:text-gray-400">${resp.data.highlight.description}</p>
                            <div>
                                <a href="${host}get-key.html?url=${video_url}&title=${resp.data.highlight.name.split("|")[0]}" target="_blank" class="flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    View
                                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                `);
            }
            $.each(resp.data.list, function (i, e) {
                let url = `https://api.vebo.xyz/api/news/xoilac/detail/${e.id}`;
                $.ajax({
                    async: false,
                    url: url,
                    beforeSend: function () {
                        ShowLoading();
                    },
                    success: function (resp) {
                        $("#list-highlights").append(`
                            <div class="bg-white border border-gray-200 rounded-lg shadow flex flex-col">
                                <img class="rounded-t-lg object-cover" src="${e.feature_image}" alt="${e.name}"" style="aspect-ratio: 16/9;" loading="lazy">
                                <div class="px-4 py-3 flex flex-col grow">
                                    <span>
                                        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" title="${e.name}">${e.name.split("|")[0]}</h5>
                                        <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${moment(e.created_at).format("DD/MM/YYYY")}</span>
                                        <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${e.name.split("|")[1]}</span>
                                    </span>
                                    <p class="mb-3 font-xs italic text-gray-700 grow">${e.description}</p>
                                    <a href="${host}get-key.html?url=${resp.data.video_url}&title=${e.name.split("|")[0]}" target="_blank" class="flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        View
                                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        `);
                    },
                    error: function (res) {
                        swal("Oops", "Something went wrong!", "error");
                    },
                    complete: function () {
                        CloseLoading();
                    },
                });
            });

            createPagination(resp);
        },
        error: function (res) {
            swal("Oops", "Something went wrong!", "error");
        },
        complete: function () {
            CloseLoading();
        },
    });
}

function changePage(page) {
    getHighlights(page);
}

function createPagination(resp) {
    ShowLoading();
    var currentPage = resp.data.page;
    var limit = resp.data.limit;
    var totalItems = resp.data.total;
    var totalPages = Math.ceil(totalItems / limit);

    var paginationHTML = "";

    var maxVisiblePages = 5;
    var halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);
    var startPage = Math.max(currentPage - halfMaxVisiblePages, 1);
    var endPage = Math.min(currentPage + halfMaxVisiblePages, totalPages);

    if (currentPage > 1) {
        paginationHTML += '<li><a href="#" class="h-10 w-10 flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' + (currentPage - 1) + ')"><span class="sr-only">Previous</span> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/> </svg></a></li>';
        paginationHTML += '<li><a href="#" class="h-10 w-10 flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onclick="changePage(1)">1</a></li>';
    }

    if (currentPage === 1) {
        paginationHTML += '<li><span class="h-10 flex px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">1</span></li>';
    }

    if (startPage >= 2) {
        paginationHTML += '<li><span class="h-10 w-10 flex px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</span></li>';
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
            if (i === currentPage) {
                paginationHTML += '<li><span class="h-10 flex px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">' + i + "</span></li>";
            } else {
                paginationHTML += '<li><a href="#" class="h-10 flex px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' + i + ')">' + i + "</a></li>";
            }
        }
    }
    if (endPage < totalPages - 1) {
        paginationHTML += '<li><span class="h-10 flex px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</span></li>';
    }

    if (currentPage === totalPages) {
        paginationHTML += '<li><span class="h-10 flex px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">' + totalPages + "</span></li>";
    }

    if (currentPage < totalPages) {
        paginationHTML += '<li><a href="#" class="h-10 w-10 flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' + totalPages + ')">' + totalPages + "</a></li>";
        paginationHTML += '<li><a href="#" class="h-10 flex items-center justify-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' + (currentPage + 1) + ')"><span class="sr-only">Next</span><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg><a></li>';
    }

    $("#pagination").html(paginationHTML);
}
