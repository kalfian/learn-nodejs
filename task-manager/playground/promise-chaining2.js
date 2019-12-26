require('../src/db/mongoose')
const User = require('../src/models/User')

// Use promise chain
User.findByIdAndUpdate('5e021a252b25d106e597316c', { age: 1 })
    .then(user => User.countDocuments({ age: 1 }))
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })

// Use async await
const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({age})
    return count
}

updateAgeAndCount('5e021a252b25d106e597316c', 5).then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})