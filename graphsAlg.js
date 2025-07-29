//GRAPHS' ALGORITHMS

//Kahn's algorithm (topological sorting)

function courseSchedule (numCourses, prerequisities) {
    //make graph by adjacency list 
    const graph = Array.from({length: numCourses}, () => [])
    
    //counts indegree for each vertex
    const indegree = new Array(numCourses).fill(0)

    for(let [a,b] of prerequisities) {
        graph[b].push(a)
        indegree[a]++
    }

    //core algorithm with queue
    const queue = []
    let count = 0;
    for(let i = 0; i < indegree.length; ++i){
        if(indegree[i] == 0) {
            queue.push(i)  //now in queue all nodes with indegree 0
        }
    }

    let order = [] 
    while(queue.length) {
        const vertex = queue.shift()
        order.push(vertex)    //topological order 

        const neighbors = graph[vertex] //array with nodes, where vertex directed
        for(let course of neighbors) {
            indegree[course]--;  //delete one dependency
            if(indegree[course] == 0) {
                queue.push(course)
            }
        }
    }

    if(order.length == numCourses) {
        return order
    } else {
        return []
    }
}


/*---- Single source Shortest path algorithms ----*/

//Dijkstra's algorithm

function SSSP(times, n, start) {
    //create graph by adj. list
    const graph = Array.from({length: n}, () => []);
    for(let [u,v,w] of times) {
        graph[u].push([v,w])
    }

    //array which shows costs for path to each node  
    const costs = new Array(n).fill(Infinity)
    costs[start] = 0 //already in that node without cost

    const visited = new Set()

    const queue = new PrQueue(); //shows optimal path
    queue.insert([start, 0])

    while(!queue.isEmpty()) {
        const [u, cost] = queue.shift()
        if(visited.has(u)) continue;
        visited.add(u)

        for(let [neighbor, weight] of graph[u]) {
            if(cost + weight < costs[neighbor]) {
                costs[neighbor] = cost + weight; //relaxation
                queue.insert([neighbor, costs[neighbor]])
            }
        }
    }

    const maxTime = Math.max(...costs)
    return maxTime === Infinity ? -1 : maxTime
}


//Bellman-Ford algorithm

function bellmanFord(n, edges, start) {
    const dist = new Array(n).fill(Infinity)
    const prev = new Array(n).fill(null)

    dist[start] = 0

    // Step 1: Relax edges repeatedly
    for (let i = 0; i < n - 1; i++) {
        for (let [u, v, weight] of edges) {
            if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight
                prev[v] = u
            }
        }
    }

    // Step 2: Check for negative-weight cycles
    for (let [u, v, weight] of edges) {
        if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
            return { hasNegativeCycle: true, dist: [], prev: [] }
        }
    }

    return { hasNegativeCycle: false, dist, prev }
}

/*---- Minimum spanning tree algorithms ----*/
//Prim's algorithm 

function prim(n, connections) {
    const visited = new Set()
    const queue = new PrQueue()
    const mst = [] // stores edges of MST

    
    let total = 0;
    const adjList = Array.from({length: n}, () => []);
    for(let [u,v,w] of connections) {
        adjList[u].push([v,w])
        adjList[v].push([u,w])
    }


    // start from node 0
    queue.insert(0, 0, -1) // node, weight, parent

    while(!queue.isEmpty() && visited.size < n) {
        const [u, w, p] = queue.shift()
        if(visited.has(u)) continue;
        visited.add(u)

        if(p !== -1) { // skip first dummy edge
            mst.push([p, u, w])
            total += w
        }

        for(let [v, weight] of adjList[u]) {
            if(!visited.has(v)) {
                queue.insert(v, weight, u)
            }
        }
    }

    if (mst.length !== n - 1) {
        console.log("Graph is not connected — MST doesn't exist");
        return null;
    }

    return { mst, total };

}



//Kruskal's algorithm
class UnionFind {
    constructor(n) {
        this.parent = Array.from({ length: n }, (_, i) => i);
        this.rank = Array(n).fill(0);
    }

    find(u) {
        if (this.parent[u] !== u) {
            this.parent[u] = this.find(this.parent[u]); // Path compression
        }
        return this.parent[u];
    }

    isConnected(u, v) {
        return this.find(u) == this.find(v)
    }

    union(u, v) {
        const rootU = this.find(u);
        const rootV = this.find(v);
        if (rootU === rootV) return false;

        // Union by rank
        if (this.rank[rootU] < this.rank[rootV]) {
            this.parent[rootU] = rootV;
        } else if (this.rank[rootU] > this.rank[rootV]) {
            this.parent[rootV] = rootU;
        } else {
            this.parent[rootV] = rootU;
            this.rank[rootU]++;
        }
        return true;
    }
}

function kruskal(n, edges) {
    // edges: [ [u, v, weight], ... ]
    edges.sort((a, b) => a[2] - b[2]); // Sort by weight

    const uf = new UnionFind(n);
    const mst = [];
    let totalWeight = 0;

    for (const [u, v, w] of edges) {
        if (uf.union(u, v)) {
            mst.push([u, v, w]);
            totalWeight += w;
        }
    }

    if (mst.length !== n - 1) {
        return { totalWeight: null, mst: [], message: "Graph is not connected" };
    }

    return { totalWeight, mst };
}
