<script setup>
import { ref, watch, computed } from 'vue'
const { user, userComment, config, addComment, replyingTo } = defineProps({
  user: Object,
  userComment: { default: { username: '' } },
  config: { default: { reply: true } },
  addComment: Function,
  replyingTo: String
})
const heightTextarea = ref(100)
const textarea = ref(null)
let contentTextarea = ref('')
let valueReply = computed(() => {
  if (replyingTo) return `@${replyingTo}, ${contentTextarea.value}`
  else return null
})

watch(textarea, () => {
  if (textarea.value != null) textarea.value.focus()
})

function autoGrowTextarea(e) {
  contentTextarea.value = e.target.value.replace(`@${replyingTo}, `, '')
  textarea.value.style = 'height:' + heightTextarea + 'px;'
  textarea.value.style = 'height:' + textarea.value.scrollHeight + 'px;'
}
</script>
<template>
  <div class="comment comment__reply">
    <img
      :src="user.image.png || user.image.webp"
      class="comment__user-avatar"
    />
    <textarea
      name="comment__reply"
      class="comment-textarea"
      :value="valueReply"
      ref="textarea"
      @input="autoGrowTextarea"
      :placeholder="!config.reply ? 'Add a comment' : ''"
    ></textarea>
    <button
      class="button button_purple"
      type="button"
      @click="addComment(contentTextarea), (contentTextarea = '')"
    >
      REPLY
    </button>
  </div>
</template>
