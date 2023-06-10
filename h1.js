let maininput=document.querySelector(".maininput");
let smalltext=document.querySelector(".box > p");
let mainreult=document.querySelector(".mainreult");


maininput.addEventListener("keypress",function(event){
  if(event.key === "Enter" && event.target.value){
    smalltext.innerText=`Searthing the meaning of "${maininput.value}"`;
    smalltext.style.color="black";
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${maininput.value}`).then((res)=>
    res.json()).then((reult)=>{
      if(reult.title){
        smalltext.innerText=`There is no meaning of "${maininput.value}"`;
        smalltext.style.color="black";
      }else{
        console.log(reult);
        smalltext.style.display="none";
        mainreult.style.display="flex";
        document.querySelector(".hear").addEventListener("click",function(){
          let newtaker=new SpeechSynthesisUtterance(`${maininput.value}`)
          speechSynthesis.speak(newtaker);
        })
        document.querySelector(".mainSynonyms").innerHTML="";
        let mdefinitions =reult[0].meanings[0].definitions[0];
        document.querySelector(".partO").innerText=reult[0].meanings[0].partOfSpeech;
        document.querySelector(".idkw").innerText=reult[0].phonetic;
        document.querySelector(".main-wordtext p").innerText=reult[0].word;
        document.querySelector(".mainmeaning").innerText=mdefinitions.definition;
        if(reult[0].meanings[1].definitions[0].example){
          document.querySelector(".mainexpmale").innerText=reult[0].meanings[1].definitions[0].example;
        }else{
          document.querySelector(".mainexpmale").innerText=`No Expmale`
        }
        if(reult[0].meanings[0].synonyms.length > 0){
          for(let i=0;i<5;i++){
            document.querySelector(".mainSynonyms").innerHTML += `<a href="#">${reult[0].meanings[0].synonyms[i]}</a>`
          }
        }else{
          document.querySelector(".mainSynonyms").innerHTML=`No Synonyms`
        }
        
      }
    });
    
  }
  // else{
  //   smalltext.innerText=`There is no meaning of "${maininput.value}"`;
  //   smalltext.style.color="black";
  // }
})