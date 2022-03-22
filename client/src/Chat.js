import { useQuery, useMutation } from "@apollo/react-hooks";
import React, { useState } from "react";
import client from "./graphql/client";
import { addMessageMutation, messagesQuery } from "./graphql/queries";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const Chat = ({ user }) => {
  const { data } = useQuery(messagesQuery);
  const [addMessage] = useMutation(addMessageMutation);
  // const [result, setResult] = useState({ loading: true });
  // client
  //   .query({ query: messagesQuery })
  //   .then(({ data }) => setResult({ loading: false, data }));
  const messages = data ? data.messages : [];

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
