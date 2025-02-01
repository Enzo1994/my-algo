
const arr = [1,2,3,3,3,4,5,6,6,6]

var removeDuplicates = function (nums) {
    let i = 0;
    let j = 0;

    for (; j < nums.length; j++) {
        if (nums[i] === nums[j]) {
            continue
        }
        i++;
        nums[i] = nums[j]
    }

    return nums.slice(0, i+1)
};

const res = removeDuplicates(arr)
console.error(res)