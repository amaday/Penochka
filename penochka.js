// ==UserScript== 
// @name           Govno 3 aka penochka
// @version        0.5e
// @description    Penochka imgboard script.
// @include        http://2-ch.ru/*
// @include        http://*.2-ch.ru/* 
// @exclude        */src/* 
// @run-at         document-start
// ==/UserScript==

/**
 * timer.js - small timer wrapper.
 */
var scope = {}

if(typeof unsafeWindow === "object") {
   scope = unsafeWindow;
} else {
   scope = window;
}

scope.timer = {
   time : 0,
   total : 0,
   init : function() {
      var d = new Date();
      this.time = d.getTime();
   }, diff : function(str) {
      var d = new Date();
      d = d.getTime() - this.time;
      this.total += d;
      this.cache += str + ': ' + d + 'ms; ';
   },
   cache : ''
}

scope.timer.init()
var css = {
   photon: '',
   neutron: 'html, body {	background:url(http://i012.radikal.ru/0909/84/9610e68b3bdf.png) fixed right bottom no-repeat !important;	background-color: #212121 !important;	color: #698CC0 !important;	font-family: "Trebuchet MS",Trebuchet,tahoma,serif !important;}img {	padding:2px !important;}a {	color: #C9BE89 !important;}a:hover {	color: #789922 !important;}.adminbar {	clear:both !important;	float:right !important;	font-size: .8em !important;}.adminbar a {	font-weight: bold !important;}.logo {	clear:both !important;	text-align:left !important;	font-size:2em !important;	font-weight: bold !important;	color:#FFAB3F !important;	/*width:100% !important;*/}.postarea {}.rules {}.postblock {	background:transparent !important;	color:#0061AA !important;	font-weight:bold !important;}.footer {	text-align:center !important;	font-size:12px !important;	font-family:serif !important;	margin: 2em 0 0 0 !important;}.dellist {	font-weight: bold !important;	text-align:center !important;}.delbuttons {	text-align:center !important;	padding-bottom:4px !important;}.managehead {	background:#2C2C2C !important;	color:#6393CD !important;}.postlists {	background:#FFFFFF !important;	width:100% !important;	color:#800000 !important;}.row1 {	background:#2C2C2C !important;	color:#6393CD !important;}.row2 {	background:#575757 !important;	color:#6393CD !important;}.unkfunc {	background:inherit !important;	color:#789922 !important;}.reflink {	font-size: .8em !important;	font-weight: bold !important;}.filesize {	background-color:#212121 !important;	border: solid 1px #575757 !important;	padding:2px !important;	-moz-border-radius: 8px !important;	-webkit-border-radius: 8px !important;	text-decoration:none !important;	color: #999999 !important;	font-size: .8em !important;}.filesize a {	color: #789922 !important;}.filetitle {	background:inherit !important;	font-size:1.2em !important;	color:#3941AC !important;	font-weight:bold !important;}.postername {	color:#B4B9CD !important;	font-weight:bold !important;}.postertrip {	color:#AAFFAA !important;	font-weight:bold !important;}.omittedposts {	color:#999999 !important;}.reply {	background:url(http://i059.radikal.ru/0909/4b/3a095af1f706.png) right bottom no-repeat !important;	background-color:#2C2C2C !important;	border: solid 1px #575757 !important;	margin: 0 !important;	-moz-border-radius: 5px !important;	-webkit-border-radius: 5px !important;}blockquote {	margin: .5em .5em .5em 1em !important;}.reply blockquote {	margin: .5em !important;}.doubledash {	display: none !important; 	vertical-align:top !important;	clear:both !important;	float:left !important;}.replytitle {	font-size: 1.2em !important;	color:#0061AA !important;	font-weight:bold !important;}.commentpostername {	color:#B4B9CD !important;	font-weight:800 !important;}.thumbnailmsg {	font-size: .8em !important;	color:#999999 !important;}hr {	height:3px !important;	border-width: 0px !important;	background:url(http://img75.imageshack.us/img75/2759/barnew.png) center no-repeat !important;}table {	border-style: none !important;}table td {	border-style: none !important;}.nothumb {	background-color: #555555 !important;	border-style: dotted !important;	margin: .3em .5em !important;}.abbrev {	color:#999999 !important;}.highlight {	background:#112534 !important;	color:#48B0FD !important;	border:2px dashed #789922 !important;	-moz-border-radius: 5px !important;	-webkit-border-radius: 5px !important;}p.spoiler > span.warning {	color: #FF6600 !important;	font-weight: bolder !important;}span.spoiler {	background: #575757 !important;	color: #575757 !important;}span.spoiler:hover {	color: #48B0FD !important;}.theader, .passvalid {	background:#2C2C2C !important;	text-align:center !important;	padding:2px !important;	color:#006AB9 !important;	clear: both !important;	font-weight: bold !important;	margin-bottom: .5em !important;	border: solid 1px #575757 !important;	-moz-border-radius: 5px !important;	-webkit-border-radius: 5px;}.managehead {	padding:0px !important;}.postlists {	padding:0px !important;}.oldpost, .notabene {	color:#33EEFA !important;	font-weight:bold !important;}.reply {	padding: 0px !important;}dl.menu dt {	background:#111111 !important;	border: solid 1px #575757 !important;	-moz-border-radius: 5px !important;	-webkit-border-radius: 5px;	margin-top: 1em !important;	padding-left: .5em !important;	cursor: pointer !important;}dl.menu dd {	margin-left: .5em !important;	padding-left: .5em !important;	border-left: solid 1px #575757 !important;}dl.menu dd:hover {	background: #575757 !important;}dl.menu dd.hidden {	display: none !important;}html, body {	background-image: none !important;} .penBtnBold {width: 24px; background-color: red;}'
}/**
 * penochka. internationalization
 */

var i18n = {}

