import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
import React from "react";
import client from "./graphql/client";
import {
  addMessageMutation,
  messagesQuery,
  messageAddedSubscription,
} from "./graphql/queries";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

function useChatMessages() {
  const { data } = useQuery(messagesQuery);
  const messages = data ? data.messages : [];
  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      });
    },
  });
  const [addMessage] = useMutation(addMessageMutation);
  return {
    messages,
    addMessage,
  };
}

const Chat = ({ user }) => {
  const { messages, addMessage } = useChatMessages();

  const handleSend = async (text) => {
    const { data } = await addMessage({ variables: { input: { text } } });
    console.log("mutation data", data);
  };
  return (
    <section className="section">
      <div className="container">
        <h1 className="title">Chatting as {user}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
};

export default Chat;
