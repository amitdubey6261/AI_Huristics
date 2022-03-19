mainarr =[];
arr = [];
let mymusic1 = new Audio('DVRST-CLOSE-EYES.mp3')
let mymusic2 = new Audio('move.mp3')

function waitforme(ms) {    
    return new Promise( resolve => {
        setTimeout(()=> {resolve('')} ,ms );
    })
}

//setting my coordinates in  screen :
const embedCord = async (input_stairs) =>{
    for(let i=0 ; i<mainarr.length ; i++){
        await waitforme(2000);
        for( let j=0  ; j < mainarr[i].length ; j++){
            await waitforme(1000);
            cr_x = mainarr[i][j].x;
            cr_y = mainarr[i][j].y;
            console.log(cr_x , cr_y);
            foot = document.createElement('div');
            foot.style.gridRowStart = cr_x ;
            foot.style.gridColumnStart = cr_y ;
            foot.classList.add('myclass');
            document.getElementById('dibba').appendChild(foot);
            mymusic2.play();
            document.getElementById('opscreen').value = `{x:${cr_x} ; y : ${cr_y}}` ;
        }
        document.getElementById('dibba').innerHTML ="";
        for(let i = 1  ; i < input_stairs ; i++){
            elem = document.createElement('div');
            elem.style.gridRowStart = i+1;
            elem.style.gridColumnStart = i;
            elem.classList.add("railing") ;
            y.appendChild(elem);
        }
        document.getElementById('dibba').value ="";
    }
}


// Getting Dubey ke Coordinates 
const arrayOfCordi = (x , input_stairs) =>{                   //["1111" , "112" , "121" , "13", "211" , "22" , "31"] 
    for(let i = 0 ; i<x.length ; i++ ){
        newarr = [] ;                          //[{x:0  , y:0} , {1,1} , {2,2} , {3,3} , {4,4}]
        // obj = { x : 0  , y : 0 };
        // newarr.push(obj) ;
        prev = 0 ; 
        for(let j=0 ; j < x[i].length ; j++ ){
            int_chr = parseInt(x[i].charAt(j)); //1
            newobj = {x: prev+int_chr , y: prev+int_chr  };
            newarr.push(newobj);
            prev = prev+int_chr ;
        }
        mainarr.push(newarr);
    }
    embedCord(input_stairs);
}

const pr_parths = (a , jump1 ,jump2 , jump3 , s ) =>{
    if( a < 0 ){
        return ;
    }
    if( a == 0 ){
        arr.push(s);
        return ; 
    }
    pr_parths(a-jump1 , jump1, jump2, jump3 , s+`${jump1}`);
    pr_parths(a-jump2 , jump1, jump2, jump3 , s+`${jump2}`);
    pr_parths(a-jump3 , jump1, jump2, jump3 , s+`${jump3}`);
}

// create dynamic board :
const getnumber = (x , j1 , j2 , j3) =>{
    input_stairs = parseInt(x);
    jump1 = parseInt(j1);
    jump2 = parseInt(j2);
    jump3 = parseInt(j3);
    y = document.createElement('div');
    y.setAttribute('style', ` width : 100% ; height : 100% ; background-color : orange ;  display : grid ; grid-template-rows : repeat(${input_stairs} , 1fr ) ; grid-template-columns : repeat(${input_stairs} , 1fr)`);
    y.setAttribute('id' , 'dibba');
    // giving lines to stairs
    for(let i = 1  ; i < input_stairs ; i++){
        elem = document.createElement('div');
        elem.style.gridRowStart = i+1;
        elem.style.gridColumnStart = i;
        elem.classList.add("railing") ;
        y.appendChild(elem);
    }

    z = document.getElementById("section1");
    z.appendChild(y);

    pr_parths(input_stairs , jump1 , jump2 , jump3 , "");
    arrayOfCordi(arr , input_stairs ) ;
}

//submitting value from Form :
const submitvalue = () =>{
    mymusic1.play();
    x = document.getElementById('myvalue');
    a1 = document.getElementById('myjvalue1');
    a2 = document.getElementById('myjvalue2');
    a3 = document.getElementById('myjvalue3');
    totalStairs  = x.value ;
    j1  = a1.value ;
    j2  = a2.value ;
    j3  = a3.value ;
    if(totalStairs == "" || j1 == "" || j2 == "" || j3 == "" ){
        alert("Please Enter Valid Input ")
    } 
    else{
        getnumber(totalStairs , j1 , j2 , j3 );
    }
}

x = document.getElementById("submit");
x.addEventListener("click", submitvalue);