var i18nButtons = {
   text: {
      begin: ' <b>[',
      end: ']</b>',
      sep: ' / ',
      bold: '<b>Ж</b>',
      italic: '<em>К</em>',
      striked: '<s>З</s>',
      underline: '<u>П</u>',
      capsBold: '<b>КБ</b>',
      spoiler: '<span class="spoiler">SP</span>',
      source: '<tt>Код</tt>',
      sage: 'Сажа'
   },
   photon: {
      begin: '',
      end: '',
      sep: '',
      bold: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4YMTJtWtkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEjklEQVRIx7WWzWtUVxjGf2cyY0ZH0YQJxsQQE5xCkdBRO2kiokQ3WWWR7PwDjAUx6Epm4aodKqIQNKgoNYt2IX7gwoVS2nRnqVn4lYxSKZXW+NGQimPM3Ln3vG8X987N3CS70guHe+85nPOc932e98MQPHomXQ9sBur5748D/GWOzToApgagh/Z9P/Ph5bIdqooqKArq/1fnwV9bfIObbGLt7K99wD1zbNYxAUAvm3dN8PYxrE5DXWIRoHpYCKIEZ0b/AxAjLnWVd5TXZUj986APuBcH2mjvm+DVJDR1QfcRWNsCGBTF8yzWelixWE9Q8fCsImKxVrBWEBFEPVSU+MJrGp5/R7L0G6XGzyfWzU1m4kA9H2Z8C7qPwOZdUJcEQKyLuhZrLZ7nhW8RwVobDhHBqgURyvXN2A6huThKwvkboD4WeATiq2Btqw9gDKIWzyqugBVBg4EaUOO7sWagBhVQk8BNptFYonoy8ZWkIeLhutVbVm+qwbDYYE5EUNXwW9SAKiIm5BMgFjlc4eTJb0il1pHL5Xj6tIiI0NDQQDqdZuPGjbS0tNDW1kZ7ezudnZ2oKs+ePWNgYIAdO7J8Oz4eqpGlIKpgxfLV1wUcxyGfz3Pw4DDWWmZmZrhx82bE2mvXrlIsFrGqHD9+nJGRERzH4fz58zU21IBooH3PenR359izZw/9/f00NTVx584dTJ3hi56eyMbt23cSi8X44e5dNm3aRN/eveRyObq6upAohs9JGFSe5daNW3jq85HP5xkeHmb37t0YY5bwJriuy+joKGdOn0aAy5cvIyLw4Y+aKKtaEgSSZy2udRHPl+jWT7aSyWQoFArMl0oRkI8fP3Lu3DkymQwdnZ1RIRDBCDhR9YGs5wOoi7UW13FpbW3l4sWLfLptWwQkm81y4cIFmpubqVQqCBIQriASXH0JJyhYq3hSDTZlbGwsIBJOnDgRAcnn8wBcuXKFS5cuoaqYAERVI9THajKUHwPW4nnCq1cvOXv2LADpdJrBwcEIyMDAABs2bABgfHyct6/fhm5SogKrURdBLvKBTp06xcLCAgCHDx9mdX20AqRSKQ59eQiAcrnM2NhYGJiqK0jYz6AaRveTJ0+4fv06AB0dHQwNDfluXqKuocEhtmzZAsDt27cpFosrFpdFTvA5efPmDfl8PrzN0aNHAXj4+GFk49TUFMYYRkZGwtpSKBSYm5vzc9zSOCEsRpbe3t7Qndlslv3797NtibIADhw4AMDk5CS5XI779+9TLBbp7+/nwY9XIxqO11oiIkxPT6MxQAi1/+jRo4i/VU1gqb9e5SMc8y8izIe5y0iFuvnXYB0I6kP14CqgqmKMYowNARbLcxAjtkLCmcWIG3FXxU2mWf1umsbfv8eq4tanqQvymQSmxoMgE8CoYmvrfwgmrHJmaZ25QcJ7TymVYc3Cn47RM+kk0DPf8NlEsvQcL7HeLzhVnpZ3FUH/ocDydSMuCe8982s6WF+a6gN+qXYrSaC31Ljzp4QzG5K0HCA6u+IFjMFJNNLw/uG+oFspm5q+K/k/9F1lgH8Bw4whn+9+4KQAAAAASUVORK5CYII=" alt="Жирный" style="vertical-align: middle !important" />',
      italic: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4bEFUpGUQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEVklEQVRIx7WWT2hUVxTGfzeZScYxooYnSLSIi8mitAyNf6oxi07cuAriMtJko3Un6Mp1dlUQupCQjRRicaHduSmKiYg1VRctxVYwhgRTx9rQSP44mbx7zuni3XmZSdJV6WMu7+/c75zv++65xxEOuxq1AnuBVv77UQVm3cW5KoCrAzjCvt5xlv7Y8A8zwwwMA0vua88hebd2hji3i7a5JyXgsbs4V3UB4Ch7u8d49ytsiaA5uwZQmywFMcKcjfcBxGlM8+p7VrYV2Dr/cwl4nAE+Yl9pjPIz2PUpHD4PbR2AwzC8F0Q8ooJ4xdTjxVAVRBQRRVVR85gamcpbdk7eILf4ksX2g2Pb/n5WyACtLL1JMjh8HvZ2Q3MOAJUYiwURwXufnlUVEUmHqiImoMpK625kv7L792/IVv8CaG0KjECmBdr2JADOoSZ4MWIFUcXCwByYS2isG5jDFMxliXMR1pStzUxmM2uoeuK4FmUtUgtDkPBMVTGz9FrNgRmqLtUToKlhcgOJ4xTATCiXy1y+fJkoiujo6ODKlSs8ffoTCsQiXLp0iWKxyLlz5zATtM6NrAcxA1HB1/HtvRJFEWfPngXg1KlTXLhwgQOfHQD1fHv9Ol+UShw/fpzZ2dk0q7Uc6uiy4H0vHvUeqaUfAB/9+AiAvpMnE4oUFpaWePHiBQMDA/SWSqj3qFkC1IhRAwmLygvqE6fUAFSVe3fvkc/n+fzQocC9MjIywuDgYEKNCOZcYo4k4rpVVgMJK9mL4CXGlERgE1SU8fFxeo4dI5PJoKrcunWLXC5HZ2dnkhk0GoEGjKCJGYZh4kMmcZKFV6amppiZmeHPd+/o6+uj+1g3La0tnPnqTBA4uAtN7wm62HpNAEQMrx6cIQJmyv2x+wAMDw8zPT1Nf38/09PToMFFbq2OObNUl3pZmuoqVEJRcJWqx8R4MP6AQqFAFEV0dXVR6i1xY/QGlUolZJFQRfJbY2m9hWtaJbVorVx8+PCBiYkJenp6sGCCLwcGmZ+f586dO4hJInot+kCdWaO90kySDxpdNfHkCZVKhe7u7jTig10HKRQ6GR0dxcQ2AGx2NK3XZK3gGXfv/gBAsVhMojbDTDh9up/JyUkePny4AcDMkhq3qSZhAlXl1atXjAwPc/v2bQCuXbtGuVxOqThx4gQ7duxgaGiImzdvsrq6Wre51VOVXDu7Gn1cbdv/HKDcNcRKfh/WRCKk6qZ8m7kwmTZmEEZueYbOl18DkK+8/iStXU5XaV5+C1KFsD+kNNQBOmc4J/8KgKySrc7hNG4oK6txLmLL+99on/oOMSNujWgO9UyDaJmwyBRwZkj9/p+CKS3VOfa8+Z6sX2Bxa4F85XXV2dUoBxxZ3lkcyy1O4rPbkw2n1jRs7CpC/2HAxvdOY7J+geX8frYvPi8BE7VuJQccXWw/cD9bnUvtthGg8emmAThHNdvOzoVfekO3suLq+q7c/9B3rQD8A268xe7YpkfWAAAAAElFTkSuQmCC" alt="Курсив" style="vertical-align: middle !important" />',
      striked: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4lKUvpijEAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEH0lEQVRIx7WWT2hURxzHP5Psy64ao2ZXSJotxoO5lSItQSUI8eYtl6Citzb2JkQvekiQUnMUCubiuUUQejGHxktTpGgsEVpKm0MTZWk10m5qmkTN7pvf79fDm327m82llA4Mw3tvd77z/TMzP0dodrOQBYpAlv/eKsDv7nK5AuAaAI5x6NS3bD5v+YeZYQaGgSXPtfeQfKuPEOcO0ln+fhh45C6XKy4AHKd4Yo4/foJdBWiP6gC1yVIQI8zZ/BxAnMa0V9fY2nuEPa9+GAYeZYB3OTQ8x8oCHHwPBi9B5zuAwzC8F0Q8ooJ4xdTjxVAVRBQRRVVR85gambcvObD0BbmNX9no/nBu718LRzJAls0XCYPBS1A8Ae05AFRiLBZEBO99OqoqIpJ2VUVMQJWtbA9yWOlZ/Jyo8idAti0oApkO6OxLAJxDTfBixAqiioWOOTCXyNjQMYcpmIuIcwWsLarNTGanaKh64sCgs3MP09PTLC8vMzMzQ6lUYv/+/YyMjDA+Pk4URYlcqqg5MEPVpX4CtDVNbiBxnAKYCQDj4+P09/dz//7XPH78mKGhIW7fvs3E5GRIXq0L2pBGtoOYgajgG/T2XlOQ0TNn6OjIkc/n+fT6dQBm7t1DmkAMVW3g0CCXhex78aj3SI2+JiCjZ0YTgwFV5dmzEgC9vb2YSBJx1TpQM0YNJGwqL6hPklJL0MrKSsKqWmV1dZWHDx8yNTVFPp/nxo0bycTSKFOyd2hwJRO2ERh4EbzEmIKYJGBhH/T396crGxgYYHp6mr6+PlQVCww1sFGaMIInZhiGiQ9M4kQeX5dtcXGR2dlZLn5ykaWlJc6ePUupVEp9UOpyEXyx7Z4AiBhePTjDOagWi+nqs8AAcDV0Vlfh9Okm7f9+8gSthYCWdCWeiNVT9ba3718du7tWnqcyGc0B28YkMdsAnj6F4I2qgioS9H6zucng4CDZbJb5+XnMjFcvXqbSmTXHK2WS/KCeKlXlo7GPuXPnTvAlmOuVBw++A+Do0aM77JHW1uJJjYkC165d5cKFCywvL3P+/HkKhQILCwtMTX1GV1cXV65caQEws+SM2w5CehlJUySLxSJ3797l1q1bnDt3jrW1NfL5PCdPnmRsbIyenp5WgCaprJVJTSoLZ7Oqks/nmZycZGJiItXbzIVRWwDqQNZ6djmt0v76JUglmCz1VQY/zAznDOcE2BkAqRJVyjiNm+SqxrkCu9Z+ofvpl4gZcbZAezjPNFDNhE2mgDNDGu//FEzpqJTpe/EVkV9nY88Rdr/9reLsZiEHHHt94P253MYSPtqXXDg1n1qrilB/GND63WlM5Nd5vfsw+zZ+Hgbma9VKDji+0f3BN1GlnJrUCtD8dscFOEcl6ubA+o+nQrWy5Rrqrtz/UHdtAfwDZfV5VijJQF8AAAAASUVORK5CYII=" alt="Зачеркнутый" style="vertical-align: middle !important" />',
      underline: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4lDXfqbuAAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADw0lEQVRIx7WWTWubRxDHfxtL0eM3go0CpnGxU3AKxaGH2sZOenGu/gD+Fj7k5nNfoBdBae6GoBz7EWr3Jtv40NLGhTYUY7Vp2oo2WLZsSTszPew+L6p8SunCw8PusvOf+c9/ZtcRh9WqFWAWqPDfRxf4xT1udQFcAWCVuUdfc/7r0AkzwwwMAwvzdB3CXv6HfnKbidbhOtBwj1tdFwHWmH2wxx/fwWgVRso5QGosAzGizcF5BHHaZ6T3mqvJBcb//mYdaJSAt5lb3+O3I7h9H1a2YOItwGEY3gsiHlFBvGLq8WKoCiKKiKKqqHlMjdLlK6Ze1EnaP9GeXtqb/OtooQRUOH8ZIljZgtkHMJIAoNLH+oKI4L3P/qqKiGSfqiImoMpVZQa5q8z88Dnl7p8AlVJkBEo3YeJOAHCO3d2vqNefsbOzw/z8PGurq6hZRp2acnBwQLPZZHNzk42NDVaWljBXpp9UsRvl1DKl66Sh6nn48EMWF++zs7PD8vIyXzx5MuT91tYWzWaT7e1tKpUKooAZqi7L5xCIGli/jzdDRBgfH81UJCKYBeOgaMFIkiSoKmaaCSVV2gCIGYhGfiPnwWA4pID4kGSTAERByukXztgAM6UUwMzw4lHvEY2KSUEIkSgEEAVJ85NKXDUHGsRIQWJReUF9UEqqIABTQ6OqglxjRClIdMAyYVihylKQWMleBC/96KkEWaaHRdBIRzFKAnHZWkptMfOlNCEGmHjUK+oEERvIiUQAMcGwmPpUjYqS00XMi/07JwAihlcPzhABM80cyjwlgmvew1JHnFlWS8aQusKSWKiB1GjmbJEmwvoAXaqhQIss2TXqCpHoAEjnvANAp9PJcxKsYmZ0Ovl+kiSZhIsRAtwg66Ch6aWqajQafPTJxwA0Gg2ePq1zcnKCeuX0tEm9Xufw8BCAWq3G0dHRQHTF4axWfa83+c5zgN+XPqU3MRciidIsFllebGTzwSIMuamcn7Dw42cAjF2eLuY5MfK24Rzv3rv3Rlfi/v5+8brL6YqNNaPq3hsCNBqNXMaFzGe9y2mPkYtXUJnh+Ph7xCxTkTMX6sMM51J6GKAoMy49yt0WTvuh3UeQXj+pMvr6mOmfnyFm9CtVRixvjJhRikWmgDNDivd/Bqbc7La48/JLyv6M9vgCY5fNrrNaNQFWL6be30vaL/DlW9GD9F4felXE94cBw/tO+5T9GRdjd7nVfr4O7KevlQRYa09/sFvutvIWPgQwuHqtA87RLU8zdfbto/hauXKFd1fyP7y7rgD+AXdedl2Vuy8jAAAAAElFTkSuQmCC" alt="Подчеркнутый" style="vertical-align: middle !important" />',
      capsBold: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw45NbmfiyMAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAFHUlEQVRIx72Xz08VVxTHP/OYBw+RCOSZWHgEsb640WoCMeBKMP0bdGHiwh+JoZHAvooFTXVBbCILE5cllkVj0DSxC0tZ0TQaWmuLvzctSgopRMTHY+49p4uZN2/eD7XFtDc5mcy9M+d+77nn+z33OgRNh5NVQAqo4r9tH76h/ymQBf5w+heyAE4EWAct3d/zarbkL1VFFRQF9d/fp/n/+z7zT/ASm9m48GMXMOX0L2SdAFgnqX0T/PkLVCehIp53lHMWglPeC1qJHx+cIx4Va0us1qapWfypC5hygWZauiZ4cQc274K9p2BjI+CgKMZYrDVYsVgjqBiMXT88EYu1grWCiCBqUFHczBz1T74ksfyY5Yb2idq/7qRdoIpXz/2I7T0FqX1QkfAdWQ/1LNZajDHhU0TWDc5aG5qIYNWCCKtVW7CtwpaZL4hn5wGq3GDnwK2EjU0+MMdBgggZASuCBoY6vq1/VwsMdVABdeJ4iSQai+cQ4ZYPvcHzLIlEIuwbGxtj//79WLVYsczMzDAwMMD09DSZTIa+vj76+/sBaG5u/kdAp6amqKurQ9QBVUSccAEl4ERBPQ+jirW2CLCg6m/F3NwLDh48yOLiYlFMZF3MVZWQeFEhcPMfgZUgD0RKwQHG+El8buhcCCwWi5FqaqJuUx1iSsGdHxqivb094kewVrGq1NbWBoA0yONCork5YKqKsQYxBitSkvQiggCPHj1i/MYNACorKxn7aow9u/cE35RGprExRTq9I08IzZNBVVFr8wCLRMAtEEVjEeMzqBicWosYw+DgYCjCx44dY9dHu3zGvYmdagvGJVh4DpiE2+lrH5GscwMZBAVjLcZ6qFAy4bOnT7l9+zaTk5MApFIpjh8//k5ZOXr0aD4Srkt9fT07d+7kyJEjtLW1FYAVCrAFOReotVqDGEEciy0S2oGzZwveez7pobqmGvkXJDDGMD8/z8TEBJOTk4yMjNCxryMfuSDvcjPHcjmHgrWKEV9k7TuqwIXPLzA7OxuuPGrRdmbgDOM3xrk+fp3LI5dpbW0Nt/fKlSuoKk4ATotKYywqjblk9VlpCia5evUqvb294fvS0hJ9vX14Wc+nctSihPigkfT2NDvSO+ju6ubkyZPh2MzMDEj+F6WQsLE8WwlqXr68FBBChBMnTtDV3R323bt3j4sXL741cjmZyJnneeFYPB4vkJLi004YOf+DQOdsGbaKP9G5ofO0tLSE/aOjo9y69S0ihBZts7PPefjwMQ8ePOTmzW+4dOlSONbZ2RnRuNIW6pxflP3KUE7rBX9lNTXVDA8Pc/jwYTKZDACnT39KOr2drVu3lkwwOPhZ2YmTySQ9PT0hMFX1a3fZnFMNy5OIIMaU3R5VZdu2bZyNsPf169f09/ezsrLyVmlxXZdUKsWhQ4e4du0ajY2NkRKmRaWwKHK5LdWYP37//v08iyLgVB0OHPiYu3enyxwaKNtfeAqWwohFLMqIsLY6skbFyhxUbQHi2OD0KyI46iDqA3Oc9RX4aA0vBwy7Rjy7gCOef2wKwK15iSTVS7/R8GwUq4pXlaQiqLcSeHQDkRTAeY87hI2eRkKQQmV2gabnXxM3L1muSbMh83vW0eFkAuhYqd89kVh+golvCpDn7g1lls76D5uEN4fC5ohH3LxkZUMrm5Z/7QJ+yN2+EkDnckPbd/HsQpiEWtbv+928yvtVcByy8QbqX/7cHdy+Vp3IvTXxP91bt7+h/0nk3roK8DeW5+knBNwhbQAAAABJRU5ErkJggg==" alt="КАПСБОЛД" style="vertical-align: middle !important" />',
      spoiler: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDxEWFYeXd8sAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC8klEQVRIx8WXzW4URxSFv5rpZhowQrYGyQrjIJR4iVgEIWBnHogFD4KUd0iWeQOEsyOKWICiwALDJgmgZJQgDxZud917sujqnl8WzCTjkko9GnVXf33vuafqBtLQg34PGAA9Pn98Bbxi9VECv4f7wxIgTIDd4srdH/nwx9wTkpBACLT8myVNXOs1x1eoiktsDH/eAx6H+8MyJLDbDO7s8+cvcLYP3Xy8YLNYC7c8XWJp10moSBC8onvynuMLu5z/5+ke8DgDdriyt8/bJ3DpGty8BxtfAAEhYjTMIuaGRUcel4aLJtwNM8fMcXdcEbnIPr5j8+A7itFLRls39i/8/WQ3A3p8eFNH7OY9GNyBbgGAW4Uqw8yIMbbXZYe7Y2btdHdMBu4c97axq872i2/Jy78AelkTbbIzsHG5BgsB90g0ER3MHaWJwgqiC7VMJiYKyEEhpyr6qJO3us4Wf2Hk4cNHrGsMBl+ChHsYa3MWzgWqKuIKol+uiq0tvMlXZ+MbwDzpwL29odPp/G9Qnt4jKf2eDkrWgEkiWsRjnIJbT+RUA84kLJsyxWh4TBV0CnDjnGoCLjl/NCNahdYbONy9jtyUWzeaS24ti3h0PJxS5JLuNKs5ADMRPUJYb7UGCU+AYq5a679MtXOvF402nWK6YGci56cC11iJtMBKmpOBJ5/zNZuwf8K65jQ3Gzlfk+dJqvfuhZpTvY24+6mkdTqlmo9cc6RRB3Z2dlodtA6+QBefBxHS8z61dU3OyYpo99bgJ3SP3kFvG8ixdPp1d4ICrhosrGQznrQ9D4adkJdDglf1sSnBnVRFn7Pvn7P1+ntMour16ab91lNos2SSvqKf2QKNSc6ZcsjlNz+Qx0NG53c59/G3MuhBvwBuHW1e3y9GB8T8YiJv+oa53KyC16ZtdpXgFXk85OjcVS6Oft0Dfmq6rwK4Pdr65lFeDlsAfapDWbUAFn1wCJT5FpuHz+6m7us4TPStxQp969fAwX/Ytx4D/Avt/GC/55FUuAAAAABJRU5ErkJggg==" alt="Спойлер" style="vertical-align: middle !important" />',
      source: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4sN2AkDBsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADvElEQVRIx7WW304bRxTGf+M/sZM4RIAjAqEOpEZG/EmFqKIkd+SBcpEHidR3aC/7CqV3iaogFVm4VmJx4VCKWtNGOCiYnXNOL3Z2vYu5q7rSaGd3dueb833fOTOOcNnregVYBCr892sEHLlXgxGAywA85eGLn/n8+8QfZoYZGAYWPyfvIR4b3yGq3qM2+GUHeONeDUYuADxj8fkuf7bhZh2K5TFAMlkKYoQ5888BxGlE8fITF3dWuP3PrzvAmxLwFQ93dvnjHdzbhCcvobYAOAzDe0HEIyqIV0w9XgxVQUQRUVQVNY+pUfpywnTve6rDDwxnvt298/e7lRJQ4fNxHMGTl7D4HIpVAFQiLBJEBO99eldVRCRtqoqYgCoXlfvIsnL/t+8oj/4CqBQCI1C6AbUHMYBzqAlejEhBVLHQMAfmYhozDXOYgrkyUbWOFcrJzJSus4aqJ4qSVSYrtdAECe9UFTNL+2oOzFB1qZ4AhdzkBhJFKYCZMDU1ldIzNzfHwsICoCigQLPZDO4zzATNuJGrIGYgKvgM37XaFKenp8zOzqLA0dFRvBivoJ7mo0d0379ndXU1BVLVTAwZuix434tHvUdC+AAikt41pRMkyZUwTqDOzNA8RgISksoL6mOnXAXR4CogN54k5pimOHfIqFIIaYQZeBEiiWIgEY5Pjpmfn6ff72MiLC0tQdBBVel0OqytrdFut/NGIIcR3BWy1sSjXlEniMT89vv94Byj1+shJin3ZjYGYEwXQZecuwJbiBhek2SLJ2o0GkiYtNls0lppxVQprK+vs7m5mdLmUpdZTvpCpkLFOSCC94qqp9FocHh4yNfLy6gq3W6XRABVpd1uB81jUM2yZNe4KxY51sKSHzPCmwiaiByoEpNMlbYcjRPuSipokt2acJsBUwW1cd9MMbUcSPLt1auQj8QyBc/odru0Wi06nQ5iwsbGBgCPH2+gqmxtbQGwvb2ds7RdAUsjibeGGMAylBwcHKT9/f39HDV7e3u5CCzDQNbDOU2SGmWhNmsmi7N8m7l0N7wKMAayydrl9JLi+QnICML+kK5Sx4DOGc5JXCSvAUAuKY8GOI1ydF1G1To3P3WYOfwBMSOq1CmGeqYh1FJIMgWcGZLd/1Mw5cZowIPjHyn7M4a3V7j15ePI2et6FXh6Pv3NbnXYw5fvxhtOotPkqSKcPwyYHHcaUfZnnN9a5u7wYAd4m5xWqsCz4cz2T+XRIBVpEiD/9toFOMeoPMP02f6LcFq5cJlzV/V/OHddAPwL37CyC3NhW/kAAAAASUVORK5CYII=" alt="Исходный текст" style="vertical-align: middle !important" />',
      sage: '<img src="data:image/png;base64,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" alt="Сажа" style="vertical-align: middle !important" />'
   },
   neutron: {
      begin: ' ',
      end: '',
      sep: '',
      bold: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4ZNSwbr4EAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEl0lEQVRIx7WWa4hVVRTHf2vtvc+dcZxJHc0ZnWHsJflIS01GpJwxH9kQWEHggwxCIrAowU8a+MXUjCIIom8RFIiBaQXqB2eGxAcpvsmcHOfl6851HGfGca73cfpwzn0546dow+Kcfc49+7fXWv+17hbCsWiTHwGqgAj/fcSBruZdEgeQPEBtT+uBpkhZ9bAvROQRFryD3BwESXTDY/PrgWPNuyQuIWBBb0dT4+iJL5AY7CadepAHGA5BBGEkEIg6cGOQwSv4pbPrgWMWqO65erCxbFItA9EzdJzYQby/C3wfEXDOBeY5nHU4ZzHGYa0N7y3GGKw1GGPR4olQuQZ/1NNo/6nGdOncZywQiZRWkRjspuPEDu52NpNODgHgeRZxHuJ5qOehzmE8D7UWnMNPWMQ51FokZVBjkFQUje4mVbUB340HiCjgA6RTceJ9nSHAxzmDtQ5jg11bY7DGYDQwVcWY4CoiqCgqiiGBJmPgJ4KEA3YkaThncc4LQ2Wx1mKyZgILAQWwEB4qgAzFPqyidavqeO+dV+i63sPnX//KzWg/v/z48SO1+smWfVRWlLH2rTmUjxvF4SNXOXohpzQALfDAc7y7ph7nLD/tOcrGDQ0451i9/ju2ffl7weJffdvIxk/3ocaw6o3nOdT8D9YqdQunZNWWGZrxQEVwznGp5TrnLnZw6mw7fX33eXHOk6gxtLTGCiBtnb2IKLOmVdLbN0TLldu0dfRy7UY/IpofrSBcIoIAzlq2bt+LsQbnHLv3/slH7y/l752/YYwpgGRku3zxVHbvPY+o8sOec0GeimvIi1bOEwk9cZ7DC5N+KzbAjZt3eXvlPEYVewWQSMSxrG4q0e573O4dyoogUJuSTxnmiXEexirGBKrq6R1kxZIZvPrK9ALI9i0rAPjjeBvWGFDJQtKPygkiQSVnJGssDcueY8WSGQD8vP9sAWT/wb8AeKl2Ci8vqMluNNt68obm96cMwFrH+PJSGpbOBKCvf4iTZ7oKPjx74Sb3BoMet3B+NWWji5CwMDMQGTknNturVr42m0gkKKNDTZdJpwvrI5H0aTraFhavoW5hTV5eBHnYk0wHDRRjqakup3beFACisQFOnr6GMXaYuk6fv0WsZxCAWdMmUDGhBNGgQ5OXl1xOEIyxjB1Twqo356Ia/ODA4cuoUaonjymATKooRURpPNKe7RbL6p+gpNhDtKDGc+oCsNawbXND9mV75x0utcT4bPPyYe1k/do5AOz85gTtXX3UVJVR+XgJH6ybxRffxwqKURZt8qf7g60XAfyWrWi8A9Gwq+rIBpKNfbYLZ3IhStJV0TP2QxBI2KqZNtsu1WGKKpBUFCNJRDUHEg3A2YUku3BuQwEAdaTtOHxxCMlsuB5IIgYl02DSajRqkGRP+FcqIIovEt4LadGgHlQhTLIfFqCKkLLl9I1+nZSWUpRsJcHkuCza5BcBtTJwrtEvfgpJ3gU/CZJfszJ8nntMwYEAS0pLiSQ7GPKerQeOZ04rRcAC7T912HfjH6pYITcVHuKOuAmbvsN9b+bi8LQyJHnnrqL/4dw1BPAv0adEn8nxnpkAAAAASUVORK5CYII=" alt="Жырный" style="vertical-align: middle !important" />',
      italic: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4cE4Nh3jkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEVUlEQVRIx7WW229UVRTGf2utvc8M0GmBFgqlxAtMgkK5SUgbErEKiQ/6xJP4L+gj/g0kPPlsfDI+GJ9MSAQSLY2SFhBvXK220BYQplBogaHDXI4P+8zMmbY+GXeyMrPPnHO+tdb3fWu2kKyDx+IM0Atk+O+rBNwePiElAEkB9M9OnDqbad+85AkR+ZcIv0FzD4KUZ6Bj/yAwMnxCSpIADDyeOjvU1r2HcnGGWvVFCmApCCIIywGBqAe/GimOE+d2DQIjDtg8e/P0UHtPP08LvzJ1/jilJ7chjhEB732IyOOdx3uHmcc5l3x3mBnOGWYOXdENGz8kXrkVfXJpqJZ7I++ATCbXS7k4w9T548xND1OrLAAQRQ7xERJFaBSh3mNRhDoH3hOXHeI96hxSNdQMqRbQwldUez8i9l0AGQVigFq1RGl+OgGI8d5wzmMuZO3McGaYhlBVzMKniKCiqChGGa08gLgcCAfcctLw3uF9lLTK4ZzDGmEhEoAWsAQ8UQB1FLdYRZF3uDoP3tHV2c67h3bxwZF+qtUaJ09f5sZf97k1/RhzxtEje9nT18vE5EO++Po3RBXRptIAtKWCyOOjqEG2c55nxTKnvrsCwMjFCU6eucKtyVmcKYMH8lwbK3Bt7D5r16xsVFZXG+l2iQhCUJJEUeAgFX2vB+9c+GUytE6NbDZiU89qRn66zNj4LM4C8apKLJru1iIQ51AfYc5aQPb0vcRCqcz4zYeYBT4Ov7WNH0dvhb0qkqpCNLyvhZN0JRp5nDUJdubo276JG2P3EQkkD+x7mUqlRuHBs0B6SgSNSlIoSyoxH2FOGybb0N3B+q4cxWKZTz5+h/b2LCfPXGd45GZDyqqKWhOktogTrYMgEpxcl2wCsnN7LwCffznKN99epSOXZV3nquCLhpKkkWhj9KSWpudTHcAl48M7z45tPdy9N8+zYoWpO3NcHytwYP8rZCKfZJ5UI4GXNEgdS9NTNpiwLl9HNhOR37KOsfGZ4HYzzl2cpm1VxO6+jagpluKiGYIsrqQ+QcOga6oqv3U9mcjx58TDRvumbs9zr/CUgX2bWznRVPuQpAxZxAmCWZ0Pw5xj5/YeAO78PR+yNsNMOf/zHbrXtZF/tbMVQJptW4aT0C6X+GNDdweH3syzf28w4aGDedasbjr66h8zFJ+Xee/wVvbt3oiZoiKhTaJNTlrNGDZmhjrHo7kFfhid5NyF6ZZM64MwjoVPP7uEqqQMmHAhQk2WMSMIqMeyG5BqAZNKeCiRaWiBNElNKq9zEO4LVaCemltLLB6h0gB5IeUHsOo16DmKFgypzCZ/pQKixMmoQISaaPCDKiQkx4kBVYSq62S+7X2qmiNbmaDMppIcPBZngX55+vtQvGILUpmDuAKS9qws3Tcv03IgwFHVHJnKFAvRtkFgtH5ayQID+uTS97HvWuRYobkVFuEum4SrPeJ5tOPt5LSyIKlzV/Z/OHctAPwDvUIgonMgRrIAAAAASUVORK5CYII=" alt="Курсив" style="vertical-align: middle !important" />',
      striked: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAMkAvgCJRuLZSwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4mAVVxcQgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEQ0lEQVRIx7WWXYhVVRTHf2uvtc8dHe+Yo5NmI1Q6aCB9aTX20GhJUBGoDxVFhQ8JgU+m0IsvviTZUyC+9FD45IOgqVmhM4qUX4gSiEI21iiFM6bOR3fmzv04Pexz7j33zgRFtGGzzz4f+7/X+q///2whaT3b4hzQCeT4760I3Dy5S4oAkgHovtP/zYlc26IpX4jI3/TwDOpzEKQ0BLOfWQOcPrlLipIArLo3cKJv1vwnKRWGqFYmMwBTQRBBmA4IxHnw9yGFn4nzj68BThuw6M71b/vaFnYzNniJgbM7KY7ehDhGBLz3oUcebx7vDVWPmSXXhqpipqgabsZ8eOBt4plLcKMX+qr5FV0G5HL5TkqFIQbO7mT4xkmq5QkAosgQHyFRhIsinPdoFOHMwHvikiHe48yQiuJUkcogbnAflc7NxH4eQM4BMUC1UqQ4ciMBiPFeMfOohV2bKqaKutCdc6iGUURw4nDiUEq48m2IS4FwwKYrDe8N76MkVcbhfVvZ/flxFi6Yw7MrHqFjXp7C+CTnLw7w9bGriLgAloAnFUCK4pqrKGoCMAv72PTeaob+GGXHriN8tOMAV366xdqepbyx7gmcc0kXJB2ljtIA4iOPj6Ia2WZhBDh49BKnz/9CpQqFQon9X10C4KnHOjMgrpa+WhhpukQEIVSSRFHgINMBfjjXjyZzdcr9HW0A3BsZD/xkQGJx2Ww1gZjhfISaNoBs3PxlKFlTZrfNYGnXAta9vJzRsSL7D11GnUvSFKIQF9ZLUaZE4iKPqaGmAUytVl17Pn2zloLfb42wd+95hkcna1XWEEkzJ6mSvRmRj/CRBV7S8jVDzdiy/SA7P+ul99Q15nfk+WBjN3PbW8Pi+g84AVD1OG+ohpweunx5evs7UL/8uOnRh+vX19ZLm8v6k/mUB8+RK1f/tfVu3bCh7m/U5ZKJRPDeiL1HVXl95cqgbA3KVudwGqzDiZDLGdu3rKZUqvDJ7jMhVRDEmBJPgxiDeILRWQMP77+7iueefqhmhMFSlKVLOgC48dtIo0ZccGgyvLhsJJpUkqommlAOf3eVtT1dvPrSMtrntOK9suThdl55sYvxiRLHT/2aITz4l7gGjTcSb6aIWcPOhkeK7PniHGufX8ymd1bQOjNi7M9Jrl2/y/fnbjJWKId3U32Iq3PSCEJSXRps2yWumgCNT1Q4cuwaR3v7Q86RmlfVBZh6llCVacQIAs6jLQuQyiAq5fBRCiQh1y6zkIjUOAjvhShwnqq1E4tHKNdAJqV0G1ofhYVv4QYVKd9JfqUC4oiTVCBCVRwCIe8JybFzVEVwIlRsLiOzXqPi8rSU+ynxYFF6tsUtQLeM/dgXz1iMlIchLoNkNStT5/XbNBwIMCouT648wES0bA1wJj2ttACr3OiF3tjPa1KsUJ8KTbjTbsKqdxmPlr+QnFYmJHPuavkfzl0TAH8BxxkUVA70HfMAAAAASUVORK5CYII=" alt="Зачеркнутый" style="vertical-align: middle !important" />',
      underline: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4oEk9MHVgAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAD2ElEQVRIx7WWT2xUVRTGf+fPfVOkBbFtQCwaK/VPYkIshhRjQjAajAQXLtGdW7esXJi4MEQSjRsXxrh3qRvFhYWNiBED/iMkitCC4kBKaRvsdOa95+LemXkzUzYYb3Lz3rvz5n7nfN93zrtCGvuOlDVgAqjx30cDuHLymDQApAIws3DxyxO1TTsG/iEid5jxN+g+gyDN67B5z37g1Mlj0pAEsHdx7sTs8NanaN6+TpGvVQAGQRBBWA8IRAOEe5Hbv1OO7NoPnHJgx8Ifx2c3bZ9hpX6WudNHaSxfgbJEBEIIcWaB4IEQHLOAu6d7x8xwN8wc3bAV7n+V8p6d6PKZ2WJk95QDtdrIBM3b15k7fZRb8ycpWqsAZJkjIUOyDM0yNAQsy1B3CIGy6UgIqDuSG2qG5HW0/in5xBuUYQyg5kAJUOQNGkvzCaBkz+4pXnx+moMHprn29yLnL/yJqiKq8SrCozu3Mj46zDffXeLcL39xeX4Ro4m0bpCXTSRt7utZIwTn5/NXuXzlJgcPTHPht2t8+Mlshzp3x915/bVnGB8d5vPjv1IURLpUSQ5ItgLtd1EWnBAyQgjkedlZjxsbZoaZRmrSZnleoqqoSsq06zT6MwlZgCxLosaIAVQE867IpoabdkA0UdieJLe1h3fqgOgkSSDtCSCquDuW1kwNVesBsQpIKVplqw/EHQ0Z5tYDoqoET1lUZhvE+gwhGvdrowxkolnAzTE3zK2riVmibBBEzXroKkWhX5NqJhYyzLXDf8xEugCeNuzXxLogxZ00ATALaPDoHo3XJEon+k7EooO9rXJfHd7uTyB4cMpmhRK1rrvaIBYBeuhKoNLWJK2LDGQihOCUIXQi3lDLAKjVHLfYNtQMFUFVyTLrtJ+i6FqZtvD0FGMsntjooqsem9rGKy/vAmBqcoxnZyYZHxvG1BjdspG9T+9g8sEtALyw72Eemtic2k7s0NVa6dPEEY+t4dL8IvNXl/jsi/OdCNvVvrSyxvfnrvHDT/UeV4koKkKpup4mCdENSbXx3tuH7uqT+P5HZ7uaDAof6VJ33n3rpbsC+ODjc6gKhaxTjCCgARvahuR13nznq1jBohXnSLcJikRqkgbxvbiGBgq/j1ICQqsDsibNG7DxCdh+GK0b0lpIn1IBUcrUKhChEI310HFR1KAQQUXIfZSl4UPkOsJQ6yJNHmjIviPlEDAjKz/OlhseQVq3oGyBVGtWBp+7y/QcCHByHaHWmmM1e3w/8G37tDIE7NXlM1+XYayvYoXuo9CHu24QXtzkn+zJ59JpZVUq566h/+HctQrwL+qE5L+7hUevAAAAAElFTkSuQmCC" alt="Подчеркнутый" style="vertical-align: middle !important" />',
      capsBold: '<img src="data:image/png;base64,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" alt="КАПСБОЛД" style="vertical-align: middle !important" />',
      spoiler: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAZCAYAAACy0zfoAAAAAXNSR0IArs4c6QAAAAZiS0dEAHkAeQB5f3ijhgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw8lGBv14DwAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAC80lEQVRIx8WXwY4bRRCGv7+6auxAHBBECoTNKUECCQkhJLQ5RcudF4A3CFzzDpHyJLwBXNjsKeQQCcUcSZA2OXmjhWSjZZ3xuDnM2B7bycWO7JJaoz50z9dVf1V1i8Zu3ModYAfosJpdBR6xng2Bpwd3NARQC2z3+PEvdzsXriytkLQ0VrV6Pc0ems5BqDyC977ZA+4d3NFQDdj1fw/v7p+/9BXl6RHj6lVrs2U41oFrAc0AQRYQ76PTR+Tel3vAPQeuHP/96/6Fy7u8HPzB4f3bDE+eQs5IEBH1KILwIMJJKVaGc/dmDyelhHsiJcfOXYKPfyC/cw07ebA/7n39qQOdTm+H8vSIw/u3ef7kgPHoDICicBQFKgqsKLAIUlFg7qurKoJcOorA3FGVsJRQNcAGP1Pt/ESOiwAdBzLAuBoyfPGkActEOO5B8sDd8ZTwlEhWj1XNzEgpYWZIwmSYjESJRs+ocokaKH/94ZybN39kU9bv/4mZzbTcfHwxk4pwPIJNmpmQGbJZ5i7BRRFQFPg6mlox1DPPzSqBT2sPdWZqi3BZ1o7qApw7FgXJ08bhJNVhXdRc23NWBJ626LlFzbU9l6IguW0FbvwmzQGkFFg4KW0WTq3+PddNJv0ThIeTy7qtbBRuorkGTlrynIhwcsTG4aalZJIQzBXhuvillMB9K3B1ps7feBY058i9PsUmwyrDJPLCf+fg3NNW4MyEZDPNLSdEHVZzRyb6/f5UC4sDtKa+NLuVNHNJjPWaIgwCC1L3I1QNSBohq68y1nxl8xutc02faKzev/YaFoz9A7ICMZrCvVL5DN79HC5/jw0SGh03V2eBjNy0FiTGsjX8VpcNGvHnpvCaROUf8uL8d1TWozt6TMknQ924lbvArl4+3M/nrqLRc8gjUDt4Wp6vWXU1707AqaxHZ3TIWfHZHvD75PXVBa7byYPfclxcCJta2a230g7edGgf/8N/xRffNq+vM7Xerd01363XgL/e0rv1DOB/3GanONToAzwAAAAASUVORK5CYII=" alt="neutron_spoiler.png" style="vertical-align: middle !important" />',
      source: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKDw4rBeeyy1wAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAEBUlEQVRIx7WWTYhVZRjHf8/He+5YjoUJmo1tKigRIoKYWcQwRbXoAwwXkURIFESDRHVTK23SGh2sUPpAGFoMUZC4bEA3jq4mF0IELlykNLqakcnPaa7347R4zzn33Du6ig48vOecy3l/7/s8//9zXyG7BqtpBegDKvz3qwZcPLlfagBSAvTPnzt6orJi3ZIvROQ2EX+D9jMIUp+Du54YAqZP7peaZICByzMnppavfoz6whyt5s0SYCkEEYRbgUA0QLgbWfiTtPfRIWDagXXz549NrVjbz/XZ35k5tY/atYuQpohACCFGEggeCMExC7h7du+YGe6GmaPLVsO9m0nveBC9dnqq1fv4Qw5UKr191BfmmDm1jysXTtJqLAKQJI6EBEkSNEnQELAkQd0hBNK6IyGg7kjTUDOkOYvO/kKzb5g0rAKoKJACtJo1alcvZICUEAz3gHlctZvhZpjGUFXM4igiqCgqilFHG5cgrceCA34raYTghJBkqXLcHSvCYmSADlgGzxRATtFuFSVdgMnD1bgTd34ef4uJ77dgpqjF9Bwc3VjAVAXJR2lTOiAhCYQkKYo9efhDNr3+LUcmhjF3tgxPAGBquCnf7H2Z9z/9lf0jz5dAWqiNcrpEBCEqSZKkWDnQMVp2b+aoWgbUYswhqWg5W10QdzQkmFsxeQghjh6lChQ1icA4SmkXonG+jprkJsv9kGQ1ee3tH/jx0Bu8+e5PuBmHvnoFgIOjGzEztu85yt5PnmPX2PGudClligxW0/W1y2fPCDA3/Q6tG+cx18Jk0Wjte/O2fE2teK+mhbRblfu5vuYDAJrJug3FThCJTs4lm0HGD2xGs4kOjm7k690vxRWLMvrxs+zZ/nS75ZSyUr603J9ygGftY/zAZoa3HeG7sU2YGdWRyUJdZsauseNxkgwqeU0ySM4qCg9CCE4aQmGuDnVlvsiLraqoaRtSCvLCdzo+msfMIMt/N8TMS5NaNKQuhURlSXsbZXWBYObtIrtTHZnky89eYMfnx1BTvvjoGQB2bxtCVdn53pMA7Ng6UKgqT1tHJxmsputbN86dAWie3Yks/rVk+90hIkvfi2Q1UZpJH/MrtyJAPfRt8HKBzCy2bc266m0gIEWvahsw71lCSzrNWNQEDVjPGqQ5i0kjfpSDJOZaSxPlu2kvSKIJNdDylaQSEBoF5KbUL8Gdj8DaV9FZQxrz2V+pgChp1ioQoSUa/VCoSEhVaYmgIjT9Hq4uf5Gm9tLTOEed+2oyWE17gH65/sdUuuwBpHEF0gZIuY/K0uf2azoOBDhN7aXSmGExeXgI+C0/rfQAA3rt9PE0rOpyrJTUKHRxb7kIb/3NP8mGp7LTyqKUzl09/8O5axHgX8qI7RdwIWtaAAAAAElFTkSuQmCC" alt="neutron_code.png" style="vertical-align: middle !important" />',
      sage: '<img src="data:image/png;base64,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" alt="neutron_sage.png" style="vertical-align: middle !important" />'
   }
}

