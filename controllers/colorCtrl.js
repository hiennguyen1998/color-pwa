const Color = require('./../models/colorModel')
const stringSimilarity = require("string-similarity");

exports.getAll = async(req,res) =>{
    try{
        let queryStr=req.query.name.toUpperCase(),Colors
        if(req.query.name){
            Colors = await Color.find().select("-_id name")
        }
        let colorName =  Colors.map(obj => {
            let strName = obj.name.toUpperCase()
            return strName
        })
    let matchedColor = stringSimilarity.findBestMatch(`${queryStr}`, colorName);
    let result = matchedColor.bestMatch.rating < 0.3 ? null : matchedColor.bestMatch.target
    Colors = await Color.find({name: { $regex: new RegExp(`^${result}$`, "i") }}).select("-_id -__v ")
    res.status(200).json({
            message: "Success",
            Colors
        })
    }catch(err){    
        res.status(404).json({
            message:"Failed",
            err: err.message
        })
    }
}