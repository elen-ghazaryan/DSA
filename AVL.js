class Node {
    left = null;
    right = null;
    height = 1;
    balance = 0;

    constructor(value) {
        this.value = value;
    }
}

class AVLTree {
    root = null;

    /* ------------------- Core op ----------------------------- */
    insert(value) {
        this.root = this.#insert(this.root, value)
    }

    #insert(node, value) {
        if(!node) return new Node(value);

        if(value < node.value) {
            node.left = this.#insert(node.left, value)
        } else if(value > node.value) {
            node.right = this.#insert(node.right, value)
        }

        this.#update(node)
        return this.#balance(node)
    }

    delete(value) {
        this.root = this.#delete(this.root, value)
    }

    #delete(node, value) {
        if(!node) return null;

        if(value > node.value) {
            node.right = this.#delete(node.right, value)
        } else if(value < node.value) {
            node.left = this.#delete(node.left, value)
        } else {
            if(!node.left || !node.right) {
                node =  node.left || node.right
            }else {
                let successor = this.getMin(node.right)
                node.value = successor.value
                node.right = this.#delete(node.right, successor.value)
            }
        }

        if(!node) return null;
        this.#update(node)
        return this.#balance(node)
    }

    contains(value) {
        function traverse(node) {
            if (!node) return false;
            if (node.value === value) return true;
            return value < node.value ? traverse(node.left) : traverse(node.right);
        }
        return traverse(this.root);
    }

    /* ------------------- Strict balancing ----------------------------- */
    #update(node) {
        const left = !node.left ? 0 : node.left.height
        const right = !node.right ? 0 : node.right.height

        node.height = Math.max(left, right) + 1;
        node.balance = left - right
    }

    #balance(node) {
        if(node.balance < -1) {
            if(node.right.balance > 0) {
                node.right = this.#rotateRight(node.right)
            }
            return this.#rotateLeft(node)
        } else if(node.balance > 1) {
            if(node.left.balance < 0) {0
                node.left = this.#rotateLeft(node.left)
            }
            return this.#rotateRight(node)
        }
        return node;
    }

    #rotateLeft(x) {
        let y = x.right;
        let T2 = y.left;

        y.left = x
        x.right = T2

        this.#update(x)
        this.#update(y)
        return y;
    }

    #rotateRight(y) {
        let x = y.left;
        let T2 = x.right;

        x.right = y
        y.left = T2

        this.#update(y)
        this.#update(x)
        return x;
    }

    /* ------------------- Traversals ----------------------------- */
    levelorder(node = this.root) {
        if (!node) return [];
        const queue = [node];
        const result = []
        while(queue.length) {
            const top = queue.shift()
            result.push(top.value)
            if(top.left) queue.push(top.left)
            if(top.right) queue.push(top.right)
        }
        return result
    }

      inorder() {
         const res = [];

        function traverse(node) {
            if(!node) return;
            traverse(node.left)
            res.push(node.value)
            traverse(node.right)
        }

        traverse(this.root);
        return res;
    }

    preorder() {
        const res = [];

        function traverse(node) {
            if(!node) return;
            res.push(node.value)
            traverse(node.left)  
            traverse(node.right)
        }

        traverse(this.root);
        return res;
    }

    postorder() {
        const res = [];

        function traverse(node) {
            if(!node) return;
            traverse(node.left)
            traverse(node.right)
            res.push(node.value)
        }

        traverse(this.root);
        return res;
    }

    /* ------------------- Min and Max ----------------------------- */
    getMin(node = this.root) {
        while(node.left) {
            node = node.left
        }

        return node
    }

     getMax(node = this.root) {
        while(node.right) {
            node = node.right
        }

        return node
    }


}





