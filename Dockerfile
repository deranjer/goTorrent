FROM scratch
COPY goTorrent /
ENTRYPOINT [ "/goTorrent" ]