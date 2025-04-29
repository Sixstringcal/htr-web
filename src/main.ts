import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";
import { Node } from "./node";
import { connectNodes } from "./connections";

class App {
  nodeMap: Map<string, Node> = new Map();

  constructor() {
    this.createNodes("");
  }

  createNodes(alg: string, prevNode?: Node) {
    if (this.nodeMap.has(alg) || alg.split(" ").length > 2) {
      // If node exists and prevNode is provided, connect them with a line
      if (this.nodeMap.has(alg) && prevNode) {
        const existingNode = this.nodeMap.get(alg)!;
        // Only add a line if not already connected to this prevNode
        // (No need to check prevNode property, just always connect if not already visually connected)
        connectNodes(existingNode, prevNode);
      }
      return;
    }
    const splitAlg = alg.split(" ");
    const lastMove = splitAlg[splitAlg.length - 1];
    const node = new Node(alg, prevNode);
    this.nodeMap.set(alg, node);
    if (prevNode) {
      connectNodes(node, prevNode);
    }
    if (lastMove !== "U2") {
      this.createNodes(alg + " U2");
    }
    if (lastMove !== "D2") {
    this.createNodes(alg + " D2");
    }
    if (lastMove !== "F2") {
      this.createNodes(alg + " F2");
    }
    if (lastMove !== "B2") {
      this.createNodes(alg + " B2");
    }
    if (lastMove !== "R2") {
      this.createNodes(alg + " R2");
    }
    if (lastMove !== "L2") {
      this.createNodes(alg + " L2");
    }
  }
}

globalThis.app = new App();
