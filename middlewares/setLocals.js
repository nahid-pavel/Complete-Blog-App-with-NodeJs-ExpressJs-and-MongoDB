const cheerio = require('cheerio');
const moment = require('moment');

exports.setLocals = ()=>{
    return (req,res,next)=>{
        res.locals.user = req.user;
        res.locals.isLoggedIn = req.session.isLoggedIn;
        res.locals.truncate = html=>{

            let node = cheerio.load(html)
            let text = node.text();

            text = text.replace(/(\r\r|\n|\r)/gm,'');

            if(text.length <= 100){
                return text
            }else{
                return text.substr(0,100)+'...'
            }

        }

        res.locals.moment = time=>{
           return moment(time).fromNow()
        }
        next();
    }
}