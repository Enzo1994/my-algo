// 需要一个 result 记录
// 需要 result 的原因：暂存当前找到的位置，避免错过正确位置
// 如果你省略了这个赋值，而是继续查找，即使找到了目标，也不会记录位置，最后可能就返回 -1 了。

var searchRange = function(nums, target) {
    const findLeft = () => {
        let left = 0 ;
        let right = nums.length
        let result = -1;

        while(left < right) {
            const mid = left + (right - left >> 1)
            if (nums[mid] > target) {
                right = mid;
            } else if (nums[mid] < target) {
                left = mid + 1
            } else {
                result = mid;
                right = mid
            }
        }
        return result 
    }
    const findRight = () => {
        let left = 0 ;
        let right = nums.length
        let result = -1;
        while (left < right) {
            const mid = left + (right - left >> 1)
            if (nums[mid] > target) {
                right = mid
            } else if (nums[mid] < target) {
                left = mid + 1
            } else {
                result = mid
                left = mid + 1
            }
        }
        return result
    }

    if (!nums.includes(target)) {
        return [-1, -1]
    }
    const l = findLeft()
    const r = findRight()
    return [l, r]
};