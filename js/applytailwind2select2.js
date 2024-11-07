function applyTailwind2Select2() {
    $(".select2-container").addClass("relative box-border align-middle inline-block m-0 mb-2");
    $(".select2-container.select2-selection--single").addClass(
        "box-border cursor-pointer block select-none shadow border rounded"
    );
    $(".select2-container.select2-selection--single.select2-selection__rendered").addClass(
        "block h-6 pl-1 pr-6 truncate"
    );
    $(".select2-container.select2-selection--single.select2-selection__clear").addClass(
        "relative -m-1"
    );
    $(".select2-container.select2-selection--multiple").addClass(
        "box-border overflow-hidden h-4 cursor-pointer block select-none"
    );
    $(".select2-container.select2-selection--multiple.select2-selection__rendered").addClass(
        "inline-block pl-2 truncate whitespace-nowrap"
    );
    $(".select2-container.select2-search--inline").addClass("float-left");
    $(".select2-container.select2-search--inline.select2-search__field").addClass(
        "box-border border dark: border-gray-600 pl-1 my-1 w-full text-base"
    );
    $(
        ".select2-container.select2-search--inline.select2-search__field::-webkit-search-cancel-button"
    ).addClass("appearance-none");
    $(".select2-dropdown").addClass(
        "absolute block w-auto box-border bg-white dark: bg-slate-700 border-solid border border-gray-200 z-50 float-left"
    );
    $(".select2-results").addClass("block text-black dark: text-gray-300");
    $(".select2-results__option").addClass("p-1 select-none");
    $(".select2-results__option[aria-selected]").addClass("cursor-pointer");

    $(".select2-container--open.select2-dropdown").addClass("mt-3 left-0");

    $(".select2-container--open.select2-dropdown--above").addClass(
        "rounded border-gray-400 dark: border-gray-700 shadow"
    );

    $(".select2-container--open.select2-dropdown--below").addClass(
        "rounded border-gray-400 dark: border-gray-700 shadow"
    );

    $(".select2-search--dropdown").addClass("block p-2");

    $(".select2-search--dropdown.select2-search__field").addClass(
        "h-10 p-1 bg-white dark: bg-slate-500 box-border rounded border-2 border-blue-300 dark:border-gray-700 dark:text-gray-200 outline-none"
    );

    $(".select2-search--dropdown.select2-search__field::-webkit-search-cancel-button").addClass(
        "appearance-none"
    );

    $(".select2-search--dropdown.select2-search--hide").addClass("hidden");

    $(".select2-close-mask").addClass("block w-12 min-w-full m-0 p-0");

    $(".select2-container--default.select2-selection--single").addClass(
        "p-2 h-10 bg-white dark: bg-slate-700 border border-solid dark:border-gray-700"
    );

    $(".select2-container--default.select2-selection--single.select2-selection__rendered").addClass(
        "text-gray-700 dark: text-gray-200"
    );

    $(".select2-container--default.select2-selection--single.select2-selection__clear").addClass(
        "cursor-pointer float-right text-red-700"
    );

    $(
        ".select2-container--default.select2-selection--single.select2-selection__placeholder"
    ).addClass("text-gray-600 dark: text-gray-300");

    $(".select2-container--default.select2-selection--single.select2-selection__arrow").addClass(
        "absolute right-0 top-0 h-10 w-8"
    );

    $(".select2-container--default.select2-selection--single.select2-selection__arrow b").addClass(
        "absolute border-solid h-0 w-0 border-t-4 border-r-4 border-b-0 border-l-4"
    );

    $(
        ".select2-container--default[dir='rtl'].select2-selection--single.select2-selection__clear"
    ).addClass("float-left ml-4");

    $(
        ".select2-container--default[dir='rtl'].select2-selection--single.select2-selection__arrow"
    ).addClass("left-0 right-auto");

    $(".select2-container--default.select2-container--disabled.select2-selection--single").addClass(
        "cursor-default bg-gray-300"
    );

    $(
        ".select2-container--default.select2-container--disabled.select2-selection--single.select2-selection__clear"
    ).addClass("hidden");

    $(".select2-container--default.select2-selection--multiple").addClass(
        "p-1 min-h-full h-full border border-solid dark: border-gray-700 rounded shadow bg-white dark:bg-slate-700"
    );

    $(
        ".select2-container--default.select2-selection--multiple.select2-selection__rendered"
    ).addClass("box-border list-none m-0 px-1 min-w-full");

    $(
        ".select2-container--default.select2-selection--multiple.select2-selection__rendered li"
    ).addClass("list-none");

    $(".select2-container--default.select2-selection--multiple.select2-selection__clear").addClass(
        "float-right cursor-pointer mt-1 mr-2 p-1"
    );

    $(".select2-container--default.select2-selection--multiple.select2-selection__choice").addClass(
        "bg-white dark: bg-slate-700 text-gray-700 dark:text-gray-200 border cursor-default rounded my-1 mr-1 px-2 float-left"
    );

    $(
        ".select2-container--default.select2-selection--multiple.select2-selection__choice__remove"
    ).addClass("text-gray-700 dark: text-gray-200 cursor-pointer inline-block mr-1");

    $(
        ".select2-container--default.select2-selection--multiple.select2-selection__choice__remove:hover"
    ).addClass("text-gray-700 dark: text-gray-200");

    $(".select2-container--default.select2-container--focus.select2-selection--multiple").addClass(
        "border-2 outline-none"
    );

    $(
        ".select2-container--default.select2-container--disabled.select2-selection__choice__remove"
    ).addClass("hidden");

    $(".select2-container--classic.select2-selection--multiple.select2-selection__choice").addClass(
        "bg-gray-300 border-2 dark: border-gray-700 shadow rounded float-left cursor-default mt-1 mr-1 px-1"
    );

    $(".select2-container--default.select2-search--dropdown.select2-search__field").addClass(
        "border-solid"
    );

    $(".select2-container--default.select2-search--inline.select2-search__field").addClass(
        "border-none bg-transparent outline-none shadow-none select-text"
    );

    $(".select2-container--default.select2-results>.select2-results__options").addClass(
        "h-full max-h-32 overflow-y-auto"
    );

    $(".select2-container--default.select2-results__option[role=group]").addClass("p-0");

    $(".select2-container--default.select2-results__option[aria-disabled=true]").addClass(
        "text-gray-700"
    );

    $(".select2-container--default.select2-results__option[aria-selected=true]").addClass(
        "bg-gray-300 dark: text-gray-700"
    );

    $(".select2-results__option--selected").addClass("hidden");

    $(".select2-container--default.select2-results__option--highlighted[aria-selected]").addClass(
        "bg-gray-100 dark: bg-gray-500 text-gray-700 dark:text-gray-200"
    );

    $(".select2-container--default.select2-results__group").addClass("cursor-default block");
}
