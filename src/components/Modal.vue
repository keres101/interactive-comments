<script setup>
const { title, content, type } = defineProps(['title', 'content', 'type'])
</script>
<template>
  <Teleport to="#Modal">
    <div class="modal">
      <div class="modal__body">
        <h4 class="modal__title">{{ title }}</h4>
        <div class="modal__content">{{ content }}</div>
        <div v-if="type === 'alert'" class="modal__buttons">
          <button class="button button_gray">NO, CANCEL</button>
          <button class="button button_red">YES, DELETE</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(14, 14, 22, 0.491);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal__body {
  background-color: var(--white);
  padding: 1.2em;
  border-radius: 0.4em;
  min-width: 300px;
  max-width: 380px;
}
.modal__buttons {
  display: flex;
  justify-content: space-between;
  gap: 0.6em;
}
.modal__title {
  color: var(--dark-blue);
  font-weight: 700;
  margin: 0 0 1em;
  font-size: 1.3em;
}
.modal__content {
  margin-bottom: 1em;
}
.modal__content {
  color: var(--grayish-blue);
}
</style>
