import { useAppSelector } from "@/hooks/useAppSelector";
import { Notification } from "@/features/notification/components/Notification";

export function NotificationsList() {
  const notifications = useAppSelector((state) => state.notifications);

  return (
    <div className="p-1 fixed z-10">
      {notifications.map((notificationProps) => (
        <Notification
          key={notificationProps.id}
          {...notificationProps}
        />
      ))}
    </div>
  );
}
