var search = function(nums, target) {
    if(!nums.includes(target)) {
        return -1
    }
    let left = 0
    let right = nums.length;
    while(left < right) {
        console.count()
        const mid = Math.floor((right - left) / 2) + left;
        if(nums[mid] === target) {
            return mid;
        }
        if(nums[mid] > target) {
            right = mid
        } else {
            left = mid + 1
        }
    }
};

search([0,2,3,4,5,6,7,8], 3)