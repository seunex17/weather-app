const form = document.querySelector('form');
const input = document.querySelector('#locateSearch');
const load = document.querySelector('#load');
const rest = document.querySelector('#rest');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = input.value
    load.innerHTML = '<div class="result"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>'
    rest.innerHTML = ''
    fetch('/weather?address='+encodeURIComponent(location)).then((res) => {
        res.json().then((data) => {
            if(data.error)
            {
                return load.innerHTML = '<div class="result text-danger text-center"><h2>'+data.error+'</h2></div>'
            }

            //* Show the location
            load.innerHTML = '<div class="result"><h2 class="text-center">'+data.location+'</h2></div>'
            rest.innerHTML = '<div class="result"><h6 class="text-center">Result: <hr>It is Currenty: <strong class="text-danger">'+data.temps+'</strong> degree Tempreture. The weathe is <stong class="text-info">'+data.summery+'</stong> And there is <strong class="text-info">'+data.rainProb+'% </strong>Possibility of Rain. Meanwhile there is <strong class="text-danger">'+data.dailySum+'</strong>. This location uses <strong class="text-primary">'+data.tz+'</strong> TimeZone. Thank You!<hr> Do you Want More Info please Let <strong>Zubdev</strong> knows the type of info!</h6></div>'
            
        })
    })
})