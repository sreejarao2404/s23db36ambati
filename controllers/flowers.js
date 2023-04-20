var flowers = require('../models/flowers');
// List of all flowers

// List of all flowers
exports.flowers_list = async function(req, res) {
    try{
    theflowers = await flowers.find();
    res.send(theflowers);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };


// for a specific flowers.
// for a specific flowers.
exports.flowers_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await flowers.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };

// Handle flowers create on POST.
exports.flowers_create_post = async function(req, res) {
    console.log(req.body)
    let document = new flowers();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"flowers_type":"goat", "cost":12, "size":"large"}
    document.flowers_name = req.body.flowers_name;
    document.flowers_color = req.body.flowers_color;
    document.flowers_size = req.body.flowers_size;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

// Handle flowers create on POST.
//exports.flowers_create_post = function(req, res) {
//res.send('NOT IMPLEMENTED: flowers create POST');
//};

// Handle flowers delete on DELETE.
exports.flowers_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await flowers.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
// Handle flowers update form on PUT.
exports.flowers_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await flowers.findById( req.params.id)
 // Do updates of properties
 if(req.body.flower_name)
 toUpdate.flower_name = req.body.flower_name;
 if(req.body.flower_color) toUpdate.flower_color = req.body.flower_color;
 if(req.body.flower_size) toUpdate.flower_size = req.body.flower_size;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
};

// VIEWS
// Handle a show all view
exports.flowers_view_all_Page = async function(req, res) {
    try{
    theflowers = await flowers.find();
    res.render('flowers', { title: 'flowers Search Results', results: theflowers });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

   // Handle a show one view with id specified by query
exports.flowers_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await flowers.findById( req.query.id)
    res.render('flowersdetail',
   { title: 'flowers Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for creating a flowers.
// No body, no in path parameter, no query.
// Does not need to be async
exports.flowers_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('flowerscreate', { title: 'flowers Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };


// query provides the id
exports.flowers_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await flowers.findById(req.query.id)
    res.render('flowersupdate', { title: 'flowers Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

// Handle a delete one view with id from query
exports.flowers_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await flowers.findById(req.query.id)
    res.render('flowersdelete', { title: 'flowers Delete', toShow:
    result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };