const express = require('express');
const router = express.Router();
const BusinessController = require('../controllers/BusinessController')

router.get("/publications/:business_id",BusinessController.business);
// router.get("/publications/:business_id",(req,res)=>{
//     console.log(req.params.business_id);
// });

module.exports = router