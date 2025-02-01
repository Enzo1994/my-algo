
const nums = [1,2,1,3,5,6,4];

/**
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function() {
    let l = 0;
    let r = nums.length - 1;

    // 先确保数组两端是一升一降
    if (nums[l] > nums[1]) {
        return 0
    }
    if (nums[r] > nums[r - 1]) {
        return r
    }
    
    
    while (l <= r ) {
        const m = (l + r) >> 1;
        
        if(nums[m] > nums[m + 1] && nums[m] > nums[m - 1]) {
            return m
        }

        if (nums[m] < nums[m + 1]) {
            l = m + 1
        } else if (nums[m] < nums[m - 1]) {
            r = m - 1
        } else {
            return m
        }
    }
};


const res = findPeakElement()

console.log(res)