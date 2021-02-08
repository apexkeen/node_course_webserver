console.log(' JS file from JS folder')

//  fetch("http://puzzle.mead.io/puzzle").then( (response)=>{
//     response.json().then((data) => {
//         console.log('data', JSON.stringify(data));
//   })
// })

// fetch('http://localhost:3000/weather?address=London').then((response)=>{
//     response.json().then((data)=>{
//          if (data.error){
//             console.log('There is an error in calling=',data.error)
//            } else{

//             console.log(data.forecast);
//             console.log( data.location);
//          }

//     })
// })



const myform= document.querySelector('form');
const searchElement  = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
window.addEventListener('submit', (e)=>{
  e.preventDefault();
   const location = searchElement.value;
  console.log('location=', location)
  if(location == undefined || location == ''){
     // alert('location undefined');
     msg1.innerHTML = 'Location not provided';
      return;
  }

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msg1.innerHTML = data.error;
                msg2.textContent = ''
            } else {
                //console.log(data[0].forecast)
                //console.log(data[0].temperature)
                msg1.textContent = ''
                msg2.innerHTML = 'Forcast is:' + data[0].forecast + ' and temperature = ' + data[0].temperature;
            }
        })
    })

})


