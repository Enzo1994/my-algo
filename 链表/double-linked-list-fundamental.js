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
// 1. 从头
const iterateFromHead = () => {

}
// 2. 从尾
const iterateFromTail = () => {

}