<script setup lang="ts">
import { onMounted } from "vue";
import HomeNavbar from "@components/HomeNavbar.vue";
import HomeFooter from "@components/HomeFooter.vue";
import AOD from "@components/AnimatedArrowDown.vue";

onMounted(() => {});
</script>

<template>
 <HomeNavbar class="animate__animated animate__slideInDown" />
 <main class="min-h-screen h-full container mx-auto pt-32">
  <section
   id="hero"
   class="w-full flex flex-col items-center text-center gap-4 z-10"
  >
   <img
    class="animate__animated animate__fadeInUp"
    src="@assets/images/San-Miguel-Logo.png"
    alt="San Miguel Leyte Logo"
    width="200"
   />
   <h1 class="text-4xl lg:text-5xl font-black max-w-4xl animate__animated animate__zoomIn">
    <span class="text-blue-500">EasyCedula</span> - Your Convenient Cedula Request System for
    <span class="text-blue-500">San Miguel, Leyte</span>
   </h1>
   <h4 class="text-xl font-medium text-gray-400 animate__animated animate__fadeInUp">Obtain Your Cedula Hassle-Free with EasyCedula</h4>
   <h5 class="text-sm font-medium text-black mt-10 animate__animated animate__fadeInUp">Scroll Down</h5>
   <AOD class="animate__animated animate__fadeInUp" />
  </section>
  <section
   id="why-easycedula"
   class="lg:mt-28 p-10 animate__animated animate__fadeInUp"
  >
   <h3 class="text-xl font-semibold mb-5 before:content-[''] before:border-t before:border-black before:inline-block before:my-0 before:mx-2 before:-translate-y-4 before:w-10 before:lg:w-16">
    Why EasyCedula?
   </h3>
   <div class="w-full flex flex-col lg:flex-row gap-10 items-stretch">
    <div class="bg-white shadow-lg rounded-lg p-5">
     <h1 class="text-xl lg:text-2xl text-center mb-5 font-bold mx-auto text-blue-500">Simple Online Process</h1>
     <p>
      Say goodbye to waiting in line for hours. With EasyCedula, you can request your Cedula from the comfort of your home or office. Our user-friendly interface makes the process straightforward and
      accessible.
     </p>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-5">
     <h1 class="text-xl lg:text-2xl text-center mb-5 font-bold mx-auto text-blue-500">Fast and Efficient</h1>
     <p>No more delays. We understand the importance of your time. Our system is designed to process your Cedula request quickly, ensuring you receive it in a timely manner.</p>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-5">
     <h1 class="text-xl lg:text-2xl text-center mb-5 font-bold mx-auto text-blue-500">Secure and Reliable</h1>
     <p>Your information is important to us. EasyCedula employs state-of-the-art security measures to safeguard your personal details throughout the request process.</p>
    </div>
    <div class="bg-white shadow-lg rounded-lg p-5">
     <h1 class="text-xl lg:text-2xl text-center mb-5 font-bold mx-auto text-blue-500">Accessible Anywhere</h1>
     <p>Whether you're at home, at work, or on the go, EasyCedula is accessible from any device with an internet connection. Request your Cedula whenever and wherever it suits you.</p>
    </div>
   </div>
  </section>
  <section
   id="how-it-works"
   class="lg:mt-20 p-10"
  >
   <h3 class="text-xl font-semibold mb-5 before:content-[''] before:border-t before:border-black before:inline-block before:my-0 before:mx-2 before:-translate-y-4 before:w-10 before:lg:w-16">
    How It Works?
   </h3>
   <div class="w-full flex flex-col lg:flex-row gap-10">
    <div class="w-full overflow-hidden">
     <img
      class="w-full h-full"
      src="@assets/images/drawing.png"
      alt="How it works"
     />
    </div>
    <div class="w-full max-w-[500px] flex flex-col gap-3">
     <div class="bg-white shadow-lg rounded-lg p-5">
      <h1 class="text-xl lg:text-2xl mb-5 font-medium mx-auto text-blue-500">#1 - <span class="text-black">Create an Account</span></h1>
      <p>Sign up with EasyCedula to create your account. Provide the necessary information securely.</p>
     </div>
     <div class="bg-white shadow-lg rounded-lg p-5">
      <h1 class="text-xl lg:text-2xl mb-5 font-medium mx-auto text-blue-500">#2 - <span class="text-black">Submit Your Request</span></h1>
      <p>Fill out the Cedula request form with the required details and documents. Our intuitive interface ensures a smooth submission process.</p>
     </div>
     <div class="bg-white shadow-lg rounded-lg p-5">
      <h1 class="text-xl lg:text-2xl mb-5 font-medium mx-auto text-blue-500">#3 - <span class="text-black">Track Your Request</span></h1>
      <p>Stay informed about the status of your Cedula request. Track its progress through your EasyCedula account.</p>
     </div>
     <div class="bg-white shadow-lg rounded-lg p-5">
      <h1 class="text-xl lg:text-2xl mb-5 font-medium mx-auto text-blue-500">#4 - <span class="text-black">Receive Your Cedula</span></h1>
      <p>Once your request is processed, we'll notify you to your email address. Your Cedula will be scheduled for pickup.</p>
     </div>
    </div>
   </div>
  </section>
 </main>
 <HomeFooter />
</template>
