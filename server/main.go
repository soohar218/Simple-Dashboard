package main

import (
	"net/http"

	"example/web-service-gin/models"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(corsMiddleware())

	/*
		// attempt with adding an auth last minute;
		// figured out how but couldn't connect it to React App in an easy way using gin in the given time

		authorized := router.Group("/", gin.BasicAuth(gin.Accounts{
			"user1": "love",
		}))

		authorized.GET("/secret", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{
				"secret": "The secret ingredient to the BBQ sauce is stiring it in an old whiskey barrel.",
			})
		})
	*/

	// 3 API Endpoints: 1) GET all messages 2) GET a single message 3) POST
	router.GET("/messages", getMessages)
	router.GET("/messages/last", getLastMessage)
	router.POST("/messages", postMessage)
	router.Run("localhost:8080")
}

// getMessages responds with the list of all messages as JSON.
func getMessages(c *gin.Context) {
	messages1 := models.ListMessagesHandler()
	if messages1 == nil || len(messages1) == 0 {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.IndentedJSON(http.StatusOK, messages1)
	}

}

// getLastMessage gets the most recent (last row from db) message
func getLastMessage(c *gin.Context) {
	mov := models.GetLastMessageHandler()

	if mov == nil {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.IndentedJSON(http.StatusOK, mov)
	}
}

// postMessages adds a message from JSON received in the request body.
func postMessage(c *gin.Context) {
	var msg models.Message

	if err := c.BindJSON(&msg); err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		models.CreateMessageHandler(msg)
		c.IndentedJSON(http.StatusCreated, msg)
	}
}

// CORS handling to allow app's HTTP requests
func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3005")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
