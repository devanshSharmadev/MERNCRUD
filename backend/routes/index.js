var express = require('express');
var router = express.Router();
var mongoose= require('mongoose')
var upload=require("./multer")

mongoose.connect("mongodb://localhost:27017/crud",{useNewUrlParser:true,useUnifiedTopology:true},function(err,result){
  if(err)
  {
    console.log(`Error is: ${err}`)

  }
  else if(result){
    console.log("Connection Successful")
    //console.log(result)
  }
})

const crudschema=new mongoose.Schema({
  name:{
    type:String,
    required: true,
  },
  age:Number,
  image:String

})

const Crud= new mongoose.model("Crud",crudschema)



/* GET home page. */
router.post('/insert',upload.any(), function(req, res, next) {
  {
    console.log("//...",req.body)
    try{
      const info= new Crud({
        name:req.body.name,
        age:req.body.age,
        image:req.files[0].originalname,
      })
      const result=info.save()
      return res.status(200).json({'RESULT':true})
    }
    catch(err){
      console.log(err)
    
      return res.status(500).json({'RESULT':false})
    }
    
  }
});

router.get('/read',async function(req,res) {
  
  const result=await Crud.find()
  //console.log(result)

return res.status(200).json(result)
});

router.post('/delete',upload.single(),async function(req,res,next){
  
  try{
    console.log("Here is the ID on Sever",req.body)
    var id=req.body.id
    console.log("Ye rahi tumhari ID",id)
    const result=await Crud.deleteOne({"_id":id})
    console.log("Ye raha tumhara result",result)
    return res.status(200).json({'RESULT':true})
  }
  catch(err){
    console.log(err)
  
    return res.status(500).json({'RESULT':false})
  }
  
})

router.post('/update',upload.single(),async function(req,res,next){
  
  try{
    console.log("Here is the data on Sever",req.body)
    const result=await Crud.updateOne({_id:req.body.id},{
      $set:{
        name:req.body.name,
        age:req.body.age
      }
    })
    return res.status(200).json({'RESULT':true})
  }
  catch(err){
    console.log(err)
  
    return res.status(500).json({'RESULT':false})
  }
  
})

module.exports = router;
