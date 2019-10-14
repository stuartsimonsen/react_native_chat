import gql from 'graphql-tag';

export const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($userId: Int!, $chatId: Int!, $text: String!) {
    createMessage(userId: $userId, chatId: $chatId, text: $text) {
      id
      from {
        id
        username
      }
      createdAt
      text
    }
  }
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation createChat($userId: Int!, $contactId: Int!) {
    createChat(userId: $userId, contactId: $contactId) {
      id
      users {
        id
        username
      }
    }
  }
`;

export const CREATE_GROUP_MUTATION = gql`
  mutation createGroup($group: CreateGroupInput!) {
    createGroup(group: $group) {
      id
      name
      avatar
      description
      owner {
        id
        username
      }
      chat {
        messages {
          id
          text
          createdAt
          from {
            id
            username
            avatar
          }
        }
      }
    }
  }
`;
