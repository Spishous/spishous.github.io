class WriterWord{
    listWord=[
        {text:'write exemple',time:1000,delay:1000},
        {text:'write Word',time:1000,delay:1000}
    ];
    loopAnimation=true;
    element;
    constructor(initial=null){
        this.initial=initial;
        this.currentText=this.initial??this.listWord[0].text;
    }
    callback=(text,element,status)=>{
        if(element){
            element.innerText=text;
            switch (status){
                case -1:
                element.setAttribute('writer','delete')
                break;
                case 1:
                element.setAttribute('writer','write')
                break;
                default:
                element.setAttribute('writer','wait')
                break;
            }
        }else{
            console.log(text);
        }
    };
    setElement(element){
        this.element=element;
        this.currentText=this.initial??this.listWord[0].text;
        this.callback(this.currentText,this.element,0)
    }
    setInitialValue(value){
        this.initial=value;
        this.currentText=this.initial??this.listWord[0].text;
    }
    setListWord(array){
        this.listWord=array;
    }
    addWordToList(word="text",time=1000,delay=500){
        this.listWord=[...this.listWord,{text:word,time:time,delay:delay}];
    }
    setLoop(bool){
        this.loopAnimation=bool;
    }
    startAnimation(){
        this.stopAnimation();
        this.callback(this.currentText,this.element)
        this.startloop=true;
        this.loopWord();
        
    }
    async loopWord(){
        for(let i=0;i<this.listWord.length;i++){
            if(this.startloop){
                let actualText=this.currentText;
                let currentListText=this.listWord[i].text;
                let similarLen=0;
                if(actualText!=currentListText){
                    while((actualText[similarLen]??Math.random())===(currentListText[similarLen]??Math.random())){
                        similarLen++;
                    }
                }else{
                    similarLen=actualText.length
                }
                let NbStep=(actualText.length-similarLen)+(currentListText.length-similarLen);
                let delayStep=(this.listWord[i].time??100)/NbStep;
                let deleteMode=(actualText.length!=similarLen)
                let sleeper= (ms)=>{return new Promise(resolve => setTimeout(resolve, ms));}
                let status=(deleteMode)?-1:1;
                for(let j=0;j<NbStep;j++){
                    if(this.startloop){
                        deleteMode=(deleteMode&&this.currentText.length>similarLen)
                        if(deleteMode){
                            this.currentText=this.currentText.slice(0,-1);
                            status=-1;
                        }else{
                            this.currentText+=currentListText[this.currentText.length];
                            status=1;
                        }
                        if((j+1)==NbStep) status=0;
                        this.callback(this.currentText,this.element,status)
                        await sleeper(delayStep)
                    }
                }
                await sleeper(this.listWord[i].delay??0)
            }
        }
        if(this.loopAnimation&&this.startloop){
            this.loopWord();
        }
    }
    stopAnimation(){
        this.startloop=false;
    }
}