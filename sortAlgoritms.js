//Bubble sort

function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  for (let i = 0; i < n; ++i) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return arr;
}

//Selection sort

function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

//Insertion sort

function insertionSort(arr) {
  for (let i = 1; i < arr.length; ++i) {
    key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

//counting sort

function countingSort(arr) {
  if (!arr || arr.length <= 1) {
    return arr;
  }

  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;

  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}

//radix sort
function radixSort(arr) {
  let maxElm = Math.max(...arr);
  for (let exp = 1; Math.floor(maxElm / exp) > 0; exp *= 10) {
    countingSortByExp(arr, exp);
  }
}

//helper function
function countingSortByExp(arr, exp) {
  let counts = new Array(10).fill(0);
  let n = arr.length;
  let sorted = new Array(n);

  for (let i = 0; i < n; ++i) {
    let digit = Math.floor((arr[i] / exp) % 10);
    counts[digit]++;
  }

  for (let i = 1; i < 10; ++i) {
    counts[i] += counts[i - 1];
  }

  for (let i = n - 1; i >= 0; --i) {
    let digit = Math.floor((arr[i] / exp) % 10);
    sorted[counts[digit] - 1] = arr[i];
    counts[digit]--;
  }

  for (let i = 0; i < n; ++i) {
    arr[i] = sorted[i];
  }
}



//Merge sort

function mergeSort(arr) {
  if(arr.length < 2) return arr;

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0,mid)) 
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

//helper function
function merge(left, right) {
  let i = 0,
    j = 0;
  let result = []

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}


//Quick Sort

//Lomuto partition
function swap(arr, i1, i2) {
  [arr[i1], arr[i2]] = [arr[i2], arr[i1]]
}

function lomuto(nums, low = 0, high = nums.length - 1) {
  const pivot = nums[high]
  let nextSmall = low
  for(let i = low; i <= high; ++i) {
    if(nums[i] < pivot) {
      swap(nums, i, nextSmall)
      nextSmall++
    }
  }
  
  swap(nums, high, nextSmall)
  return nextSmall
}

function quickSort(nums, left = 0, right = nums.length - 1) {
  if(left >= right) {
    return 
  }
  const pi = lomuto(nums,left, right) 
  quickSort(nums,left, pi - 1)
  quickSort(nums, pi + 1, right)

  return nums

}


//hoare partition
function hoare(nums, left = 0, right = nums.length - 1) {
  let pivot = nums[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (nums[left] < pivot) left++;
    while (nums[right] > pivot) right--;

    if(left <= right) {
      swap(nums, left, right)
      left++;
      right--;
    }
  }
  return left
}

function quickSort(nums, left = 0, right = nums.length - 1) {
  if (left < right) {
    const pivotIndex = hoare(nums, left, right);
    quickSort(nums, left, pivotIndex - 1);
    quickSort(nums, pivotIndex, right);
  }

  return nums;
}

const arr= [4,5,1,2,7,8,2]
quickSort(arr)
console.log(arr);


//randomize
function quickSort(nums, low = 0, high = nums.length - 1) {
    if (low < high) {
        // Step 1: Choose random pivot
        let randomIndex = Math.floor(Math.random() * (high - low + 1)) + low;
        swap(nums, randomIndex, high)

        // Step 2: Partition
        let pivotIndex = partition(nums, low, high);

        // Step 3: Recurse on left and right parts
        quickSort(nums, low, pivotIndex - 1);
        quickSort(nums, pivotIndex + 1, high);
    }

    return nums;
}

function partition(nums, low, high) {
    let pivot = nums[high];
    let nextSmall = low;

    for (let j = low; j < high; j++) {
        if (nums[j] < pivot) {
            swap(nums, nextSmall, j)
            nextSmall++;
        }
    }

    swap(nums, nextSmall, high)
    return nextSmall; // final position of pivot
}


//median of three
function medianOfThree(arr, low, high) {
  const mid = Math.floor((low + high) / 2);
  const a = arr[low], b = arr[mid], c = arr[high];

  if ((a - b) * (c - a) >= 0) return low;
  else if ((b - a) * (c - b) >= 0) return mid;
  else return high;
}

// Lomuto partition with median-of-three pivot
function lomutoPartition(arr, low, high) {
  const pivotIndex = medianOfThree(arr, low, high);
  swap(arr, pivotIndex, high)

  const pivot = arr[high];
  let i = low;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      swap(nums, i, j)
      i++;
    }
  }

  swap(nums,i,high); // Place pivot in correct position
  return i;
}

// Recursive quicksort function
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = lomutoPartition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }

  return arr;
}