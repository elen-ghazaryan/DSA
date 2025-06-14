function buildHeap(array) {
    const n = array.length
    let maxHeap = [...array]
    for(let i = Math.floor(n/2)-1; i >= 0; --i) {
        heapifyDown(maxHeap, i, n)
    }
    return maxHeap
}

function heapifyDown(nums, i, heapSize) {
    while(i < heapSize) {
        const n = nums.length
        let largest = i;
        let left = 2*i + 1, right = 2*i + 2;

        if(left < heapSize && nums[left] > nums[largest]) {
            largest = left
        }

        if(right < heapSize && nums[right] > nums[largest]) {
            largest = right
        }

        if(i !=  largest) {
            [nums[i], nums[largest]] = [nums[largest], nums[i]]
            i = largest
        } else {
            break;
        }
    }
}


function heapSort(nums) {
    const n = nums.length;
    for(let end = n - 1; end > 0; --end) {
        ;[nums[0], nums[end]] = [nums[end], nums[0]]
        
        heapifyDown(nums,0,end)
    }
    return nums
}

let arr = [17,9,4,2,11,1,42]
let res = buildHeap(arr)
heapSort(res)
console.log(res);
