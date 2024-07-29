const request = require("request")
const forecast =(longtitude , latitude , callback)=>{
    const url = "https://api.weatherapi.com/v1/current.json?key=d82a650f1c674b0e92483315241907&q=" + longtitude + "," + latitude
    request({url , json : true} , (error , response)=>{
        if (error){ callback ("Unable to conect weather API service") , undefined}
        else if (response.body.error) { callback (response.body.error.message , undefined)}
        else{ callback(undefined ,response.body.location.name + " It is =>  " + response.body.current.condition.text + ". and Temp. is => " + response.body.current.temp_c ) }
    })
}
module.exports = forecast