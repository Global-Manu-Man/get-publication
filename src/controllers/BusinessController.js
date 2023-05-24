const db = require("../database/db");

exports.business=(req,res)=>{

    const uid = req.params.business_id;
    const policies_terms_sql = `SELECT policies_terms FROM business WHERE business_id = "${uid}"`;
    const image_sql  = `SELECT image_url FROM images WHERE images_id="${uid}"`
    const sql = `SELECT business_id,schedule, name, price, manager, description, event_classification, capacity_people, address_1, address_2, address_3, city, state, country, postal_code, email, cell_phone_number, event_type, business_classification, publication_likes, questions,delivery, latitude, longitude, accepts_credit_cards, is_owner_verified,languages.language ,parking.parking, security_elements.security_element,services_offered.services_offered,social_networks.social_network,created_at, start_date, end_date FROM business
     JOIN languages ON business.business_id = languages.languages_id 
     JOIN parking ON business.business_id = parking.parking_id 
     JOIN security_elements ON business.business_id = security_elements.security_elements_id 
     JOIN services_offered ON business.business_id = services_offered.services_offered_id 
     JOIN social_networks ON business.business_id = social_networks.social_networks_id 
     JOIN status ON business.business_id = status.status_id WHERE business.business_id = "${uid}";`
   
 
    db.query(sql,(err,data)=>{

        if(err){

            res.send({data:err})

        }else if(data.length === 0){

            res.status(404).json({message: "no record record found"})
        }else{

            db.query(image_sql,(err,images)=>{
    
                if(err){
        
                    res.send({data:err})
        
                }
    
                const imageUrls = images && images.length > 0 ? images.map((row) => row.image_url) : [];
    
                db.query(policies_terms_sql,(err,terms)=>{
        
                    if(err){
            
                    res.send({data:err})
            
                    }
                    res.status(200).json({
                        code:200,
                        data:data,
                        images:imageUrls,
                        policies_terms:terms[0]['policies_terms'].toString()
                    })
    
                    
                })
        
            })

        }

       
    })

   


    


    

}