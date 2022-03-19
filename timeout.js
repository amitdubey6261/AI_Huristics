function waitforme(ms) {    
    return new Promise( resolve => {
        setTimeout(()=> {resolve('')} ,ms );
    })
}
async function printy()  {
    for (let i= 0; i < 10 ; ++i)    {
        await waitforme(500);
        console.log(i);
    }
}
printy()