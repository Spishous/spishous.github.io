//scroll Top
window.scrollTo(0, 0);
window.onload=()=>{
    setTimeout(()=>{
        window.scrollTo(0, 0);
        setTimeout(()=>{
            document.addEventListener('scroll',function(){
                effectFade();
                parallax();
            })
        },100)
    },80)
}
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}
//writer
let writeword = new WriterWord();
writeword.setListWord([
    {text:"Développeur",time:1200,delay:600},
    {text:"Développeur ;)",time:500,delay:300},
    {text:"Développeur fullstack",time:800,delay:2000},
    {text:"Développeur web",time:900,delay:800},
    {text:"Développeur web et mobile",time:900,delay:1700},
    {text:"",time:1000,delay:500},
    {text:"UI/UX Designer",time:1100,delay:2500},
    {text:"",time:900,delay:1000},
])
writeword.setInitialValue("Je suis..")
writeword.setElement(document.getElementById('writer'))
setTimeout(()=>{
    writeword.startAnimation();
},1500)
//effect
document.querySelectorAll('[fade-in]').forEach((e)=>{
    let fadein=(+e.getAttribute('fade-in'))||0;
    let fadeout=(+e.getAttribute('fade-out'))||0;

    if(fadein>=fadeout){
        e.style.transition="none";
        e.classList.add('hide-effet')
        e.offsetHeight
        e.style.transition="";
    }

})
function parallax(){
    document.querySelectorAll('[parallax-y]').forEach((e)=>{
        let parallax=(+e.getAttribute('parallax-y'))||0;
        e.style.transform="translateY("+(window.scrollY+(window.scrollY*(parallax))/100)+"px)";
    })
}
function effectFade(){
    let bottom=window.innerHeight+window.scrollY;
    document.querySelectorAll('.hide-effet[fade-in],[fade-out]').forEach((e)=>{
        let fadein=(+e.getAttribute('fade-in'))||0;
        let fadeout=(+e.getAttribute('fade-out'))||0;
        let offsetTop=e.offsetTop;
        let fadeclass=e.getAttribute('fade-class')||null
        if(fadein>=fadeout){
            if((bottom-offsetTop)>fadein){
                e.classList.remove('hide-effet',fadeclass)
            }else if((bottom-offsetTop)<fadeout){
                e.classList.add('hide-effet');
                (fadeclass)? e.classList.add(fadeclass) :null;
            }
        }else{
            if((bottom-offsetTop)<fadein){
                e.classList.remove('hide-effet',fadeclass)
            }else if((bottom-offsetTop)>fadeout){
                e.classList.add('hide-effet',fadeclass)
            }
        }
    })
}
