buildnumfile := build
versionfile := version
target := govno.js

v = 3.0.$$(cat $(versionfile)).$$(($$(cat $(buildnumfile)) + 1))

unstable: 
	echo $$(($$(cat $(buildnumfile)) + 1)) > $(buildnumfile)
	sed -e "s/UnStAbLe/$(v)/g" tmp > govno\ \(unstable\)/$(target)
	sed -e "s/version='[0-9\.]\+'/version='$(v)'/g" govno_unstable.xml > tmp1
	mv tmp1 govno_unstable.xml
	sed -e "s/\"version\": \"[0-9\.]\+\"/\"version\": \"$(v)\"/g" govno\ \(unstable\)/manifest.json > tmp1
	mv tmp1 govno\ \(unstable\)/manifest.json
	chrome --pack-extension=govno\ \(unstable\) --pack-extension-key=govno.pem

govno:
	chrome --pack-extension=govno --pack-extension-key=govno.pem

govno-unstable:
	chromium-browser --pack-extension=govno\ \(unstable\) --pack-extension-key=govno.pem