var i18nRus = {
   mLinkBegin: '[',
   mLinkEnd: ']',
   mLinkSep: ' / ',
   thrdLoading: 'Загрузка треда...',
   sending: 'Отправка...',
   okReloadingNow: 'Ok. Обновляем страницу...',
   no: '№',
   thrd: 'Тред', hidden: 'скрыт', filtered: 'отфильтрован',
   post: 'Пост',
   reply: 'Ответ',
   replyThat: 'Ответить',
   fold: 'Свернуть',
   unfold: 'Развернуть',
   show: 'Показать',
   hide: 'Скрыть',
   hidePost: '&#215;',
   close: 'Закрыть',
   sage: 'Сажа',
   dflt: 'По умолчанию',
   allDefault: 'Восстановить умолчания',
   apply: 'Применить',
   settings: 'Настройки',
   bookmarks: 'Закладки',
   fromBms: 'Из закладок',
   toBms: 'В закладки',
   imgs: {
      fold: 'Свернуть изображения',
      unfold: 'Развернуть изображения'
   },
   imgLess: {
      hide: 'Убрать сообщения без изображений', 
      show: 'Показать сообщения без изображений'
   },
   citeLess : {
      hide: 'Убрать сообщения без ответов', 
      show: 'Показать сообщения без ответов'
   },
   btns: {}
}

