import deepClone from "../utils/clone-deep.js";

const DoubleLinkedList = function (val) {
    this.prev = null;
    this.next = null;
    this.val = val
}
const array = [1,2,3,4,5,6]

const createDoubleLinkedList = () => {
    const head = new DoubleLinkedList(array[0])
    let node = head
    for(let i = 1; i < array.length ; i++) {
        const next = new DoubleLinkedList(array[i]);
        node.next = next
        next.prev = node;
        node = node.next
    }

    return head;
}

const doubleLinkedList = createDoubleLinkedList();
console.log(doubleLinkedList)

// 遍历
const iterate = (dbll, cb) => {
    let iterateNode = dbll
    
    let tail = null;
    // 1. 从头
    while (iterateNode != null) {
        cb(iterateNode.val)
        tail = iterateNode;
        iterateNode = iterateNode.next
    }
    console.log('reverse-------------------')
    // 2. 从尾
    while(tail != null) {
        cb(tail.val)
        tail = tail.prev
    }
}

iterate(doubleLinkedList, (val) => console.log('doubleIterate',val))

// 增
// 1. 从头
let addFromHeadLL = deepClone(doubleLinkedList)
const newHead = new DoubleLinkedList(111)
addFromHeadLL.prev = newHead;
newHead.next = addFromHeadLL;
iterate(newHead, (val) => console.log('headInsert',val))

// 2. 从中
// 3. 从尾


export default {}