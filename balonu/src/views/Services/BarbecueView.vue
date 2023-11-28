<template>
  <div id="root">
    <div id="BarbecueHeader">
      <BarbecueHeader />
    </div>
    <div id="tour">
    <div id="ReservationForm">
      <ReservationForm />
    </div>
    <div id="BarbecueButton">
      <BarbecueButton />
    </div>
    </div>
  </div>
</template>

<script>
import BarbecueHeader from "@/components/Services/Barbecue/BarbecueHeader.vue"
import ReservationForm from "@/components/Services/Barbecue/ReservationForm.vue"
import BarbecueButton from "@/components/Services/Barbecue/BarbecueButton.vue";


export default {
  name: 'BarbecueView',
  components: {
    BarbecueHeader,
    ReservationForm,
    BarbecueButton
  }
}

</script>

<style>
#tour {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Arial', sans-serif;
  background: #f7f7f7;
  padding: 20px;
}

#ReservationForm, #BarbecueButton {
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  transition: box-shadow 0.3s ease;
}

#ReservationForm:hover, #BarbecueButton:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}


#BarbecueHeader img {
  max-width: 100%;
  border-radius: 4px;
}

#ReservationForm {
  display: flex;
  flex-direction: column;
}

#BarbecueButton {
  display: flex;
  justify-content: center;
}

</style>