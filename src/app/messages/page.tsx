"use client";

import type React from "react";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Send, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardLayout from "@/components/dashboard-layout";

// Sample data - would come from API
const conversations = [
  {
    id: "1",
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "online",
      lastSeen: new Date(),
    },
    lastMessage: {
      text: "Perfect, see you tomorrow at the marina!",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unread: true,
    },
  },
  {
    id: "2",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "offline",
      lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    lastMessage: {
      text: "Could you share more details about the boat?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      unread: false,
    },
  },
  {
    id: "3",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      status: "online",
      lastSeen: new Date(),
    },
    lastMessage: {
      text: "The weather looks great for sailing!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unread: false,
    },
  },
];

const messages = [
  {
    id: "1",
    senderId: "user",
    text: "Hi, I'm interested in booking your boat for next weekend.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: "2",
    senderId: "other",
    text: "Hello! Sure, I'd be happy to help. Which dates are you looking at specifically?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 hours ago
  },
  {
    id: "3",
    senderId: "user",
    text: "I'm thinking next Saturday from 10 AM to 4 PM.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
  },
  {
    id: "4",
    senderId: "other",
    text: "Perfect, the boat is available at that time. Would you like me to send you a booking confirmation?",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "5",
    senderId: "user",
    text: "Yes, please! That would be great.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
  {
    id: "6",
    senderId: "other",
    text: "I've sent the booking confirmation to your email. Let me know if you need anything else!",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to the API
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-60px)] flex-col lg:flex-row">
        {/* Conversations List */}
        <div className="w-full border-r lg:w-80">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="space-y-2 p-4">
              {filteredConversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full rounded-lg p-3 text-left transition-colors hover:bg-accent ${
                    selectedConversation?.id === conversation.id
                      ? "bg-accent"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage
                          src={conversation.user.avatar}
                          alt={conversation.user.name}
                        />
                        <AvatarFallback>
                          {conversation.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.user.status === "online" && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {conversation.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(conversation.lastMessage.timestamp, "HH:mm")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm text-muted-foreground">
                          {conversation.lastMessage.text}
                        </span>
                        {conversation.lastMessage.unread && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex flex-1 flex-col">
            {/* Chat Header */}
            <div className="flex h-14 items-center justify-between border-b px-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={selectedConversation.user.avatar}
                    alt={selectedConversation.user.name}
                  />
                  <AvatarFallback>
                    {selectedConversation.user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {selectedConversation.user.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {selectedConversation.user.status === "online"
                      ? "Online"
                      : `Last seen ${format(
                          selectedConversation.user.lastSeen,
                          "HH:mm"
                        )}`}
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.senderId === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {format(message.timestamp, "HH:mm")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-muted-foreground">
              Select a conversation to start messaging
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
