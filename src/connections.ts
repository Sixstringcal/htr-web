import type { Node } from "./node";

let svg: SVGSVGElement | null = null;

function ensureSVG(): SVGSVGElement {
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
    if (svg.parentElement) svg.parentElement.insertBefore(svg, svg.parentElement.firstChild);
  }
  return svg;
}

export function connectNodes(nodeA: Node, nodeB: Node) {
  const svg = ensureSVG();
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("stroke", "#444");
  line.setAttribute("stroke-width", "2");
  svg.appendChild(line);

  const updateLine = () => {
    const rect1 = nodeA.container.getBoundingClientRect();
    const rect2 = nodeB.container.getBoundingClientRect();
    const x1 = rect1.left + rect1.width / 2 + window.scrollX;
    const y1 = rect1.top + rect1.height / 2 + window.scrollY;
    const x2 = rect2.left + rect2.width / 2 + window.scrollX;
    const y2 = rect2.top + rect2.height / 2 + window.scrollY;
    line.setAttribute("x1", x1.toString());
    line.setAttribute("y1", y1.toString());
    line.setAttribute("x2", x2.toString());
    line.setAttribute("y2", y2.toString());
  };

  // Observe style changes to update line
  const observerA = new MutationObserver(updateLine);
  observerA.observe(nodeA.container, { attributes: true, attributeFilter: ["style"] });
  const observerB = new MutationObserver(updateLine);
  observerB.observe(nodeB.container, { attributes: true, attributeFilter: ["style"] });

  window.addEventListener("resize", updateLine);
  window.addEventListener("scroll", updateLine);

  setTimeout(updateLine, 0);

  // Optionally return cleanup logic or line reference if needed
  return line;
}
