$(function () {
    $(document).ajaxStart(function () {
        ShowLoading();
    });

    $(document).ajaxComplete(function () {
        CloseLoading();
    });
});

function ShowLoading() {
    $("#spin").show();
}

function CloseLoading() {
    $("#spin").hide();
}
