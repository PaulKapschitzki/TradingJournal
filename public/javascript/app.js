// alert("Hi from app.js");
$(document).ready(() => {
    // $.getJSON("/api/trades")
    // /*.then(function(data) {
    //     console.log(data);
    // })*/
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(function(err) {
    //     console.log(err);
    // });

    // Show trade info for all previous trades
    $('#showAllTrades').on('click', () => {
        // console.log('New Trade-Button CLICKED');
        window.open(
            '/api/trades/all_trades',
            '_self'
        );
    });
    
    // Open entry form for new trade in new window
    $('#newTrade').on('click', () => {
        // console.log('New Trade-Button CLICKED');
        window.open(
            '/api/trades/create',
            'New Trade Entry',
            'menubar=yes,location=yes,resizable=no,scrollbars=yes,status=yes'
        );
    });
});