this.onload=()=>{
    const game={
        newtab : [],
        roundactive : 0,
        game_active : 0,
        rounds : 1,
        pkt: 0,
        lvlmode: null,
        elapsedTime : 0,
        timerInterval: null,
        startTime: null,
        lvl_id_to_choose : null,
        whobutton : null,
        f1: e=>{e.target.style.backgroundColor = "#fb8b24"},
        f2: e=>{e.target.style.backgroundColor = "orange"},
        p1: document.querySelector('#p1'),
        p2: document.querySelector('#p2'),
        p1p2 : document.querySelectorAll('.p'),
        pktid: document.querySelector('#pkt'),
        roundid: document.querySelector('#runda'),
        buttons: document.querySelectorAll('.buttons'),
        display : document.getElementById("display"),

        lvlhardsort(){ 
            this.buttons.forEach(e=>{
                e.id=='lvlmode1'? e.addEventListener('click',()=>{this.lvlmode = 'low'}):false
                e.id=='lvlmode2'? e.addEventListener('click',()=>{this.lvlmode = 'medium'}):false
                e.id=='lvlmode3'? e.addEventListener('click',()=>{this.lvlmode = 'hard'}):false
                
            })
        },

        lvlsort(){
            const standar = 'background-color: #orange; border:;color:white'
            const change = 'background-color: #fb8b24; border:0.1em solid black;color:black'
            const newf = (e)=>{
                document.querySelector('#a11').disabled = false
                this.elapsedTime = 0
                this.rounds = 1
                this.pkt = 0
                document.querySelectorAll('.o').length != 0 ? this.removeelemetstochange() : null
                this.newitemsinp_hard(this.lvl_id_to_choose)
                this.display.innerText = "00:00:00"
                this.roundid.innerText = 'Runda : 1'
                this.pktid.innerText = "Pkt : 0"
           }
            this.buttons.forEach(e=>{
                if(e.id == "l_lite"){
                    e.addEventListener("click", () => {
                            this.lvl_id_to_choose = 3  
                            this.whobutton ? this.whobutton.style.cssText = standar : null
                            this.whobutton = e
                            e.style.cssText = change
                            newf(e)
                    });
                }else if(e.id == "l_medium"){
                    e.addEventListener("click", () => {
                            this.lvl_id_to_choose = 6
                            this.whobutton ? this.whobutton.style.cssText = standar : null
                            this.whobutton = e
                            e.style.cssText = change
                            newf(e)
                    });
                }else if(this.game_active == 0 && e.id == "l_hard"){
                    e.addEventListener("click", () => {
                            this.lvl_id_to_choose = 10
                            this.whobutton ? this.whobutton.style.cssText = standar : null
                            this.whobutton = e
                            e.style.cssText = change
                            newf(e)
                        
                    });
                    
                }
            })
        },
        removeelemetstochange(){
           const z = document.querySelectorAll('.o')
           z.forEach(e=>{e.remove()})
        },
        clickstart(){
            this.io()
            document.querySelector('#a11').disabled = true
            this.buttons.forEach(e=>{
                e.disabled = true
                }
            )
        },

        newitemsinp_hard(x){
            const tab = [
                ["a","b","c","d","e","f","g","h","i","j"],
                [1,2,3,4,5,6,7,8,9,10]
            ]
            this.p1p2.forEach(e=>{
                e.style.width = `${x*40}px`
                e.style.height = `${x*40}px`})
            for(let z = 0; z<x;z++){ 
                for(let c = 0; c<x; c++){
                    const x = document.createElement('div')
                    const v = document.createElement('div')
                    x.classList.add("o")
                    v.classList.add("o")
                    x.id = `${tab[0][c]}${tab[1][z]}` 
                    x.dataset.privateclass = 'op1'
                    v.id = `${tab[0][c]}${tab[1][z]}`
                    v.dataset.privateclass = 'op2'
                    //v.dataset.value = null
                    this.p1.appendChild(x)
                    this.p2.appendChild(v)
                }
            }
        },
        addevent(){
           const x = document.querySelectorAll('.o')
           x.forEach(e=>{
              if(e.dataset.privateclass == "op1"){
                  e.addEventListener('mouseenter', this.f1)
                  e.addEventListener('mouseleave', e=>{ e.target.style.backgroundColor = "black"})
                  e.addEventListener('mousedown', this.f2)
                  e.addEventListener('click',e=>{
                      if(this.roundactive == 1){
                      this.connection(e.target)}
                    })
                  e.addEventListener('mouseup', this.f1)
              }
           })
        },
        io(){
            const childs = this.p2.children
            let y = 1;
            let tours = this.rounds
            if(this.lvlmode == 'low'){
                tours<=3?true:tours=3
            }else if(this.lvlmode == 'medium'){
                tours<=5?true:tours=5
            }else if((this.lvlmode == 'hard')){
                tours<=7?true:tours=7
            }
            
            let startinterval = setInterval(() => {
                let z = Math.floor(Math.random() * childs.length)
                thischild = childs[z]
                thischild.dataset.value = y
                this.newtab.push(thischild)
                thischild.style.backgroundColor = "#fb8b24"
                
                setTimeout(() => {
                    thischild.style.backgroundColor = "black"
                    console.log(this.lvlmode)
                },1000 /tours);
                
                
                if(y >= (0+tours)){
                    clearInterval(startinterval)
                    this.addevent()
                    this.timerstart()
                    this.roundactive = 1;
                }
                y++
            }, 2000 /tours);
        },
        connection(x){
            
            if(x.id == this.newtab[0].id){
                this.pkt++
                this.pktid.innerText = `Pkt : ${this.pkt}`
                this.newtab.shift()
            }
            if(!this.newtab.length){
                this.gamestop()
                this.timerstop()
            }

        },
        gamestop(){
            this.roundactive = 0;
            const x = document.querySelectorAll('.o')
            document.querySelector('#a11').disabled = false
            this.buttons.forEach(e=>{
                e.disabled = false
            })
            this.rounds++
            this.roundid.innerText=`Runda : ${this.rounds}`
           x.forEach(e=>{
              if(e.dataset.privateclass == "op1"){
                  e.removeEventListener('mouseenter', this.f1)
                  e.removeEventListener('mousedown', this.f2)
                  e.removeEventListener('mouseup', this.f1)
              }
           })
        },
        timerstart(){
            //--------------start time-------------------//
           let startTime ;
            startTime = Date.now() - this.elapsedTime;
            this.timerInterval = setInterval(()=> {
              this.elapsedTime = Date.now() - startTime;
              print(timeToString(this.elapsedTime));
            }, 100);
            //------------------------------------------//
            function timeToString(time) {
                
                let diffInHrs = time / 3600000;
                let hh = Math.floor(diffInHrs);
              
                let diffInMin = (diffInHrs - hh) * 60;
                let mm = Math.floor(diffInMin);
              
                let diffInSec = (diffInMin - mm) * 60;
                let ss = Math.floor(diffInSec);

                let formattedHr = hh.toString().padStart(2, "0");
                let formattedMM = mm.toString().padStart(2, "0");
                let formattedSS = ss.toString().padStart(2, "0");
            
            
                return `${formattedHr}:${formattedMM}:${formattedSS}`;
              }
        function print(txt) {
            this.display.innerHTML = txt;
        }

        },
        timerstop(){
                clearInterval(this.timerInterval);
        },
    }
    game.lvlsort()
    game.lvlhardsort()
    //game.lvlhardsort()
    document.querySelector('#a11').addEventListener('click',()=> game.clickstart())
}