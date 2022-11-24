import { ref, watch } from 'vue'

export default function useLocalStorage(name, initialValue) {
  const localStorageItem = localStorage.getItem(name)
  let parsedItem

  if (!localStorageItem) {
    localStorage.setItem(name, JSON.stringify(initialValue))
    parsedItem = initialValue
  } else {
    parsedItem = JSON.parse(localStorageItem)
  }

  const item = ref(parsedItem)

  const saveLocalStorage = () => {
    localStorage.setItem(name, JSON.stringify(item.value))
  }

  return [item, saveLocalStorage]
}
