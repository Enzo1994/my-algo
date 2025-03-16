
const TreeNode = function(val) {
    this.val = val;
    this.left = null;
    this.right = null;

}

class BinaryTree {
    constructor() {
        this.root = null
    }

    insert(val){
        const newNode = new TreeNode(val)
        if (!this.root) {
            this.root = newNode
            return
        }

        let node = this.root
        while(true) {
            if(node.val > val) {
                if (!node.left) {
                    node.left = newNode
                    return
                }
                node = node.left
            } else {
                if (!node.right) {
                    node.right = newNode
                    return
                }
                node = node.right
            }
        }
    }
}


const arr = [8,1,5,9,3,7,4,6];
const createBinaryTree = () => {
    const tree = new BinaryTree;

    const a = JSON.parse(JSON.stringify(arr))
    a.forEach(num => {
        tree.insert(num)
    })

    return tree
}

// 二叉搜索树

// 遍历

// 二叉树递归（深度优先）
const traverseArray = []
function traverse(node) {
    if (node == null) {
        return;
    }
    traverseArray.push(node.val)
    traverse(node.left);
    traverse(node.right)
}

const res = createBinaryTree();
traverse(res.root)

console.log(traverseArray)


