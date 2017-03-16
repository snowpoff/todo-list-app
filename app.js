
/* MAKE DATABASE */
const form = document.getElementById("todoItem")
const ls = localStorage


/* ADDS LIST ITEM TO LIST & DATABASE */
function getListItem() {
	let listItem = document.getElementById("todoItem").value
	const ol = document.querySelector("ol")
	const li = document.createElement("li")
    const span = document.createElement("span")
    const button = document.createElement("button")
  span.textContent = listItem
  span.setAttribute("id", addToDatabase(listItem))
  span.setAttribute("onClick", "toggle(this.id)")
  button.textContent = "[delete]"
  button.setAttribute("onClick","removeItem(this.previousSibling.id)")
  button.setAttribute("style","color: red;")
  ol.appendChild(li)
  li.appendChild(span)
  li.appendChild(button)
}

// makes unique ids while ensuring the values remain in ascending order. if you decide you need thousands of things on your todo list this will probably get really awful. 

let key = 0

for (let i = 0; i < ls.length; i++) {
    key = ls.key(i)
}

function addToDatabase(listItem) {

  let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
  key = key + alphabet[Math.ceil(Math.random()*26)]
  ls.setItem(key, listItem)
  return key
}

/* TOGGLES LIST ITEM STRIKE/NO STRIKE */
// caveat: since state = 1 after clicking on a list item, putting a strikethrough on a second list item (rather than toggling the first) requires clicking twice, since the first click will return state to 0

let state = 0

function toggle(id){
    const li = document.getElementById(id)
    if (state === 0){
        li.setAttribute("style", "text-decoration: line-through;")
        state = 1
    }
    else {
        li.setAttribute("style", "text-decoration: none")
        state = 0
    }  
}

/* DELETES LIST ITEM */

function removeItem(id){
    const li = document.getElementById(id)
    li.parentNode.parentNode.removeChild(li.parentNode);
    ls.removeItem(id)
}


/* POPULATE LIST FROM LOCALSTORAGE ONLOAD */

function populateList(){
    
    for (let j = 0; j < ls.length; j++){
        const ol = document.querySelector("ol")
        const li = document.createElement("li")
        const span = document.createElement("span")
        const button = document.createElement("button")
        
        let key = ls.key(j)
        span.textContent = ls.getItem(key)
        span.setAttribute("id", key)

        span.setAttribute("onClick", "toggle(this.id)")
        button.textContent = "[delete]"
        button.setAttribute("onClick","removeItem(this.previousSibling.id)")
        button.setAttribute("style","color: red;")

        ol.appendChild(li)
        li.appendChild(span)
        li.appendChild(button)
    }
}

