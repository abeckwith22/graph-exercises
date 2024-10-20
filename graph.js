class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // idea: get vertext adjacency list and remove adjacency list from its neighbors
    for(let neighbors of vertex.adjacent){
      this.removeEdge(vertex, neighbors);
    }

    this.nodes.delete(vertex); // removes vertex from node set.
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let seen = new Set(stack);
    let result = [];

    while(stack.length){
      let currentVertex = stack.pop();
      result.push(currentVertex.value);

      for(let neighbor of currentVertex.adjacent){
        if(!seen.has(neighbor)){
          stack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return result;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let seen = new Set(queue);
    let result = [];
    
    while(queue.length){
      let currentVertex = queue.shift();
      result.push(currentVertex.value)

      for(let neighbor of currentVertex.adjacent){
        if(!seen.has(neighbor)){
          queue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return result;
  }
}

module.exports = {Graph, Node}