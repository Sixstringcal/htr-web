import { TwistyPlayer } from "cubing/twisty";
import { RubiksCube } from "./cube";

export class Node {
  cube = new RubiksCube();
  uLayer: TwistyPlayer;
  dLayer: TwistyPlayer;
  container: HTMLElement | null = null;
  position: { x: number; y: number };
  public depth: number = 0;
  algorithm: string = "";
  private isDragging: boolean = false;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private static placedRects: Array<{
    left: number;
    top: number;
    right: number;
    bottom: number;
  }> = [];
  private static startX = 60;
  private static startY = 60;
  private static margin = 16;
  private infoElement: HTMLDivElement;

  constructor(alg: string = "", prevNode?: Node) {
    this.algorithm = alg;
    this.cube.applyMoves(alg);
    if (prevNode) {
      this.depth = prevNode.depth + 1;
    }
    
    this.uLayer = new TwistyPlayer({
      visualization: "experimental-2D-LL",
      background: "none",
      controlPanel: "none",
      alg: alg,
    });
    this.dLayer = new TwistyPlayer({
      visualization: "experimental-2D-LL",
      background: "none",
      controlPanel: "none",
      alg: "x2 " + alg,
    });

    this.position = { x: 0, y: 0 };

    this.container = document.createElement("div");
    this.container.style.display = "flex";
    this.container.style.flexDirection = "column";
    this.container.style.alignItems = "center";
    this.container.style.border = "1px solid #888";
    this.container.style.borderRadius = "4px";
    this.container.style.width = "fit-content";
    this.container.style.background = "#fff";
    this.container.style.gap = "4px";
    this.container.style.padding = "4px 8px";

    this.infoElement = document.createElement("div");
    this.infoElement.style.fontSize = "12px";
    this.infoElement.style.fontFamily = "monospace";
    this.infoElement.style.padding = "2px 4px";
    this.infoElement.style.backgroundColor = "#f0f0f0";
    this.infoElement.style.borderRadius = "2px";
    this.infoElement.style.marginBottom = "4px";
    this.infoElement.style.width = "100%";
    this.infoElement.style.textAlign = "center";
    this.updateInfoDisplay(); 
    this.container.appendChild(this.infoElement);

    const playerContainer = document.createElement("div");
    playerContainer.style.display = "flex";
    playerContainer.style.alignItems = "center";
    playerContainer.style.gap = "4px";
    
    playerContainer.appendChild(this.uLayer);
    playerContainer.appendChild(this.dLayer);
    this.container.appendChild(playerContainer);

    this.container.style.position = "absolute";
    this.container.style.visibility = "hidden";
    document.body.appendChild(this.container);
    const rect = this.container.getBoundingClientRect();
    const originalWidth = rect.width;
    const originalHeight = rect.height;
    const nodeWidth = originalWidth * 0.5;
    const nodeHeight = originalHeight * 0.5;
    this.container.style.visibility = "";

    let angle = 0;
    let radius = 0;
    let found = false;
    let x = Node.startX;
    let y = Node.startY;
    const maxTries = 5000;
    let tries = 0;
    while (!found && tries < maxTries) {
      const testRect = {
        left: x,
        top: y,
        right: x + nodeWidth,
        bottom: y + nodeHeight,
      };
      const collision = Node.placedRects.some(
        (r) =>
          !(
            testRect.right + Node.margin < r.left ||
            testRect.left > r.right + Node.margin ||
            testRect.bottom + Node.margin < r.top ||
            testRect.top > r.bottom + Node.margin
          )
      );
      if (!collision) {
        found = true;
        break;
      }
      angle += Math.PI / 6;
      radius += 8;
      x = Node.startX + Math.round(Math.cos(angle) * radius);
      y = Node.startY + Math.round(Math.sin(angle) * radius);
      tries++;
    }
    this.container.style.left = `${x}px`;
    this.container.style.top = `${y}px`;
    Node.placedRects.push({
      left: x,
      top: y,
      right: x + nodeWidth,
      bottom: y + nodeHeight,
    });

    this.container.style.transform = "scale(0.5)";
    this.container.style.transformOrigin = "top left";
    this.container.style.cursor = "grab";
    this.container.style.zIndex = "1";

    this.container.addEventListener("mousedown", (e) => {
      this.isDragging = true;
      this.offsetX = e.clientX - this.container.offsetLeft;
      this.offsetY = e.clientY - this.container.offsetTop;
      this.container.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      this.container.style.left = `${e.clientX - this.offsetX}px`;
      this.container.style.top = `${e.clientY - this.offsetY}px`;
    });

    document.addEventListener("mouseup", () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.container.style.cursor = "grab";
        document.body.style.userSelect = "";
      }
    });
  }

  public updateInfoDisplay() {
    if (this.infoElement) {
      this.infoElement.textContent = `Depth: ${this.depth} | Alg: ${this.algorithm || "none"}`;
      
      const hue = Math.max(0, 120 - (this.depth * 20));
      this.infoElement.style.color = `hsl(${hue}, 100%, 30%)`;
    }
  }

  public setDepth(depth: number) {
    this.depth = depth;
    if(this.algorithm.trim() === "") {
      this.depth = 0;
    }
    this.updateInfoDisplay();
  }

  public areEqual(otherAlg: string) {}
}
