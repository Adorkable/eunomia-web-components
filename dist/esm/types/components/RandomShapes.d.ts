export declare class RandomShapes extends HTMLElement {
    colors: string[];
    shapesTotal: number;
    shapes: HTMLDivElement[];
    shapesContainer: HTMLDivElement | undefined;
    constructor();
    connectedCallback(): void;
    animateShape(shape: HTMLElement, index: number, size: number): void;
}