i18n = i18nRus/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+="

function b64encode (input) {
   var output = "";
   var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
   var i = 0;

   input = _utf8_encode(input);

   while (i < input.length) {

      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
         enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
         enc4 = 64;
      }

      output = output +
         _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
         _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

   }

   return output;
}

function b64decode (input) {
   var output = "";
   var chr1, chr2, chr3;
   var enc1, enc2, enc3, enc4;
   var i = 0;

   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

   while (i < input.length) {

      enc1 = _keyStr.indexOf(input.charAt(i++));
      enc2 = _keyStr.indexOf(input.charAt(i++));
      enc3 = _keyStr.indexOf(input.charAt(i++));
      enc4 = _keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
         output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
         output = output + String.fromCharCode(chr3);
      }

   }

   output = _utf8_decode(output);

   return output;

}

function _utf8_encode (string) {
   string = string.replace(/\r\n/g,"\n");
   var utftext = "";

   for (var n = 0; n < string.length; n++) {

      var c = string.charCodeAt(n);

      if (c < 128) {
         utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
         utftext += String.fromCharCode((c >> 6) | 192);
         utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
         utftext += String.fromCharCode((c >> 12) | 224);
         utftext += String.fromCharCode(((c >> 6) & 63) | 128);
         utftext += String.fromCharCode((c & 63) | 128);
      }

   }

   return utftext;
}

