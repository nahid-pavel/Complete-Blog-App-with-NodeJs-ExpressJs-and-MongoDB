const { body } = require("express-validator");
const cheerio = require('cheerio')


module.exports =[

    body("title")
        .not().isEmpty().withMessage('Title cannot be empty')
        .isLength({max: 100}).withMessage('title can be maximum 100 characters')
        .trim(),
    body("body")
        .not().isEmpty().withMessage('body cannot be empty')
        .custom(value=>{
            let load = cheerio.load(value);
            let text = load.text();
            if(text.length > 5000){
                throw new Error('body cannot be more than 5000 characters')
            }

            return true;

        }),
     body("tags")
        .not().isEmpty().withMessage('tags cannot be empty')


    



];