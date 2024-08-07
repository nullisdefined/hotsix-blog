import { FC } from "react";
import { IPost } from "../../../types";
import { BsFillChatSquareHeartFill, BsFillHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Card.css";

type TPostProps = {
  post: IPost;
};

const Card: FC<TPostProps> = ({ post }) => {
  const firstImageMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
  const firstImageUrl = firstImageMatch ? firstImageMatch[1] : null;
  const contentWithoutImages = post.content.replace(/<img[^>]*>/g, "");

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <div className="Card">
      <Link to={`/posts/${post.articleId}`}>
        <div className="CardContent">
          <div
            className="Image"
            style={{
              height: "250px",
              backgroundColor: firstImageUrl ? "transparent" : "#f0f0f0",
            }}
          >
            {firstImageUrl ? (
              <img
                src={firstImageUrl}
                alt={post.title}
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "250px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  className="text-6xl font-bold text-gray p-10"
                  style={{ wordBreak: "break-all" }}
                >
                  {truncateText(post.title, 16)}
                </p>
              </div>
            )}
          </div>
          <div className="TextContent">
            <div className="Title">
              <h3 className="text-xl font-bold">
                {truncateText(post.title, 30)}
              </h3>
            </div>
            <div className="Description">
              <p
                dangerouslySetInnerHTML={{
                  __html: truncateText(contentWithoutImages, 100).replace(
                    /\n/g,
                    "<br />"
                  ),
                }}
              ></p>
            </div>
          </div>
        </div>
        <div className="CardFooter">
          <div className="UserInfo">
            {post.profileImg ? (
              <img
                src={post.profileImg}
                alt={`${post.nickname}'s profile`}
                className="ProfileImage"
              />
            ) : (
              <div className="DefaultProfileImage"></div>
            )}
            <span className="Nickname">{post.nickname}</span>
          </div>
          <span className="Date">
            {new Date(post.createdAt).toLocaleDateString("ko-KR", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
          <span className="Interactions">
            <BsFillHeartFill className="mr-1" />
            {post.likes}
            <BsFillChatSquareHeartFill className="ml-3 mr-1" />
            {post.commentCount}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Card;
