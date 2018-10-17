
const API_URL = 'https://cors.io/?http://date.nager.at/api/v1/get'; // Using cors.io to temporarily avoid CORS errors

function httpGet(query) {
    var request = new XMLHttpRequest();
    request.open('GET', API_URL + '/' + query + '/2018');

    request.onreadystatechange = function () {
        $('tbody').empty();
        if (this.readyState === 4) {
            let holidays = JSON.parse(this.response);
            holidays.forEach(holiday => {
                let dayElement = $('<tr></tr>')
                    .append($('<td></td>', { text: holiday.name }))
                    .append($('<td></td>', { text: holiday.localName }))
                    .append($('<td></td>', { text: holiday.date }));
                $('tbody').append(dayElement);
            });
        } else {
            $('#error').text(this.statusText);
        }
    };

    request.send();
}

function search() {
    let input = $('#searchInput');
    let query = input.val();
    input.val('');
    console.log('Searching for:', query);
    httpGet(query);
}

$(document).ready(function () {

    $('#searchForm').submit(function (e) {
        e.preventDefault();
        search();
    });
});