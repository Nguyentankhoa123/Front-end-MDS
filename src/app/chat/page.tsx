// "use client";
// import React, { useEffect, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import { useCookies } from "next-client-cookies";
// import { JwtPayload, jwtDecode } from "jwt-decode";
// import { useChatStore } from "@/store/chat";

// interface MyToken extends JwtPayload {
//   given_name: string;
//   family_name: string;
//   nameid: string;
// }

// interface Message {
//   user: string;
//   message: string;
// }

// const Chat = () => {
//   const { isOpenChat, roomName, setIsOpenChat, setRoomName } = useChatStore(); // Use Zustand store
//   const [hubConnection, setHubConnection] =
//     useState<signalR.HubConnection | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");

//   const cookies = useCookies();
//   const token = cookies.get("accessToken");
//   let fullName: string;
//   if (token) {
//     const decodeToken = jwtDecode<MyToken>(token);
//     fullName = `${decodeToken?.given_name} ${decodeToken?.family_name}`;
//   }

//   useEffect(() => {
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:7151/chat-hub")
//       .configureLogging(signalR.LogLevel.Information)
//       .build();

//     connection
//       .start()
//       .then(() => console.log("Connection started!"))
//       .catch((err) =>
//         console.log("Error while establishing connection :(", err)
//       );

//     connection.on("ReceiveMessage", (user, receivedMessage) => {
//       const newMessage = { user, message: receivedMessage };
//       console.log(newMessage);
//       setMessages((messages) => [
//         ...messages,
//         { user, message: receivedMessage },
//       ]);
//     });

//     setHubConnection(connection);

//     return () => {
//       connection.stop();
//     };
//   }, []);

//   const joinGroup = async () => {
//     if (hubConnection) {
//       try {
//         await hubConnection.invoke("JoinGroup", roomName);
//         console.log(`Joined group: ${roomName}`);
//       } catch (error) {
//         console.error(`Error joining group: ${error}`);
//       }
//     }
//   };

//   const leaveGroup = async () => {
//     if (hubConnection) {
//       try {
//         await hubConnection.invoke("LeaveGroup", roomName);
//         console.log(`Left group: ${roomName}`);
//       } catch (error) {
//         console.error(`Error leaving group: ${error}`);
//       }
//     }
//   };

//   const sendMessage = async () => {
//     if (hubConnection) {
//       try {
//         await hubConnection.invoke(
//           "SendMessageToGroup",
//           roomName,
//           fullName,
//           message
//         );
//         setMessage("");
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   return (
//     <>
//       <div className="fixed bottom-0 right-0 mb-4 mr-4">
//         <button
//           id="open-chat"
//           className="flex items-center px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
//           type="button"
//           onClick={() => setIsOpenChat(!isOpenChat)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-6 h-6 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               stroke-linecap="round"
//               stroke-linejoin="round"
//               stroke-width="2"
//               d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//             ></path>
//           </svg>
//           Chat with Admin Bot
//         </button>
//       </div>
//       {isOpenChat && (
//         <div id="chat-container" className="fixed max-w-lg bottom-16 right-4 ">
//           <div className="w-full bg-white border">
//             <div className="flex items-center justify-between p-4 text-white bg-blue-500 border-b ">
//               <p className="text-lg ">Admin Bot</p>
//               <button
//                 id="close-chat"
//                 className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
//                 onClick={() => {
//                   leaveGroup();
//                   setIsOpenChat(false);
//                 }}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-6 h-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   ></path>
//                 </svg>
//               </button>
//             </div>
//             <div id="chatbox" className="p-4 overflow-y-auto bg-gray-100 h-80">
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   placeholder="Enter room name"
//                   className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={roomName}
//                   onChange={(e) => setRoomName(e.target.value)}
//                 />
//                 <button
//                   id="join-room"
//                   className="px-4 py-2 mt-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
//                   onClick={joinGroup}
//                 >
//                   Join Room
//                 </button>
//               </div>
//               {messages.map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`mb-2 flex ${
//                     msg.user === fullName ? "justify-end" : ""
//                   }`}
//                 >
//                   <p
//                     className={`p-2 max-w-[260px] break-words ${
//                       msg.user === fullName
//                         ? "text-black bg-blue-200"
//                         : "text-black bg-gray-300"
//                     } rounded-lg`}
//                   >
//                     {msg.message}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <div className="flex p-4 border-t">
//               <input
//                 type="text"
//                 placeholder="Type a message"
//                 className="flex-1 px-4 py-2 border rounded-full focus:outline-none"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//               />
//               {/* <button
//                 id="send-button"
//                 className="px-4 py-2 text-white transition duration-300 bg-blue-500 rounded-r-md hover:bg-blue-600"
//                 onClick={sendMessage}
//               >
//                 Gửi
//               </button> */}
//               <button
//                 className="p-2 ml-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none"
//                 onClick={sendMessage}
//               >
//                 <svg
//                   width="20px"
//                   height="20px"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   stroke="#ffffff"
//                 >
//                   <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                   <g
//                     id="SVGRepo_tracerCarrier"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                   ></g>
//                   <g id="SVGRepo_iconCarrier">
//                     {" "}
//                     <path
//                       d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
//                       stroke="#ffffff"
//                       stroke-width="2"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                     ></path>{" "}
//                   </g>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chat;
