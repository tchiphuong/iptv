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
        // const resp = await $.ajax({
        //     url: "https://soccer-api.api.vinasports.com.vn/api/v1/publish/leagues",
        //     beforeSend: function () {
        //         ShowLoading();
        //     },
        // });

        // var cbbdata = sortObj(resp.data, "order_number")
        //     .filter((item) => item.sport_type === 1 && item.app_display)
        //     .map((item) => ({
        //         id: item.league_sync_id,
        //         text: item.name,
        //         logo: item.logo,
        //     }));

        var cbbdata = [
            {
                id: "PL",
                text: "Premier League",
                logo: "data:image/png;base64,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",
            },
            {
                id: "PD",
                text: "La Liga",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAABDhJREFUaIHtmF2IVGUYx3//d3bcdSmkm7SQMCMEifI66sI9gzqzBRXSB1hkXURUGgUVUgiJUF0URVBERhGFF0ou657ZbM5ECCqE6IVLXURpZCGUgWSiu/M+Xawfm3PeM2fnrAQxPxiY4fn6v2ee55zzvtCjR48ePXr0+O9Q0QQ2HG0F3QlMpZjLmB1WnDwTiH0WtBY4F0jfD9bUWPJKqH7f7CXPEFCNopaxqRS4DGe9p3/e4IOpscPR8knjrXLGJZz0RrmvfH+WBpdfbhs6Y75RUroCA/rFoxrZfTwQfqAciL0QXxb3aHQ8ED9N1/+A1SojWQ0oY1xx85NA7DbE1Vhm/BeKk5FOOrqaAatV1iE+Ddqxv91YshD4qz02WuXhS5dx9TFOKm5cR3g2LjLrFrLV0aIW9nG4NshbjRTxwALESJb4lhng7yaHeOimhfo0WoJSqk0gbx+p3vwmzWzD0S7QQFb6ErypuLkvr5xZtZBVo6dwejfswK+KG4uhvbutFj2GtK1DheMaSxbPRlPuFrI1Q8u8CIqfMgPvV5Emfjhacs4sU/xZ72Fg/u159Vwg/ww4tyPYuxJ98LLGmxOB6F3zXLjU9C1XG7Vz98+59Zwn1wxYNdqCuCXs4L9TnGxNNdUqW4DbsvLL2Kc4eSePlrbYTg5Wi1aYdCjkOOmtNa+eLAJ+b4utDq0w54KxAGdaLQbHv+76laZTC5UQo6Hs009LW0+KeMDhNJ6lzJsx37l78wgNkbkAq0WbQMG7gmBMcTP1gWa16EPQwuzi+kxxsiuf1FCOLMTaDOsfGmvclWaw6tB9HtZn5jZ+U9xY11FhBzoNcZb9lA1X9szw6QMGMDuI9HjWlWmZUfK2ajZCuxEI8AuwPGC78fwHJPB2DPPrcHoVKAczCkrGGxpvHulCbxvZLWT20qSFXxlt2meCqanVihtLkG4FreyQ87Di5MUutKaS5zb6As69TttC7CjeNqjeHAWwanRTS/wQ2h8ATJq1yrKbNdb8qZjsS+S6/1otSnBuaPqHP4HnadWTHf/2qRxD3BCuJGj5J1VP3i8iuC1tXkerVfZivKd64/N2W/Q2zm1o/5dmOtlXipM5GdyZFN/UV4fuMOf2ZiYyTituXA+cKlrvcorsiQFKOLcz+2kL4B/iCoiHgguwWvQacG12AftA8fSgXwkKLaBlPJLpYBxVnDxRpEYnCs3A6TUrbbCUvrsEwPgRcYILW1BDYH2gBRjbVW9sJv1ALDeFDrYGnTsCGfsEsRRYOv1dGIaMg+AfVj3/vjeLQgvA2OzFzk596M1wsF9mzytO9heqeRlzcTa6HemB1EMqCbz/FmOD6smBorXSKLwAAKtVvkcsu/gbkNkE3jZqvJnMRY0Qc7IA4Joz1aGT/c4hYwL8c4qbe+YodybFZuASfw5IFby/SvVmx/PMHj169Pj/8A8UInx6fvAc9QAAAABJRU5ErkJggg==",
            },

            {
                id: "SA",
                text: "Serie A",
                logo: "data:image/png;base64,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",
            },
            {
                id: "FL1",
                text: "Ligue 1",
                logo: "data:image/png;base64,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",
            },
            {
                id: "BL1",
                text: "Bundesliga",
                logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAA3NCSVQICAjb4U/gAAAAbFBMVEX////lpKWUlJTvysvPAADim5zceXvSBBXRAAD////7+PgAAAD27+/w6enIyMjos7ShoaHSAAzf39+5ubnV1dWqqqr13t9+fn7ilpfegYPWQ0ZWVlbaZ2lycnLjoKHYV1nUKC4tLS0iIiLTGCEB19wuAAAAAXRSTlP89O1mUQAAAelJREFUSInNlNuSqyAQRRVbpUEUBS/ROElm/v8fDxDHqMHEvEydXWVVML3ouwF+piD4T4Goiw+oi2agA7rU+vR4/TUDMU0folBCmXpEQw9QpvSC2FAf8QyAk420gCMAFK4OzDwJPQC4qyedDwDQYRMXzNlHvog2AFyM2eQEvPZrwNTYJAps//41ACdsIKXX3QRMM9dAn5hr6clVCUynN32AuOjpKiTq6hQ6ICq+khSWjMuth6fGuSvuYlFsmzhBYF+FHuC8mmQmChu6BTJzPL0FXMXOblx6wQp4nqWS2kOTGUVGE9NE9/B80+r6EMGkaxzGoZ2v5j5aPqAxh+y3b3aTTPObKyxqsgZcI8S60VPefiAFgbbl70djBronDy8BOGWLHN4AZTmtXHgMKH+omxh22bPfLlBmlzlKwLecHsAWVHTwwny7cXa4XllvAKBm3F+bb0Pq31y/Brqdz+/ux7hIDqmYgQ/0V0BOSKVzrJnUWAeSSFYRoquWIEG0f7Q1ZkQ8AJLrISfIM87xxriQJCdZwCuBPEAlVcsEqpEsgHHIlcRbxnM5MI7VmPOBKT4iR1Q10fVgfvGlh+qWj4wb24H/emBV8C24ENaDdd5+62UOGmWrUKIgcw7KRE6IrFwOWmOl/rCsHwGf6h8XlUq0gNaV1AAAAABJRU5ErkJggg==",
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
                $("[data-type='match-detail']").each(function () {
                    var status = $(this).attr("data-status");
                    $(this).toggleClass(
                        "invisible opacity-0 hidden",
                        isChecked && status !== "live"
                    );
                });
                $("[data-type='match']").each(function () {
                    var $matchDetails = $(this).find("[data-type='match-detail']");
                    var tournamentAttribute = $(this).attr("tournament");
                    var allNonLive =
                        $matchDetails.filter("[data-status!='live']").length ===
                        $matchDetails.length;
                    $(this).toggleClass("invisible opacity-0 hidden", isChecked && allNonLive);
                    $(`#${tournamentAttribute}`).toggleClass(
                        "invisible opacity-0 hidden",
                        isChecked && allNonLive
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

            $buttons.removeClass("bg-blue-700 text-white active").addClass("bg-white");
            $(this).addClass("bg-blue-700 text-white active").removeClass("bg-white");
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

        CloseLoading(); // Đóng loading sau khi mọi thứ đã được xử lý
    } catch (error) {
        swal("Oops", "Something went wrong!", "error");
        CloseLoading(); // Đóng loading nếu có lỗi xảy ra
    }
})();

$(document).on("click", "#clear-date", function () {
    $("#date")[0]._flatpickr.clear();
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
                                            <th scope="col" class="py-3 px-3 text-center"></th>
                                            <th scope="col" class="py-3 px-3 text-center">
                                                <span class="md:hidden">P</span>
                                                <span class="hidden md:block">Played</span>
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
                        // e.team_ranks.forEach((se) => {
                        //     let border = "border-white";
                        //     if (se.color == 0) {
                        //         border = "border-blue-500";
                        //     } else if (se.color == 1) {
                        //         border = "border-yellow-500";
                        //     } else if (se.color == 2) {
                        //         border = "border-green-500";
                        //     } else if (se.color >= 3) {
                        //         border = "border-red-500";
                        //     }

                        standings += `
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
                                <td scope="row" class="border-l-4 border-5 px-2 text-center border-left-2">${e.position}</td>
                                <th scope="row" class="py-4 px-3 flex items-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <img class="h-5" src="${e.team.crestUrl}" alt="">
                                    <span class="px-2">${e.team.shortName}</span>
                                </th>
                                <td class="py-4 px-3 text-center">${e.playedGames}</td>
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
    var html = "";
    var htmlTemp = "";
    var dateObj = new Date();
    var month = dateObj.getMonth() + 1; //months from 1-12
    var day = dateObj.getDate();
    var year = dateObj.getFullYear();
    var dateLink = `${year}${pad(month)}${pad(day)}`;
    var url = `https://api.vebo.xyz/api/match/fixture/${dateLink}`;
    url = `https://api.vebo.xyz/api/match/featured`;
    url = `https://api.cakeo.xyz/match/live`;
    // if (date) {
    //     url = `https://api.vebo.xyz/api/match/fixture/${date}`;
    // }
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
            // var lstMatch = sortObj(
            //     resp.data.filter((x) => x.sport_type == "football"),
            //     "timestamp"
            // );

            var lstMatch = resp.data.filter((x) => x.sport_type == 1);

            console.log(lstMatch);
            lstMatch = lstMatch
                .filter((x) => x.is_featured)
                .concat(lstMatch.filter((x) => !x.is_featured));

            var array = lstMatch.map((x) => x.tournament);
            var unique = [];
            var distinct = [];
            for (let i = 0; i < array.length; i++) {
                if (!unique[array[i].model_id]) {
                    distinct.push({
                        model_id: array[i].model_id,
                        name: array[i].name,
                        logo: array[i].logo,
                        is_featured: array[i].is_featured,
                        priority: array[i].priority,
                    });
                    unique[array[i].model_id] = 1;
                }
            }
            var lstTournament = sortObj(distinct.filter((x) => x.is_featured)).concat(
                sortObj(distinct.filter((x) => !x.is_featured))
            );

            $("#tournament").empty();
            $("#featured").empty();
            var featured = "";
            if (lstTournament.length > 0) {
                $("#tournament").append(`
                        <button data-type="btn-filter" id="all" type="button" class="bg-blue-700 text-white sticky left-0 flex min-w-min gap-2 items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none border-2">
                            <div class="whitespace-nowrap">All</div>
                        </button>
                    `);
                //$.each(lstTournament, function (i, te) {
                for (let te of lstTournament) {
                    $("#tournament").append(`
                            <button data-type="btn-filter" id="${te.model_id}" type="button" class="flex min-w-min gap-2 items-center justify-center font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none border-2">
                                <img src="${te.logo}" class="object-contain" style="width: 30px; height: 30px;" alt="">
                                <div class="whitespace-nowrap pr-2">${te.name}</div>
                            </button>
                        `);
                    const lstMatchFiltered = lstMatch.filter(
                        (match) => match.tournament.model_id === te.model_id
                    );
                    for (let e of lstMatchFiltered) {
                        //     var subUrl = `https://api.vebo.xyz/api/match/${e.id}/meta`;
                        //     htmlTemp = "";
                        //     if (e.is_live && e.match_status !== "finished") {
                        //         $.ajax({
                        //             async: false,
                        //             url: subUrl,
                        //             beforeSend: function () {
                        //                 ShowLoading();
                        //             },
                        //             success: function (resp) {
                        let lstQuality = ["nhà đài", "backup 1", "backup 2", "sd", "sd1", "sd2"];
                        //lstQuality = ["backup 1", "backup 2"];
                        // for (let i = e.fansites.length - 1; i > -1; i--) {
                        //     console.log(e);
                        //     if (
                        //         !lstQuality.includes(
                        //             e.fansites[0].blv[0]?.links_stream[i].name.toLowerCase()
                        //         )
                        //     ) {
                        //         urlshls.push({
                        //             id: e.id,
                        //             time: `${moment(e.timestamp).format("HH:mm")} - ${moment(
                        //                 e.date
                        //             ).format("DD/MM/YYYY")}`,
                        //             title: `${e.home.short_name} - ${e.away.short_name}`,
                        //             quality: resp.data.play_urls[i].name,
                        //             url: resp.data.play_urls[i].url,
                        //         });
                        //     }
                        // }

                        if (e.fansites[0]?.blv[0]?.links_stream) {
                            for (let se of e.fansites[0].blv[0].links_stream) {
                                console.log(se);
                                if (!lstQuality.includes(se.name.toLowerCase())) {
                                    htmlTemp += `<a href="${host}get-key.html?url=${se.url}&title=${
                                        e.home.short_name
                                    } - ${e.away.short_name} (${
                                        (e.commentators &&
                                            e.commentators.map((x) => x.name).join("; ")) ||
                                        "..."
                                    })" target="_blank" class="text-white flex items-center gap-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1">
                                            ${se.name}
                                            </a>`;
                                }
                            }
                        }
                        //         },
                        //         complete: function (m) {
                        //             CloseLoading();
                        //         },
                        //         error: function (res) {
                        //             CloseLoading();
                        //             swal("Oops", "Something went wrong!", "error");
                        //         },
                        //     });
                        // }
                        const borderColor = e.is_live
                            ? e.is_featured
                                ? "border-red-500"
                                : "border-yellow-500"
                            : "";
                        html += `
                            <div class="group relative flex overflow-hidden rounded-md border ${borderColor} bg-white shadow ${
                            borderColor !== ""
                                ? `
                                        hover:shadow-xl
                                    `
                                : ""
                        }" data-type='match-detail' data-status="${e.match_status}">
                                <div class="flex w-full flex-col">
                                <div class="flex w-full gap-2 p-3">
                                    <div class="flex flex-1 flex-col gap-3 pr-2">
                                    <div class="flex items-center gap-2">
                                        <img class="h-10 w-10 object-contain" src="${
                                            e.home.logo || e.tournament.logo
                                        }" loading="lazy" onerror="this.onerror=null; this.src='https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png';"/>
                                        <div class="flex-1 line-clamp-1" title="${e.home.name}">${
                            e.home.name
                        }</div>
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
                                    <div class="flex items-center gap-2">
                                        <img class="h-10 w-10 object-contain" src="${
                                            e.away.logo || e.tournament.logo
                                        }" loading="lazy" onerror="this.onerror=null; this.src='https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png';"/>
                                        <div class="flex-1 line-clamp-1" title="${e.away.name}">${
                            e.away.name
                        }</div>
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
                                        <span>${moment(e.date).format("DD/MM/YYYY")}</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <!-- clock icon by Free Icons (https://free-icons.github.io/free-icons/) -->
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
                                        <path d="M 464 256 Q 464 313 436 360 L 436 360 L 436 360 Q 409 407 360 436 Q 311 464 256 464 Q 201 464 152 436 Q 103 407 76 360 Q 48 313 48 256 Q 48 199 76 152 Q 103 105 152 76 Q 201 48 256 48 Q 311 48 360 76 Q 409 105 436 152 Q 464 199 464 256 L 464 256 Z M 0 256 Q 1 326 34 384 L 34 384 L 34 384 Q 68 442 128 478 Q 189 512 256 512 Q 323 512 384 478 Q 444 442 478 384 Q 511 326 512 256 Q 511 186 478 128 Q 444 70 384 34 Q 323 0 256 0 Q 189 0 128 34 Q 68 70 34 128 Q 1 186 0 256 L 0 256 Z M 232 120 L 232 256 L 232 120 L 232 256 Q 232 269 243 276 L 339 340 L 339 340 Q 358 351 372 333 Q 383 314 365 300 L 280 243 L 280 243 L 280 120 L 280 120 Q 278 98 256 96 Q 234 98 232 120 L 232 120 Z" />
                                        </svg>
                                        <span>${moment(e.timestamp).format("HH:mm")}</span>${
                            e.is_live && e.match_status === "live"
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
                                        <span>${
                                            (e.fansites[0]?.blv &&
                                                e.fansites[0]?.blv
                                                    .map((x) => x.name)
                                                    .join("<br/>")) ||
                                            "..."
                                        }</span>
                                    </div>
                                    </div>
                                </div>
                                ${
                                    htmlTemp == ""
                                        ? ""
                                        : `<div class="mx-2 h-[1px] bg-gray-300"></div><div class="flex flex-wrap items-center px-1 py-2 font-bold z-10 gap-2 justify-center">
                                                ${htmlTemp}
                                            </div>`
                                }
                                </div>
                            </div>
                        `;
                    }
                    $("button[data-type='btn-filter'].active").trigger("click");

                    featured = `
                        <div data-type="match" tournament="${te.model_id}" class="mx-2">
                            <div class="flex cursor-pointer select-none items-center gap-2 rounded-md p-2 hover:opacity-80">
                                <img class="h-10" src="${te.logo}" alt="${te.name}" loading="lazy" onerror="this.onerror=null; this.src='https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-32.png';"/>
                                <h1 class="flex-1 py-2 text-xl font-bold">${te.name}</h1>
                            </div>
                            <div class="grid grid-cols-1 gap-2 py-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">${html}</div>
                        </div>`;
                    $("#featured").append(featured);
                    html = "";
                }
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
                let highlightUrl = `https://api.vebo.xyz/api/news/xoilac/detail/${highlightId}`;

                // Perform AJAX request to get detail of the first highlight
                $.ajax({
                    url: highlightUrl,
                })
                    .done(function (highlightResp) {
                        let videoUrl = highlightResp.data.video_url;
                        displayHighlight(resp.data.highlight, videoUrl, true);
                    })
                    .fail(function () {
                        showError();
                    })
                    .always(function () {
                        CloseLoading();
                    });
            }

            // Clear previous highlights before displaying new ones
            $("#first-highlights").empty();
            $("#list-highlights").empty();

            // Loop through other highlights and display them
            resp.data.list.forEach(function (highlight) {
                let highlightUrl = `https://api.vebo.xyz/api/news/xoilac/detail/${highlight.id}`;

                // Perform AJAX request to get detail of each highlight
                $.ajax({
                    url: highlightUrl,
                })
                    .done(function (detailResp) {
                        displayHighlight(highlight, detailResp.data.video_url);
                    })
                    .fail(function () {
                        showError();
                    })
                    .always(function () {
                        CloseLoading();
                    });
            });

            createPagination(resp);
        })
        .fail(function () {
            showError();
            CloseLoading();
        });
}

function displayHighlight(highlight, videoUrl, first = false) {
    let formattedDate = moment(highlight.created_at).format("DD/MM/YYYY");
    let [title, category] = highlight.name.split("|");

    let html = `
        <div class="bg-white border border-gray-200 rounded-lg shadow flex flex-col">
            <img class="rounded-t-lg object-cover" src="${highlight.feature_image}" alt="${highlight.name}" style="aspect-ratio: 16/9;" loading="lazy">
            <div class="px-4 py-3 flex flex-col grow">
                <span>
                    <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white" title="${title}">${title}</h5>
                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${formattedDate}</span>
                    <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">${category}</span>
                </span>
                <p class="mb-3 font-xs italic text-gray-700 grow">${highlight.description}</p>
                <a href="${host}get-key.html?url=${videoUrl}&title=${title}" target="_blank" class="flex items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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

function getM3u8() {
    let template = `#EXTINF:-1 group-title="Trực tiếp" tvg-id="vebomay1" tvg-logo="https://tchiphuong.github.io/iptv/images/bg/vebotv.png",VEBOtv 1
                    #EXTVLCOPT:http-referrer=https://xem.bdhub.xyz
                    https://obevcimanyd179249207.thapcam.link/live/may1FHD/playlist.m3u8#|Referer=https://xem.bdhub.xyz`;
    let result = "";
    console.log(urlshls);
    for (let item of urlshls) {
        result += `#EXTINF:-1 group-title="Trực tiếp" tvg-id="${item.id}" tvg-logo="https://tchiphuong.github.io/iptv/images/bg/vebotv.png",[${item.time}] - ${item.title}
        #EXTVLCOPT:http-referrer=https://xem.bdhub.xyz
        ${item.url}#|Referer=https://xem.bdhub.xyz
        `;
    }
    return result;
}
