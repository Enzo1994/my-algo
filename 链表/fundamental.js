const arr = [1, 2, 3, 4, 5, 6, 7, 8]

const LinkList = function (value) {
    this.next = null;
    this.val = value;
}

// 1. 创建链表
const createLinkList = (array) => {

    const head = new LinkList(array[0]);
    let node = head;
    for (let i = 1; i < array.length; i++) {
        node.next = new LinkList(array[i]);
        node = node.next
    }
    return head;
}

const linkList = createLinkList(arr)

console.log(linkList)

// 2. 链表的遍历
const iterate = (head, cb) => {
    for (let node = head; node.next != null; node = node.next) {
        cb?.(node)
    }
}

iterate(linkList, console.log)

// 3. 增加链表数据
//   a. 从头
const newNodeHead = new LinkList(99);
newNodeHead.next = linkList

//   b. 从中
const linkListMiddle = JSON.parse(JSON.stringify(linkList))
const newNodeMiddle = new LinkList(88)
const pos = 4;
let nodeMiddle = linkListMiddle;
for (let i = 1; i < arr.length; i++) {
    if (i < pos - 1) {
        nodeMiddle = nodeMiddle.next;
        continue
    }
    newNodeMiddle.next = nodeMiddle.next;
    nodeMiddle.next = newNodeMiddle;
    break

}

iterate(linkListMiddle, (node) => console.log('middleLinkList', node.val))

//   c. 从尾
const linkListAppend = JSON.parse(JSON.stringify(linkList))
const newNodeAppend = new LinkList(987);
let appendNode = linkListAppend
while (appendNode.next != null) {
    appendNode = appendNode.next;
    console.log('appendNode', appendNode.val,)
}
appendNode.next = newNodeAppend
iterate(linkListAppend, (node) => console.log('appendLinkList', node.val))



// 4. 删除链表数据
//   a. 从头
const linkListDeleteStart = JSON.parse(JSON.stringify(linkList))
//   b. 从中

//   c. 从尾
