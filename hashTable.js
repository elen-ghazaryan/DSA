/* ------------------- Hash table ----------------------------- */
class HashTable {
    #loadFactor = 0.7
    #count = 0;

    constructor(capacity = 11) {
        this.size = capacity;
        this.buffer = Array.from({length: capacity}, () => new Bucket())
    }

    #hash(key) {
        const str = String(key);
        let h = 5381;
        for (let i = 0; i < str.length; ++i)
            h = (h * 33) ^ str.charCodeAt(i);
        return (h >>> 0) % this.size;
    }

    set(key, value) {
        const slot = this.#hash(key)
        const bucket = this.buffer[slot] 
        const node = bucket.findNode(key)
        
        if(node) {
            node.value[1] = value;
            return;
        }
        bucket.insertPair([key, value])
        if(++this.#count / this.size > this.#loadFactor) this.#resize()
    }

    get(key) {
       const slot = this.#hash(key)
       const node = this.buffer[slot].findNode(key)

       return node ? node.value[1]: null;
    }

    delete(key) {
        const slot = this.#hash(key)
        const bucket = this.buffer[slot]
        const node = bucket.findNode(key);

        if(!node) return false;
        bucket.deleteNode(node);
        this.#count--;
        return true
    }

    #resize() {
        const oldBuf = this.buffer;
        this.size *= 2;
        this.buffer = Array.from({length: this.size}, () => new Bucket());
        this.#count = 0;

        for(const bucket of oldBuf) {
            for(const [k,v] of bucket) {
                this.set(k,v)
            }
        }
    }

    *entries() {
        for(const list of this.buffer) {
            for(let node of list) {
                yield node;
            }
        }
    }

    *values() {
        for(const [k] of this.entries()) {
            yield k;
        }
    }

    *keys() {
        for(const [, v] of this.entries()) {
            yield v;
        }
    }
}

/* ---------- Doubly‑linked list for seperate chaining ---------- */
class Node {
    next = null;
    prev = null;

    constructor(value) {
        this.value = value
    }
}

class Bucket{
    head = null;
    tail = null;

    insertPair(value) {
        const node = new Node(value)
        if(!this.head) this.head = this.tail = node
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node
        }
    }

    findNode(key) {
        let curr = this.head;
        while(curr.next) {
            if(curr.value[0] === key) return curr
        }
        return null;
    }

    deleteNode(node) {
        if (n === this.head) this.head = n.next;
        if (n === this.tail) this.tail = n.prev;
        if (n.prev) n.prev.next = n.next;
        if (n.next) n.next.prev = n.prev;
    }


    *[Symbol.iterator] () {
        let curr = this.head;
        while(curr) {
            yield curr.value;
            curr = curr.next
        }
    }
}