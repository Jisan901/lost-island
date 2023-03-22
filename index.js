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
                    <span><ion-icon class="de-1" data-delete="${dat.title}" name="trash-outline"></ion-icon></span>
                    <span class="span"><ion-icon class="cp-3" data-clip="${dat.desc}" name="clipboard-outline"></ion-icon></span>
                </p>
    </div>`
    document.querySelectorAll('.de-1').forEach(function(elm){
    elm.onclick=function(){
        fetch('https://siamvisecure-jisan901.vercel.app/delete/'+this.getAttribute('data-delete'))
        .then(re=>{load_data()})
    }
})
    document.querySelectorAll('.cp-3').forEach(function(elm){
    elm.onclick=function(){
        navigator.clipboard.writeText(this.getAttribute('data-clip'))
    }
})


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