// private method for UTF-8 decoding
function _utf8_decode (utftext) {
   var string = "";
   var i = 0;
   var c = c1 = c2 = 0;

   while ( i < utftext.length ) {

      c = utftext.charCodeAt(i);

      if (c < 128) {
         string += String.fromCharCode(c);
         i++;
      }
      else if((c > 191) && (c < 224)) {
         c2 = utftext.charCodeAt(i+1);
         string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
         i += 2;
      }
      else {
         c2 = utftext.charCodeAt(i+1);
         c3 = utftext.charCodeAt(i+2);
         string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
         i += 3;
      }
   }
   return string;
}/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}return;o.support.scriptEval=false;if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};/*
 * jQuery Form Plugin
 * version: 2.33 (22-SEP-2009)
 * @requires jQuery v1.2.6 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,

	$(document).ready(function() {
		$('#myForm').bind('submit', function() {
			$(this).ajaxSubmit({
				target: '#output'
			});
			return false; // <-- important!
		});
	});

	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,

	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});

	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}

	if (typeof options == 'function')
		options = { success: options };

	var url = $.trim(this.attr('action'));
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
   	}
   	url = url || window.location.href || '';

	options = $.extend({
		url:  url,
		type: this.attr('method') || 'GET'
	}, options || {});

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		for (var n in options.data) {
		  if(options.data[n] instanceof Array) {
			for (var k in options.data[n])
			  a.push( { name: n, value: options.data[n][k] } );
		  }
		  else
			 a.push( { name: n, value: options.data[n] } );
		}
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a);

	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else
		options.data = q; // data is the query string for 'post'

	var $form = this, callbacks = [];
	if (options.resetForm) callbacks.push(function() { $form.resetForm(); });
	if (options.clearForm) callbacks.push(function() { $form.clearForm(); });

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			$(options.target).html(data).each(oldSuccess, arguments);
		});
	}
	else if (options.success)
		callbacks.push(options.success);

	options.success = function(data, status) {
		for (var i=0, max=callbacks.length; i < max; i++)
			callbacks[i].apply(options, [data, status, $form]);
	};

	// are there files to upload?
	var files = $('input:file', this).fieldValue();
	var found = false;
	for (var j=0; j < files.length; j++)
		if (files[j])
			found = true;

	var multipart = false;
//	var mp = 'multipart/form-data';
//	multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	// options.iframe allows user to force iframe mode
   if (options.iframe || found || multipart) {
	   // hack to fix Safari hang (thanks to Tim Molendijk for this)
	   // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	   if (options.closeKeepAlive)
		   $.get(options.closeKeepAlive, fileUpload);
	   else
		   fileUpload();
	   }
   else
	   $.ajax(options);

	// fire 'notify' event
	this.trigger('form-submit-notify', [this, options]);
	return this;


	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUpload() {
		var form = $form[0];

		if ($(':input[name=submit]', form).length) {
			alert('Error: Form elements must not be named "submit".');
			return;
		}

		var opts = $.extend({}, $.ajaxSettings, options);
		var s = $.extend(true, {}, $.extend(true, {}, $.ajaxSettings), opts);

		var id = 'jqFormIO' + (new Date().getTime());
		var $io = $('<iframe id="' + id + '" name="' + id + '" src="about:blank" />');
		var io = $io[0];

		$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

		var xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function() {
				this.aborted = 1;
				$io.attr('src','about:blank'); // abort op in progress
			}
		};

		var g = opts.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) $.event.trigger("ajaxStart");
		if (g) $.event.trigger("ajaxSend", [xhr, opts]);

		if (s.beforeSend && s.beforeSend(xhr, s) === false) {
			s.global && $.active--;
			return;
		}
		if (xhr.aborted)
			return;

		var cbInvoked = 0;
		var timedOut = 0;

		// add submitting element to data if we know it
		var sub = form.clk;
		if (sub) {
			var n = sub.name;
			if (n && !sub.disabled) {
				options.extraData = options.extraData || {};
				options.extraData[n] = sub.value;
				if (sub.type == "image") {
					options.extraData[name+'.x'] = form.clk_x;
					options.extraData[name+'.y'] = form.clk_y;
				}
			}
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		setTimeout(function() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST')
				form.setAttribute('method', 'POST');
			if (form.getAttribute('action') != opts.url)
				form.setAttribute('action', opts.url);

			// ie borks in some cases when setting encoding
			if (! options.skipEncodingOverride) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (opts.timeout)
				setTimeout(function() { timedOut = true; cb(); }, opts.timeout);

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (options.extraData)
					for (var n in options.extraData)
						extraInputs.push(
							$('<input type="hidden" name="'+n+'" value="'+options.extraData[n]+'" />')
								.appendTo(form)[0]);

				// add iframe to doc and submit the form
				$io.appendTo('body');
				io.attachEvent ? io.attachEvent('onload', cb) : io.addEventListener('load', cb, false);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				t ? form.setAttribute('target', t) : $form.removeAttr('target');
				$(extraInputs).remove();
			}
		}, 10);

		var domCheckCount = 50;

		function cb() {
			if (cbInvoked++) return;

			io.detachEvent ? io.detachEvent('onload', cb) : io.removeEventListener('load', cb, false);

			var ok = true;
			try {
				if (timedOut) throw 'timeout';
				// extract the server response from the iframe
				var data, doc;

				doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
				
				var isXml = opts.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && (doc.body == null || doc.body.innerHTML == '')) {
				 	if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
						cbInvoked = 0;
						setTimeout(cb, 100);
						return;
					}
					log('Could not access iframe DOM after 50 tries.');
					return;
				}

				xhr.responseText = doc.body ? doc.body.innerHTML : null;
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': opts.dataType};
					return headers[header];
				};

				if (opts.dataType == 'json' || opts.dataType == 'script') {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta)
						xhr.responseText = ta.value;
					else {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						if (pre)
							xhr.responseText = pre.innerHTML;
					}			  
				}
				else if (opts.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}
				data = $.httpData(xhr, opts.dataType);
			}
			catch(e){
				ok = false;
				$.handleError(opts, xhr, 'error', e);
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (ok) {
				opts.success(data, 'success');
				if (g) $.event.trigger("ajaxSuccess", [xhr, opts]);
			}
			if (g) $.event.trigger("ajaxComplete", [xhr, opts]);
			if (g && ! --$.active) $.event.trigger("ajaxStop");
			if (opts.complete) opts.complete(xhr, ok ? 'success' : 'error');

			// clean up
			setTimeout(function() {
				$io.remove();
				xhr.responseXML = null;
			}, 100);
		};

		function toXml(s, doc) {
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
		};
	};
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	return this.ajaxFormUnbind().bind('submit.form-plugin', function() {
		$(this).ajaxSubmit(options);
		return false;
	}).bind('click.form-plugin', function(e) {
		var $el = $(e.target);
		if (!($el.is(":submit,input:image"))) {
			return;
		}
		var form = this;
		form.clk = e.target;
		if (e.target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - e.target.offsetLeft;
				form.clk_y = e.pageY - e.target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 10);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length == 0) return a;

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) return a;
	for(var i=0, max=els.length; i < max; i++) {
		var el = els[i];
		var n = el.name;
		if (!n) continue;

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		var v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(var j=0, jmax=v.length; j < jmax; j++)
				a.push({name: n, value: v[j]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: n, value: v});
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0], n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) return;
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++)
				a.push({name: n, value: v[i]});
		}
		else if (v !== null && typeof v != 'undefined')
			a.push({name: this.name, value: v});
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length))
			continue;
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (typeof successful == 'undefined') successful = true;

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1))
			return null;

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) return null;
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				if (one) return v;
				a.push(v);
			}
		}
		return a;
	}
	return el.value;
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
	return this.each(function() {
		$('input,select,textarea', this).clearFields();
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (t == 'text' || t == 'password' || tag == 'textarea')
			this.value = '';
		else if (t == 'checkbox' || t == 'radio')
			this.checked = false;
		else if (tag == 'select')
			this.selectedIndex = -1;
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType))
			this.reset();
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b == undefined) b = true;
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select == undefined) select = true;
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio')
			this.checked = select;
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
	if ($.fn.ajaxSubmit.debug && window.console && window.console.log)
		window.console.log('[jquery.form] ' + Array.prototype.join.call(arguments,''));
};

})(jQuery);

(function($){function toIntegersAtLease(n)
{return n<10?'0'+n:n;}
Date.prototype.toJSON=function(date)
{return this.getUTCFullYear()+'-'+
toIntegersAtLease(this.getUTCMonth())+'-'+
toIntegersAtLease(this.getUTCDate());};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;var meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};$.quoteString=function(string)
{if(escapeable.test(string))
{return'"'+string.replace(escapeable,function(a)
{var c=meta[a];if(typeof c==='string'){return c;}
c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
return'"'+string+'"';};$.toJSON=function(o,compact)
{var type=typeof(o);if(type=="undefined")
return"undefined";else if(type=="number"||type=="boolean")
return o+"";else if(o===null)
return"null";if(type=="string")
{return $.quoteString(o);}
if(type=="object"&&typeof o.toJSON=="function")
return o.toJSON(compact);if(type!="function"&&typeof(o.length)=="number")
{var ret=[];for(var i=0;i<o.length;i++){ret.push($.toJSON(o[i],compact));}
if(compact)
return"["+ret.join(",")+"]";else
return"["+ret.join(", ")+"]";}
if(type=="function"){throw new TypeError("Unable to convert object of type 'function' to json.");}
var ret=[];for(var k in o){var name;type=typeof(k);if(type=="number")
name='"'+k+'"';else if(type=="string")
name=$.quoteString(k);else
continue;var val=$.toJSON(o[k],compact);if(typeof(val)!="string"){continue;}
if(compact)
ret.push(name+":"+val);else
ret.push(name+": "+val);}
return"{"+ret.join(", ")+"}";};$.compactJSON=function(o)
{return $.toJSON(o,true);};$.evalJSON=function(src)
{return eval("("+src+")");};$.secureEvalJSON=function(src)
{var filtered=src;filtered=filtered.replace(/\\["\\\/bfnrtu]/g,'@');filtered=filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']');filtered=filtered.replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered))
return eval("("+src+")");else
throw new SyntaxError("Error parsing JSON, source is not valid.");};})(jQuery);/**/

function _cake (name, val) {
   if (typeof val == 'undefined') {
      return b64decode($.cookie(name))
   } else if (val == null) {
      $.cookie(name, '', {expires: -1})
   } else {
      $.cookie(name, b64encode(val), {path: '/', expires: 9000})
   }
}

/* TO RM: This is a nasty hack so should be removed as soon
   as opera will began support localStorage 
if (window.opera) {
   var neverDomain = 'http://BAAD.F00D/';
   if (location.href == neverDomain) {
      document.addEventListener('message', function(evt) {
         var a = msg.data.split('|');
         switch (a[0]) {
         case 'get': evt.source.postMessage(getCookie(a[1]));
         case 'set': setCookie(a[1]);
         case 'del': delCookie(a[1]);
         }
      }, true);
   } else {
      $.bind('message', function (e) {
	 
      })
      document.addEventListener('message', function(evt) {
         alert('got value: '+evt.data);
      });

      document.addEventListener('DOMContentLoaded', function() {
         var iframe = document.createElement('iframe');
         iframe.style.display = 'none';
         iframe.onload = function() {
            iframe.contentWindow.postMessage('set|name|value');
            iframe.contentWindow.postMessage('get|name');
         }
         iframe.src = 'http://0.0.0.0/';
         document.documentElement.appendChild(iframe);
      }, true);
   }
}
 End of nasty hack */

function io(name, val) {
   try {
      var storage = typeof localStorage === 'object' ? localStorage : globalStorage[location.hostname]
   } catch (err) { /* Worst case: use cakes */
      return _cake(name, val)
   }
   if (typeof val == 'undefined') {
      return storage.getItem(name)
   } else if (val == null) {
      storage.removeItem(name)
   } else {
      storage.setItem(name, val)
   }
}

/*
 * vim: ts=3 sts=3 cindent expandtab
 * jquery.imgboard - jquery extensions for imageboards.
 *
 * Copyright (c) 2009, anonymous
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the anonymous nor the names of its contributors
 *       may be used to endorse or promote products derived from this
 *       software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY anonymous ''AS IS'' AND ANY  EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL anonymous BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* */
/*@ http://www.mail-archive.com/jquery-en@googlegroups.com/msg16487.html */
function addStyle( css ) {
   var style = document.createElement( 'style' );
   style.type = 'text/css';
   var head = document.getElementsByTagName('head')[0];
   head.appendChild( style );
   if( style.styleSheet )  // IE
      style.styleSheet.cssText = css;
   else  // other browsers
      style.appendChild( document.createTextNode(css) );
   return style;
}

/* Some useful stuff */
jQuery.fn.extend({
   /* Finds element parent which has class passed in argument. */
   findc:
   function(cls) {
      return $(this).is(cls) ? $(this) : $(this).parents(cls)
   }
})

/* */
/*
  For localization to your language simply replace this table.
 */
var xlatb =
   {й: 'q', ц: 'w', у: 'e', к: 'r', е: 't', н: 'y', г: 'u',
    ш: 'i', щ: 'o', з: 'p', ф: 'a', ы: 's', в: 'd', а: 'f',
    п: 'g', р: 'h', о: 'j', л: 'k', д: 'l', я: 'z', ч: 'x',
    с: 'c', м: 'v', и: 'b', т: 'n', ь: 'm'
   }

var blatx =
   {q: 'й', w: 'ц', e: 'у', r: 'к', t: 'е', y: 'н', u: 'г',
    i: 'ш', o: 'щ', p: 'з', '[': 'х', ']': 'ъ', a: 'ф',
    s: 'ы', d: 'в', f: 'а', g: 'п', h: 'р', j: 'о', k: 'л',
    l: 'д', ';': 'ж', '\'': 'э', z: 'я', x: 'ч', c: 'с',
    v: 'м', b: 'и', n: 'т', m: 'ь', ',': 'б', '.': 'ю'}

/* State machine here - walks through siblings and add it to
   specific IOM element.

   All posts on 2-ch except of oppost fold into <td> tag. So
   it isn't need to fold it into anything. Simply find this
   <td> and apply our id.

   Now function destructive - it's overrides native id's of
   elements.
*/

iom = {
   tid: '.penThread',
   pid: '.penPost',
   post: {
      anchor: 'a[name]',
      image: 'a img',
      imageinfo: 'span.filesize',
      abbr: 'div.abbrev',
      abbrlink: 'div.abbrev a',
      wholemessage: 'blockquote',
      backrefs: 'blockquote.penRefs a',
      message: 'blockquote:not(.penRefs):first',
      ref: 'span.reflink',
      reflink: 'span.reflink a:first',
      title: 'span.replytitle, span.filetitle',
      poster: 'span.commentpostername, span.postername',
      email: 'span.commentpostername a, span.postername a'
   },
   thread: {
      header: 'div.theader',
      ref: 'span.reflink:first',
      reflink: 'span.reflink:first a',
      message: 'blockquote:not(.penRefs):first',
      moar: 'span.omittedposts',
      title: 'span.filetitle',
      eot: '.penPost:last'
   },
   form: {
      user: 'input[name=akane]',
      email: 'input[name=nabiki]',
      title: 'input[name=kasumi]',
      message: 'textarea[name=shampoo]',
      file: 'input[name=file]',
      turtest: 'input[name=captcha]',
      turimage: '#imgcaptcha',
      password: 'input[name=password]',
      parent: 'input[name=parent]',
      submit: 'input[type=submit]',
      status: 'i:first'
   },
   anchors: 'blockquote a[onclick]',
   menu: 'div.adminbar:first a:last',
   options: '#penOptions',
   postform: '#postform',
   unfoldImgCss: 'border: 2px dashed #EE6600;',
   strings: {
      bookmarks: 'Два.ч &#8212; Закладки',
      settings: 'Два.ч &#8212; Настройки',
   }
}

