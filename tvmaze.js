/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  
  let response = await axios.get(`https://api.tvmaze.com/search/shows?q=girls`, {params: {q : `${query}`}})
  
  let responseArray = response.data.map((obj) => {
    return {
      id: obj.show.id,
      name: obj.show.name,
      summary: obj.show.summary,
      image: obj.show.image.original
    }
    $( document ).ready(function() {
      $(document).ajaxError(function(){
        alert("An error occurred!");
      });
  });
  })
 

 


  return responseArray
   
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
            
             <img class="card-img-top" src="${show.image}" onerror = "this.src='https://tinyurl.com/tv-missing'">
             <p class="card-text">${show.summary}</p>
             <button  class="btn btn-info episodeButton" id="${show.id}">Episodes</>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();
  $('#episodes-list').empty()
  $('#episodes-area').css({'display': 'none'})
  let query = $("#search-query").val();
  
  if (!query) return;

  // $("#episodes-area").hide();

  let shows = await searchShows(query);
  
  populateShows(shows);

  $('.episodeButton').on('click', function(e){
    getEpisodes(e.currentTarget.id)
  })
  
  
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(idd) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above

  const episodeData = await axios.get(`http://api.tvmaze.com/shows/${idd}/episodes`)
  console.log(episodeData.data)

  const extractedEpisodeData = episodeData.data.map(obj => {
    const {id, name, season, number} = obj
    return {id, name, season, number}
  })
  
  
  populateEpisodes(extractedEpisodeData)
  
}

function populateEpisodes(datos){
   $('#episodes-list').empty()
  console.log(datos)
  $('#episodes-area').css({'display': ''})
  if($('#episodes-list').html() === ''){
    datos.forEach(info => {
      $(`<li>${info.name}, season: ${info.season}, episode: ${info.number}</li>`).appendTo('#episodes-list')
    })
  }
  
  
}
