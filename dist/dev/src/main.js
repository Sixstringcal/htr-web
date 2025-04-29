import {
  Node
} from "./chunks/chunk-LH3AK4D5.js";
import "./chunks/chunk-62J464JL.js";
import "./chunks/chunk-V6Y2QZR4.js";

// src/main.ts
var App = class {
  nodeMap = /* @__PURE__ */ new Map();
  constructor() {
    this.createNodes("");
  }
  createNodes(alg, prevNode) {
    if (this.nodeMap.has(alg) || alg.split(" ").length > 2) {
      return;
    }
    const splitAlg = alg.split(" ");
    const lastMove = splitAlg[splitAlg.length - 1];
    this.nodeMap.set(alg, new Node(alg, prevNode));
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
};
globalThis.app = new App();
//# sourceMappingURL=main.js.map
