import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(ScrollTrigger, Flip, SplitText, CustomEase)

CustomEase.create('expo', 'M0,0 C0.16,1 0.3,1 1,1')

export { gsap, ScrollTrigger, Flip, SplitText, CustomEase }
