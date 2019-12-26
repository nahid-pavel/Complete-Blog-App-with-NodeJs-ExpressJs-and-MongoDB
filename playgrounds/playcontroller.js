
const moment= require('moment');

function genDate(days){
    let date = moment().subtract(days,'days');
    return date.toDate();
}

exports.playController = (req,res,next)=>{
    
    let newDate = genDate(7)
    res.render('pages/playgrounds/play',{
        newDate});
}