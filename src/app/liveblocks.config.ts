import { LiveList, LiveObject, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 100,
});

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  boardId?: null | string;
  cardId?: null | string;
};

// ES COMO UNA BASE DE DATOS DE SQL, aca creo los tipos y los hago relacionales 

export type Column = {
  id: string,
  name: string,
  index: number,
}

export type Card = {
  id: string,
  name: string,
  index: number,
  // cada card (osea tarea que cree en las columnas) hago que tenga un id de la columna en donde se creo
  columnId: string,
}
// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  columns: LiveList<LiveObject<Column>>,
  cards: LiveList<LiveObject<Card>>,
};

// Optionally, UserMeta represents static/readonly metadata on each user, as
// provided by your own custom auth back end (if used). Useful for data that
// will not change during a session, like a user's name or avatar.
type UserMeta = {
  id: string; // Accessible through `user.id`
  info: {
    name: string;
    email: string;
    image: string;
  }; // Accessible through `user.info`
};

// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
type RoomEvent = {};

// Optionally, when using Comments, ThreadMetadata represents metadata on
// each thread. Can only contain booleans, strings, and numbers.
type ThreadMetadata = {
  cardId: string;
};


export const {
  RoomProvider,
  useMyPresence,
  useUpdateMyPresence,
  useStorage,
  useMutation,
  useRoom,
  useSelf,
  useOthers,
  useThreads,
  /* ...all the other hooks you’re using... */
} = createRoomContext<
  Presence,
  Storage,
  UserMeta,
  RoomEvent,
  ThreadMetadata
>(client, {
  // Get users' info from their ID
  resolveUsers: async ({ userIds }) => {
    const searchParams = new URLSearchParams(
      userIds.map((userId) => ["userIds", userId])
    );
    //  la data que trae URLSearchParams podemos verla en network de la consola como una petición
    try {
      const response = await fetch(`/api/users?${searchParams}`);

      return response.json();
    } catch (error) {
      console.error(500, error);
    }
  },
   // Find a list of users that match the current search term
   resolveMentionSuggestions: async ({ text }) => {
    try {
      const response = await fetch(`/api/users?search=`+text);
      const users = await response.json();
      return users.map((user:UserMeta) => user.id);

    } catch (error) {
      console.error(456, error);
    }
  },
});