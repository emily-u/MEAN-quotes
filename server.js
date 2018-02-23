// ========== CONFIG =============
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/client/dist' ));
// ===============================



// ==== NEW MONGOOSE CODE! =======
let mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authorDB');
mongoose.Promise = global.Promise;


let AuthorSchema = new mongoose.Schema({
    name: {required: true, type: String, minlength: [3, "At least 3 characters for author's name"]},
    quotes: 
    [
        {
            text: {type:String},
            votes: {type:Number}
        }
    ]
}, {timestamps: true})

let Author = mongoose.model("Author", AuthorSchema);
// ==============================




// ===== ROUTES about author ======
// Retrieve all Tasks
app.get('/authors', function(req, res){
    Author.find({}, function(err, results){
        if(err){
            res.json({message: "Error", error: err})
        }else{
            // console.log(results);
            res.json(results);
        }
    })
})

// Create authors
app.post('/authors', function(req, res){
    console.log("8888",req.body);
    let newAuthor = new Author(req.body);
    newAuthor.save(function(err){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json("create success")
        }
    })
})


//update an author
app.put('/authors/:id', function(req, res){
    Author.findOneAndUpdate({_id: req.params.id},
    {$set: {name: req.body.name, quotes: req.body.quotes}},
        null, function(err){
        if(err){
            console.log('Error during updates');
            res.json({message:"Error", error:err})
        }else{
            console.log('Successfully to update the author');
            res.json({message: "Success"});
        }
    })
})
// Delete by ID
app.delete('/authors/:deleteTaskId', function(req, res){
    Author.remove({_id: req.params.deleteTaskId}, function(err, results){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json({message:'Success delete'});
        }
    })
})

// ===== ROUTES about author ======

// Retrieve all 
app.get('/quotes', function(req, res){
    Author.find({}, function(err, results){
        if(err){
            res.json({message: "Error", error: err})
        }else{
            // console.log(results);
            res.json(results);
        }
    })
})

// Create
app.post('/quotes', function(req, res){
    console.log(req.body);
    let newQuotes = new Quote(req.body);
    newQuotes.save(function(err){
        if(err){
            res.json({message: "Error", error: err});
        }else{
            res.json("create success")
        }
    })
})

// getAuthorById
app.get('/author/:id', function(req, res){
    // console.log(req.params.id);
    Author.findOne({_id: req.params.id}, function(err, author) {
        if(err){
            res.json({message: "error", error: err});
        }else{
            res.json(author)
        }
    })
    
})

// delete a quote
app.delete('/quote/:id/:index', function(req, res){
    Author.findOne({_id: req.params.id}, function(err,author){
        console.log(author);
        if(err){
            res.json({message:"error", error: err});
        }else{
            author.quotes.splice(req.params.index, 1);
            author.save(function(err) {
                if(err) {
                    console.log("after delete quote: ", err);
                }
                else {
                    res.json("success delete quote")
                }
            })
        }
    })
})

// create quotes by author id
app.put("/write/:id", function(req, res){
    console.log("5555 newQuote pass to server.js", req.body.text);
    Author.update({_id: req.params.id}, {$push: {quotes: req.body}}, function(err){
        if(err){
            console.log("err from server.js", err);
            res.json({error:err});
        }else{
            res.json("success create quote");
        }
    })
})

// vote up
app.put("/vote/:id/:index", function(req, res){
    var bool=req.body.bool
    Author.findOne({_id: req.params.id}, function(err,author){
        if(err){
            res.json({message: "error", error: err})
        }
        else{
            if (bool == true){
                author.quotes[req.params.index].votes ++;
            }
            else{
                author.quotes[req.params.index].votes --;
            }
            author.save(function(err) {
                if(err) {
                    console.log("err from save vote: ", err);
                }
                else {
                    res.json(author);
                }
            })
        }
    })
})



// ======================
app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./client/dist/index.html'));
});
// ======================


// ==== SERVER LISTENER! =======
app.listen(8000, function(){
    console.log("Express on port 8000!")
});
// =============================