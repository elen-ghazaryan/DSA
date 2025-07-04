class Node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

class BinarySearchTree {
    root = null;

    insert(value) {
        this.root = this.#insert(this.root, value)
    }

    #insert(node, value) {
        if(!node) return new Node(value);

        if(value > node.value) {
            node.right = this.#insert(node.right, value)
        } else if(value < node.value) {
            node.left = this.#insert(node.left, value)
        }

        return node;
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

    contains(value) {
        if(!this.root) return;

        function traverse(node, value) {
            if(!node) return false;
            if(node.value === value) return true;
            
            if(value < node.value) {
                return traverse(node.left, value)
            } else if(value > node.value) {
                return traverse(node.right, value)
            }
        }
        return traverse(this.root, value)
             
    }

    levelorder(node = this.root) {
        if(!node) return []
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

    delete(value) {
        this.root = this.#delete(this.root, value)
    }

    #delete(node, value) {
        if(!node) return null;
        if(value < node.value) {
            node.left = this.#delete(node.left, value)
        } else if(value > node.value) {
            node.right = this.#delete(node.right, value)
        } else {
            if(!node.left || !node.right) {
                return node.left || node.right
            }

            const successor = this.getMin(node.right)
            node.value = successor.value
            node.right = this.#delete(node.right, successor.value)
        }
        return node;
    }
}

