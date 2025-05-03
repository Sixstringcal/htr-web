import type { Node } from "./node";

let svg: SVGSVGElement | null = null;

function createSVG(): SVGSVGElement {
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.id = "node-lines-svg";
    // Change position from absolute to fixed so that the SVG covers the entire viewport.
    svgEl.style.position = "fixed";
    svgEl.style.top = "0";
    svgEl.style.left = "0";
    svgEl.style.width = "100vw";
    svgEl.style.height = "100vh";
    svgEl.style.pointerEvents = "none";
    svgEl.style.zIndex = "0";
    // Debug styling:
    svgEl.style.border = "1px dashed green";
    svgEl.style.backgroundColor = "rgba(0,255,0,0.1)";
    document.body.insertAdjacentElement("afterbegin", svgEl);
    return svgEl;
}

function getOrCreateSVG(): SVGSVGElement {
    if (!svg || !document.contains(svg)) {
        svg = createSVG();
    }
    return svg;
}

export function connectNodes(nodeA: Node, nodeB: Node): SVGLineElement | null {
    if (!nodeA?.container || !nodeB?.container) {
        console.warn("One or both node containers are missing.");
        return null;
    }

    const svgElement = getOrCreateSVG();
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line") as SVGLineElement;
    line.setAttribute("stroke", "red"); // Visible red stroke
    line.setAttribute("stroke-dasharray", "4,2");
    line.setAttribute("stroke-width", "2");
    svgElement.appendChild(line);

    function updateLine() {
        if (!nodeA.container || !nodeB.container) {
            console.warn("Container lost for one or both nodes; disconnecting line.");
            disconnect();
            return;
        }
        const rectA = nodeA.container.getBoundingClientRect();
        const rectB = nodeB.container.getBoundingClientRect();
        console.log("rectA:", rectA, "rectB:", rectB);
        const x1 = rectA.left + rectA.width / 2;
        const y1 = rectA.top + rectA.height / 2;
        const x2 = rectB.left + rectB.width / 2;
        const y2 = rectB.top + rectB.height / 2;
        line.setAttribute("x1", x1.toString());
        line.setAttribute("y1", y1.toString());
        line.setAttribute("x2", x2.toString());
        line.setAttribute("y2", y2.toString());
    }

    const observerA = new MutationObserver(updateLine);
    const observerB = new MutationObserver(updateLine);
    observerA.observe(nodeA.container, { attributes: true, attributeFilter: ["style", "class"] });
    observerB.observe(nodeB.container, { attributes: true, attributeFilter: ["style", "class"] });

    window.addEventListener("resize", updateLine);
    window.addEventListener("scroll", updateLine);
    document.addEventListener("mousemove", updateLine);

    function disconnect() {
        observerA.disconnect();
        observerB.disconnect();
        window.removeEventListener("resize", updateLine);
        window.removeEventListener("scroll", updateLine);
        document.removeEventListener("mousemove", updateLine);
        if (line.parentElement) {
            line.parentElement.removeChild(line);
        }
    }

    updateLine(); // Initial update
    return line;
}

export default { connectNodes };
