(async function() {
 document.currentScript.remove();
	var allBoxes = [];
	for (let user of document.querySelectorAll('div.dropdown-menu[aria-labelledby="dropdownPeopleNavigatorPill"] a')) {
		let doc = Object.assign(document.createElement('div'), {
			innerHTML: (await (await fetch(user.href)).text())
		});
		let boxes = [0, 0, 0, 0, 0];
		for (let box of doc.querySelectorAll('article.challenge-card:not(.next-up-self-scheduled):not(.not-on-badge-plan):not(.optional)')) {
			box.classList.contains('completed') ? boxes[0]++ : box.classList.contains('late') ? boxes[1]++ : box.classList.contains('overdue') ? boxes[3]++ : box.classList.contains('in_review') ? (box.parentElement.querySelector('div.challenge-card-body div.card-pills span.pill.peer-approvals.pending').textContent.match(/^\d+\/\d+\speer approvals?, (\d+) Denials?/)?.[1] > 0 ? boxes[2]++ : boxes[4]++) : void 0
		}
		allBoxes[allBoxes.length] = `${user.innerText}: ${([a,b,c]=boxes,a+b+c)} (${boxes[0]}+${boxes[1]}+${boxes[2]}) / ${eval(boxes.join`+`)} (${boxes[3]}+${boxes[4]}+${boxes[0]+boxes[1]+boxes[2]}) - ${([a,b,c]=boxes,a+b+c)}/${eval(boxes.join`+`)}`;
	}
	console.log(allBoxes.join('\n'));
})();
