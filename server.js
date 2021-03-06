const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Data = require('./models/liftdata.model')
const Note = require('./models/notes.model')
const Block = require('./models/blocks.model')
const Sheet = require('./models/program-sheets.model')
const Lift = require('./models/lifts.model')
const Colors = require('./models/colors.model')
const jwt = require('jsonwebtoken')
const objectstocsv = require('objects-to-csv')
const path = require('path')

require("dotenv").config();

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "client", "build")));

const PORT = process.env.PORT;
const secret = process.env.SECRET
mongoose.connect(process.env.MONGODB_URI )
// mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true });

app.post('/api/register', async (req,res) => {
    try {
        await User.create({
            name: req.body.cleanName,
            email: req.body.cleanEmail,
            password: req.body.hashedPassword,
        })

        res.json({status: 'good'})
    } catch (err) {res.json({status: 'bad', error: err});}
        

});

app.post('/api/login', async (req,res) => {

    const user = await User.findOne({
        email: req.body.cleanEmail,
    })
    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
            password: user.password,
        }, secret)
        res.json({status: 'ok', user: token, name: user.name, password: user.password})
    } else {
        res.json({status: 'error', user: false})

    }

});

app.post('/api/new_lift', async (req,res) => {
    // console.log(req.body);
    const decoded = jwt.verify(req.body.token, secret)
    const email = decoded.email
    const exists = await Data.findOne({
        email: email,
        lift: req.body.lift,
        weight: req.body.weight,
        lbsorkg: req.body.lbsorkg,
        reps: req.body.reps,
        sets: req.body.sets,
        rpe: req.body.rpe,
        date: req.body.date,
        e1rm: req.body.e1rm,
        block: req.body.block,
    })
    console.log(exists)
    if(exists){
        console.log('exists');
        // res.json({status: 'Lift already exists'});
        res.json({status: 'exists', id: exists._id})
    } else{

    try {
        console.log("creating new lift");
        const lift = await Data.create({
            email: email,
            lift: req.body.lift,
            weight: req.body.weight,
            lbsorkg: req.body.lbsorkg,
            reps: req.body.reps,
            sets: req.body.sets,
            rpe: req.body.rpe,
            date: req.body.date,
            e1rm: req.body.e1rm,
            block: req.body.block,
        })
        res.json({status: 'good', id: lift._id});
    } catch (err) {res.json({status: 'bad', error: err})}
} 

});

