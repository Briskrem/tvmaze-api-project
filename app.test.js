
describe('api exists', () => {

    it('GET /info should return 200 response', (done) => {
        axios.get("https://api.tvmaze.com/search/shows?q=girls")
        .then((response) => {
            console.log(response.status);
            expect(response.status).toBe(200); 
            done()
        })
        ;
    })

    it('GET /info text', async () => {
        const response = await axios.get("https://api.tvmaze.com/search/shows?q=girls")
        console.log(response.data[0].show.name)
        console.log(response.data[0])
        // <p class="card-text">${show.summary}</p>
        $('#shows-list').append(`${response.data[0].show.name}`)
        expect( $('#shows-list').text()).toBe(response.data[0].show.name); 
        
        
    })

})