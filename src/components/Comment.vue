<script setup>
import { ref } from 'vue'
import IconPlus from '/public/images/icon-plus.svg?component'
import IconMinus from '/public/images/icon-minus.svg?component'
import IconReply from '/public/images/icon-reply.svg?component'
import IconDelete from '/public/images/icon-delete.svg?component'
import IconEdit from '/public/images/icon-edit.svg?component'
import InputReply from './InputReply.vue'

const {
  comment,
  user,
  changeScore,
  updateComment,
  deleteComment,
  addReply,
  idParent
} = defineProps([
  'comment',
  'user',
  'changeScore',
  'updateComment',
  'deleteComment',
  'addReply',
  'idParent'
])
const commentReply = ref(false)
const modes = { read: 'read', edit: 'edit' }
const mode = ref(modes.read)
const content = ref(comment.content)
const textarea = ref(null)
const heightTextarea = ref(100)

const changeMode = newMode => {
  mode.value = newMode
}

const toggleReply = () => {
  commentReply.value = !commentReply.value
}

function autoGrowTextarea(e) {
  content.value = e.target.value
  textarea.value.style = 'height:' + heightTextarea + 'px;'
  textarea.value.style = 'height:' + textarea.value.scrollHeight + 'px;'
}

const manageUpdateComment = () => {
  const res = updateComment(comment.id, textarea.value.value, idParent)
  if (res) changeMode(modes.read)
}

const manageAddReply = content => {
  addReply(idParent || comment.id, content, comment.user.username)
  toggleReply()
}
</script>

<template>
  <div>
    <div class="comment" :data-id="comment.id">
      <div class="comment__score">
        <IconPlus
          class="comment__icon"
          @click="changeScore(comment.id, +1, idParent)"
        />
        {{ comment.score }}
        <IconMinus
          class="comment__icon"
          @click="changeScore(comment.id, -1, idParent)"
        />
      </div>
      <div class="comment__body">
        <div class="comment__header">
          <img
            class="comment__user-avatar"
            :src="comment.user.image.png || comment.user.image.webp"
            alt=""
          />
          <h4 class="comment__username">{{ comment.user.username }}</h4>
          <span v-if="comment.user.username === user.username" class="tag">
            you</span
          >
          <p class="comment__date">{{ comment.createdAt }}</p>
          <div
            v-if="comment.user.username === user.username"
            class="comment__user-options"
          >
            <span
              class="comment__user-options comment__user-options_red"
              @click="deleteComment(comment.id, idParent)"
              ><IconDelete class="comment__icon" />Delete</span
            >
            <span
              class="comment__user-options comment__user-options_blue"
              @click="changeMode(modes.edit)"
              ><IconEdit class="comment__icon" />Edit</span
            >
          </div>
          <div v-else class="comment__reply-button" @click="toggleReply">
            <IconReply class="comment__icon" />
            <p>Reply</p>
          </div>
        </div>
        <p v-if="mode === modes.read" class="comment__content">
          <span v-if="comment.replyingTo" class="comment__replyingTo"
            >@{{ comment.replyingTo + ' ' }} </span
          >{{ comment.content }}
        </p>
        <div
          v-else-if="mode === modes.edit"
          class="comment__content comment__content_edit"
        >
          <textarea
            class="comment-textarea"
            :value="content"
            @input="autoGrowTextarea"
            ref="textarea"
          />
          <button
            class="button button_purple"
            type="button"
            @click="manageUpdateComment"
          >
            Update
          </button>
        </div>
      </div>
    </div>
    <InputReply
      v-if="commentReply"
      class="comment comment__reply"
      :user="user"
      :userComment="comment.user"
      :replyingTo="comment.user.username"
      :addComment="manageAddReply"
    />
  </div>
</template>

<style>
.asdb {
  width: 100%;
}
.comment {
  background: white;
  border-radius: var(--radius-box-message);
  display: flex;
  align-items: flex-start;
  padding: var(--padding-box-message);
  gap: var(--padding-box-message);
}
.comment__replyingTo {
  color: var(--moderate-blue);
  font-weight: 500;
}
.comment__body {
  width: 100%;
}
.comment__user-options {
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 0.8em;
  cursor: pointer;
  margin-left: auto;
  color: hsl(238, 40%, 52%);
}
.comment__user-options span {
  display: flex;
  align-items: center;
  gap: 0.3em;
}
.comment__user-options_red {
  color: var(--soft-red);
}
.comment__user-options_red:hover,
.comment__user-options_red:hover .comment__icon {
  color: var(--pale-red);
  fill: var(--pale-red);
}
.comment__user-options_blue {
  color: var(--moderate-blue);
}
.comment__user-options_blue:hover,
.comment__user-options_blue:hover .comment__icon {
  color: var(--light-grayish-blue);
  fill: var(--light-grayish-blue);
}

.comment__reply {
  margin: 0.6em 0;
  animation: ani1 0.2s linear;
  transform-origin: top;
}

@keyframes ani1 {
  0% {
    transform: scaleY(0);
  }
  100% {
    transform: scaleY(1);
  }
}
.comment__reply-button {
  display: flex;
  color: hsl(238, 40%, 52%);
  font-weight: 700;
  align-items: center;
  gap: 0.4em;
  cursor: pointer;
  margin-left: auto;
}
.comment__reply-button:hover {
  color: hsl(239, 57%, 85%);
}
.comment__reply-button:hover .comment__icon {
  fill: hsl(239, 57%, 85%);
}
.comment__score {
  width: 2.4em;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  background-color: hsl(223, 19%, 93%);
  padding: 0.8em 0.6em;
  border-radius: 0.4em;
  color: hsl(238, 40%, 52%);
  font-weight: 500;
}
.comment__username {
  font-weight: 500;
  color: hsl(212, 24%, 26%);
}
.comment__content {
  padding: 1em 0;
  color: hsl(211, 10%, 45%);
  line-height: 1.6em;
}
.comment__content_edit {
  text-align: right;
}
.comment__content_edit textarea {
  color: inherit;
  margin-bottom: 1em;
}
.comment__date {
  color: hsl(211, 10%, 45%);
}
.comment__icon {
  width: 0.8em;
  cursor: pointer;
}
.comment__icon:hover {
  fill: hsl(238, 40%, 52%);
}

.comment__header {
  display: flex;
  align-items: center;
  gap: 0.9em;
}
.comment__user-avatar {
  width: 2.3em;
}
</style>
