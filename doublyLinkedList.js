//Doubly Linked List

class Node {
  next = null;
  prev = null;
  constructor(value) { this.value = value }
}

class LinkedListDoubly {
  head = null;
  tail = null;


  /* ---------- core ops ---------- */
  insert(value) {
    const node = new Node(value);
    if (!this.head) this.head = this.tail = node;
    else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
  }

  insertFirst(value) {
    const node = new Node(value);
    if (!this.head) this.head = this.tail = node;
    else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
  }

  removeLast() {
    if (!this.tail) return;

    if (this.head === this.tail) this.head = this.tail = null;
    else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }
  }

  removeFirst() {
    if (!this.head) return;
    if (this.head === this.tail) this.head = this.tail = null;
    else {
      this.head = this.head.next;
      this.head.prev = null;
    }
  }

  
  /* ---------- helpers ---------- */
  get(index) {
    if (index < 0) return null;

    let curr = this.head, i = 0;
    while (curr && i < index) {
      curr = curr.next;
      ++i
    }
    return curr ?? null;
  }

  set(index, value) {
    const node = this.get(index);
    if (!node) return false;
    node.value = value;
    return true;
  }

  indexOf(value) {
    let curr = this.head, i = 0;
    while (curr) {
      if (curr.value === value) return i;
      curr = curr.next; ++i;
    }
    return -1;
  }

  /* ---------- position‑based ops ---------- */

   insertAt(index, value) {
    if (index < 0) return; 
    if(index === 0) return this.insertFirst(value);

    const newNode = new Node(value);
    const nodeAtIdx = this.get(index);


    if (!nodeAtIdx) {           // append
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
      return;
    }

    // insert before nodeAtIdx
    newNode.prev = nodeAtIdx.prev;
    newNode.next = nodeAtIdx;
    nodeAtIdx.prev.next = newNode;
    nodeAtIdx.prev = newNode;
  }

  removeAt(index) {
    if (index < 0) return false;
    const node = this.get(index);
    if (!node) return false;

    if (node === this.head) this.removeFirst();
    else if (node === this.tail) this.removeLast();
    else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    return true;
  }

  /* ---------- value‑based ops ---------- */
  removeValue(value) {
    let curr = this.head;

    while (curr) {
      if (curr.value === value) {
        if (curr === this.head) { 
          this.removeFirst();
          curr = this.head;
         }
        else if (curr === this.tail) { 
          this.removeLast(); 
          break;
         }   
        else {
          curr.prev.next = curr.next;
          curr.next.prev = curr.prev;
          curr = curr.next;
        }
      } else {
        curr = curr.next
      }
    }
  }

  search(value) {
    let curr = this.head;
    while (curr) {
      if (curr.value === value) return curr;  
      curr = curr.next;
    }
    return null;
  }

  /* ---------- iterator ---------- */

  *[Symbol.iterator]() {
    let curr = this.head;
    while (curr) {
      yield curr.value;
      curr = curr.next;
    }
  }

}
