
const nums = [3, 5, 6, 9, 13, 17, 24, 36];
const target = 15;


const findMinRight = () => {
    let l = 0;
    let r = nums.length - 1;

    let ret = -1;

    while(l <= r) {
        const m = (l + r) >> 1;

        if (nums[m] <= target) {
            ret = m
            l = m + 1;
        } else {
            r = m - 1
        }
    }

    return ret
}

const res = findMinRight();
console.log(res)