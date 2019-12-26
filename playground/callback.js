setTimeout(() => {
    console.log("two seconds are up")
}, 2000)

const names = ['Jo', 'Niangels', 'bongor', 'bo']
const sortNames = names.filter((name) => {
    return name.length <= 4
})