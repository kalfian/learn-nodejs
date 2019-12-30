const foo = (x, a, b, i, j) => {
    let k = j
    let ct = 0
    while(k > i-1) {
        if((x[k] <= b) && !(x[k] <= a)){
            ct = ct+1
        }
        k = k-1
    }
    
    return ct
}

const x = [11, 10, 10, 5, 10, 15, 20, 10, 7, 11]

// console.log(foo(x, 8, 18, 3, 6))
// console.log(foo(x, 10, 20, 0, 9))
// console.log(foo(x, 8, 18, 6, 3))
// console.log(foo(x, 20, 10, 0, 9))
// console.log(foo(x, 6, 7, 8, 8))


const g = (str) => {
    let i = 0
    let new_str = ""
    while(i < str.length - 1) {
        new_str = new_str + str[i + 1]
        i=i+1
    }

    return new_str
}

const f = (str) => {
    if(str.length == 0) {
        return ""
    } else if(str.length == 1) {
        return ""
    } else {
        return f(g(str)) + str[0]
    }
}

const h = (n, str) => {
    while(n != 1) {
        if(n % 2 == 0) {
            n = n/2
        } else {
            n = 3*n + 1
        }

        str = f(str)
    }

    return str
}

const pow = (x, y) => {
    if(y == 0) {
        return 1
    } else {
        return x*pow(x, y-1)
    }
}

console.log(h(1, "fruits"))
console.log(h(2, "fruits"))
console.log(h(5, "fruits"))
console.log(h(pow(2, 1000000000000000), "fruits"))
console.log(h(pow(2, 983105005000007), "fruits"))