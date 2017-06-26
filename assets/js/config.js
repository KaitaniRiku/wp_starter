import domselect from 'dom-select'
import classes from 'dom-classes'
import prefix from 'prefix'
import sniffer from 'sniffer'

const config = {

	$html: domselect('html'),
	$body: document.body,
	
	width: window.innerWidth,
	height: window.innerHeight,
	
	
	isMobile: sniffer.isPhone,
	
	prefix: prefix('transform'),
	transition: prefix('transition')
}

export default config