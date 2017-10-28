package main



import (
	"github.com/boltdb/bolt"
	"fmt"
	"github.com/anacrolix/torrent/metainfo"
	"time"
)

type TorrentLocal struct {
	Hash metainfo.Hash
	DateAdded string
	StoragePath string
	TorrentName string
}


func readInTorrents (torrentStorage *bolt.DB) (TorrentLocalArray []*TorrentLocal){

	TorrentLocalArray = []*TorrentLocal{}

	torrentStorage.View(func(tx *bolt.Tx) error {

		tx.ForEach(func(name []byte, b *bolt.Bucket) error {
			torrentLocal := new(TorrentLocal) //create a struct to store to an array
			var Dateadded []byte
			var StoragePath []byte
			var Hash []byte
			var TorrentName []byte
			Dateadded = b.Get([]byte("Date"))
			if Dateadded == nil {
				fmt.Println("Date added error!")
				Dateadded = []byte(time.Now().Format("Jan _2 2006"))
			}
			StoragePath = b.Get([]byte("StoragePath"))
			if StoragePath == nil {
				fmt.Println("StoragePath error!")
				StoragePath = []byte("downloads")
			}
			Hash = b.Get([]byte("InfoHash"))
			if Hash == nil {
				fmt.Println("Hash error!")
			}
			TorrentName = b.Get([]byte("TorrentName"))
			if TorrentName == nil {
				fmt.Println("Torrent Name not found")
				TorrentName = []byte("Not Found!")
			}

			torrentLocal.DateAdded = string(Dateadded)
			torrentLocal.StoragePath = string(StoragePath)
			torrentLocal.Hash = metainfo.HashBytes(Hash) //Converting the byte slice back into the full hash
			torrentLocal.TorrentName = string(TorrentName)

			fmt.Println("Torrentlocal list: ", torrentLocal)
			TorrentLocalArray = append(TorrentLocalArray, torrentLocal) //dumping it into the array
			return nil
		})
		return nil
	})

	return TorrentLocalArray //all done, return the entire Array to add to the torrent client
}


func addTorrentLocalStorage (torrentStorage *bolt.DB, local *TorrentLocal){
	println("Adding Local storage information")

	torrentStorage.Update(func(tx *bolt.Tx) error {
		b, err := tx.CreateBucketIfNotExists([]byte(local.Hash.Bytes()))//translating hash into bytes for storage
		if err != nil {
			return fmt.Errorf("create bucket %s", err)
		}
		err = b.Put([]byte("Date"), []byte(local.DateAdded))//TODO error checking  marshall into JSON
		if err != nil {
			return err
		}
		err = b.Put([]byte("StoragePath"), []byte(local.StoragePath))
		if err != nil {
			return err
		}
		err = b.Put([]byte("InfoHash"), []byte(local.Hash.Bytes()))
		if err != nil {
			return err
		}
		err = b.Put([]byte("TorrentName"), []byte(local.TorrentName))
		if err != nil {
			return err
		}

		return nil
	})
}