export enum UIStateType {
    NONE,
    INTERACTION_MENU,
    DIALOG,
    INVENTORY
}

export class UIState {

    private activeStates: Set<UIStateType> = new Set();

    open(state: UIStateType) {
        if (this.activeStates.has(state)) {
            return;
        }

        this.activeStates.add(state);
        console.log(
            'Open states:',
            Array.from(this.activeStates).map(s => UIStateType[s])
        );
    }

    close(state: UIStateType) {
        if (!this.activeStates.has(state)) {
            return;
        }
        this.activeStates.delete(state);
        console.log(
            'Open states:',
            Array.from(this.activeStates).map(s => UIStateType[s])
        );
    }

    hasState(state: UIStateType): boolean {
        return this.activeStates.has(state);
    }

    blocksMovement(): boolean {
        return this.activeStates.has(UIStateType.INTERACTION_MENU) || this.activeStates.has(UIStateType.DIALOG)
    }

};