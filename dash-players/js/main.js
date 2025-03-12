$(document).ready(function () {
    $.ajax({
        url: "./db/channels.json",
        method: "GET",
        dataType: "json",
        success: function (channels) {
            const channelOptions = Object.keys(channels).map((channelId) => {
                return {
                    id: channelId,
                    text: channels[channelId].name,
                };
            });

            // Initialize Select2 with channels data
            $("#channelSelect").select2({
                placeholder: "Select channel",
                allowClear: true,
                data: channelOptions,
            });

            $("#channelSelect").on("change", function () {
                const selectedChannel = $(this).val();
                if (selectedChannel) {
                    const channelData = channels[selectedChannel];
                    $("#videoDescription").text(channelData.description);
                    initializePlayer("jwplayerDiv", channelData);
                }
            });

            // Initialize player with the first channel
            if (channelOptions.length > 0) {
                initializePlayer("jwplayerDiv", channels[channelOptions[0].id]);
            }
        },
        error: function (error) {
            console.error("Error fetching channels:", error);
        },
    });
});

function initializePlayer(containerId, channelData) {
    try {
        jwplayer(containerId).setup({
            playlist: [channelData],
            width: "100%",
            aspectratio: "16:9",
            controls: true,
            autostart: true,
            hlsjsConfig: {
                xhrSetup: function (xhr) {
                    xhr.setRequestHeader(
                        "User-Agent",
                        "ExoPlayerDemo/2.15.1 (Linux; Android 14) ExoPlayerLib/2.15.1",
                    );
                    xhr.setRequestHeader("Referer", "https://mywebsite.com");
                },
            },
        });
        document.title = `Đang phát ${channelData.name}`;
        console.log("The video has now been loaded!");
    } catch (error) {
        onError(error);
    }
}

function onErrorEvent(event) {
    onError(event.detail);
}

function onError(error) {
    console.error("Error code", error.code, "object", error);
    console.error("Detailed error information:", error);
}
