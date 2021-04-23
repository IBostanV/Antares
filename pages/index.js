import React from "react";
import Link from "next/link";

const Index = () => {
  return (
    <div className="index">
      <Link href="/chat">
        <a>Navigate to chat</a>
      </Link>
      <Link href="/server-sent-events">
        <a>Navigate to sse</a>
      </Link>
    </div>
  )
}

export default Index;
