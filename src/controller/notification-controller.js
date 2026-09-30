const NotificationService = require("../service/notification-service");
const { UnauthorizedError, NotFoundError } = require("../utils/errors/app-error");

class NotificationController {
  constructor() {
    this.notificationService = new NotificationService();
  }

  async getMyNotifications(req, res, next) {
    try {
      const userId = req.user?.id || req.user?.userId;
      if (!userId) {
        return next(new UnauthorizedError("User ID not found in token"));
      }

      const notifications = await this.notificationService.getUserNotifications(userId);

      return res.status(200).json({
        success: true,
        data: notifications,
        message: "Notifications fetched successfully",
        error: {},
      });
    } catch (error) {
      return next(error);
    }
  }

  async getNotificationById(req, res, next) {
    try {
      const { id } = req.params;
      const notification = await this.notificationService.getNotificationById(id);

      if (!notification) {
        return next(new NotFoundError("Notification not found"));
      }

      return res.status(200).json({
        success: true,
        data: notification,
        message: "Notification fetched successfully",
        error: {},
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = NotificationController;
