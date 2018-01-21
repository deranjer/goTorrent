# goTorrent

goTorrent is a torrenting server built with Go (Golang) with websocket API that comes with a React web frontend.

The current release is an alpha release which means there may be bugs, please open issues to help me improve this software!



## Supported Platforms:
- Windows
- Linux
- MacOS - (untested as I do not have a Mac)

### Supported Arch:
- x64

## Features:
 - Responsive React based WebUI
 - Download torrents from File upload or Magnet Link
 - Start/Stop/Delete Multiple Torrents
 - Add RSS feeds and automatically download new torrents from feed
 - Detailed information for each torrent
 - Automatic stop after seeding ratio reached
 - Pushbullet notification on torrent complete
 - Automatic move of completed torrent to new directory (leave symlink behind for seeding)
  - Doesn't work on Windows yet, have to copy file for now
 
## Roadmap
- Early-Mid 2018

 - [] Unit testing completed for a large portion of the package
 
 - [] Stability/bug fixing/Optimization rewrite of some of the core structures of the WebUI and base server
 
 - [] Put the "Move torrent after download" into own goroutine with checks so the WebUI doesn't freeze when moving torrent
 
 - [] Ability to set priority for individual files (just added to anacrolix/torrent so coming soon, already added to my UI)
 
 - [] Ability to view TOML settings from WebUI (and perhaps change a few as well)
 
 - [] Ability to modify storage path of torrent after it has been added
 
- Late 2018

 - [] React-native Android app (I don't own any Mac products so there will be no iPhone version)

# Installation:

## Linux (tested on Debian)

You can watch a YouTube video of me setting it up:

<a href="http://www.youtube.com/watch?feature=player_embedded&v=G0gO_cm_Oks
" target="_blank"><img src="http://img.youtube.com/vi/G0gO_cm_Oks/0.jpg" 
alt="goTorrent Alpha Setup Video" width="240" height="180" border="10" /></a>

### Configuring the backend

Download the latest release from the releases tab, it will be in a tar.gz format.

Create a directory where goTorrent will run from

    sudo mkdir /opt/goTorrent

Put the tar.gz release into the folder, and extract it.

    tar -zxvf goTorrent_release_64-git.tar.gz
    

You can then remove the tar.gz if you wish.  You should have something similar to the following files:

    drwxr-xr-x 5 root root        9 Jan 21 14:56 .
    drwxr-xr-x 5 root root        5 Jan 21 14:54 ..
    -rw-rw-rw- 1 root root     1086 Dec  1 01:42 LICENSE
    -rw-rw-rw- 1 root root       69 Dec  1 01:01 README.md
    -rw-rw-rw- 1 root root     4466 Jan 21 03:48 config.toml
    drwxr-xr-x 3 root root        3 Jan 21 14:55 dist-specific-files
    -rw-rw-rw- 1 root root 12503552 Jan 21 03:53 goTorrent
    drwxr-xr-x 3 root root        3 Jan 21 14:55 public
    drwxr-xr-x 2 root root        3 Jan 21 14:55 templates

The `config.toml` file contains all of the settings for the server part of the application.  Most of the important settings are at the top of the file, so open it with your prefered text editor.

[serverConfig]

    ServerPort = ":8000" #leave format as is it expects a string with colon
    ServerAddr = "" #blank will bind to default IP address, usually fine to leave be
    LogLevel = "Warn" # Options = Debug, Info, Warn, Error, Fatal, Panic
    LogOutput = "file" #Options = file, stdout #file will print it to logs/server.log

    SeedRatioStop = 1.50 #automatically stops the torrent after it reaches this seeding ratio
    #Relative or absolute path accepted, the server will convert any relative path to an absolute path.
    DefaultMoveFolder = 'downloaded' #default path that a finished torrent is symlinked to after completion. Torrents added via RSS will default here


[notifications]

    PushBulletToken = "" #add your pushbullet api token here to notify of torrent completion to pushbullet

Usually you don't need to change anything in this file, goTorrent will use your default IP address and bind to it.  You can change the port if you wish.

Next, we need to make sure that the executable runs, so run the following:

    chmod +x goTorrent

This will make the program executable.

###Connecting the Frontend to the Backend

We need to connect our react frontend to our Golang backend, for this we only need to edit one JS file.

    nano public/static/js/kickwebsocket.js

    var ws = new WebSocket("ws://192.168.1.141:8000/websocket"); //creating websocket

Just change the IP address after ws:// to your server IP address, and change the port if you changed the port in the `config.toml` file.

Then save that file and return to `/opt/goTorrent`.  

Now we can test the server.  For testing I recommend going into the `config.toml` file and changing the `LogOutput` to `stdout`, and the `LogLevel` to `Info`.

Then start the server:

    ./goTorrent 
    
If you have `LogLevel` set to `Info`, you should see the confirmation that the client config has been generated.

You can then open your browser and connect to IP:Port (http) and you should see the main page.  You will see an error for retrieving RSS feeds in stdout, but this is expected for first load.

You can press `F12` if using Chrome to open the console and click around the UI to see the logging available for the frontend.

### Running goTorrent as a Service

If you are on a linux system that uses systemd, in the `dist-specific-files\Linux-systemd\` folder there is a `goTorrent.service` file that can be used to setup systemd for goTorrent.  A quick overview of what is needed.

1. Edit the systemd file to specify your specific implementation
2. Copy the file to your systemd folder, i.e. `/etc/systemd/system`
3. Enable the service `systemctl enable goTorrent.service`
4. If using a new user, create that user and assign permissions:
    a. `useradd goTorrent`
    b. `sudo chown -R goTorrent:goTorrent /opt/goTorrent`
    c. If you want to test server: `su goTorrent` then run the executable
5. Set your `config.toml` file to the values you want.
6. Start your server: `systemctl start goTorrent`
7. Check for errors: `systemctl status goTorrent`.  You can also check `logs\server.log`.

### Windows

Please see the linux instructions as they are similar, for running it as a service I havn't tried out any of the programs that claim to do that, but perhaps try [NSSM](http://nssm.cc/download)


# Special Thanks
[Anacrolix BitTorrent client package and utilities](https://github.com/anacrolix/torrent)

[goreleaser: Deliver Go binaries as fast and easily as possible](https://github.com/goreleaser/goreleaser)

[Viper: Go configuration with fangs](https://github.com/spf13/viper)

[logrus: Structured, pluggable logging for Go.](https://github.com/sirupsen/logrus)

[boltdb: An embedded key/value database for Go.](https://github.com/boltdb/bolt)

[storm: Simple and powerful toolkit for BoltDB](https://github.com/asdine/storm)

[Gorilla: web toolkit for the Go programming language](http://www.gorillatoolkit.org/)

[gofeed: Parse RSS and Atom feeds in Go](https://github.com/mmcdole/gofeed)

[pushbullet-go: A library to call Pushbullet HTTP API for Golang](https://github.com/mitsuse/pushbullet-go)

