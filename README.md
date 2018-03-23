# goTorrent
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/goTorrent-project/Lobby)  [![Go Report Card](https://goreportcard.com/badge/github.com/deranjer/goTorrent)](https://goreportcard.com/report/github.com/deranjer/goTorrent)

goTorrent is a torrenting server built with Go (Golang) with websocket API that comes with a React web frontend.

The current release is an alpha release which means there may be bugs, please open issues to help me improve this software!

Image of the frontend UI

![alt text](/documentation/images/frontend.png "Frontend UI")

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
   - Symlinks don't work on Windows yet, have to copy file for now
 
## Roadmap
- Early-Mid 2018

 - [X] Ability to modify storage path of torrent after it has been added

 - [X] Backend to frontend notification messages

 - [X] Global Rate Limiting for Upload/Download Speed

 - [X] Add torrents from watch folder (cron job every 5 minutes)
  
 - [X] Authentication from client to server (done via JWT, will add functionality for 3rd party clients later)

 - [X] Reverse Proxy Support with SSL upgrade added (with provided config for nginx)

 - [X] Mostly generated client config from toml.config on first run

 - [X] Ability to view TOML settings from WebUI (and perhaps change a few as well)
 
 - [X] Ability to set priority for individual files (needs more testing!)

 - [ ] Unit testing completed for a large portion of the package
 
 - [ ] Stability/bug fixing/Optimization rewrite of some of the core structures of the WebUI and base server
 
 - [ ] Put the "Move torrent after download" into own goroutine with checks so the WebUI doesn't freeze when moving torrent
 
 
 
- Late 2018

 - [X] Define the websocket API for users to write their own clients/extensions
 
 - [ ] React-native Android app (I don't own any Mac products so there will be no iPhone version)

# Documentation

All the documentation is available [here](https://deranjer.github.io/)


# Special Thanks
I viewed cloud-torrent source to construct my project:

[Cloud-Torent:Cloud torrent is a a self-hosted remote torrent client, written in Go (golang)](https://github.com/jpillora/cloud-torrent)

[Anacrolix BitTorrent client package and utilities](https://github.com/anacrolix/torrent)

[goreleaser: Deliver Go binaries as fast and easily as possible](https://github.com/goreleaser/goreleaser)

[Viper: Go configuration with fangs](https://github.com/spf13/viper)

[logrus: Structured, pluggable logging for Go.](https://github.com/sirupsen/logrus)

[boltdb: An embedded key/value database for Go.](https://github.com/boltdb/bolt)

[storm: Simple and powerful toolkit for BoltDB](https://github.com/asdine/storm)

[Gorilla: web toolkit for the Go programming language](http://www.gorillatoolkit.org/)

[gofeed: Parse RSS and Atom feeds in Go](https://github.com/mmcdole/gofeed)

[pushbullet-go: A library to call Pushbullet HTTP API for Golang](https://github.com/mitsuse/pushbullet-go)

