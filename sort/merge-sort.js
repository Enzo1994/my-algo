const nums = [38, 27, 43, 3, 9, 82, 10]

const merge = (arr, l, m, r) => {
  const help = [];
  
  

}

const mergeSort = (arr, l, r) => {
  
  if(l === r) {
    return 
  }

  const m = (l + r) >> 1;

  mergeSort(arr, l, m);
  mergeSort(arr, l, m + 1);

  merge(arr, l, m, r)
}