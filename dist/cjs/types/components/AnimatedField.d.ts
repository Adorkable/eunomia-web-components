export declare class AnimatedField extends HTMLElement {
    updateId: number | null;
    field: HTMLDivElement;
    constructor();
    connectedCallback(): void;
    get autostart(): boolean;
    get words(): string[];
    set words(newValue: string[]);
    get random(): boolean;
    set random(newValue: boolean);
    startAnimating(updateFrequencyMilliseconds?: number, updater?: typeof AnimatedField.typeUpdater): Promise<number>;
    stopAnimating(): Promise<void>;
    static typeUpdater(element: HTMLElement, values: Array<any>, index: number): Promise<void>;
    static wrappingIncrement(index: number, arrayForLength: Array<any>): number;
    startUpdater(updateFrequencyMilliseconds: number, updater?: typeof AnimatedField.typeUpdater): Promise<number>;
}
