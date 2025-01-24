How To Generate La-Casa-Blanca.org
----------------------------------
[README Español](/README.es.md).

Clone the GH pages repo: https://github.com/La-Casa-Blanca/La-Casa-Blanca.github.io

Set the project path in your ENV:

    export CASABLANCA_STATIC_PATH="$HOME/La-Casa-Blanca.github.io"

Chrome
-----
Requires a Chrome browser with the [Save Page WE](https://chromewebstore.google.com/detail/save-page-we/dhhpefjklgkmgeafimnjhojgjamoafof?hl=en) extension installed on the default profile. Set the file download path to a fixed string in Options > File Info, like "save_page.html".

Set the fixed string save page path from ^ in your ENV:

    export CASABLANCA_DLOAD_PATH="$HOME/Downloads/save_page.html"

Node
----
This project has been tested with node v23.4.0, and requires puppeteer. Clone this repo, cd to the project directory, and install the dependencies with:

    npm install

xdotool
-------
This is used to type the keyboard to trigger translation of the page, and saving it. Its needed because puppeteer cannot interact with the context menu, nor send keys to trigger extension shortcuts. Install xdotool so that it's available in your PATH.

Other
-----
Also requires jq, perl and a POSIX-compatible shell.

Usage
-----
In a shell cd into this project directory. Make sure Chrome is running with your default profile logged in. With the above ENV values set, and dependencies installed type:

    ./run.sh

License
-------
MIT License (see LICENSE file for details).

Copyright (c) 2025 La Casa Blanca
