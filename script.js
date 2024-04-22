
//Selezioni tutte le row dove mostrerò il contenuto di default
const artistiPresenti = document.querySelectorAll('.mostrarisultati');

function search(){
    
    //Prendo il valore 
    const input = document.getElementById('searchField').value;

        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`)
        //trasformo il risutat in json
        .then(response => response.json())
        .then(data => {
            // Estraggo i dati necessari dal JSON
            const canzoni = data.data;
            const container = document.getElementById('searchSection');
            canzoni.forEach(canzone => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <img src="${canzone.album.cover}" alt="${canzone.title}">
                <h3>${canzone.title}</h3>
                <p>${canzone.artist.name}</p>
                <p>${canzone.album.title}</p>
                `;
            container.appendChild(card);
            document.getElementById('found').classList.remove('d-none');
            });
        });
    
    artistiPresenti.forEach(artista => {
      //Estraggo da ogni risultato mi estraggo l'id dato che equivale al nome dell'artista
       let nomeArtista= artista.id;
       document.getElementById(nomeArtista).classList.add('d-none');
    });  
}

//Elaboro gli elementi che ho ottenuto
artistiPresenti.forEach(artista => {
    
    //Estraggo da ogni risultato mi estraggo l'id dato che equivale al nome dell'artista
     let nomeArtista= artista.id;
     
     //Inietto il nome dell'artista 
     fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${nomeArtista}`)
     
     //trasformo il risutati in oggetto
     .then(response => response.json())

      //Do un nome all'oggetto chiamandolo 'braniOttenuti' e lo elaboro
     .then(braniOttenuti => {

        //Dall'oggetto braniOttenuti prendo i "data"
        let canzoni = braniOttenuti.data;

        //Prendo il nome nomeArtista+'Section' e lo unisco ottenendo il nome dell'id
        let container = document.getElementById(nomeArtista+'Section');
        canzoni.forEach(canzone => {

          //Per ogni card elaboro il contenuto
          let card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <img src="${canzone.album.cover}" alt="${canzone.title}">
            <h3>${canzone.title}</h3>
            <p>${canzone.artist.name}</p>
            <p>${canzone.album.title}</p>
            `;
          container.appendChild(card);
          document.getElementById(nomeArtista).classList.remove('d-none');
        });
      })
});





document.getElementById('newlistbtn').addEventListener('click', function() {
  showSongsInModal('NomeArtistaQui'); // Sostituisco 'NomeArtistaQui' con il nome dell'artista desiderato
});

function showSongsInModal(nomeArtista) {
  const container = document.getElementById('playlistSongs');
  container.innerHTML = ''; // Pulisco il modale ad ogni apertura

  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem`)
      .then(response => response.json())
      .then(data => {
          data.data.forEach(song => {
              const card = document.createElement('div');
              card.classList.add('col-12', 'card-modal', 'my-4');
              card.innerHTML = `
                  <div class="media">
                    <img src="${song.album.cover}" class="mr-3" alt="${song.title}">
                    <div class="media-body">
                      <h5 class="mt-1 text-white">${song.title}</h5>
                      <p class="text-white">Artist: ${song.artist.name}</p>
                      <button class="addsong btn " onclick="addToPlaylist('${song.id}')">Aggiungi</button>
                    </div>
                  </div>
              `;
              container.appendChild(card);
          });
      }).catch(error => {
          console.error('Error fetching data: ', error);
          container.innerHTML = '<p>Errore nel caricamento delle canzoni.</p>';
      });
}


function addToPlaylist(songId) {
  console.log('Added song with ID:', songId);
}

function savePlaylist() {
  console.log('Playlist saved!');
}






