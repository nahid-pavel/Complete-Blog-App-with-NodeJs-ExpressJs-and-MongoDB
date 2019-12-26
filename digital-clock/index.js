const clock = document.getElementById('clock');

function getTime(){

    let date = new Date();

    let h = date.getHours();
    h = h % 12
    let m = date.getMinutes();
    let s = date.getSeconds();

    if( s < 10 ){
        s= `0${s}`
    }
    if(m < 10){
        m= `0${m}`
    }

    let output =`
      <span>${h}</span>:
      <span>${m}</span>:
      <span>${s}</span>

    
    `

    clock.innerHTML= output



}


setInterval(getTime,1000)