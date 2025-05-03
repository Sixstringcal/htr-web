import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";
import { Node } from "./node";
import { RubiksCube } from "./cube";
import { connectNodes } from "./connections";

class App {
  nodeMap: Map<string, Node> = new Map();

  constructor() {
    // Start with the root at depth 0.
    this.createNodes("", undefined, 0);
    // After tree creation, layout nodes by depth.
    this.layoutNodes();
  }

  alreadyExistsDifferently(alg: string): string | null {
    const extraMoves = ["", "U2", "D2", "U2", "U2 D2", "U D'", "U2", "D2", "U2"];
    const startingMovesList = ["", "U2", "D2", "U2 D2", "U D'", "U' D", "U D", "U' D'"];
    for (const key of this.nodeMap.keys()) {
      for (const startingMoves of startingMovesList) {
        let cube1 = new RubiksCube();
        let cube2 = new RubiksCube();
        if (startingMoves) {
          cube1.applyMoves(startingMoves);
        }
        cube1.applyMoves(key);
        cube2.applyMoves(alg);
        if (cube1.areEqual(cube2)) {
          console.log("Already exists", key);
          return key;
        }
        for (const move of extraMoves) {
          cube1.applyMoves(move);
          if (cube1.areEqual(cube2)) {
            console.log("Already exists", key);
            return key;
          }
        }
      }
    }
    return null;
  }

  createNodes(alg: string, prevNode?: Node, depth: number = 0) {
    if (this.nodeMap.has(alg.trim())) {
      console.log("Already exists", alg.trim());
      if (prevNode) {
        connectNodes(this.nodeMap.get(alg.trim())!, prevNode);
      }
      return;
    }
    const matched = this.alreadyExistsDifferently(alg.trim());
    if (matched !== null) {
      console.log("Already written differently", alg.trim() + " as " + matched);
      if (prevNode) {
        connectNodes(this.nodeMap.get(matched)!, prevNode);
      }
      return;
    }
    if (alg.trim().split(" ").length > 6) {
      return;
    }
    // Create the node and assign its depth.
    const node = new Node(alg.trim());
    (node as any).depth = depth;  // assign depth; you can also update Node's constructor if needed
    this.nodeMap.set(alg.trim(), node);
    console.log(this.nodeMap);
    if (prevNode) {
      connectNodes(node, prevNode);
    }
    // Recursive calls with increased depth
    const splitAlg = alg.split(" ");
    const lastMove = splitAlg[splitAlg.length - 1];
    if (lastMove !== "U2") {
      this.createNodes(alg.trim() + " U2", node, depth + 1);
    }
    if (lastMove !== "D2") {
      this.createNodes(alg.trim() + " D2", node, depth + 1);
    }
    if (lastMove !== "F2") {
      this.createNodes(alg.trim() + " F2", node, depth + 1);
    }
    if (lastMove !== "B2") {
      this.createNodes(alg.trim() + " B2", node, depth + 1);
    }
    if (lastMove !== "R2") {
      this.createNodes(alg.trim() + " R2", node, depth + 1);
    }
    if (lastMove !== "L2") {
      this.createNodes(alg.trim() + " L2", node, depth + 1);
    }
  }

  layoutNodes() {
    // Group nodes by depth
    const levels = new Map<number, Node[]>();
    for (const node of this.nodeMap.values()) {
      const d = (node as any).depth as number;
      if (!levels.has(d)) {
        levels.set(d, []);
      }
      levels.get(d)!.push(node);
    }
    // Define vertical spacing and top offset.
    const levelHeight = 150;
    const topOffset = 50;
    const viewportWidth = window.innerWidth;

    levels.forEach((nodes, depth) => {
      const y = topOffset + depth * levelHeight;
      // Calculate total width of nodes (using bounding rect) and spacing between them.
      let totalWidth = 0;
      nodes.forEach(node => {
        const rect = node.container!.getBoundingClientRect();
        totalWidth += rect.width;
      });
      const gap = (viewportWidth - totalWidth) / (nodes.length + 1);
      let currentX = gap;
      nodes.forEach(node => {
        // Update the container's left and top positions.
        node.container!.style.left = `${currentX}px`;
        node.container!.style.top = `${y}px`;
        const rect = node.container!.getBoundingClientRect();
        currentX += rect.width + gap;
      });
    });
  }
}

globalThis.app = new App();
