import type { IconType } from 'react-icons'
import { SiPython, SiDjango, SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss, SiRedux, SiBootstrap, SiPostgresql, SiMysql, SiRedis, SiCelery, SiDocker, SiKubernetes, SiGit, SiGithub, SiVite, SiRazorpay, SiGooglegemini, SiJsonwebtokens, SiLeetcode, SiGeeksforgeeks } from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import { Mail } from 'lucide-react'
export interface Skill { name: string; icon: IconType; color: string }
export const skillGroups: { category: string; skills: Skill[] }[] = [
 {category:'Backend',skills:[{name:'Python',icon:SiPython,color:'#3776ab'},{name:'Django',icon:SiDjango,color:'#092e20'},{name:'Django REST Framework',icon:SiDjango,color:'#a30000'},{name:'Celery',icon:SiCelery,color:'#37814a'},{name:'Redis',icon:SiRedis,color:'#dc382d'}]},
 {category:'Frontend',skills:[{name:'HTML5',icon:SiHtml5,color:'#e34f26'},{name:'CSS3',icon:SiCss,color:'#1572b6'},{name:'JavaScript',icon:SiJavascript,color:'#b89d00'},{name:'TypeScript',icon:SiTypescript,color:'#3178c6'},{name:'React.js',icon:SiReact,color:'#149eca'},{name:'Redux',icon:SiRedux,color:'#764abc'},{name:'Bootstrap',icon:SiBootstrap,color:'#7952b3'}]},
 {category:'Databases',skills:[{name:'PostgreSQL',icon:SiPostgresql,color:'#4169e1'},{name:'MySQL',icon:SiMysql,color:'#00758f'}]},
 {category:'Integrations',skills:[{name:'JWT Authentication',icon:SiJsonwebtokens,color:'#555'},{name:'Razorpay',icon:SiRazorpay,color:'#2257bd'},{name:'Gemini API',icon:SiGooglegemini,color:'#8e75b2'}]},
 {category:'Tools',skills:[{name:'Git',icon:SiGit,color:'#f05032'},{name:'GitHub',icon:SiGithub,color:'#222'},{name:'Docker',icon:SiDocker,color:'#2496ed'},{name:'Kubernetes',icon:SiKubernetes,color:'#326ce5'},{name:'Vite',icon:SiVite,color:'#7653ed'}]}
]
export const socialLinks = [
 {label:'GitHub',href:'https://github.com/Shazil81',icon:SiGithub},
 {label:'LinkedIn',href:'https://www.linkedin.com/in/shazil81',icon:FaLinkedinIn},
 {label:'LeetCode',href:'https://leetcode.com/u/890Shazil/',icon:SiLeetcode},
 {label:'GeeksforGeeks',href:'https://www.geeksforgeeks.org/profile/msmoin',icon:SiGeeksforgeeks},
 {label:'Email',href:'mailto:mohammadshazilmoin@gmail.com',icon:Mail},
]
export const navigation = [{label:'About Me',id:'hero'},{label:'Skills',id:'tech-stack'},{label:'Education',id:'education'},{label:'Projects',id:'projects'},{label:'Contact',id:'contact'}]
