<script setup>
import { ref } from 'vue'
import '/src/styles/variables.css'
import '/src/styles/components.css'

import Comment from './components/Comment.vue'
import InputReply from './components/InputReply.vue'
import Modal from './components/Modal.vue'
import useLocalStorage from './components/useLocalStorage'
import data from './data'

const [comments, saveComments] = useLocalStorage('COMMENTS', data.comments)
const [user, saveUser] = useLocalStorage('USER', data.currentUser)

const addComment = content => {
  comments.value.push({
    id: comments.value[comments.value.length - 1].id + 1,
    content,
    createdAt: 'today',
    score: 0,
    user: user.value,
    replies: []
  })
  saveComments()
}

const addReply = (idParent, content, toUser) => {
  const comment = comments.value.find(comment => comment.id === idParent)
  const lng = comment.replies.length
  comment.replies.push({
    id: lng > 0 ? comment.replies[lng - 1].id + 1 : 1,
    content,
    createdAt: 'today',
    score: 0,
    user: user.value,
    replyingTo: toUser
  })
  saveComments()
}

const changeScore = (id, value) => {
  for (let comment of comments.value) {
    if (comment.id === id) {
      comment.score += value
      break
    }
  }
  saveComments()
}
const changeScoreReply = (id, value, idParent) => {
  const comment = comments.value.find(comment => comment.id === idParent)
  for (let reply of comment.replies) {
    if (reply.id === id) {
      reply.score += value
      break
    }
  }
  saveComments()
}
const updateComment = (id, content) => {
  for (let comment of comments.value) {
    if (comment.id === id) {
      comment.content = content
      saveComments()
      return true
    }
  }
  return false
}

const updateReply = (id, content, idParent) => {
  const comment = comments.value.find(comment => comment.id === idParent)
  for (let reply of comment.replies) {
    if (reply.id === id) {
      reply.content = content
      saveComments()
      return true
    }
  }
}

const deleteComment = id => {
  const index = comments.value.findIndex(comment => comment.id === id)
  comments.value.splice(index, 1)
  saveComments()
}
const deleteReply = (id, idParent) => {
  const comment = comments.value.find(comment => comment.id === idParent)
  const index = comment.replies.findIndex(comment => comment.id === id)
  comment.replies.splice(index, 1)
  saveComments()
}
</script>

<template>
  <!-- <Modal
    title="Delete comment"
    content="Are you sure you want to delete this comment? This will remove the comment and can't be undone."
    type="alert"
  /> -->
  <div class="container">
    <div class="comment-box comment-box-main">
      <div v-for="comment in comments" :key="comment.id">
        <Comment
          :comment="comment"
          :user="user"
          :changeScore="changeScore"
          :updateComment="updateComment"
          :deleteComment="deleteComment"
          :addReply="addReply"
        />
        <div
          class="comment-childs comment-box"
          v-if="comment.replies.length != 0"
        >
          <Comment
            v-for="commentChild in comment.replies"
            :key="commentChild.id"
            :comment="commentChild"
            :user="user"
            :changeScore="changeScoreReply"
            :addReply="addReply"
            :idParent="comment.id"
            :deleteComment="deleteReply"
            :updateComment="updateReply"
          />
        </div>
      </div>
      <InputReply
        :user="user"
        :config="{ reply: false }"
        :addComment="addComment"
      />
    </div>
  </div>
</template>

<style scoped>
.comment-box {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
}

.comment-childs {
  margin: 1em 0 1em 2em;
  padding-left: 2em;
  border-left: 2px solid var(--light-gray);
}
.container {
  min-height: 100vh;
  padding: 4em 0;
}
.comment-box-main {
  max-width: 700px;
}
</style>
