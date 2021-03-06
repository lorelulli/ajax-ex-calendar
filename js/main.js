$(document).ready(function () {

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);

    // Stampare il mese di Gennaio 2018
    // Tramite click stampare il mese successivo

    var dataIniziale = moment('2018-01-01');
    stampaGiorniMese(dataIniziale); // Inizializzazione Calendario
    stampaFestivi();
    var numeroMese = dataIniziale.format('M');

    $('.mese-succ').click(function () {
        var numeroMese = dataIniziale.format('M');
        if (numeroMese != 12) {

            dataIniziale.add(1, 'month');
            stampaGiorniMese(dataIniziale);

            console.log(numeroMese);
            stampaFestivi()

        }
        else {
            alert('puoi andare solo dietro')

        }
    });
    $('.mese-prec').click(function () {
        var numeroMese = dataIniziale.format('M');
        if (numeroMese != 1) {
            dataIniziale.subtract(1, 'month');
            stampaGiorniMese(dataIniziale);
            stampaFestivi()

        }
        else {
            alert('puoi solo andare avanti')
        }
    });


    function stampaFestivi() {

        var numeroMese = dataIniziale.format('M');

        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays',
            method: 'GET',
            data: {
                year: 2018,
                month: (numeroMese - 1)
            },
            success: function (data) {
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i];
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    $('.square p[data-day="' + dataFestivo + '"]').addClass('festivo').append(' - ' + nomeFestivo);
                }
            }
        });
    }

    function stampaGiorniMese(meseDaStampare) {
        $('.main-calendar').empty();
        var standardDay = meseDaStampare.clone();
        var giorniMese = meseDaStampare.daysInMonth();
        var nomeMese = meseDaStampare.format('MMMM');
        $('#nome-mese').text(nomeMese); // Aggiorniamo il nome del mese in top calendar
        for (var i = 1; i <= giorniMese; i++) {
            // $('#calendar').append('<li>' + i + ' ' + nomeMese + '</li>');
            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
                dataDay: standardDay.format('YYYY-MM-DD')
            }
            var templateFinale = templateGiorno(giornoDaInserire); // Stiamo popolando il template con i dati dell'oggetto
            $('.main-calendar').append(templateFinale);
            standardDay.add(1, 'day');
        }
    }

});
