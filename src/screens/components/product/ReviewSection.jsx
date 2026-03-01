import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { COLORS, FONTS, SIZES } from '../../utils/colors';

export default function ReviewSection({ reviews, productId, onAddReview }) {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot', time: '10:00 AM' }
  ]);

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const sendMessage = () => {
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        { id: Date.now(), text: message, sender: 'user', time: new Date().toLocaleTimeString() }
      ]);
      setMessage('');

      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: 'Thanks for your message! Our team will get back to you soon.',
          sender: 'bot',
          time: new Date().toLocaleTimeString()
        }]);
      }, 1000);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="star"
        size={14}
        color={i < rating ? '#FFD700' : COLORS.border}
        solid={i < rating}
      />
    ));
  };

  const renderChat = () => (
    <View style={styles.chatContainer}>
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Customer Support</Text>
        <TouchableOpacity onPress={() => setShowChat(false)}>
          <Icon name="x" size={20} color={COLORS.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.chatMessages}>
        {chatMessages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.sender === 'user' ? styles.userMessageRow : styles.botMessageRow
            ]}
          >
            {msg.sender === 'bot' && (
              <View style={styles.botAvatar}>
                <Icon name="headphones" size={16} color={COLORS.primary} />
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userBubble : styles.botBubble
              ]}
            >
              <Text style={[
                styles.messageText,
                msg.sender === 'user' && styles.userMessageText
              ]}>
                {msg.text}
              </Text>
              <Text style={styles.messageTime}>{msg.time}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.chatInputContainer}>
        <TextInput
          style={styles.chatInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          placeholderTextColor={COLORS.text.hint}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reviews</Text>
        <TouchableOpacity style={styles.chatButton} onPress={() => setShowChat(!showChat)}>
          <Icon name="message-circle" size={20} color={COLORS.primary} />
          <Text style={styles.chatButtonText}>Chat with us</Text>
        </TouchableOpacity>
      </View>

      {showChat ? (
        renderChat()
      ) : (
        <>
          <View style={styles.ratingSummary}>
            <View style={styles.averageRating}>
              <Text style={styles.averageRatingText}>{averageRating.toFixed(1)}</Text>
              <View style={styles.stars}>
                {renderStars(Math.round(averageRating))}
              </View>
              <Text style={styles.totalReviews}>({reviews.length} reviews)</Text>
            </View>
          </View>

          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.userAvatar }} style={styles.userAvatar} />
                <View style={styles.reviewInfo}>
                  <Text style={styles.userName}>{review.userName}</Text>
                  <View style={styles.reviewRating}>
                    {renderStars(review.rating)}
                  </View>
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Text style={styles.reviewText}>{review.comment}</Text>
            </View>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.large
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.large
  },
  title: {
    fontSize: FONTS.sizes.large,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.radius.large
  },
  chatButtonText: {
    marginLeft: SIZES.small,
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.medium,
    color: COLORS.primary
  },
  ratingSummary: {
    alignItems: 'center',
    marginBottom: SIZES.large
  },
  averageRating: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  averageRatingText: {
    fontSize: FONTS.sizes.xxxlarge,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary,
    marginRight: SIZES.small
  },
  stars: {
    flexDirection: 'row',
    marginRight: SIZES.small
  },
  totalReviews: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  reviewItem: {
    marginBottom: SIZES.large,
    paddingBottom: SIZES.large,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: SIZES.small
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.small
  },
  reviewInfo: {
    flex: 1
  },
  userName: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.medium,
    color: COLORS.text.primary,
    marginBottom: 2
  },
  reviewRating: {
    flexDirection: 'row'
  },
  reviewDate: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint
  },
  reviewText: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.regular,
    color: COLORS.text.secondary,
    lineHeight: 20
  },
  chatContainer: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius.large,
    padding: SIZES.medium,
    minHeight: 400
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium
  },
  chatTitle: {
    fontSize: FONTS.sizes.medium,
    fontFamily: FONTS.bold,
    color: COLORS.text.primary
  },
  chatMessages: {
    flex: 1,
    marginBottom: SIZES.medium
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: SIZES.medium
  },
  userMessageRow: {
    justifyContent: 'flex-end'
  },
  botMessageRow: {
    justifyContent: 'flex-start'
  },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.small
  },
  messageBubble: {
    maxWidth: '70%',
    padding: SIZES.small,
    borderRadius: SIZES.radius.medium
  },
  userBubble: {
    backgroundColor: COLORS.primary
  },
  botBubble: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  messageText: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    marginBottom: 2
  },
  userMessageText: {
    color: COLORS.white
  },
  messageTime: {
    fontSize: FONTS.sizes.small,
    fontFamily: FONTS.regular,
    color: COLORS.text.hint,
    alignSelf: 'flex-end'
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  chatInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius.large,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    marginRight: SIZES.small,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});