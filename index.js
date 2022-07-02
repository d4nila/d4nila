const App=()=>{const[e,t]=React.useState("dark"),o="dark"===e?{app:{backgroundColor:"#333444"},terminal:{boxShadow:"0 2px 5px #111"},window:{backgroundColor:"#222345",color:"#F4F4F4"},field:{backgroundColor:"#222333",color:"#F4F4F4",fontWeight:"normal"},cursor:{animation:"1.02s blink-dark step-end infinite"}}:{app:{backgroundColor:"#ACA9BB"},terminal:{boxShadow:"0 2px 5px #33333375"},window:{backgroundColor:"#5F5C6D",color:"#E3E3E3"},field:{backgroundColor:"#E3E3E3",color:"#474554",fontWeight:"bold"},cursor:{animation:"1.02s blink-light step-end infinite"}};return React.createElement("div",{id:"app",style:o.app},React.createElement(Terminal,{theme:o,setTheme:t}))},Terminal=({theme:e,setTheme:t})=>{const[o,a]=React.useState(!1),[i,s]=React.useState("guest@biteofspace: ~");return React.createElement("div",{id:"terminal",style:o?{height:"100vh",width:"100vw",maxWidth:"100vw"}:e.terminal},React.createElement("div",{id:"window",style:e.window},React.createElement("button",{className:"btn red",onClick:()=>window.location.href="https://github.com/btfspace"}),React.createElement("button",{id:"useless-btn",className:"btn yellow"}),React.createElement("button",{className:"btn green",onClick:()=>{a(!o),document.querySelector("#field").focus()}}),React.createElement("span",{id:"title",style:{color:e.window.color}},i)),React.createElement(Field,{theme:e,setTheme:t,setTitle:s}))};class Field extends React.Component{constructor(e){super(e),this.state={commandHistory:[],commandHistoryIndex:0,fieldHistory:[{text:"Bite of Space portfolio"},{text:"Type help to see the full list of commands.",hasBuffer:!0}],userInput:"",isMobile:!1},this.recognizedCommands=[{command:"help",purpose:"Provides help information for btfspace Terminal commands."},{command:"date",purpose:"Displays the current date."},{command:"clear",purpose:"Clears the screen."},{command:"bash",purpose:"Starts a new instance of the btfspace Terminal."},{command:"theme",purpose:"Sets the color scheme of the btfspace Terminal.",help:["THEME <L|LIGHT|D|DARK> [-s, -save]","Sets the color scheme of the btfspace Terminal.","","L, LIGHT.................Sets the color scheme to light mode.","D, DARK..................Sets the color scheme to dark mode.","","-s, -save................Saves the setting to localStorage."]},{command:"exit",purpose:"Quits the btfspace Terminal and returns to btfspace GitHub."},{command:"time",purpose:"Displays the current time."},{command:"about",isMain:!0,purpose:"Displays basic information about btfspace."},{command:"experience",isMain:!0,purpose:"Displays information about btfspace experience."},{command:"skills",isMain:!0,purpose:"Displays information about btfspace skills as a developer."},{command:"donate",isMain:!0,purpose:"Displays all information about btfspace."},{command:"contact",isMain:!0,purpose:"Displays contact information for btfspace."},{command:"projects",isMain:!0,purpose:"Displays information about what projects btfspace has done in the past."},{command:"title",purpose:"Sets the window title for the btfspace Terminal.",help:["TITLE <INPUT>","Sets the window title for the btfspace Terminal.","","INPUT....................The title you want to use for the btfspace Terminal window."]}],this.handleTyping=this.handleTyping.bind(this),this.handleInputEvaluation=this.handleInputEvaluation.bind(this),this.handleInputExecution=this.handleInputExecution.bind(this),this.handleContextMenuPaste=this.handleContextMenuPaste.bind(this)}componentDidMount(){if(void 0!==window.orientation||-1!==navigator.userAgent.indexOf("IEMobile"))this.setState(e=>({isMobile:!0,fieldHistory:[...e.fieldHistory,{isCommand:!0},{text:['Unfortunately due to this application being an "input-less" environment, mobile is not supported.',"Therefore, I will have to deprive you of the opportunity to write in my terminal, and I will give you all the information at once :(","","i am Danila aka @btfspace.","student, python developer based in Russia","about all my development stuff read on my GitHub page: https://github.com/btfspace","","My contacts:","Telegram: @desquarre","E-mail: me@biteof.space","Wickr Me: @biteofspace","","My skills:","Languages:","Python","Ruby","PHP","Bash","","Libraries/Frameworks:","flask","django","tensorflow","bottle","aiogram","","Other:","Git","GitHub","Heroku","SQL","MongoDB"],hasBuffer:!0}]}));else{const e=document.querySelector("#field"),t=window.localStorage.getItem("reactTerminalThemePref");e.focus(),document.querySelector("#useless-btn").addEventListener("click",()=>this.setState(e=>({fieldHistory:[...e.fieldHistory,{isCommand:!0},{text:"SYS >> That button doesn't do anything.",hasBuffer:!0}]}))),t&&this.props.setTheme(t)}}componentDidUpdate(){const e=document.querySelector("#field");e.scrollTop=e.scrollHeight}handleTyping(e){e.preventDefault();const{key:t,ctrlKey:o,altKey:a}=e;if(![...Array.from({length:12},(e,t)=>`F${t+1}`),"ContextMenu","Meta","NumLock","Shift","Control","Alt","CapsLock","Tab","ScrollLock","Pause","Insert","Home","PageUp","Delete","End","PageDown"].some(e=>e===t)&&!o&&!a)if("Backspace"===t)this.setState(e=>e.userInput=e.userInput.slice(0,-1));else if("Escape"===t)this.setState({userInput:""});else if("ArrowUp"===t||"ArrowLeft"===t){const{commandHistory:e,commandHistoryIndex:t}=this.state;t>=e.length||this.setState(e=>({commandHistoryIndex:e.commandHistoryIndex+=1,userInput:e.commandHistory[e.commandHistoryIndex-1]}))}else if("ArrowDown"===t||"ArrowRight"===t){const{commandHistory:e,commandHistoryIndex:t}=this.state;0===t||this.setState(e=>({commandHistoryIndex:e.commandHistoryIndex-=1,userInput:e.commandHistory[e.commandHistoryIndex-1]||""}))}else if("Enter"===t){const{userInput:e}=this.state;e.length?this.setState(t=>({commandHistory:""===e?t.commandHistory:[e,...t.commandHistory],commandHistoryIndex:0,fieldHistory:[...t.fieldHistory,{text:e,isCommand:!0}],userInput:""}),()=>this.handleInputEvaluation(e)):this.setState(e=>({fieldHistory:[...e.fieldHistory,{isCommand:!0}]}))}else this.setState(e=>({commandHistoryIndex:0,userInput:e.userInput+=t}))}handleInputEvaluation(e){try{const t=math.evaluate(e);if(!isNaN(t))return this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:t}]}));throw Error}catch(t){const{recognizedCommands:o,giveError:a,handleInputExecution:i}=this,s=e.toLowerCase().trim().split(" "),n=s[0],r=s.slice(1).filter(e=>"-"!==e[0]),l=s.slice(1).filter(e=>"-"===e[0]);return!o.some(e=>e.command===n)?this.setState(t=>({fieldHistory:[...t.fieldHistory,a("nr",e)]})):i(n,r,l)}}handleInputExecution(e,t=[],o=[]){if("help"===e){if(t.length){if(t.length>1)return this.setState(e=>({fieldHistory:[...e.fieldHistory,this.giveError("bp",{cmd:"HELP",noAccepted:1})]}));const e=this.recognizedCommands.filter(e=>e.help);return e.filter(e=>e.command===t[0]).length?this.setState(o=>({fieldHistory:[...o.fieldHistory,{text:e.filter(e=>e.command===t[0])[0].help,hasBuffer:!0}]})):this.recognizedCommands.filter(e=>e.command===t[0]).length?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:[`No additional help needed for ${this.recognizedCommands.filter(e=>e.command===t[0])[0].command.toUpperCase()}`,this.recognizedCommands.filter(e=>e.command===t[0])[0].purpose],hasBuffer:!0}]})):this.setState(e=>({fieldHistory:[...e.fieldHistory,this.giveError("up",t[0].toUpperCase())]}))}return this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:["Main commands:",...this.recognizedCommands.sort((e,t)=>e.command.localeCompare(t.command)).filter(({isMain:e})=>e).map(({command:e,purpose:t})=>`${e.toUpperCase()}${Array.from({length:15-e.length},e=>".").join("")}${t}`),"","All commands:",...this.recognizedCommands.sort((e,t)=>e.command.localeCompare(t.command)).map(({command:e,purpose:t})=>`${e.toUpperCase()}${Array.from({length:15-e.length},e=>".").join("")}${t}`),"","For help about a specific command, type HELP <CMD>, e.g. HELP PROJECT."],hasBuffer:!0}]}))}if("clear"===e)return this.setState({fieldHistory:[]});if("date"===e)return this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:`The current date is: ${new Date(Date.now()).toLocaleDateString()}`,hasBuffer:!0}]}));if("bash"===e)return this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:"Launching new instance of the btfspace Terminal...",hasBuffer:!0}]}),()=>window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ"));if("theme"===e){const{setTheme:e}=this.props,a=1===t.length&&["d","dark","l","light"].some(e=>e===t[0]),i=!o.length||1===o.length&&("-s"===o[0]||"-save"===o[0]);if(a&&i){const a="d"===t[0]||"dark"===t[0]?"dark":"light";return this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:`Set the theme to ${a.toUpperCase()} mode`,hasBuffer:!0}]}),()=>{1!==o.length||"-s"!==o[0]&&"-save"!==o[0]||window.localStorage.setItem("reactTerminalThemePref",a),e(a)})}return this.setState(e=>({fieldHistory:[...e.fieldHistory,this.giveError(a?"bf":"bp",a?"THEME":{cmd:"THEME",noAccepted:1})]}))}return"exit"===e?window.location.href="https://codepen.io/HuntingHawk":"time"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:`The current time is: ${new Date(Date.now()).toLocaleTimeString()}`,hasBuffer:!0}]})):"about"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:["i am Danila aka @btfspace.","student, python developer based in Russia",'write "contact" to find out my GitHub and my contacts!'],hasBuffer:!0}]})):"experience"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:["Certificates:","Relational Databases..................freeCodeCamp","Data Analysis with Python.............freeCodeCamp","Information Security..................freeCodeCamp","Machine Learning with Python..........freeCodeCamp","","Work:","none :("],hasBuffer:!0}]})):"skills"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:["Languages:","Python","Ruby","PHP","Bash","","Libraries/Frameworks:","flask","django","tensorflow","bottle","aiogram","","Other:","Git","GitHub","Heroku","SQL","MongoDB"],hasBuffer:!0}]})):"contact"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:["Telegram: @desquarre","E-mail: me@biteof.space","GitHub: @btfspace","Wickr Me: @biteofspace"],hasBuffer:!0}]})):"projects"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:["1. Multilingual monkey pox statistics bot","   A bot that can parse and send statistics on smallpox monkeys.","   You can test it here: https://t.me/monkeypoxstatbot"],hasBuffer:!0}]})):"donate"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:["I am very flattered that you are interested!","You can donate me here: https://www.donationalerts.com/r/btfspace"],hasBuffer:!0}]})):"title"===e?this.setState(e=>({fieldHistory:[...e.fieldHistory,{text:`Set the btfspace Terminal title to ${t.length>0?t.join(" "):"<BLANK>"}`,hasBuffer:!0}]}),()=>this.props.setTitle(t.length>0?t.join(" "):"")):void 0}handleContextMenuPaste(e){e.preventDefault(),"clipboard"in navigator&&navigator.clipboard.readText().then(e=>this.setState(t=>({userInput:`${t.userInput}${e}`})))}giveError(e,t){const o={text:"",isError:!0,hasBuffer:!0};return"nr"===e?o.text=`bash: ${t}: command not found`:"nf"===e?o.text=`The ${t} command requires the use of flags. If you don't know what flags can be used, type help ${t}.`:"bf"===e?o.text=`The flags you provided for ${t} are not valid. If you don't know what flags can be used, type HhelpELP ${t}.`:"bp"===e?o.text=`The ${t.cmd} command requires ${t.noAccepted} parameter(s). If you don't know what parameter(s) to use, type help ${t.cmd}.`:"up"===e&&(o.text=`The command ${t} is not supported by the help utility.`),o}render(){const{theme:e}=this.props,{fieldHistory:t,userInput:o}=this.state;return React.createElement("div",{id:"field",className:"#333444"===e.app.backgroundColor?"dark":"light",style:e.field,onKeyDown:e=>this.handleTyping(e),tabIndex:0,onContextMenu:e=>this.handleContextMenuPaste(e)},t.map(({text:e,isCommand:t,isError:o,hasBuffer:a})=>Array.isArray(e)?React.createElement(MultiText,{input:e,isError:o,hasBuffer:a}):React.createElement(Text,{input:e,isCommand:t,isError:o,hasBuffer:a})),React.createElement(UserText,{input:o,theme:e.cursor}))}}const Text=({input:e,isCommand:t,isError:o,hasBuffer:a})=>React.createElement(React.Fragment,null,React.createElement("div",null,t&&React.createElement("div",{id:"query"},"guest@biteofspace:~$"),React.createElement("span",{className:!t&&o?"error":""},e)),a&&React.createElement("div",null)),MultiText=({input:e,isError:t,hasBuffer:o})=>React.createElement(React.Fragment,null,e.map(e=>React.createElement(Text,{input:e,isError:t})),o&&React.createElement("div",null)),UserText=({input:e,theme:t})=>React.createElement("div",null,React.createElement("span",{id:"query"},"guest@biteofspace:~$"),React.createElement("span",null,e),React.createElement("div",{id:"cursor",style:t}));ReactDOM.render(React.createElement(App,null),document.querySelector("#root"));
