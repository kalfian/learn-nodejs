require('../src/db/mongoose')
const Task = require('../src/models/Task')

// Use Promise Chain
// Task.findByIdAndDelete('5e02510737f0d9090a790cae').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ isComplete: false })
// }).then((result) => {
//     console.log(result)
// }).catch(error => {
//     console.log(error)
// })

// Use async/await
const deleteTask = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ isComplete: false })
}

deleteTask('5e02510737f0d9090a790cae').then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})