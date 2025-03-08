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
        // tree.insert(num)
    })
    console.log(tree)
}

// createBinaryTree()

// 二叉搜索树

// 遍历
// 基础


function traverse(node) {
    if (node == null) {
        return;
    }
    
    traverse(root.left);
    traverse(root.right)
}

