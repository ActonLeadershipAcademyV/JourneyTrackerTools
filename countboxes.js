{
	document.currentScript.remove();
	let redCounter = 0;
	let yellowCounter = 0;
	let tealCounter = 0;
	let deniedCounter = 0;
	let greenCounter = 0;
	for (let el of document.querySelectorAll('article.challenge-card:not(.next-up-self-scheduled):not(.not-on-badge-plan):not(.optional)')) {
		if (el.classList.contains('overdue')) redCounter++
		if (el.classList.contains('completed')) greenCounter++
		if (el.classList.contains('late')) yellowCounter++
		if (el.classList.contains('in_review')) {
			let match = el.parentElement.querySelector('div.challenge-card-body div.card-pills span.pill.peer-approvals.pending').textContent.match(/^\d+\/\d+\speer approvals?, (\d+) Denials?/)
			if (match?.[1] > 0) {
				deniedCounter++
			} else tealCounter++
		}
	}
	alert(['Red: ' + redCounter, ' Yellow: ' + yellowCounter, ' Teal: ' + tealCounter, ' Denied: ' + deniedCounter, ' Green: ' + greenCounter])
}