app.get('/api/get_lift', async (req,res) => {
    
    const token = req.headers['x-access-token'];
    const block = req.headers['block'];
    if(block){
        try {
            const decoded = jwt.verify(token, secret)
            const email = decoded.email
            const data = await Data.find({ email: email, block: block}).sort( { date: 1 , e1rm: 1} )
            console.log("getting lifts" + data);
            res.json({status: 'fine',
                             data: data,
                            })
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: 'invalid token'})
        }
    } else {
        try {
            const decoded = jwt.verify(token, secret)
            const email = decoded.email
            const data = await Data.find({ email: email}).sort( { date: 1 } )
            console.log(data);
            res.json({status: 'fine',
                             data: data,
                            })
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: 'invalid token'})
        }
    }
    

});
app.get('/api/delete_lifts', async (req,res) => {
    const token = req.headers['x-access-token'];
    const block = req.headers['block'];
    if(block){
        try {
            const decoded = jwt.verify(token, secret)
            const email = decoded.email
            await Data.deleteMany({ email: email, block: block}).sort( { date: 1 } )
            console.log("deleting lifts from " + email + " in " + block);
            res.json({status: 'fine',
                             result: 'lifts all deleted',
                            })
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: 'invalid token'})
        }
    } else {
        res.json({status: 'error', error: 'somethjing is wrong'})
    }
    

});
app.post('/api/update_note', async (req,res) => {

    const exists = await Note.findOne({
        email: req.body.email,
        block: req.body.block,
    })
    if(exists){
        try {
            const filter = {email: req.body.email, block: req.body.block};
            const toUpdate = {
                            $set: {note: req.body.newNote},
            }
            console.log('updating note');
            console.log(req.body.newNote);
            await Note.updateOne(filter, toUpdate);
            res.json({status: 'note updated'});
        } catch (err) {
            {res.json({status: 'bad', error: err + 2})}
        }
        
    } else{
        try {
            console.log("updating note");
            await Note.create({
                email: req.body.email,
                block: req.body.block,
                note: req.body.newNote,
            })
            res.json({status: 'good'});
        } catch (err) {res.json({status: 'bad', error: err + 1})}
} 

});
app.post('/api/update_lift', async (req,res) => {
    console.log("updating lift")
    const exists = await Data.findOne({
        _id: req.body.id
    })
    if(exists && req.body.varChanged != 'email' && req.body.varChanged != 'block' && req.body.varChanged != 'e1rm'){
        try {
            const varChanged = req.body.varChanged;
            const filter = {_id: req.body.id};
            if(varChanged == 'lift'){
                const toUpdate = {
                    $set: {lift: req.body.value},
                }
                console.log('updating lift');
                await Data.updateOne(filter, toUpdate);
                res.json({status: 'lift updated'});
            } else if(varChanged == 'weight'){
                const toUpdate = {
                    $set: {weight: req.body.value},
                }
                console.log('updating lift');
                await Data.updateOne(filter, toUpdate);
                res.json({status: 'lift updated'});
            } else if(varChanged == 'lbsorkg'){
                const toUpdate = {
                    $set: {lbsorkg: req.body.value},
                }
                console.log('updating lift');
                await Data.updateOne(filter, toUpdate);
                res.json({status: 'lift updated'});
            } else if(varChanged == 'reps'){
                const toUpdate = {
                    $set: {reps: req.body.value},
                }
                console.log('updating lift');
                await Data.updateOne(filter, toUpdate);
                res.json({status: 'lift updated'});
            } else if(varChanged == 'sets'){
                const toUpdate = {
                    $set: {sets: req.body.value},
                }
                console.log('updating lift');
                await Data.updateOne(filter, toUpdate);
                res.json({status: 'lift updated'});
            } else if(varChanged == 'rpe'){
                console.log("rpe being changed")
                const toUpdate = {
                    $set: {rpe: req.body.value},
                }
                console.log('updating lift');
                await Data.updateOne(filter, toUpdate);
                res.json({status: 'lift updated'});
            } else if(varChanged == 'date'){
                const toUpdate = {
                    $set: {date: req.body.value},
                }
                console.log('updating lift');
                await Data.updateOne(filter, toUpdate);
                res.json({status: 'lift updated'});
            }
            
            
        } catch (err) {
            {res.json({status: 'bad', error: err + 2})}
        }
        
    } else{
} 

});

app.post('/api/new_block', async (req,res) => {

    const exists = await Block.findOne({
        email: req.body.email,
        blockName: req.body.block,
    })
    if(exists){
        console.log("bad")
        res.json({statues: "bad", error: "Block already exists"})
    } else{
        try {
            console.log("creating new block");
            await Block.create({
                email: req.body.email,
                blockName: req.body.block,
                sheetURL: req.body.sheetURL,
            })
            res.json({status: 'good'});
        } catch (err) {res.json({status: 'bad', error: err + 1})}
} 

});
app.get('/api/get_blocks', async (req,res) => {
    
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, secret)
    const email = decoded.email

    try {
        let blocks = await Block.find({ email: email})
        console.log(blocks);
        res.json({status: 'fine',
                            blocks: blocks,
                        })
    } catch(error){
        console.log(error)
        res.json({status: 'error', error: error})
    }
});
app.post('/api/delete_block', async (req,res) => {
    console.log('deleting stuff')
    const token = req.body.token;
    const decoded = jwt.verify(token, secret)
    const email = decoded.email
    console.log(email, req.body.block)
    if(req.body.block){
        try {
            await Lift.deleteMany({email: email, block: req.body.block})
            await Sheet.deleteOne({email: email, block: req.body.block})
            await Note.deleteOne({email: email, block: req.body.block})
            await Data.deleteMany({email: email, block: req.body.block})
            await Block.deleteOne({email: email, blockName: req.body.block})
            res.json({status: 'good'})
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: error})
        }
    } else{
        res.json({status: 'error', error: 'No block'})
         
    }
    
})
app.get('/api/get_note', async (req,res) => {
    
    const token = req.headers['x-access-token'];
    const block = req.headers['block'];
    const email = req.headers['email'];
    
    const exists = await Note.findOne({
        email: email,
        block: block,
    })
    if(exists){
        try {
            const filter = {email: email, block: block};
            const toUpdate = {
                            $set: {note: req.body.newNote},
            }
            let newNote = await Note.findOne(filter)
            newNote = newNote.note
            console.log("getting new note" + newNote);
            res.json({status: 'fine',
                             newNote: newNote,
                            })
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: error})
        }
    } else {
        try {
            await Note.create({
                email: email,
                block: block,
                note: 'Click here to add a note for the block!',
            })
            res.json({status: 'fine', newNote: 'Click here to add a note for the block!',
                            })
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: error})
        }
    }
    

});

