import {
  Node
} from "./chunks/chunk-HA3PKLV2.js";
import "./chunks/chunk-62J464JL.js";
import {
  RubiksCube
} from "./chunks/chunk-5MTSTATH.js";
import "./chunks/chunk-V6Y2QZR4.js";

// src/main.ts
var App = class {
  nodeMap = /* @__PURE__ */ new Map();
  constructor() {
    this.createNodes("");
  }
  alreadyExistsDifferently(alg) {
    const extraMoves = ["", "U2", "D2", "U2 D2", "U D'", "U2", "D2", "U2 D2"];
    const startingMovesList = ["", "U2", "D2", "U D'", "U' D", "U D", "U' D'"];
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
  createNodes(alg, prevNode) {
    if (this.nodeMap.has(alg.trim())) {
      console.log("Already exists", alg.trim());
      return;
    }
    const matched = this.alreadyExistsDifferently(alg.trim());
    if (matched !== null) {
      console.log("Already written differently", alg.trim() + " as " + matched);
      return;
    }
    if (alg.trim().split(" ").length > 3) {
      return;
    }
    const splitAlg = alg.split(" ");
    const lastMove = splitAlg[splitAlg.length - 1];
    const node = new Node(alg.trim());
    this.nodeMap.set(alg.trim(), node);
    console.log(this.nodeMap);
    if (prevNode) {
    }
    if (lastMove !== "U2") {
      this.createNodes(alg.trim() + " U2");
    }
    if (lastMove !== "D2") {
      this.createNodes(alg.trim() + " D2");
    }
    if (lastMove !== "F2") {
      this.createNodes(alg.trim() + " F2");
    }
    if (lastMove !== "B2") {
      this.createNodes(alg.trim() + " B2");
    }
    if (lastMove !== "R2") {
      this.createNodes(alg.trim() + " R2");
    }
    if (lastMove !== "L2") {
      this.createNodes(alg.trim() + " L2");
    }
  }
};
globalThis.app = new App();
//# sourceMappingURL=main.js.map
