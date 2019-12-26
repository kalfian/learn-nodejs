const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

// withouth promise chain
add(5, 6).then(sum => {
    console.log(sum)

    add(sum, 3).then(sum2 => {
        console.log(sum2)
    }).catch(e => {
        console.log(e)
    })
}).catch(e => {
    console.log(e)
})

// With promse chain

add(5, 6).then(sum => {
    console.log(sum)
    return add(sum, 3)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.log(e)
})