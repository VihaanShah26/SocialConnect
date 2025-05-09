import React, { useState, useEffect } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { BsHeartFill } from 'react-icons/bs';
import { supabase } from '../utilities/Supabase';

const UserCard = ({ firstName, lastName, email, phone, interests }) => {
  const [liked, setLiked] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  useEffect(() => {
    const checkLiked = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserEmail(user.email);
        const { data, error } = await supabase
          .from('userInfo')
          .select('likedProfiles')
          .eq('email', user.email)
          .single();

        if (!error && data?.likedProfiles?.includes(email)) {
          setLiked(true);
        }
      }
    };
    checkLiked();
  }, [email]);

  const handleLike = async () => {
    if (!currentUserEmail) return;

    const { data, error } = await supabase
      .from('userInfo')
      .select('likedProfiles')
      .eq('email', currentUserEmail)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Fetch error:', error);
      return;
    }

    const currentLikes = data?.likedProfiles || [];

    let updatedLikes;
    if (liked) {
      updatedLikes = currentLikes.filter(e => e !== email);
    } else {
      updatedLikes = [...currentLikes, email];
    }

    const { error: updateError } = await supabase
      .from('userInfo')
      .update({ likedProfiles: updatedLikes })
      .eq('email', currentUserEmail);

    if (!updateError) {
      setLiked(!liked);
    } else {
      console.error('Update error:', updateError);
    }
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{firstName} {lastName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
        <Card.Text>
          <strong>Phone:</strong> {phone}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <strong>Interests:</strong>{' '}
            {interests.interests && interests.interests.length > 0 ? (
              interests.interests.slice(0, 4).map((interest, idx) => (
                <Badge bg="info" key={idx} className="me-1">
                  {interest.label}
                </Badge>
              ))
            ) : (
              <span>No interests listed</span>
            )}
          </div>
          <BsHeartFill
            size={20}
            style={{ cursor: 'pointer', color: liked ? 'red' : 'grey' }}
            onClick={handleLike}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;