var host = "https://tchiphuong.github.io/iptv/";
var urlshls = [];
$(document).ready(function () {
    const $ele = $("#tournament");
    $ele.css("cursor", "grab");

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function (e) {
        $ele.css("cursor", "grabbing");
        $ele.css("user-select", "none");

        pos = {
            left: $ele.scrollLeft(),
            top: $ele.scrollTop(),
            x: e.clientX,
            y: e.clientY,
        };

        $(document).on("mousemove", mouseMoveHandler);
        $(document).on("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e) {
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        $ele.scrollTop(pos.top - dy);
        $ele.scrollLeft(pos.left - dx);
    };

    const mouseUpHandler = function () {
        $ele.css("cursor", "grab");
        $ele.css("user-select", "");

        $(document).off("mousemove", mouseMoveHandler);
        $(document).off("mouseup", mouseUpHandler);
    };

    $ele.on("mousedown", mouseDownHandler);
});

(async function () {
    try {
        var cbbdata = [
            {
                id: "PL",
                text: "Premier League",
                logo: "https://stvinaprod.vtvcab.vn/1d862540-b0e4-417e-a9dc-b3ae9fdf0ef8.png?auto=format&fit=max&w=96",
            },
            {
                id: "PD",
                text: "La Liga",
                logo: "https://stvinaprod.vtvcab.vn/70316e8e-7d04-4c32-aee2-113b08c7406f.png?auto=format&fit=max&w=96",
            },

            {
                id: "SA",
                text: "Serie A",
                logo: "https://stvinaprod.vtvcab.vn/639f8feb-cd5e-429c-b96f-4f1e4a9836b7.png?auto=format&fit=max&w=96",
            },
            {
                id: "FL1",
                text: "Ligue 1",
                logo: "https://stvinaprod.vtvcab.vn/93cfba44-285c-4381-ad0e-73c18996c36b.png?auto=format&fit=max&w=96",
            },
            {
                id: "BL1",
                text: "Bundesliga",
                logo: "https://stvinaprod.vtvcab.vn/42ecbe34-3751-492c-981f-5afb96f71b39.png?auto=format&fit=max&w=96",
            },
        ];

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
            // minDate: moment().subtract(2, "days").format("YYYY-MM-DD"),
            locale: "vn",
            dateFormat: "d/m/Y",
            wrap: true,
            onChange: function (selectedDates, dateStr, instance) {
                // $("#btn-search").trigger("click");
            },
        });

        $(".shortcut-buttons-flatpickr-button").addClass(
            "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        );

        $("#btn-search").on("click", function () {
            const date = $("#date")[0]._flatpickr.selectedDates[0];
            if (date != undefined) {
                getData(moment(new Date(date)).format("YYYYMMDD"), true);
            } else {
                getData();
            }
        });

        $("#btn-search").trigger("click");

        $("#checked-live").on("change", function () {
            ShowLoading();
            setTimeout(() => {
                var isChecked = $(this).is(":checked");
                $("[data-type='match']").each(function () {
                    const isLive = $(this).attr("match-live") == "true";
                    const tournament = $(this).attr("tournament");
                    $(this).toggleClass("invisible opacity-0 hidden", isChecked && !isLive);
                    $(`[data-type="btn-filter"]#${tournament}`).toggleClass(
                        "invisible opacity-0 hidden",
                        isChecked && !isLive
                    );
                });
                $("button[data-type='btn-filter']#all").trigger("click");
                CloseLoading();
            }, 100);
        });

        $(document).on("click", "button[data-type='btn-filter']", function () {
            const id = $(this).attr("id");
            const $buttons = $("#tournament").find("button[data-type='btn-filter']").not(".hidden");
            const $matches = $("[data-type='match']");

            $buttons.removeClass("border-blue-700");
            $(this).addClass("border-blue-700");
            $matches.addClass("invisible opacity-0 hidden");

            if (id === "all") {
                $buttons.each(function () {
                    var btnId = $(this).attr("id");
                    $matches
                        .filter(`[tournament='${btnId}']`)
                        .removeClass("invisible opacity-0 hidden");
                });
            } else {
                $matches.filter(`[tournament='${id}']`).removeClass("invisible opacity-0 hidden");
            }
        });

        $(document).on("change", "#cbb-standings", function () {
            getStandings($(this).val());
        });

        CloseLoading();
    } catch (error) {
        swal("Oops", "Something went wrong!", "error");
        CloseLoading();
    }
})();

