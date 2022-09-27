const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

const fruitSchema = new mongoose.Schema ({
    name:  {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

/* const fruit = new Fruit ({    
    rating: 10,
    review: "Peachs are so yummy!."
}) */

const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

/* const pineapple = new Fruit({
    name: "Pineapple",
    score: 9,
    review: "Great fruit."
}); */

 const melon = new Fruit({
    name: "Melon",
    score: 8,
    review: "Melon musk"
})

melon.save(); 

 const person = new Person ({
    name: "John",
    age: 37,
    favouriteFruit: melon
}); 



/* Person.updateOne({name: "John"}, {favouriteFruit: "melon"}, function(err){
    if(err) {
        console.log(err)
    } else {
        console.log("Successfully updated the document.")
    }
}) */





person.save();
//fruit.save();
// comented because you just need save one time


/* const kiwi = new Fruit({
    name: "Kiwi",
    score: 10,
    review: "The best fruit!"
});

const orange = new Fruit({
    name: "Orange",
    score: 4,
    review: "Too sour for me"
});

const banana = new Fruit({
    name: "Banana",
    score: 3,
    review: "Weir texture"
});
 */
/* Fruit.insertMany([kiwi, orange, banana], function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Succesfully saved all the fruits to fruitsDB")
    }
}
); */


 Fruit.find(function(err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();

        fruits.forEach((value) => {
            console.log(value.name);
        });
    }
}); 

/* Fruit.updateOne({_id: "6333144ae2485dd63bc1afe6"}, {name: "Peach"}, function(err){
    if(err) {
        console.log(err);
    } else {
        console.log("Successfully updated the document.")
    }
}); */

/* Fruit.deleteOne({name: "Peach"}, function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Deleted!")
    }
}) */
//Person.deleteMany({name: "John", age: {$gte: 18} }).exec();



const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('fruits');
    // Insert some documents
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        },
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Greate stuff!"
        }
    ], function(err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};