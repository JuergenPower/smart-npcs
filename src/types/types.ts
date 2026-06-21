export type Interaction = {
    label: string;
    action: () => void;
};

export type ShowInteractionMenuEvent = {
    x: number;
    y: number;
    interactions: Interaction[];
};