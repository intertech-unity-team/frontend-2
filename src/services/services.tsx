export function findTimeStampBtwTwoDates(d1:string, d2:string){
    let timestamp = 0;
    let dateArray = d1.split("/");
    d1 = dateArray[1] + "-" + dateArray[0] + "-" + dateArray[2];

    let years = parseInt(dateArray[2]);
    years += 18;

    let releaseDate = dateArray[1] + "-" + dateArray[0] + "-" + years.toString();
  
    const firstD = new Date(releaseDate);
    const secondD = new Date(d2);
    console.log(d1);
  
    console.log(firstD,secondD);

  
    timestamp = ( firstD.getTime() - secondD.getTime() ) / 1000;
    
    return timestamp;
  
  };

  export function findTimeStampBtwTwoDatesv2(d1:string, d2:string){
    let timestamp = 0;
    let dateArray = d1.split("-");

    let years = parseInt(dateArray[2]);
    years += 18;

    let releaseDate = dateArray[1] + "-" + dateArray[0] + "-" + years.toString();
  
    console.log(releaseDate);
    const firstD = new Date(releaseDate);
    const secondD = new Date(d2);
    console.log(d1);
  
    console.log(firstD,secondD);

  
    timestamp = ( firstD.getTime() - secondD.getTime() ) / 1000;
    
    return timestamp;
  
  };

  