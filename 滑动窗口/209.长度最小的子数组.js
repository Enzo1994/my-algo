/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    let l = 0;
    let r = 0;

    let total = 0
    let length = 0;
    for (; r < nums.length ; r++) {
        total += nums[r]

        if (total < target) {
            continue;
        }


        while(total - nums[l] >= target) {
            // 如果 l 出去了 还能符合
            total -= nums[l];
            l++

        }

        length = !length ? r - l + 1  : Math.min(r - l + 1, length);
    }
    return length
};
