import type { Node } from "./node";

let svg: SVGSVGElement | null = null;

function createSVG(): SVGSVGElement {
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.id = "node-lines-svg";

    Object.assign(svgEl.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: "0",
        // Uncomment these for debugging:
        // border: "1px dashed green",
        // backgroundColor: "rgba(0,255,0,0.1)",
    });

    document.body.insertAdjacentElement("afterbegin", svgEl);
    return svgEl;
}

function getOrCreateSVG(): SVGSVGElement {
    if (!svg || !document.contains(svg)) {
        svg = createSVG();
    }
    return svg;
}

export function connectNodes(nodeA: Node, nodeB: Node): SVGPathElement | null {
    if (!nodeA?.container || !nodeB?.container) {
        console.warn("One or both node containers are missing.");
        return null;
    }

    const svgElement = getOrCreateSVG();
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

    // Set up connector style.
    path.setAttribute("stroke", "red");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("stroke-dasharray", "4,2");
    svgElement.appendChild(path);

    function updatePath(): void {
        if (!nodeA.container || !nodeB.container) {
            disconnect();
            return;
        }

        const rectA = nodeA.container.getBoundingClientRect();
        const rectB = nodeB.container.getBoundingClientRect();

        const parentX = rectA.left + rectA.width / 2;
        const parentY = rectA.top;
        const childX  = rectB.left + rectB.width / 2;
        const childY  = rectB.top;

        // Increase the vertical offset so connectors clear the nodes better.
        const verticalOffset = 60; // was 40
        const extraSpacing = 20;
        const midX = (parentX + childX) / 2;

        const d = `M ${parentX} ${parentY} ` +
                  `L ${parentX} ${parentY - verticalOffset} ` +
                  `Q ${midX} ${parentY - verticalOffset - extraSpacing}, ${childX} ${childY - verticalOffset} ` +
                  `L ${childX} ${childY}`;
        path.setAttribute("d", d);
    }

    // Observe changes on both node containers.
    const observerA = new MutationObserver(updatePath);
    const observerB = new MutationObserver(updatePath);
    observerA.observe(nodeA.container, { attributes: true, attributeFilter: ["style", "class"] });
    observerB.observe(nodeB.container, { attributes: true, attributeFilter: ["style", "class"] });

    // Update on global events.
    window.addEventListener("resize", updatePath);
    window.addEventListener("scroll", updatePath);
    document.addEventListener("mousemove", updatePath);

    function disconnect(): void {
        observerA.disconnect();
        observerB.disconnect();
        window.removeEventListener("resize", updatePath);
        window.removeEventListener("scroll", updatePath);
        document.removeEventListener("mousemove", updatePath);
        if (path.parentElement) {
            path.parentElement.removeChild(path);
        }
    }

    updatePath(); // Initial update.
    return path;
}

export default { connectNodes };