app.get('/api/getCSV',async (req,res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, secret)
        const email = decoded.email
        let data = await Data.find({ email: email}).sort( { date: 1 } )
        data = JSON.parse(JSON.stringify(data));
        const csv = new objectstocsv(data);
   
        // Save to file:
        await csv.toDisk('./test.csv');
    
        // Return the CSV file as string:
        
        res.json({status: 'fine',
                         data: csv,
                        })
    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
});

app.post('/api/delete_lift', async (req,res) => {
    console.log("deleting data");
    
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, secret)
        const email = decoded.email
        // const date = decoded.date;
        const data = await Data.deleteOne({ email: email, lift: req.body.curLift, date: req.body.curDate});
        if (data.deletedCount === 1) {
            res.json({status: 'Found and deleted',
                        })
          } else {
            res.json({status: 'Failed delete',
        })
          }
        
    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }

});

app.post('/api/lift', async (req,res) => {
    
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, secret)
        const email = decoded.email
        await Data.updateOne(
            { email: email}, 
            { $set: { lift: req.body.lift}})

        res.json({status: 'ok'})
    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }

});

app.post('/api/update_sheet', async (req,res) => {

    const exists = await Sheet.findOne({
        email: req.body.email,
        block: req.body.block,
    })
    if(exists){
        try {
            const filter = {email: req.body.email, block: req.body.block};
            const toUpdate = {
                            $set: {sheetData: req.body.sheetData},
            }
            console.log('updating sheet');
            await Sheet.updateOne(filter, toUpdate);
            res.json({status: 'sheet updated'});
        } catch (err) {
            res.json({status: 'bad', error: err + 2})
        }
    } else{
        try {
            console.log("inserting new sheet");
            await Sheet.create({
                email: req.body.email,
                block: req.body.block,
                sheetData: req.body.sheetData,
            })
            res.json({status: 'sheet updated'});
        } catch (err) {
            res.json({status: 'bad', error: err})
        }
} 

});
app.get('/api/get_sheet', async (req,res) => {
    
    const token = req.headers['x-access-token'];
    const block = req.headers['block'];
    if(block != 'exampleSheetTest123' && block){
        try {
            const decoded = jwt.verify(token, secret)
            const email = decoded.email
            const sheetData = await Sheet.findOne({ email: email, block: block})
            console.log("getting sheet for " +block);
            res.json({status: 'fine',
                             data: sheetData,
                            })
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: 'invalid token'})
        }
    } else if(block == 'exampleSheetTest123'){
        try {
            const email = 'exampleUser@example.com'
            const sheetData = await Sheet.findOne({ email: email, block: block})
            res.json({status: 'fine',
                             data: sheetData,
                            })
        } catch(error){
            console.log(error)
            res.json({status: 'error', error: 'invalid token'})
        }
    }else {
        res.json({status: 'error', error: 'block doesnt exist?'})
    }
    

});

app.post('/api/lift_list', async (req,res) => {
    const decoded = jwt.verify(req.body.token, secret)
    const email = decoded.email
    const exists = await Lift.findOne({
        email: email,
        lift: req.body.lift,
    })
    if(exists){
        res.json({status: 'bad', error: "Lift already exists"})
    } else{
        try {
            
            console.log("creating lift");
            console.log(email, req.body.lift)
            await Lift.create({
                email: req.body.email,
                lift: req.body.lift,
            })
            res.json({status: 'good'});
        } catch (err) {res.json({status: 'bad', error: err + 1})}
} 

});

app.get('/api/get_colors', async (req,res) => {
    try{
        const colors = await Colors.find({
        })
        res.json({status: 'good', colors: colors}); 
    } catch (err){
        res.json({status: 'bad', error: err});
    }
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
}

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
});