var ajaxHandlers = {
    auth: {
        type: "post",
        url: "/sessions",
        callback: function(data) {
            window.location.reload();
        }
    },
    reg: {
        type: "post",
        url: "/users",
        callback: function(data){
            window.location.reload();
        }
    }
};