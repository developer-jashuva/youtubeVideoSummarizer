console.log("nsnsnsn");

const input = document.getElementById('video-url');
const btn = document.getElementById('button');
const sumry = document.getElementById('summary');

const placeholderr = "Enter YouTube video URL";
btn.addEventListener('click',async (event)=>{

    event.preventDefault()
//   console.log(input.value);
  let videoId = input.value;
  videoId = videoId.substring(32);
//   console.log(videoId);
//   console.log(JSON.stringify(videoId));
   try {
    if(!input.value){
        alert("Please Enter a URL")
    }
    else{
       
        const response = await fetch("http://localhost:3000/submit",{
            method : "post",
            // mode : "no-cors",
            headers : {
                "content-type":"application/json",
            },
            body : JSON.stringify({vi : videoId }),
          }
         );
       
         const data = await response.json();
         const summary = data.summary;
         sumry.innerHTML= `<p>${summary}</p>`;
         input.value="";
         input.setAttribute("placeholder",placeholderr);
        
    }
    
   }
    catch (error) {
    console.log(error);
  
   
    input.value="";
    input.setAttribute('placeholder',placeholderr);
   }

  
})
