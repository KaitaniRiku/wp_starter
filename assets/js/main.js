import config from './config'
import swiper from './swiper'
import swipeWork from './swipeWork'
import event from 'dom-events'
import classes from 'dom-classes'
import sniffer from 'sniffer'

sniffer.addClasses(document.documentElement)

config.isMobile && event.on(config.$body, 'touchmove', (e) => e.preventDefault())


