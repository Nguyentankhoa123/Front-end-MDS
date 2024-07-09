"use client";
import { User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import logo from "@images/banner/logo-mds.png";
import Image from "next/image";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { useCookies } from "next-client-cookies";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { CommentProps, ProductProps } from "../productlist/ProductList";
import dayjs from "dayjs";

interface MyToken extends JwtPayload {
  given_name: string;
  family_name: string;
  nameid: string;
  role: string;
}

type IProps = {
  product: ProductProps;
};

const Comment = (props: IProps) => {
  const { product } = props;
  const [commentText, setCommentText] = useState<string>("");
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [isOpenReplyComment, setIsOpenReplyComment] = useState(false);
  const [replyToCommentId, setReplyToCommentId] = useState<number | null>(null);

  const [comments, setComments] = useState<CommentProps[]>([]);

  const cookies = useCookies();
  const token = cookies.get("accessToken");
  let userId: string | undefined;
  let fullName: string | undefined;
  let role: string | undefined;
  if (token) {
    const decodeToken = jwtDecode<MyToken>(token);
    userId = decodeToken.nameid;
    fullName = `${decodeToken.given_name} ${decodeToken.family_name}`;
    role = decodeToken.role;
  }

  const fetchComments = async () => {
    const res = await fetch(`https://localhost:7151/api/Product/${product.id}`);
    const data = await res.json();
    setComments(data.data.comments);
  };

  const handleComment = async () => {
    try {
      const res = await fetch(`https://localhost:7151/api/Comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: userId,
          ProductId: product.id,
          Content: commentText,
          IsQuestion: true,
          Date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        }),
      });
      if (res.ok) {
        setReplyToCommentId(null);
        setIsOpenComment(false);
        setCommentText("");
        toast.success("Bình luận đã được gửi");
        fetchComments();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyClick = (commentId: number) => {
    setReplyToCommentId(commentId);
    setIsOpenReplyComment(true);
  };

  const handleReplyComment = async (parentCommentId: number) => {
    try {
      const res = await fetch(`https://localhost:7151/api/Comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: userId,
          ProductId: product.id,
          Content: commentText,
          IsQuestion: true,
          ParentId: parentCommentId,
          Date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        }),
      });
      if (res.ok) {
        setReplyToCommentId(null);
        setCommentText("");
        toast.success("Bình luận đã được gửi");
        fetchComments();
      }
    } catch (error) {}
  };

  const handleOpenComment = () => {
    if (!userId) {
      toast.error("Bạn cần đăng nhập để gửi bình luận.");
      return;
    }
    setIsOpenComment(true);
  };

  const formatDate = (commentDate: Date) => {
    const parsedDate = dayjs(commentDate);

    const formattedDate = parsedDate.format("DD/MM/YYYY HH:mm");
    return formattedDate;
  };

  useEffect(() => {
    fetchComments();
  }, []);

  console.log("parentId", comments);
  return (
    <>
      <div>
        <h4 className="mb-5 text-[18px]">
          Hỏi Đáp <span className="text-blue-700">({comments.length})</span>
        </h4>
        <AlertDialog open={isOpenComment}>
          <button
            onClick={handleOpenComment}
            className="px-3 py-2 mb-5 text-white bg-blue-500 rounded-xl"
          >
            Gửi bình luận
          </button>
          <AlertDialogContent>
            <AlertDialogTitle className="flex items-center text-center">
              <span className="flex-1">
                Người dùng: <span className="text-blue-400">{fullName}</span>
              </span>
              <X
                onClick={() => setIsOpenComment(false)}
                className="cursor-pointer"
              />
            </AlertDialogTitle>
            <div>
              <textarea
                name=""
                id=""
                className="w-full px-4 py-3 border rounded-lg resize-none focus:border-[#1250dc] outline-none"
                rows={5}
                placeholder="Nhập nội dung hỏi đáp..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-xl"
              onClick={handleComment}
            >
              <span>Gửi</span>
            </button>
          </AlertDialogContent>
        </AlertDialog>

        <div className="text-sm md:rounded-md md:border md:border-neutral-200 md:text-base">
          {comments.map((comment) => (
            <div>
              {!comment.parentId ? (
                <div className="px-4 pt-3 pb-0 md:p-4" key={comment.id}>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center flex-1 gap-x-3 ">
                      <div className="flex items-center justify-center rounded-full h-9 w-9 md:h-12 md:w-12 bg-[#C1C8D1]">
                        <User color="white" size={30} />
                      </div>
                      <div className="flex gap-3">
                        <span className="font-medium">{comment.fullName}</span>
                        {role === "Admin" && (
                          <button
                            className="text-blue-600"
                            onClick={() => handleReplyClick(comment.id)}
                          >
                            Trả lời
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-xs text-right text-neutral-700 md:text-sm">
                      {formatDate(comment.date)}
                    </div>
                  </div>
                  <div className="pt-3">
                    <p>{comment.content}</p>
                  </div>

                  {replyToCommentId === comment.id && (
                    <AlertDialog open={isOpenReplyComment}>
                      <AlertDialogContent>
                        <AlertDialogTitle className="flex items-center text-center">
                          <span className="flex-1">
                            Người dùng:{" "}
                            <span className="text-blue-400">{fullName}</span>
                          </span>
                          <X
                            onClick={() => setIsOpenReplyComment(false)}
                            className="cursor-pointer"
                          />
                        </AlertDialogTitle>
                        <div>
                          <textarea
                            name=""
                            id=""
                            className="w-full px-4 py-3 border rounded-lg resize-none focus:border-[#1250dc] outline-none"
                            rows={5}
                            placeholder="Nhập nội dung hỏi đáp..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          ></textarea>
                        </div>
                        <button
                          className="px-4 py-2 text-white bg-blue-500 rounded-xl"
                          onClick={() => handleReplyComment(comment.id)}
                        >
                          <span>Gửi</span>
                        </button>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ) : (
                // comment con có parentId

                <div className="w-full px-4 pt-3 pb-0 h-fit md:p-4 bg-[#EBF3FA]">
                  <div className="px-4 pt-3 pb-0 md:p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center flex-1 gap-x-3 ">
                        <div className="flex items-center justify-center bg-blue-700 rounded-full h-9 w-9 md:h-12 md:w-12">
                          <Image src={logo} alt="" />
                        </div>
                        <div className="flex gap-2">
                          <span className="font-medium">
                            {comment.fullName}
                          </span>
                          <span className="text-white rounded-sm bg-blue-500 px-[4px] py-[1px] font-medium text-[14px]">
                            Admin
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-right text-neutral-700 md:text-sm">
                        {formatDate(comment.date)}
                      </div>
                    </div>
                    <div className="pt-3">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comment;
