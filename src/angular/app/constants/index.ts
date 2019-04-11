export * from './messages';

import { TabLink } from '../interfaces/tab-link';

const MAIN_TAB_LINKS: TabLink[] = [
    {
        label: 'Диагностика',
        link: './diagnostic',
    }, {
        label: 'Правила',
        link: './list',
    },
];

export { MAIN_TAB_LINKS };
