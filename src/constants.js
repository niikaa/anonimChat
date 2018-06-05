export const API_BASE_URL = 'http://localhost:3000'
export const BASE_URL = 'http://localhost:8080'

export const getActiveFriends = API_BASE_URL + '/connections/active_friends'
//--------green-chat--------//
export const createGreenConversation = API_BASE_URL + '/green_chat/create_new_conversation'
export const sendGreenMessage = API_BASE_URL + '/green_chat/add_message'
export const getConversations = API_BASE_URL + '/conversations/get_conversations_green'
