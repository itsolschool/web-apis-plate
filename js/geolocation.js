$(function () {
    var mymap = L.map('mapid').setView([55.754156, 37.680834], 16);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmFub25vdGl0IiwiYSI6ImNrN3M2dmtqMzBkcXczb21yZjVpeGJkY28ifQ.2x99ZAvRsSItPbJn9PbaLw'
    }).addTo(mymap);


    const btn = $('#geolocation_btn');

    function renderBtn() {
        if (!"geolocation" in window) {
            btn
                .text('Браузер не поддерживает геолокацию')
                .disable()
                .addClass('btn-disabled')

        } else {
            btn.text('Показать меня на карте')
                .removeClass('btn-success btn-danger')
                .addClass('btn-info')
        }

    }

    btn.on('click', function () {

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            renderBtn()
            mymap.setView([latitude, longitude], 16)
            var marker = L.marker([latitude, longitude]).addTo(mymap);
        }

        function error() {
            btn.text('Геолокация сломалась')
        }

        btn.text('Получаем местоположение...')
        navigator.geolocation.getCurrentPosition(success, error);

    })

    renderBtn()
})

