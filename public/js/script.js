var delete_cookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
function callAjax(id, data, form = null) {
    var $ajax;
    switch (ajaxHandlers[id].type) {
        case "get":
            $ajax = $.get;
        break;
        case "post":
            $ajax = $.post;
        break;
    }
    if (form) {
        $(form).serializeArray().forEach(function(item){
            data[item.name] = item.value;
        });
    }
    var url = ajaxHandlers[id].url;
    console.log(url);
    console.log(data);
    for (var key in data) {
        url = url.replace(':'+key+':', data[key]);
    }
    if (ajaxHandlers[id].precall)
        ajaxHandlers[id].precall();
    console.log("Ajax request: "+url);
    $ajax(url, data).done(ajaxHandlers[id].callback);
}

$(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var id = $(this).attr("id");
    callAjax(id, {}, this);
});

function showError(error) {
    $("#notes").append('<div class="error">'+error.message+'</div>');
    setTimeout(function() {
        $("#notes>*").first().fadeOut("fast", function() {
            $("#notes>*").first().remove();
        });
    }, 5000);
}

$(document).ajaxError(function(e,jq,s,er) {
    showError(JSON.parse(jq.responseText));
});

$(document).on('click', '[rel=track]', function(e) {
    e.preventDefault();
    if ($(this).data("id"))
        callAjax("get_track_id", {
            id: $(this).data("id")
        });
    else
        callAjax("get_track", {
            name: $(this).data('name'),
            artist: $(this).data('artist')
        });
})

$(document).on('click', function() {
    $(".popup").hide();
});

$(document).on('click', '[rel=tab]', function(e) {
    e.preventDefault();
    var name = $(this).data("name");
    var container = $(this).parents(".tab-container").first();
    container.find(".tab-content").hide();
    container.find(".tab-content[data-name="+name+"]").show();
    container.find(".tab.active").removeClass("active");
    $(this).addClass("active");
});

$(document).on('click', '[rel=status]', function(e){
    e.preventDefault();
    callAjax('status', {
        status: $(this).data("id"),
        trackid: $(this).attr("data-trackid")
    });
})
