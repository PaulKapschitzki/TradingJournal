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
    // $('#showAllTrades').on('click', () => {
    //     window.open(
    //         '/api/trades/all_trades',
    //         '_self'
    //     );
    // });
    
    // Open entry form for new trade in new window
    $('#newTrade').on('click', () => {
        // console.log('New Trade-Button CLICKED');
        window.open(
            '/api/trades/create',
            'New Trade Entry',
            'width=800px,height=1000px,top=200px,left=900px,toolbar=no,menubar=no,location=yes,resizable=no,scrollbars=yes,status=yes'
        );
    });

    $('.tradeTable').on('click', '.editRow', (event) => {
        console.log('Edit button was clicked');
        // updateTrade(this.parent);
        console.log(event.target.parentNode.parentNode.id);
        updateTrade(event.target.parentNode.parentNode.id);
    });

    $('.tradeTable').on('click', '.deleteTrade', (event) => {
        event.stopPropagation(); // stops the event from "bubbling up" or we can delete items without toggling them 'done' or not
        // removeTrade($(this).parent());
    });
});

const updateTrade = (tradeId) => {
    window.open(
        '/api/trades/' + tradeId,
        'Update Trade Entry',
        'width=800px,height=1000px,top=200px,left=900px,toolbar=no,menubar=no,location=yes,resizable=no,scrollbars=yes,status=yes'
    );
    //console.log(trade.data('closed'));
    var updateURL = '/api/trades/' + tradeId;
    $.ajax({
        method: 'PUT',
        url: updateURL,
        data: updateData
    })
    .then((updatedTrade) => {
        console.log(updatedTrade);
        // trade.toggleClass("done");
        // trade.data('closed', isOpen); // save current value for 'completed' in the invisable data property
    })
}

const removeTrade = (thisParent) => {
    //$(this).parent().remove();
    //var clickedId = $(this).parent().data('id'); // save id-data-attribute from addTodoToList function
    var clickedId = thisParent.data('id'); // save id-data-attribute from addTodoToList function
    var deleteURL = '' + clickedId + '/delete';
    console.log("clickedId = " + clickedId);
    
    $.ajax({
        method: 'DELETE',
        url: deleteURL
    })
    .then((data) => {
        console.log(data);
        thisParent.remove()// remove directly on click from trade list
    })
    .catch((err) => {
        console.log(err);
    })
}