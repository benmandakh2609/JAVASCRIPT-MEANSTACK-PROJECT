////////// EXPRESS ///////////////////////////////////
const express = require("express");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

///////// PORT SETUP           ///////////////////////
app.listen(8000, () => console.log("listening on port 8000"));

///////// API JSON SETUP              ////////////////
app.use(express.urlencoded({extended: true}));
app.use(express.json());

////// ANGULAR CONNECTION           //////////////////
app.use(express.static( __dirname + '/public/dist/public' ));


////////// MONGOOSE //////////////////////////////////
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurantDB', {useNewUrlParser: true});

const ReviewSchema = new mongoose.Schema({
    name: {type: String, required:[true, "Name must be at least 3 characters"], minlength:3},
    star: {type: Number, required:[true, "Must have"]},
    description: {type: String, required:[true, "Review must be at least 3 characters"], minlength:3},
   }, {timestamps:true})

const RestaurantSchema = new mongoose.Schema({
 name: {type: String, required:[true, "Name must be 3 characters"], minlength:3},
 cuisine: {type: String, required:[true, "Cuisine must be 3 characters"], minlength:3},
 reviews: [ReviewSchema]
}, {timestamps:true})

const Review = mongoose.model('Review', ReviewSchema);
const Rest = mongoose.model('Rest', RestaurantSchema);
mongoose.Promise = global.Promise;

////////////// ROUTES ////////////////////////////////

/// 1. Retrieve all rests
app.get('/rests', (req, res) => {
    Rest.find()
        .then(rests => res.json(rests))
        .catch(err => res.json(err));
});

/// 2. Retrieve by ID
app.get('/rests/:id', (req, res) => {
    Rest.findOne({_id: req.params.id})
        .then(rest => res.json(rest))
        .catch(err => res.json(err));
});

/// 3. Create Rest
app.post('/rest/new', (req, res) => {
    console.log(req.body)
    Rest.create(req.body, (err, rest)=>{
        if(err){
            console.log("Returned error", err);
            res.json({
                message:"Error",
                error:err
            })
        }else{
            res.json({
                message:"Success! Created new restaurant!", 
                data:rest
            })
        }
    })
});

/// 4. Update Rest
app.put('/rests/:id', (req, res) => {
    Rest.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    }, (err, rest) => {
        if (err) {
            console.log("Returned error", err);
            res.json({
                message: "Error",
                error: err
            })
        } else {
            res.json({
                message: "Success edited one restaurant ",
                data: rest
            })
        }
    })
})

/// 5. Delete Rest
app.delete('/rests/:id', (req, res) => {
    Rest.findByIdAndRemove(req.params.id)
        .then(rest => res.json(rest))
        .catch(err => res.json(err));
});

/// Reviews
/// 1. Retrieve all revs
app.get('/reviews', (req, res) => {
    Review.find()
        .then(reviews => res.json(reviews))
        .catch(err => res.json(err));
});
/// 2. Create Revs
app.post('/review/new/:id', (req, res) => {
    Rest.findByIdAndUpdate(req.params.id, {$push : {reviews : req.body }})
    .then( rest => { res.json({ "Message": "Success", 'rest': rest }) })
    .catch( err => { res.json({ "Message": "Error", "err": err }) }) 
    // console.log(req.body)
    // Review.create(req.body, (err, review)=>{
    //     if(err){
    //         console.log("Returned error", err);
    //         res.json({
    //             message:"Error",
    //             error:err
    //         })
    //     }else{
    //         Rest.findOne({_id: req.params.id})
    //         res.json({
    //             message:"Success! Created new review!", 
    //             data:review
    //         })
    //     }
    // })
});




app.all("*", (req,res,next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});
