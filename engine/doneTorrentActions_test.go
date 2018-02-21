package engine

import (
	"testing"

	"github.com/asdine/storm"
	Settings "github.com/deranjer/goTorrent/settings"
	Storage "github.com/deranjer/goTorrent/storage"
)

func TestMoveAndLeaveSymlink(t *testing.T) {
	type args struct {
		config   Settings.FullClientSettings
		tStorage Storage.TorrentLocal
		db       *storm.DB
	}
	tests := []struct {
		name string
		args args
	}{
	// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			MoveAndLeaveSymlink(tt.args.config, tt.args.tStorage, tt.args.db)
		})
	}
}

func Test_notifyUser(t *testing.T) {
	type args struct {
		tStorage Storage.TorrentLocal
		config   Settings.FullClientSettings
		db       *storm.DB
	}
	tests := []struct {
		name string
		args args
	}{
	// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			notifyUser(tt.args.tStorage, tt.args.config, tt.args.db)
		})
	}
}
