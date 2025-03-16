// 二叉树层序遍历（广度优先）
const levelOrderTraverse = (root) => {
    const queue = [root]

    let depth = 1;
    while (queue.length) {
        const size = queue.length 
        for(let i = 0 ; i < size; i++) {
            const currentNode = queue.shift();
            
            if (currentNode.left) {
                queue.push(currentNode.left)
            } 
            if (currentNode.right) {
                queue.push(currentNode.right)
            }
        }
        depth++
    }
}

const levelOrderTraverseWithMermind = (root) => {
    if (!root) return [];

    const mermaid = []
    const mermaidHead = []
    const queue = [];
    // Map 用于记录每个节点对应的唯一 id
    const nodeToId = new Map();
    let nodeId = 0;


    // 为根节点分配 id 并加入 mermaid 代码
    const rootId = "node" + nodeId++;
    nodeToId.set(root, rootId);
    mermaidHead.push(`${rootId}["${root.val}"]`);

    // 将根节点放入队列
    queue.push(root);

    // 层序遍历
    while (queue.length) {
        const currentNode = queue.shift();
        const currentId = nodeToId.get(currentNode);

        // 处理左子节点
        if (currentNode.left) {
            const leftId = "node" + nodeId++;
            nodeToId.set(currentNode.left, leftId);
            // 定义左子节点
            mermaidHead.push(`${leftId}["${currentNode.left.val}"]`);
            // 添加连接：当前节点 --> 左子节点
            mermaid.push(`${currentId} --> ${leftId}`);
            queue.push(currentNode.left);
        }
        // 处理右子节点
        if (currentNode.right) {
            const rightId = "node" + nodeId++;
            nodeToId.set(currentNode.right, rightId);
            // 定义右子节点
            mermaidHead.push(`${rightId}["${currentNode.right.val}"]`);
            // 添加连接：当前节点 --> 右子节点
            mermaid.push(`${currentId} --> ${rightId}`);
            queue.push(currentNode.right);
        }
    }
    // 添加 Mermaid 图头部
    mermaidHead.unshift("graph TD");

    return mermaidHead.concat(['', ...mermaid])
};
const mermaid3 = levelOrderTraverseWithMermind(createBinaryTree().root)
const div3 = document.createElement('div')
div3.classList.add('mermaid')
console.log( mermaid3.join(""))

div3.innerText = '      ' + mermaid3.join("\n") + ' '

document.body.appendChild(div3)


const State = function(node, depth) {
    this.depth = depth
    this.node = node
}
// 带状态的节点遍历
const levelOrderTraverseWithState = (root) => {
    if (!root) {
        return 
    }

    const queue = [new State(root, 1)]

    while(queue.length) {
        const size = queue.length;
        for(let i = 0 ; i < size.length; i++) {
            const curNode = queue.unshift()
            
            if (curNode.node.left) {
                queue.push(new State(curNode.node.left, curNode.node.depth + 1))
            }
            if (curNode.node.right) {
                queue.push(new State(curNode.node.right, curNode.node.depth + 1))
            }
        }
        
    }
}