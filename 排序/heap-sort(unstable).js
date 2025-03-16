// 堆排序:O(nlogN)
// 每轮排序就是选择剩下里面最大或者最小
// 建堆：O(n)
// 从最后一个非叶节点开始向上调整
// 排序：O(nLogN)
// 每轮堆顶排和最后一个节点互换，然后向下调整成大堆序，次数是 n-1

const arr = [2,8,4,6,]
// const heapify
const heapSort = (arr, ) => {
    // 建堆
    
    const lastNonLeafNodeIdx = arr[arr.length - 1] - 1 >>1
    for(let i = lastNonLeafNodeIdx ; i >= 0 ; i--) {
        
    }
}