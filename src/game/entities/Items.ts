import { Item } from '../../types/interfaces';

export const apple: Item = {
    id: 'apple',
    name: 'Apple',

    getInteractions: () => [
        {
            label: 'Destroy',
            action: () => {
                console.log('Apple destroyed');
            }
        }
    ]
};


export const wood: Item = {
    id: 'wood',
    name: 'Wood',

    getInteractions: () => [
        {
            label: 'Destroy',
            action: () => {
                console.log('Wood destroyed');
            }
        }
    ]
};