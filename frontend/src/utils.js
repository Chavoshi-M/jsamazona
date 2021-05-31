export const parseRequestUrl = ()=>{
    console.log(document.location.hash+'==>document.location.hash');
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    console.log(request,'==>request');
    return{
        resource:request[1],
        id:request[2],
        action:request[3]
    }
}