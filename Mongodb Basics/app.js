
const mongoose = require('mongoose');


mongoose.connect(
    'mongodb+srv://kolawoleolari:kolawoleolari092@cluster0.8arrbk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
.then(() => console.log("database connected successfully"))
.catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: {type: Date, default: Date.now}
});

//Create user model
const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
    try {
        //create a new doc
        const newUser = await User.create({
            name: 'Updated User',
            email: 'updateduser@gmail.com',
            age: '75',
            isActive: true,
            tags: ['cloud', 'solutions'],
        });

        /*
        const newUser = await User.create({
            name: 'Kola Olaribigbe',
            email: 'kola@gmail.com',
            age: '33',
            isActive: true,
            tags: ['developer', 'cloud', 'solutions'],
        });
        await newUser.save()
        */

        console.log('Created new user', newUser);

        // const allUsers = await User.find({});
        // console.log(allUsers);
        
        // const getUserOfActiveFalse = await User.find({isActive : true});
        // console.log(getUserOfActiveFalse);
        
        // const getJohnDoeUser = await User.findOne({name: "John Doe"})
        // console.log(getJohnDoeUser);

        // const getLastCreatedUSerByUserId = await User.findById(newUser._id);
        // console.log(getLastCreatedUSerByUserId, "getLastCreatedUSerByUserId");
        
        // const selectedFields = await User.find().select('name email -_id');
        // console.log(selectedFields);
        
        // const limitedUSers = await User.find().limit(5).skip(1);
        // console.log(limitedUSers);
        
        // const sortedUsers = await User.find().sort({age: 1});
        // console.log(sortedUsers);
        
        // const countDocuments = await User.countDocuments({isActive: true});
        // console.log(countDocuments);
        
        // const deletedUser = await User.findByIdAndDelete(newUser._id);
        // console.log("deleted user ->", deletedUser);
        
        const updateUser = await User.findByIdAndUpdate(newUser._id, 
            {
                $set: {age: 100}, 
                $push: {tags: 'updated'},
            },
            { new: true }
        );
        console.log(updateUser);
        
    } catch (e) {
        console.log('Error ->', e);
    } finally {
        await mongoose.connection.close();
    }
}
runQueryExamples();