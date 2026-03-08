from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """
    Check if the graph formed by nodes and edges is a Directed Acyclic Graph (DAG).
    Uses Kahn's algorithm (topological sort via BFS).
    """
    if not nodes:
        return True
    
    # Build adjacency list and compute in-degrees
    node_ids = {node['id'] for node in nodes}
    adj = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize in-degrees to 0 for all nodes
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build the graph from edges
    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')
        if source in node_ids and target in node_ids:
            adj[source].append(target)
            in_degree[target] += 1
    
    # Find all nodes with in-degree 0
    queue = [node_id for node_id in node_ids if in_degree[node_id] == 0]
    visited_count = 0
    
    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If we visited all nodes, there's no cycle (it's a DAG)
    return visited_count == len(node_ids)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData):
    """
    Parse the pipeline and return:
    - num_nodes: Number of nodes in the pipeline
    - num_edges: Number of edges in the pipeline
    - is_dag: Whether the pipeline forms a valid DAG
    """
    nodes = pipeline.nodes
    edges = pipeline.edges
    
    num_nodes = len(nodes)
    num_edges = len(edges)
    is_dag_result = is_dag(nodes, edges)
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag_result
    }
