$(document).ready(
  function(){

    $('#button-search').click(
      function(){
        // NOTE: resetto prima i risultati della ricerca precedente
        $('ul#film-lista li').remove();
        // NOTE: salvo ricerca dell'utente in una variabile
        var ricercaUtente = $('input#ricerca-utente').val();
        if (ricercaUtente == '') {
          alert('devi inserire il titolo del film o della serie')
        }else {
          searchMovies(ricercaUtente, 'movie');
          searchMovies(ricercaUtente, 'tv');
        }

      }
    );

    $("#ricerca-utente").keypress(function(event) {
      if (event.keyCode === 13) {
          $("#button-search").click();
      }
    });


    //----------------funzioni------------------//

    // NOTE: funzione per stampare : Titolo Titolo Originale Lingua Voto
    function printMovie(risultatiFilm, tipo) {
      for (var i = 0; i < risultatiFilm.length; i++) {
        var singoloFilm = risultatiFilm[i];
        console.log(singoloFilm);

        var source = $("#film-template").html();
        var template = Handlebars.compile(source);

        var context = {
          titolo: singoloFilm.title || singoloFilm.name,
          titoloOriginale: singoloFilm.original_title || singoloFilm.original_name,
          linguaOriginale:  lingua(singoloFilm.original_language),
          votoUtente: stella(singoloFilm.vote_average),
          filmSerie: tipo,
          urlPoster:poster(singoloFilm.poster_path),
          overview:singoloFilm.overview
        };
        var html = template(context);

        $('ul#film-lista').append(html);

      }
    }

    // NOTE: funzione search moovie con ajax
    function searchMovies(ricercaUtente, type) {

      if (type ==='movie') {
        var url = 'https://api.themoviedb.org/3/search/movie';
        var tipo = 'film';
      } else if (type ==='tv'){
        var url = 'https://api.themoviedb.org/3/search/tv';
        var tipo = 'serie tv';
      }

      $.ajax(
        {
          url: url,
          method: 'GET',
          data: {
            query: ricercaUtente,
            api_key: '6c40625b67632e6f2f71ea5452ce7f67',
            language: 'it-IT'
          },
          success: function(data){
            var risultatiFilm = data.results;
            // console.log(risultatiFilm);

            printMovie(risultatiFilm, tipo);
          },
          error:function(){
            alert('si è verificato un errore');
          }
        }

      );
    }

    // NOTE: funzione poster
    function poster(url){
      var img = '<img src="https://image.tmdb.org/t/p/w342' + url + '" alt="">';
      return img;
    }

    // NOTE: funzione immagine lingua o se non c'è lingua normale
    function lingua(lingua){
      var arrayDisponibili = [ 'it', 'es', 'en']
      if (arrayDisponibili.includes(lingua)) {
        var img = '<img src="img/'+ lingua +'.png" alt="it">';
      }else {
        var img = lingua;
      }

      return img;
    }

    // NOTE: funzione stelline
    function stella(voto) {
      var votoFrattoDue = voto / 2 ;
      var stelleDaStampare ='' ;

      for (var i = 0; i < 5; i++) {
        if (votoFrattoDue > i) {
          stelleDaStampare += '<i class="fas fa-star"></i> ';
        }else {
          stelleDaStampare += '<i class="far fa-star"></i> ';
        }
      }
      return stelleDaStampare;
    }
  }
);
