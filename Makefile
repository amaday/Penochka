buildnumfile := build
versionfile := version
target := penochka.js

opera_dir := $(HOME)/User\ Js/Penochka/
chrome_dir := $(HOME)/AppData/Local/Chromium/User\ Data/Default/User\ Scripts

v = 0.$$(cat $(versionfile)).$$(($$(cat $(buildnumfile)) + 1))

all: build

install: build
	mkdir -p $(opera_dir)
	cp -f $(target) $(opera_dir)

build: 
	echo $$(($$(cat $(buildnumfile)) + 1)) > $(buildnumfile)
	cd src; make;
	mv src/penochka.js tmp
	mv src/make.bat build.bat
	sed -e "s/UnStAbLe/$(v)/g" tmp > $(target)
	git commit -a 
	#git checkout govno

clean:
	cd src; make clean
	rm -f penochka.js

release: 	
	make compiled
	git add penochka.js
	git commit -a -m "$(m)"
	git tag -a $(v) -m "Build $(v)"
	make clean
	git checkout govno
	git push --tags github master
	git rm -f penochka.js
	git commit -a -m "Build $(v) cleanup."
	git push --tags github master

commit:
	make compiled
	git commit -a -m "$(m)"
	git push github master
