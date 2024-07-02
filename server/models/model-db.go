package models

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

// database constants
const dbuser = "root"
const dbname = "wire_dashboard"

// GET all messages from database
func ListMessagesHandler() []Message {
	db, err := sql.Open("mysql", dbuser+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}

	defer db.Close()

	results, err := db.Query("SELECT seq, sender_rtn, sender_an, receiver_rtn, receiver_an, amount FROM messages") // get all items from messages table

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}
	messages1 := []Message{}
	for results.Next() {
		var mov Message
		err = results.Scan(&mov.Seq, &mov.Sender_rtn, &mov.Sender_an, &mov.Receiver_rtn, &mov.Receiver_an, &mov.Amount)

		if err != nil {
			panic(err.Error())
		}
		messages1 = append(messages1, mov)
	}
	return messages1
}

// GET only last message from database (retreive a single message)
func GetLastMessageHandler() *Message {
	db, err := sql.Open("mysql", dbuser+"@tcp(127.0.0.1:3306)/"+dbname)

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}
	defer db.Close()

	results, err := db.Query("SELECT seq, sender_rtn, sender_an, receiver_rtn, receiver_an, amount FROM messages ORDER BY id Desc LIMIT 1")

	if err != nil {
		fmt.Println("Err", err.Error())
		return nil
	}

	msg := &Message{}
	if results.Next() {
		err = results.Scan(&msg.Seq, &msg.Sender_rtn, &msg.Sender_an, &msg.Receiver_rtn, &msg.Receiver_an, &msg.Amount)
		if err != nil {
			return nil
		}
	} else {
		return nil
	}

	return msg
}

// POST a new message to database
func CreateMessageHandler(message Message) {
	db, err := sql.Open("mysql", dbuser+"@tcp(127.0.0.1:3306)/"+dbname)
	if err != nil {
		fmt.Println("Err", err.Error())
	}

	defer db.Close()
	insert, err := db.Query(
		"INSERT INTO messages (seq, sender_rtn, sender_an, receiver_rtn, receiver_an, amount) VALUES (?, ?, ?, ?, ?, ?)",
		message.Seq, message.Sender_rtn, message.Sender_an, message.Receiver_rtn, message.Receiver_an, message.Amount)

	if err != nil {
		fmt.Println("Err", err.Error())
	}
	defer insert.Close()
}
