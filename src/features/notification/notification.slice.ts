import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { NotificationProps } from "@/features/notification/components/Notification";

export type NotificationsState = NotificationProps[];

const initialState: NotificationsState = [];

export type AddNotificationPayload = Omit<NotificationProps, "id">;

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AddNotificationPayload>) => {
      const newNotification = {
        ...action.payload,
        id: uuid(),
      };

      const isDuplicate = state.some((notification) => notification.text === newNotification.text);

      if (!isDuplicate) {
        state.push(newNotification);
      }
    },
    removeNotification: (state, action: PayloadAction<{id: string}>) => {
      const { id } = action.payload;

      return state.filter((notification) => notification.id !== id);
    }
  }
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
