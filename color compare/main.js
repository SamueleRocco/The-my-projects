/* Init */
const compare = document.querySelector('[data-uic="color-compare"]')
    compare.addEventListener('input', event => property(event.target))
    Array.from(compare.elements).forEach(element => property(element))

/* Helper-method: Set Scope of CSS Custom Property */
function scope(input, scope) {
	switch (scope) {
		case 'fieldset': return input.closest('fieldset')
		case 'form': return input.form
		case 'next': return input.nextElementSibling
		case 'parent': return input.parentNode
		case 'prev': return input.previousElementSibling
		case 'root': return document.documentElement
		default: return scope?.length ? document.querySelector(scope) : input
	}
}
/* Helper-method: Set CSS Custom Property */
function property(input) {
	const key = input.dataset.key || input.name
	const node = scope(input, input.dataset.scope)
	if (key && node) { 
		const value = input.value + (input.dataset.unit || '')
		node.style.setProperty(key.startsWith('--') ? key : '--' + key, value)
	}
}