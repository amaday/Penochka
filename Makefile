
govno:
	chromium-browser --pack-extension=govno --pack-extension-key=govno.pem

govno-unstable:
	chromium-browser --pack-extension=govno\ \(unstable\) --pack-extension-key=govno.pem

commit:
	git commit -a -m="$(m)"
	git push github govno