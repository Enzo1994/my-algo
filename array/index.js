var search = function(nums, target) {
    if(!nums.includes(target)) {
        return -1
    }
    let left = 0
    let right = nums.length;
    while(left < right) {
        debugger
        const mid = Math.floor((right - left) / 2) + left;
        if(nums[mid] === target) {
            return mid;
        }
        if(nums[mid] > target) {
            right = mid
        } else {
            left = mid
        }
    }
};

search([0,5], 0)