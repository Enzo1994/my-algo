const nums = [-2, 5, -1];

const merge = (arr, l, m, r) => {

    let x = l;
    let y = m + 1;
    let res = 0;

    
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