;$.p5a.io = function () {
   /* base64 & utf8routines @ http://www.webtoolkit.info */
   function utf8_encode (string) {
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

   function utf8_decode (utftext) {
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
   }

   var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+=";

   function b64encode (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;

      input = utf8_encode(input);

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
            keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4);

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

         enc1 = keyStr.indexOf(input.charAt(i++));
         enc2 = keyStr.indexOf(input.charAt(i++));
         enc3 = keyStr.indexOf(input.charAt(i++));
         enc4 = keyStr.indexOf(input.charAt(i++));

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

      output = utf8_decode(output);

      return output.replace(/\0/g,'');

   }


   /* Cookies mamangement instead of using plugin.
   Note that we do not escape/base64 cookies
   values here, so take care about it's format. */
   function getCookie (cName)
   {
      if (document.cookie.length>0)
      {
         cStart=document.cookie.indexOf(cName + "=");
         if (cStart!=-1)
         {
            cStart=cStart + cName.length+1;
            cEnd=document.cookie.indexOf(";",cStart);
            if (cEnd == -1)
               cEnd=document.cookie.length
            return document.cookie.substring(cStart,cEnd);
         }
      }
      return "";
   }

   function setCookie (cName, value, path, expireDays)
   {
      var expDate = new Date()
      expDate.setDate(expDate.getDate() + expireDays);
      document.cookie=cName+ "=" + value +
         (path ? "; path=" + path : "") +
         (expireDays ? "; expires="+expDate.toGMTString() : "")
   }

   function cake (names, valfn) {
      if (typeof valfn == 'function') {
         var retVal = {}
         for (var i in names) {
            retVal[i] = b64decode(getCookie(i))
         }
         valfn(retVal)
      } else {
         var len = 0
         var encoded = {}
         for (var i in names) {
            /* Encode value */
            encoded[i] = b64encode(names[i][0])
            len += encoded[i].length
         }
         if (len > 4000) /* Not 4096. Let's take a small gap*/
            return false
         for (var i in encoded)
            setCookie(i, encoded[i], names[i][1], 365 * 10)
         return true
      }
   }

   /* Due to imposed async nature of our cross-browser IO
   read procedure io() should be called only once to improve
   performance */
   return function (names, valfn) {
      try {
         var storage = (typeof localStorage === 'object') && (localStorage != null) ? localStorage : globalStorage[location.hostname]
      } catch (err) { /* Worst case: use cakes */
         return cake(names, valfn)
      }
      if (typeof valfn == 'function') {
         var retVal = {}
         for (var i in names) {
            retVal[i] = storage.getItem(i)
         }
         valfn(retVal)
      } else {
         for (var i in names) {
            if (!names[i][1])
               names[i][1] = ''
            storage.setItem(i+names[i][1].replace(/\//g,''), names[i][0])
         }
         /* FIXME: Add length check, localStorage als
         has size restrictions */
         return true
      }
   }
}()