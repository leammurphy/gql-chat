import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import client from "./graphql/client";
import { messagesQuery } from "./graphql/queries";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";

const Chat = ({ user }) => {
  const { data } = useQuery(messagesQuery);
  // const [result, setResult] = useState({ loading: true });
  // client
  //   .query({ query: messagesQuery })
  //   .then(({ data }) => setResult({ loading: false, data }));
  const messages = data ? data.messages : [];

  const handleSend = (text) => {
    // TODO
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
