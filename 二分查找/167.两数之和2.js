/**
 * 递归实现二分法
 */

// var twoSum = function (numbers, target) {

//     var merge = (numbers, l, r) => {
//         if (l === r) {
//             return
//         }

//         const m = (l + r) >> 1;
    
//         return merge(numbers, l, m) || merge(numbers, m + 1, r) || span(numbers, l, m, r)

//     }

//     var span = (numbers, l, m, r) => {

//         let i = l;
//         let j = m + 1;

//         for (; j <= r; j++) {
//             i = l
//             while (i <= m) {
//                 if (numbers[j] + numbers[i] === target) {
//                     return [i + 1, j + 1]
//                 }
//                 i++
//             }
//         }
//     }
//     return merge(numbers, 0, numbers.length - 1)
// };

/** 普通二分法 */
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {

    for (let i = 0; i<numbers.length ; i++) {

        let l = i + 1;
        let r = numbers.length - 1;

        while (l < r) {
            const m = (l + r) >> 1;
            if (numbers[m] < target - numbers[i]) {
                r = m
            } else if (numbers[m] > target - numbers[i]) {
                l = m + 1
            } else {
                return [i + 1, m + 1]
            }
        }

    }
    return []
};

const arr = [2,3,4];
const res = twoSum(arr, 6)

console.error(res)