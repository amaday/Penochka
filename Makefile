buildnumfile := build
versionfile := version
target := govno.user.js

v = 3.0.$$(cat $(versionfile)).$$(($$(cat $(buildnumfile)) + 1))

VPATH = ./

unstable: 
	echo $$(($$(cat $(buildnumfile)) + 1)) > $(buildnumfile)
	sed -e "s/UnStAbLe/$(v)/g" tmp | sed -e "s/penochka/govno/g" > $(target)
	cp $(target) govno\ \(unstable\)/govno.js 
	sed -e "s/version='[0-9\.]\+'/version='$(v)'/g" govno_unstable.xml > tmp1
	mv tmp1 govno_unstable.xml
	sed -e "s/\"version\": \"[0-9\.]\+\"/\"version\": \"$(v)\"/g" govno\ \(unstable\)/manifest.json > tmp1
	mv tmp1 govno\ \(unstable\)/manifest.json
	chrome --pack-extension="P:\govno (unstable)" --pack-extension-key=P:\govno.pem --no-message-box
	git commit -a -m "Build $(v)"

govno:
	chrome --pack-extension=P:\govno --pack-extension-key=P:\govno.pem --no-message-box