function dvach (onload) {
   function parse (cloned) {
      var opPost = $('<span></span>');
      var currThread = $('<span></span>');
      cloned.contents().each(
         function () {
            var subj = $(this)
            if (subj.is('table')) {
               if (opPost) {
                  currThread.append(opPost);
                  opPost = false;
               }
               subj.attr('id', 'p' + subj.find('a[name]').attr('name'));
               subj.addClass('penPost');
            }
            if(opPost) {
               opPost.append(subj);
               if(subj.is('a') && subj.attr('name')) {
                  currThread.attr('id', 't'+subj.attr('name'));
                  currThread.addClass('penThread');
                  opPost.attr('id', 'p'+subj.attr('name'));
                  opPost.addClass('penPost');
               }
            } else if (currThread) {
               currThread.append(this);
            }
            if ($(this).is('hr')) {
               if (opPost) {
                  currThread.append(opPost);
               }
               cloned.append(currThread);
               opPost = $('<span/>');
               currThread = $('<span/>');
            }
         }
      );
      cloned.append(currThread);
   }

   function process(cloned) {
      cloned.find(iom.anchors).each(
         function () {
            var subj = $(this)
            var a = subj.attr('href').split('#')
            var refurl = a[0]
            var refid = a[1]
            if (!refid) {
               // Op post workaround
               refid = subj.attr('href').split('.')[0].split('/').reverse()[0]
            }
            var pid = 'p' + refid
            var spid = subj.findc(iom.pid).attr('id')
            subj.attr('refid', pid)
            subj.attr('refurl', refurl)
            if(!$.references[pid]) {
               $.references[pid] = []
            }
            $.references[pid][spid]=spid
         })
      cloned.find(iom.thread.moar).each(
         function () {
            $(this).html($(this).text().split('.')[0]+'. ')
         })
      cloned.find(iom.post.image).each(
         function () {
            var subj = $(this)
            var altsrc = subj.a().attr('href')
            var w = subj.attr('width')
            var h = subj.attr('height')
            subj.attr('altsrc', altsrc)
            subj.attr('style','height: '+h+'px; width:'+w+'px;')
            subj.attr('altstyle', iom.unfoldImgCss+'min-height: '+h+'px; min-width: '+w+'px;')
            subj.removeAttr('height')
            subj.removeAttr('width')
         }
      )
   }

   jQuery.fn.extend({
      tuneForm:
      function () {
         $(this).find('div.rules').remove()
         return $(this)
      },
      tuneForThread:
      function (tid) {
         var tnum = tid.replace('t','')
         var form = $(this)
         var lnum = $('#' + tid + ' ' + iom.thread.eot).findc(iom.pid).attr('id').replace('p','')
         /* Reserved: manually switch to thread gb2

         form.find('input[name=gb2][value=board]').removeAttr('checked')
         form.find('input[name=gb2][value=thread]').attr('checked','checked') */
         form.tuneForm()
         form.prepend('<input type="hidden" name="parent" value="' + tnum + '" />')
         var turingTest = form.find(iom.form.turimage)
         
	 if (turingTest.length == 0) {
	    turingTest = $('<img alt="обновить" src="/' + db.global.board + '/captcha.pl?key=mainpage&amp;dummy=" onclick="update_captcha(this)" id="imgcaptcha" />')
	    turingTest.focus(function () { return false; })
            form.find(iom.form.turtest).
               after(turingTest)
         }

         turingTest.attr(
            'src',
            turingTest.attr('src').
               replace(/key=\S*&/, "key=res" + tnum + "&").
               replace(/dummy=\S*/, "dummy=" + lnum)
         )
         turingTest.click()
         return form
      },
      ajaxThread:
      function (url, f) {
         var e = $('<span/>')
         e.load(
            'http://'+location.host + url + ' #delform',
            {},
            function (a,b,c) {
               if (b != 'success') {
                  return
               }
               var cloned = $(e).find('#delform')
               parse(cloned)
               process(cloned)
               f(cloned)
            })
      }
   });

   jQuery.extend({
      turl: function (tid) {
         return '/' + db.global.board + '/res/'+tid.replace(/\D/g, '')+'.html'
      }
   });

   jQuery.xlatb = xlatb;
   jQuery.references = [];
   jQuery.bookmarks = [];

   jQuery.ui = {
      anchor :
      function(pid) {
         var pnum = pid.replace('p','')
         return '<a href="#'+pnum+'" refid="'+pid+'" onclick="highlight('+pnum+')">&gt;&gt;'+pnum+'</a>'
      },
      refs :
      function (content) {
         return '<blockquote class="penRefs"><small>Ссылки '+content+'.</small></blockquote>'
      },
      preview :
      function (idobj, x, y) {
         if (typeof idobj == 'string') {
            var obj = $('#'+idobj).clone(true)
         } else {
            var obj = idobj
         }
	 obj.find('a[name]').removeAttr('name')
         obj.addClass(db.cfg.hlPrevs ? 'highlight' : 'reply')
         obj.attr('style','position:absolute; top:' + y +
                  'px; left:' + x + 'px;display:block;')
         return obj
      },
      threadCite:
      function (id, len) {
         var subj = $('#' + id)
         var topic = subj.find(iom.thread.title).text()
         return ((topic ? topic + '//' : '') +
                 subj.find(iom.thread.message).text()).
            slice(0, len)
      },
      loadTizer: function (x, y, id) {
         return $('<div style="position:absolute;top:' + y +
                  'px;left:' + x + 'px;z-index:99;background-color:maroon;color:white;padding:2px;font-weight:bold;" id="itiz' + id + '">Загрузка...</div>')
      },
      multiLink :
      function(handlers, begin, end, sep, cssClass) {
         begin = begin != null ? begin : '['
         end =  end != null ? end : ']'
         sep =  sep != null ? sep : ' / '
         var ancs = []
         for(var i = 0; i < handlers.length; i++)
            if (typeof handlers[i][1] == 'string') {
               ancs.push('<a href="' + handlers[i][1] + '">'+handlers[i][0]+'</a>')
            } else {
               ancs.push('<a href="javascript:">'+handlers[i][0]+'</a>')
            }
         var j = 0
         var res = $('<span class="' + (cssClass ? cssClass : 'penMl') + '">'
                     + begin + ancs.join(sep) + end + '</span>')
         var lastA = false
         res.find('a').each(
            function () {
               var subj = $(this)
               if (subj.attr('href') == 'javascript:') {
                  subj.click(handlers[j][1])
               }
               if(!lastA)
                  subj.addClass('first')
               lastA = subj
               j++
            })
         lastA.addClass('last')
         return res
      },
      tizer :
      function (id, body, hasHr) {
         return $("<div id=\'tiz" + id + "\' style='display:none;' />").
            append(body).
            append(hasHr ? "<br clear='both' /><hr />" : "")
      },
      window:
      function (id, title, menu) {
         var div = $('<div id="' + id + '" style="display:none"></div>').
            append($('<h1 style="float:left;margin:0;padding:0;" class="logo">' + title + '</h1>')).
            append(menu.css('float', 'right')).
            append('<br clear="borh" /><br />')
         $('body').prepend(div)
         return div
      },
      bookmark:
      function (url, cite, date) {
         return $('<div class="penDesc"> /' + url.replace(/.*?(\w+).*/, '$1') +
                  '/ <a class="penBmLink" href="' + url + '">' +
                  url.replace(/.*?(\d+).*/, '$1') + '</a> ' + cite + '</div>').
            prepend(
               $.ui.multiLink([
                  ['x',
                   function (evt) {
                      var subj = $(evt.target).parents('div:first')
                      delete db.bookmarks[subj.find('a.penBmLink').attr('href')]
                      db.saveBookmarks ()
                      subj.remove()
                   }]
               ])
            )
      }
   }

   return function (obj, f, aft) {
      var css = '#penSetttings {padding: 8px} #penSettings .right {float: right} #penSettings span {height: 32px} #penSettings input, #penSettings select {margin-left: 8px; margin-right: 8px} .penLevel1, .penLevel2 {display: block} .penSetting {height: 24px;} .penLevel1 {font-size: 16pt; font-weight: bold;} .penLevel2 {padding-left: 2em;}  .penLevel3 {padding-left: 4em;}'

      onload()

      var threadsRaw = obj.find('#delform');
      var cloned = threadsRaw.clone()

      parse(cloned);
      process(cloned);
      $('body').append('<div id="cache" style="display:none" />')
      addStyle(css)
      f(cloned)
      threadsRaw.replaceWith(cloned);
      aft()
   };
}/* end of 2ch */

jQuery.fn.extend({
   a: function () {
      return $(this).parents('a:first');
   },
   ok: function(db, env, msg, aft) {
      /* Защита от повторного вызова скрипта. */
      if($('#cache').length > 0)
	 return
      
      if (typeof GM_setValue != "undefined") {
         /* we are under firefox's greasemonkey */
         document = unsafeWindow.document
         var converge = dvach(function() { env(db, $(unsafeWindow.document)) })
         converge($(unsafeWindow.document), msg, aft)
      } else {
         this.ready(
            function () {
               var subj = $(this)
               var converge = dvach(function() { env(db, subj) })
               converge(subj, msg, aft)
            }
         )
      }
   }
})/*
 * vim: ts=3 sts=3 cindent expandtab
 * settings.js - penochka preferences system.
 *
 * Copyright (c) 2009, anonymous
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the anonymous nor the names of its contributors
 *       may be used to endorse or promote products derived from this
 *       software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY anonymous ''AS IS'' AND ANY  EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL anonymous BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var db = {
   ready: false,
   cfg: {},
   dflt: {},
   name: {},
   combos: {},
   roots: [],
   children: {},
   hidden: {},
   filtered: {},
   bookmarks: {},
   global: {
      domain: '',
      board: '',
      time: {}
   },
   s : function (id, title, parent, defval, description, examples) {
      if (typeof defval == 'object') {
         this.combos[id] = defval
         for(var i in defval) {
            this.cfg[id] = defval[i]
            this.dflt[id] = defval[i]
            break
         }
      } else if (typeof defval != 'undefined') {
         this.cfg[id] = defval
         this.dflt[id] = defval
      }
      this.name[id] = title
      if (parent) {
         if (!this.children[parent]) {
            this.children[parent] = []
         }
         this.children[parent].push(id)
      } else {
         this.roots.push(id)
      }
   },
   init : function () {
      /* Группы настроек */
      this.s ('feats', 'Возможности');
      this.s ('form',  'Форма ответа');
      this.s ('sage',  'Сажа');
      this.s ('cens',  'Фильтрация');
      this.s ('view',  'Оформление');
      this.s ('sys',   'Системные');
      this.s ('ftune', 'Тонкие настройки');

      /* Теперь сами настройки */
      this.s ('hide', 'Скрытие', 'feats');
      this.s ('thrdHide', 'Потоков', 'hide', true);
      this.s ('pstsHide', 'Сообщений', 'hide', true);
      this.s ('iSense', 'Превью цитируемых (>>) сообщений', 'feats', true);
      this.s ('fwdRefs', 'Обратные ссылки', 'feats', true);
      this.s ('imgsUnfold', 'Развертывание картинок', 'feats', true);
      this.s ('thrdUnfold', 'Развертывание тредов', 'feats', true);
      this.s ('thrdMenu', 'Меню треда', 'feats', true);
      this.s ('constPwd', 'Постоянный пароль на удаление', 'feats', '')
      this.s ('bmarks', 'Закладки', 'feats', true)

      this.s ('fastReply', 'Быстрый ответ', 'form', true);
      this.s ('thrdMove', 'Переносить вниз, находясь в треде', 'form', true);
      this.s ('idxHide', 'Скрывать, находясь на главной', 'form', false);
      this.s ('sageBtn', 'Кнопка сажи', 'form', true);
      this.s ('fmtBtns', 'Кнопки форматирования', 'form', true);
      this.s ('tripleTt', 'Троировать капчу', 'form', true);

      this.s ('sageMan', 'Я &#8212; человек-<b>САЖА</b>', 'sage', false);
      this.s ('sageInAllFields', 'Сажа идет во все поля', 'sage', false);

      this.s ('compact', 'Компактное отображение', 'view', true);
      this.s ('theme', 'Тема', 'view', {photon: 'Фотон', neutron: 'Нейтрон'});
      this.s ('ntheme', 'Ночная тема', 'view', {photon: 'Фотон', neutron: 'Нейтрон'});
      this.s ('btnsStyle', 'Стиль кнопок форматирования', 'view', {css: 'Графические', text: 'Текстовые'});
      this.s ('hlPrevs', 'Подсвечивать превью ярче', 'view', true);

      this.s ('censTitle', 'Заглавие', 'cens', '');
      this.s ('censUser', 'Имя пользователя', 'cens', '');
      this.s ('censMail', 'E-mail (sage)', 'cens', '');
      this.s ('censMsg', 'Текст сообщения', 'cens', '');
      this.s ('censTotal', 'Любое место сообщения', 'cens', '');

      this.s ('useAJAX', 'Использовать асинхронный яваскрипт', 'sys', true);

      this.s ('hidePure', 'Скрывать без следа', 'ftune', false);
      this.s ('censPure', 'Скрывать отфильтрованное без следа', 'ftune', true);
      this.s ('fitImgs', 'При развертывании подгонять картинки по ширине', 'ftune', true);
      this.s ('citeInTitle',
              'Показывать цитату из треда в заголовке страницы (&lt;title&gt;)',
              'ftune', true);
      this.s ('hideCiteLen', 'Размер цитаты скрытых объектов', 'ftune', 55);
      this.s ('ttlCiteLen', 'Размер цитаты в заголовке', 'ftune', 55);
      this.s ('bmCiteLen', 'Размер цитаты в закладках', 'ftune', 55);
      this.s ('delay', 'Замедление в создании превью', 'ftune');
      this.s ('iSenseUp', 'На притяжение', 'delay', 0);
      this.s ('iSenseDn', 'На отпадание',  'delay', 200);
      this.s ('bmAutoAdd', 'Автоматически добавлять тред в закладки при ответе',  'ftune', true);
      this.s ('nightTime', 'Ночной интервал', 'ftune', '22:00-8:00');
      this.s ('overrideF5', 'Перегружать только активный фрейм по F5', 'ftune', true);

      this.global.domain = window.location.hostname
      this.global.board = window.location.pathname.replace(/^\/(\w+)\/.*$/, '$1')
      this.global.time = new Date()
      this.ready = true;
   },
   load : function (obj, name) {
      if (!this.ready) {
         this.init()
      }
      var raw = []
      try {
         raw = io(name).replace(/\0/,'').split('|')
      } catch (err) { raw = [] }
      /* TODO: Unescape this */
      for (var i = 0; i < raw.length; i+=2) {
         if (raw[i + 1]) {
            if (raw[i + 1] == 'false') {
               obj[raw[i]] = false
            } else {
               obj[raw[i]] = raw[i + 1]
            }
         }
      }
   },
   save : function (obj, name) {
      var raw = [];
      /* TODO: Escape this */
      for (i in obj) {
         raw.push(i)
         raw.push(obj[i])
      }
      if (raw) {
         io(name, raw.join('|'))
      } else {
         io(name, null)
      }
   },
   loadCfg : function () {
      this.load(this.cfg, 'penCfg')
      for (var i in this.cfg) {
         if (typeof this.dflt[i] == 'number') {
            this.cfg[i] = this.cfg[i] * 1
         }
      }
   },
   saveCfg : function () {
      var delta = {};
      for (var i in this.cfg) {
         if (this.cfg[i] != this.dflt[i]) {
            delta[i]=this.cfg[i]
         }
      }
      this.save(delta, 'penCfg')
   },
   loadHidden : function () {
      this.load(this.hidden, 'penHidden'+this.global.board)
   },
   saveHidden : function (board) {
      this.save(this.hidden, 'penHidden'+this.global.board)
   },
   loadBookmarks : function (board) {
      var raw = []
      this.load(raw, 'penBookmarks')
      for(i in raw) {
         var tc = raw[i].split('#')
         this.bookmarks[i] = {
            timestamp : tc.shift(),
            cite : tc.join('#')
         }
      }
   },
   saveBookmarks : function (board) {
      var raw = []
      for (var i in this.bookmarks) {
         raw[i] = this.bookmarks[i].timestamp + '#' + this.bookmarks[i].cite
      }
      this.save(raw, 'penBookmarks')
   }
}/*
 * vim: ts=3 sts=3 cindent expandtab
 *
 * penochka - Various extensions for imageboards,
 *            which powered by jquery.
 *
 * Copyright (c) 2009, anonymous
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the anonymous nor the names of its contributors
 *       may be used to endorse or promote products derived from this
 *       software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY anonymous ''AS IS'' AND ANY  EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL anonymous BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 * NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

jQuery.fn.swap = function(b){
   b = jQuery(b)[0];
   var a = this[0];
   var t = a.parentNode.insertBefore(document.createTextNode(''), a);
   b.parentNode.insertBefore(a, b);
   t.parentNode.insertBefore(b, t);
   t.parentNode.removeChild(t);
   return this;
};

/* Penochka application function variable */
var apply_me = {}

