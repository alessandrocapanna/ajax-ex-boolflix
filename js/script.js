$(document).ready(
  function(){

    $('button').click(
      function(){
        // NOTE: resetto prima i risultati della ricerca precedente
        $('ul#film-lista li').remove();
        // NOTE: salvo ricerca dell'utente in una variabile
        var ricercaUtente = $('input#ricerca-utente').val().toString();
        if (ricercaUtente == '') {
          alert('devi inserire il titolo del film o della serie')
        }else {
          searchMovies(ricercaUtente);
        }

      }
    );


    //----------------funzioni------------------//


    // NOTE: funzione search moovie con ajax
    function searchMovies(ricercaUtente) {
      $.ajax(
        {
          url:'https://api.themoviedb.org/3/search/multi',
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

        if (singoloFilm.media_type !== 'person') {
          var source = $("#film-template").html();
          var template = Handlebars.compile(source);

          var context = {
            titolo: singoloFilm.title || singoloFilm.name,
            titoloOriginale: singoloFilm.original_title || singoloFilm.original_name,
            linguaOriginale:  lingua(singoloFilm.original_language),
            votoUtente: stella(singoloFilm.vote_average),
            filmSerie:filmSerie(singoloFilm.media_type),
            urlPoster:poster(singoloFilm.poster_path)
          };
          var html = template(context);

          $('ul#film-lista').append(html);
        }
      }
    }

    // NOTE: funzione poster
    function poster(url){
      var img = '<img src="https://image.tmdb.org/t/p/w185' + url + '" alt="">';
      return img;
    }

    // NOTE: funzione filmSerie
    function filmSerie(tipo) {
      var tipoDiContenuto = tipo;
      if(tipoDiContenuto === 'movie'){
        var tipoDiContenuto = 'film';
      }else if(tipoDiContenuto === 'tv'){
        var tipoDiContenuto = 'serie tv';
      }
      return tipoDiContenuto;
    }

    // NOTE: funzione immagine lingua o se non c'è lingua normale
    function lingua(lingua){
      if (lingua=== 'it') {
        var img = '<img src="img/it.png" alt="it">';
      }else if (lingua === 'en') {
        var img = '<img src="img/en.png" alt="en">';
      }else if (lingua === 'es') {
        var img = '<img src="img/es.png" alt="es">';
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