$(document).on("click", "#clear-date", function () {
    $("#date")[0]._flatpickr.clear();
});

function formatState(state) {
    if (!state.id) {
        return state.text;
    }
    var $state = $(`
        <div class="flex items-center">
            <img class="h-8 w-8 object-contain rounded-full" src="${state.logo}" />
            <span class="px-3">${state.text}</span>
        </div>`);
    return $state;
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
    url = `https://api.vieon.vn/backend/cm/v5/football/ratings?competition_code=${league}`;

    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: url,
            success: function (resp) {
                $("#list-standings").empty();
                let standings = "";

                standings += `<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:border-gray-700">`;
                standings += `<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="py-3 px-3 text-center"></th>
                                            <th scope="col" class="py-3 px-3 text-center w-full">Team</th>
                                            <th scope="col" class="py-3 px-3 text-center">
                                                <span class="md:hidden">P</span>
                                                <span class="hidden md:block">Played</span>
                                            </th>
                                            <th scope="col" class="py-3 px-3 text-center">
                                                <span class="md:hidden">GA</span>
                                                <span class="hidden md:block">Goals Against</span>
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
                if (resp) {
                    for (let e of resp) {
                        standings += `
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                                <td scope="row" class="border-l-4 border-5 px-2 text-center border-left-2">${e.position}</td>
                                <td scope="row" class="py-4 px-3 flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="h-5" src="${e.team.crestUrl}" alt="${e.team.tla}">
                                    <span class="px-2 line-clamp-1" title="${e.team.shortName}">
                                        <span class="md:hidden">${e.team.shortName}</span>
                                        <span class="hidden md:block">${e.team.name}</span>
                                    </span>
                                </td>
                                <td class="py-4 px-3 text-center">${e.playedGames}</td>
                                <td class="py-4 px-3 text-center">${e.goalsAgainst}</td>
                                <td class="py-4 px-3 text-center">${e.goalDifference}</td>
                                <td class="py-4 px-3 text-center">${e.points}</td>
                            </tr>`;
                    }
                }
                standings += `</tbody></table>`;

                $("#list-standings").append(standings);
                resolve();
            },
            error: function (res) {
                reject("Something went wrong!");
            },
        });
    });
}

function getData(date = null, live = false) {
    if (live) {
        $("#all").trigger("click");
    }
    const isFeatured = $("#checked-featured").is(":checked");
    var html = "";
    var htmlTemp = "";
    var dateLink = moment(new Date()).format("YYYYMMDD");
    var url = `https://api.vebo.xyz/api/match/fixture/${dateLink}`;
    url = `https://api.vebo.xyz/api/match/featured`;
    if (!isFeatured) {
        url = `https://live.vebo.xyz/api/match/live`;
    }
    if (date) {
        url = `https://api.vebo.xyz/api/match/fixture/${date}`;
    }
    $.ajax({
        url: url,
        //async: false,
        beforeSend: function () {
            ShowLoading();
        },
        success: function (resp) {
            if (resp.data.length == 0) {
                html = `<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span class="font-medium">Data not found!</div>`;
                swal("Oops", "Data not found!", "error");
            }
            var lstMatch = resp.data.filter((x) => x.sport_type == "football");
            lstMatch = lstMatch
                .filter((x) => x.is_featured)
                .concat(lstMatch.filter((x) => !x.is_featured));

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
            var lstTournament = sortObj(distinct.filter((x) => x.is_featured)).concat(
                sortObj(distinct.filter((x) => !x.is_featured))
            );

            $("#tournament").empty();
            $("#featured").empty();
            $("#match").empty();
            const statusTranslations = {
                finished: "Hết giờ",
                live: "Trực tiếp",
                pending: "",
                delay: "Hoãn lại",
                canceled: "Huỷ",
            };
            if (lstTournament.length > 0) {
                $("#tournament").append(`
                        <button data-type="btn-filter" id="all" type="button" class="border-blue-700 bg-white sticky left-0 flex min-w-min gap-2 items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none border-2">
                            <div class="whitespace-nowrap">All</div>
                        </button>
                    `);
                for (let te of lstTournament) {
                    $("#tournament").append(`
                            <button data-type="btn-filter" id="${te.id}" type="button" class="bg-white flex min-w-min gap-2 items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none border-2">
                                <img src="${te.logo}" class="object-contain" style="width: 30px; height: 30px;" alt="">
                                <div class="whitespace-nowrap pr-2">${te.name}</div>
                            </button>
                        `);
                }
                for (let e of lstMatch) {
                    htmlTemp = "";
                    if (e.is_live && e.match_status !== "finished") {
                    }
                    const borderColor = e.is_live
                        ? e.is_featured
                            ? "border-red-500"
                            : "border-yellow-500"
                        : "";
                    html += `<a href="${host}get-key.html?id=${e.id}&title=${
                        e.name
                    }&isLive=1" target="_blank" data-type="match" match="${e.id}" tournament="${
                        e.tournament.unique_tournament.id
                    }" match-live="${
                        (e.is_live && e.match_status === "live") || htmlTemp != ""
                    }" class="group relative flex overflow-hidden rounded-md border ${borderColor} bg-white  relative dark:bg-red-500 hover:shadow-md">
                            <div class="flex w-full flex-col">
                            <div class="px-3 mt-2 flex items-center gap-2">
                            <img class="object-contain w-9 h-9 p-1" src="${
                                e.tournament.logo
                            }" loading="lazy" onerror="this.onerror=null; this.src='./images/undefined.png';"/>
                            <div class="font-bold line-clamp-1 flex-1" title="${
                                e.tournament.name
                            }">${e.tournament.name}</div>
                            <span class="inline-flex items-center justify-center px-1.5 py-0.5 text-xs text-white bg-red-500 rounded-full">${
                                statusTranslations[e.match_status] ||
                                moment(e.timestamp).locale("vi").startOf("hour").fromNow()
                            }</span>
                        </div>
                                <div class="flex w-full gap-2 p-3">
                                    <div class="flex flex-1 flex-col gap-3 pr-2">
                                    <div class="flex items-center gap-2 justify-center">
                                        <img class="h-9 w-9 object-contain" src="${
                                            e.home.logo || e.tournament.logo
                                        }" loading="lazy" onerror="this.onerror=null; this.src='./images/undefined.png';"/>
                                        <div class="flex-1 line-clamp-1 text-sm" title="${
                                            e.home.name
                                        }">${e.home.short_name}</div>
                                        ${
                                            e.home_red_cards > 0
                                                ? `<img src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/red-card-right.svg" alt="" />`
                                                : ""
                                        }
                                        <span class="text-[20px] font-bold">${
                                            e.timestamp <= new Date().valueOf()
                                                ? e.scores.home
                                                : "-"
                                        }</span>
                                    </div>
                                    <div class="flex items-center gap-2 justify-center">
                                        <img class="h-9 w-9 object-contain" src="${
                                            e.away.logo || e.tournament.logo
                                        }" loading="lazy" onerror="this.onerror=null; this.src='./images/undefined.png';"/>
                                        <div class="flex-1 line-clamp-1 text-sm" title="${
                                            e.away.name
                                        }">${e.away.short_name}</div>
                                        ${
                                            e.away_red_cards > 0
                                                ? `<img src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/red-card-right.svg" alt="" />`
                                                : ""
                                        }
                                        <span class="text-[20px] font-bold">${
                                            e.timestamp <= new Date().valueOf()
                                                ? e.scores.away
                                                : "-"
                                        }</span>
                                    </div>
                                    </div>
                                    <div class="h-100 w-[1px] bg-gray-300"></div>
                                    <div class="flex flex-col justify-around">
                                    <div class="flex items-center gap-1">
                                        <!-- calendar-day icon by Free Icons (https://free-icons.github.io/free-icons/) -->
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M 160 0 Q 182 2 184 24 L 184 64 L 184 64 L 328 64 L 328 64 L 328 24 L 328 24 Q 330 2 352 0 Q 374 2 376 24 L 376 64 L 376 64 L 416 64 L 416 64 Q 443 65 461 83 Q 479 101 480 128 L 480 144 L 480 144 L 480 192 L 480 192 L 480 448 L 480 448 Q 479 475 461 493 Q 443 511 416 512 L 96 512 L 96 512 Q 69 511 51 493 Q 33 475 32 448 L 32 192 L 32 192 L 32 144 L 32 144 L 32 128 L 32 128 Q 33 101 51 83 Q 69 65 96 64 L 136 64 L 136 64 L 136 24 L 136 24 Q 138 2 160 0 L 160 0 Z M 432 192 L 80 192 L 432 192 L 80 192 L 80 448 L 80 448 Q 81 463 96 464 L 416 464 L 416 464 Q 431 463 432 448 L 432 192 L 432 192 Z M 144 256 L 240 256 L 144 256 L 240 256 Q 255 257 256 272 L 256 368 L 256 368 Q 255 383 240 384 L 144 384 L 144 384 Q 129 383 128 368 L 128 272 L 128 272 Q 129 257 144 256 L 144 256 Z" />
                                        </svg>
                                        <span class="text-sm">${moment(e.date)
                                            .locale("vi")
                                            .format("dd, DD/MM/YY")}</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <!-- clock icon by Free Icons (https://free-icons.github.io/free-icons/) -->
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M 464 256 Q 464 313 436 360 L 436 360 L 436 360 Q 409 407 360 436 Q 311 464 256 464 Q 201 464 152 436 Q 103 407 76 360 Q 48 313 48 256 Q 48 199 76 152 Q 103 105 152 76 Q 201 48 256 48 Q 311 48 360 76 Q 409 105 436 152 Q 464 199 464 256 L 464 256 Z M 0 256 Q 1 326 34 384 L 34 384 L 34 384 Q 68 442 128 478 Q 189 512 256 512 Q 323 512 384 478 Q 444 442 478 384 Q 511 326 512 256 Q 511 186 478 128 Q 444 70 384 34 Q 323 0 256 0 Q 189 0 128 34 Q 68 70 34 128 Q 1 186 0 256 L 0 256 Z M 232 120 L 232 256 L 232 120 L 232 256 Q 232 269 243 276 L 339 340 L 339 340 Q 358 351 372 333 Q 383 314 365 300 L 280 243 L 280 243 L 280 120 L 280 120 Q 278 98 256 96 Q 234 98 232 120 L 232 120 Z" />
                                        </svg>
                                        <span class="text-sm">${moment(e.timestamp).format(
                                            "HH:mm"
                                        )}</span>
                                        ${
                                            (e.is_live && e.match_status === "live") ||
                                            htmlTemp != ""
                                                ? `<img class="h-6" src="./images/live.gif">`
                                                : ""
                                        }
                                    </div>
                                    <div class="h-[1px] bg-gray-300"></div>
                                    <div class="flex items-center gap-1">
                                        <!-- microphone-lines icon by Free Icons (https://free-icons.github.io/free-icons/) -->
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
                                        <path
                                            d="M 304 128 L 304 160 L 304 128 L 304 160 L 272 160 L 272 160 Q 257 161 256 176 Q 257 191 272 192 L 304 192 L 304 192 L 304 224 L 304 224 L 272 224 L 272 224 Q 257 225 256 240 Q 257 255 272 256 L 304 256 L 304 256 Q 303 276 290 290 Q 276 303 256 304 Q 236 303 222 290 Q 209 276 208 256 L 208 96 L 208 96 Q 209 76 222 62 Q 236 49 256 48 Q 276 49 290 62 Q 303 76 304 96 L 272 96 L 272 96 Q 257 97 256 112 Q 257 127 272 128 L 304 128 L 304 128 Z M 160 96 L 160 256 L 160 96 L 160 256 Q 161 297 188 324 Q 215 351 256 352 Q 297 351 324 324 Q 351 297 352 256 L 352 96 L 352 96 Q 351 55 324 28 Q 297 1 256 0 Q 215 1 188 28 Q 161 55 160 96 L 160 96 Z M 128 216 Q 126 194 104 192 Q 82 194 80 216 L 80 256 L 80 256 Q 81 324 124 372 Q 166 420 232 430 L 232 464 L 232 464 L 184 464 L 184 464 Q 162 466 160 488 Q 162 510 184 512 L 256 512 L 328 512 Q 350 510 352 488 Q 350 466 328 464 L 280 464 L 280 464 L 280 430 L 280 430 Q 346 420 388 372 Q 431 324 432 256 L 432 216 L 432 216 Q 430 194 408 192 Q 386 194 384 216 L 384 256 L 384 256 Q 383 310 347 347 Q 310 383 256 384 Q 202 383 165 347 Q 129 310 128 256 L 128 216 L 128 216 Z" />
                                        </svg>
                                        <span class="text-sm line-clamp-1" title="${
                                            (e.commentators &&
                                                e.commentators.map((x) => x.name).join(", ")) ||
                                            "..."
                                        }">${
                        (e.commentators && e.commentators.map((x) => x.name).join("<br/>")) || "..."
                    }</span>
                                    </div>
                                    </div>
                                </div>
                                ${
                                    htmlTemp == ""
                                        ? ""
                                        : `<div class="flex flex-wrap items-center px-1 py-2 font-bold z-10 gap-2 justify-center absolute bottom-0 inset-x-0 live-url">
                                                ${htmlTemp}
                                            </div>`
                                }
                                </div>
                            </a>
                        `;
                }
                $("button[data-type='btn-filter'].active").trigger("click");
                $("#match").append(html);
            }
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
var windowObj = $(window);

windowObj.scroll(function () {
    btn.toggleClass("show", windowObj.scrollTop() > 60);
});

btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 300);
});

function activeTab(element) {
    const targetTab = $(element).attr("target-tab");
    const buttons = $(element).parent().find("button");

    buttons.each(function (i, e) {
        const isCurrentButton = e === element;
        $(e)
            .toggleClass("text-gray-700 bg-white", !isCurrentButton)
            .toggleClass("text-white bg-blue-700", isCurrentButton)
            .find("span")
            .toggleClass("text-white font-bold", isCurrentButton)
            .toggleClass("text-gray-700", !isCurrentButton);
    });

    $('[data-type="tab-item"]').hide(ShowLoading());
    $("title").text($(element).text().trim());

    setTimeout(() => {
        $("#" + targetTab).show(CloseLoading());
    }, 50);

    if (targetTab === "standings") {
        $("#cbb-standings").trigger("change");
    } else if (targetTab === "highlights") {
        getHighlights();
    }
}

function getHighlights(page = 1) {
    ShowLoading();
    let url = `https://api.vebo.xyz/api/news/xoilac/list/highlight/${page}`;

    // Perform AJAX request to get highlights
    $.ajax({
        url: url,
        beforeSend: function () {
            ShowLoading();
        },
    })
        .done(function (resp) {
            // Display highlight only if it's the first page
            if (page === 1 && resp.data.highlight) {
                let highlightId = resp.data.highlight.id;
                displayHighlight(resp.data.highlight, null, true);
            }
            $("#list-highlights").empty();
            // Loop through other highlights and display them
            resp.data.list.forEach(function (highlight) {
                displayHighlight(highlight, null);
            });

            createPagination(resp);
        })
        .fail(function () {
            showError();
            CloseLoading();
        });
}

function displayHighlight(highlight, videoUrl, first = false) {
    let formattedDate = moment(highlight.created_at).locale("vi").format("dd, DD/MM/YYYY");
    let [title, category] = highlight.name.split("|");

    let html = `
        <div class="bg-white border border-gray-200 rounded-lg shadow flex flex-col">
            <img class="rounded-t-lg object-cover" src="${highlight.feature_image}" alt="${
        highlight.name
    }" style="aspect-ratio: 16/9;" loading="lazy">
            <div class="px-4 py-3 flex flex-col grow">
                <span>
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" title="${title}">${title.replace(
        "Highlights ",
        ""
    )}</h5>
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${formattedDate}</span>
                    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${category}</span>
                </span>
                <p class="mb-3 font-xs italic text-gray-700 grow">${highlight.description}</p>
                <a href="${host}get-key.html?id=${
        highlight.id
    }&title=${title}" target="_blank" class="flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </div>
    `;

    if (first) {
        $("#first-highlights").html(html);
        $("#first-highlights").html(`
                <div class="bg-white border border-gray-200 rounded-lg shadow flex flex-col md:flex-row">
                <img class="rounded-l-lg object-cover w-full md:w-6/12 lg:w-4/12 xl:w-3/12" src="${
                    highlight.feature_image
                }" alt="${highlight.name}" style="aspect-ratio: 16/9;" loading="lazy">
            <div class="px-4 py-3 flex flex-col grow">
                <span>
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" title="${title}">${title.replace(
            "Highlights ",
            ""
        )}</h5>
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${formattedDate}</span>
                    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${category}</span>
                </span>
                <p class="mb-3 font-xs italic text-gray-700 grow">${highlight.description}</p>
                <a href="${host}get-key.html?id=${
            highlight.id
        }&title=${title}" target="_blank" class="flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </a>
            </div>
        </div>
            `);
    } else {
        $("#list-highlights").append(html);
    }
}

function showError() {
    swal("Oops", "Something went wrong!", "error");
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
        paginationHTML +=
            '<li><a href="#" class="h-10 w-10 flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' +
            (currentPage - 1) +
            ')"><span class="sr-only">Previous</span> <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/> </svg></a></li>';
        paginationHTML +=
            '<li><a href="#" class="h-10 w-10 flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onclick="changePage(1)">1</a></li>';
    }

    if (currentPage === 1) {
        paginationHTML +=
            '<li><span class="h-10 flex px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">1</span></li>';
    }

    if (startPage >= 2) {
        paginationHTML +=
            '<li><span class="h-10 w-10 flex px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</span></li>';
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i > 1 && i < totalPages) {
            if (i === currentPage) {
                paginationHTML +=
                    '<li><span class="h-10 flex px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">' +
                    i +
                    "</span></li>";
            } else {
                paginationHTML +=
                    '<li><a href="#" class="h-10 flex px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' +
                    i +
                    ')">' +
                    i +
                    "</a></li>";
            }
        }
    }
    if (endPage < totalPages - 1) {
        paginationHTML +=
            '<li><span class="h-10 flex px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">...</span></li>';
    }

    if (currentPage === totalPages) {
        paginationHTML +=
            '<li><span class="h-10 flex px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">' +
            totalPages +
            "</span></li>";
    }

    if (currentPage < totalPages) {
        paginationHTML +=
            '<li><a href="#" class="h-10 w-10 flex items-center justify-center px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' +
            totalPages +
            ')">' +
            totalPages +
            "</a></li>";
        paginationHTML +=
            '<li><a href="#" class="h-10 flex items-center justify-center px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700" onclick="changePage(' +
            (currentPage + 1) +
            ')"><span class="sr-only">Next</span><svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/></svg><a></li>';
    }

    $("#pagination").html(paginationHTML);
}
