/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let l = 0;
    let r = nums.length - 1;

    while(l <= r) {
        const m = (l + r) >> 1;

        if(nums[m] > target) {
            r = m - 1
        } else if (nums[m] < target) {
            l = m + 1
        } else {
            return m
        }
    }
    return -1
};

var search = function(nums, target) {
    let l = 0;
    // 区别在这
    let r = nums.length;
    
    while(l < r) {
        const mid = l + (r - l >> 1)
        if(nums[mid] > target) {
            // 区别在这
            right = mid
        } else if (nums[mid] < target) {
            left = mid + 1
        } else {
            // 区别在这
            return mid
        }
    }
    return -1
}