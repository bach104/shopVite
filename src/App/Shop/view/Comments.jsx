import { useState, useEffect } from "react";
import AddComments from "./AddComments";
import {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useReplyToCommentMutation, // Sử dụng mutation này
} from "../../../redux/features/comment/commentApi";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../../../utils/baseURL";
import avatarImg from "../../../assets/img/avatar.png";

const Comment = ({ comment, isReply = false, onDelete, onEdit, onReply }) => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [replyContent, setReplyContent] = useState("");

  const isCurrentUserComment =
    user && comment && user._id?.toString() === comment.userId?.toString();

  const handleSaveEdit = () => {
    onEdit(comment._id, editedContent);
    setIsEditing(false);
  };

  const handleReply = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để trả lời bình luận!");
      return;
    }
    setIsReplying((prev) => !prev);
  };

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      onReply(comment._id, replyContent); // Gọi hàm onReply từ props
      setReplyContent("");
      setIsReplying(false);
    }
  };

  const avatarUrl = comment.avatar
    ? `${getBaseUrl()}/${comment.avatar.replace(/\\/g, "/")}`
    : avatarImg;

  return (
    <div className={`p-3 ${isReply ? "ml-8" : "bg-gray-100"} rounded-md mb-2`}>
      <div className="flex items-start space-x-3">
        <img
          src={avatarUrl}
          className="w-10 h-10 rounded-full"
          alt="Avatar"
          onError={(e) => (e.target.src = avatarImg)}
        />
        <div className="w-full">
          <p className="font-bold text-sm">{comment.yourname}</p>
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          ) : (
            <p className="text-gray-700 text-sm">{comment.content}</p>
          )}
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
            <div className="flex space-x-2">
              {isCurrentUserComment && (
                <>
                  <p
                    className="hover:text-blue-500 font-bold cursor-pointer"
                    onClick={() => onDelete(comment._id)}
                  >
                    Xoá
                  </p>
                  {isEditing ? (
                    <p
                      className="hover:text-blue-500 font-bold cursor-pointer"
                      onClick={handleSaveEdit}
                    >
                      Lưu
                    </p>
                  ) : (
                    <p
                      className="hover:text-blue-500 font-bold cursor-pointer"
                      onClick={() => setIsEditing(true)}
                    >
                      Sửa
                    </p>
                  )}
                </>
              )}
              <p
                className="hover:text-blue-500 font-bold cursor-pointer"
                onClick={handleReply}
              >
                Trả lời
              </p>
            </div>
          </div>

          {isReplying && (
            <div className="mt-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Viết bình luận của bạn..."
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={handleSubmitReply}
              >
                Gửi
              </button>
            </div>
          )}
        </div>
      </div>

      {Array.isArray(comment.replies) && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply, index) => (
            <Comment
              key={reply._id || index} // Đảm bảo key hợp lệ
              comment={reply}
              isReply={true}
              onDelete={onDelete}
              onEdit={onEdit}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Comments = ({ productId }) => {
  const [showAddComments, setShowAddComments] = useState(false);
  const { data: comments = [], isLoading, isError } = useGetCommentsQuery(productId);
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [replyToComment] = useReplyToCommentMutation(); // Sử dụng mutation này
  const { user } = useSelector((state) => state.auth);
  const [localComments, setLocalComments] = useState([]);

  useEffect(() => {
    if (!isLoading && !isError && comments) {
      setLocalComments(comments);
    }
  }, [comments, isLoading, isError]);

  const handleCommentClick = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }
    setShowAddComments((prev) => !prev);
  };

  const handleCloseComments = () => {
    setShowAddComments(false);
  };

  const handleAddComment = async (comment) => {
    if (!user) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }

    try {
      const newComment = await addComment({
        content: comment,
        productId,
        userId: user._id,
      }).unwrap();

      setLocalComments((prevComments) => [newComment, ...prevComments]);
      setShowAddComments(false);
    } catch (error) {
      console.error("Lỗi khi thêm bình luận:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId).unwrap();
      setLocalComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Lỗi khi xoá bình luận:", error);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    try {
      await editComment({ id: commentId, content: newContent }).unwrap();
      setLocalComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? { ...comment, content: newContent } : comment
        )
      );
    } catch (error) {
      console.error("Lỗi khi sửa bình luận:", error);
    }
  };

  const handleReplyComment = async (commentId, replyContent) => {
    if (!user) {
      alert("Bạn cần đăng nhập để trả lời bình luận!");
      return;
    }

    const payload = {
      content: replyContent,
      commentId: String(commentId), 
      images: [], 
      videos: [], 
    };

    console.log("Dữ liệu gửi lên server:", payload);

    try {
      const newReply = await replyToComment(payload).unwrap();

      setLocalComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [newReply.reply, ...(comment.replies || [])] }
            : comment
        )
      );
    } catch (error) {
      console.error("Lỗi khi thêm trả lời:", error);
      if (error.data) {
        console.error("Chi tiết lỗi từ server:", error.data);
      }
    }
  };

  return (
    <div className="max-width mx-auto bg-gray-200">
      <div className="flex p-4 justify-between items-center">
        <h2 className="text-2xl font-bold">Bình luận sản phẩm</h2>
        <p
          className="hover:text-blue-500 font-bold cursor-pointer"
          onClick={handleCommentClick}
        >
          Bình luận
        </p>
      </div>
      <div className="bg-white p-4">
        {showAddComments && (
          <AddComments
            onClose={handleCloseComments}
            onSubmit={(comment) => handleAddComment(comment)}
            user={user}
          />
        )}
        {isLoading ? (
          <p>Đang tải bình luận...</p>
        ) : isError ? (
          <p>Đã có lỗi xảy ra khi tải bình luận.</p>
        ) : localComments.length === 0 ? (
          <p>Chưa có bình luận nào.</p>
        ) : (
          localComments.map((comment, index) => (
            <Comment
              key={comment._id || index} 
              comment={comment}
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
              onReply={handleReplyComment}
            />
          ))
        )}
      </div>
      <button className="text-sm text-black font-semibold py-3 block text-right w-full">
        Xem thêm bình luận &gt;
      </button>
    </div>
  );
};

export default Comments;