class Graph {
    list = {}

    addVertex (v) {
        if(!this.list[v]) {
            this.list[v] = []
        }
    }

    addEdge (u, v) {
        this.addVertex(u)
        this.addVertex(v)
        this.list[u].push(v)
    }

    removeEdge(u, v) {
        if (this.list[u]) {
            this.list[u] = this.list[u].filter(neighbor => neighbor !== v)
        }
    }

    dfs (start, visited = new Set(), res = []) {
        if(visited.has(start)) {
            return res;
        }

        res.push(start)
        visited.add(start)

        const neighbors = this.list[start]
        for(let n of neighbors) {
            this.dfs(n, visited, res)
        }

        return res;
    }

    bfs (start) {
        const queue = [start]
        const seen = new Set()
        seen.add(start)

        let res = []
        while(queue.length) {
            const vertex = queue.shift()
            res.push(vertex)

            const neighbors = this.list[vertex]
            for(let v of neighbors) {
                if(!seen.has(v)) {
                    seen.add(v)
                    queue.push(v)
                }
            }
        }
        return res;
    }
}