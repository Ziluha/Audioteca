var ajaxHandlers = {
    search_form: {
        type: "get",
        url: "/api/tracks",
        precall: function() {
            $("#search #results").html("");
            $("#search .fa-spin").show();
        },
        callback: function(data) {
            data.track.forEach(function(track){
                console.log(track);
                $("#search #results").append('<div class="result" rel="track" data-name="'+track.name+'" data-artist="'+track.artist+'">'+
                    '<img src="'+track.image[0]["#text"]+'">'+
                    '<span class="artist">'+track.artist+'</span>'+
                    '<span class="name">'+track.name+'</span>'+
                '</div>');
            });
            $("#search .fa-spin").hide();
            $("#search #results").show();
        }
    },
    get_track: {
        type: "get",
        url: "/api/tracks/:artist:/:name:",
        precall: function() {
            $("#content>.content").hide();
            $("#spinner").show();
        },
        callback: function(data){
            var artists = "";
            data.track.trackartist.forEach(function(artist) {
                artists += ((artists!="")?", ":"")+artist.name;
            })
            var genres = "";
            data.track.trackgenre.forEach(function(genre) {
                genres += ((genres!="")?", ":"")+genre.genre;
            })
            var reviews = {};
            $("#track img").attr("src", data.track.img);
            $("#track .artist").html(artists);
            $("#track .name").html(data.track.name);
            $("#track .playcount").html(data.track.playcount);
            $("#track .annotation").html(data.track.annotation);
            $("#track .genre").html(genres);
            $("#review .list").html("");
            $("#track textarea").val("");
            data.track.trackreview.forEach(function(review){
                 $('<div class="review" rel="review" data-id="'+review.id+'">'+
                    '<div class="text">&laquo'+review.review.text+'&raquo</div>'+
                    '<div class="profile"> - '+review.login+'</div>'+
                    '<div class="date">'+review.review.createdAt+'</div>'+
                '</div>').appendTo("#review .list");
            })
            $("#track .status").attr("data-trackid", data.track.id).removeClass("active");
            $("#track input[name=trackid]").val(data.track.id);
            if (data.track.trackstat.length>0)
                $("#track .status[data-id='"+data.track.trackstat[0].trackstat.status+"']").addClass("active");
            $("#track").show();
            $("#spinner").hide();
        }
    },
    get_my_tracks: {
        type: "get",
        url: "/api/trackstats",
        precall: function() {
            $("#content>.content").hide();
            $("#spinner").show();
        },
        callback: function(data) {
            var status = {
                "1":"notreading",
                "2":"reading",
                "3":"wanted",
                "4":"stopped"
            };
            var cnt = {};
            for (var key in status) {
                $("#"+status[key]+" .list").html("");
                cnt[status[key]] = 0;
            }
            data.tracks.forEach(function(track){
                console.log(track);
                var artists = "";
                track.trackartist.forEach(function(artist) {
                    artists += ((artists!="")?", ":"")+artist.name;
                })
                $('<div class="track" rel="track" data-id="'+track.id+'">'+
                    '<img src="'+track.img+'">'+
                    '<div class="artist">'+artists+'</div>'+
                    '<div class="name">'+track.name+'</div>'+
                '</div>').appendTo("#"+status[track.trackstat[0].trackstat.status]+" .list");
                cnt[status[track.trackstat[0].trackstat.status]]++;
            })
            for (var key in status) {
                $("#"+status[key]+" .count").html(cnt[status[key]]);
            }
            $("#main").show();
            $("#spinner").hide();
        }
    },
    status: {
        type: "post",
        url: "/api/trackstats/:trackid:",
        callback: function(data) {
            console.log(data);
            $("#track .status.active").removeClass("active");
            $("#track .status[data-id='"+data.status+"']").addClass("active");
        }
    },
    add_review: {
        type: "post",
        url: "/api/reviews",
        callback: function(data) {
            console.log(data);
            callAjax("get_track_id", {
                id: $("#track input[name=trackid]").val()
            });
        }
    },
    add_genre: {
        type: "post",
        url: "/api/genres",
        callback: function(data) {
            console.log(data);
            callAjax("get_track_id", {
                id: $("#track input[name=trackid]").val()
            });
        }
    }
};

ajaxHandlers.get_track_id = {};
Object.assign(ajaxHandlers.get_track_id, ajaxHandlers.get_track);
ajaxHandlers.get_track_id.url = "/api/tracks/:id:";

$(document).ready(function() {
    callAjax("get_my_tracks", {});
});

$(document).on("click", "#logo", function(e) {
    e.preventDefault();
    callAjax("get_my_tracks", {});
});

$(document).on("click", "#logout", function(e) {
    e.preventDefault();
    delete_cookie("token");
    window.location.reload();
});

$(document).on("click", ".add_genre", function(e) {
    e.preventDefault();
    $("#add_genre").toggle();
});