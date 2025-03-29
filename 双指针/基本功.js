// 167. 两数之和 II - 输入有序数组
const twoSum = (arr, target) => {
    let low = 0
    let high = arr.length - 1;
    const res = []
    while (low < high) {
        const sum = arr[low] + arr[high]
        if (sum > target) {
            while (sum === arr[high]) high--
        } else if (sum < target) {
            while (sum === arr[low]) low++
        } else {
            res.push([low, high])
            while (sum === arr[low]) high--
            while (sum === arr[high]) low++
        }
    }
    return res
}

// N数之和

const nSum = (arr, sum, start, target) => {
    const size = arr.length;
    const res = [];

    if (sum === 2) {
        let low = start;
        let high = arr.length - 1
        while (low < high) {

            let left = arr[low];
            let right = arr[high];
            if (left + right > target) {
                while (low < high && right === arr[high]) high--
            } else if (left + right < target) {
                while (low < high && left === arr[low]) low++
            } else {
                res.push([left, right])
                while (low < high && left === arr[left]) low++
                while (low < high && right === arr[high]) high--
            }
        }
    } else {
        for (let i = 0 ; i < arr.length ; i++) {
            const sumList = nSum(arr, sum - 1, i, target);
            for(const item of sumList) {
                item.push(arr[i])
                res.push(item)
            }
        }
    }

    return res
}

