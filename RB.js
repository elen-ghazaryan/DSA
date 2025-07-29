const RED = "red";
const BLACK = "black";

class Node {
    right = null;
    left = null;
    parent = null;
    color = RED;

    constructor(val) {
        this.value = val;
    }
}

class RBTree {
    root = null;

    insert(value) {
        const node = new Node(value);
        this.root = this.#insert(this.root, node);
        this.#fixInsert(node);
        this.root.color = BLACK;
    }

    #insert(root, node) {
        if (!root) return node;

        if (node.value < root.value) {
            root.left = this.#insert(root.left, node);
            root.left.parent = root;
        } else if (node.value > root.value) {
            root.right = this.#insert(root.right, node);
            root.right.parent = root;
        }

        return root;
    }

    #fixInsert(node) {
        while (node.parent && node.parent.color === RED) {
            const gp = node.parent.parent;
            const uncle = node.parent === gp.left ? gp.right : gp.left;
            if (!gp) break;

            if (uncle && uncle.color === RED) {
                node.parent.color = BLACK;
                uncle.color = BLACK;
                gp.color = RED;
                node = gp;
            } else {
                if (node.parent === gp.right) {
                    if (node === node.parent.left) {
                        node = node.parent;
                        this.rotateRight(node);
                    }
                    node.parent.color = BLACK;
                    gp.color = RED;
                    this.rotateLeft(gp);
                } else {
                    if (node === node.parent.right) {
                        node = node.parent;
                        this.rotateLeft(node);
                    }
                    node.parent.color = BLACK;
                    gp.color = RED;
                    this.rotateRight(gp);
                }
            }
        }
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        x.right = T2;
        if (T2) T2.parent = x;

        y.parent = x.parent;
        if (!x.parent) {
            this.root = y;
        } else if (x === x.parent.left) {
            x.parent.left = y;
        } else {
            x.parent.right = y;
        }

        y.left = x;
        x.parent = y;
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        y.left = T2;
        if (T2) T2.parent = y;

        x.parent = y.parent;
        if (!y.parent) {
            this.root = x;
        } else if (y === y.parent.left) {
            y.parent.left = x;
        } else {
            y.parent.right = x;
        }

        x.right = y;
        y.parent = x;
    }

    #transplant(u, v) {
        if (!u.parent) {
            this.root = v;
        } else if (u === u.parent.right) {
            u.parent.right = v;
        } else {
            u.parent.left = v;
        }
        if (v) v.parent = u.parent;
    }

    find(value) {
        let curr = this.root;
        while (curr) {
            if (curr.value === value) return curr;
            else if (value > curr.value) curr = curr.right;
            else curr = curr.left;
        }
        return null;
    }

    minimum(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    delete(value) {
        const node = this.find(value);
        if (!node) return;
        this.#deleteNode(node);
    }

    #deleteNode(node) {
        let y = node;
        let x;
        let yColor = y.color;

        if (!node.left) {
            x = node.right;
            this.#transplant(node, x);
        } else if (!node.right) {
            x = node.left;
            this.#transplant(node, x);
        } else {
            y = this.minimum(node.right);
            x = y.right;
            yColor = y.color;

            if (y.parent === node) {
                if (x) x.parent = y;
            } else {
                this.#transplant(y, x);
                y.right = node.right;
                if (y.right) y.right.parent = y;
            }

            this.#transplant(node, y);
            y.left = node.left;
            if (y.left) y.left.parent = y;
            y.color = node.color; // Keep original color
        }

        if (yColor === BLACK) {
            this.#deleteFixUp(x, x ? x.parent : y.parent);
        }
    }

    #deleteFixUp(x, parent) {
        while (x !== this.root && this.isBlack(x)) {
            if (!parent) break;
            let sibling = x === parent.left ? parent.right : parent.left;

            // Case 1: sibling is red
            if (sibling && sibling.color === RED) {
                sibling.color = BLACK;
                parent.color = RED;
                if (sibling === parent.right) {
                    this.rotateLeft(parent);
                } else {
                    this.rotateRight(parent);
                }
                sibling = x === parent.left ? parent.right : parent.left;
            }

            // Case 2: sibling and both children are black
            if (this.isBlack(sibling.left) && this.isBlack(sibling.right)) {
                sibling.color = RED;
                x = parent;
                parent = x.parent;
            } else {
                // Case 3
                if (
                    x === parent.left &&
                    this.isBlack(sibling.right) &&
                    sibling.left &&
                    sibling.left.color === RED
                ) {
                    sibling.color = RED;
                    sibling.left.color = BLACK;
                    this.rotateRight(sibling);
                    sibling = parent.right;
                } else if (
                    x === parent.right &&
                    this.isBlack(sibling.left) &&
                    sibling.right &&
                    sibling.right.color === RED
                ) {
                    sibling.color = RED;
                    sibling.right.color = BLACK;
                    this.rotateLeft(sibling);
                    sibling = parent.left;
                }

                // Case 4
                sibling.color = parent.color;
                parent.color = BLACK;
                if (x === parent.left) {
                    if (sibling.right) sibling.right.color = BLACK;
                    this.rotateLeft(parent);
                } else {
                    if (sibling.left) sibling.left.color = BLACK;
                    this.rotateRight(parent);
                }
                x = this.root;
            }
        }
        if (x) x.color = BLACK;
    }

    isBlack(node) {
        return !node || node.color === BLACK;
    }
}