// 基本二分查找
const search = (arr, target) => {
    let left = 0
    let right = arr.length - 1;

    while(left <= right) {
        const mid = right + left >> 1;
        
        if (arr[mid] > target) {
            right = mid - 1
        } else if (arr[mid] < target) {
            left = mid + 1
        } else {
            return mid
        }
    }
    return -1
}

// 左边界的二分查找
const leftBound = (arr, target) => {
    let left = 0;
    let right = arr.length;
    
    while( left < right) {
        
    }
}
// 右边界的二分查找