/* */
function showReplyForm(id, cite, parent, hideHide, needHr) {
   if(!id)
      return
   var subj = $(iom.postform+id)
   if(subj.attr('id')) {
      subj.show()
      if (cite) {
         var msg = subj.find(iom.form.message)
         msg.val(msg.val() + cite)
         msg[0].focus()
      }
      return
   } else {
      var subj = $(iom.postform).clone(true).tuneForThread(id);
      subj.attr('id', 'postform' + id);
      if (!hideHide)
         subj.prepend(
            $('<div style="float:right">').
               append(
                  $.ui.multiLink([
                     ['Скрыть',
                      function() { $(iom.postform + id).hide() }]
                  ])))
      if (needHr)
	 subj.prepend('<hr />')
      if (!parent)
         parent = $('#'+ id + ' ' + iom.thread.eot)
      parent.after(subj)
      showReplyForm(id, cite)
   }
}

/* */
function cacheThread(idurl, cb) {
   if (idurl.search(/\//) == -1) {
      var o = $('#'+idurl)
      var moar = o.find(iom.thread.moar)
      var load = $('<span class="penLoadMoar">' + i18n.thrdLoading + '</span>')
      moar.hide().after(load)
      var url = o.find(iom.post.reflink).attr('href').split('#')[0]
   } else {
      var url = idurl
   }
   $.fn.ajaxThread(
      url,
      function(e) {
         e.find(iom.thread.reflink).attr('href', url)
         apply_me(e, true)
         var ue = e.find(iom.tid)
         var id = ue.attr('id')
         ue.appendTo('#cache')
         ue.attr('id', 'fold'+id)
         if (moar) {
            moar.show()
            o.find('span.penLoadMoar').remove()
         }
         if (cb)
            cb()
      })
}

function toggleThread(id, useAjax) {
   var swapid =
      function (o1, o2) {
         var t = o1.attr('id')
         o1.attr('id', o2.attr('id'))
         o2.attr('id', t)
      }
   if(($('#fold'+id).length == 0)) {
      if (useAjax)
         cacheThread(id, function () { toggleThread(id, false) })
   } else {
      $('#'+id).swap('#fold'+id)
      swapid($('#'+id), $('#fold'+id))
   }
}

/* */
function toggleVisible(id) {
   $('#'+id).toggle()
   $('#tiz'+id).toggle()
   if (db.hidden[id]) {
      delete db.hidden[id]
   } else {
      db.hidden[id] = 1;
   }
   db.saveHidden()
}

/* */
function swapAttr(obj, a1, a2) {
   var t = obj.attr(a1)
   obj.attr(a1, obj.attr(a2))
   obj.attr(a2, t)
}

function refold(id) {
   var subj = $('#' + id + ' ' + iom.post.image)
   swapAttr(subj, 'style', 'altstyle')
   swapAttr(subj, 'src', 'altsrc')
   if (db.cfg.fitImgs) {
      subj.css('max-width', $(window).width() - 64 + 'px')
   }
   return false
}

/* */
function apply_isense(a) {
   if(!db.cfg.iSense) {
      return
   }
   a.hover(
      function(evt) { // over
         intelli(
            evt.pageX+10,
            evt.pageY+10,
            a.attr('refid'),
            a.attr('refurl')
         )
      },
      function(evt) { // out
         outelli(a.attr('refid'))
      }
   )
}

var z = 0;
var ist = {};

function intelli(x, y, id, url) {
   clearTimeout(ist[id])
   ist[id] = setTimeout(
      function () {
         $('#is'+id).remove()
         var obj = {}
         if(($('#'+id).length == 0) && url) {
            cacheThread(url, function () { intelli(x, y, id) })
            obj = $.ui.preview(
               $('<div>' + i18n.thrdLoading + '</div>').attr('id', 'is' + id),
               x, y)
         } else {
            obj = $.ui.preview(id, x, y)
         }
         obj.attr('id','is'+id);
         obj.hover(
            function(evt) {
               clearTimeout(ist[id])
            },
            function(evt) {
               outelli(id)
            })
         obj.css('z-index', z++);
         $('body').prepend(obj);
      },
      db.cfg.iSenseUp)
}

function outelli(id) {
   clearTimeout(ist[id])
   ist[id] = setTimeout(
      function () {
         $('#is'+id).remove()
      },
      db.cfg.iSenseDn)
}

function sage(env) {
   if(!env) {
      env = $('body')
   }
   var email = env.find(iom.form.email)
   email.val(email.val() == 'sage' ? '' : 'sage')
   if (db.cfg.sageInAllFields) {
      var pstr = env.find(iom.form.user)
      pstr.val(pstr.val() == 'sage' ? '' : 'sage')
      var ttl = env.find(iom.form.title)
      ttl.val(ttl.val() == 'sage' ? '' : 'sage')
   }
}

function chktizer(obj, id, tp, sage, filtered) {
   var tizText = "";
   if ($('#tiz' + id).attr('id') || db.cfg.hidePure)
      return
   if (tp) { /* tp - thread/post. true - thread */
      if(db.cfg.hideCiteLen) {
         var cite = '(' +
            obj.find(iom.thread.message).text().slice(0, db.cfg.hideCiteLen - 1) +
            '...)'
      } else { var cite = '' }
      tizText = [i18n.thrd, id.replace('t', i18n.no), cite,
		 (filtered ? i18n.filtered : i18n.hidden) + '.'].join(' ')
   } else {
      tizText = [i18n.post, id.replace('p', i18n.no),
		 (filtered ? i18n.filtered : i18n.hidden) + '.'].join(' ')
   }
   var tmenu = [[i18n.show,
                 function () { toggleVisible(id) }]]
   if (sage) {
      tmenu.push([i18n.sage,
                  function () {
                     showReplyForm(id, tizText, tizer);
                     sage($(iom.postform+id)) }])
   }
   var tizer = $.ui.tizer(
      id,
      $.ui.multiLink(tmenu, tizText + ' [')
      , tp)
   obj.before(tizer)
}

function apply_refs(a, body) {
   if(!$('#tizRefs'+pid).attr('id')) {
      var tiz = $.ui.tizer('Refs'+pid, refs(), false)
      apply_isense(tiz.find('a'))
      tiz.css('display', 'block')
      tiz.append('#cache')
   }
}

function toggleBookmarks() {
   var genBookmarks = function () {
      var div = $('<span id="penBmsIn">')
      for (i in db.bookmarks) {
         div.append($.ui.bookmark(i, db.bookmarks[i].cite,  db.bookmarks[i].timestamp))
      }
      return div
   }
   if ($('#penBms').length == 0) {
      $.ui.window(
         'penBms',
         iom.strings.bookmarks,
         $.ui.multiLink([
            [i18n.close,
             function () { toggleBookmarks () }]
         ])).
         append(genBookmarks()).
         append('<br /><br clear="both"/>')
   } else {
      $('#penBmsIn').replaceWith(genBookmarks())
   }
   $('#penBms').toggle()
}

function toggleBookmark(tid) {
   var subj = $('#'+tid)
   var url = $.turl(tid)
   if (db.bookmarks[url]) {
      delete db.bookmarks[url]
   } else {
      var tcite =  $.ui.threadCite(tid, db.cfg.bmCiteLen - 1)
      db.bookmarks[url]= { timestamp : new Date().getTime(), cite : tcite }
   }
   db.saveBookmarks()
   return db.bookmarks[url]
}

function toggleSettings () {
   var genVal = function (id, val) {
      var selected = null
      if(db.combos[id]) {
	 selected = val
	 val = db.combos[id]
      }
      switch (typeof val) {
      case 'object':
	 var retstr = '<select>'
	 
	 for (var k in val) {
	    retstr += '<option '+(k == selected ? 'selected="selected"':'')+' name="' + k + '">' + val[k] + '</option>'
	 }
	 return retstr + '</select>'
	 break
      case 'boolean':
	 return '<input type="checkbox" ' + (val ? 'checked="checked"' : '') + '/>'
	 break
      case 'string':
	 return '<input size="45" value="' + val + '" />'
	 break
      case 'number':
	 return '<input size="8" value="' + val + '" />'
	 break
      default:
	 return ''
      }
   }
   var genDef = function (level) {
      return level > 1 ? '<button>' + i18n.dflt + '</button>' : ''
   }
   var defaultSetting = function (subj) {
      var id = subj.attr('id').replace(/^pen/, '')
      var inp = subj.find('input, select')
      db.cfg[id] = db.dflt[id]
      if(db.combos[id]) {
	 for(var def in db.combos[id]) {
	    inp.find('option:selected').removeAttr('selected')
	    inp.find('option[name='+def+']').attr('selected', 'selected')
	    break
	 }
      } else {
	 switch (typeof db.cfg[id]) {
	 case 'boolean':
	    if (db.cfg[id]) {
	       inp.attr('checked', 'checked')
	    } else {
	       inp.removeAttr('checked')
	    }
	    break
	 case 'number':
	 case 'string':
	    inp.attr('value', db.cfg[id])
	    break
	 }	 
      }
   }
   var genSettings = function () {
      var slist = function (items, level) {
         var setStr = '';
	 var o = 0
         for (var id in items) {
            setStr += '<span id="pen' + items[id] + '" class="penSetting penLevel' + level + '">' +
               db.name[items[id]] + ( level < 3 ? '<span class="right">' + genVal(items[id], db.cfg[items[id]]) + genDef(level) + '</span>' : genVal(items[id], db.cfg[items[id]])) + '</span>'
            if (db.children[items[id]]) {
               setStr += slist(db.children[items[id]], level + 1)
            }
	    o++
         }
         return setStr
      }
      var generated = $(slist(db.roots, 1))
      generated.find('button').click(
	 function () {
	    var childrenEnded = false
	    var e = $(this).closest('span.penSetting')
	    defaultSetting(e)
	    e.nextAll('span.penSetting').each(
	       function () {
		  if (!$(this).hasClass('penLevel3')) {
		     childrenEnded = true
		  }
		  if (!childrenEnded) 
		     defaultSetting($(this))
	       }
	    )
	 })

      var genControls = $('<span><br /><button>' + i18n.allDefault + '</button> <input id="penSettingsSearch" size="33" style="float:right"><br /></span>')
      genControls.find('button').click(
	 function () {
	    generated.find('button').click()
	 }
      )
      genControls.find('input').keypress(
	 function () {
	    generated.find('.penSetting:contains("' + $(this).val() + '")').hide()
	 }
      )
      genControls.append(generated)
      return genControls
   }
   var saveSettings = function () {
      $('#penSettings').find('input, option:selected').each(
	 function () {
	    var e = $(this)
	    if (e.is('#penSettingsSearch'))
	       return
	    var id = e.closest('span.penSetting').attr('id').replace(/^pen/, '')
	    if (e.attr('type') == 'checkbox') {
	       db.cfg[id] = e.attr('checked')
	    } else if (e.is('option')) {
	       db.cfg[id] = e.attr('name')
	    } else { 
	       db.cfg[id] = e.val()
	    }
	 })
   }

   if ($('#penSettings').length == 0) {
      $.ui.window(
         'penSettings',
         iom.strings.settings,
         $.ui.multiLink([
            [i18n.apply,
             function () { 
		saveSettings()
		db.saveCfg()
		location.reload(true) }],
	    [i18n.close,
	     function () { $('#penSettings').hide() }]
         ])).
         append(genSettings())
   }
   $('#penSettings').toggle()
}

function withSelection (subj, f) {
   var before, after, selection;
   subj.each(
      function () {
         if (this.value != '') {
            before = this.value.substring(0, this.selectionStart)
            selection = this.value.substring(this.selectionStart, this.selectionEnd)
            after = this.value.substring(this.selectionEnd, this.value.length)
            this.value = before.concat(f(selection), after)
         }
      })
}

function setupEnv (db, env) {
   var isNight = true
   var thm = db.cfg.nightTime.match(/(\d+)\D+(\d+)\D+(\d+)\D+(\d+)/)
   if(((thm[3] < db.global.time.getHours()) && (thm[1] > db.global.time.getHours())) || 
      ((thm[3] == db.global.time.getHours()) && (thm[4] < db.global.time.getMinutes())) ||
      ((thm[1] == db.global.time.getHours()) && (thm[2] > db.global.time.getMinutes()))) {
      isNight = false
   }

   addStyle(css[isNight ? db.cfg.ntheme : db.cfg.theme])

   if (db.cfg.btnsStyle == 'text') {
      i18n.btns = i18nButtons.text
   } else if (db.cfg.btnsStyle == 'css') {
      i18n.btns = i18nButtons[isNight ? db.cfg.ntheme : db.cfg.theme]
   }
   
   db.loadBookmarks()

   if (db.cfg.overrideF5) {
      $(window).keydown(
	 function (e) {
	    if (e.which == 116) {
	       //window.frames['main'].location.reload()
	       return false
	    }
	 })
   }

   var bmenu = [[i18n.settings,
                 function () { toggleSettings() }]]
   if (db.cfg.bmarks)
      bmenu.push([i18n.bookmarks,
                  function () { toggleBookmarks() }])

   env.find(iom.menu).after(
      $.ui.multiLink(bmenu, i18n.mLinkSep, '')
   )

   env.find(iom.postform).submit(function () {
      if (db.cfg.bmAutoAdd) {
         var subj = $(this)
         var t = $(this).parents(iom.tid)
         var tid = t.attr('id')
         if (!toggleBookmark(tid)) {
            toggleBookmark(tid)
         }
      }
      if (db.cfg.useAJAX) {
         subj.find(iom.form.status).text(i18n.sending)
         subj.ajaxSubmit({
            timeout: 0,
            success:
            function(responseText, statusText) {
               if (responseText.search(/delform/) == -1) {
                  var errResult = responseText.match(/<h1.*?>(.*?)<br/)[1]
                  subj.find(iom.form.status).text(errResult)
               } else {
                  subj.find(iom.form.status).text(i18n.okReloadingNow)
                  window.location.reload(true)
               }
            }})
         return false
      }
   })

   if (db.cfg.tripleTt) {
      var img = env.find(iom.form.turimage)
      img.css('padding-right', '3px').
         after(img.clone(true)).click().
         after(img.clone(true)).click()
   }


   if($(iom.form.parent).length > 0) {
      if (db.cfg.citeInTitle) {
         $('title').append(
            ' &#8212; ' +
               $.ui.threadCite('delform', db.cfg.ttlCiteLen - 1))
      }
      if (db.cfg.thrdMenu) {
         env.find('hr:first').next('a:first').after (
            $.ui.multiLink([
               [i18n.imgs.unfold,
                function (e) {
		   $(iom.post.image).parent().click() 
		   $(e.target).text(
		      $(e.target).text() == i18n.imgs.unfold ? i18n.imgs.fold : i18n.imgs.unfold
		   )
		}],
               [i18n.imgLess.hide,
                function (e) { $(iom.pid).each(
                   function () {
                      if ($(this).find(iom.post.image).length == 0)
                         $(this).toggle()
                   })
	           $(e.target).text(
		      $(e.target).text() == i18n.imgLess.hide ? i18n.imgLess.show : i18n.imgLess.hide
		   )}],
	       [i18n.citeLess.hide,
                function (e) { $(iom.pid).each(
                   function () {
                      if ($(this).find(iom.post.backrefs).length == 0)
                         $(this).toggle()
                   })
		   $(e.target).text(
		      $(e.target).text() == i18n.citeLess.hide ? i18n.citeLess.show : i18n.citeLess.hide
		   )}]
            ], ' / ', '').css('left', '0')
         )
      }
      if (db.cfg.thrdMove) {
         env.find(iom.thread.header+','+iom.postform).hide()
      }
   }
   if (db.cfg.idxHide) {
      env.find(iom.postform).hide()
      env.find('hr').slice(0,1).hide()
   }

   if (db.cfg.sageBtn) {
      env.find(iom.form.email).after(
         $.ui.multiLink([
            [i18n.btns.sage,
             function () { sage() }]
         ], i18n.btns.begin, i18n.btns.end, i18n.btns.sep)
      )}

   if (db.cfg.fmtBtns) {
      env.find(iom.postform + ' ' + iom.form.submit).after(
         $.ui.multiLink([
            [i18n.btns.capsBold, function () {
               withSelection(
                  env.find(iom.form.message),
                  function (s) { return '**'+s.toUpperCase()+'**' }) }],
            [i18n.btns.spoiler, function () {
               withSelection(
                  env.find(iom.form.message),
                  function (s) { return '%%'+s+'%%' }) }]
         ], i18n.btns.begin, i18n.btns.end, i18n.btns.sep))

      env.find(iom.postform + ' ' + iom.form.submit).after(
         $.ui.multiLink([
            [i18n.btns.bold, function () {
               withSelection(
                  env.find(iom.form.message),
                  function (s) { return '**'+s+'**' }) }],
            [i18n.btns.italic, function () {
               withSelection(
                  env.find(iom.form.message),
                  function (s) { return '*'+s+'*' }) }],
            [i18n.btns.striked, function () {
               withSelection(
                  env.find(iom.form.message),
                  function (s) {
                     var l = s.length
                     for (var i = 0; i < l; i++) {
                        s += '^H'
                     }
                     return s }) }],
            [i18n.btns.underline, function () {
               withSelection(
                  env.find(iom.form.message),
                  function (s) { return '__'+s+'__' }) }],
            [i18n.btns.source, function () {
               withSelection(
                  env.find(iom.form.message),
                  function (s) {
                     if (s.search(/\n/) != -1) {
                        return '    '+s.replace(/\n/g, '\n    ')
                     } else {
                        return '`'+s+'`' }
                  }) }]
         ], i18n.btns.begin, i18n.btns.end, i18n.btns.sep))
   }

   /* id надо менять только после манипуляций с формой, потому что иначе
      перестает работать селектор. TODO сделать это и ненужным */


   db.cfg.sageMan &&
      sage(env)

   db.cfg.constPwd &&
      env.find(iom.form.password).val(db.cfg.constPwd)

   var turingTest = env.find(iom.form.turtest)
   turingTest.keypress(
      function (key) {
         var recoded = $.xlatb[String.fromCharCode(key.which).toLowerCase()]
         if (recoded) {
            /* Not a perfect piece of code, but
                  i'm thank you eurekafag (: */
            var caret = key.target.selectionStart
            var str = key.target.value
            key.target.value = str.substring(0,caret) + recoded + str.substring(caret)
            key.target.selectionStart = caret+1
            key.target.selectionEnd = caret+1
            return false
         }
      }
   )
}

apply_me = function (messages, isSecondary) {
   messages.find(iom.tid).each(
      function () {
         var subj = $(this)
         var tid = subj.attr('id')
         var turl = subj.find(iom.thread.reflink).attr('href').split('#')[0]
         var tmenu = []
         var trm = subj.find(iom.thread.ref).next('a')
         if (trm.length == 0) {
            subj.find(iom.thread.ref).after('&nbsp; [<a/>]')
            trm = subj.find(iom.thread.ref).next('a')
         }
         if (db.cfg.thrdHide)
            tmenu.push([
               i18n.hide,
               function () { chktizer(subj, tid, true, true); toggleVisible(tid) }])
         if (db.cfg.thrdUnfold && (subj.find(iom.thread.moar).length | isSecondary))
            tmenu.push([
               isSecondary ? i18n.fold : i18n.unfold,
               function () { toggleThread(tid, !isSecondary) }])
         if (db.cfg.bmarks)
            tmenu.push([
               db.bookmarks[turl] ? i18n.fromBms : i18n.toBms,
               function (e) { $(e.target).text(toggleBookmark(tid) ? i18n.fromBms : i18n.toBms) }])
         if ($(iom.form.parent).length == 0)
            tmenu.push([
               i18n.reply, turl])
         trm.replaceWith($.ui.multiLink(tmenu, '', ''))
         if($(iom.form.parent).length == 0) {
            var moar = subj.find(iom.thread.moar).clone()
            if (moar.length == 0) {
               moar = $('<span class="omittedposts"></span>')
            }
            tmenu[tmenu.length-1] = [
               i18n.replyThat,
               function () { showReplyForm(tid) }]
            moar.append($.ui.multiLink(tmenu))
            subj.find(iom.thread.eot).after(moar)
         }
         /** Posts **/
         subj.find(iom.pid).each(
            function () {
               var subj = $(this)
               var pid = subj.attr('id')
               if (db.cfg.pstsHide) {
                  subj.find(iom.post.ref).append($.ui.multiLink([
                     [i18n.hidePost,
                      function () { chktizer(subj, pid, false); toggleVisible(pid); return false; }]
                  ], ' ', ''))
               }
               /* Censore */
               if(db.cfg.censTitle != '' || db.cfg.censUser != '' || db.cfg.censMail != '' || db.cfg.censMsg != '' || db.cfg.censTotal != '') {
                  var censf = false;
                  if (db.cfg.censTitle &&
                      subj.find(iom.post.title).text().search(db.cfg.censTitle) != -1) {
                     censf = true
                  }
                  if (db.cfg.censUser &&
                      subj.find(iom.post.poster).text().search(db.cfg.censTitle) != -1) {
                     censf = true
                  }
                  if (db.cfg.censMail &&
                      subj.find(iom.post.email).text().search(db.cfg.censMail) != -1) {
                     censf = true
                  }
                  if (db.cfg.censMsg &&
                      subj.find(iom.post.message).text().search(db.cfg.censMsg) != -1) {
                     censf = true
                  }
                  if (db.cfg.censTotal &&
                      subj.text().search(db.cfg.censTotal) != -1) {
                     censf = true
                  }
                  if(censf) {
                     db.filtered[pid]=1
                  }
               }
               if (db.cfg.fwdRefs && $.references[pid]) {
                  var refs =
                     function () {
                        var r = [];
                        for (j in $.references[pid]) {
                           r.push($.ui.anchor($.references[pid][j]))
                        }
                        return $.ui.refs(r.join(', '))
                     }
                  subj.find(iom.post.message).before(refs())
               }
               if (db.cfg.fastReply) {
                  subj.find(iom.post.reflink).click(
                     function () {
                        showReplyForm(tid, '>>'+pid.replace('p',''));
                        return false; }
                  )}
            })

      }
   )

   db.cfg.imgsUnfold &&
      messages.find(iom.post.image).each(
         function () {
            var subj = $(this)
            subj.a().click(
               function () {
                  return refold(subj.findc(iom.pid).attr('id'))
               }
            ).removeAttr('target')
         }
      )


   db.cfg.iSense &&
      messages.find(iom.anchors).each(
         function () { apply_isense($(this)) }
      )


   for(var objId in db.hidden) {
      /* It's an low level alternative of toggle method
          * TODO Rewrite toggle for suitable usage in this
          * place (may be impossible). */
      if (objId) {
         var subj = messages.find('#'+objId)
         subj.css('display', 'none')
         chktizer(subj, objId, objId.search(/t/) == -1 ? false : true)
         messages.find('#tiz'+objId).css('display','block')
      }
   }
   for (var objId in db.filtered) {
      var subj = messages.find('#'+objId)
      subj.css('display', 'none')
      chktizer(subj, objId, false, false, true)
      messages.find('#tiz'+objId).css('display','block')
   }
}

function postSetup () {
   if (db.cfg.thrdMove && $(iom.form.parent).length > 0) {
      showReplyForm($(iom.tid).attr('id'), null, null, true, true)
   }
   scope.timer.diff('penochka sync');
   scope.timer.init();
   setTimeout(function() {
      scope.timer.diff('async queue');
      $('p.footer a:last').
         after(' + <a href="http://github.com/anonymous32767/Penochka/" title="' + scope.timer.cache + ' total: ' + scope.timer.total + 'ms">penochka 0.5e</a>')
   },0);
}

db.loadCfg()
db.loadHidden()

$(document).ok(db, setupEnv, apply_me, postSetup)


