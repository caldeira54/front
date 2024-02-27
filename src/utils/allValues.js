const allValues = [];

for (var i = 0; i < sessionStorage.length; i++) {
    var value = sessionStorage.getItem(sessionStorage.key(i));
    allValues.push(value);
}

console.log('all values', allValues);

export default allValues;

// const allValues = [];
// const prefix = '@id/';

// for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);

//     if (key.startsWith(prefix)) {
//         const value = localStorage.getItem(key);
//         allValues.push(value);
//     }
// }

// console.log('all values', allValues);

// export default allValues;