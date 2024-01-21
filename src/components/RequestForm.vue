<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { CedulaRequestService } from "@/modules/cedula-requests/services";

import FileInput from "@components/FileInput.vue";
import RequestForSelect from "@components/RequestForSelect.vue";
import CedulaTypeSelect from "@components/CedulaTypeSelect.vue";
import { toast } from "vue3-toastify";

const request_data = ref<any>({
 reason_of_request: "",
 type_of_request: "",
 government_id: null,
 community_tax_declaration_form: null,
 business_tax_declaration_form: null,
 proof_of_income: null,
 payslip: null,
 is_representative: false,
 representative_government_id: null,
 representative_auth_letter: null,
 representative_photocopy_of_government_id: null,
});

const is_loading = ref<boolean>(false);

const allPropertiesNotNull = computed(() => {
 return Object.entries(request_data.value).every(([key, value]) => {
  if (request_data.value.type_of_request && request_data.value.type_of_request === "Individual") {
   return (
    key === "representative_government_id" ||
    key === "business_tax_declaration_form" ||
    key === "representative_auth_letter" ||
    key === "representative_photocopy_of_government_id" ||
    (value !== null && value !== "")
   );
  } else {
   return (
    key === "representative_government_id" ||
    key === "representative_auth_letter" ||
    key === "representative_photocopy_of_government_id" ||
    key === "proof_of_income" ||
    key === "payslip" ||
    (value !== null && value !== "")
   );
  }
 });
});

const completedForm = computed(() => {
 if (
  request_data.value.is_representative &&
  (request_data.value.representative_government_id === null || request_data.value.representative_auth_letter === null || request_data.value.representative_photocopy_of_government_id === null)
 ) {
  return false;
 } else return true;
});

watch(
 () => request_data.value.type_of_request,
 (value) => {
  if (value === "Individual") {
   request_data.value.business_tax_declaration_form = null;
  }
  if (value === "Business Owner") {
   request_data.value.proof_of_income = null;
   request_data.value.payslip = null;
  }
 },
);

watch(
 () => request_data.value.is_representative,
 (value) => {
  if (!value) {
   request_data.value.representative_auth_letter = null;
   request_data.value.representative_government_id = null;
   request_data.value.representative_photocopy_of_government_id = null;
  }
 },
);

function resetForm() {
 request_data.value.government_id = null;
 request_data.value.community_tax_declaration_form = null;
 request_data.value.business_tax_declaration_form = null;
 request_data.value.proof_of_income = null;
 request_data.value.payslip = null;
 request_data.value.representative_government_id = null;
 request_data.value.representative_auth_letter = null;
 request_data.value.representative_photocopy_of_government_id = null;
}

function successFormSubmit() {
 toast.success("Submitted! Your request will be validated by our staff.");
 emits("closeForm", false);
}

async function submitRequest() {
 toast.loading("Submitting your request", { toastId: "submitting_toast" });
 is_loading.value = true;
 const res = await CedulaRequestService.new().createNewCedulaRequest({
  type: request_data.value.reason_of_request,
 });

 if (res.status === 200) {
  const files: File[] = [
   request_data.value.government_id,
   request_data.value.community_tax_declaration_form,
   request_data.value.business_tax_declaration_form,
   request_data.value.proof_of_income,
   request_data.value.payslip,
   request_data.value.representative_government_id,
   request_data.value.representative_auth_letter,
   request_data.value.representative_photocopy_of_government_id,
  ];

  let errorUpload: boolean = false;

  for (const file of files) {
   if (file) {
    const formData = new FormData();
    formData.append("file", file);
    const upRes = await CedulaRequestService.new().uploadCedulaRequirements(formData, res.data.cedula_req_id);
    if (upRes.status === 500) {
     errorUpload = true;
    }
   }
  }

  if (!errorUpload) successFormSubmit();
  else resetForm();
  is_loading.value = false;
  toast.remove("submitting_toast");
 }
}

