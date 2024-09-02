import { debounce } from 'lodash'
import { DebouncedPushState } from '../types/components.ts'

export const createDebouncedPushState: DebouncedPushState = () => {
  return debounce((searchQuery: string, page: number) => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    if (page > 1) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.pushState({}, '', newUrl);
  }, 500);
};
