import React, { useEffect, useState } from "react";
import client, {
  COLLECTION_ID_MESSAGES,
  DATABASE_ID,
  databases,
} from "../../appwriteConfig";
import { ID, Permission, Query, Role } from "appwrite";
import { Trash2 } from "react-feather";
import calculateTimeAgo from "./calculateTimeAgo";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();

  const getMesssages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt")]
    );
    setMessages(response.documents);
  };

  useEffect(() => {
    getMesssages();
    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        // Callback will be executed on changes for documents A and all files.

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("نم الحدف");
          setMessages((prevState) =>
            prevState.filter((meseege) => meseege.$id !== response.payload.$id)
          );
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("نم إضافة رسالة جديدة");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
      }
    );
    return () => unsubscribe();
  }, []);

  const payload = {
    user_id: user.$id,
    username: user.name,
    body: messageBody,
  };

  const permissions = [Permission.write(Role.user(user.$id))];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions
    );
    console.log(res);

    // setMessages((prevState) => [res, ...messages]);
    setMessageBody("");
  };

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGES, message_id);
    // setMessages((prevState) =>
    //   messages.filter((meseege) => meseege.$id !== message_id)
    // );
  };

  const owner = messages[0]?.$permissions.includes(
    `delete(\"user:${user.$id}\")`
  );
  console.log(owner);

  return (
    <main className="container" dir="ltr">
      <Header />
      <div className="room--container">
        <form id="message--form" onSubmit={handleSubmit}>
          <div>
            <textarea
              required
              maxLength="250"
              placeholder="Say something..."
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>

          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="send" />
          </div>
        </form>
        <div>
          {messages.map((message, i) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <p className="message--header">
                  {message?.username ? (
                    <span>{message.username}</span>
                  ) : (
                    <span>Annonymous user</span>
                  )}
                  <small className="message-timestamp">
                    {calculateTimeAgo(message.$createdAt)}
                  </small>
                </p>
                {message.$permissions.includes(
                  `delete(\"user:${user.$id}\")`
                ) && (
                  <Trash2
                    className="delete--btn"
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                  />
                )}
              </div>
              <div
                className={`${
                  message.$permissions.includes(`delete(\"user:${user.$id}\")`)
                    ? "message--body"
                    : "message--body--owner"
                }`}
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