const emits = defineEmits<{
 closeForm: [value: boolean];
}>();
</script>
<template>
 <form
  @submit.prevent="submitRequest"
  class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 flex flex-col gap-3"
 >
  <h5 class="font-semibold text-base lg:text-xl">Cedula Request Form</h5>
  <div class="max-w-lg flex flex-col gap-3">
   <RequestForSelect
    v-model="request_data.reason_of_request"
    :disabled="is_loading"
   />
   <CedulaTypeSelect
    v-model="request_data.type_of_request"
    :disabled="is_loading"
   />
   <FileInput
    v-model="request_data.government_id"
    id="valid-gov-id"
    name="valid-gov-id"
    label="1 Valid Government-Issued ID"
    :disabled="is_loading"
   />
   <FileInput
    v-model="request_data.community_tax_declaration_form"
    id="tax-declaration-form"
    name="tax-declaration-form"
    label="Accomplished Community Tax Declaration Form"
    :disabled="is_loading"
   />
   <FileInput
    v-if="request_data.type_of_request === 'Individual'"
    v-model="request_data.proof_of_income"
    id="proof-of-income"
    name="proof-of-income"
    label="Proof of Income"
    :disabled="is_loading"
   />
   <FileInput
    v-if="request_data.type_of_request === 'Individual'"
    v-model="request_data.payslip"
    id="payslip"
    name="payslip"
    label="Payslip"
    :disabled="is_loading"
   />
   <FileInput
    v-if="request_data.type_of_request === 'Business Owner'"
    v-model="request_data.business_tax_declaration_form"
    id="business_tax_declaration_form"
    name="business_tax_declaration_form"
    label="Approved business tax declaration as evaluated by the City Treasurer's office"
    :disabled="is_loading"
   />
   <div
    class="inline-flex items-center"
    v-if="!is_loading"
   >
    <label
     class="relative flex items-center p-3 rounded-full cursor-pointer"
     htmlFor="check"
    >
     <input
      v-model="request_data.is_representative"
      type="checkbox"
      class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
      id="check"
     />
     <span class="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       class="h-3.5 w-3.5"
       viewBox="0 0 20 20"
       fill="currentColor"
       stroke="currentColor"
       stroke-width="1"
      >
       <path
        fill-rule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clip-rule="evenodd"
       ></path>
      </svg>
     </span>
    </label>
    <label
     class="mt-px font-light text-gray-700 cursor-pointer select-none"
     htmlFor="check"
    >
     Authorized Representative
    </label>
   </div>
   <div
    class="flex flex-col gap-3"
    v-if="request_data.is_representative && !is_loading"
   >
    <FileInput
     v-model="request_data.representative_government_id"
     id="representative_government_id"
     name="representative_government_id"
     label="1 Valid Government-Issued ID of Representative"
     :disabled="is_loading"
    />
    <FileInput
     v-model="request_data.representative_auth_letter"
     id="representative_auth_letter"
     name="representative_auth_letter"
     label="Authorization Letter"
     :disabled="is_loading"
    />
    <FileInput
     v-model="request_data.representative_photocopy_of_government_id"
     id="representative_photocopy_of_government_id"
     name="representative_photocopy_of_government_id"
     label="Photocopy of the valid government-issued ID of the person or business owner being represented"
     :disabled="is_loading"
    />
   </div>
  </div>
  <div class="inline-flex items-center gap-3">
   <button
    type="button"
    @click="emits('closeForm', false)"
    :disabled="is_loading"
    class="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-700 hover:bg-red-600 focus:outline-none rounded shadow active:scale-95 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
   >
    <p class="text-sm font-medium leading-none text-white">Cancel</p>
   </button>
   <button
    :disabled="request_data.is_representative ? !allPropertiesNotNull || !completedForm : !allPropertiesNotNull || is_loading"
    type="submit"
    class="mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded shadow active:scale-95 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
   >
    <p class="text-sm font-medium leading-none text-white">Submit Request</p>
   </button>
  </div>
 </form>
</template>
