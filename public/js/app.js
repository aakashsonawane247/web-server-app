
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgLocation = document.querySelector('#msg-1')
const msgWeather = document.querySelector('#msg-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)

    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msgLocation.textContent = data.error
            }else{
                msgLocation.textContent = data.location
                msgWeather.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})