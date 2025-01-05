document.addEventListener("DOMContentLoaded",()=>{
    
    

    const cityinput=document.getElementById("city-input");
    const weatherbtn=document.getElementById("get-weather-btn");
    const weatherinfo=document.getElementById("weather-info");
    const cityname=document.getElementById("city-name");
    const temperature=document.getElementById("temperature");
    const description=document.getElementById("description");
    const errormessage=document.getElementById("error-message");



   const API_KEY="eecbc6a455b31d1c96721ef9c9879272";
    
weatherbtn.addEventListener("click",async ()=>{

    const city=cityinput.value.trim();

    if(!city) return;
     
    // server may through some error
    // server is in another continent so we use async await as it take some time
   try {
      const weatherdata= await fetchwhetherdata(city);
         displayweatherdata(weatherdata);
   } catch (error) {
        showerror();
   }

})




async function fetchwhetherdata(city) {
    // fetching the data from api
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    const response=await fetch(url);
    
     if(!response.ok) {
        throw new Error("city not found");
     }

     const data=await response.json();
     return data;
     
}


function displayweatherdata(data) {
    // display the data
    console.log(data);

        const {name,main,weather}=data;
        cityname.textContent=name;

        weatherinfo.classList.remove("hidden");
        errormessage.classList.add("hidden");
        temperature.textContent=`temperature : ${main.temp}`;
        description.textContent=`Description : ${weather[0].main}`

}



function showerror() {
    weatherinfo.classList.add("hidden");
    errormessage.classList.remove("hidden");
}
})