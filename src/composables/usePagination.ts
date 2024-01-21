import { computed, ref } from "vue";

interface PaginationConfig {
 totalItems: number;
 rowsPerPage: number;
 currentPage: number;
}

export function usePagination(config: PaginationConfig) {
 const rowsPerPage = config.rowsPerPage ?? ref(100);

 const numberOfPages = computed(() => Math.ceil((config.totalItems || 0) / rowsPerPage));

 return {
  numberOfPages,
 };
}
