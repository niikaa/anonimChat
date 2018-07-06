export const API_BASE_URL = 'http://localhost:3000'
export const BASE_URL = 'http://localhost:8080'

export const getActiveFriends = API_BASE_URL + '/connections/active_friends'
//--------green-chat--------//
export const createGreenConversation = API_BASE_URL + '/green_chat/create_new_conversation'
export const sendGreenMessage = API_BASE_URL + '/green_chat/add_message'
export const getConversationsGreen = API_BASE_URL + '/conversations/get_conversations_green'
export const getConversationGreen = API_BASE_URL + '/conversations/get_conversation_green'

//--------blue-chat--------//
export const createBlueConversation = API_BASE_URL + '/blue_chat/create_new_conversation'
export const sendBlueMessage = API_BASE_URL + '/blue_chat/add_message'

//--------red-chat--------//
export const createRedConversation = API_BASE_URL + '/red_chat/create_new_conversation'
export const sendRedMessage = API_BASE_URL + '/red_chat/add_message'

export const openGreenConversation = API_BASE_URL + '/conversations/open_green_conversation'
