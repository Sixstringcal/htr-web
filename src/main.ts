import "cubing/twisty";
import { Node } from "./node";
import { RubiksCube } from "./cube";
import { connectNodes } from "./connections";

class App {
  nodeMap: Map<string, Node> = new Map();

  constructor() {
    this.createNodes("", undefined);
    this.layoutNodes();
  }

  alreadyExistsIdentically(alg: string): string | null {
    const extraMoves = ["", "U2 D2", "U D'", "U2 D2"];
    const startingMovesList = ["", "U2 D2", "U D'", "U' D"];
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
          return key;
        }
        for (const move of extraMoves) {
          cube1.applyMoves(move);
          if (cube1.areEqual(cube2)) {
            return key;
          }
        }
      }
    }
    return null;
  }

  alreadyExistsDifferently(alg: string): string | null {
    const extraMoves = [
      "",
      "U2",
      "D2",
      "U2",
      "U2 D2",
      "U D'",
      "U2",
      "D2",
      "U2",
    ];
    const startingMovesList = [
      "",
      "U2",
      "D2",
      "U2 D2",
      "U D'",
      "U' D",
      "U D",
      "U' D'",
    ];
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
          return key;
        }
        for (const move of extraMoves) {
          cube1.applyMoves(move);
          if (cube1.areEqual(cube2)) {
            return key;
          }
        }
      }
    }
    return null;
  }

  createNodes(alg: string, prevNode?: Node) {
    if (this.nodeMap.has(alg.trim())) {
      if (prevNode) {
        connectNodes(this.nodeMap.get(alg.trim())!, prevNode);
      }
      return;
    }
    var node: Node | null = null;
    const matched = this.alreadyExistsDifferently(alg.trim());
    if (matched !== null) {
      if (prevNode) {
        connectNodes(this.nodeMap.get(matched)!, prevNode);
      }
      node = this.nodeMap.get(matched)!;
      if (alg.trim().split(" ").length < matched.split(" ").length) {
        (node as Node).algorithm = (alg.trim());
        (node as any).setDepth(alg.trim() == "" ? 0 : alg.trim().split(" ").length);
      }
    }
    const matchedIdentically = this.alreadyExistsIdentically(alg.trim());
    if (matchedIdentically !== null) {
      if (prevNode) {
        connectNodes(this.nodeMap.get(matchedIdentically)!, prevNode);
      }
      return;
    }
    if (node == null) {
      node = new Node(alg.trim());
    }
    (node as any).setDepth(alg.trim() == "" ? 0 : alg.trim().split(" ").length);
    this.nodeMap.set(alg.trim(), node);

    if (prevNode) {
      connectNodes(node, prevNode);
    }
    if (alg.trim().split(" ").length > 3) {
      return;
    }
    const splitAlg = alg.split(" ");
    const lastMove = splitAlg[splitAlg.length - 1];
    if (lastMove !== "U2") {
      this.createNodes(alg.trim() + " U2", node);
    }
    if (lastMove !== "D2") {
      this.createNodes(alg.trim() + " D2", node);
    }
    if (lastMove !== "F2") {
      this.createNodes(alg.trim() + " F2", node);
    }
    if (lastMove !== "B2") {
      this.createNodes(alg.trim() + " B2", node);
    }
    if (lastMove !== "R2") {
      this.createNodes(alg.trim() + " R2", node);
    }
    if (lastMove !== "L2") {
      this.createNodes(alg.trim() + " L2", node);
    }
  }

  layoutNodes() {
    const levels = new Map<number, Node[]>();
    for (const node of this.nodeMap.values()) {
      const d = (node as any).depth as number;
      if (!levels.has(d)) {
        levels.set(d, []);
      }
      levels.get(d)!.push(node);
    }
    const topOffset = 50;
    const levelHeight = 250;
    const viewportWidth = window.innerWidth;

    levels.forEach((nodes, depth) => {
      const y = topOffset + depth * levelHeight;
      let totalWidth = 0;
      nodes.forEach((node) => {
        const rect = node.container!.getBoundingClientRect();
        totalWidth += rect.width;
      });
      const baseMultiplier = 1.5;
      const depthFactor = 1 + depth * 0.5;
      const computedGap =
        ((viewportWidth - totalWidth) / (nodes.length + 1)) *
        baseMultiplier *
        depthFactor;
      const gap = Math.max(computedGap, 20);

      let currentX = gap;
      nodes.forEach((node) => {
        node.container!.style.left = `${currentX}px`;
        node.container!.style.top = `${y}px`;
        const rect = node.container!.getBoundingClientRect();
        currentX += rect.width + gap;
      });
    });
  }
}

globalThis.app = new App();
