window.whatslogger = {
	set: function(logger) {
		const mutationCallback = (mutationList, observer) => {
			for (const mutation of mutationList) {
				if (mutation.type == 'attributes') {
					let element = mutation.target

					// parsing message contents
					if (element.tagName == 'SPAN' && element.getAttribute("class") == "x78zum5 x1cy8zhl") {
						var span = element;
						var div = span.querySelector('.x1rg5ohu._ao3e')
						var allSpans = span.querySelectorAll('span')

						const msg = {
							from: div?.innerText,
							content: allSpans[allSpans.length - 1]?.innerText,
						}

						console.log(msg)

						// when true, it'll use SpeechSynthesis api to speak messages
						// received from your contacts
						if (window.whatslogger.useVoice == true) {
							let utterance = new SpeechSynthesisUtterance(`${msg.from || 'alguém'} disse: ${msg.content}`)
							speechSynthesis.speak(utterance)
						}
					}
				}
			}
		}

		const root = document.querySelector('div[aria-label="Lista de conversas"]')
		logger.observer = new MutationObserver(mutationCallback)
		logger.observer.observe(root, { attributes: true, subtree: true })

		console.log('whatslogger set up')
	},
	unset: function() {
		if (window.whatslogger)	{
			window.whatslogger.observer.disconnect();
		}

		window.whatslogger = undefined;
		console.log('whatslogger unset')
	},
	useVoice: true,
}
