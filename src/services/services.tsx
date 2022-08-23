export function findTimeStampBtwTwoDates(d1:string, d2:string){
    let timestamp = 0;
    let dateArray = d1.split("/");
    d1 = dateArray[1] + "-" + dateArray[0] + "-" + dateArray[2];
  
    const firstD = new Date(d1);
    const secondD = new Date(d2);
    console.log(d1);
  
    console.log(firstD,secondD);
  
    timestamp = ( firstD.getTime() - secondD.getTime() ) / 1000;
    
    return timestamp;
  
  };