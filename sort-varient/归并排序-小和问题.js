const nums = [1, 3, 5, 2, 4, 6];

const merge = (arr, l, m, r) => {

    let x = l;
    let y = m + 1;
    let res = 0;

    // 此时是无序状态
    // 遍历右边
    for( ;y <= r ; y++ ) {
        let sums = 0;
        x = l;
        while(x <= m && arr[x] <= arr[y]) {
            sums += arr[x++];
        }
        res += sums
    }
    // 右边定死，左边循环

    const help = [];
    let i = l;
    let j = m + 1;

    while(i <= m && j <= r) {
        help.push(arr[i] <= arr[j] ? arr[i++] : arr[j++])
    }

    while(i <= m) {
        help.push(arr[i++])
    }

    while(j <= r) {
        help.push(arr[j++])
    }

    for(let idx = 0 ; idx < help.length ; idx++) {
        arr[l + idx] = help[idx]
    }

    return res;
}

const calArray = (arr, l, r) => {
    if (l === r) {
        return 0
    }

    const m = (l + r) >> 1;

    return (
        calArray(arr, l, m) +
        calArray(arr, m + 1, r) +
        merge(arr, l, m, r)
    )

}

const r = calArray(nums, 0, nums.length - 1)
console.log(r)