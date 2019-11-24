import ksdflksdf from './mod.js'
//let asdasd;

console.log(ksdflksdf)
console.log('aaa')
const map = {
    data: new Map([
        ['a', 42],
        [0, 'hoge'],
        [{name: 'taro', age: 18}, [6, 12, 15, 18]],
    ]),
    list: [
        new Map([
            ['b', 8],
            ['c', 10],
        ]),
        10,
        new Map([
            [new Map([]), new Map([
                [true, 1],
                [false, 0],
            ])],
        ]),
    ],
}
console.log(map)
//console.log(ksdflksdf([...map]))
//console.log(JSON.stringify([...map]))

const jsonStr = JSON.stringify(map, function(key, val) {
    if (val instanceof Map) {
        return {
            __type__: 'Map',
            __value__: [...val]
        }
    }
    return val
})

const newObj = JSON.parse(jsonStr, function(key, val) {
    if (val != null && val.__type__ === 'Map') {
        return new Map(val.__value__)
    }
    return val
})

console.log(jsonStr)
// console.log(obj);
console.log(newObj)

const arr = [
    ['a', 100],
    ['b', 200],
    ['c',
        ['a', 100],
        ['b', 200],
        ['c', 300],],
]
console.log(arr)
console.log(JSON.stringify(arr, null, 4))

const dfggd = {
    a: 100, b: function() {
        let v = 1
        let a = 100
    }, c: {a: 100, b: 200, c: 333}
}
console.log(dfggd)
//dfggd = 
console.log(JSON.stringify(dfggd, function(key, val) {
    if (typeof val == 'function') {
        return val.toString() + '\n hoge'
    }
    return val
}, 2))
// console.log(JSON.stringify)
