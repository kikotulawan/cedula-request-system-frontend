<script lang="ts" setup>
import { toRefs } from "vue";

const props = defineProps({
 numberOfPages: {
  required: true,
  type: Number,
 },
 modelValue: {
  required: true,
  type: Number,
 },
 disableClick: {
  required: true,
  type: Boolean,
 },
});

const { numberOfPages, modelValue: currentPage } = toRefs(props);

const emit = defineEmits(["update:modelValue"]);

const setCurrentPage = (number: number) => {
 if (props.disableClick) return;
 emit("update:modelValue", number);
};

const previous = () => {
 if (currentPage.value === 1) return;
 emit("update:modelValue", currentPage.value - 1);
};

const next = () => {
 if (currentPage.value >= numberOfPages.value) return;
 emit("update:modelValue", currentPage.value + 1);
};
</script>
<template>
 <div class="pagination-div">
  <button
   class="prev-btn"
   :disabled="currentPage === 1 || props.disableClick"
   @click="previous"
  >
   <span>Previous</span>
  </button>
  <ul class="pages-number">
   <li
    v-for="index in numberOfPages"
    :key="index"
    :aria-label="'go to page ' + index"
    :class="currentPage === index ? 'active' : ''"
    @click="setCurrentPage(index)"
   >
    {{ index }}
   </li>
  </ul>
  <button
   class="next-btn"
   :disabled="currentPage === numberOfPages || !numberOfPages || props.disableClick"
   @click="next"
  >
   <span> Next</span>
  </button>
 </div>
</template>
<style scoped>
.pagination-div {
 @apply inline-flex justify-between items-center w-full p-6;
}
.pagination-div .prev-btn,
.pagination-div .next-btn {
 @apply inline-flex items-center gap-2 font-semibold text-sm leading-5 text-[#344054] py-2 px-[14px] border rounded-lg bg-white border-[#D0D5DD] shadow-md transition-all;
}

.pagination-div .prev-btn:not([disabled]):hover,
.pagination-div .next-btn:not([disabled]):hover {
 @apply bg-slate-50;
}
.pagination-div .prev-btn:disabled,
.pagination-div .next-btn:disabled {
 @apply cursor-not-allowed bg-gray-100;
}
.pagination-div .prev-btn:not([disabled]):active,
.pagination-div .next-btn:not([disabled]):active {
 @apply scale-95;
}
.pagination-div .pages-number {
 @apply inline-flex items-center gap-4 select-none;
}
.pagination-div .pages-number li {
 @apply flex justify-center items-center rounded-lg font-semibold text-sm leading-5 text-[#344054] cursor-pointer bg-white w-8 h-8 transition-all;
}
.pagination-div .pages-number li.active {
 @apply flex justify-center items-center rounded-lg font-semibold text-sm leading-5 text-[#344054] cursor-pointer bg-[#F9FAFB] w-8 h-8 transition-all;
}
.pagination-div .pages-number li:hover {
 @apply bg-slate-50;
}
.pagination-div .pages-number li:active {
 @apply scale-95;
}
</style>
