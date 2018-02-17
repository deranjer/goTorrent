package settings

import (
	"crypto/rand"
	"math/big"

	"github.com/dgrijalva/jwt-go"
	"github.com/sirupsen/logrus"
)

type AuthRequest struct {
	MessageType string `json:"MessageType"`
	AuthString  string `json:"AuthString"`
}

//GoTorrentClaims stores the name of the client (usually user entered) and any standard jwt claims we want to define
type GoTorrentClaims struct {
	ClientName string `json:"clientName"`
	jwt.StandardClaims
}

//GenerateToken creates a signed token for a client to use to communicate with the server
func GenerateToken(claims GoTorrentClaims, signingKey []byte) string {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signedString, err := token.SignedString(signingKey)
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Fatal("Error signing authentication Token!")
	}
	return signedString

}

//GenerateSigningKey creates a random key that will be used for JSON Web Token authentication
func GenerateSigningKey() []byte {
	keyString, err := generateRandomASCIIString(24)
	key := []byte(keyString)
	if err != nil {
		Logger.WithFields(logrus.Fields{"error": err}).Fatal("Error generating signing key!")
	}
	return key
}

func generateRandomASCIIString(length int) (string, error) {
	result := ""
	for {
		if len(result) >= length {
			return result, nil
		}
		num, err := rand.Int(rand.Reader, big.NewInt(int64(127)))
		if err != nil {
			return "", err
		}
		n := num.Int64()
		// Make sure that the number/byte/letter is inside
		// the range of printable ASCII characters (excluding space and DEL)
		if n > 32 && n < 127 {
			result += string(n)
		}
	}
}
