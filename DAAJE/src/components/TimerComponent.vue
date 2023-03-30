<template>
  <div class="d-flex">
    <img :src="clockIcon" alt="icon timer" />
    <div class="timer">
      <span> 45 </span>:
      <span> 10 </span>
    </div>
  </div>
</template>
<script>
import clockIcon from "../imgs/clock.png";

export default {
  data() {
    return {
      clockIcon: clockIcon,
    };
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
}
img {
  width: 28px;
  height: 28px;
}
</style>
