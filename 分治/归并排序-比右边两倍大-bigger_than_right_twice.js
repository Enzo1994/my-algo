
const nums = [6,7,1,3,2]

const merge = (arr, l, m, r) => {

    const help = []
    let i = l;
    let j = m + 1;
    let sum = 0;

    for (; i <= m; i++) {
        j = m+1;
        while(arr[j] << 1 < arr[i] && j <= r) {
            sum++;
            j++
        }
    }

    let x = l;
    let y = m + 1;

    while (x <= m && y <= r) {
        help.push(arr[x] <= arr[y] ? arr[x++] : arr[y++])
    }

    while (x <= m) {
        help.push(arr[x++])
    }

    while (y <= r) {
        help.push(arr[y++])
    }

    for (let i = 0; i < help.length; i++) {
        arr[l + i] = help[i];
    }

    return sum
}

const biggerThanRightTwice = (arr, l, r) => {
    if (l === r) {
        return 0
    }

    const m = (l + r) >> 1;

    return biggerThanRightTwice(arr, l, m) +
        biggerThanRightTwice(arr, m + 1, r) +
        merge(arr, l, m, r)
}

const res = biggerThanRightTwice(nums, 0, nums.length - 1)
console.log(res)