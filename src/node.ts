import { TwistyPlayer } from "cubing/twisty";

export class Node {
  uLayer: TwistyPlayer;
  dLayer: TwistyPlayer;
  container: HTMLDivElement;
  private isDragging: boolean = false;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private line?: SVGLineElement;
  private prevNode?: Node;
  private static placedRects: Array<{left: number, top: number, right: number, bottom: number}> = [];
  private static startX = 60;
  private static startY = 60;
  private static margin = 16; // Minimal space between nodes

  constructor(alg: string = "", prevNode?: Node) {
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

    // Create a container div with compact styles
    this.container = document.createElement("div");
    this.container.style.display = "flex";
    this.container.style.alignItems = "center";
    this.container.style.border = "1px solid #888";
    this.container.style.borderRadius = "4px";
    this.container.style.width = "fit-content";
    this.container.style.background = "#fff";
    this.container.style.gap = "4px";
    this.container.style.padding = "4px 8px";

    this.container.appendChild(this.uLayer);
    this.container.appendChild(this.dLayer);

    // Temporarily add to body to measure size
    this.container.style.position = "absolute";
    this.container.style.visibility = "hidden";
    document.body.appendChild(this.container);
    const rect = this.container.getBoundingClientRect();
    const nodeWidth = rect.width;
    const nodeHeight = rect.height;
    this.container.style.visibility = "";

    // Spiral search for closest non-overlapping position
    let angle = 0;
    let radius = 0;
    let found = false;
    let x = Node.startX;
    let y = Node.startY;
    const maxTries = 5000;
    let tries = 0;
    while (!found && tries < maxTries) {
      // Try position
      const testRect = {
        left: x,
        top: y,
        right: x + nodeWidth,
        bottom: y + nodeHeight,
      };
      const collision = Node.placedRects.some(r =>
        !(testRect.right + Node.margin < r.left ||
          testRect.left > r.right + Node.margin ||
          testRect.bottom + Node.margin < r.top ||
          testRect.top > r.bottom + Node.margin)
      );
      if (!collision) {
        found = true;
        break;
      }
      // Spiral out
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

    this.container.style.cursor = "grab";
    this.container.style.zIndex = "1";
    document.body.appendChild(this.container);

    // Draw line to previous node if provided
    if (prevNode) {
      this.prevNode = prevNode;
      // Create SVG if not present, and always move to top of body
      let svg = document.getElementById("node-lines-svg") as unknown as SVGSVGElement | null;
      if (!svg) {
        svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "node-lines-svg");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100vw";
        svg.style.height = "100vh";
        svg.style.pointerEvents = "none";
        svg.style.zIndex = "0";
        document.body.insertBefore(svg, document.body.firstChild);
      } else {
        // Always move SVG to top so lines are under nodes
        if (svg.parentElement) svg.parentElement.insertBefore(svg, svg.parentElement.firstChild);
      }
      // Create the line
      this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      this.line.setAttribute("stroke", "#444");
      this.line.setAttribute("stroke-width", "2");
      svg.appendChild(this.line);

      // Function to update line position
      const updateLine = () => {
        const rect1 = this.container.getBoundingClientRect();
        const rect2 = prevNode.container.getBoundingClientRect();
        const x1 = rect1.left + rect1.width / 2 + window.scrollX;
        const y1 = rect1.top + rect1.height / 2 + window.scrollY;
        const x2 = rect2.left + rect2.width / 2 + window.scrollX;
        const y2 = rect2.top + rect2.height / 2 + window.scrollY;
        this.line!.setAttribute("x1", x1.toString());
        this.line!.setAttribute("y1", y1.toString());
        this.line!.setAttribute("x2", x2.toString());
        this.line!.setAttribute("y2", y2.toString());
      };

      // Update line on drag and on window resize/scroll
      const observer = new MutationObserver(updateLine);
      observer.observe(this.container, { attributes: true, attributeFilter: ["style"] });
      observer.observe(prevNode.container, { attributes: true, attributeFilter: ["style"] });
      window.addEventListener("resize", updateLine);
      window.addEventListener("scroll", updateLine);

      // Also update after initial placement
      setTimeout(updateLine, 0);

      // Save updateLine for use in drag events
      (this as any)._updateLine = updateLine;
      (prevNode as any)._updateLine = updateLine;
    }

    // Drag event handlers
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
      // Update line if present
      if (this.line && (this as any)._updateLine) {
        (this as any)._updateLine();
      }
      if (this.prevNode && (this.prevNode as any)._updateLine) {
        (this.prevNode as any)._updateLine();
      }
    });

    document.addEventListener("mouseup", () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.container.style.cursor = "grab";
        document.body.style.userSelect = "";
      }
    });
  }
}
