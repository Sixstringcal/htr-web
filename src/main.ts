import "cubing/twisty";
import { TwistyPlayer } from "cubing/twisty";
import { Node } from "./node";
import { RubiksCube } from "./cube";

class App {
  nodeMap: Map<string, Node> = new Map();

  constructor() {
    this.createNodes("");
  }

  alreadyExistsDifferently(alg: string): string | null {
    var value = null;
    Array.from(this.nodeMap.keys()).some((key) => {
      var cube1 = new RubiksCube()
      var cube2 = new RubiksCube()
      cube1.applyMoves(key);
      cube2.applyMoves(alg);
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U' D'");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1 = new RubiksCube()
      cube1.applyMoves("U2");
      cube2 = new RubiksCube()
      cube1.applyMoves(key);
      cube2.applyMoves(alg);
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U' D'");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1 = new RubiksCube()
      cube1.applyMoves("D2");
      cube2 = new RubiksCube()
      cube1.applyMoves(key);
      cube2.applyMoves(alg);
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U' D'");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1 = new RubiksCube()
      cube1.applyMoves("U D'");
      cube2 = new RubiksCube()
      cube1.applyMoves(key);
      cube2.applyMoves(alg);
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U' D'");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1 = new RubiksCube()
      cube1.applyMoves("U' D");
      cube2 = new RubiksCube()
      cube1.applyMoves(key);
      cube2.applyMoves(alg);
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U' D'");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1 = new RubiksCube()
      cube1.applyMoves("U D");
      cube2 = new RubiksCube()
      cube1.applyMoves(key);
      cube2.applyMoves(alg);
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U' D'");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1 = new RubiksCube()
      cube1.applyMoves("U' D'");
      cube2 = new RubiksCube()
      cube1.applyMoves(key);
      cube2.applyMoves(alg);
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U' D'");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("D2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      cube1.applyMoves("U2");
      if (cube1.areEqual(cube2)) {
        console.log("Already exists", key);
        value = key;
        return true;
      }
      return false;
    }
    );
    return value;
  }

  createNodes(alg: string, prevNode?: Node) {
    if (this.nodeMap.has(alg.trim())) {
      console.log("Already exists", alg.trim());
      // connectNodes(this.nodeMap.get(alg), prevNode);
      return;
    }
    const matched = this.alreadyExistsDifferently(alg.trim());
    if (matched !== null) {
      console.log("Already written differently", alg.trim() + " as " + matched);
      // connectNodes(this.nodeMap.get(matched), prevNode);
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
      // connectNodes(node, prevNode);
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
}

globalThis.app = new App();
