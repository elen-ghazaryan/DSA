interface Sorting {
  strategy:string
  sort(data: number[]): number[];
}

class SortContext {
  constructor(private sortAlgorithm: Sorting) {}

  setStrategy(sortAlgorithm: Sorting) {
    this.sortAlgorithm = sortAlgorithm;
  }

  executeSort(data: number[]) {
    let t1 = performance.now()
    const res = this.sortAlgorithm.sort(data);
    let t2 = performance.now()

    return {
        strategy:this.sortAlgorithm.strategy,
        result:res,
        duration:`${(t2-t1).toFixed(2)}ms`
    }
}
}

class BubbleSort implements Sorting {
  strategy:string = "Bubble"

  sort(data: number[]): number[] {
    let n = data.length;
    let swapped: boolean;

    for (let i = 0; i < n; ++i) {
      swapped = false;
      for (let j = 0; j < n - i - 1; ++j) {
        if (data[j] > data[j + 1]) {
          [data[j], data[j + 1]] = [data[j + 1], data[j]];
          swapped = true;
        }
      }

      if (!swapped) break;
    }
    return data;
  }
}

class SelectionSort implements Sorting {
  strategy:string = "Selection"

  sort(data: number[]): number[] {
    let n = data.length;

    for (let i = 0; i < n; ++i) {
      let minIndex = i;
      for (let j = i + 1; j < n; ++j) {
        if (data[j] < data[minIndex]) {
          minIndex = j;
        }
      }

      if (minIndex !== i) [data[minIndex], data[i]] = [data[i], data[minIndex]];
    }

    return data;
  }
}

class InsertionSort implements Sorting {
  strategy:string = "Insertion"

  sort(data: number[]): number[] {
    let n = data.length;
    for(let i = 1; i < n; ++i) {
        let key = data[i]
        let j = i - 1;

        while(data[j] > key && j >= 0) {
            data[j+1] = data[j]
            --j;
        }
        data[j+1] = key
    }
    
    return data;
  }
}

class CountingSort implements Sorting {
  strategy:string = "Counting"

  sort(data: number[]): number[] {
    if(!data || data.length <= 1) {
        return data
    }

    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max-min+1

    let counter = new Array(range).fill(0)
    for(let i = 0; i < data.length; ++i) {
        ++counter[data[i]-min]
    }

    for(let i = 1; i < range; ++i) {
        counter[i] += counter[i-1]
    }

    let output = new Array(data.length)
    for(let i = data.length - 1; i >= 0; --i) {
        output[counter[data[i] - min] - 1] = data[i]
        --counter[data[i]-min]
    }

    return output
  }
}

class RadixSort implements Sorting {
  strategy:string = "Radix"

  sort(data: number[]): number[] {
    const max = Math.max(...data)

    for(let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      this.sortByExp(data, exp)
    }

    return data 
  }

  sortByExp(arr:number[], exp:number) {
    let counter = new Array(10).fill(0)
    const n = arr.length

    for(let i = 0; i < n; ++i) {
        const digit  = Math.floor((arr[i] / exp) % 10)
        ++counter[digit]
    }

    for(let i = 1; i < 10; ++i) {
        counter[i] += counter[i-1]
    }

    let output = new Array(n)
    for(let i = n - 1; i >= 0; --i) {
        const digit  = Math.floor((arr[i] / exp) % 10)
        output[counter[digit] - 1] = arr[i]
        --counter[digit]
    }

    for(let i = 0; i < n; ++i) {
        arr[i] = output[i]
    }  
}

}


class MergeSort implements Sorting {
  strategy: string = "Merge";

  sort(data: number[]): number[] {
    if(data.length < 2) return data;

    const mid = Math.floor(data.length/2)
    const left = this.sort(data.slice(0, mid))
    const right = this.sort(data.slice(mid))

    return this.merge(left, right)
  }

  merge(left:number[], right:number[]):number[] {
    let i = 0;
    let j = 0;

    let result:number[] = []

    while(i < left.length && j < right.length) {
      if(left[i] < right[j]) {
        result.push(left[i++])
      } else {
        result.push(right[j++])
      }
    }
    
    while(i < left.length) result.push(left[i++]);
    while(j < right.length) result.push(right[j++]);

    return result;
  }
}

class QuickSortLomuto implements Sorting {
  strategy: string = "QuickSort<Lomuto>";
  sort(data: number[], left:number = 0, right:number = 0): number[] {
    if(left >= right) {
      return data
    }

    const pi = this.lomuto(data, left, right);
    this.sort(data, left, pi-1)
    this.sort(data, pi+1, right)

    return data
   }

  lomuto(data:number[], left:number = 0, right:number = data.length - 1) {
    const pivot = data[right]
    let nextSmall = left

    for(let i = left; i < right; ++i) {
      if(data[i] < pivot) {
        this.swap(data, i, nextSmall)
        nextSmall++
      }
    }

    this.swap(data, nextSmall, right)
    return nextSmall;
  }

  swap(data:number[], i:number, j:number) {
    [data[i], data[j]] = [data[j], data[i]]
  }
}

class QuickSortHoare implements Sorting {
  strategy: string = "QuickSort<Hoare>";
  sort(data: number[], left:number = 0, right:number = 0): number[] {
    if(left < right) {
      const pivotIdx = this.hoare(data, left, right)
      this.sort(data, left, pivotIdx - 1)
      this.sort(data, pivotIdx, right)
   }
   return data
  }

  hoare(data:number[], left:number = 0, right:number = data.length - 1) {
    const pivot = data[Math.floor((right+left)/2)]
  
    while(left <= right) {
      while(data[left] < pivot) left++;
      while(data[right] > pivot) right--;

      if(left <= right) {
        this.swap(data, left, right)
        left++;
        right--;
      } 
    }
    return left;
  }

  swap(data:number[], i:number, j:number) {
    [data[i], data[j]] = [data[j], data[i]]
  }
}


//client code

// const array = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
const array = [3,2,1]

const context1 = new SortContext(new BubbleSort())
const context2 = new SortContext(new SelectionSort())
const context3 = new SortContext(new InsertionSort())
const context4 = new SortContext(new CountingSort())
const context5 = new SortContext(new RadixSort())
const context6 = new SortContext(new MergeSort())
const context7 = new SortContext(new QuickSortLomuto())
const context8 = new SortContext(new QuickSortHoare())


console.log(context1.executeSort(array))
console.log(context2.executeSort(array))
console.log(context3.executeSort(array))
console.log(context4.executeSort(array))
console.log(context5.executeSort(array))
console.log(context6.executeSort(array))
console.log(context7.executeSort(array))
console.log(context8.executeSort(array))


let s= performance.now()
array.sort((a,b) => a-b)
let e= performance.now()
console.log((e-s).toFixed(2))