const url = 'https://siamvisecure-jisan901.vercel.app/api/v1/comments';
function load_data() {
    fetch(url)
.then(res=>res.json())
.then(data => {
    document.querySelector(".comments").innerHTML=''
    data.forEach((dat)=>{
        
    document.querySelector(".comments").innerHTML+=`
    <div class="comment">
        <h4 class="title">${dat.title}</h4>
                <p class="desc">
                    ${dat.desc}
                </p>
    </div>`
    })
})
}

function popup(pop){
    let div=document.createElement('div')
    
    div.innerText=pop
    div.classList.add('pop-up')
    document.body.appendChild(div)
    setTimeout(function() {
        document.body.removeChild(div)
    }, 2000);
}

 document.querySelectorAll(".cp-2").forEach(e=>{
     e.onclick=function(){
         popup('copied')
     }
 })

document.getElementById('form').onsubmit=(event)=>{
    event.preventDefault()
    const title = event.target.title.value
    const desc = event.target.desc.value
    event.target.reset()
    fetch(url,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({title,desc})
    })
    .then(res=>{
        load_data()
    })
}

load_data()