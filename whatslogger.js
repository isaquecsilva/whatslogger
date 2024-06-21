;(function whatsLogger() {
	window.whatsLogger = {
		set: function(logger) {
			const mutationCallback = (mutationList, observer) => {
				for (const mutation of mutationList) {
					if (mutation.type == 'attributes') {
						let element = mutation.target

						// parsing message contents
						if (element.tagName == 'SPAN' && element.getAttribute("class") == "x78zum5 x1cy8zhl") {
							var span = element;
							var allDivs = span.querySelectorAll('div')
							var allSpans = span.querySelectorAll('span')

							const msg = {
								from: allDivs[allDivs.length - 1]?.innerText,
								content: allSpans[allSpans.length - 1]?.innerText,
							}

							console.log(msg)

							// when true, it'll use SpeechSynthesis api to speak messages
							// received from your contacts
							if (window.whatsLogger.useVoice == true) {
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

			console.log('whatsLogger set up')
		},
		unset: function() {
			if (window.whatsLogger)	{
				window.whatsLogger.observer.disconnect();
			}

			window.whatsLogger = undefined;
			console.log('whatsLogger unset')
		},
		useVoice: true,
	}	
})()