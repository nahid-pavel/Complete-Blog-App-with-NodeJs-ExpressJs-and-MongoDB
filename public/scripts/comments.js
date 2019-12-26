window.onload = function(){
   
    const commentHolder = document.getElementById('comment-holder');

    
    commentHolder.addEventListener('keypress',function(e){
        if(commentHolder.hasChildNodes(e.target)){
            if(e.key==='Enter'){
                let commentId = e.target.dataset.comment;
                let value = e.target.value;
                if(value){
                    let data = {
                        body: value
                    }

                    let req = generateRequest(`/api/comments/replies/${commentId}`,'POST',data);
                    fetch(req)
                         .then(res=>res.json())
                         .then(data=>{
                             let replyElement = createReply(data);
                             let parent = e.target.parentElement;
                             parent.previousElementSibling.appendChild(replyElement);
                             e.target.value='';

                         })
                         .catch(e=>{
                             alert(e.message)
                         })

                }else{
                    alert('Please Enter a valid reply')
                }
            }

        }

    })

}


function generateRequest(url,method,body){
    let headers = new Headers();
    headers.append('Accept','Application/JSON')
    headers.append('Content-Type','Application/JSON')

    let req = new Request(url,{
        method,
        headers,
        body: JSON.stringify(body),
        mode:'cors'
    });

    return req;
        
}



function createReply(reply){
    let innerHTML=`
    <img src="${reply.profilePics}" class="rounded-circle mx-3 my-3" style="width:40px;">
    <div class="media-body my-3">
     <p>${reply.body}</p>
    </div>
    `

 let div = document.createElement('div');
 div.className = 'media mt-3';
 div.innerHTML= innerHTML;
 return div;


}