//
// This source file is part of the Stanford Biodesign Digital Health Spezi Web Template Application open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

import { Button } from "@stanfordspezi/spezi-web-design-system/components/Button";
import { Tooltip } from "@stanfordspezi/spezi-web-design-system/components/Tooltip";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { callables } from "@/modules/firebase/app";
import { type UserMessage } from "@/modules/firebase/models";
import { isMessageRead } from "@/modules/notifications/helpers";
import { useNotificationActions } from "@/modules/notifications/queries";

interface MarkAllAsReadButtonProps {
  notifications: UserMessage[];
}

export const MarkAllAsReadButton = ({
  notifications,
}: MarkAllAsReadButtonProps) => {
  const { invalidateUserNotifications } = useNotificationActions();

  const dismissibleNotifications = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          !notification.isDismissed && !isMessageRead(notification),
      ),
    [notifications],
  );
  const hasDismissibleNotifications = dismissibleNotifications.length > 0;

  const markNotificationsAsRead = useMutation({
    mutationFn: () =>
      callables.dismissMessages({
        messageIds: dismissibleNotifications.map(
          (notification) => notification.id,
        ),
      }),
    onSuccess: invalidateUserNotifications,
  });

  return (
    <Tooltip
      tooltip="No unread notifications"
      open={hasDismissibleNotifications ? false : undefined}
    >
      <Button
        size="sm"
        onClick={() => markNotificationsAsRead.mutate()}
        isPending={markNotificationsAsRead.isPending}
        disabled={!hasDismissibleNotifications}
        className="disabled:pointer-events-auto"
      >
        Mark all as read
      </Button>
    </Tooltip>
  );
};
