
const heapify = (arr, size, parentNodeIdx) => {

    const leftChild = parentNodeIdx * 2 + 1
    const rightChild = parentNodeIdx * 2 + 2

    let largest = parentNodeIdx;

    if (leftChild < size && arr[leftChild] > arr[parentNodeIdx] ) {
        largest = leftChild
    }

    if (rightChild < size && arr[rightChild] > arr[parentNodeIdx]) {
        largest = rightChild
    }

    if (largest !== parentNodeIdx) { 
        [arr[largest], arr[parentNodeIdx]] = [arr[parentNodeIdx], arr[largest]]
        heapify(arr, size, largest)
    }
}

const arr = [4, 10, 3, 5, 1];

const buildMaxHeap = () => {

    const size = arr.length
    const lastNonLeafNodeIdx = (arr.length - 1 >> 1) - 1

    console.log(lastNonLeafNodeIdx)

    for (let i = lastNonLeafNodeIdx; i >= 0; i--) {
        heapify(arr, size, i)
    }

    console.log(arr)
}

buildMaxHeap()