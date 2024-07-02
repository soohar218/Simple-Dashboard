package models

// Message represents data about a wire message
type Message struct {
	// Id           uint64 `json:"id"`
	Seq          string `json:"seq"`
	Sender_rtn   string `json:"sender_rtn"`
	Sender_an    string `json:"sender_an"`
	Receiver_rtn string `json:"receiver_rtn"`
	Receiver_an  string `json:"receiver_an"`
	Amount       string `json:"amount"`
}
