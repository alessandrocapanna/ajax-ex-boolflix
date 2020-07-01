$(document).ready(
  function(){

    $('button').click(
      function(){
        // NOTE: resetto prima i risultati della ricerca precedente
        $('ul#film-lista li').remove();
        // NOTE: salvo ricerca dell'utente in una variabile
        var ricercaUtente = $('input#ricerca-utente').val().toString();

        searchPrintMovie(ricercaUtente);
      }
    );


    //----------------funzioni------------------//


    // NOTE: funzione search moovie con ajax
    function searchPrintMovie(ricercaUtente) {
      $.ajax(
        {
          url:'https://api.themoviedb.org/3/search/movie',
          method: 'GET',
          data: {
            query: ricercaUtente,
            api_key: '6c40625b67632e6f2f71ea5452ce7f67',
            language: 'it-IT'
          },
          success: function(data){
            var risultatiFilm = data.results;
            // console.log(risultatiFilm);

            printMovie(risultatiFilm);
          },
          error:function(){
            alert('si è verificato un errore');
          }
        }

      );
    }

    // NOTE: funzione per stampare : Titolo Titolo Originale Lingua Voto
    function printMovie(risultatiFilm) {
      for (var i = 0; i < risultatiFilm.length; i++) {
        var singoloFilm = risultatiFilm[i];

        var source = $("#film-template").html();
        var template = Handlebars.compile(source);

        var context = {
          titolo: singoloFilm.title,
          titoloOriginale: singoloFilm.original_title,
          linguaOriginale:  singoloFilm.original_language,
          votoUtente: singoloFilm.vote_average
        };
        var html = template(context);

        $('ul#film-lista').append(html);
      }
    }
  }
);
