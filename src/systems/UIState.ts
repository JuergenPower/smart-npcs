export enum UIStateType {
    NONE,
    INTERACTION_MENU,
    DIALOG
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
            Array.from(this.activeStates)
        );
    }

    close(state: UIStateType) {
        if (!this.activeStates.has(state)) {
            return;
        }
        this.activeStates.delete(state);

        console.log(
            'Open states:',
            Array.from(this.activeStates)
        );
    }

    hasState(state: UIStateType): boolean {
        return this.activeStates.has(state);
    }

    blocksMovement(): boolean {
        return this.activeStates.size > 0
    }

};