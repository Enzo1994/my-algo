const nums = [38, 27, 43, 3, 9, 82, 10]

const merge = (arr, l, m, r) => {
  const help = [];

  let i = l;
  let j = m + 1
  while (i <= m && j <= r) {
    help.push(arr[i] <= arr[j] ? arr[i++] : arr[j++]) 
  }

  while (i <= m) {
    help.push(arr[i++])
  }
  
  while (j <= r) {
    help.push(arr[j++])
  }

  for(let idx = 0 ; idx < help.length ; idx++) {
    arr[l + idx] = help[idx]
  }

}

const mergeSort = (arr, l, r) => {

  if (l === r) {
    return
  }

  const m = (l + r) >> 1;

  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);

  merge(arr, l, m, r)


}

mergeSort(nums, 0, nums.length - 1)

console.error(nums)