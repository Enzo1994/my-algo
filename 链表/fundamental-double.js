import deepClone from "../utils/clone-deep.js";

const DoubleLinkedList = function (val) {
    this.prev = null;
    this.next = null;
    this.val = val
}
const array = [1,2,3,4,5,6]
const pos = 4
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
    console.log('reverse-------------------', tail.val, iterateNode)
    
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

const addFromMiddle = createDoubleLinkedList();
const newMiddle = new DoubleLinkedList(222)
let node = addFromMiddle
for(let i = 1 ; i < pos - 1; i++) {
    node = node.next
}
newMiddle.next = node.next
newMiddle.prev = node;
node.next.prev = newMiddle;
node.next = newMiddle;
iterate(addFromMiddle, val => console.log('middleInsert', val))


// 3. 从尾

const addFromLast = createDoubleLinkedList();
const newTail = new DoubleLinkedList(333);
node = addFromLast

// for(; node.next != null ; node = node.next) {}
while(node.next != null) {
    // 最后结果是倒数第二个
    node = node.next
}
newTail.prev = node;
node.next = newTail;
iterate(addFromLast, (val) => console.log('lastInsert',val))


// 删
// 1. 从头

const deleteFromHead = createDoubleLinkedList();
if(deleteFromHead.next) {
    deleteFromHead.next.prev = null
}
console.log('deleteHead', deleteFromHead.next)


// 2. 从中

const deleteFromMiddle = createDoubleLinkedList();
node = deleteFromMiddle;

for(let i = 1; i < pos - 1; i++) {
    node = node.next
}
const next = node.next.next
if (next) {
    next.prev = node;
}
node.next = next
iterate(deleteFromMiddle, (val) => console.log('middleDelete',val))


// 3. 从尾

const deleteFromLast = createDoubleLinkedList();
node = deleteFromLast;
if (node.next == null) {
    while(node.next.next != null) {
        node = node.next
    }
    node.next = null;
}

iterate(deleteFromLast, (val) => console.log('lastDelete',val))

export default {}