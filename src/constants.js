export const API_BASE_URL = 'https://anonimchats.com:3000'
export const BASE_URL = 'https://anonimchats.com'

export const getActiveFriends = API_BASE_URL + '/connections/active_friends'

export const getConversation = API_BASE_URL + '/conversations/get_conversation'
export const openConversation = API_BASE_URL + '/conversations/open_conversation'
export const getNotifications = API_BASE_URL + '/conversations/get_notification'
export const getMessages = API_BASE_URL + '/conversations/get_messages'


//--------green-chat--------//
export const createGreenConversation = API_BASE_URL + '/chat/create_new_conversation'
export const sendMessage = API_BASE_URL + '/chat/add_message'
export const getConversationsGreen = API_BASE_URL + '/conversations/get_conversations_green'

//--------blue-chat--------//
export const createBlueConversation = API_BASE_URL + '/chat/create_new_conversation'
export const sendBlueMessage = API_BASE_URL + '/chat/add_message'
export const getConversationsBlue = API_BASE_URL + '/conversations/get_conversations_blue'

//--------red-chat--------//
export const createRedConversation = API_BASE_URL + '/chat/create_new_conversation'
export const sendRedMessage = API_BASE_URL + '/chat/add_message'
export const getConversationsRed = API_BASE_URL + '/conversations/get_conversations_red'
