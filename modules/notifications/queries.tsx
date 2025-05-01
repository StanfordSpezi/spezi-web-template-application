//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { queryOptions, useQuery } from "@tanstack/react-query";
import { query, orderBy } from "firebase/firestore";
import { collectionRefs } from "@/modules/firebase/app";
import { useUser } from "@/modules/firebase/UserProvider";
import { getDocsData } from "@/modules/firebase/utils";
import { filterUnreadNotifications } from "@/modules/notifications/helpers";
import { queryClient } from "@/modules/query/queryClient";

interface ListNotificationsPayload {
  userId: string;
}

export const notificationQueries = {
  namespace: "notifications",
  list: (payload: ListNotificationsPayload) =>
    queryOptions({
      queryKey: [notificationQueries.namespace, payload],
      queryFn: () =>
        getDocsData(
          query(
            collectionRefs.userMessages({ userId: payload.userId }),
            orderBy("creationDate", "desc"),
          ),
        ),
    }),
};

export const useHasUnreadNotification = () => {
  const { auth } = useUser();
  const { data: hasUnreadNotification } = useQuery({
    ...notificationQueries.list({ userId: auth.uid }),
    select: (notifications) =>
      filterUnreadNotifications(notifications).length > 0,
  });

  return { hasUnreadNotification };
};

export const useNotificationActions = () => {
  const { auth } = useUser();

  const invalidateUserNotifications = () =>
    queryClient.invalidateQueries(
      notificationQueries.list({ userId: auth.uid }),
    );

  return { invalidateUserNotifications };
};
