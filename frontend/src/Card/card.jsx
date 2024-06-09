import React, { useState, useEffect, useContext } from 'react';
import './card.css';
import { UilHeart, UilCommentAltDots, UilMessage } from '@iconscout/react-unicons';
import axios from 'axios';
import { UserContext } from '../UserContext';

function Feed({ profilePic, userName, photoSrc, likedBy, caption, comments, id_post }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`https://f171-190-80-245-16.ngrok-free.app/api/likes/${id_post}/${user.id_usuario}`);
        setLikeCount(response.data.likeCount);
        setLiked(response.data.userLiked);
      } catch (err) {
        console.log("Error al obtener la cantidad de likes:", err);
      }
    };
    fetchLikes();
    const interval = setInterval(fetchLikes, 5000);

    return () => clearInterval(interval);
  }, [id_post, user.id_usuario]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      console.log("El comentario no puede estar vacío");
      return;
    }
    
    try {
      const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/api/comments", {
        comentario: newComment,
        id_post: id_post,
        id_usuario: user.id_usuario
      });
      setNewComment('');
    } catch (err) {
      console.log("Error al enviar comentario", err);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleLike = async () => {
    try {
      const response = await axios.post("https://f171-190-80-245-16.ngrok-free.app/api/like", {
        id_post: id_post,
        id_usuario: user.id_usuario
      });
      setLiked(true);
      setLikeCount(likeCount + 1); // Incrementar el contador de likes localmente
    } catch (err) {
      console.log("Error al dar like:", err);
    }
  };

  return (
    <main>
      <div className="middle"></div>
      <div className="feed">
        <div className="head"></div>
        <div className="user">
          <div className="profile-pic">
            <img src={profilePic} alt="" />
          </div>
          <div className="info">
            <h3>{userName}</h3>
          </div>
        </div>
        <div className="photo">
          <img src={photoSrc} alt="" className="photo-image" />
        </div>
        <div className="caption">
          <p>{caption}</p>
        </div>
        <div className="action-button">
          <button onClick={handleLike}>
            {liked ? <UilHeart color="red" /> : <UilHeart />} 
          </button><span>{likeCount}</span>
          <button onClick={toggleComments}><i><UilCommentAltDots /></i></button>
        </div>
        {showComments && (
          <div className="comments">
            <form className="comments-form" onSubmit={handleSubmit}>
              <input type="text" name="comentario" className='Post_comment' value={newComment} onChange={handleChange} /> 
              <input type="hidden" name="id_post" value={id_post} />
              <button type="submit" value="Enviar" className='btn_comment' ><i><UilMessage /></i></button>
            </form>
            <div className="cuadro_comments">
              <ul>
                {comments.map((comment, index) => (
                  <li key={index}>
                    <strong>{comment.user}: </strong>
                    {comment.content}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Feed;
