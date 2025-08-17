import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useApiClients } from "@/hooks/UseApiClients";
import { NotificationDto } from "@/client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroller";
import { twMerge } from "tailwind-merge";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isLoading } = useAuth0();
  const router = useRouter();
  const api = useApiClients();

  useEffect(() => {
    async function fetchNotifications() {
      if (isLoading) return;

      if (!isAuthenticated) {
        router.push("/");
        return;
      }

      try {
        setLoading(true);
        const data = await api.getNotifications();
        if (data.notifications.length > 0) {
        await api.markNotificationsAsRead({
          readNotificationDto: {
            timestamp: data.notifications[0].createdAt.toISOString(),
            notificationId: data.notifications[0].id,
          },
          });
        }
        setNotifications(data.notifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, [isAuthenticated, isLoading, router, api]);

  const loadMore = async () => {
    const result = await api.getNotifications({
      timestamp: notifications[notifications.length - 1].createdAt.toISOString(),
      notificationId: notifications[notifications.length - 1].id,
    });
    if (result.notifications.length === 0) {
      setHasMore(false);
    }
    setNotifications([...notifications, ...result.notifications]);
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">通知</h1>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="size-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <p className="text-gray-600">通知はありません</p>
        </div>
      ) : (
        <div className="space-y-4">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMore}
            loader={
              <div className="mx-0 my-auto flex items-center" key={0}>
                <ReactLoading type="spokes" color="#ccc" height={30} width={30} />
              </div>
            }
          >
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={twMerge(
                  "rounded-lg p-4 shadow-md border border-gray-200 transition-all duration-200 hover:bg-gray-50 mb-4",
                  notification.read ? "bg-white" : "bg-amber-50/50"
                )}
              >
                <Link href={`/post/${notification.comment.post.id}?commentid=${notification.comment.id}#comment-${notification.comment.id}`}>
                  <div className="flex flex-col">
                    <p className="text-gray-800">{notification.comment.content}</p>
                    <p className="mt-2 text-sm text-gray-500">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: ja })}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
}
