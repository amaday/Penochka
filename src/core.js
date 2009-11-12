
jQuery.fn.swap = function(b){
   b = jQuery(b)[0]
   var a = this[0]
   var t = a.parentNode.insertBefore(document.createTextNode(''), a)
   b.parentNode.insertBefore(a, b)
   t.parentNode.insertBefore(b, t)
   t.parentNode.removeChild(t)
   return this
}
jQuery.fn.reverse = [].reverse
jQuery.fn.sort = [].sort

$.p5a = (function () {
   var _isGreasemonkey = false
   try {
      var _house = $(unsafeWindow.document)
      _isGreasemonkey = GM_setValue ? true : false
   } catch (err) {
      var _house = $(window.document)
   }

   var _domain = window.location.hostname
   var _board = window.location.pathname.replace(/^\/(\w+)\/.*$/, '$1')
   var _time = new Date()

   return {
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
      references: {},
      events: {},
      house: _house,
      domain: _domain,
      board: _board,
      time: _time,
      isGreasemonkey: _isGreasemonkey,
      isNight: false,
      isInThread: false,
      isSecondary: false,
      setting : function (id, title, parent, defval, description, examples) {
	 if (typeof defval == 'object') {
            this.combos[id] = defval
            for(var i in defval) {
               this.cfg[id] = i
               this.dflt[id] = i
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
	 this.setting ('feats', 'Возможности')
	 this.setting ('form',  'Форма ответа')
	 this.setting ('sage',  'Сажа')
	 this.setting ('cens',  'Фильтрация')
	 this.setting ('view',  'Оформление')
	 this.setting ('sys',   'Системные')
	 this.setting ('ftune', 'Тонкие настройки')

	 this.ready = true;
      },
      load : function (objs, cb) {
	 this.io(objs,
		 function (data) {
                    var retVal = {}
                    for (i in data) {
                       retVal[i] = {}
                       var raw = []
                       try {
			  raw = data[i].split('|')
                       } catch (err) { raw = [] }

                       for (var j = 0; j < raw.length; j += 2) {
			  if (raw[j])
                             retVal[i][raw[j]] = raw[j + 1]
                       }
                    }

                    cb(retVal)
		 })
      },
      save : function (objs) {
	 var raw = [];
	 /* TODO: Escape this */
	 for (o in objs) {
            for (i in objs[o][0]) {
               raw.push(i)
            raw.push(objs[o][0][i])
            }
            objs[o][0] = raw ? raw.join('|') : null
            raw = []
	 }
	 return this.io(objs)
      },
      saveState: function () {
	 var cfgDelta = {}
	 var bookmarksRaw = {}

	 /* Config */
	 for (var i in this.cfg)
            if (this.cfg[i] != this.dflt[i]) {
               cfgDelta[i]=this.cfg[i]
            }

	 /* Bookamrks */
	 for (var i in this.bookmarks)
            bookmarksRaw[i] = this.bookmarks[i].timestamp + '#' + this.bookmarks[i].cite

	 return this.save({
            penCfg: [cfgDelta, '/'],
            penHidden: [this.hidden, null],
            penBookmarks: [bookmarksRaw, '/']
	 })
      },
      loadState: function (cb) {
	 if (!this.ready) {
            this.init()
	 }

	 var me = this

	 this.load(
	    {
               penCfg: '',
               penBookmarks: '',
               penHidden: ''
	    },
            function (data) {
               me.hidden = data.penHidden
	       
               /* Bookmarks */
               for(i in data.penBookmarks) {
		  var tc = data.penBookmarks[i].split('#')
		  me.bookmarks[i] = {
                     timestamp : tc.shift(),
                     cite : tc.join('#')
		  }
               }
	       
               /* Config typing fix */
               for (i in data.penCfg) {
		  me.cfg[i] = data.penCfg[i]
               }
               for (i in me.cfg) {
		  if (typeof me.dflt[i] == 'boolean') {
                     if (me.cfg[i] == 'false') {
			me.cfg[i] = false
                     } else if (me.cfg[i] == 'true') {
			me.cfg[i] = true
                     }
		  } else if (typeof me.dflt[i] == 'number') {
                     me.cfg[i] = me.cfg[i] * 1
                     if (me.cfg[i] == NaN)
			me.cfg[i] = me.dflt[i]
		  }
               }
	       
               cb()
            })
      },
      addStyle: function (css) {
	 var style = document.createElement( 'style' );
	 style.type = 'text/css';
	 var head = document.getElementsByTagName('head')[0];
	 head.appendChild( style );
	 if( style.styleSheet )  // IE
            style.styleSheet.cssText = css;
	 else  // other browsers
            style.appendChild( document.createTextNode(css) );
	 return style;
      },
      bind: function (name, handler) {
	 if(!$.p5a.events[name])
	    $.p5a.events[name] = []
	 $.p5a.events[name].push(handler)
      },
      trigger: function(name, data) {
	 var handlers = $.p5a.events[name]
	 if(!(handlers instanceof Array))
	    return
	 for(var i = 0; i < handlers.length; i++)
	    handlers[i](data)
      },
      ok: function() {
	 /* Защита от повторного вызова скрипта. */
	 if($('#cache').length > 0)
            return

	 var processor = dvach()

	 var run = function () {
            scope.timer.diff('page load')
            scope.timer.init()
            $.p5a.trigger('domOk')
	    processor()
            $.p5a.trigger('loadOk')
	 }

	 $.p5a.isGreasemonkey ? run() : $.p5a.house.ready(run)
      }
   }
})()