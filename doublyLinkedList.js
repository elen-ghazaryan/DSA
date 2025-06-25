//Doubly Linked List

class Node {
    next = null;
    prev = null;

    constructor(value) {
        this.value = value
    }
}

class LinkedListDoubly{
    head = null;
    tail = null;

    insert(value) {
        const node = new Node(value)
        if(!this.head) {
            this.head = this.tail = node
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node
        }
    }

    removeLast() {
        if (!this.tail) return;
    
        if (this.head === this.tail) {
            // Only one node
            this.head = this.tail = null;
        } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
    }

    removeFirst() {
        if(!this.head) return;

        if(this.head === this.tail) {
            this.head = this.tail = null;
        } else {
            this.head = this.head.next;
            this.head.prev = null;
        }
    }

    insertFirst(value) {
        const node = new Node(value)
        if(!this.head) {
            this.head = this.tail = node
        } else {
            this.head.prev = node;
            node.next = this.head
            this.head = node
        }
    }

    search(value) {
        if(!this.head) return false;

        let left = this.head;
        let right = this.tail;

        while (left && right && left !== right && left.prev !== right) {
            if(left.value === value || right.value === value) return true;

            left = left.next;
            right = right.prev;
        }

        return false;
    }

    removeValue(value) {
        if(!this.head) return;

        let curr = this.head;

        while(curr) {
            if(curr.value === value) {
                if(curr === this.head && curr === this.tail) {
                    this.head = this.tail = null;
                    return;
                }else if(curr === this.head) {
                    this.head = curr.next;
                    this.head.prev = null;
                    curr = this.head;
                    continue;
                } else if(curr === this.tail) {
                    this.tail = curr.prev;
                    this.tail.next = null;
                    break;
                } else {
                    curr.prev.next = curr.next;
                    curr.next.prev = curr.prev;
                    curr = curr.next;
                    continue;
                }
            }
            curr = curr.next
        }
    }

    get(index) {
        if(index < 0) return null;

        let curr = this.head;
        let count = 0;
        while(curr) {
            if(count === index) return curr;

            count++;
            curr = curr.next;
        }
        return null;
    }

    set(index, value) {
        const node = this.get(index);
        if(!node) return false;
        node.value = value;
        return true;
    }

    insertAt(index, value) {
        if (index < 0) return; 

        const newNode = new Node(value);
        const nodeAtIndex = this.getNode(index);

        if (!nodeAtIndex) {
            if (!this.tail) {
                this.head = this.tail = newNode;
            } else {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
            return;
        }

        if (nodeAtIndex === this.head) {
            newNode.next = nodeAtIndex;
            nodeAtIndex.prev = newNode;
            this.head = newNode;
        } else {
            newNode.prev = nodeAtIndex.prev;
            newNode.next = nodeAtIndex;
            nodeAtIndex.prev.next = newNode;
            nodeAtIndex.prev = newNode;
        }
    }

    removeAt(index) {
        if (index < 0) return false; 

        const nodeToRemove = this.getNode(index);
        if (!nodeToRemove) return false;

       
        if (nodeToRemove === this.head) {
            this.head = nodeToRemove.next;
            if (this.head) {
                this.head.prev = null;
            } else {
                this.tail = null;
            }
        }
        
        else if (nodeToRemove === this.tail) {
            this.tail = nodeToRemove.prev;
            if (this.tail) {
                this.tail.next = null;
            } else {
                this.head = null;
            }
        }
    
        else {
            nodeToRemove.prev.next = nodeToRemove.next;
            nodeToRemove.next.prev = nodeToRemove.prev;
        }

        return true; 
    }

    indexOf(value) {
        let curr = this.head;
        let count = 0;
        while(curr) {
            if(curr.value === value) return count;

            count++;
            curr = curr.next;
        }
        return -1;
    }
    
}