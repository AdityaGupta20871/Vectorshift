// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    animatedEdges: true,
    deletableEdges: true,
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    removeNode: (nodeId) => {
        set({
            nodes: get().nodes.filter(node => node.id !== nodeId),
            edges: get().edges.filter(edge => edge.source !== nodeId && edge.target !== nodeId)
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      const animated = get().animatedEdges;
      set({
        edges: addEdge({
          ...connection, 
          type: 'smoothstep', 
          animated: animated,
          style: { stroke: '#6366f1', strokeWidth: 2, strokeDasharray: animated ? '5,5' : 'none' },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' }
        }, get().edges),
      });
    },
    setAnimatedEdges: (value) => {
      set({ animatedEdges: value });
      set({
        edges: get().edges.map(edge => ({
          ...edge,
          animated: value,
          style: { ...edge.style, strokeDasharray: value ? '5,5' : 'none' }
        }))
      });
    },
    setDeletableEdges: (value) => set({ deletableEdges: value }),
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
          return node;
        }),
      });
    },
  }));
