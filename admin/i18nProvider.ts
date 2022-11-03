import polyglotI18nProvider from 'ra-i18n-polyglot';
// @ts-ignore
import es from '@blackbox-vision/ra-language-spanish';

export const i18nProvider = polyglotI18nProvider(() => es, 'es');