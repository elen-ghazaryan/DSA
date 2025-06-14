class MinHeap {
    heap = []

    peek() {
        return this.heap[0]
    }

    size() {
        return this.heap.length
    }

    swap(i,j) {
        ;[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }

    insert(value) {
        this.heap.push(value)
        this.heapifyUp(this.size() - 1)
    }

    extractMin() {
        this.swap(0, this.size() - 1)
        const min = this.heap.pop()

        this.heapifyDown(0)
        return min;
    }

    heapifyUp(index) {
        for(let i = index; i > 0; i=Math.floor((i-1)/2)) {
            let parent = Math.floor((i-1)/2);
            
            if(this.heap[i] < this.heap[parent]) {
                this.swap(i, parent)
            }
        }
    }

    heapifyDown(i) {
        while(i < this.size()) {
            let left = 2*i + 1;
            let right = 2*i + 2;
            let min = i

            if(left < this.size() && this.heap[left] < this.heap[min]) {
                min = left
            }
            if(right < this.size() && this.heap[right] < this.heap[min]) {
                min = right
            }

            if(i !== min) {
                this.swap(i, min)
                i = min;
            } else {
                break;
            }
        }
    }

    toString() {
        return this.heap.toString()
    }
}

//clinet code
let minHeap = new MinHeap()
minHeap.insert(17)
minHeap.insert(24)
minHeap.insert(2)
minHeap.insert(50)
minHeap.insert(1)
minHeap.insert(3)
minHeap.insert(0)


console.log(minHeap.toString())

let min = minHeap.extractMin()
console.log(min);
console.log(minHeap.toString())


